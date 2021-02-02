"use strict";

/**
Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!
*/
const NUM_ANIMAL_IMAGES = 11;
const NUM_ANIMALS = 5;

// Waves
// Wave01
let wave1Image = undefined;
let wave1 = undefined;
// Wave02
let wave2Image = undefined;
let wave2 = undefined;
// Wave03
let wave3Image = undefined;
let wave3 = undefined;

// Boat
let boatImage = undefined;
let boat = undefined;

// Animals
let animalImages = [];
let animals = [];

const ANIMALS = [
      "aardvark",
      "alligator",
      "alpaca",
      "antelope",
      "ape",
      "armadillo",
      "baboon",
      "badger",
      "bat",
      "bear",
      "beaver",
      "bison",
      "boar",
      "buffalo",
      "bull",
      "camel",
      "canary",
      "capybara",
      "cat",
      "chameleon",
      "cheetah",
      "chimpanzee",
      "chinchilla",
      "chipmunk",
      "cougar",
      "cow",
      "coyote",
      "crocodile",
      "crow",
      "deer",
      "dingo",
      "dog",
      "donkey",
      "dromedary",
      "elephant",
      "elk",
      "ewe",
      "ferret",
      "finch",
      "fish",
      "fox",
      "frog",
      "gazelle",
      "gila monster",
      "giraffe",
      "gnu",
      "goat",
      "gopher",
      "gorilla",
      "grizzly bear",
      "ground hog",
      "guinea pig",
      "hamster",
      "hedgehog",
      "hippopotamus",
      "hog",
      "horse",
      "hyena",
      "ibex",
      "iguana",
      "impala",
      "jackal",
      "jaguar",
      "kangaroo",
      "koala",
      "lamb",
      "lemur",
      "leopard",
      "lion",
      "lizard",
      "llama",
      "lynx",
      "mandrill",
      "marmoset",
      "mink",
      "mole",
      "mongoose",
      "monkey",
      "moose",
      "mountain goat",
      "mouse",
      "mule",
      "muskrat",
      "mustang",
      "mynah bird",
      "newt",
      "ocelot",
      "opossum",
      "orangutan",
      "oryx",
      "otter",
      "ox",
      "panda",
      "panther",
      "parakeet",
      "parrot",
      "pig",
      "platypus",
      "polar bear",
      "porcupine",
      "porpoise",
      "prairie dog",
      "puma",
      "rabbit",
      "raccoon",
      "ram",
      "rat",
      "reindeer",
      "reptile",
      "rhinoceros",
      "salamander",
      "seal",
      "sheep",
      "shrew",
      "silver fox",
      "skunk",
      "sloth",
      "snake",
      "squirrel",
      "tapir",
      "tiger",
      "toad",
      "turtle",
      "walrus",
      "warthog",
      "weasel",
      "whale",
      "wildcat",
      "wolf",
      "wolverine",
      "wombat",
      "woodchuck",
      "yak",
      "zebra"
    ];

let currentAnimal = ``;
let currentAnswer = ``;

let correctGuesses = [];
let wrongGuesses = [];



/**
Description of preload
*/
function preload() {
  // Load Images
  // Animals
  for(let i = 0; i < NUM_ANIMAL_IMAGES; i++){
    let animalImage = loadImage(`assets/images/animal${i}.png`);
    animalImages.push(animalImage);
  }

  // Waves
  wave1Image = loadImage(`assets/images/wave1.png`);
  wave2Image = loadImage(`assets/images/wave2.png`);
  wave3Image = loadImage(`assets/images/wave3.png`);

  // Boat
  boatImage = loadImage(`assets/images/boat.png`);
}


/**
Description of setup
*/
function setup() {

  createCanvas(windowWidth, windowHeight);

 if(annyang){
   let commands = {
   'I think it is *animal' : guessAnimal
   };
   annyang.addCommands(commands);   // can be added here for it's strictly related to annyang
   annyang.start();                 // can be added here for it's strictly related to annyang

   textSize(25);
   textAlign(CENTER, CENTER);
   imageMode(CENTER);
 }

 // Create Waves
 createWaves();

 // Create Boat
 createBoat();

 // Create Animals
 createAnimals();
}


/**
Description of draw()
*/
function draw() {
  background(189, 229, 234);



  // Waves
  wave1.update();
  wave2.update();
  wave3.update();

  // Boat
  boat.update();

  // Animals
  updateAnimals();

  // Answers
  displayAnswer();
  trackAnswers();

}

// Simulation
// Waves
function createWaves(){
  // Wave01
  let x = width/2;
  let y = height/2;
  let imageWidth = 4*width/3;
  wave1 = new Wave(x, y, wave1Image, imageWidth);
  // Wave02
  x = width/2;
  y = 2*height/3
  imageWidth = 4*width/3;
  wave2 = new Wave(x, y, wave2Image, imageWidth);
  // Wave03
  x = width/2;
  y = 2*height/3;
  imageWidth = 4*width/3;
  wave3 = new Wave(x, y, wave3Image, imageWidth);
}
// Boat
function createBoat(){
  let x = width/2;
  let y = height/2;
  boat = new Boat(x, y, boatImage);
}

// Animals
function createAnimals(){
  for(let i = 0; i < NUM_ANIMALS; i++){
    let x = random(0, width);
    let y = random( 0, height);
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

// Check if answer is correct and display it
function displayAnswer(){
  // Check if guess is correct
  if(currentAnswer === currentAnimal){
    fill(0, 255, 0);
  }
  else{
    fill(255, 0, 0);
  }
  text(currentAnswer, width/2, height/2);
}

//
function trackAnswers(){
  if (correctGuesses.length > 2){
    console.log(`success`);
  }
  if (wrongGuesses.length > 4){
    console.log(`fail`);
  }
}

// Guess Animal
function guessAnimal(animal){
  currentAnswer = animal.toLowerCase();
  if(currentAnswer === currentAnimal){
    correctGuesses.push(currentAnswer);
    console.log(correctGuesses);
    for (let i = 0; i < animals.length; i++) {
      animals[i].active = true;
    }
  }
  else{
    wrongGuesses.push(currentAnswer);
    console.log(wrongGuesses);
  }
}

//
function readAnimalBackwards(){
  currentAnimal = random(ANIMALS);
  let reverseAnimal = reverseString(currentAnimal);
  responsiveVoice.speak(reverseAnimal);
}

// Read animal in reverse
function reverseString(string){
 let characters = string.split('');  // splitting string into characters (array)
 let reverseCharacters = characters.reverse(); // reverse order of array's elements
 let result = reverseCharacters.join(''); // reassemble
 return result;

}

// p5 Events
function mousePressed(){
 readAnimalBackwards();
}
