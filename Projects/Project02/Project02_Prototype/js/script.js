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
let comprehensibleDialogues = undefined;
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
let blinkingTealLightImage = undefined;
// Relevant Rooms
// First Room
let firstRoom = undefined;
// Second Room
let secondRoom = undefined;
// Third Room
let thirdRoom = undefined;
// Fourth Room
let fourthRoom = undefined;
// Fifth Room
let fifthRoom = undefined;

// Empty Room
let emptyRoom = undefined;

// Chasing Levels
let chasingLevel = undefined;
let chasingLevel2 = undefined;
// Obstacles (Chasing Levels)
let obstacle = undefined;
let obstacles = [];
let numberObstacles = 3;
let obstacleImage = undefined;

// States
let state = `title` // Title, Instrucitons, Starter Room, Main Room, First Room - will be renamed-, To be continued


/**
Description of preload
*/
function preload() {

  // JSON File
  // Dialogues
  dialogues =  loadJSON(`assets/data/dialogues.json`);
  comprehensibleDialogues =  loadJSON(`assets/data/dialogues.json`);

  // Image Files
  crosshairCursorImage = loadImage(`assets/images/crosshair-cursor.png`);
  blinkingLightImage = loadImage(`assets/images/light.png`);
  blinkingTealLightImage = loadImage(`assets/images/tealLight.png`);
  obstacleImage = loadImage(`assets/images/crosshair-cursor.png`);
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
  firstAvatar = new FirstAvatar(crosshairCursorImage);

  // Create Dialogue Box(es)
  dialogueBox = new DialogueBox();

  // Create Rooms
  // Starter Room
  starterRoom = new Room(crosshairCursorImage, blinkingLightImage);
  // Main Room
  mainRoom = new MainRoom(crosshairCursorImage, blinkingTealLightImage);
  // First Room
  firstRoom = new FirstRoom(crosshairCursorImage);
  // Second Room
  secondRoom = new SecondRoom(crosshairCursorImage);
  // Third Room
  thirdRoom = new ThirdRoom(crosshairCursorImage);
  // Fourth Room
  fourthRoom = new FourthRoom(crosshairCursorImage);
  // Fifth Room
  fifthRoom = new FifthRoom(crosshairCursorImage);
  // Empty Room
  emptyRoom = new EmptyRoom(crosshairCursorImage);

  // Chasing Levels
  chasingLevel = new ChasingLevel();
  chasingLevel2 = new ChasingLevel2();

  // Obstacle(s) - Within Chasing Levels
  obstacle = new Obstacle(obstacleImage, obstacle);
  // obstacle.create();
  // Create and Display Array of Obstacles
  // for(let i = 0; i < obstacle.numberObstacles; i ++){
  //    let obstacleX = random(obstacle.x1, obstacle.x2);
  //    let obstacleY = random(obstacle.y1, obstacle.y2);
  //    let obstacle = image(obstacleImage, obstacleX, obstacleY);
  //    obstacle.obstacles.push(obstacle);
  // }
  for(let i = 0; i < numberObstacles; i ++){
     let x = random(200, 400);
     let y = random(-20, 0);
     let obstacle = new Obstacle(x, y, obstacleImage);
     obstacles.push(obstacle);
  }

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
    starterRoom.update(firstAvatar, crosshairCursorImage, dialogueBox);


  }
  else if( state === `mainRoom` ){

    // Main Room
    mainRoom.roomSystem(firstAvatar, dialogueBox);
    // mainRoom.selectDestinationRoom(firstAvatar, dialogueBox);
    mainRoom.update(firstAvatar, crosshairCursorImage, dialogueBox);
    mainRoom.addSecondDoor(firstAvatar, dialogueBox);



  }
  else if ( state === `firstRoom` ){

    // First Room
    firstRoom.update(firstAvatar, crosshairCursorImage, dialogueBox);
    firstRoom.displayButton();


  }
  else if (state === `secondRoom`){

    // Second Room
    secondRoom.update(firstAvatar, crosshairCursorImage, dialogueBox);
    secondRoom.displayButton();

  }
  else if (state === `thirdRoom`){

    // Third Room
    thirdRoom.update(firstAvatar, crosshairCursorImage, dialogueBox);
    thirdRoom.displayButton();

  }
  else if (state === `fourthRoom`){

    // Fourth Room
    fourthRoom.update(firstAvatar, crosshairCursorImage, dialogueBox);
    fourthRoom.displayButton();

  }
  else if (state === `fifthRoom`){

    // Fifth Room
    fifthRoom.update(firstAvatar, crosshairCursorImage, dialogueBox);
    fifthRoom.displayPreviousAchievements();

  }
  else if ( state === `emptyRoom` ){

    // Empty Room
    emptyRoom.update(firstAvatar, crosshairCursorImage, dialogueBox);

  }
  else if ( state === `chasingLevel` ){

    // Chasing Level
    chasingLevel.update(firstAvatar, crosshairCursorImage, dialogueBox, obstacle);
    for (let i = 0; i < obstacles.length; i ++){
      let obstacle = obstacles[i];
      obstacle.move();
      obstacle.display();
    }

  }
  else if ( state === `chasingLevel2` ){

    // Chasing Level
    chasingLevel2.update(firstAvatar, crosshairCursorImage, dialogueBox, obstacle);

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
