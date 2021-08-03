// importScripts("/web.worker.umd.js");

/* eslint-disable no-restricted-globals */
self.addEventListener('activate', async () => {
    self.clients.claim();
    console.log('service worker activate');
});

self.addEventListener("fetch", function (event) {
    //console.log("??", "fetch", event);
    // event.respondWith(fetch(event.request));
});

// self.addEventListener('push', function (event) {

//     const raiseConfig = event.data.json();
//     const promiseChain = self.raiseGlueNotification(raiseConfig);

//     event.waitUntil(promiseChain);
// });

// self.GlueWebWorker({
//     platform: {
//         url: "http://localhost:9000/",
//         openIfMissing: true
//     }
// });
