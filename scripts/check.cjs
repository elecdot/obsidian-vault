'use strict';
const io=require('./io.cjs');
async function main() {
  await io.contract();
  const files=await io.inventory(),problems=[];
  for(const f of files) {
    if(f.path.endsWith('.base') || f.path.endsWith('.yaml')) {
      try {io.yaml(await io.read(io.ROOT,f.path));}catch(e){problems.push(`${f.path}: ${e.message}`);}
    }
    if(!f.path.endsWith('.md') || !/^(docs\/|\.agents\/|README\.md$|AGENTS\.md$|CONTEXT\.md$)/.test(f.path)) continue;
    for(const m of f.text.matchAll(/\[[^\]]+\]\(([^)]+)\)/g)) {
      const target=m[1];if(/^[a-z][a-z0-9+.-]*:/i.test(target)) continue;
      const [rel,anchor]=target.split('#');
      const dest=rel?io.path.posix.normalize(io.path.posix.join(io.path.posix.dirname(f.path),rel)):f.path;
      const linked=files.find(x=>x.path===dest);
      if(!linked) {problems.push(`${f.path}: missing ${target}`);continue;}
      if(anchor && linked.text) {
        const anchors=[...linked.text.matchAll(/^#{1,6}\s+(.+)$/gm)].map(x=>x[1].toLowerCase().replace(/[^\w -]/g,'').replace(/ /g,'-'));
        if(!anchors.includes(anchor)) problems.push(`${f.path}: missing anchor ${target}`);
      }
    }
  }
  const audit=await io.audit();problems.push(...audit.findings.filter(x=>x.level==='error').map(x=>`${x.path}: ${x.message}`));
  for(const p of problems) console.error(p);
  console.log(`Checked contract, support links, YAML assets and content: ${problems.length} errors.`);
  if(problems.length) process.exitCode=1;
}
main().catch(e=>{console.error(e.message);process.exitCode=1;});
