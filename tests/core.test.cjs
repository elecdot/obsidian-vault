'use strict';
const test=require('node:test'),assert=require('node:assert/strict');
const fs=require('node:fs/promises'),os=require('node:os'),path=require('node:path');
const core=require('../scripts/core.cjs'),io=require('../scripts/io.cjs');
async function fixture(t) {
  const root=await fs.mkdtemp(path.join(os.tmpdir(),'vault-test-'));
  t.after(()=>fs.rm(root,{recursive:true,force:true}));
  await fs.mkdir(path.join(root,'docs'));
  await fs.mkdir(path.join(root,'templates/fragments'),{recursive:true});
  await fs.copyFile(path.join(io.ROOT,'docs/metadata.md'),path.join(root,'docs/metadata.md'));
  await fs.copyFile(path.join(io.ROOT,'templates/fragments/writing-cue.md'),path.join(root,'templates/fragments/writing-cue.md'));
  return root;
}
test('calendar identity handles ISO year, leap days, and timezone',()=>{
  assert.deepEqual(core.periodInfo('week','2027-01-01'),{date:'2026-12-28',path:'journals/weekly/2026/2026-W53.md',title:'2026-W53 review',format:'review'});
  assert.equal(core.periodInfo('month','2028-02-29').date,'2028-02-01');
  assert.throws(()=>core.periodInfo('day','2027-02-29'));
  assert.equal(core.localParts(new Date('2026-10-03T17:00:00Z'),'Asia/Shanghai').date,'2026-10-04');
});
test('shared contract rejects malformed/duplicate blocks and drives creators',async()=>{
  const text=await io.read(io.ROOT,'docs/metadata.md');
  assert.throws(()=>core.loadContract(text+text));
  const c=core.loadContract(text);c.creators.activity.status='paused';
  assert.equal(core.plan(c,{action:'activity',name:'Study'},[],'').meta.status,'paused');
  c.properties.status.byKind.activity.push('trial');
  assert.equal(core.validate(c,{kind:'activity',status:'trial'},'activities/x/introduction.md',()=>({state:'missing'})).length,0);
});
test('capture, independent associations, and provenance preserve role semantics',async t=>{
  const root=await fixture(t);
  await io.create(root,{action:'domain',name:'AI Systems'});
  await io.create(root,{action:'activity',name:'Kernel study',domains:['[[domains/ai-systems]]']});
  const cap=await io.create(root,{action:'capture',context:'activities/kernel-study/introduction.md',body:'自己的问题'});
  const parsed=core.parseNote(await io.read(root,cap.path),io.yaml);
  assert.deepEqual(parsed.meta.activities,['[[activities/kernel-study/introduction]]']);
  assert.equal(parsed.meta.domains,undefined);
  await io.create(root,{action:'note',name:'Run explanation',activities:parsed.meta.activities,domains:['[[domains/ai-systems]]'],sources:[core.wikilink(cap.path)]});
  const report=await io.audit(root);assert.equal(report.summary.errors,0);
  assert.equal(core.parseNote(await io.read(root,'activities/kernel-study/introduction.md'),io.yaml).meta.status,'planned');
});
test('existing content, period reopens, and meaningful-name collisions are preserved',async t=>{
  const root=await fixture(t);
  const created=await io.create(root,{action:'period',period:'week',date:'2027-01-01'});
  const target=path.join(root,created.path);
  await fs.appendFile(target,'\nMy own progress.\n');
  assert.equal((await io.create(root,{action:'period',period:'week',date:'2026-12-31'})).result,'existing');
  assert.match(await fs.readFile(target,'utf8'),/My own progress/);
  await io.create(root,{action:'note',name:'Same name',body:'Original'});
  await assert.rejects(io.create(root,{action:'note',name:'Same name',body:'Overwrite'}),/exists/);
  assert.match(await io.read(root,'knowledge/same-name.md'),/Original/);
});
test('reading returns existing authored notes and supports multiple records',async t=>{
  const root=await fixture(t);
  await io.create(root,{action:'source',name:'A book',url:'https://example.org/book'});
  const context='sources/a-book/source.md';
  assert.equal((await io.create(root,{action:'reading',context})).result,'created');
  assert.equal((await io.create(root,{action:'reading',context})).result,'existing');
  await io.create(root,{action:'reading',context,name:'A separate question'});
  assert.equal((await io.create(root,{action:'reading',context})).result,'choose');
});
test('auditor is read-only and distinguishes malformed, provisional and optional metadata',async t=>{
  const root=await fixture(t);
  await fs.mkdir(path.join(root,'inbox'));await fs.writeFile(path.join(root,'inbox/raw.md'),'Unclassified capture');
  await fs.mkdir(path.join(root,'knowledge'));
  await fs.writeFile(path.join(root,'knowledge/optional.md'),'---\nkind: note\naliases: []\ndomains:\nconfidence: tentative\n---\n[[future concept]]');
  await fs.writeFile(path.join(root,'knowledge/bad.md'),'---\nkind: note\nkind: source\n---\n');
  const before=await fs.readFile(path.join(root,'knowledge/optional.md'),'utf8');
  const report=await io.audit(root);
  assert.equal(report.summary.errors,1);assert.equal(report.findings.find(x=>x.level==='error').code,'yaml.invalid');
  assert(report.findings.some(x=>x.code==='field.provisional'));
  assert.equal(await fs.readFile(path.join(root,'knowledge/optional.md'),'utf8'),before);
});
test('refinement and tasks ignore fences, comments and quoted examples',()=>{
  const text=['```md','> [!refine] Code example','```','<!--','> [!refine] Comment','-->','%%','- [ ] Hidden','%%','> [!quote] Source','> [!refine] Quoted example','','> [!refine]- My question','> This boundary matters.','','- [ ] Compare the two explanations','- [x] Find source'].join('\n');
  const result=core.inspectBody(text,5);
  assert.deepEqual(result.candidates,[{line:17,cue:'My question',context:'This boundary matters.'}]);
  assert.equal(result.tasks.length,2);assert.equal(result.tasks[1].done,true);
});
test('unsafe paths and symlink writes cannot escape the selected vault',async t=>{
  const root=await fixture(t);
  assert.throws(()=>core.cleanPath('../elsewhere.md'));
  assert.throws(()=>core.cleanPath('/outside.md'));
  await fs.symlink(os.tmpdir(),path.join(root,'knowledge'));
  await assert.rejects(io.create(root,{action:'note',name:'Escape'}),/Symlink/);
});
test('reference checks do not mistake ambiguous or wrong-role targets for valid structure',async()=>{
  const c=await io.contract();
  const files=[{path:'activities/a/introduction.md',meta:{kind:'activity'}},{path:'activities/b/introduction.md',meta:{kind:'activity'}},{path:'knowledge/domain.md',meta:{kind:'note'}}];
  const findings=core.validate(c,{kind:'note',activities:['[[introduction]]'],domains:['[[knowledge/domain]]'],sources:['[[absent]]']},'inbox/x.md',(v,s)=>core.resolveDisk(v,s,files));
  assert.deepEqual(findings.map(x=>x.code),['link.role','link.ambiguous','link.missing']);
});
