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

// Timers - Certain levels are timed
let timerCutScene = 9;
let timerChase = 27;
let timerJurassicMoment = 32;
let timerCallDino = 18;
let timerCredits = 53;

// Title
// Fading Effect
let fadingEffect = {
  x: 0,
  y: 0,
  width: 1200,
  height: 1000,
  vx: 0,
  vy: 0,
  speed: 1,
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
let specificFact = undefined;
let index = 0;
let radioStation = undefined;
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
// Chase Background Image
let chaseBackground = undefined;
// Obstacles
const NUM_OBSTACLES = 3;
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
// Mic Input
let mic = undefined;

// Credits
// Credits Soundtrack
let creditsSoundtrack = undefined;
// Credits String
let credits = undefined;

let state = `callDino`; // Title, Intro, CarRide, CutScene, Chase, BadEnding(01, 02), JurassicParkMoment, CallDino, Selfie, Credits


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


  // Vegetation
  for(let i = 0; i < NUM_PLANTS; i++){
    let x = random(width/2 - canvaWidth/2, width/2 + canvaWidth/2);
    let y = random(height/2 - canvaHeight/2, height/2 + canvaHeight/2);
    let change = random(0, 1);
    if (change < 0.5){
        y = random(height/2 - 2*canvaHeight/5, height/2 - canvaHeight/2);
      }
    else{
        y = random(height/2 + canvaHeight/5, height/2 + canvaHeight/2);
      }
    let plantImage = random(plantImages);
    let plant = new Vegetation (x, y, plantImage, change);
    plants.push(plant);
  }

  // Jeep
  let x = width/2;
  let y = height/2;
  jeep = new Jeep(x, y, jeepImage);

  // Obstacles
  for(let i = 0; i < NUM_OBSTACLES; i++){
    let x = random(width/2 + canvaWidth/3, width/2 + canvaWidth/2);
    let y = random(height/2 - canvaHeight/2, height/2 + canvaHeight/3);
    let obstacleImage = random(obstacleImages);
    let obstacle = new Obstacle(x, y, obstacleImage);
    obstacles.push(obstacle);
  }

  // Mic Input
  mic = new p5.AudioIn();
  mic.start();

  // Create Credits String
  x = width/2;
  y = 3*height/2;
  credits = new Credits(x, y);

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


    image(pathImage, width/2, height/2);  // Background Image
    image(jeepImage, width/2, height/2);  // display Jeep

    // Vegetation
    for (let i = 0; i < plants.length; i++) {
      plants[i].update();
    }

    defineBorders();  // define "canva"'s borders bt drawing black rectangles

    carRideText();

  }
  else if ( state === `cutScene` ){

    timingCutScene();
    backgroundColor();  // necessary for mirror
    approachingDinosaur();  // display "Approaching" Dinosaur Mouth - expanding image
    defineBorders();
    cutSceneText();
    image(carInteriorImage, width/2, height/2); // Car Interior Background Image

  }
  else if ( state === `badEnding01` ){

    image(bloodSplatterImage, 2*width/3, 2*height/3);  // background image (Blood Splatter - not as graphic as it sounds)
    badEnding01Text();

  }
  else if ( state === `chase` ){

    timingChase();
    image(chaseBackground, width/2, height/2);  // background image

    // Jeep
    jeep.update();

    // Obstacles
    for (let i = 0; i < obstacles.length; i++) {
      obstacles[i].update(jeep);
    }

    defineBorders();
    chaseText();

  }
  else if ( state === `jurassicParkMoment` ){

    timingJurassicMoment();
    image(jungleImage, width/2, height/2);  // background image
    // Display Dino based on Responsive Voice
    displayDino();
    scrollUpwards();  // "Scrolling Upwards" effect
    jurassicParkMomentText();

  }
  else if ( state === `callDino` ){

    callDinoText();
    timingCallDino();
    image(jungleImage, width/2, height/2);  // background image
    image(dinoCloseUpImage, width/2, height/2 + canvaHeight/16);  // display Dino's close-up
    checkMicInput();   // checl Mic Level to catch Dino's attention

  }
  else if ( state === `badEnding02` ){

    image(bloodSplatterImage, 2*width/3, 2*height/3);  // background image (Blood Splatter - not as graphic as it sounds)
    badEnding02Text();

  }
  else if ( state === `selfie` ){

  }
  else if ( state === `credits` ){

    credits.update();
    timingCredits();

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

// Car Ride
function carRideText(){
  push();
  fill(255);
  text(`You keep the radio on while travelling. Press the left/right arrow keys to skip frequencies. Press ENTER to skip this level.`, width/2, height/7);
  textStyle(ITALIC);
  text(`<<Country roads, take me home...>>`, width/2, 6*height/7);
  pop();

}
function defineBorders(){
  // Black Borders
  push();
  fill(0);
  let borderWidth = 440;
  let borderHeight = 145;
  rect(7*width/8, height/2, borderWidth, height);
  rect(width/8, height/2, borderWidth, height);
  rect(width/2, height/8, width, borderHeight);
  rect(width/2, 7*height/8, width, borderHeight);
  pop();
}

// Cut Scene
function timingCutScene(){
  if (frameCount % 60 == 0 && timerCutScene > 0) {
        timerCutScene --;
      }
  if (timerCutScene == 0) {
        state = `badEnding01`;
        dinosaurApproachSFX.stop();
        crunchingSFX.play();
     }
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

// Bad Ending 01
function badEnding01Text(){
  push();
  fill(255);
  text(`You weren't quick enough and got just a tad too close to the dinosaur :/`, width/2, height/2);
  pop();

}

// Chase
function timingChase(){
  if (frameCount % 60 == 0 && timerChase > 0) {
        timerChase --;
      }
  if (timerChase == 0) {
        state = `jurassicParkMoment`;
        chaseSoundtrack.stop();
        if ( state === `jurassicParkMoment` ){  // check if the state is the correct one
          jurassicTheme.play(1);
        }
        setTimeout(readDinoCall, 20000);
     }
}
function chaseText(){
  push();
  fill(255);
  text(`RUN! Use the arrow keys to escape!`, width/2, height/7);
  text(`Watch out for unexpected obstacles!`, width/2, 6*height/7);
  pop();
}

// Jurassic Park Moment
function timingJurassicMoment(){
  if (frameCount % 60 == 0 && timerJurassicMoment > 0) {
        timerJurassicMoment --;
      }
  if (timerJurassicMoment == 0) {
        state = `callDino`;
        dinoBreathingSFX.play(1);
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
  // "Scroll Upwards" effect - black rectangle reveals background image slowly
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
  text(`Your heart is booming in your chest! Could this be it?`, width/2, height/7);
  text(`Is this...the legendary jUraSsIc PaRK mOmENt?!`, width/2, 6*height/7);
  pop();

}

// Call Dino
function timingCallDino(){
  if (frameCount % 60 == 0 && timerCallDino > 0) {
        timerCallDino --;
      }
  if (timerCallDino == 0) {
        state = `selfie`;
     }
}
function callDinoText(){
  push();
  fill(255);
  text(`Wow, it's gotten really close! It's as if you could speak aloud and catch its attention...`, width/2, height/7);
  text(`...Unless that might not be the brightest idea? You could also wait for it to pass...`, width/2, 6*height/7);
  pop();

}
function checkMicInput(){
  // Mic Input Catching Dino's Attention
  let level = mic.getLevel();
  if (level > 0.1){
    state = `badEnding02`;
    crunchingSFX.play();
  }
}

// Bad Ending 02
function badEnding02Text(){
  push();
  fill(255);
  text(`You...really thought calling over a dinosaur would be a good idea?`, width/2, height/2);
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
//

// p5 events
function keyPressed(){

  // User presses ENTER
  if(keyCode === 13){
    if(state === `title`){
      state = `intro`;
      jungleSounds.loop();
    }
    else if(state === `intro`){
      state = `carRide`;
      jungleSounds.stop();
      carRideSoundtrack.loop();
    }
    else if(state === `carRide`){
      state = `cutScene`;
      carRideSoundtrack.stop();
      // Turn off "Radio" if on
      if(responsiveVoice.isPlaying()) {
          responsiveVoice.cancel();
      }
      dinosaurApproachSFX.play();
    }
    else if(state === `selfie`){
      state = `credits`;
      creditsSoundtrack.play();
    }
  }

  // User presses BACKSPACE to reset Dino Call Input
  if (keyCode === 8 && state === `intro`) {
    dinoCall = ``;
  }

  // User presses Right/Left Arrow
  if (state === `carRide`){
    if( keyCode === RIGHT_ARROW ){
        index ++;
        assignStation();

        if(index > specificFact.length){
           index = 0;
        }
    }
    else if (keyCode === LEFT_ARROW){
        index --;
        assignStation();
        if(index < 0){
           index = specificFact.length;
        }
    }
    responsiveVoice.speak(radioStation, "UK English Male", {rate: 1}, {volume: 1});
  }

  // User presses G
  if(keyCode === 71 && state === `cutScene`){
    state = `chase`;
    dinosaurApproachSFX.stop();
    chaseSoundtrack.play();
  }
}
function assignStation(){
  // Assign object properties to index/radioStation
  specificFact = dinosaursFacts.facts[index];
  radioStation = specificFact.fun_fact;

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

  // Chase Background
  chaseBackground = loadImage(`assets/images/chaseBackground.jpg`);

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
