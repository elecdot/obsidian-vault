'use strict';
const core=require('./core.cjs');
// Accept a selected item snapshot, never infer a global library from itemID/libraryID.
function snapshotPlan(data) {
  if(!data || Array.isArray(data) || typeof data!=='object') throw new Error('Expected one selected Zotero item object');
  const match=String(data.uri || '').match(/^https?:\/\/(?:www\.)?zotero\.org\/(users|groups)\/(\d+)\/items\/([A-Z0-9]{8})\/?$/);
  if(!match) throw new Error('A synced library-scoped Zotero item URI is required; local/unknown identities need a verified profile or a manual Source');
  const [,scope,id,key]=match;
  if((data.itemKey || data.key) && (data.itemKey || data.key)!==key) throw new Error('Item key disagrees with URI');
  if(typeof data.title!=='string' || !data.title.trim()) throw new Error('Snapshot needs a title');
  const title=data.title.replace(/[\r\n]+/g,' ').trim();
  const uri=`https://zotero.org/${scope}/${id}/items/${key}`;
  const desktop=`zotero://select/${scope==='groups'?`groups/${id}`:'library'}/items/${key}`;
  const meta={kind:'source','managed-by':'zotero','source-id':uri,'zotero-uri':desktop,aliases:[title]};
  if(data.url && /^https?:\/\//.test(data.url)) meta.url=data.url;
  const authors=(data.creators || []).map(a=>a.name || [a.firstName,a.lastName].filter(Boolean).join(' ')).filter(Boolean);
  if(authors.length) meta.authors=authors;
  const year=String(data.date || data.year || '').match(/\b\d{4}\b/);if(year) meta.year=year[0];
  if(data.citationKey || data.citekey) meta['citation-key']=String(data.citationKey || data.citekey);
  const tags=(data.tags || []).map(t=>typeof t==='string'?t:t.tag).filter(t=>typeof t==='string' && t.trim());
  if(tags.length) meta['zotero-tags']=[...new Set(tags)];
  let body=`[Open in Zotero](${desktop})\n\n> [!info] Imported material\n> This file is reproducible from its selected Zotero snapshot. Keep your own reading and interpretation in separate Notes.\n`;
  const quote=text=>String(text).split(/\r?\n/).map(line=>`> ${line}`).join('\n');
  for(const [i,a] of (data.annotations || []).entries()) {
    body+=`\n## Annotation ${i+1}${a.pageLabel ? ` — page ${String(a.pageLabel).replace(/[\r\n]/g,' ')}`:''}\n\n`;
    if(a.annotatedText || a.text) body+=quote(a.annotatedText || a.text)+'\n';
    if(a.comment) body+='\nZotero comment:\n\n'+quote(a.comment)+'\n';
    if(typeof a.desktopURI==='string' && /^zotero:\/\//.test(a.desktopURI)) body+=`\n[Annotation location](${encodeURI(a.desktopURI).replace(/\(/g,'%28').replace(/\)/g,'%29')})\n`;
  }
  for(const [i,n] of (data.notes || []).entries()) {
    const text=typeof n==='string'?n:n.note;
    if(text) body+=`\n## Zotero note ${i+1}\n\n${quote(text)}\n`;
  }
  return {path:`sources/zotero-${scope}-${id}-${key.toLowerCase()}/source.md`,meta,text:core.render(meta,title,body)};
}
function assertOwned(existing, expected) {
  if(existing['managed-by']!=='zotero' || existing.kind!=='source' || existing['source-id']!==expected['source-id']) throw new Error('Existing target is not owned by this import identity; refusing replacement');
}
module.exports={snapshotPlan,assertOwned};
