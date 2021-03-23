/**
We're all tired, and that's okay
Angel Cella Cenerini

This is a poem of sorts; perhaps not very poetic, but hopefully relatable.
Is our mind too drained to discover the secret message within?
*/

"use strict";

// SFX
const birthdayBlowerSFX = new Audio("assets/sounds/birthdayBlower.mp3");
const lullabySFX = new Audio("assets/sounds/lullaby.mp3");

// Secret Message
const secretAnswer = `sleepDeprivation`;

// Display Istructions (or rather, make User read Instructions)
$(`#exercise-instructions`).dialog({
  modal: true,
  resizable: false,
  buttons: {
    // Confirm Instructions, start simulation
    "Understood(?)": function(){
      $(this).dialog(`close`);
    }
  }
});

// Discover Letters
$(`.secret`).one(`mouseover`, function(event) {
  // Display Underlined and Bold letters via Mouse Input
  $(this).addClass(`found`, 500);
  // Make letters draggable
  $(this).draggable({
    // Clone dragged letters
    helper: `clone`
  });
});

// Set Up Droppable Element
$(`#answer`).droppable({
  drop: function(event, ui){
    // PLace letter in Draggable Element
    let letter = ui.draggable.text();
    $(this).append(letter);
    ui.draggable.draggable(`disable`);
    ui.draggable.removeClass(`found`);
    // Check if User inserted correct Secret Answer
    if( $(this).text() === secretAnswer){
      // Congratulate User - Open Dialog
      $(`#solved-dialog`).dialog(`open`);
      birthdayBlowerSFX.play(); // SFX
    }
  }
});

// Final Dialog
$(`#solved-dialog`).dialog({
  autoOpen: false,
  resizable: false,
  buttons: {
    "zzz": function(){
      $(this).dialog(`close`);
      // Turn Background Image Visible
      $(`#background-image`).css(`visibility`, `visible`);
      lullabySFX.play(); //SFX
    }
  }
});
