navigator.serviceWorker.register('/sw.js');

Notification.requestPermission();

navigator.serviceWorker.ready.then(function (swRegistration) {
    document.body.addEventListener('saveData', () => {
        swRegistration.sync.register('syncToAzure');
    })
});