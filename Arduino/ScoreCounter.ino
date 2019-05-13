#include <Adafruit_NeoPixel.h>
#include <Arduino.h>
#include <SPI.h>
#include "Adafruit_BLE.h"
#include "Adafruit_BluefruitLE_SPI.h"
#include "Adafruit_BluefruitLE_UART.h"

#define VERBOSE_MODE                   true  // If set to 'true' enables debug output
#define BLUEFRUIT_SPI_CS               8
#define BLUEFRUIT_SPI_IRQ              7
#define BLUEFRUIT_SPI_RST              4    // Optional but recommended, set to -1 if unused

#if SOFTWARE_SERIAL_AVAILABLE
  #include <SoftwareSerial.h>
#endif


#define FACTORYRESET_ENABLE     1
#define PIN                     A1
#define NUMPIXELS               8

int sensorPin = A4;

    #define MINIMUM_FIRMWARE_VERSION    "0.6.6"
    #define MODE_LED_BEHAVIOUR          "BLEUART"

Adafruit_NeoPixel pixel = Adafruit_NeoPixel(NUMPIXELS, PIN);
Adafruit_BluefruitLE_SPI ble(BLUEFRUIT_SPI_CS, BLUEFRUIT_SPI_IRQ, BLUEFRUIT_SPI_RST);


// A small helper
void error(const __FlashStringHelper*err) {
  Serial.println(err);
  while (1);
}

/**************************************************************************/
/*!
    @brief  Sets up the HW an the BLE module (this function is called
            automatically on startup)
*/
/**************************************************************************/
void setup(void)
{
  pixel.begin(); // This initializes the NeoPixel library.
  pixel.setPixelColor(0, pixel.Color(32, 0, 0));
  pixel.show();
  
 // while (!Serial);  // required for Flora & Micro
  delay(100); 
  
  setColorOnOff(0,255,255,50);
  Serial.begin(115200);
 
  if ( !ble.begin(VERBOSE_MODE) )
  {
    error(F("Couldn't find Bluefruit, make sure it's in CoMmanD mode & check wiring?"));
  }

//
  if ( FACTORYRESET_ENABLE )
  {
    /* Perform a factory reset to make sure everything is in a known state */
    
    if ( ! ble.factoryReset() ){
      error(F("Couldn't factory reset"));
    }
  }
 
  ble.verbose(false);  // debug info is a little annoying after this point!

  setColorOn(0,255,0,50);
 
   /* Wait for connection */
  while (! ble.isConnected()) {
      delay(500);
  }
  
  //setColorOn(255,0,0,50);
  // LED Activity command is only supported from 0.6.6
  if ( ble.isVersionAtLeast(MINIMUM_FIRMWARE_VERSION) )
  {
      ble.sendCommandCheckOK("AT+HWModeLED=" MODE_LED_BEHAVIOUR);
  }

  //setColorOn(255,255,0,50);
   ble.setMode(BLUEFRUIT_MODE_DATA);
  //setColorOn(0,0,255,50);
  

  pinMode(sensorPin, INPUT);
  analogWrite(sensorPin, HIGH);
  
  setColorOn(255,255,255,50);
  
}
int sensorState = 0, lastState=0;

void loop(void)
{
  delay(100);

  if (Serial.available() > 0)
  {
    setColorOnOff(0,0,255,50);
  }

    sensorState= analogRead(sensorPin);
 
    if (sensorState == LOW) {  
      ble.print("AT+BLEUARTTX=");
      ble.println("SCORE");      
      setColorOn(255,0,255,50);
      delay(1000);
    }else{
      setColorOn(0,0,0,0);
    }
}

void setColor(byte R, byte G, byte B) {
  for (uint8_t i = 0; i < NUMPIXELS; i++) {
    pixel.setPixelColor(i, pixel.Color(R, G, B)); // off
  }
  pixel.show();
}

void setColorOn(byte R, byte G, byte B, int d) {
  for (uint8_t i = 0; i < NUMPIXELS; i++) {
    pixel.setPixelColor(i, pixel.Color(R, G, B)); // off
    pixel.show();
    delay(d);
  } 
}

void setColorOnOff(byte R, byte G, byte B, int d) {
  setColorOn(R,G,B,d);
  setColorOn(0,0,0,d);
}

void SendData()
{
  byte buffer[3] = {
      (byte)65,
      (byte)67,
      (byte)80};
  Serial.write(buffer, sizeof(buffer));
  Serial.flush();
}
