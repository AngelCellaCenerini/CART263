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
let incomprehensibleDialogues = undefined;
let comprehensibleDialogues = undefined;

// User Initial Avatar
let crosshairCursorImage = undefined;
let flameImage = undefined;
let avatarImage = undefined;
let avatar = undefined;

// Store Achieved Senses
let achievedSense = undefined;
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
// Fifth Room phases
let fifthRoom2 = undefined;
let fifthRoom3 = undefined;
let fifthRoom4 = undefined;

// Empty Room
let emptyRoom = undefined;

// Chasing Levels
let chasingLevel = undefined;
let chasingLevel2 = undefined;
// Obstacles (Chasing Levels)
let obstacle = undefined;
let obstacles = [];
let numberObstacles = 3;

// Ending Screen
let ending = undefined;

// States
// let state = `title` // Title, Instrucitons, Starter Room, Main Room, First Room - will be renamed-, To be continued
let gameData = JSON.parse(localStorage.getItem(`gameData`));
if (!gameData) {
  gameData = {
    state: `title`,
    achievedSenses: 0
  }
}


/**
Description of preload
*/
function preload() {

  // JSON File
  // Dialogues
  incomprehensibleDialogues =  loadJSON(`assets/data/incomprehensibleDialogues.json`);
  comprehensibleDialogues =  loadJSON(`assets/data/comprehensibleDialogues.json`);

  // Image Files
  crosshairCursorImage = loadImage(`assets/images/crosshair-cursor.png`);
  flameImage = loadImage(`assets/images/stressed-avatar.png`);
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

  // Assign Starter Icon to Avatar
  avatarImage = crosshairCursorImage;

  // Create First Avatar
  avatar = new Avatar(avatarImage);

  // Assign JSON file to Dialogues
  dialogues = incomprehensibleDialogues;

  // Create Dialogue Box(es)
  dialogueBox = new DialogueBox();

  // Create Rooms
  // Starter Room
  starterRoom = new Room(avatarImage, blinkingLightImage);
  // Main Room
  mainRoom = new MainRoom(avatarImage, blinkingTealLightImage);
  // First Room
  firstRoom = new FirstRoom(avatarImage);
  // Second Room
  secondRoom = new SecondRoom(avatarImage);
  // Third Room
  thirdRoom = new ThirdRoom(avatarImage);
  // Fourth Room
  fourthRoom = new FourthRoom(avatarImage);
  // Fifth Room
  fifthRoom = new FifthRoom(avatarImage);
  // Fifth Room Phases
  // Fifth Room
  fifthRoom2 = new FifthRoom2(avatarImage);
  // Fifth Room
  fifthRoom3 = new FifthRoom3(avatarImage);
  // Fifth Room
  fifthRoom4 = new FifthRoom4(avatarImage);

  // Empty Room
  emptyRoom = new EmptyRoom(avatarImage);

  // Chasing Levels
  chasingLevel = new ChasingLevel();
  chasingLevel2 = new ChasingLevel2();

  // Obstacle(s) - Within Chasing Levels
  obstacle = new Obstacle(obstacle);
  // Create Obstacles array
  createObstacles();

  // Ending
  ending = new Ending();


}


