byte isGameGoing = 1;
byte isGameOnBreak = 0;
byte score = 0;
int temp = 0;
int sensorPin = 5;

void setup()
{
  pinMode(A0, OUTPUT);
  pinMode(A1, OUTPUT);
  pinMode(A2, OUTPUT);
  pinMode(sensorPin, INPUT);
  digitalWrite(sensorPin, HIGH);

  Serial.begin(115200); //9600 115200
  SendData();
  analogWrite(A0, 255);delay(200);analogWrite(A0, 0);
  analogWrite(A1, 255);delay(200);analogWrite(A1, 0);
  analogWrite(A2, 255);delay(200);analogWrite(A2, 0);
}
int sensorState = 0, lastState=0;

void loop()
{
  if (Serial.available())
  {
    char cmd = Serial.read();
    switch (cmd)
    {
    case 'G':
      isGameGoing = isGameGoing == 1 ? 0 : 1; //GO or stop
      analogWrite(A1, 255);      
      delay(200);
      analogWrite(A1, 0);
      break;
    case 'B':
      isGameOnBreak = isGameOnBreak == 1 ? 0 : 1; //Break or end break
      analogWrite(A2, 255);delay(200);analogWrite(A2, 0);
      break;
    case 'R':
      isGameGoing = 0; // Reset
      isGameOnBreak = 0;
      score = 0;
      temp = 0;
      analogWrite(A0, 255);delay(200);analogWrite(A0, 0);
      analogWrite(A1, 255);delay(200);analogWrite(A1, 0);  
      analogWrite(A2, 255);delay(200);analogWrite(A2, 0);
      break;
    }
    Serial.flush();
    SendData();
  }

  if (isGameGoing && !isGameOnBreak)
  {
    sensorState= digitalRead(sensorPin);
 
    if (sensorState == LOW) {     
       analogWrite(A0, 255);
       score++;
       SendData();
      delay(500);
    } 
    else {
    // turn LED off:
     analogWrite(A0, 0);
    }
    // temp++;
    // if (temp > 10)
    // {
    //   score++;
    //   temp = 0;
    //   SendData();
    // }
    // delay(500);
  }
  
   
}

void SendData()
{
  byte buffer[3] = {
      (byte)score,
      (byte)isGameGoing,
      (byte)isGameOnBreak};
  Serial.write(buffer, sizeof(buffer));
  Serial.flush();
}
