/**
Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!
*/

"use strict";

// Store all Solutions
let solutions = [
 `vlck8jGzA8`,
 `jrY6BLaYTe`,
 `oPaRy93LVt`,
 `buplCqPhs6`,
 `dARkXta8Zm`
]

// Store all Solutions
let strings = [
 `#first-string`,
 `#second-string`,
 `#third-string`,
 `#fourth-string`,
 `#fifth-string`
]

let index = 0;
let indexStrings = 0;

// Discover Letters
let currentString = strings[indexStrings];

$( `.all-strings`).on(`mouseover`, function(event) {
  // Display Text
  setTimeout( ()=>{
    $(this).animate({
        "opacity": `1`
      }, 700);
  }, 200);

  // Bounce Text
  $(this).effect(`bounce`);

  // Make Text Disappear
  setTimeout( ()=>{
    $(this).animate({
        "opacity": `0`
      }, 700);
  }, 1500);

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

    console.log(`yes`);

    // PLay SFX
    // audio.play();
    // Proceed to next Guess/Answer
    index++;
    // Apply Progress to String
    indexStrings++;
    updateString();
    // $(currentString).remove();
  }
  else {
console.log(`no`);
  }
}

// }

function updateString(){
  // Apply Disappearing Effect on Prp=progressbar
  let currentString = strings[indexStrings];
  $(currentString).css(`visibility`, `visible`);

}
