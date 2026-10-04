'use strict';
// Invoked explicitly through the installed Templater API, never at startup.
const assert=require('node:assert/strict');
const bridge=require('../scripts/obsidian.cjs'),core=require('../scripts/core.cjs');
async function run(tp) {
  const app=tp.app,parse=tp.obsidian.parseYaml;
  const id=Date.now().toString(36),created=[],checks=[];
  app.__vaultVerificationCreated=created;
  const make=async opts=>{const f=await bridge.create(app,parse,opts);created.push(f);return f;};
  const domain=await make({action:'domain',name:`Verification domain ${id}`});
  const activity=await make({action:'activity',name:`Verification activity ${id}`,domains:[core.wikilink(domain.path)]});
  const capture=await make({action:'capture',name:`Verification capture ${id}`,context:activity.path,body:'Original test thought\n\n> [!refine] Explain the comparison\n> The assumptions need an explanation.\n\n- [ ] Compare the records'});
  const explanation=await make({action:'note',name:`Verification explanation ${id}`,domains:[core.wikilink(domain.path)],activities:[core.wikilink(activity.path)],sources:[core.wikilink(capture.path)]});
  assert.equal(parse((await app.vault.read(capture)).split('---')[1]).domains,undefined);checks.push('explicit context without inherited domains');
  const periodPath=core.periodInfo('week','2099-01-01').path;
  if(app.vault.getAbstractFileByPath(periodPath))throw new Error('Period test target already exists; choose another fixture date');
  const week=await make({action:'period',period:'week',date:'2099-01-01'});
  await app.vault.append(week,'\nPreserved runtime progress.\n');
  assert.equal((await bridge.create(app,parse,{action:'period',period:'week',date:'2099-01-01'})).path,week.path);
  assert.match(await app.vault.read(week),/Preserved runtime progress/);checks.push('period reopens without overwriting');
  await assert.rejects(bridge.create(app,parse,{action:'note',name:`Verification explanation ${id}`}),/exists/);checks.push('collision preserves existing note');
  const beforeCancel=app.vault.getFiles().length;
  await bridge.run({...tp,config:{...tp.config,run_mode:1},system:{...tp.system,prompt:async()=>null}},'capture');
  assert.equal(app.vault.getFiles().length,beforeCancel);checks.push('cancel before write');
  const snapshot={uri:`https://zotero.org/users/0/items/${('T'+id.toUpperCase()).slice(-8)}`,title:`Verification imported source ${id}`,annotations:[{text:'Synthetic fixture excerpt',comment:'Synthetic Zotero comment'}]};
  const source=await bridge.importSnapshot(app,parse,snapshot);created.push(source);
  const reading=await make({action:'note',name:'Reading notes',context:source.path,body:'Personal reading stays intact.'});
  await bridge.importSnapshot(app,parse,{...snapshot,title:'Changed fixture title'});
  assert.match(await app.vault.read(reading),/Personal reading stays intact/);checks.push('native reimport preserves personal reading');
  await new Promise(resolve=>setTimeout(resolve,500));
  const old=capture.path,newPath=`knowledge/verification-renamed-${id}.md`;
  await app.fileManager.renameFile(capture,newPath);
  let resolved;
  for(let i=0;i<30;i++) {
    const ref=core.parseNote(await app.vault.read(explanation),parse).meta.sources[0];
    resolved=app.metadataCache.getFirstLinkpathDest(core.wikiTarget(ref),explanation.path)?.path;
    if(resolved===newPath)break;
    await new Promise(resolve=>setTimeout(resolve,100));
  }
  assert.equal(app.vault.getAbstractFileByPath(old),null);
  assert.equal(resolved,newPath);checks.push('native rename updates a sources property link');
  const report=await bridge.audit(app,parse);
  const errors=report.findings.filter(f=>f.level==='error' && created.some(c=>c.path===f.path));
  assert.deepEqual(errors,[]);
  assert(report.candidates.some(c=>c.path===capture.path));checks.push('native audit and refinement locations');
  const result={id,checks,domain:domain.path,activity:activity.path,capture:capture.path,explanation:explanation.path,source:source.path,week:week.path,files:[]};
  for(const f of created)result.files.push({path:f.path,text:await app.vault.read(f)});
  return result;
}
async function cleanup(app,report) {
  const retained=[];
  for(const record of report.files) {
    const file=app.vault.getAbstractFileByPath(record.path);
    if(!file)continue;
    if(await app.vault.read(file)!==record.text){retained.push(record.path);continue;}
    await app.vault.delete(file);
  }
  return {retained,removed:report.files.length-retained.length};
}
async function cancellation(app) {
  const p=`inbox/verification-selection-${Date.now()}.md`,original='alpha beta omega\n';
  const file=await app.vault.create(p,original);
  const leaf=app.workspace.getLeaf(false);
  await leaf.setViewState({type:'markdown',state:{file:p,mode:'source'}});
  app.workspace.setActiveLeaf(leaf,{focus:true});
  await new Promise(r=>setTimeout(r,300));
  leaf.view.editor.setSelection({line:0,ch:6},{line:0,ch:10});
  const count=app.vault.getFiles().length;
  app.commands.executeCommandById('templater-obsidian:templates/commands/capture.md');
  await new Promise(r=>setTimeout(r,500));
  const modal=[...document.querySelectorAll('.modal-container')].find(el=>el.innerText.includes('English filename can wait'));
  assert(modal,'Expected the actual capture prompt');
  const input=modal.querySelector('input') || modal;
  input.dispatchEvent(new KeyboardEvent('keydown',{key:'Escape',code:'Escape',keyCode:27,bubbles:true}));
  await new Promise(r=>setTimeout(r,600));
  assert.equal(await app.vault.read(file),original);
  assert.equal(app.vault.getFiles().length,count);
  await app.vault.delete(file);
  return {selectionPreserved:true,noCaptureCreated:true};
}
module.exports={run,cleanup,cancellation};
