"use strict";

/**
Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!
*/
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

/**
Description of preload
*/
function preload() {

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
 }
}


/**
Description of draw()
*/
function draw() {
  background(0);

  // Check if guess is correct
  if(currentAnswer === currentAnimal){
    fill(0, 255, 0);
  }
  else{
    fill(255, 0, 0);
  }
  text(currentAnswer, width/2, height/2);

}

// p5 Events
function mousePressed(){
  currentAnimal = random(ANIMALS);
  let reverseAnimal = reverseString(currentAnimal);
  responsiveVoice.speak(reverseAnimal);
}

// Guess Animal
function guessAnimal(animal){
  currentAnswer = animal.toLowerCase();
}

// Read animal in reverse
function reverseString(string){
 let characters = string.split('');  // splitting string into characters (array)
 let reverseCharacters = characters.reverse(); // reverse order of array's elements
 let result = reverseCharacters.join(''); // reassemble
 return result;

}
