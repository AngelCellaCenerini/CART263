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

// States
let state = `title` // Title, Instrucitons, Starter Room, Main Room, (to be continued)


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

    // Dialogue Box
    // dialogueBox.reset();
    dialogueBox.display();

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
      selectDialogue();
      let index = 0;
      dialogueBox.type(roomDialogue);
      console.log(index);
    }
    // Main Room
    else if ( state === `mainRoom`){
      index = 1;
      selectDialogue();
      dialogueBox.type(roomDialogue);
      console.log(index);
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
  roomDialogues = dialogues.dialogues[index];
  roomDialogue = roomDialogues.dialogue;
}
//
