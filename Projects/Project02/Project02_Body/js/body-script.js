/**
Project02 Body Webpage
Angel Cella Cenerini

This is a template. You must fill in the title,
author, and this description to match your project!
*/

"use strict";

// Keep Track of Statue Progress
let collectedParts = 0;
let index = 0;
let parts = [
  `#bust-section`,
  `#left-leg-section`,
  `#head-section`,
  `#right-leg-section`
];

let currentPart = parts[index];



// Sliding Animations
slidingWalls();

dragPiece();

dropPiece();

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
      $(currentPart).css( `visibility`, `visible`);

      // Eventually complete Statue
      if ( collectedParts >= 0){
        // Display Bust
        $(`#statue-bust`).css( `visibility`, `visible`);
        if (collectedParts = 1){
          // Display Left Leg
          $(`#statue-left-leg`).css( `visibility`, `visible`);
        }
        if (collectedParts = 2){
          // Display Head
          $(`#statue-head`).css( `visibility`, `visible`);
        }
        if (collectedParts = 3){
          // Display Right Leg
          $(`#statue-right-leg`).css( `visibility`, `visible`);
        }
      }
      collectedParts++;
      }
  });
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
