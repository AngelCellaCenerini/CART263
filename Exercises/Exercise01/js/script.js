"use strict";

/**************************************************

Exercise 01 -  Where’s Sausage Dog? New Game+ (p5 Template by CART253 course)
Angel Cella Cenerini

Where’s Sausage Dog? In the land of Memes.

**************************************************/

const NUM_ANIMAL_IMAGES = 10;
const NUM_ANIMALS = 150;

// Animals
let animalImages = [];
let animals = [];

// SausageDog
let sausageDogImage = undefined;
let sausageDog = undefined;

// Timer Table
let timerTable = undefined;

// Warnnings
let firstWarning = undefined;
let secondWarning = undefined;
let thirdWarning = undefined;

// Bad Ending
// Rain
let rain = undefined;
// SFX
let fail = undefined;

// Good Ending - SFX
let success = undefined;

let state = `title`; // Title, Simulation,Bad Ending

// preload()
//
// Description of preload goes here.
function preload() {

  // Load Images
  // Animals
  for(let i = 0; i < NUM_ANIMAL_IMAGES; i++){
    let animalImage = loadImage(`assets/images/animal${i}.png`);
    animalImages.push(animalImage);
  }
  // SausageDog
  sausageDogImage = loadImage(`assets/images/sausage-dog.png`);
  // Rain
  rain = loadImage(`assets/images/rain.gif`);

  // Load Sounds
  // Warnings
  firstWarning = loadSound(`assets/sounds/b1.mp3`);
  secondWarning = loadSound(`assets/sounds/b2.mp3`);
  thirdWarning = loadSound(`assets/sounds/b3.mp3`);
  // SFXs
  fail = loadSound(`assets/sounds/fail.mp3`);
  success = loadSound(`assets/sounds/cha-cha.mp3`);


}

// setup()
//
// Description of setup() goes here.
function setup() {

  createCanvas(windowWidth, windowHeight);

  imageMode(CENTER, CENTER);
  textAlign(CENTER, CENTER);

  // Create Animals
  createAnimals();

  // Create Sausage Dog
  createSausageDog();

  // Establish TimerTable
  createTimerTable();

}

// draw()
//
// Description of draw() goes here.
function draw() {

if (state === `title`){
background(0);
titleText();

}
else if(state === `simulation`){
background(148, 221, 185); // greenish background

updateAnimals();
updateSausageDog();

timerTable.display(sausageDog);

stopWarnings();

}
else if(state === `badEnding`){
background(170, 170, 170);
// Display SausageDog
sausageDog.display();
// Display Rain
image(rain, width/2, height/2, width, height);

}

}

//Title
function titleText(){
  push();
  fill(255);
  textSize(45);
  text(`Where’s Sausage Dog? - The Sequel`, width/2, height/3);
  textSize(25);
  text(`Press ENTER to experience the memes.`, width/2, height/2);
  pop();
}

// Simulation
// Animals
function createAnimals(){
  for(let i = 0; i < NUM_ANIMALS; i++){
    let x = random(0, width);
    let y = random(0, height);
    let animalImage = random(animalImages);
    let animal = new Animal(x, y, animalImage);
    animals.push(animal);
  }
}
function updateAnimals() {
  for (let i = 0; i < animals.length; i++) {
    animals[i].update();
  }
}

// Sausage Dog
function createSausageDog(){
  let x = random(0, width);
  let y = random(0, height);
  sausageDog = new SausageDog(x, y, sausageDogImage, success);
}
function updateSausageDog() {
  sausageDog.update();
}

// TimerTable
function createTimerTable(){
  let x = width/2;
  let y = height/5;
  timerTable = new Timer(x, y, fail);
}

// Warnings
function stopWarnings(){
  if(sausageDog.found){
    // Three even-spaced warnings will be given to the User
    firstWarning.stop();
    secondWarning.stop();
    thirdWarning.stop();
  }
}


// p5 Events
function keyPressed(){
  if(keyCode === 13 && state === `title`){
    state = `simulation`;
    // Three even-spaced warnings will be given to the User
    firstWarning.play(4);
    secondWarning.play(9);
    thirdWarning.play(14);

  }
}
function mousePressed() {
  sausageDog.mousePressed();
  if(sausageDog.found){
      success.play();
  }
}
