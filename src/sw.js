
const CACHE = 'PWA-Serverless-cache';
const precacheCustom = ['https://fonts.googleapis.com/css?family=Orbitron'];

const AzureURL = //'https://fa-d-progressive-01.azurewebsites.net/runtime/webhooks/durabletask/instances/6cac581543eb49ca8da9e708322c447d/raiseEvent/{eventName}?taskHub=DurableFunctionsHub&connection=Storage&code=ab7VivCvLteGmO7zgkK93ZHLH0oARrtt/YGwOpCCmWl6o7auDwQamg==';
'https://pwaserverless.azurewebsites.net/api/GetScores';

self.importScripts('vendor/idb.js')

const scoresDb = idb.openDB('ScoreHistory');
 
function getLocalRecords() {
    return scoresDb.then(db => 
        db.transaction('scoreFiles')
          .objectStore('scoreFiles')
          .getAll());
  }
function clearStorage(){
    return scoresDb.then(db => 
        db.transaction('scoreFiles', 'readwrite')
          .objectStore('scoreFiles')
          .clear());
}

 function persistLocalChanges() {
    console.log('persistLocalChanges, link syncing 😀');
    return getLocalRecords().then(records =>{
        return fetch(AzureURL, {
            method: 'POST',
            body: JSON.stringify({ 
              scores: records
            }),
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin':'*'
            },
            mode: 'cors',
        }).then( () =>{
            return clearStorage();
        }).then(()=>{
            self.registration.showNotification('Latest scores send to Azure. 🐱‍👤',{ });
        })
        .catch(err=>{
            console.log(err.message, '😒');
        })
    })
};


self.addEventListener('install', function (evt) {
    console.log('The service worker is being installed.');
    evt.waitUntil(precache());
});

self.addEventListener('fetch', function (event) {
    if (event.request.method !== "GET") return;

    event.respondWith(
        fetch(event.request, { mode: 'cors' })
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
        return cache.addAll(__precacheManifest.map(pm => pm.url).concat(precacheCustom));
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

self.addEventListener('sync', function (event) {
    if (event.tag == 'syncToAzure') {
        event.waitUntil(persistLocalChanges());
    }
});

