// if (workbox) {
//   console.log(`Yay! Workbox is loaded 🎉`);
// } else {
//   console.log(`Boo! Workbox didn't load 😬`);
// }

const CACHE = 'PWA-Serverless-cache';

self.addEventListener('install', function(evt) {
  console.log('The service worker is being installed.');
  
  evt.waitUntil(precache());
});


self.addEventListener('fetch', function(evt) {
  console.log('The service worker is serving the asset.');
  evt.respondWith(fromNetwork(evt.request, 400).catch(function () {
    return fromCache(evt.request);
  }));
});

function precache() {
  return caches.open(CACHE).then(function (cache) {
    return cache.addAll( __precacheManifest.map(pm=>pm.url) );
  });
}

function fromNetwork(request, timeout) {
  return new Promise(function (resolve, reject) {
    var timeoutId = setTimeout(reject, timeout);
    fetch(request,{mode: 'cors'}).then(function (response) {
      clearTimeout(timeoutId);
      addToCache(request,response)
        .then((cachedResponse)=>resolve(cachedResponse));
    }, reject);
  });
}

function addToCache(request,response) {
  return caches.open(CACHE).then(function (cache) {
    return cache.put(request, response);
  });
}


function fromCache(request) {
  return caches.open(CACHE).then(function (cache) {
    return cache.match(request).then(function (matching) {
      return matching || Promise.reject('no-match');
    });
  });
}