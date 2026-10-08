importScripts("./vendor/scramjet/scramjet.all.js");

const {ScramjetServiceWorker}=self.$scramjetLoadWorker();
const scramjet=new ScramjetServiceWorker();

async function restoreEscapedHtml(response,request){
  if(!['document','iframe'].includes(request.destination)||!response.body)return response;
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

  const html=await response.text();
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
}

self.addEventListener('install',event=>event.waitUntil(self.skipWaiting()));
self.addEventListener('activate',event=>event.waitUntil(self.clients.claim()));
self.addEventListener('fetch',event=>{
  event.respondWith((async()=>{
    await scramjet.loadConfig();
    if(scramjet.route(event)){
      const response=await scramjet.fetch(event);
      return restoreEscapedHtml(response,event.request);
    }
    return fetch(event.request);
  })());
});
