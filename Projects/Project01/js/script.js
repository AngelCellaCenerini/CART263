"use strict";

/**
Jurassic Park Moment
Angel Cella Cenerini

A silly homage to Jurassic Park. Survive the jungle and experience your very own 'Jurassic Park Moment'!
Now lacking the Handpose Model :)
*/

// "Canvas" proportions (illustration background)
let canvaWidth = 1000;
let canvaHeight = 530;

// Title
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
// Logo
let logoImage = undefined;

// Intro
// JungleSounds
let jungleSounds = undefined;
// TextBox
let textBox = {
  x: 0,
  y: 0,
  width: 700,
  height: 100,
  radius: 15
}
// User Input - Dino Call
let dinoCall = ``;

// Car Ride
// JSON file - Radio Stations
let dinosaursFacts = undefined;
// Car Ride Soundtrack
let carRideSoundtrack = undefined;
// Grass Background Image
let pathImage = undefined;
// Jeep
let jeep = undefined;
let jeepImage = undefined;
// Vegetation
const NUM_PLANTS = 55;
const NUM_PLANTS_IMAGES = 4;
let plants = [];
let plantImages = [];

// Cut Scene
// Dinosaur Stomping/Roaring SFX
let dinosaurApproachSFX = undefined;
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

// Chase
// Chase Soundtrack
let chaseSoundtrack = undefined;
// Obstacles
const NUM_OBSTACLES = 4;
const NUM_OBSTACLE_IMAGES = 3;
let obstacles = [];
let obstacleImages = [];

// Bad Ending(s)
// Crunching SFX
let crunchingSFX = undefined;
// Blood Splatter (not as graphic as it sounds)
let bloodSplatterImage = undefined;

// Jurassic Park Moment
// Jurassic Theme
let jurassicTheme = undefined;
// Jungle Background
let jungleImage = undefined;
// Dino
let stillDinoImage = undefined;
let roaringDinoImage = undefined;

// Call Dino
// Dino Breathing SFX
let dinoBreathingSFX = undefined;
// Dino Close-Up
let dinoCloseUpImage = undefined;

// Selfie
// Bobble Head Doll
let bobbleHeadDollImage = undefined;

// Credits
// Credits Soundtrack
let creditsSoundtrack = undefined;

let state = `title`; // Title, Intro, CarRide, CutScene, Chase, BadEnding(01, 02), JurassicParkMoment, CallDino, Selfie, Credits


/**
Preloading assets - JSON file, Image files, Sound Files
*/
function preload() {

   // Fun Facts - Radio Stations
   dinosaursFacts =  loadJSON(`assets/data/dinosaurs_facts.json`);

   loadImageFiles();

   loadSoundFiles();

}



/**
General Settings, Creating Objects
*/
function setup() {

  // General Settings
  createCanvas(windowWidth, windowHeight);
  textFont(`Courier`);
  textAlign(CENTER, CENTER);
  textSize(20);
  rectMode(CENTER);
  imageMode(CENTER);
  noStroke();
  userStartAudio();

}


/**
States
*/
function draw() {

  background(0);

  if ( state === `title`){

    image(logoImage, width/2, 2*height/5);  // display Logo
    titleText();  // display white Text
    fadeIn();  // "Fade-In" Effect

  }
  else if ( state === `intro` ){

    image(jungleImage, width/2, height/2);
    introText();
    introTextBox();

  }
  else if ( state === `carRide` ){

  }
  else if ( state === `cutScene` ){

  }
  else if ( state === `chase` ){

  }
  else if ( state === `badEnding01` ){

  }
  else if ( state === `jurassicParkMoment` ){

  }
  else if ( state === `callDino` ){

  }
  else if ( state === `badEnding02` ){

  }
  else if ( state === `selfie` ){

  }
  else if ( state === `credits` ){

  }


}

// Title
function titleText(){
  push();
  fill(255);
  textSize(40);
  text(`JURASSIC PARK...`, width/2, height/6);
  text(`...MOMENT.`, width/2, 4*height/6);
  textSize(18);
  text(`Press ENTER to start your adventure.`, width/2, 6*height/7);
  pop();

}
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

