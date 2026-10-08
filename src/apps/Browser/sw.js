importScripts("./vendor/scramjet/scramjet.all.js");

const {ScramjetServiceWorker}=self.$scramjetLoadWorker();
const scramjet=new ScramjetServiceWorker();

self.addEventListener('install',event=>event.waitUntil(self.skipWaiting()));
self.addEventListener('activate',event=>event.waitUntil(self.clients.claim()));
self.addEventListener('fetch',event=>{
  event.respondWith((async()=>{
    await scramjet.loadConfig();
    if(scramjet.route(event))return scramjet.fetch(event);
    return fetch(event.request);
  })());
});
