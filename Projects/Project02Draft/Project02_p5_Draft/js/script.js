"use strict";

/**
Project02 Draft
Angel Cella Cenerini

Project02 Draft
*/

// User Initial Avatar
let crosshairCursorImage = undefined;
let firstAvatar = undefined;

// Rooms
// Started Room
let starterRoom = undefined;

// States
let state = `starterRoom` // Title, Instrucitons, Starter Room, Main Room, (to be continued)


/**
Description of preload
*/
function preload() {
  crosshairCursorImage = loadImage(`assets/images/crosshair-cursor.png`);
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

  // Create Starter Room
  starterRoom = new Room();
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

  }
  else if( state === `mainRoom` ){

  }

}
