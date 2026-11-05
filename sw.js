// Offline cache for the app shell (network first, so updates on GitHub show up right away).
const CACHE = "lulusia-studio-v1";
const FILES = ["./", "index.html", "manifest.webmanifest", "assets/glyphs.json", "assets/logo.png",
               "assets/Inter-Black.otf", "assets/icon-180.png", "assets/icon-192.png", "assets/icon-512.png"];
self.addEventListener("install", e => e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES))));
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET" || !e.request.url.startsWith(self.location.origin)) return;   // never cache the Graph API
  e.respondWith(fetch(e.request).then(r => { const copy = r.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)); return r; })
    .catch(() => caches.match(e.request)));
});
