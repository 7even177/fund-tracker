const CACHE='fund-tracker-v2';
const ASSETS=['/fund-tracker/','/fund-tracker/index.html','/fund-tracker/manifest.json','/fund-tracker/icon-192.png','/fund-tracker/icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS).catch(()=>{})).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
  const u=e.request.url;
  if(u.includes('fundgz')||u.includes('eastmoney')||u.includes('codetabs')||u.includes('allorigins')||u.includes('generativelanguage')||u.includes('dashscope'))return;
  e.respondWith(fetch(e.request).then(r=>{const c=r.clone();caches.open(CACHE).then(cache=>cache.put(e.request,c));return r}).catch(()=>caches.match(e.request)));
});
