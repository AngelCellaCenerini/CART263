"use strict";

/**
Project02 Draft
Angel Cella Cenerini

Project02 Draft
*/

// User Initial Avatar
let crosshairCursorImage = undefined;
let firstAvatar = undefined;

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
  createCanvas(750, 600);
  // General Settings
  imageMode(CENTER);

  // Create First Avatar
  let image = crosshairCursorImage;
  firstAvatar = new FirstAvatar(image);
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

    // First Avatar
    firstAvatar.update(image);

  }
  else if( state === `mainRoom` ){

  }

}
