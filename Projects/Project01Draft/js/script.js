"use strict";

/**
Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!
*/

// "Canvas" proportions (illustration background)
let canvaWidth = 1000;
let canvaHeight = 530;

// Fading Effect
let fadingEffect = {
  x: 0,
  y: 0,
  width: 1200,
  height: 1000,
  vx: 0,
  vy: 0,
  speed: 0.7,
  opacity: 255,
}

// User Input - Dino Call
let dinoCall = ``;

// TextBox (Intro)
let textBox = {
  x: 0,
  y: 0,
  width: 700,
  height: 100,
  radius: 15
}

// Timers - levels are timed
let timerCutScene = 9;
let timerChase = 10;
let timerJurassicMoment = 32;
let timerPetDino = 10;
let timerCredits = 53;

// Store data from JSON file - Car Ride State
let dinosaurusFacts = undefined;
let specificFact = undefined;
let index = 0;
let radioChannel = undefined;

// Background Image
let backImage = undefined;
// Jeep
let jeep = undefined;
let jeepImage = undefined;
// Vegetation
const NUM_PLANTS = 55;
const NUM_PLANTS_IMAGES = 4;
let plants = [];
let plantImages = [];

// Car Interior Background
let carInteriorImage = undefined;
// Dinosaur Mouth
let dinosaurMouthImage = undefined;
let dinosaurMouth = {
  x: 0,
  y: 0,
  width: 92,
  height: 128,
  image: undefined
}

// Obstacles
const NUM_OBSTACLES = 4;
const NUM_OBSTACLE_IMAGES = 10;
let obstacles = [];
let obstacleImages = [];

// Blood Splatter
let bloodSplatterImage = undefined;

// Dino
let stillDinoImage = undefined;
let roaringDinoImage = undefined;

//  User Mic
// Mic Input
let mic = undefined;

// Selfie
let capture = undefined;
let dinoCloseUpImage = undefined;
let bobbleHeadDollImage = undefined;

// Credits String
let credits = undefined;

let state = `carRide`; // Title, Intro/Instructions, CarRide, CutScene, Chase, BadEnding(01, 02), JurassicParkMoment, PetDino, Selfie, Credits

/**
Description of preload
*/
function preload() {

  // Fun Facts - Radio Channels
  dinosaurusFacts =  loadJSON(`assets/data/dinosaurs_facts.json`);

  // Jeep
  jeepImage = loadImage(`assets/images/clown.png`);

  // Jeep
  backImage = loadImage(`assets/images/radioBac.jpg`);

  // Vegetation
  for(let i = 0; i < NUM_PLANTS_IMAGES; i++){
    let plantImage = loadImage(`assets/images/vegetation${i}.png`);
    plantImages.push(plantImage);
  }

  // Car Interior Background
  carInteriorImage = loadImage(`assets/images/carP.png`);

  // Dinosaur Mouth
  dinosaurMouth = loadImage(`assets/images/mouth.png`);

  // Splatter
  bloodSplatterImage = loadImage(`assets/images/splatter.png`);

  // Obstacles
  for(let i = 0; i < NUM_OBSTACLE_IMAGES; i++){
    let obstacleImage = loadImage(`assets/images/animal${i}.png`);
    obstacleImages.push(obstacleImage);
  }

  // Dino
  stillDinoImage = loadImage(`assets/images/catRex12.png`);
  roaringDinoImage = loadImage(`assets/images/catRex22.png`);

  // Dino Close Up
  dinoCloseUpImage = loadImage(`assets/images/dinoCloseUp.png`);
  // Bobble Head Doll
  bobbleHeadDollImage = loadImage(`assets/images/doll2.png`);

}


