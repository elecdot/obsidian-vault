'use strict';
const http=require('node:http');
// Documented Better BibTeX API, fixed to the local desktop service; no retries.
function rpc(method,params) {
  if(!['item.citationkey','item.export','item.attachments'].includes(method))throw new Error('Unsupported read operation');
  return new Promise((resolve,reject)=>{
    const body=JSON.stringify({jsonrpc:'2.0',id:1,method,params});
    const req=http.request({hostname:'127.0.0.1',port:23119,path:'/better-bibtex/json-rpc',method:'POST',headers:{'Content-Type':'application/json','Content-Length':Buffer.byteLength(body)}},res=>{
      let text='';
      res.on('data',chunk=>{text+=chunk;if(text.length>20_000_000)req.destroy(new Error('Selected item response exceeds 20 MB'));});
      res.on('error',reject);
      res.on('end',()=>{
        try {
          if(res.statusCode!==200)throw new Error(`Better BibTeX HTTP ${res.statusCode}: ${text.slice(0,150)}`);
          const value=JSON.parse(text);
          if(value.error)throw new Error(`Better BibTeX: ${value.error.message}`);
          resolve(value.result);
        }catch(e){reject(e);}
      });
    });
    req.setTimeout(10000,()=>req.destroy(new Error('Better BibTeX request timed out')));
    req.on('error',reject);req.end(body);
  });
}
async function selectedSnapshot(choose, request=rpc, expectedTitle) {
  const selected=await request('item.citationkey',['selected']);
  const items=Object.entries(selected || {}).map(([key,citekey])=>{
    const m=key.match(/^(\d+):([A-Z0-9]{8})$/);
    if(!m || typeof citekey!=='string' || !citekey)throw new Error('Selected-item identity has an unsupported shape');
    return {library:Number(m[1]),key:m[2],citekey};
  });
  if(!items.length)throw new Error('Select a regular bibliographic item in Zotero first');
  let item;
  if(items.length===1)item=items[0];
  else {if(!choose)throw new Error('Select exactly one Zotero item');item=await choose(items);if(!item)return null;}
  const raw=await request('item.export',[[item.citekey],'36a3b0b5-bad0-4a04-b79b-441c7cef77db',item.library]);
  const exported=JSON.parse(typeof raw==='string'?raw:raw[2]);
  const candidates=(exported.items || []).filter(x=>(x.itemKey || x.key || String(x.uri || '').split('/').pop())===item.key);
  if(candidates.length!==1)throw new Error('Export did not unambiguously identify the selected item');
  const data=candidates[0];
  if(expectedTitle && data.title?.replace(/\s+/g,' ').trim().toLowerCase()!==expectedTitle.toLowerCase())throw new Error(`Selected title differs from the requested item: ${data.title}`);
  const attachments=await request('item.attachments',[item.citekey,item.library]);
  if(!Array.isArray(attachments))throw new Error('Unsupported attachment response; retain the snapshot for adapter review');
  data.annotations=attachments.flatMap(attachment=>(attachment.annotations || []).map(a=>({
    text:a.text || a.annotationText || '',comment:a.comment || a.annotationComment || '',
    pageLabel:a.pageLabel || a.annotationPageLabel || '',
    desktopURI:a.desktopURI || (attachment.open && a.key ? `${attachment.open}${attachment.open.includes('?')?'&':'?'}annotation=${encodeURIComponent(a.key)}` : attachment.open)
  })));
  data.citationKey=data.citationKey || item.citekey;
  return data;
}
module.exports={rpc,selectedSnapshot};
