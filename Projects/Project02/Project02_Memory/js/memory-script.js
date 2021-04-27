/**
Title of Project
Author Name

User discovers (randomized)strings of text via mouse to then rewrite them in the input bar;
if correctly rewritten, new strings will appear.
Yet, the old ones won't deactivate, therefore the User must remember which are the new one.
*/

"use strict";

// Check for earlier Progress
let gameData = JSON.parse(localStorage.getItem(`gameData`));
if (!gameData) {
  gameData = {
    state: `memoryWebpage`,
    achievedSenses: 0
  }
}

// Store all Solutions
let solutions = [
 `vlck8jGzA8`,
 `jrY6BLaYTe`,
 `oPaRy93LVt`,
 `buplCqPhs6`,
 `dARkXta8Zm`,
 `vVaBphhwtB`
]

// Store all Strings ID
let strings = [
 `#first-string`,
 `#second-string`,
 `#third-string`,
 `#fourth-string`,
 `#fifth-string`,
 `#sixth-string`
]

// Keep track of Solutions guessed
let index = 0;
// Keep track of displayed strings
let indexStrings = 0;

// Discover Letters
discoverString();

// Click Button to return to Main Program
returnToMainProgram();
function discoverString(){
  $( `.all-strings`).on(`mouseover`, function(event) {
    // Display Text
      $(this).animate({
          "opacity": `1`
        }, 700);

    // Bounce Text
    $(this).effect(`bounce`);

    // Make Text Disappear
    $(this).on(`mouseleave`, function(event) {
    setTimeout( ()=>{
      $(this).animate({
          "opacity": `0`
        }, 700);
    }, 1500);
  });

  });
}

$( `.random-strings1`).on(`mouseover`, function(event) {
if(index > 2){
  $(this).animate({
      "opacity": `1`
    }, 700);
    // Bounce Text
    $(this).effect(`bounce`);

    // Make Text Disappear
    $(this).on(`mouseleave`, function(event) {
    setTimeout( ()=>{
      $(this).animate({
          "opacity": `0`
        }, 700);
    }, 1500);
  });
}
});

$( `.random-strings2`).on(`mouseover`, function(event) {
if(index > 4){
  $(this).animate({
      "opacity": `1`
    }, 700);
    // Bounce Text
    $(this).effect(`bounce`);

    // Make Text Disappear
    $(this).on(`mouseleave`, function(event) {
    setTimeout( ()=>{
      $(this).animate({
          "opacity": `0`
        }, 700);
    }, 1500);
  });
}
});

// Guess Strings
$(`#submit-guess`).on(`click`, rememberString);


function rememberString(){
  // Check Text Input
  let input = $(`#text-input`).val();
  // Check Current Solution/Correct Answer
  let currentSolution = solutions[index];
  // Check if User has guessed correctly
  if (input === currentSolution){

    // PLay SFX
    // audio.play();
    // Reset Input Value
    // (input var didn't work)
    $(`#text-input`).val(``);
    // Proceed to next Guess/Answer
    index++;
    // Apply Progress to String
    indexStrings++;
    updateString();

    displayButton();

    $(document.body).css(`background-color`, `#FFFFFF`);
    setTimeout( ()=>{
      $(document.body).css(`background-color`, `#000000`);
    }, 100);
  }
}

// }

function updateString(){
  // Apply Disappearing Effect on Prp=progressbar
  let currentString = strings[indexStrings];
  $(currentString).css(`visibility`, `visible`);

  if(index > 2){
    $(`.random-strings1`).css(`visibility`, `visible`);
  }
  if(index > 4){
    $(`.random-strings2`).css(`visibility`, `visible`);
  }

}

function displayButton(){
  // Check User progress
  if(index > 5){
    // Display Button to return to Main Program
    setTimeout( ()=>{
      $(`#memory-webpage`).animate({
              "opacity": `1`
            }, 400);
        }, 800);
  }
}

function returnToMainProgram(){
  // Click Button to return to Main Program
  $(`#language-webpage`).on(`click`, function() {
    gameData.state = `chasingLevel4`;
    localStorage.setItem(`gameData`,JSON.stringify(gameData));
    window.location = `index.html`;
  });
}
