// const start = async (glue) => {
//     const ws = new WebSocket('ws://localhost:4224');

//     ws.onmessage = (data) => {
//         const notificationConfig = JSON.parse(data.data);
//         glue.notifications.raise(notificationConfig);
//     };
// }

const start = async (glue, config) => {
    const sw = await config.sw;

    const subOptions = {
        userVisibleOnly: true,
        applicationServerKey: 'BBSl8XfJ0039yNWr8VgOBjCgiGlM512hj6-8sTdISKguwoLZf3EKoLojoi8j5NSHtMVdMm0EAXZ_tj_F9qBIpcg'
    };

    const pushSub = await sw.pushManager.subscribe(subOptions);

    await fetch('http://localhost:4224/api/push-sub', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(pushSub.toJSON())
    });

}






































// const start = async (glue) => {
//     const sw = await navigator.serviceWorker.register('/service-worker.js');

//     const permission = await window.Notification.requestPermission();

//     if (permission !== 'granted') {
//         console.error('Permission not granted for Notifications');
//     }

//     const channel = new BroadcastChannel('glue42-core-worker');
//     channel.addEventListener('message', async (event) => {

//         const eventData = event.data;

//         console.log("---notification click -----");
//         console.log(eventData);

//     });

//     await glue.interop.register("T42.GNS.Publish.RaiseNotification", async (args) => {

//         const notificationData = args.notification;

//         const title = notificationData.title;
//         const options = {
//             body: notificationData.description,
//             data: notificationData.data,
//             actions: [
//                 {
//                     action: 'newWsp',
//                     title: 'Open Client'
//                 }
//             ]
//         };

//         sw.showNotification(title, options);

//     });

//     // glue.appManager.application('trigger').start(undefined, { top: 100, left: 100, width: 700, height: 400 });
// };

// const start = async () => {
//     console.log(1);
//     if (!('serviceWorker' in navigator)) {
//         // Service Worker isn't supported on this browser, disable or hide UI.
//         return;
//     }
//     console.log(2);
//     if (!('PushManager' in window)) {
//         // Push isn't supported on this browser, disable or hide UI.
//         return;
//     }
//     console.log(3);
//     const sw = await navigator.serviceWorker.register('/service-worker.js');
//     console.log(4);
//     const permission = await window.Notification.requestPermission();

//     if (permission !== 'granted') {
//         console.error('Permission not granted for Notifications');
//         return;
//     }
//     console.log(5);
//     const subOptions = {
//         userVisibleOnly: true,
//         applicationServerKey: 'BBSl8XfJ0039yNWr8VgOBjCgiGlM512hj6-8sTdISKguwoLZf3EKoLojoi8j5NSHtMVdMm0EAXZ_tj_F9qBIpcg'
//     };
//     console.log(6);
//     const pushSub = await sw.pushManager.subscribe(subOptions);

//     console.log(pushSub.toJSON());

//     await fetch('http://localhost:4224/api/push-sub', {
//         method: 'POST',
//         headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(pushSub.toJSON())
//     });

//     const channel = new BroadcastChannel('glue42-core-worker');
//     channel.addEventListener('message', async (event) => {

//         const eventData = event.data;

//         console.log("---notification click -----");
//         console.log(eventData);

//     });
// };


window.notificationPluginStart = start;