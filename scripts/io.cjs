'use strict';
const fs=require('node:fs/promises');
const path=require('node:path');
const YAML=require('yaml');
const core=require('./core.cjs');
const ROOT=path.resolve(__dirname,'..');
function yaml(text) {
  const doc=YAML.parseDocument(text,{uniqueKeys:true});
  if(doc.errors.length) throw new Error(doc.errors.map(e=>e.message).join('; '));
  return doc.toJS({maxAliasCount:50});
}
async function safe(root, rel) {
  rel=core.cleanPath(rel);
  const base=await fs.realpath(root);
  let cursor=base;
  for(const part of rel.split('/')) {
    cursor=path.join(cursor,part);
    try {if((await fs.lstat(cursor)).isSymbolicLink()) throw new Error(`Symlink not allowed for managed I/O: ${rel}`);}
    catch(e) {if(e.code!=='ENOENT') throw e;}
  }
  return cursor;
}
async function read(root,rel) {return fs.readFile(await safe(root,rel),'utf8');}
async function contract(root=ROOT) {return core.loadContract(await read(root,'docs/metadata.md'));}
async function inventory(root=ROOT) {
  const files=[];
  async function walk(dir='') {
    for(const entry of await fs.readdir(path.join(root,dir),{withFileTypes:true})) {
      if(entry.isSymbolicLink() || ['.git','node_modules','.trash'].includes(entry.name)) continue;
      const p=[dir,entry.name].filter(Boolean).join('/');
      if(entry.isDirectory()) {if(!p.startsWith('.obsidian/')) await walk(p);}
      else if(entry.isFile()) {
        const f={path:p};
        if(p.endsWith('.md')) {
          f.text=await read(root,p);
          try {Object.assign(f,core.parseNote(f.text,yaml));}
          catch(e) {f.meta={};f.parseError=e.message;}
        }
        files.push(f);
      }
    }
  }
  await walk();return files.sort((a,b)=>a.path.localeCompare(b.path));
}
async function create(root, opts) {
  const c=await contract(root),files=await inventory(root);
  if(opts.action==='reading') {
    const context=files.find(f=>f.path===opts.context);
    if(context?.meta?.kind!=='source') throw new Error('Reading needs --context pointing to an existing Source record');
    const readings=files.filter(f=>f.meta?.kind==='note' && !f.meta['managed-by'] && Array.isArray(f.meta.sources) && f.meta.sources.some(ref=>core.resolveDisk(ref,f.path,files).file?.path===context.path));
    if(!opts.name && readings.length) return {result:readings.length===1?'existing':'choose',paths:readings.map(f=>f.path)};
    opts={...opts,action:'note',name:opts.name || 'Reading notes'};
  }
  const cue=await read(root,'templates/fragments/writing-cue.md');
  const p=core.plan(c,opts,files,cue);
  const problems=core.validate(c,p.meta,p.path,(v,s)=>core.resolveDisk(v,s,files));
  if(problems.some(f=>f.level==='error' || ['link.ambiguous','field.provisional'].includes(f.code))) throw new Error(problems.map(f=>f.message).join('\n'));
  const existing=files.find(f=>f.path.toLowerCase()===p.path.toLowerCase());
  if(existing) {
    if(p.reopen && !existing.parseError && !existing.meta['managed-by'] && ['kind','format','date','period'].every(k=>existing.meta[k]===p.meta[k])) return {result:'existing',path:existing.path};
    throw new Error(`Target exists; it will not be replaced: ${p.path}`);
  }
  if(opts.dryRun) return {result:'preview',...p};
  const target=await safe(root,p.path);
  await fs.mkdir(path.dirname(target),{recursive:true});
  await fs.writeFile(target,p.text,{flag:'wx'});
  return {result:'created',path:p.path};
}
async function audit(root=ROOT) {
  const c=await contract(root),files=await inventory(root),findings=[],captures=[],candidates=[],tasks=[];
  for(const f of files.filter(f=>f.path.endsWith('.md'))) {
    const scope=core.scope(c,f.path);
    if(scope==='unknown') {findings.push({level:'suggestion',code:'scope.unknown',path:f.path,message:'Markdown outside declared content/support locations'});continue;}
    if(scope!=='content') continue;
    if(f.path.startsWith('inbox/')) captures.push(f.path);
    if(f.parseError) {findings.push({level:'error',code:'yaml.invalid',path:f.path,message:f.parseError});continue;}
    findings.push(...core.validate(c,f.meta,f.path,(v,s)=>core.resolveDisk(v,s,files)));
    if(f.meta['managed-by']) continue;
    const body=core.inspectBody(f.body,f.bodyLine);
    candidates.push(...body.candidates.map(x=>({path:f.path,...x})));
    tasks.push(...body.tasks.map(x=>({path:f.path,...x})));
  }
  return {findings,captures,candidates,tasks,summary:{errors:findings.filter(x=>x.level==='error').length,suggestions:findings.filter(x=>x.level==='suggestion').length,captures:captures.length,candidates:candidates.length}};
}
module.exports={ROOT,fs,path,yaml,safe,read,contract,inventory,create,audit};
