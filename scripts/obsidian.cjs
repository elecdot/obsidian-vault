'use strict';
const core=require('./core.cjs');
const zotero=require('./zotero-core.cjs');
async function state(app,parseYaml) {
  const registry=app.vault.getAbstractFileByPath('docs/metadata.md');
  if(!registry)throw new Error('Open this repository as its own vault');
  const c=core.loadContract(await app.vault.read(registry));
  const files=app.vault.getFiles().map(file=>({path:file.path,native:file,meta:app.metadataCache.getFileCache(file)?.frontmatter || {}}));
  return {c,files,parseYaml};
}
async function ensureFolders(app,p) {
  let current='';
  for(const part of p.split('/').slice(0,-1)) {
    current=current?`${current}/${part}`:part;
    if(!app.vault.getAbstractFileByPath(current)) await app.vault.createFolder(current);
  }
}
function resolver(app,files) {
  return (ref,source)=>{
    const target=core.wikiTarget(ref);
    if(target===null)return {state:'invalid'};
    const file=app.metadataCache.getFirstLinkpathDest(target,source);
    return file?{state:'ok',file:files.find(f=>f.path===file.path) || {path:file.path,meta:app.metadataCache.getFileCache(file)?.frontmatter || {}}}:{state:'missing'};
  };
}
async function freshReferences(app,s,opts) {
  const paths=new Set(opts.context?[opts.context]:[]);
  for(const key of ['domains','activities','sources']) for(const ref of opts[key] || []) {
    const p=resolver(app,s.files)(ref,'').file?.path;if(p)paths.add(p);
  }
  for(const p of paths) {
    const f=s.files.find(f=>f.path===p);
    if(f?.native.extension==='md') f.meta=core.parseNote(await app.vault.read(f.native),s.parseYaml).meta;
  }
}
async function create(app,parseYaml,opts) {
  const s=await state(app,parseYaml);await freshReferences(app,s,opts);
  const cueFile=app.vault.getAbstractFileByPath('templates/fragments/writing-cue.md');
  const cue=await app.vault.read(cueFile);
  const plan=core.plan(s.c,opts,s.files,cue);
  const errors=core.validate(s.c,plan.meta,plan.path,resolver(app,s.files)).filter(f=>f.level==='error' || f.code==='field.provisional');
  if(errors.length)throw new Error(errors.map(e=>e.message).join('\n'));
  const existing=app.vault.getAbstractFileByPath(plan.path) || app.vault.getFiles().find(f=>f.path.toLowerCase()===plan.path.toLowerCase());
  if(existing) {
    if(plan.reopen && existing.extension==='md') {
      const meta=core.parseNote(await app.vault.read(existing),parseYaml).meta;
      if(!meta['managed-by'] && ['kind','format','date','period'].every(k=>meta[k]===plan.meta[k])) return existing;
    }
    throw new Error(`Target already exists: ${plan.path}`);
  }
  await ensureFolders(app,plan.path);
  return app.vault.create(plan.path,plan.text);
}
async function audit(app,parseYaml) {
  const s=await state(app,parseYaml),report={findings:[],captures:[],candidates:[],tasks:[]};
  for(const f of s.files) {
    if(f.native.extension!=='md')continue;
    const scope=core.scope(s.c,f.path);
    if(scope==='unknown'){report.findings.push({level:'suggestion',path:f.path,code:'scope.unknown',message:'Outside declared content/support scope'});continue;}
    if(scope!=='content')continue;
    if(f.path.startsWith('inbox/'))report.captures.push(f.path);
    try{Object.assign(f,core.parseNote(await app.vault.read(f.native),parseYaml));}
    catch(e){f.parseError=e.message;report.findings.push({level:'error',path:f.path,code:'yaml.invalid',message:e.message});}
  }
  for(const f of s.files.filter(f=>f.body!==undefined && !f.parseError)) {
    report.findings.push(...core.validate(s.c,f.meta,f.path,resolver(app,s.files)));
    if(f.meta['managed-by'])continue;
    const body=core.inspectBody(f.body,f.bodyLine);
    for(const key of ['candidates','tasks'])report[key].push(...body[key].map(x=>({path:f.path,...x})));
  }
  return report;
}
async function importSnapshot(app,parseYaml,data) {
  const s=await state(app,parseYaml),p=zotero.snapshotPlan(data);
  const errors=core.validate(s.c,p.meta,p.path,resolver(app,s.files)).filter(f=>f.level==='error' || f.code==='field.provisional');
  if(errors.length)throw new Error(errors.map(e=>e.message).join('\n'));
  const existing=app.vault.getAbstractFileByPath(p.path) || app.vault.getFiles().find(f=>f.path.toLowerCase()===p.path.toLowerCase());
  if(existing) {
    if(existing.path!==p.path)throw new Error('Import destination spelling differs from its stable path; inspect before reimport');
    if(existing.extension!=='md')throw new Error('Import target is not a Markdown file');
    await app.vault.process(existing,current=>{zotero.assertOwned(core.parseNote(current,parseYaml).meta,p.meta);return p.text;});
    return existing;
  }
  await ensureFolders(app,p.path);return app.vault.create(p.path,p.text);
}
function showReport(app,O,report) {
  class Report extends O.Modal {
    onOpen() {
      this.contentEl.createEl('h2',{text:'Vault inspection'});
      this.contentEl.createEl('p',{text:`${report.findings.length} findings · ${report.candidates.length} refinement candidates · ${report.captures.length} captures`});
      for(const item of [...report.findings,...report.candidates,...report.tasks.filter(t=>!t.done)]) {
        const row=this.contentEl.createEl('p');
        const button=row.createEl('button',{text:`${item.path}${item.line?':'+item.line:''}`});
        row.createSpan({text:` ${item.level || ''} ${item.message || item.cue || item.text}`});
        button.onclick=async()=>{this.close();const f=app.vault.getAbstractFileByPath(item.path);if(f)await app.workspace.getLeaf(false).openFile(f,{eState:{line:(item.line || 1)-1}});};
      }
      this.contentEl.createEl('p',{text:'Read-only. Suggestions and captures are not automatically tasks.'});
    }
  }
  new Report(app).open();
}
async function run(tp,mode) {
  const app=tp.app,O=tp.obsidian;
  // Templater RunMode.AppendActiveFile, verified against upstream/installed API.
  if(tp.config.run_mode!==1)throw new Error('Use the Insert vault-menu/capture command from an existing note, not Create from template');
  const s=await state(app,O.parseYaml);
  const choose=(labels,values)=>tp.system.suggester(labels,values,false,'Choose an action');
  const prompt=(label,initial='')=>tp.system.prompt(label,initial,false);
  const options=['capture','context-capture','context-note','note','guide','activity','domain','source','reading','day','week','month','audit','rename','import'];
  const labels=['Capture','Capture in a context','Write in a context','Write an independent note','Create a guide','Create an activity','Create a domain','Create a source record','Continue reading','Today / another day','This week / another week','This month / another month','Inspect vault / refinement / tasks','Rename or move this note','Import a Zotero JSON snapshot'];
  const action=mode || await choose(labels,options);if(action==null)return null;
  if(action==='audit'){const r=await audit(app,O.parseYaml);showReport(app,O,r);return r;}
  let file;
  if(action==='rename') {
    const current=tp.config.active_file;
    if(!current || core.scope(s.c,current.path)!=='content')throw new Error('Select an authored content Note to rename');
    const meta=core.parseNote(await app.vault.read(current),O.parseYaml).meta;
    if(meta['managed-by'])throw new Error('Use the import identity workflow for managed Sources');
    const value=await prompt('New vault-relative path (including .md)',current.path);if(value==null)return null;
    const dest=core.cleanPath(value);
    if(!dest.endsWith('.md') || core.scope(s.c,dest)!=='content')throw new Error('Choose a Markdown path in content scope');
    if(dest===current.path)return current;
    if(app.vault.getAbstractFileByPath(dest))throw new Error('Destination exists');
    await ensureFolders(app,dest);await app.fileManager.renameFile(current,dest);file=current;
  } else if(action==='import-selected') {
    throw new Error('Live Zotero selection adapter is pending verification; see docs/verification.md. Use an explicit JSON snapshot instead.');
  } else if(action==='import') {
    const raw=await prompt('Paste JSON for one synced Zotero item (uri, title, annotations as available)');if(raw==null)return null;
    file=await importSnapshot(app,O.parseYaml,JSON.parse(raw));
  } else {
    let opts={action};
    if(['day','week','month'].includes(action)) {
      const date=await prompt('Period containing date (YYYY-MM-DD)',core.localParts(new Date(),s.c.timezone).date);if(date==null)return null;
      opts={action:'period',period:action,date};
    } else {
      if(['context-capture','context-note','reading'].includes(action)) {
        const entries=s.files.filter(f=>core.scope(s.c,f.path)==='content' && (action==='reading'?f.meta.kind==='source':['domain','activity','source'].includes(f.meta.kind)));
        if(!entries.length)throw new Error('Create the relevant entry first');
        const context=await choose(entries.map(f=>`${f.meta.aliases?.[0] || f.native.basename} — ${f.path}`),entries);if(!context)return null;
        opts.context=context.path;opts.action=action==='context-capture'?'capture':'note';
        if(action==='reading') {
          const related=s.files.filter(f=>f.meta.kind==='note' && !f.meta['managed-by'] && Array.isArray(f.meta.sources) && f.meta.sources.some(ref=>resolver(app,s.files)(ref,f.path).file?.path===context.path));
          if(related.length) {
            const picked=await choose([...related.map(f=>f.path),'Create another reading note'],[...related.map(f=>f.native),'new']);
            if(picked==null)return null;
            if(picked!=='new')file=picked;
          }
        }
      }
      if(!file) {
        const name=await prompt(opts.action==='capture'?'Name (optional; English filename can wait)':'Readable English name',action==='reading'?'Reading notes':'');if(name==null)return null;
        opts.name=name;
        if(action==='activity') {
          const status=await choose(['Planned — not started','Active — already starting or underway'],['planned','active']);if(status==null)return null;opts.status=status;
        }
        if(action==='source') {const url=await prompt('Source URL (optional)');if(url==null)return null;opts.url=url;}
      }
    }
    if(!file)file=await create(app,O.parseYaml,opts);
  }
  const newlyCreated=!s.files.some(f=>f.path===file.path);
  tp.hooks.on_all_templates_executed(async()=>{
    const leaf=app.workspace.getLeaf(false);
    if(newlyCreated && action!=='import') {
      await leaf.openFile(file,{active:true,state:{mode:'source'}});
      const lines=(await app.vault.read(file)).split('\n');
      leaf.view.editor?.setCursor(lines.findIndex(line=>line.startsWith('# '))+1,0);
      leaf.view.editor?.focus();
    } else if(action==='import') await leaf.openFile(file,{active:true,state:{mode:'preview'}});
    else await leaf.openFile(file);
  });
  return file;
}
module.exports={state,create,audit,importSnapshot,run};
