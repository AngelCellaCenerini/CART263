/**
Project 02 - "Vision Webpage"
Angel Cella Cenerini

User must lure eye (it is the "vision" page hehe) to stay open by piquing its interest.
By mouse and keyboard input, User discovers elements withing the page that eventually bring them to the Button (thus, back to main program)
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

// Pressed Key by User
let pressedKey = undefined;
// Displayed Note on Pentagram
let playedNote = undefined;
// Correspondant Red Rectangle
let displayedNote = undefined;
// Amout of lifting applied on "Eyelid"
// let lifting = undefined;

// SFX
const audio = new Audio("assets/sounds/bark.wav");

// Store and keep track of all keys required in specific order
let keySequence = [
  80,
  76,
  65,
  89,
  73,
  78,
  71
];

let keyIndex = 0;
let currentKey = keySequence[keyIndex];

// Store and keep track of all notes played in specific order
let playedNotes = [
  `#do`,
  `#re`,
  `#sol`,
  `#mi`,
  `#si`,
  `#fa`,
  `#la`
];

let playedNoteIndex = 0;
let currentlyPlaying = playedNotes[playedNoteIndex];

// Store and keep track of all notes displayed in specific order
let displayedNotes = [
  `#note7`,
  `#note6`,
  `#note5`,
  `#note4`,
  `#note3`,
  `#note2`,
  `#note1`
];

let displayedNoteIndex = 0;
let currentlyDisplaying = displayedNotes[displayedNoteIndex];

// Keep track of Eye's lifting
let liftingAmounts = [
  `12vw`,
  `10vw`,
  `8vw`,
  `6vw`,
  `4vw`,
  `0vw`,
  `-4vw`
];

let liftIndex = 0;
let lift = liftingAmounts[liftIndex];


// Program
// Toggle Eyelid bottom border via mouse input
updateEyelidBorder();
// Drag Eyelid Upwards
dragEyelid();

// Update Pentagram via User Input
updatePentagram();

// Keep track of Keyboard Input
trackKeyboardInput();

// Click Button to return to Main Program
returnToMainProgram();

//




// Functions
function updateEyelidBorder(){
  // Discover Eyelid
  $(`#eyelid`).on(`mouseenter`, function(event) {
    // Display Eyelid Borders via Mouse Input
    $(this).addClass(`found`, 2000);

    // Make Eyelid draggable
    $(`#eyelid`).on(`mouseleave`, function(event) {
      // Display Eyelid Borders via Mouse Input
      $(this).removeClass(`found`, 200);
    });
    });
}

function dragEyelid(){
  // Drag Eyelid Upwards
  $(`#eyelid`).draggable({
    // Constrain movement to vertical axis
    axis: `y`,
    // Return to default position
    revert: true,
    // Constrain Movement
    containment: `#eye-constrainer`,
    scroll: false,
    // Start Pentagram Animation
    start: function() {
      setTimeout( ()=>{
        $(`.pentagram`).animate({
          "opacity": `1`
        }, 3000);
      }, 3000);
    },
  });
}

function updatePentagram(){
  // Display full Pentagram
  $(`.pentagram`).on(`mouseenter`, function(event) {
    // Animate Pentagram Lines
    $(this).animate({
      "width": `100%`
    }, 1000);

    // Trigger Instructions Display
    $(`.pentagram`).one(`mouseleave`, function(event) {
      // Give Instructions Blinking Effect
      setTimeout( ()=>{
        setInterval( ()=>{
          $(`.instructions`).toggleClass(`displayed`);
        }, 3000);
      }, 2000);
    });
  });
}

function trackKeyboardInput(){
  // Check Key pressed by User
  $(document).on(`keydown`, (function(event) {
    // User presses keys to spell "P L A Y I N G"
    // Track Key currently pressed
    currentKey = keySequence[keyIndex];
    if ( event.which === currentKey){
        // Trigger Visual and Acoustic Reactions
        triggerKeyReaction();
        // Update Current Pressed Key
        keyIndex++;
        // Update Current Played Note
        playedNoteIndex++;
        // Update Current Displayed Note
        displayedNoteIndex++;
        // Update Current Lifting Amount
        liftIndex++;
    }

    // Once Task complete, display button
    displayButton();

  }));
}

function triggerKeyReaction(){
    // User presses Keys (spelling PLAYING)
      // Display Played Note
      currentlyPlaying = playedNotes[playedNoteIndex];
      $(currentlyPlaying).addClass(`displayed`);
      // setTimeout(function(){
      currentlyDisplaying = displayedNotes[displayedNoteIndex];
      $(currentlyDisplaying).addClass(`displayed`);
      // Lift eyelid
      lift = liftingAmounts[liftIndex];
      // lift = currentHeight - lifting
      $(`#eyelid`).animate({
        "top": lift
      }, 600);

      // PLay SFX
      audio.play();
}

function displayButton(){
  // Check if User has spelled "P l a y i n g "
  if (keyIndex === 6){
    // Display Button
    setTimeout( ()=>{
      $(`#vision-webpage`).animate({
        "opacity": `1`
      }, 200);
    }, 4000);
  }
}

function returnToMainProgram(){
  // Click Button to return to Main Program
  $(`#vision-webpage`).on(`click`, function() {
    gameData.state = `chasingLevel2`;
    localStorage.setItem(`gameData`,JSON.stringify(gameData));
    window.location = `index.html`;
  });
}
//
