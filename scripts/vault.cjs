#!/usr/bin/env node
'use strict';
const io=require('./io.cjs');
const core=require('./core.cjs');
const HELP=`Vault helpers (run from any directory; default root is this repository)

  node scripts/vault.cjs capture [--name NAME] [--context ENTRY.md]
  node scripts/vault.cjs note|guide|activity|domain|source --name NAME
  node scripts/vault.cjs reading --context sources/.../source.md [--name NAME]
  node scripts/vault.cjs period --period day|week|month [--date YYYY-MM-DD]
  node scripts/vault.cjs audit|candidates|tasks|inventory [--json]
  node scripts/vault.cjs import-zotero --input snapshot.json [--dry-run]

Creation options: --domain ENTRY.md --activity ENTRY.md --source LOCATOR
(repeatable), --context ENTRY.md (placement + chosen relation), --status VALUE,
--body-file PATH, --url URL (manual Source), --dry-run. --root PATH is explicit.
No command batch-renames, deletes, or silently repairs existing authored Notes.
`;
async function main(args=process.argv.slice(2)) {
  const action=args.shift();
  if(!action || ['help','--help','-h'].includes(action)){console.log(HELP);return;}
  const opts={action},known=new Set(['root','name','context','period','date','status','body-file','url','domain','activity','source','input']);
  for(let i=0;i<args.length;i++) {
    const key=args[i].replace(/^--/,'');
    if(!args[i].startsWith('--')) throw new Error(`Unexpected argument ${args[i]}`);
    if(['dry-run','json'].includes(key)){opts[key==='dry-run'?'dryRun':key]=true;continue;}
    if(!known.has(key) || i+1>=args.length || args[i+1].startsWith('--')) throw new Error(`Invalid option --${key}`);
    const value=args[++i];
    if(['domain','activity','source'].includes(key)) {
      const field={domain:'domains',activity:'activities',source:'sources'}[key];
      (opts[field]??=[]).push(/^(https?:|zotero:|\[\[)/i.test(value)?value:core.wikilink(core.cleanPath(value)));
    } else opts[key]=value;
  }
  const root=opts.root?io.path.resolve(opts.root):io.ROOT;
  let result;
  if(['audit','candidates','tasks'].includes(action)) {
    const report=await io.audit(root);
    result=action==='audit'?report:report[action];
    if(action==='audit' && report.summary.errors) process.exitCode=1;
    if(!opts.json && action==='audit') {
      for(const f of report.findings) console.log(`${f.level.toUpperCase()} ${f.path} [${f.code}] ${f.message}`);
      console.log(JSON.stringify(report.summary));return;
    }
  } else if(action==='inventory') {
    const c=await io.contract(root);
    result={creators:c.creators,fields:Object.keys(c.properties),files:(await io.inventory(root)).filter(f=>/^(templates|bases|scripts|\.agents)\//.test(f.path)).map(f=>f.path)};
  } else if(action==='import-zotero') {
    if(!opts.input) throw new Error('Provide an explicit snapshot using --input');
    const importer=require('./zotero.cjs');
    result=await importer.importSnapshot(root,JSON.parse(await io.fs.readFile(opts.input,'utf8')),opts.dryRun);
  } else {
    if(opts['body-file']) opts.body=await io.fs.readFile(opts['body-file'],'utf8');
    result=await io.create(root,opts);
  }
  console.log(JSON.stringify(result,null,2));
}
if(require.main===module) main().catch(e=>{console.error(e.message);process.exitCode=1;});
module.exports={main};
