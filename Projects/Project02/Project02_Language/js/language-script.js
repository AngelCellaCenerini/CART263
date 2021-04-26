/**
Project02 - Language Webpage
Angel Cella Cenerini

User must guess what Icons means. It must understand and learn the language...
of capitalism >:)
*/

"use strict";

// Store all Images Id
let handSymbols = [
`#okay`,
`#okay2`,
`#okay3`,
`#okay4`,
`#okay5`,
`#okay6`,
`#okay7`
];

// Store all Solutions
let solutions = [
 `okay`,
 `okay2`,
 `okay3`,
 `okay4`,
 `okay5`,
 `okay6`,
 `okay7`
]

// Solutions Array Index
let index = 0;
// Hand Symbols Array Index
let iconIndex = 0;

// Progressbar Values
// Default Value
let currentProgressbarValue = 0;
// Added Value
let addedProgressbarValue = 10;

// Create SFX
const audio = new Audio("assets/sounds/bark.wav");

// Display Progressbar
displayProgressbar();

// Randomized Blinking Effect
visualEffects();

// Guess Hand Symbol
// Insert Guess
$(`#sumbit-guess`).on(`click`, guessHandMeaning);




// Functions
function displayProgressbar(){
  // Display Progressbar
  $( function() {
    $( "#progressbar" ).progressbar({
      value: currentProgressbarValue
    });
  } );
}

function visualEffects(){
  // Visual Effects
  setInterval( ()=>{
    $(`#blinking-dot`).hide();
  }, 700);

  setInterval( ()=>{
    $(`.blinking-effect-1`).hide();
  }, 600);

  setInterval( ()=>{
    $(`.blinking-effect-2`).hide();
  }, 900);

  setInterval( ()=>{
    $(`#first-varied-data`).hide();
  }, 3000);

  setInterval( ()=>{
    $(`#second-varied-data`).show();
  }, 3000);

  setInterval( ()=>{
    $(`#first-numeric-data`).hide();
  }, 2000);

  setInterval( ()=>{
    $(`#second-numeric-data`).show();
  }, 2000);
}

function guessHandMeaning(){
// Check Text Input
let input = $(`#text-input`).val();
// Check Current Solution/Correct Answer
let currentSolution = solutions[index];
// Check if User has guessed correctly
if (input === currentSolution){

  // PLay SFX
  audio.play();
  // Proceed to next Guess/Answer
  index++;
  // Apply Progress to Progressbar
  updateProgressBar();
  // Apply Progress to Icon
  updateHandIcon();
}
else {
  console.log(`nope`);
}
}

function updateProgressBar(){
  // Update Progressbar after User guesses correctly
  currentProgressbarValue += addedProgressbarValue;
    $("#progressbar").progressbar(`value`, currentProgressbarValue);
}

function updateHandIcon(){
  // Apply Disappearing Effect on Prp=progressbar
  let currentIcon = handSymbols[iconIndex];
    $(currentIcon).effect( "blind", "slow" );
      iconIndex++;
}
//
