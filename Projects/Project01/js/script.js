"use strict";

/**
Jurassic Park Moment
Angel Cella Cenerini

A silly homage to Jurassic Park. Survive the jungle and experience your very own 'Jurassic Park Moment'!
Now lacking the Handpose Model :)
*/

// Title
// Logo
let logoImage = undefined;

// Intro
// JungleSounds
let jungleSounds = undefined;

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

}

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