// Intro
// Intro
function introText(){
  push();
  fill(255);
  text(`You embark on your journey in search of the Jurassic Park Moment.`, width/2, height/7);
  text(`Among the lush vegetation, you hear a sound...Type it down as to document it. Press ENTER to confirm.`, width/2, 6*height/7);
  pop();

}
function introTextBox(){
  push();
  // White Textbox
  fill(255, 200);
  textBox.x = width/2;
  textBox.y = 3*height/5;
  rect(textBox.x, textBox.y, textBox.width, textBox.height, textBox.radius);
  // Display User Input
  fill(0);
  text(dinoCall, width/2, 3*height/5);
  pop();
}

// p5 events
function keyPressed(){

  // User presses ENTER
  if(keyCode === 13){
    if(state === `title`){
      state = `intro`;
      jungleSounds.play();
    }
    else if(state === `intro`){
      state = `carRide`;
    }
    else if(state === `carRide`){
      state = `cutScene`;
    }
    else if(state === `selfie`){
      state = `credits`;
    }
  }

  // User presses BACKSPACE to reset Dino Call Input
  if (keyCode === 8 && state === `intro`) {
    dinoCall = ``;
  }
}

function keyTyped(){
  // User types Dino Sound
  if (keyCode !== 13 && state === `intro`){
          dinoCall += key;
  }
}
//

// Load Files
function loadImageFiles(){
  // Jurassic Park Logo (kind of)
  logoImage = loadImage(`assets/images/logo.png`);

  // Jungle Backgorund
  jungleImage = loadImage(`assets/images/jungle.jpg`);

  // Path Background
  pathImage = loadImage(`assets/images/path.jpg`);

  // Jeep
  jeepImage = loadImage(`assets/images/jeep.gif`);

  // Vegetation
  for(let i = 0; i < NUM_PLANTS_IMAGES; i++){
   let plantImage = loadImage(`assets/images/vegetation${i}.png`);
   plantImages.push(plantImage);
  }

  // Car Interior Background
  carInteriorImage = loadImage(`assets/images/carP.png`);

  // Dinosaur Mouth
  dinosaurMouth = loadImage(`assets/images/mouth.png`);

  // Blood Splatter
  bloodSplatterImage = loadImage(`assets/images/splatter.png`);

  // Obstacles
  for(let i = 0; i < NUM_OBSTACLE_IMAGES; i++){
   let obstacleImage = loadImage(`assets/images/obstacle${i}.png`);
   obstacleImages.push(obstacleImage);
  }

  // Dino
  stillDinoImage = loadImage(`assets/images/catRex1.png`);
  roaringDinoImage = loadImage(`assets/images/catRex2.png`);

  // Dino Close-Up
  dinoCloseUpImage = loadImage(`assets/images/dinoCloseUp.png`);

  // Bobble Head Doll
  bobbleHeadDollImage = loadImage(`assets/images/doll.png`);
}

function loadSoundFiles(){
  // Jungle Sounds
  jungleSounds = loadSound(`assets/sounds/jungleSounds.mp3`);

  // Car Ride Soundtrack
  carRideSoundtrack = loadSound(`assets/sounds/carRideS.mp3`);

  // Dinosaur Approach
  dinosaurApproachSFX = loadSound(`assets/sounds/dinosaurApproachingS.mp3`);

  // Chase Soundtrack
  chaseSoundtrack = loadSound(`assets/sounds/chaseS.mp3`);

  // Crunching
  crunchingSFX = loadSound(`assets/sounds/dinosaurEatingS.mp3`);

  // Jurassic Park Theme
  jurassicTheme = loadSound(`assets/sounds/jurassicMomentS.mp3`);

  // Dino Breathing
  dinoBreathingSFX = loadSound(`assets/sounds/dinoBreathing.mp3`);

  // Credits Soundtrack
  creditsSoundtrack = loadSound(`assets/sounds/creditsS.mp3`);
}
//
