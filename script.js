var textDecoder = new TextDecoder();
var textEncoder = new TextEncoder();

let BlunoService = '0000dfb0-0000-1000-8000-00805f9b34fb';
let BlunoCharacteristic = '0000dfb1-0000-1000-8000-00805f9b34fb'

let output = document.querySelector('#output');

let myChar, myDevice, interval;

document.querySelector('#btn-connect').addEventListener('click', () => {
  navigator.bluetooth.requestDevice(
    {
      filters: [
        { services: [BlunoService] }
      ]
    })
    // .then(device => {
    //   myDevice = device; 
    //   return device.gatt.connect();
    // })
    .then(device => device.gatt.connect())
    .then(server => server.getPrimaryService(BlunoService))
    .then(service => service.getCharacteristic(BlunoCharacteristic))

    .then(characteristic => {
      myChar = characteristic;
      // characteristic.addEventListener('characteristicvaluechanged',
      //   handleCharacteristicValueChanged);
      interval = setInterval(() => myChar.readValue('utf-8')
                                    .then(v=>handleCharacteristicValueChanged(v))
      , 500);
      output.innerText += 'Notifications have been started.\n';
    })
    .catch(error => {
      output.innerText += error
    });

  function handleCharacteristicValueChanged(value) {
   // var value = event.target.value;
   
    if (value.byteLength === 3) {
      var score = value.getUint8(0);
      var gameGoing = value.getUint8(1);
      var gameBreak = value.getUint8(2);
      document.querySelector("#score").innerText = score;
      document.querySelector("#game").innerText = gameGoing;
      document.querySelector("#break").innerText = gameBreak;
    }
    //  output.innerText+=`${score}, ${gameGoing}, ${gameBreak}\n`
    // var decoded = t.decode(value);
    // if(decoded==='ARGun KeyPressed'){
    //   document.body.style.backgroundColor=getRandomColor();
    // }
    // console.log(decoded);
  }
});
document.querySelector("#btn-disconnect").addEventListener('click', e => {
  if (myDevice && myDevice.gatt.connected) {
    myDevice.gatt.disconnect().then(() => output.innerText += 'disconnected');
  } else {
    output.innerText += 'not connected';
  }
});

document.querySelector("#btn-start").addEventListener('click', e => {
  if (myChar) {
    myChar.writeValue(textEncoder.encode('G'));
  }
});
document.querySelector("#btn-break").addEventListener('click', e => {
  if (myChar) {
    myChar.writeValue(textEncoder.encode('B'));
  }
});
document.querySelector("#btn-reset").addEventListener('click', e => {
  if (myChar) {
    myChar.writeValue(textEncoder.encode('R'));
  }
});