/**
Description of setup
*/
function setup() {

createCanvas(windowWidth, windowHeight);
textFont(`Courier`);
textAlign(CENTER, CENTER);
textSize(20);
rectMode(CENTER);
imageMode(CENTER);
noStroke();
userStartAudio();


// Jeep
let x = width/2;
let y = height/2;
jeep = new Jeep(x, y, jeepImage);


// Vegetation
for(let i = 0; i < NUM_PLANTS; i++){
  let x = random(width/2 - canvaWidth/2, width/2 + canvaWidth/2);
  let y = random(height/2 - canvaHeight/2, height/2 + canvaHeight/2);
  let change = random(0, 1);
  if (change < 0.5){
      y = random(height/2 - canvaHeight/3, height/2 - canvaHeight/2);
    }
    else{
      y = random(height/2 + canvaHeight/4, height/2 + canvaHeight/2);
    }
  let plantImage = random(plantImages);
  let plant = new Vegetation (x, y, plantImage, change);
  plants.push(plant);
}

// Obstacles
for(let i = 0; i < NUM_OBSTACLES; i++){
  let x = random(width/2 + canvaWidth/3, width/2 + canvaWidth/2);
  let y = random(height/2 - canvaHeight/2, height/2 + canvaHeight/2);
  let obstacleImage = random(obstacleImages);
  let obstacle = new Obstacle(x, y, obstacleImage);
  obstacles.push(obstacle);
}

// User Mic
// Mic Input
mic = new p5.AudioIn();
mic.start();

// Capture User's Webcam
capture = createCapture(VIDEO);
capture.hide();

// Create Credits String
x = width/2;
y = 3*height/2;
credits = new Credits(x, y);

}


/**
Description of draw()
*/
function draw() {

  background(0);

  if (state === `title`){

    titleText();
    fadeIn();

  }
  else if (state === `intro`){

    introText();
    introTextBox();

  }
  else if (state === `carRide`){



    // Background Image
    image(backImage, width/2, height/2);

    // Vegetation
    for (let i = 0; i < plants.length; i++) {
      plants[i].update();
    }



    // Black rectangle
    push();
    fill(0);
    rect(7*width/8, height/2, 440, height);
    rect(width/8, height/2, 440, height);
    rect(width/2, height/8, width, 145);
    rect(width/2, 7*height/8, width, 145);
    pop();

    carRideText();

  }
  else if (state === `cutScene`){

    timingCutScene();
    backgroundColor();

    approachingDinosaur(); // Display "Approaching" Dinosaur Mouth - image expanding
    drawBorder(); // draw black rectabgle to best constrain Dinosaur Image to "Canva"

    cutSceneText();

    image(carInteriorImage, width/2, height/2); // Car Interior Background Image



  }
  else if (state === `chase`){

    chaseText();
    timingChase();

    // Jeep
    jeep.update();

    // Obstacles
    for (let i = 0; i < obstacles.length; i++) {
      obstacles[i].update(jeep);
    }

      // Black rectangle
      push();
      fill(0);
      rect(7*width/8, height/2, 440, height);
      pop();

  }
  else if (state === `badEnding01`){

    // Image Background (Blood Splatter)
    image(bloodSplatterImage, 2*width/3, 2*height/3);

    badEnding01Text();

  }
  else if (state === `jurassicParkMoment`){


    timingJurassicMoment();

    displayDino();
    scrollUpwards();
    jurassicParkMomentText();


  }
  else if (state === `petDino`){

    petDinoText();
    timingPetDino();

    // Mic Input Catching Dino's Attention
    let level = mic.getLevel();
    if (level > 0.1){
      state = `badEnding02`;
    }

  }
  else if (state === `badEnding02`){

    // Image Background (Blood Splatter)
    image(bloodSplatterImage, 2*width/3, 2*height/3);

    badEnding02Text();

  }
  else if (state === `selfie`){

    selfieText();
    image(capture, width/2, height/2, 1000, 630);
    image(dinoCloseUpImage, width/2 - canvaWidth/6, height/2 + canvaHeight/6);
    image(bobbleHeadDollImage, width/2 + canvaWidth/4, 2*height/3 + canvaHeight/13); // ugly to look at, I know, but it's logic math!


  }
  else if (state === `credits`){

    credits.update();
    timingCredits();

  }


}

