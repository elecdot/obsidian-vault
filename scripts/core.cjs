'use strict';

// Environment-independent rules. Obsidian and the CLI supply I/O and YAML parsing.
const EMPTY = value => value == null || value === '' || (Array.isArray(value) && !value.length);
const slash = value => String(value).replace(/\\/g, '/');
function cleanPath(value) {
  const p = slash(value);
  if (!p || p.startsWith('/') || /^[A-Za-z]:/.test(p) || p.split('/').some(x => x === '..' || x === '.' || !x) || /[\x00-\x1f]/.test(p)) throw new Error(`Unsafe vault-relative path: ${value}`);
  return p;
}
function loadContract(text) {
  const matches = [...text.matchAll(/<!-- vault-contract:start -->\s*```json\s*([\s\S]*?)\s*```\s*<!-- vault-contract:end -->/g)];
  if (matches.length !== 1) throw new Error('Expected exactly one marked JSON contract in docs/metadata.md');
  const c = JSON.parse(matches[0][1]);
  if (c.version !== 1 || !c.properties?.kind?.values?.length || !c.creators || !Array.isArray(c.contentRoots)) throw new Error('Invalid contract structure');
  new Intl.DateTimeFormat('en', {timeZone:c.timezone}).format();
  for (const [name, spec] of Object.entries(c.properties)) {
    if (!['text','list','date'].includes(spec.type)) throw new Error(`Unknown type for ${name}`);
    for (const kind of [...(spec.kinds || []), ...(spec.requiredKinds || []), ...Object.keys(spec.byKind || {})]) {
      if (!c.properties.kind.values.includes(kind)) throw new Error(`Unknown kind ${kind} in ${name}`);
    }
    if (spec.reference && !['domain','activity','source'].includes(spec.reference)) throw new Error(`Unknown reference rule: ${name}`);
  }
  for (const [name, spec] of Object.entries(c.creators)) {
    if (!c.properties.kind.values.includes(spec.kind) || !c.contentRoots.includes(spec.root)) throw new Error(`Invalid creator: ${name}`);
    if (spec.status && !c.properties.status.byKind[spec.kind]?.includes(spec.status)) throw new Error(`Invalid creator status: ${name}`);
    if (spec.format && !c.properties.format.values.includes(spec.format)) throw new Error(`Invalid creator format: ${name}`);
  }
  return c;
}
function scope(c, p) {
  const parts = slash(p).split('/');
  if (parts.includes('attachments')) return 'attachment';
  if (c.supportFiles.includes(p) || c.supportRoots.includes(parts[0])) return 'support';
  return c.contentFiles.includes(p) || c.contentRoots.includes(parts[0]) ? 'content' : 'unknown';
}
function parseNote(text, parseYaml) {
  text = text.replace(/^\uFEFF/, '');
  if (!/^---\r?\n/.test(text)) return {meta:{}, body:text, bodyLine:1, hasFrontmatter:false};
  const match = text.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/);
  if (!match) throw new Error('Unclosed frontmatter');
  const meta = parseYaml(match[1]) ?? {};
  if (typeof meta !== 'object' || Array.isArray(meta)) throw new Error('Frontmatter must be a mapping');
  return {meta, body:text.slice(match[0].length), bodyLine:match[0].split('\n').length, hasFrontmatter:true};
}
function wikiTarget(value) {
  if (typeof value !== 'string') return null;
  const match = value.match(/^\[\[([^\]\n]+)\]\]$/);
  return match ? match[1].split('|')[0].split('#')[0] : null;
}
function wikilink(p) { return `[[${p.replace(/\.md$/, '')}]]`; }
function resolveDisk(value, source, files) {
  const target = wikiTarget(value);
  if (!target) return {state:'invalid'};
  let t = slash(target);
  if (t.startsWith('./') || t.startsWith('../')) {
    const parts = source.split('/').slice(0,-1);
    for (const bit of t.split('/')) {
      if (bit === '..') { if (!parts.length) return {state:'missing'}; parts.pop(); }
      else if (bit !== '.') parts.push(bit);
    }
    t = parts.join('/');
  }
  const exact = files.find(f => f.path === t || f.path === `${t}.md`);
  if (exact) return {state:'ok', file:exact};
  const suffix = files.filter(f => f.path.endsWith(`/${t}`) || f.path.endsWith(`/${t}.md`));
  if (suffix.length === 1) return {state:'ok', file:suffix[0]};
  return {state:suffix.length ? 'ambiguous' : 'missing', matches:suffix.map(f=>f.path)};
}
function validDate(s) {
  if (typeof s !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(s)) return false;
  const d = new Date(`${s}T00:00:00Z`);
  return Number.isFinite(+d) && d.toISOString().slice(0,10) === s;
}
function localParts(now, timezone) {
  const p = Object.fromEntries(new Intl.DateTimeFormat('en-GB', {timeZone:timezone,year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',second:'2-digit',hourCycle:'h23'}).formatToParts(now).map(x=>[x.type,x.value]));
  return {date:`${p.year}-${p.month}-${p.day}`, time:`${p.hour}${p.minute}${p.second}`};
}
function periodInfo(period, date) {
  if (!validDate(date)) throw new Error(`Invalid calendar date: ${date}`);
  const d = new Date(`${date}T00:00:00Z`);
  if (period === 'day') return {date,path:`journals/daily/${date.slice(0,4)}/${date}.md`,title:date,format:'journal'};
  if (period === 'month') {
    const month = date.slice(0,7);
    return {date:`${month}-01`,path:`journals/monthly/${month.slice(0,4)}/${month}.md`,title:`${month} review`,format:'review'};
  }
  if (period !== 'week') throw new Error(`Unknown period: ${period}`);
  const monday = new Date(d); monday.setUTCDate(d.getUTCDate() - (d.getUTCDay()+6)%7);
  const thursday = new Date(monday); thursday.setUTCDate(monday.getUTCDate()+3);
  const year = thursday.getUTCFullYear();
  const jan4 = new Date(`${year}-01-04T00:00:00Z`); jan4.setUTCDate(4-(jan4.getUTCDay()+6)%7);
  const week = String(Math.round((monday-jan4)/604800000)+1).padStart(2,'0');
  return {date:monday.toISOString().slice(0,10),path:`journals/weekly/${year}/${year}-W${week}.md`,title:`${year}-W${week} review`,format:'review'};
}
function validate(c, meta, p, resolve) {
  const findings=[];
  const add=(level,code,message)=>findings.push({level,code,path:p,message});
  const provisional = p.startsWith('inbox/') && EMPTY(meta.kind);
  for (const [name,spec] of Object.entries(c.properties)) {
    const v=meta[name];
    const required=spec.required || spec.requiredKinds?.includes(meta.kind) || spec.requiredFormats?.includes(meta.format);
    if (EMPTY(v)) {
      if (required && !(name === 'kind' && provisional)) add('error','field.required',`Missing ${name}`);
      continue;
    }
    if (spec.type === 'list' ? !Array.isArray(v) || v.some(x=>typeof x !== 'string' || !x.trim()) : typeof v !== 'string') {
      add('error','field.type',`${name} must be ${spec.type === 'list' ? 'a list of nonempty strings' : spec.type}`); continue;
    }
    if (spec.type === 'date' && !validDate(v)) add('error','field.date',`${name} must be a real YYYY-MM-DD date`);
    if (spec.kinds && !provisional && !spec.kinds.includes(meta.kind)) add('error','field.scope',`${name} does not apply to ${meta.kind}`);
    if (spec.values && !spec.values.includes(v)) add('error','field.value',`Unknown ${name}: ${v}`);
    if (spec.byKind && !provisional && !spec.byKind[meta.kind]?.includes(v)) add('error','field.value',`${name}: ${v} is invalid for ${meta.kind}`);
    if (spec.reference) for (const ref of v) {
      if (spec.reference === 'source' && /^(https?:\/\/|zotero:\/\/)/i.test(ref)) continue;
      const target=wikiTarget(ref);
      if (!target) {add('error','link.syntax',`${name}: expected a wikilink${spec.reference === 'source' ? ' or HTTP(S)/Zotero URL' : ''}`);continue;}
      const result=resolve(ref,p);
      if (result.state === 'ambiguous') {add('suggestion','link.ambiguous',`${name}: qualify ${ref}; offline resolution is ambiguous`);continue;}
      if (result.state !== 'ok') {add('error','link.missing',`${name}: cannot resolve ${ref}`);continue;}
      if (spec.reference !== 'source' && scope(c,result.file.path)!=='content') add('error','link.scope',`${name}: organizational entry must be in content scope`);
      if (spec.reference !== 'source' && result.file.meta?.kind !== spec.reference) add('error','link.role',`${name}: ${ref} must identify a ${spec.reference} entry`);
      if (spec.reference === 'domain' && result.file.meta?.status === 'retired') add('info','domain.retired',`${ref} is retired; existing references remain valid`);
    }
  }
  for (const name of Object.keys(meta)) if (!c.properties[name]) add('suggestion','field.provisional',`Unregistered field ${name}; retain it and define its use before shared tooling depends on it`);
  if (!EMPTY(meta.date) || !EMPTY(meta.period)) {
    if (EMPTY(meta.date) || EMPTY(meta.period)) add('error','period.pair','date and period must be supplied together');
    else if (validDate(meta.date) && c.properties.period.values.includes(meta.period) && periodInfo(meta.period,meta.date).date !== meta.date) add('error','period.start','date must be the first day of its period');
  }
  if (meta['managed-by'] === 'zotero') {
    for (const key of ['source-id','zotero-uri']) if (EMPTY(meta[key])) add('error','import.identity',`Managed Source needs ${key}`);
    if(!EMPTY(meta['source-id']))try {
      const expected=require('./zotero-id.cjs').identity(meta['source-id']);
      if(expected.path!==p)add('error','import.path',`Managed Source moved from its reproducible destination ${expected.path}; inspect before another import`);
      if(!EMPTY(meta['zotero-uri']) && meta['zotero-uri']!==expected.desktop)add('error','import.identity','Zotero URI differs from source identity');
    }catch(e){add('error','import.identity',e.message);}
  }
  return findings;
}
function slugify(name) {
  if (typeof name !== 'string' || /[\r\n\x00]/.test(name)) throw new Error('Supply a one-line readable English name');
  const slug=name.normalize('NFKD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
  if (!slug || /^(con|prn|aux|nul|com[1-9]|lpt[1-9])$/.test(slug)) throw new Error('Name needs a usable English filename');
  return slug;
}
function render(meta, title, body='') {
  return `---\n${Object.entries(meta).map(([k,v])=>`${k}: ${JSON.stringify(v)}`).join('\n')}\n---\n# ${title}\n\n${body.trim()}\n`;
}
function plan(c, opts, files, cue, now=new Date()) {
  const local=localParts(now,c.timezone);
  if (opts.action === 'period') {
    const info=periodInfo(opts.period,opts.date || local.date);
    const meta={kind:'note',format:info.format,date:info.date,period:opts.period};
    return {path:info.path,meta,reopen:true,text:render(meta,info.title,opts.body || '> [!tip]- Reflection\n> Keep what matters from this period and a useful point to return to.\n\n![[bases/period-content.base]]')};
  }
  const def=c.creators[opts.action];
  if (!def) throw new Error(`Unknown creation action: ${opts.action}`);
  const name=opts.name?.trim();
  const fallback=!name && def.optionalName;
  if (!name && !fallback) throw new Error(`${opts.action} needs a name`);
  const slug=fallback ? `capture-${local.date}-${local.time}` : slugify(name);
  const meta={kind:def.kind};
  if (def.format) meta.format=def.format;
  if (def.status) meta.status=opts.status || def.status;
  else if (opts.status) throw new Error('This action does not use lifecycle status');
  let folder=def.root;
  if (opts.context) {
    const ctx=files.find(f=>f.path === cleanPath(opts.context));
    if (!ctx || scope(c,ctx.path)!=='content' || !['domain','activity','source'].includes(ctx.meta?.kind)) throw new Error('Context must be an existing content Domain, Activity, or Source entry');
    if (!['note','capture','guide'].includes(opts.action)) throw new Error('Use explicit relationship options for new entries');
    const key={domain:'domains',activity:'activities',source:'sources'}[ctx.meta.kind];
    meta[key]=[wikilink(ctx.path)];
    if (opts.action !== 'capture') folder=ctx.meta.kind === 'domain' ? 'knowledge' : ctx.path.split('/').slice(0,-1).join('/');
  }
  for (const field of ['domains','activities','sources']) if (opts[field]?.length) meta[field]=[...new Set([...(meta[field] || []),...opts[field]])];
  if (opts.url && def.kind === 'source') meta.url=opts.url;
  if (name) meta.aliases=[name];
  let p=cleanPath(def.entry ? `${folder}/${slug}/${def.entry}.md` : `${folder}/${slug}.md`);
  if (fallback) {let n=2;while(files.some(f=>f.path === p)) p=`${folder}/${slug}-${n++}.md`;}
  const title=name || 'Capture';
  let body=opts.body || (def.cue ? cue : '');
  if (def.related) {
    body+=(body ? '\n\n' : '')+'> [!tip]- Entry\n> Describe its purpose and the useful routes back into your work.\n\n![[bases/related.base#Direct notes]]';
    if(def.kind==='domain') body+='\n\n## Related activities\n\n![[bases/related.base#Related activities]]';
  }
  return {path:p,meta,text:render(meta,title,body),reopen:false};
}
function inspectBody(body, firstLine=1) {
  const candidates=[],tasks=[];
  let fence=null, comment=null, inQuote=false;
  const lines=body.split(/\r?\n/);
  for (let i=0;i<lines.length;i++) {
    let line=lines[i];
    if (fence) {if (new RegExp(`^ {0,3}${fence.char}{${fence.length},}\\s*$`).test(line)) fence=null; continue;}
    const f=line.match(/^ {0,3}(`{3,}|~{3,})/); if(f && !comment) {fence={char:f[1][0],length:f[1].length};inQuote=false;continue;}
    let visible='';
    while(line.length) {
      if(comment) {const end=line.indexOf(comment);if(end<0){line='';break;}line=line.slice(end+comment.length);comment=null;}
      else {const a=line.indexOf('<!--'),b=line.indexOf('%%');const start=a<0?b:b<0?a:Math.min(a,b);if(start<0){visible+=line;break;}visible+=line.slice(0,start);comment=start===a?'-->':'%%';line=line.slice(start+(start===a?4:2));}
    }
    const marker=visible.match(/^ {0,3}>\s*\[!refine\][+-]?(?:\s+(.*))?\s*$/i);
    if (marker && !inQuote) {
      const context=[];
      for(let j=i+1;j<lines.length && /^ {0,3}>/.test(lines[j]);j++) context.push(lines[j].replace(/^ {0,3}> ?/,''));
      candidates.push({line:firstLine+i,cue:marker[1] || 'Refinement candidate',context:context.join('\n')});
    }
    const task=visible.match(/^ {0,3}[-*+]\s+\[([ xX])\]\s+(.+)$/);
    if(task) tasks.push({line:firstLine+i,done:task[1].toLowerCase()==='x',text:task[2]});
    inQuote=/^ {0,3}>/.test(visible);
  }
  return {candidates,tasks};
}
module.exports={EMPTY,cleanPath,loadContract,scope,parseNote,wikiTarget,wikilink,resolveDisk,validDate,localParts,periodInfo,validate,slugify,render,plan,inspectBody};
