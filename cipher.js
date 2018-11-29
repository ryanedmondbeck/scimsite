var osc, envelope, fft;
var scaleArray = [110, 147, 220, 262, 370, 587, 880, 1175]; //default notes that play
var note = 0;
var STARTSTOP = false;
var cipher_choice = 0;  
var key;

function toggle() {
  STARTSTOP = !STARTSTOP;
}
//___________________________________________________________________________
// cipher calls
function select_none() {
  cipher_choice = 0;
  console.log("cipher choice", cipher_choice);
}
function select_caesar() {
  cipher_choice = 1;
  console.log("cipher choice", cipher_choice);
  key = Number(prompt("Please enter an integer to use as the key for the Caesar Cipher:"));
  console.log("chosen key", key);
}
function select_vigenere() {
  cipher_choice = 2;
  console.log("cipher choice", cipher_choice);
}
function select_hill() {
  cipher_choice = 3;
  console.log("cipher choice", cipher_choice);
}
//___________________________________________________________________________
//cipher functions
function caesar_cipher(x) {
  x = (x + key) % 26;
  return x;
}
//_______________________________________
function vigenere_cipher(array_of_chars) {
  scaleArray.length = 0;
  var key_word = prompt("Please enter a keyword to be used with the Vigenère Cipher:")
  //turn keyword string into numbers
  key_word = key_word.toLowerCase();
  key_word = key_word.replace(/\W/g, '');
  kw_array = key_word.split('');
  var kw_nums = [];
  for (var i = 0; i < kw_array.length; i++) {
    var n = kw_array[i].charCodeAt(0);
    n = n - 97;
    kw_nums.push(n);
  }
  console.log("keyword", kw_array);
  console.log("keyword nums", kw_nums);
  var kw_index = 0;
  for (var i = 0; i < array_of_chars.length; i++) {
    if (kw_index == kw_array.length - 1) {
      kw_index = 0;
    }
    var x = array_of_chars[i].charCodeAt(0);
    x = x - 97;
    x = (x + kw_nums[kw_index]) % 26;
    x = mapping(x);
    x = freq_conversion(x);
    scaleArray.push(x);
    kw_index++;
  }
}
//_______________________________________
function hill_cipher(array_of_chars) {
  scaleArray.length = 0;
  var key_matrix = [[1,2,3],[1,2,3],[1,2,3]];
  console.log("key matrix", key_matrix);
  var three = [];
  var x;
  var num_array = [];
  for (var i = 0; i < array_of_chars.length; i++) {
    x = array_of_chars[i].charCodeAt(0);
    x = x - 97; //create numbers 0 - 25
    num_array.push(x);
  }
  if (num_array.length % 3 == 1) {
    num_array.push(0);
    num_array.push(0);
  }
  if (num_array.length % 3 == 2) {
    num_array.push(0);
  }
  // console.log("num_array before", num_array);
  while (array_of_chars.length != 0) {
    for (var i = 0; i < 3; i++) {
      three.push(num_array.shift());
      array_of_chars.shift();
      // console.log("three", three);
    }
    for (var i = 2; i > -1; i--) {
      x = (three[i] * key_matrix[0][i]) + (three[i] * key_matrix[1][i]) + (three[i] * key_matrix[2][i]);
      three.pop();
      // console.log("x", x);
      x = x % 25;
      x = mapping(x);
      x = freq_conversion(x);
      scaleArray.push(x);
    }
  }
}
//___________________________________________________________________________

function getVal() {
  scaleArray.length = 0;
  var message = document.getElementById("textfield").value;
  message = message.toLowerCase();
  message = message.replace(/\W/g, '');
  var array_of_chars = message.split('');

  //caesar cipher
  if (cipher_choice == 1 || cipher_choice == 0) {
    for (var i = 0; i < array_of_chars.length; i++) {
      // console.log(array_of_chars[i].charCodeAt(0));
      x = array_of_chars[i].charCodeAt(0);
      x = x - 97; //create numbers 0 - 25
      //ciphers go here
      if (cipher_choice == 1) {
        x = caesar_cipher(x);
      }
      x = mapping(x);
      x = freq_conversion(x);
      scaleArray.push(x);
    }
  }

  //vigenere cipher
  if (cipher_choice == 2) {
    vigenere_cipher(array_of_chars);
  }
  //hill cipher
  if (cipher_choice == 3) {
    hill_cipher(array_of_chars);
  }
  console.log("scaleArray after everything", scaleArray);
}
function freq_conversion(x) {
  x = 2**((x-49)/12)*440;
  return x;
}
function mapping(x) {
   switch(x) {
      case 0:  
        x = 0;
        break;
      case 1:
        x = 2;
        break;
      case 2:
        x = 3;
        break;
      case 3:
        x = 5;
        break;
      case 4:
        x = 7;
        break;
      case 5:
        x = 9;
        break;
      case 6:
        x = 10;
        break; 
      case 7:  
        x = 12;
        break;
      case 8:
        x = 14;
        break;
      case 9:
        x = 15;
        break;
      case 10:
        x = 17;
        break;
      case 11:
        x = 19;
        break;
      case 12:
        x = 21;
        break;
      case 13:
        x = 23;
        break;
      case 14:  
        x = 24;
        break;
      case 15:
        x = 26;
        break;
      case 16:
        x = 27;
        break;
      case 17:
        x = 29;
        break;
      case 18:
        x = 31;
        break;
      case 19:
        x = 33;
        break;
      case 20:
        x = 35;
        break;  
      case 21:
        x = 36;
        break;
      case 22:
        x = 38;
        break;
      case 23:
        x = 39;
        break;
      case 24:
        x = 41;
        break;
      case 25:
        x = 43; 
        break;
    }
    x = x + 25; //for pianoroll note number
    return x;
}
//___________________________________________________________________________
function setup() {
  createCanvas(window.innerWidth, window.innerHeight/4);

  osc = new p5.SinOsc();
  // Instantiate the envelope
  envelope = new p5.Env();
  // set attackTime, decayTime, sustainRatio, releaseTime
  envelope.setADSR(0.001, 0.5, 0.1, 0.5);
  // set attackLevel, releaseLevel
  envelope.setRange(1, 0);
  osc.start();
  fft = new p5.FFT();
  noStroke();
}

function draw() {
  background(0);

  play_sequence();
  
  // plot FFT.analyze() frequency analysis on the canvas
  var waveform = fft.waveform();  // analyze the waveform
  beginShape();
  strokeWeight(5);
  for (var i = 0; i < waveform.length; i++){
    var x = map(i, 0, waveform.length, 0, width);
    var y = map(waveform[i], -1, 1, height, 0);
    vertex(x, y);
  }
  endShape();
}

function play_sequence() {
  if (STARTSTOP == true) {
    // osc.start();
    if (frameCount % 60 == 0 || frameCount % 30 == 0  || frameCount == 1) {
      var freqValue = scaleArray[note];
      osc.freq(freqValue);

      envelope.play(osc, 0, 0.1);
      note = (note + 1) % scaleArray.length;
    }
  }
  if (STARTSTOP == false) {
    // osc.stop();
    osc.amp(0);
  }
}
