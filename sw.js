const CACHE="fund-tracker-v1";
const ASSETS=["/fund-tracker/","/fund-tracker/index.html","/fund-tracker/manifest.json","/fund-tracker/icon-192.png","https://cdn.jsdelivr.net/npm/chart.js"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{
  if(e.request.url.includes("fundgz")||e.request.url.includes("eastmoney")||e.request.url.includes("codetabs"))return;
  e.respondWith(fetch(e.request).then(resp=>{const clone=resp.clone();caches.open(CACHE).then(c=>c.put(e.request,clone));return resp}).catch(()=>caches.match(e.request)))
});