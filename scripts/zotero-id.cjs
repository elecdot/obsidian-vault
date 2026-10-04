'use strict';
function identity(uri) {
  const m=String(uri || '').match(/^https?:\/\/(?:www\.)?zotero\.org\/(users|groups)\/(\d+)\/items\/([A-Z0-9]{8})\/?$/);
  if(!m)throw new Error('A synced library-scoped Zotero item URI is required; local/unknown identities need a verified profile or a manual Source');
  const [,scope,id,key]=m;
  return {key,uri:`https://zotero.org/${scope}/${id}/items/${key}`,desktop:`zotero://select/${scope==='groups'?`groups/${id}`:'library'}/items/${key}`,path:`sources/zotero-${scope}-${id}-${key.toLowerCase()}/source.md`};
}
module.exports={identity};
