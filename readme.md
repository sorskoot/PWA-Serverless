# Demo for PWA on Azure

## Serverless Progressive Web Appm using Azure Static Websites, Azure Functions and Azure storage

## about

The app will count scores using a bluetooth device (Bluno Beetle BLE) using the Web Bluetooth API. It will be hosted on Azure Static Websites and is able to run offline as a Progressive Web App. It keeps track of the scores locally and offline, and can sync back to Azure using Background Sync when it is online again. It is sending the data to Azure Functions, which in turn stores it in Azure Storage.