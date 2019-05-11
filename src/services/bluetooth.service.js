import {
  all
} from "q";

export const bluetoothService = {
  connect,
  send,
  disconnect
};

const textDecoder = new TextDecoder();
const textEncoder = new TextEncoder();

const serviceUUID = '6e400001-b5a3-f393-e0a9-e50e24dcca9e';
const writeUUID = '6e400002-b5a3-f393-e0a9-e50e24dcca9e';
const notifyUUID = '6e400003-b5a3-f393-e0a9-e50e24dcca9e';
const custom = '6e40001F-b5a3-f393-e0a9-e50e24dcca9e';
//6e400003-b5a3-f393-e0a9-e50e24dcca9e';

let myChar, myDevice, interval, myService;

let outputChar;

async function connect() {
  try {
    let options = {
      acceptAllDevices: true,
      optionalServices: [serviceUUID, writeUUID, notifyUUID]
    };
    console.log('Requesting Bluetooth Device...');
    let device = await navigator.bluetooth.requestDevice(options);
    let server = await device.gatt.connect();
    let service = await server.getPrimaryService(serviceUUID);
    await delay(1000);
    let characteristic;
    try {
      characteristic = await service.getCharacteristic(notifyUUID);
    } catch (err) {
      await delay(1000);
      try {
        characteristic = await service.getCharacteristic(notifyUUID);
      } catch (err) {
        await delay(1000);
        characteristic = await service.getCharacteristic(notifyUUID);
      }
    }
    await characteristic.startNotifications()
    await characteristic.addEventListener('characteristicvaluechanged',
      handleCharacteristicValueChanged);
    console.log('Device connected, listening for events...');

  } catch (err) {
    console.log(err.message);
  }
  // return new Promise((res, rej) => {
  //   navigator.bluetooth.requestDevice({
  //         filters: [
  //           {services: [service]}
  //         ],
  //         allowedServices:all,
  //      //   optionalServices: [service,write,notify]
  //     })
  //     .then(device => {
  //       myDevice = device;
  //       return device.gatt.connect();
  //     })
  //     .then(server => {
  //       return server.getPrimaryServices();
  //     })
  //     .then(servers => {
  //       console.log(servers);
  //     })
  //     .then(server => server.getPrimaryService(service))
  //     //.then(service => delay(1500).then(()=>service.getCharacteristics()))
  //     .then(service => service.getCharacteristics())
  //     .then(s=>{
  //       console.log(s);
  //     // .then(service => service.getCharacteristic(transmit))
  //     // .then(characteristic => {
  //     // //   myChar = characteristic;
  //       outputChar = s[0];
  //       return s[1].startNotifications().then(characteristic => {
  //         characteristic.addEventListener('characteristicvaluechanged',
  //                                         handleCharacteristicValueChanged);
  //         console.log('Notifications have been started.');
  //       })
  //     }).catch(err=>{
  //        console.log(err.message);
  //     })
  // });
}

function disconnect() {

}

function send(message) {
  outputChar.writeValue(textEncoder.encode(message));
}

function handleCharacteristicValueChanged(value) {
 alert(textDecoder.decode(value.target.value));
}

function delay(time) {
  return new Promise(res => {
    setTimeout(() => {
      res();
    }, time);
  });
}