function fgfgfg(){
  specificFact = dinosaurusFacts.facts[index];
  radioChannel = specificFact.fun_fact;

}

// Title
function fadeIn(){

  let fading = 0.5;

  push();
  fill(0, fadingEffect.opacity);
  fadingEffect.x = width/2;
  fadingEffect.y = height/2;
  rect(fadingEffect.x, fadingEffect.y, fadingEffect.width, fadingEffect.height);
  pop();

  fadingEffect.opacity -= fading;
}
function titleText(){
  push();
  fill(255);
  textSize(40);
  text(`JURASSIC PARK...`, width/2, height/7);
  text(`...MOMENT.`, width/2, 6*height/7);
  textSize(18);
  text(`Press ENTER to start your adventure.`, width/2, 12*height/13);
  pop();

}

// Intro
function introText(){
  push();
  fill(255);
  rect(width/2, height/2, 1000, 530);
  text(`You embark on your journey in search of the Jurassic Park Moment.`, width/2, height/7);
  text(`Among the lush vegetation, you hear a sound...Type it down as to document it. Press ENTER to confirm.`, width/2, 6*height/7);
  pop();

}
function introTextBox(){
  push();
  // White Textbox
  fill(255, 100);
  textBox.x = width/2;
  textBox.y = 3*height/5;
  rect(textBox.x, textBox.y, textBox.width, textBox.height, textBox.radius);
  // Display User Input
  fill(0);
  text(dinoCall, width/2, 3*height/5);
  pop();
}

// Car Ride
function carRideText(){
  push();
  fill(255);
  text(`You keep the radio on while travelling. Press the arrow key > to skip channel frequencies. Press ENTER to skip this level.`, width/2, height/7);
  textStyle(ITALIC);
  text(`<<Country roads, take me home...>>`, width/2, 6*height/7);
  pop();

}

// Cut Scene
function drawBorder(){
  // Draw Black rectangle to constrict Dinosaur Mouth Image to "Canva"
  push();
  fill(0);
  rect(width/2, height/5, canvaWidth/2, canvaHeight/6);
  pop();
}
function backgroundColor(){
  push();
  fill(208, 216, 218);
  rect(width/2, height/2, canvaWidth, canvaHeight);
  pop();
}
function cutSceneText(){
  push();
  fill(255);
  text(`Looks like all that noise attracted unwanted attention!`, width/2, height/7);
  text(`Quick! Press G to step on the gas!`, width/2, 6*height/7);
  pop();
}
function timingCutScene(){
  if (frameCount % 60 == 0 && timerCutScene > 0) {
        timerCutScene --;
      }
  if (timerCutScene == 0) {
        state = `badEnding01`;
     }
}
function approachingDinosaur(){
  // Display Dinosaur Open Mouth
  dinosaurMouth.x = width/2;
  dinosaurMouth.y = 4*canvaHeight/9;
  dinosaurMouth.image = image(dinosaurMouth, dinosaurMouth.x, dinosaurMouth.y, dinosaurMouth.width, dinosaurMouth.height);

  // Dinosaur Mouth "Approaching"
  let growth = 0.07;
  dinosaurMouth.width += growth;
  dinosaurMouth.height += growth;

}

// Chase
function chaseText(){
  push();
  fill(255);
  rect(width/2, height/2, 1000, 530);
  text(`RUN! Use the arrow keys to escape!`, width/2, height/7);
  text(`Watch out for unexpected obstacles!`, width/2, 6*height/7);
  pop();
}
function timingChase(){
  if (frameCount % 60 == 0 && timerChase > 0) {
        timerChase --;
      }
  if (timerChase == 0) {
        state = `jurassicParkMoment`;
        setTimeout(readDinoCall, 23000);
     }
}

// Bad Ending 01
function badEnding01Text(){
  push();
  fill(255);
  text(`You weren't quick enough and got just too close to the dinosaur :/`, width/2, height/2);
  pop();

}

