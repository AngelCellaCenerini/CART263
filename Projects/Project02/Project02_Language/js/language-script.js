/**
Project02 - Language Webpage
Angel Cella Cenerini

User must guess what Icons means. It must understand and learn the language...
of capitalism >:)
*/

"use strict";

// Check for earlier Progress
let gameData = JSON.parse(localStorage.getItem(`gameData`));
if (!gameData) {
  gameData = {
    state: `visionWebpage`,
    achievedSenses: 0
  }
}

// Store all Images Id
let icons = [
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
// Icons Array Index
let iconIndex = 0;

// Progressbar Values
// Default Value
let currentProgressbarValue = 0;
// Added Value
let addedProgressbarValue = 10;

// Create SFXs
const audio = new Audio("assets/sounds/bark.wav");
const failSFX = new Audio("assets/sounds/bark.wav");  // because failure has a sound :|



// Display Progressbar
displayProgressbar();

// Randomized Blinking Effect
visualEffects();

// Guess Icons
guessIcons();

// Click Button to return to Main Program
returnToMainProgram();




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

function guessIcons(){
  // Guess Icons
  $(`#sumbit-guess`).on(`click`, guessIconMeaning);
}

function guessIconMeaning(){
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
  updateIcon();
}
else {
  // PLay SFX
  failSFX.play()
}
}

function updateProgressBar(){
  // Update Progressbar after User guesses correctly
  currentProgressbarValue += addedProgressbarValue;
    $("#progressbar").progressbar(`value`, currentProgressbarValue);
    // Check Progress
    if(currentProgressbarValue > 10){
      // Display Button to return to Main Program
      setTimeout( ()=>{
        $(`#language-webpage`).animate({
                "opacity": `1`
              }, 400);
          }, 800);
    }
}

function updateIcon(){
  // Apply Disappearing Effect on Prp=progressbar
  let currentIcon = icons[iconIndex];
    $(currentIcon).effect( "blind", "slow" );
      iconIndex++;
}

function returnToMainProgram(){
  // Click Button to return to Main Program
  $(`#language-webpage`).on(`click`, function() {
    gameData.state = `chasingLevel4`;
    localStorage.setItem(`gameData`,JSON.stringify(gameData));
    window.location = `index.html`;
  });
}
//
