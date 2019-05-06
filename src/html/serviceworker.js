'use strict';

var CACHE_NAME = 'toritoma-cache-20190506';
var urlsToCache = [
    './favicon.ico',
    './index.html',
    './main.js',
    './manifest.json',
    './platformweb.js',
    './serviceworker.js',
    './style.css',
    './fonts/NotoSansCJKjp-Regular-min.ttf',
    './images/back.png',
    './images/control.png',
    './images/howtoimage.png',
    './images/icon_192.png',
    './images/image_16x16.png',
    './images/image_16x16_ss.json',
    './images/image_32x32.png',
    './images/image_32x32_ss.json',
    './images/image_64x64.png',
    './images/image_64x64_ss.json',
    './images/image_8x8.png',
    './images/image_8x8_ss.json',
    './map/stage0.json',
    './map/stage1.json',
    './map/stage2.json',
    './map/stage3.json',
    './map/stage4.json',
    './map/stage5.json',
    './map/stage6.json',
    './sound/bomb_min.mp3',
    './sound/boss.mp3',
    './sound/clear.mp3',
    './sound/cursor.mp3',
    './sound/hit.mp3',
    './sound/lastboss.mp3',
    './sound/miss.mp3',
    './sound/pause.mp3',
    './sound/select.mp3',
    './sound/stage1.mp3',
    './sound/stage2.mp3',
    './sound/stage3.mp3',
    './sound/stage4.mp3',
    './sound/stage5.mp3',
    './sound/stage6.mp3',
];

self.addEventListener('install', function(event) {
    // Perform install steps
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function(cache) {
                // console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
            .catch(function(reason) {
                console.log('Install error: ' + reason);
            })
        );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
            .then(function(response) {
                // Cache hit - return response
                if (response) {
                    return response;
                }
                return fetch(event.request);
            })
            .catch(function(reason) {
                console.log('Fetch error: ' + reason);
            })
        );
});

self.addEventListener('activate', function(event) {

    var cacheWhitelist = [CACHE_NAME];
  
    event.waitUntil(
        caches.keys()
            .then(function(cacheNames) {
                return Promise.all(
                    cacheNames.map(function(cacheName) {
                        if (cacheWhitelist.indexOf(cacheName) === -1) {
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
            .catch(function(reason) {
                console.log('Activate error: ' + reason);
            })
    );
});