// Jurassic Park Moment
function timingJurassicMoment(){
  if (frameCount % 60 == 0 && timerJurassicMoment > 0) {
        timerJurassicMoment --;
      }
  if (timerJurassicMoment == 0) {
        state = `petDino`;
     }
}
function readDinoCall(){
  // Read Dino Call previously typed by User
  responsiveVoice.speak(dinoCall);
}
function displayDino(){
  // Dino
  if(responsiveVoice.isPlaying()) {
    // Open mouth when making noise - Dino Call
    image(roaringDinoImage, width/2, height/2 + canvaHeight/22);
  }
  else{
    // Close mouth if silent
    image(stillDinoImage, width/2, height/2 + canvaHeight/22);
  }
}
function scrollUpwards(){
  // "Scroll Upwards" effect
  // black rectangle reveals background image slowly (just a cheap cinematic trick)
  // Center
  fadingEffect.x = width/2;

  // Move
  fadingEffect.y -= fadingEffect.vy;
  fadingEffect.vy = fadingEffect.speed;

  // Display "Effect"
  push();
  fill(0);
  rect(fadingEffect.x, fadingEffect.y, fadingEffect.width, fadingEffect.height);
  pop();

}
function jurassicParkMomentText(){
  push();
  fill(255);
  text(`You're heart is booming in your chest! Could this be it?`, width/2, height/7);
  text(`Is this...the legendary jUraSsIc PaRK mOmENt?!`, width/2, 6*height/7);
  pop();

}

// Pet Dino
function petDinoText(){
  push();
  fill(255);
  rect(width/2, height/2, 1000, 530);
  text(`Wow, it's gotten really close! It's as if you could lift your hand in front of your webcam and try petting it...`, width/2, height/7);
  text(`...Unless that might not be the brightest idea? You could also wait for it to pass...`, width/2, 6*height/7);
  pop();

}
function timingPetDino(){
  if (frameCount % 60 == 0 && timerPetDino > 0) {
        timerPetDino --;
      }
  if (timerPetDino == 0) {
        state = `selfie`;
     }
}

// Bad Ending 02
function badEnding02Text(){
  push();
  fill(255);
  text(`You...really thought petting a dinosaur would be a good idea?`, width/2, height/2);
  pop();

}

// Selfie
function selfieText(){
  push();
  fill(255);
  text(`Wise choice! Why not take a picture to commemorate your accomplished mission?`, width/2, height/9);
  text(`Press ENTER when you're done taking your screenshot.`, width/2, 8*height/9);
  pop();

}

// Credits
function timingCredits(){
  if (frameCount % 60 == 0 && timerCredits > 0) {
        timerCredits --;
      }
  if (timerCredits == 0) {
        state = `title`;
        fadingEffect.opacity = 255;  // Reset Fading Effect
     }
}

function keyPressed(){

  // User presses ENTER
  if(keyCode === 13){
    if(state === `title`){
      state = `intro`;
    }
    else if(state === `intro`){
      state = `carRide`;
    }
    else if(state === `carRide`){

      state = `cutScene`;
      // Stop "Radio" if level changes while it plays
      if(responsiveVoice.isPlaying()) {
          responsiveVoice.cancel();
      }
    }
    else if(state === `selfie`){
      state = `credits`;
    }

  }

  // User resets Dino Sound
  if (keyCode === 8 && state === `intro`) {
    dinoCall = ``;
  }

  // User presses Right Arrow
  if (state === `carRide`){
    if( keyCode === RIGHT_ARROW ){
        index ++;
        fgfgfg();

        if(index > specificFact.length){
           index = 0;
        }
    }
    else if (keyCode === LEFT_ARROW){
        index --;
        fgfgfg();
        if(index < 0){
           index = specificFact.length;
        }
    }
    responsiveVoice.speak(radioChannel, "UK English Male", {rate: 1});
  }


  // User presses G
  if(keyCode === 71 && state === `cutScene`){
    state = `chase`;
  }

}

function keyTyped(){
  // User types Dino Sound
  if (keyCode !== 13 && state === `intro`){
          dinoCall += key;
  }
}
