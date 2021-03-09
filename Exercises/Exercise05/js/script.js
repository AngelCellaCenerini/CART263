/**
Haiku Generator++
Angel Cella Cenerini

Unquestionable Haiku(s) 'til "night time".
*/

"use strict";

// Haiku Lines
let fiveSyllableLines = [
  `Oh, to have money`,
  `The rainbow doesn't know`,
  `A blue raspberry`,
  `The loud, barking horse`,
  `A lonely, green frown`,
  `Hiccuping raindrops`,
  `The joyous weekend`,
  `The rolling desire`
];

let sevenSyllableLines = [
  `The apple questioned the tree`,
  `Oh, to crave the summer breeze`,
  `Oh, to be old and bitter`,
  `The smile has long fallen down`,
  `Seeking without eyesight`,
  `The flower seeking judgment`,
  `Fear not the approaching duck`
];

// Title
let titles = [
  `The Jolly Clown`,
  `Gmail Needs You`,
  `Stormy Letters.`,
  `Fallen Windows.`,
  `A Crippled Swan`,
  `The Watery Suns`
];


// Grabe Elements from page
// Page's Backgorund
let background = document.body
// Title
let titleH = document.getElementById(`title`);
// Haiku Lines
let line1P = document.getElementById(`line-1`);
let line2P = document.getElementById(`line-2`);
let line3P = document.getElementById(`line-3`);
// Directions
let direction1P = document.getElementById(`direction-1`);
let direction2P = document.getElementById(`direction-2`);

// SFX
const crickets = new Audio("assets/sounds/crickets.mp3");

// Set Up
// Generate Titled Haiku
generateTitle();
generateLines();
// User Input
changeLine();  // mouse
nightComes();  // keyboard


function generateTitle(){
  // Set Up Title
  let title = random(titles);
  titleH.innerText = title;
}
function generateLines(){
  // Set Up Lines
  let line1 = random(fiveSyllableLines);
  let line2 = random(sevenSyllableLines);
  let line3 = random(fiveSyllableLines);

  line1P.innerText = line1;
  line2P.innerText = line2;
  line3P.innerText = line3;
}

function changeLine(){
  // User Input affects page
  line1P.addEventListener(`click`, lineClicked);
  line2P.addEventListener(`click`, lineClicked);
  line3P.addEventListener(`click`, lineClicked);
}

function nightComes(){
  // User Input affects page
  background.addEventListener(`keydown`, pressedKeyDown);
  titleH.addEventListener(`keydown`, pressedKeyDown);
  line1P.addEventListener(`keydown`, pressedKeyDown);
  line2P.addEventListener(`keydown`, pressedKeyDown);
  line3P.addEventListener(`keydown`, pressedKeyDown);
}
// /Set Up


function random(array){
  let index = Math.floor(Math.random() * array.length);
  return array[index];
}

// Mouse Input
function lineClicked(event){
  fadeOut(event.target, 1);
}

function fadeOut(element, opacity){
  // Fade Out Line
  opacity -= 0.01;
  element.style[`opacity`] = opacity;
  if (opacity > 0){
    requestAnimationFrame( function(){
      fadeOut(element, opacity);
    });
  }
  else{
      setNewLine(element);
      fadeIn(element, 0);
  }
}

function setNewLine(element){
  if (element === line1P || element === line3P){
    element.innerText = random(fiveSyllableLines);
  }
  else if (element === line2P){
    element.innerText = random(sevenSyllableLines);
  }
}

function fadeIn(element, opacity){
  // Fade In Line
  opacity += 0.01;
  element.style[`opacity`] = opacity;
  if (opacity < 1){
    requestAnimationFrame( function(){
      fadeIn(element, opacity);
    });
  }
}
//

// Keyboard Input
function pressedKeyDown(){
  // User Input affects page
  changeElementsColor();
  changeElementsText();

  crickets.play();  // play Crickets SFX
}

function changeElementsColor(){
  // Change page backgorund color to black
  background.style.backgroundColor = `#000000`;
  // Change text color to white
  titleH.style.color = `#ffffff`;
  line1P.style.color = `#ffffff`;
  line2P.style.color = `#ffffff`;
  line3P.style.color = `#ffffff`;
  // Directions
  direction1P.style.color = `#ffffff`;
  direction2P.style.color = `#ffffff`;
}
function changeElementsText(){
  // Set page text
  // Title
  titleH.innerText = `Dark has fallen`;
  // Lines
  line1P.innerText = `Clouds are no longer`;
  line2P.innerText = `This could never be a meme`;
  line3P.innerText = `Why did the fish speak`;
  // Directions
  direction1P.innerText = `You have chosen to end things...`;
  direction2P.innerText = `Okay. Do you like the crickets?`;
}
//
