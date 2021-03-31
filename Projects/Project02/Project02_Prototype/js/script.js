"use strict";

/**
Project02 Draft
Angel Cella Cenerini

Tested Rooms Structure;
Tested Dialogus Strucutre;
Tested linking p5.js program with jQuery(UI).js webpage
*/

// Dialogue Box
let dialogueBox = undefined;
let dialogues = undefined;
let roomDialogues = undefined;
let roomDialogue = undefined;
let index = 0;

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
// Blinking Teal Light
let tealLightX = 400;
let tealLightY = 222;
let blinkingTealLightImage = undefined;
// First Room
let firstRoom = undefined;

// States
let state = `title` // Title, Instrucitons, Starter Room, Main Room, First Room - will be renamed-, To be continued


/**
Description of preload
*/
function preload() {

  // JSON File
  // Dialogues
  dialogues =  loadJSON(`assets/data/dialogues.json`);

  // Image Files
  crosshairCursorImage = loadImage(`assets/images/crosshair-cursor.png`);
  blinkingLightImage = loadImage(`assets/images/light.png`);
  blinkingTealLightImage = loadImage(`assets/images/tealLight.png`);
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
  textAlign(LEFT, RIGHT);

  // Create First Avatar
  let image = crosshairCursorImage;
  firstAvatar = new FirstAvatar(image);

  // Create Dialogue Box(es)
  dialogueBox = new DialogueBox();

  // Create Rooms
  // Starter Room
  starterRoom = new Room();
  // Main Room
  mainRoom = new MainRoom();
  // First Room
  firstRoom = new FirstRoom();
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

    // Dialogue Box
     dialogueBox.display();

    // Starter Room
    starterRoom.update(firstAvatar, dialogueBox);

    // First Avatar
    firstAvatar.update(image);

    // Blinking Light
    blinkingLight();

  }
  else if( state === `mainRoom` ){

    // Dialogue Box
    dialogueBox.display();

    // Main Room
    mainRoom.update(firstAvatar, dialogueBox);
    mainRoom.addSecondDoor(firstAvatar, dialogueBox);

    // First Avatar
    firstAvatar.update(image);

    // Blinking Teal Light
    blinkingTealLight();

  }
  else if ( state === `firstRoom` ){
    // Dialogue Box
    dialogueBox.display();

    // First Room
    firstRoom.update(firstAvatar, dialogueBox);
    // First Avatar
    firstAvatar.update(image);

    // Button
    let firstRoomButton = document.getElementById(`first-room-button`);
    firstRoomButton.style.visibility = `visible`; // to be "destroyed" once user has surpassed/solved specific "webpage"

  }

}

// Functions
// Title
function titleText(){
  push();
  fill(255);
  textSize(25);
  text(`CART263 - Project 02: Prototype`, width/8, height/2);
  textSize(16);
  text(`Press ENTER to continue >`, 2*width/3, 9*height/10);
  pop();
}
// Instructions
function instructionsText(){
  push();
  fill(255);
  textSize(22);
  text(`Instrucitons (Rough Draft):
   - move with arrow keys;
   - press ENTER to repeat dialogues;`, width/8, height/2);
  textSize(16);
  text(`Press ENTER to continue >`, 2*width/3, 9*height/10);
  pop();
}
// Starter Room
function blinkingLight(){
  // Blinking Light - only called in Starter Room
  push();
  // Create Blinking Effect
  let opacity = random(70, 180);
  tint(255, opacity);
  // Display Light
  image(blinkingLightImage, width/2, height/2);
  pop();
}
// Main Room
function blinkingTealLight(){
  // Blinking Light - only called in Main Room
  push();
  // Create Blinking Effect
  let opacity = random(180, 250);
  tint(255, opacity);
  // Display Light
  image(blinkingTealLightImage, tealLightX, tealLightY);
  pop();
}
//


// p5 Events
function keyPressed(){
  // User presses ENTER
  if (keyCode === 13){

    if( state === `title`){
      state = `instructions`;
    }
    // In Instrucitons State
    else if( state === `instructions`){
      state = `starterRoom`;
      // Trigger Dialogue Box - Typewriter Effect
      selectDialogue();
    }
    else {
      // Call each State/Room
      // Trigger Dialogue Box - Typewriter Effect
      selectDialogue();
    }

  }

}
//

//
function selectDialogue(){
  // Starter Room
  dialogueBox.reset();
  setTimeout(function() {
    dialogueBox.typewriter(dialogues.simulation_dialogues[state]);
  }, 1000);
}
//
