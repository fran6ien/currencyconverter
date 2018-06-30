//This is the service worker with the Cache-first network

var CACHE = 'precache';
var precacheFiles = [
      './',
      './index.html',
      './style.css',
      './app.js',
      './manifest.json',
      './images/chrome-favicon-16-16.png',
      './images/chrome-extensionmanagementpage-48-48.png',
      './images/chrome-installprocess-128-128.png',
      './images/android-launchericon-48-48.png',
      './images/android-launchericon-72-72.png',
      './images/android-launchericon-96-96.png',
      './images/android-launchericon-144-144.png',
      './images/android-launchericon-192-192.png',
      './images/android-launchericon-512-512.png',
      
    ];

//Install stage sets up the cache-array to configure pre-cache content
self.addEventListener('install', function(evt) {
  console.log('The service worker is being installed.');
  evt.waitUntil(
    caches.open(CACHE).then(function (cache) {
      return cache.addAll(precacheFiles);
    })
  );
});

//allow sw to control of current page
self.addEventListener('activate', function(evt) {
  console.log('Claiming clients for current page');
  return self.clients.claim();
});

self.addEventListener('fetch', function(evt) {
  console.log('The service worker is serving the asset.'+ evt.request.url);
  evt.respondWith(fromCache(evt.request).catch(fromServer(evt.request)));
  evt.waitUntil(update(evt.request));
});



function fromCache(request) {
  //we pull files from the cache first thing so we can show them fast
  return caches.open(CACHE).then(function (cache) {
    return cache.match(request).then(function (matching) {
      return matching || Promise.reject('no-match');
    });
  });
}

function update(request) {
  //this is where we call the server to get the newest version of the 
  //file to use the next time we show view
  return caches.open(CACHE).then(function (cache) {
    return fetch(request).then(function (response) {
      return cache.put(request, response);
    });
  });
}

function fromServer(request){
  //this is the fallback if it is not in the cache to go to the server and get it
  return fetch(request).then(function(response){ return response});
}
