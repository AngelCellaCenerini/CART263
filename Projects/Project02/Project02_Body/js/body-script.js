/**
Project02 Body Webpage
Angel Cella Cenerini

This is a template. You must fill in the title,
author, and this description to match your project!
*/

"use strict";

// Keep Track of Statue Progress
let collectedParts = 0;
let collectedPart = undefined;
let index = 0;
let parts = [
  `#bust-section`,
  `#left-leg-section`,
  `#head-section`,
  `#right-leg-section`
];

let currentPart = parts[index];

let delay = 2500;

// Fade In Statue Section

displayStatueSection(delay);

// Sliding Animations
slidingWalls();

dragPiece();

dropPiece();

function displayStatueSection(delay){
  setTimeout( ()=>{
    $(currentPart).animate({
      "opacity": `1`
    }, 800);
  }, delay);
}

function dragPiece(){
  // Drag Statue Pieces
  $(`.statue-section`).on(`mouseover`, function(event) {
    $(this).draggable({

      // Constrain Movement
      containment: `#maze`,
      // Revert Movement if part is not dropped upon statue
      revert: "invalid"
    });
  });
}

function dropPiece(){
  // Set Up Droppable Element
  $(`#statue-silhouette`).droppable({
    // PLace Statue part upon statue
    drop: function(event, ui){

      // Hide part once dropped
      $(currentPart).hide();

      // Proceed to Next Statue Section
      index++;
      currentPart = parts[index];

      // Display Next Statue Section
      delay = 1000;
      displayStatueSection(delay);

      // Eventually complete Statue
      if ( index === 1){
        // Display Bust
        collectedPart = `#statue-bust`;
      }
      else if (index === 2){
         // Display Left Leg
         collectedPart = `#statue-left-leg`;
        }
      else if (index === 3){
         // Display Head
         collectedPart = `#statue-head`;
        }
      else if (index === 4){
         // Display Right Leg
         collectedPart = `#statue-right-leg`;
        }

      // Update State
      displayUpdatedStatue(collectedPart);

      }
  });
}

function displayUpdatedStatue(collectedPart){
    $(collectedPart).animate({
      "opacity": `1`
    }, 300);
}




function slidingWalls(){
  // Sliding Animations
  // Looped animations
  slideRightHorizontalWalls();
  slideLeftHorizontalWalls();
  slideVerticalWalls();
}
function slideRightHorizontalWalls(){
  $(`#left-side`).animate({
    "left": `75%`
  }, {
    duration: 2000,
    complete: function(){
      $(`#left-side`).animate({
        "left": `0%`
    }, 2000);

    // Loop function
    slideRightHorizontalWalls();
  }
  });
}

function slideLeftHorizontalWalls(){
  $(`#right-side`).animate({
    "left": `0%`
  }, {
    duration: 1700,
    complete: function(){
      $(`#right-side`).animate({
        "left": `75%`
    }, 1700);

    // Loop function
    slideLeftHorizontalWalls();
  }
  });
}

function slideVerticalWalls(){
  $(`#vertical-walls`).animate({
    "top": `50%`
  }, {
    duration: 1500,
    complete: function(){
      $(`#vertical-walls`).animate({
        "top": `0%`
    }, 1500);

    // Loop function
    slideVerticalWalls();
  }
  });
}
