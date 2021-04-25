/**
Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!
*/

"use strict";

// Pressed Key by User
let pressedKey = undefined;
// Displayed Note on Pentagram
let playedNote = undefined;
// Correspondant Red Rectangle
let displayedNote = undefined;
// Keep track of Played notes
let playedNotes = 0;
// Amout of lifting applied on "Eyelid"
let lifting = undefined;

// SFX
 let audio = new Audio();
 audio.src = "assets/sounds/bark.wav"

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

$(document).on(`keydown`, (function(event) {
  // Check Key pressed by User
  // User presses 'P'
  if ( event.which === 80){
    pressedKey = 80;
    playedNote = `#do`;
    displayedNote = `#note7`;
    lifting = `20%`;
  }
  // User presses 'L'
  else if(event.which === 76){
    pressedKey = 76;
    playedNote = `#re`;
    displayedNote = `#note6`;
    lifting = `15%`;
  }
  // User presses 'A'
  else if(event.which === 65){
    pressedKey = 65;
    playedNote = `#sol`;
    displayedNote = `#note5`;
    lifting = `10%`;
  }
  // User presses 'Y'
  else if(event.which === 89){
    pressedKey = 89;
    playedNote = `#mi`;
    displayedNote = `#note4`;
    lifting = `5%`;
  }
  // User presses 'I'
  else if(event.which === 73){
    pressedKey = 73;
    playedNote = `#si`;
    displayedNote = `#note3`;
    lifting = `0%`;
  }
  // User presses 'N'
  else if(event.which === 78){
    pressedKey = 78;
    playedNote = `#fa`;
    displayedNote = `#note2`;
    lifting = `-2%`;
  }
  // User presses 'G'
  else if(event.which === 71){
    pressedKey = 71;
    playedNote = `#la`;
    displayedNote = `#note1`;
    lifting = `-10%`;

    // Display Button
    setTimeout( ()=>{
      $(`#vision-webpage`).animate({
        "opacity": `1`
      }, 200);
    }, 2000);

  }

triggerKeyReaction();
}));

function triggerKeyReaction(){
  $(document).keydown(function(event) {
    // User presses Keys (spelling PLAYING)
    // Press 'P'
    if ( event.which === pressedKey ) {
      // Display Played Note
      $(playedNote).addClass(`displayed`);
      // setTimeout(function(){
      $(displayedNote).addClass(`displayed`);
      // Lift eyelid
      $(`#eyelid`).animate({
        "top": lifting
      }, 600);

      // PLay SFX
      audio.play();
    }
  });
}
