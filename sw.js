const V='sauce-v22',SHELL=['./','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png','./apple-touch-icon.png','./icon-dark-192.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>!x.startsWith(V)).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;const u=new URL(r.url);
 const same=u.origin===location.origin,font=u.hostname==='fonts.googleapis.com'||u.hostname==='fonts.gstatic.com';if(!same&&!font)return;
 const name=same?V:V+'-fonts';
 e.respondWith(caches.open(name).then(async c=>{const h=await c.match(r,{ignoreSearch:true});
  const f=fetch(r).then(n=>{if(n&&(n.ok||n.type==='opaque'))c.put(r,n.clone());return n}).catch(()=>null);
  return h||(await f)||(same?c.match('./index.html'):Response.error())}))});
