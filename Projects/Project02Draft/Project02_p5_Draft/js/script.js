"use strict";

/**
Project02 Draft
Angel Cella Cenerini

Project02 Draft
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
// First Room
let firstRoom = undefined;

// States
let state = `firstRoom` // Title, Instrucitons, Starter Room, Main Room, First Room - will be renamed-, To be continued


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

  }
  else if ( state === `firstRoom` ){
    // Dialogue Box
    dialogueBox.display();

    // First Room
    firstRoom.update(firstAvatar, dialogueBox);
    // First Avatar
    firstAvatar.update(image);
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
   - press ENTER to scroll dialogues;
   - press SPACEBAR to close dialogue box. `, width/8, height/2);
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
//


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
    // Typewriter
    // Starter Room
    if ( state === `starterRoom`){
      index = 0;
      selectDialogue();
      // dialogueBox.type(roomDialogue);
      setTimeout(function() {
        dialogueBox.typewriter(roomDialogue)
      }, 1000);
    }
    // Main Room
    else if ( state === `mainRoom`){
      index = 1;
      selectDialogue();
      // dialogueBox.type(roomDialogue);
      setTimeout(function() {
        dialogueBox.typewriter(roomDialogue)
      }, 1000);
    }
    else if ( state === `firstRoom` ){
      index = 1;
      selectDialogue();
      // dialogueBox.type(roomDialogue);
      setTimeout(function() {
        dialogueBox.typewriter(roomDialogue)
      }, 1000);
    }

  }

  // User press SPACEBAR
  if ( keyCode === 32 ){

    // Typewriter
    if ( state === `starterRoom`){
      if (dialogueBox.active){
        dialogueBox.reset();
      }
    }

  }

}
//

//
function selectDialogue(){
  // Starter Room
  roomDialogues = dialogues.simulation_dialogues[index];
  roomDialogue = roomDialogues.dialogue;
}
//
