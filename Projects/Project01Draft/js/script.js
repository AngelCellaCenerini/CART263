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

// Jeep
let jeep = undefined;
let jeepImage = undefined;

// Obstacles
const NUM_OBSTACLES = 5;
const NUM_OBSTACLE_IMAGES = 10;
let obstacles = [];
let obstacleImages = [];

// Blood Splatter
let bloodSplatterImage = undefined;

// Credits String
let credits = undefined;

let state = `chase`; // Title, Intro/Instructions, CarRide, CutScene, Chase, BadEnding(01, 02), JurassicParkMoment, PetDino, Selfie, Credits

/**
Description of preload
*/
function preload() {

  // Jeep
  jeepImage = loadImage(`assets/images/clown.png`);
  bloodSplatterImage = loadImage(`assets/images/splatter.png`);

  // Obstacles
  for(let i = 0; i < NUM_OBSTACLE_IMAGES; i++){
    let obstacleImage = loadImage(`assets/images/animal${i}.png`);
    obstacleImages.push(obstacleImage);
  }
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


// Jeep
let x = width/2;
let y = height/2;
jeep = new Jeep(x, y, jeepImage);

// Obstacles
for(let i = 0; i < NUM_OBSTACLES; i++){
  let x = random(width/2 + canvaWidth/2);
  let y = random(height/2 - canvaHeight/2, height/2 + canvaHeight/2);
  let obstacleImage = random(obstacleImages);
  let obstacle = new Obstacle(x, y, obstacleImage);
  obstacles.push(obstacle);
}

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

  }
  else if (state === `intro`){

    introText();

  }
  else if (state === `carRide`){

    carRideText();

  }
  else if (state === `cutScene`){

    cutSceneText();

  }
  else if (state === `chase`){

    chaseText();

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

    jurassicParkMomentText();

  }
  else if (state === `petDino`){

    petDino();

  }
  else if (state === `badEnding02`){

    // Image Background (Blood Splatter)
    image(bloodSplatterImage, 2*width/3, 2*height/3);

    badEnding02Text();

  }
  else if (state === `selfie`){

    selfieText();

  }
  else if (state === `credits`){

    credits.update();

  }


}

// Title
function titleText(){
  push();
  fill(255);
  rect(width/2, height/2, 1000, 530);
  textSize(40);
  text(`JURASSIC PARK...`, width/2, height/7);
  text(`...MOMENT.`, width/2, 6*height/7);
  pop();

}

// Intro
function introText(){
  push();
  fill(255);
  rect(width/2, height/2, 1000, 530);
  text(`You embark on your journey in search of the Jurassic Park Moment.`, width/2, height/7);
  text(`Among the lush vegetation, you hear a sound...Type it down as to document it.`, width/2, 6*height/7);
  pop();

}

// Car Ride
function carRideText(){
  push();
  fill(255);
  rect(width/2, height/2, 1000, 530);
  text(`You keep the radio on while travelling. Press the arrow key > to skip channel frequencies. Press ENTER to skip this level.`, width/2, height/7);
  textStyle(ITALIC);
  text(`<<Country roads, take me home...>>`, width/2, 6*height/7);
  pop();

}

// Cut Scene
function cutSceneText(){
  push();
  fill(255);
  rect(width/2, height/2, 1000, 530);
  text(`Looks like all that noise attracted unwanted attention!`, width/2, height/7);
  text(`Quick! Press G to step on the gas!`, width/2, 6*height/7);
  pop();
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

// Bad Ending 01
function badEnding01Text(){
  push();
  fill(255);
  text(`You weren't quick enough and got just too close to the dinosaur :/`, width/2, height/2);
  pop();

}

// Jurassic Park Moment
function jurassicParkMomentText(){
  push();
  fill(255);
  rect(width/2, height/2, 1000, 530);
  text(`You're heart is booming in your your chest! Could this be it?`, width/2, height/7);
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
  text(`Wise choice! Why not take a picture to commemorate your accomplished mission?`, width/2, 6*height/7);
  pop();

}

// Credits
// function selfieText(){
//
// }

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
    }
    else if(state === `selfie`){
      state = `credits`;
    }

  }

  // User presses Right Arrow
  if(keyCode === 39 && state === `carRide`){

  }

  // User presses G
  if(keyCode === 71 && state === `cutScene`){
    state = `chase`;
  }

}
