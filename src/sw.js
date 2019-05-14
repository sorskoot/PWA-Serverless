const CACHE = 'PWA-Serverless-cache';

const precacheCustom =['https://fonts.googleapis.com/css?family=Orbitron'];

self.addEventListener('install', function(evt) {
  console.log('The service worker is being installed.');
  evt.waitUntil(precache());
});

self.addEventListener('fetch', function(event) {
  if (event.request.method !== "GET") return;

  event.respondWith(
    fetch(event.request,{mode: 'cors'})
      .then(function (response) {
        
        // If request was success, add or update it in the cache
        event.waitUntil(updateCache(event.request, response.clone()));

        return response;
      })
      .catch(function (error) {
        console.log("Network request Failed. Serving content from cache: " + error);
        return fromCache(event.request);
      })
  );
});

function precache() {
  return caches.open(CACHE).then(function (cache) {
    return cache.addAll( __precacheManifest.map(pm=>pm.url).concat(precacheCustom) );
  });
}

function updateCache(request, response) {
  return caches.open(CACHE).then(function (cache) {
    return cache.put(request, response);
  });
}


function fromCache(request) {
  // Check to see if you have it in the cache
  // Return response
  // If not in the cache, then return error page
  return caches.open(CACHE).then(function (cache) {
    return cache.match(request).then(function (matching) {
      if (!matching || matching.status === 404) {
        return Promise.reject("no-match");
      }

      return matching;
    });
  });
}