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
let state = `starterRoom` // Title, Instrucitons, Starter Room, Main Room, (to be continued)


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
  imageMode(CENTER);
  rectMode(CENTER);

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

  }
  else if( state === `instructions` ){

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
