'use strict';
const io=require('./io.cjs'),core=require('./core.cjs');
const {snapshotPlan,assertOwned}=require('./zotero-core.cjs');
async function importSnapshot(root,data,dryRun=false) {
  const c=await io.contract(root),p=snapshotPlan(data);
  const findings=core.validate(c,p.meta,p.path,()=>({state:'missing'}));
  if(findings.some(f=>f.level==='error')) throw new Error(findings.map(f=>f.message).join('\n'));
  const target=await io.safe(root,p.path);
  let before;
  try {before=await io.fs.readFile(target,'utf8');assertOwned(core.parseNote(before,io.yaml).meta,p.meta);}
  catch(e){if(e.code!=='ENOENT')throw e;}
  if(dryRun)return {result:'preview',...p,replaces:before!==undefined};
  if(before===p.text)return {result:'unchanged',path:p.path};
  await io.fs.mkdir(io.path.dirname(target),{recursive:true});
  if(before===undefined) await io.fs.writeFile(target,p.text,{flag:'wx'});
  else {
    // Exclusive lock among our importers; verify the file again before replacing.
    const lock=`${target}.lock`;
    const fd=await io.fs.open(lock,'wx');
    const temp=`${target}.${require('node:crypto').randomUUID()}.tmp`;
    try {
      await io.fs.writeFile(temp,p.text,{flag:'wx'});
      if(await io.fs.readFile(target,'utf8')!==before)throw new Error('Source changed during import; retry after reviewing it');
      await io.fs.rename(temp,target);
    } finally {
      await io.fs.rm(temp,{force:true});await fd.close();await io.fs.unlink(lock);
    }
  }
  return {result:before===undefined?'created':'updated',path:p.path};
}
module.exports={importSnapshot};
