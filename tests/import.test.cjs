'use strict';
const test=require('node:test'),assert=require('node:assert/strict');
const fs=require('node:fs/promises'),os=require('node:os'),path=require('node:path');
const io=require('../scripts/io.cjs'),core=require('../scripts/core.cjs');
const importer=require('../scripts/zotero.cjs'),{snapshotPlan}=require('../scripts/zotero-core.cjs');
const item={uri:'http://zotero.org/users/123/items/ABCD1234',itemKey:'ABCD1234',title:'Fixture only',citationKey:'old-key',tags:[{tag:'external tag'}],annotations:[{text:'Example excerpt',comment:'A comment made in Zotero',pageLabel:'2'}]};
test('unrecognized live selection stops before export or import without retries',async()=>{
  let calls=0;
  const {selectedSnapshot}=require('../scripts/zotero-transport.cjs');
  await assert.rejects(selectedSnapshot(null,async()=>{calls++;return {'unsupported':null};}),/unsupported shape/);
  assert.equal(calls,1);
});
test('failed replacement preserves the prior generated Source',async t=>{
  const root=await fs.mkdtemp(path.join(os.tmpdir(),'vault-import-failure-'));t.after(()=>fs.rm(root,{recursive:true,force:true}));
  await fs.mkdir(path.join(root,'docs'));await fs.copyFile(path.join(io.ROOT,'docs/metadata.md'),path.join(root,'docs/metadata.md'));
  const result=await importer.importSnapshot(root,item),before=await io.read(root,result.path);
  const rename=io.fs.rename;
  try {
    io.fs.rename=async()=>{throw new Error('Simulated replace failure');};
    await assert.rejects(importer.importSnapshot(root,{...item,title:'Updated'}),/Simulated replace failure/);
  }finally{io.fs.rename=rename;}
  assert.equal(await io.read(root,result.path),before);
});
test('import identity is library-scoped, not title or citation-key based',()=>{
  assert.equal(snapshotPlan(item).path,snapshotPlan({...item,title:'Renamed',citationKey:'new-key'}).path);
  assert.notEqual(snapshotPlan(item).path,snapshotPlan({...item,uri:'https://zotero.org/groups/123/items/ABCD1234'}).path);
  assert.throws(()=>snapshotPlan({...item,uri:'http://zotero.org/users/local/XYZ/items/ABCD1234'}),/synced/);
  assert.throws(()=>snapshotPlan({...item,itemKey:'DIFF1234'}),/disagrees/);
});
test('a moved managed Source is reported before the next reimport hides the drift',async()=>{
  const c=await io.contract(),p=snapshotPlan(item);
  assert(core.validate(c,p.meta,'sources/renamed/source.md',()=>({state:'missing'})).some(f=>f.code==='import.path'));
});
test('reimport preserves personal reading and refuses an unowned target',async t=>{
  const root=await fs.mkdtemp(path.join(os.tmpdir(),'vault-import-'));t.after(()=>fs.rm(root,{recursive:true,force:true}));
  await fs.mkdir(path.join(root,'docs'));await fs.copyFile(path.join(io.ROOT,'docs/metadata.md'),path.join(root,'docs/metadata.md'));
  const created=await importer.importSnapshot(root,item);
  const reading=path.join(root,path.dirname(created.path),'reading-notes.md');await fs.writeFile(reading,'My own interpretation');
  assert.equal((await importer.importSnapshot(root,item)).result,'unchanged');
  await importer.importSnapshot(root,{...item,title:'Changed title'});
  assert.equal(await fs.readFile(reading,'utf8'),'My own interpretation');
  const note=core.parseNote(await io.read(root,created.path),io.yaml);
  assert.equal(note.meta.tags,undefined);assert.deepEqual(note.meta['zotero-tags'],['external tag']);
  assert.match(note.body,/Zotero comment/);
  await fs.writeFile(path.join(root,created.path),'---\nkind: note\n---\nAuthored');
  await assert.rejects(importer.importSnapshot(root,item),/not owned/);
  assert.match(await io.read(root,created.path),/Authored/);
});
