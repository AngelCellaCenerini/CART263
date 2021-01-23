"use strict";

/**************************************************

Exercise 01 -  Where’s Sausage Dog? New Game+ (p5 Template by CART253 course)
Angel Cella Cenerini

Here is a description of this template p5 project.

**************************************************/

const NUM_ANIMAL_IMAGES = 10;
const NUM_ANIMALS = 150;

// Animals
let animalImages = [];
let animals = [];

// SausageDog
let sausageDogImage = undefined;
let sausageDog = undefined;

// preload()
//
// Description of preload goes here.
function preload() {

  for(let i = 0; i < NUM_ANIMAL_IMAGES; i++){
    let animalImage = loadImage(`assets/images/animal${i}.png`);
    animalImages.push(animalImage);
  }

  sausageDogImage = loadImage(`assets/images/sausage-dog.png`);

}

// setup()
//
// Description of setup() goes here.
function setup() {

  createCanvas(windowWidth, windowHeight);

  // Create Animals
  createAnimals();

  // Create Sausage Dog
  createSausageDog();
}

// draw()
//
// Description of draw() goes here.
function draw() {
background(148, 221, 185); // greenish background

updateAnimals();
updateSausageDog();

}

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
  sausageDog = new SausageDog(x, y, sausageDogImage);
}
function updateSausageDog() {
  sausageDog.update();
}

// p5 Events
function mousePressed() {
  sausageDog.mousePressed();
}
