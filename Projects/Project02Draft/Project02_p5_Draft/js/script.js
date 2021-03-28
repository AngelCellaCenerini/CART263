"use strict";

/**
Project02 Draft
Angel Cella Cenerini

Project02 Draft
*/

// User Initial Avatar
let crosshairCursorImage = undefined;
let firstAvatar = undefined;

// Store Achieved Senses
let achievedSenses = [];

// Rooms
// Started Room
let starterRoom = undefined;
// Blinking Light
let blinkingLightImage = undefined;
// Main Room
let mainRoom = undefined;

// States
let state = `title` // Title, Instrucitons, Starter Room, Main Room, (to be continued)


/**
Description of preload
*/
function preload() {
  crosshairCursorImage = loadImage(`assets/images/crosshair-cursor.png`);
  blinkingLightImage = loadImage(`assets/images/light.png`);
}


/**
Description of setup
*/
function setup() {
  // Canvas
  createCanvas(800, 600);
  // General Settings
  noCursor();
  noStroke();
  imageMode(CENTER);
  rectMode(CENTER);
  textFont(`Courier`);
  textAlign(RIGHT, LEFT);

  // Create First Avatar
  let image = crosshairCursorImage;
  firstAvatar = new FirstAvatar(image);

  // Create Rooms
  // Starter Room
  starterRoom = new Room();
  // Main Room
  mainRoom = new MainRoom();
}


/**
Description of draw()
*/
function draw() {
  // Color Background
  background(20);

  if ( state === `title`){
    titleText();
  }
  else if( state === `instructions` ){
    instructionsText();
  }
  else if( state === `starterRoom` ){

    // Starter Room
    starterRoom.update(firstAvatar);

    // First Avatar
    firstAvatar.update(image);

    // Blinking Light - only called in Starter Room
    push();
    // Create Blinking Effect
    let opacity = random(70, 180);
    tint(255, opacity);
    // Display Light
    image(blinkingLightImage, width/2, height/2);
    pop();

  }
  else if( state === `mainRoom` ){

    // Check User's Progress before Diplaying Avatar
    // if ( achievedSenses.length < 0){
    //   console.log(`called`);
      // Starter Room
      mainRoom.update(firstAvatar);
      mainRoom.addSecondDoor(firstAvatar);
      // First Avatar
      firstAvatar.update(image);
    // }
    // else{
    //   // Switch to Actual, Embodied Avatar
    //   // Main Room
    //   // mainRoom.update(avatar);
    // }


  }

}

// Functions
// Title
function titleText(){
  push();
  fill(255);
  textSize(25);
  text(`CART263 - Project 02: Prototype`, 2*width/3, height/2);
  textSize(16);
  text(`Press ENTER to continue >`, 9*width/10, 9*height/10);
  pop();
}
// Instructions
function instructionsText(){
  push();
  fill(255);
  textSize(22);
  text(`Instrucitons (Rough Draft): Move with arrow keys. `, 7*width/8, height/2);
  textSize(16);
  text(`Press ENTER to continue >`, 9*width/10, 9*height/10);
  pop();
}

// p5 Events
function keyPressed(){
  // User presses ENTER
  if (keyCode === 13){

    // In Title State
    if( state === `title`){
      state = `instructions`;
    }
    // In Instrucitons State
    else if( state === `instructions`){
      state = `starterRoom`;
    }
  }
}
