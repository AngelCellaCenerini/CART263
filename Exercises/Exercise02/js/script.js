"use strict";

/**
Noah's Ark
Angel Cella Cenerini

Guess correctly the animal and save the Earth. Don't, and bring Doom upon the animal kingdom.
*/
const NUM_ANIMAL_IMAGES = 11;
const NUM_ANIMALS = 8;

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

// Sun
let sunImage = undefined;
// Trees
let treesImage = undefined;

// Rain
let rainImage = undefined;

// Animals
let animalImages = [];
let animals = [];
let drowingAnimals = [];

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


let state = `title`;  // Title, Simulation, Endings: Failure, Success


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

  // Boat
  sunImage = loadImage(`assets/images/sun.png`);
  // Boat
  treesImage = loadImage(`assets/images/trees.png`);

  // Boat
  rainImage = loadImage(`assets/images/rain.gif`);
}



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
   rectMode(CENTER);
 }

 // Create Waves
 createWaves();

 // Create Boat
 createBoat();

 // Create Animals
 createAnimals();
}



function draw() {
  background(189, 229, 234);

  if(state === `title`){
    background(0);
    titleText();
  }
  else if(state === `simulation`){

    // Waves
    wave1.update();
    wave2.update();
    upgradeDrowningAnimals();   // Animals (inserted in-between waves to create "immersive" experience XD)
    boat.update();              // Boat (inserted in-between waves to create "immersive" experience XD)
    wave3.update();

    // Animals
    updateAnimals();

    // Answers
    displayAnswer();
    trackAnswers();
  }
  else if (state === `failure`){
    background(200); // light gray
    // Animals
    upgradeDrowningAnimals();
    // Rain
    image(rainImage, width/2, height/2, width, height);
  }
  else if(state === `success`){
    // Sun
    image(sunImage, 3*width/4, height/3);
    // Trees
    image(treesImage, width/2, 2*height/3, width);

  }

}

// Title
function titleText(){
  push();
  fill(255);
  textSize(42);
  text(`Noah's Ark`, width/2, height/3);
  textSize(23);
  text(`Guess the animal correctly to save as many species as possible.
    Or fail and bring Doom upon the animal kingdom.

    Feel free to skip any prompt by clicking the mouse.
    If you turn out to be as successful as I am with guessing, you can use the Console.`, width/2, height/2);
  textSize(18);
  text(`Press ENTER to play god.`, width/2, 2*height/3);
  pop();
}
//

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
    let y = random( 0, height/3);
    let animalImage = random(animalImages);
    let animal = new Animal(x, y, animalImage);
    animals.push(animal);
  }
  for(let i = 0; i < NUM_ANIMALS; i++){
    let x = random(0, width);
    let y = random(height/2, height);
    let animalImage = random(animalImages);
    let drowingAnimal = new Animal(x, y, animalImage);
    drowingAnimals.push(drowingAnimal);
  }
}
function updateAnimals() {
  for (let i = 0; i < animals.length; i++) {
    animals[i].update();
  }
}
function upgradeDrowningAnimals() {
  for (let i = 0; i < drowingAnimals.length; i++) {
    drowingAnimals[i].upgrade();
  }
}

// Display Answer
function displayAnswer(){
  pop();
  noStroke();
  fill(255);
  let rectWidth = 210;
  let rectHeight = 90;
  let rectRadius = 10;
  rect(width/2, height/3, rectWidth, rectHeight, rectRadius);
  fill(0);
  text(currentAnswer, width/2, height/3);
  push();
}

// Track Answers
function trackAnswers(){
  if (correctGuesses.length > 2){
    state = `success`;
    responsiveVoice.speak(`Congrats, you saved the Earth!`);
  }
  if (wrongGuesses.length > 5){
    state = `failure`;
    responsiveVoice.speak(`The world could no longer take your failure. You have let everybody down.`);
  }
}

// Guess Animal
function guessAnimal(animal){
  currentAnswer = animal.toLowerCase();
  if(currentAnswer === currentAnimal){
    correctGuesses.push(currentAnswer);
    for (let i = 0; i < animals.length; i++) {
      animals[i].active = true;
    }
  }
  else{
    wrongGuesses.push(currentAnswer);
    for (let i = 0; i < drowingAnimals.length; i++) {
      drowingAnimals[i].active = true;
    }
  }
}

// Read animal in reverse
function readAnimalBackwards(){
  currentAnimal = random(ANIMALS);
  let reverseAnimal = reverseString(currentAnimal);
  responsiveVoice.speak(reverseAnimal);
}

// Reverse words
function reverseString(string){
 let characters = string.split('');  // splitting string into characters (array)
 let reverseCharacters = characters.reverse(); // reverse order of array's elements
 let result = reverseCharacters.join(''); // reassemble
 return result;

}

// p5 Events
function mousePressed(){
  if (state === `simulation`){
    readAnimalBackwards();
  }
}
function keyPressed(){
  if (keyCode === 13 && state === `title`){
     state = `simulation`;
  }
}