/**
Description of draw()
*/
function draw() {
  // Color Background
  background(20);

  
  // Select Dialogue based on Room (state) and User progress
  // Check User Progree
  if (gameData.achievedSenses >= 4){
    dialogues = comprehensibleDialogues;
  }

  if ( gameData.state === `title`){
    titleText();
  }
  else if( gameData.state === `instructions` ){
    instructionsText();
  }
  else if( gameData.state === `starterRoom` ){

    // Starter Room
    starterRoom.update(avatar, avatarImage, dialogueBox);


  }
  else if( gameData.state === `mainRoom` ){

    // Main Room
    mainRoom.roomSystem(avatar, dialogueBox);
    mainRoom.update(avatar, avatarImage, dialogueBox);
    mainRoom.addSecondDoor(avatar, dialogueBox);

  }
  // else if ( state === `firstRoom` ){
  else if ( gameData.state === `firstRoom` ){

    // First Room
    firstRoom.update(avatar, avatarImage, dialogueBox);
    firstRoom.manageButton();

  }
  else if (gameData.state === `secondRoom`){

    // Second Room
    secondRoom.update(avatar, avatarImage, dialogueBox);
    secondRoom.manageButton();

  }
  else if (gameData.state === `thirdRoom`){

    // Third Room
    thirdRoom.update(avatar, avatarImage, dialogueBox);
    thirdRoom.manageButton();

  }
  else if (gameData.state === `fourthRoom`){

    // Fourth Room
    fourthRoom.update(avatar, avatarImage, dialogueBox);
    fourthRoom.manageButton();

  }
  else if (gameData.state === `fifthRoom`){

    // Fifth Room
    fifthRoom.update(avatar, avatarImage, dialogueBox);
    // Add to Room system
    fifthRoom.add(dialogueBox);

  }
  else if (gameData.state === `fifthRoom2`){

    // Fifth Room
    fifthRoom.update(avatar, avatarImage, dialogueBox);
    // Add to Room system
    fifthRoom2.add(dialogueBox);

  }
  else if (gameData.state === `fifthRoom3`){

    // Fifth Room
    fifthRoom.update(avatar, avatarImage, dialogueBox);
    // Add to Room system
    fifthRoom3.add(dialogueBox);

  }
  else if (gameData.state === `fifthRoom4`){

    // Fifth Room
    fifthRoom4.update(avatar, avatarImage, dialogueBox);
    // Add to Room system
    // Trigger Program Ending
    fifthRoom4.add(dialogueBox, mainRoom);

  }
  else if ( gameData.state === `emptyRoom` ){

    // Empty Room
    emptyRoom.update(avatar, avatarImage, dialogueBox);

  }
  else if ( gameData.state === `chasingLevel` ){

    // Chasing Level
    chasingLevel.update(avatar, avatarImage, dialogueBox, obstacle);

    // Obstacles
    updateObstacles(avatar, chasingLevel);


  }
  else if ( gameData.state === `chasingLevel2` ){

    // Chasing Level
    chasingLevel2.update(avatar, avatarImage, dialogueBox, obstacle);

    // Obstacles
    updateObstacles(avatar, chasingLevel2);

  }
  else if ( gameData.state === `chasingLevel3` ){

    // Chasing Level
    chasingLevel3.update(avatar, avatarImage, dialogueBox, obstacle);

    // Obstacles
    updateObstacles(avatar, chasingLevel3);

  }
  else if ( gameData.state === `chasingLevel4` ){

    // Chasing Level
    chasingLevel4.update(avatar, avatarImage, dialogueBox, obstacle);

    // Obstacles
    updateObstacles(avatar, chasingLevel4);

  }
  else if ( gameData.state === `finale` ){

    // Final Screen
    ending.update(dialogueBox, mainRoom);

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
// Obstacles (called in Chasing Levels)
function createObstacles(){
  // Create Obstacles
  for(let i = 0; i < numberObstacles; i ++){
     let x = random(300, 510);
     let y = random(-200, -10);
     let obstacle = new Obstacle(x, y);
     obstacles.push(obstacle);
  }
}
function updateObstacles(avatar, chasingLevel){
  // Update Obstacles Array
  for (let i = 0; i < obstacles.length; i ++){
    let obstacle = obstacles[i];
    if( gameData.state === `chasingLevel`){
      obstacle.update(avatar, chasingLevel);
    }
    else if( gameData.state === `chasingLevel2`){
      obstacle.update(avatar, chasingLevel2);
    }

  }
}
//


// p5 Events
function keyPressed(){
  // User presses ENTER
  if (keyCode === 13){

    if( gameData.state === `title`){
      gameData.state = `instructions`;
    }
    // In Instrucitons State
    else if( gameData.state === `instructions`){
      gameData.state = `starterRoom`;
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
  // Select Dialogue
  dialogueBox.reset();
  setTimeout(function() {
    // Check current Room
    dialogueBox.typewriter(dialogues.simulation_dialogues[gameData.state]);
  }, 1000);

}
//
