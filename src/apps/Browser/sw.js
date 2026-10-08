importScripts("./vendor/scramjet/scramjet.all.js");

const {ScramjetServiceWorker}=self.$scramjetLoadWorker();
const scramjet=new ScramjetServiceWorker();

async function restoreEscapedHtml(response,request){
  if(!['document','iframe'].includes(request.destination)||!response.body)return response;
  try{
    const probe=response.clone().body;
    if(!probe)return response;
    const reader=probe.getReader();
    const decoder=new TextDecoder();
    let prefix='';
    while(prefix.length<256){
      const {done,value}=await reader.read();
      if(done)break;
      prefix+=decoder.decode(value,{stream:true});
      if(/^\s*(?:&lt;!doctype\s+html|&lt;html\b)/i.test(prefix)||prefix.length>=128)break;
    }
    reader.cancel().catch(error=>console.debug('Scramjet document probe cleanup failed:',error));
    if(!/^\s*(?:&lt;!doctype\s+html|&lt;html\b)/i.test(prefix))return response;

    const html=await response.clone().text();
    const restored=html
      .replace(/&amp;/gi,'&')
      .replace(/&lt;/gi,'<')
      .replace(/&gt;/gi,'>')
      .replace(/&quot;/gi,'"')
      .replace(/&#39;|&#x27;/gi,"'");
    const headers=new Headers(response.headers);
    headers.set('content-type','text/html; charset=utf-8');
    headers.delete('content-length');
    headers.delete('content-encoding');
    return new Response(restored,{status:response.status,statusText:response.statusText,headers});
  }catch(error){
    console.error('Unable to normalize escaped Scramjet HTML; preserving original response.',error);
    return response;
  }
}

function errorPage(error,request){
  const escape=value=>String(value).replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const details=error?.stack||error?.message||String(error);
  const html=`<!doctype html><html lang="fr"><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>Erreur du proxy</title><style>body{margin:2rem auto;padding:0 1rem;max-width:48rem;background:#171717;color:#f4f4f4;font:16px system-ui}pre{white-space:pre-wrap;overflow-wrap:anywhere;background:#292929;padding:1rem;border-radius:8px}code{color:#ffd166}</style><h1>Le proxy n’a pas pu charger cette page</h1><p>Adresse : <code>${escape(request.url)}</code></p><pre>${escape(details)}</pre><p>Vérifie le transport et le serveur proxy dans les réglages Réseau.</p></html>`;
  return new Response(html,{status:502,headers:{'content-type':'text/html; charset=utf-8','cache-control':'no-store'}});
}

self.addEventListener('install',event=>event.waitUntil(self.skipWaiting()));
self.addEventListener('activate',event=>event.waitUntil(self.clients.claim()));
self.addEventListener('fetch',event=>{
  event.respondWith((async()=>{
    try{
      await scramjet.loadConfig();
      if(scramjet.route(event)){
        const response=await scramjet.fetch(event);
        return await restoreEscapedHtml(response,event.request);
      }
      return await fetch(event.request);
    }catch(error){
      console.error('Scramjet request failed:',error);
      return errorPage(error,event.request);
    }
  })());
});
