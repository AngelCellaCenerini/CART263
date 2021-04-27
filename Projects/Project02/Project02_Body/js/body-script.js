/**
Project02 Body Webpage
Angel Cella Cenerini

This is a template. You must fill in the title,
author, and this description to match your project!
*/

"use strict";

// Keep Track of Statue Progress
let collectedParts = 0;

// Loop function
slideRightHorizontalWalls();
slideLeftHorizontalWalls();
 slideVerticalWalls();

// Drag Statue Pieces
$(`#statue-section`).on(`mouseover`, function(event) {
  $(this).draggable({
    // Constrain Movement
    containment: `#maze`,
    // Revert Movement if part is not dropped upon statue
    revert: "invalid"
  });
});

// Set Up Droppable Element
$(`#statue-silhouette`).droppable({
  // PLace Statue part upon statue
  drop: function(event, ui){
    // Hide part once dropped
    $(`#statue-section`).hide();
    // Eventually complete Statue
    if ( collectedParts >= 0){
      $(`#statue-bust`).css( `visibility`, `visible`);
    }

    collectedParts++;
    }
});

function slideRightHorizontalWalls(){
  $(`#left-side`).animate({
    "left": `75%`
  }, {
    duration: 3000,
    complete: function(){
      $(`#left-side`).animate({
        "left": `0%`
    }, 3000);

    // Loop function
    slideRightHorizontalWalls();
  }
  });
}

function slideLeftHorizontalWalls(){
  $(`#right-side`).animate({
    "left": `0%`
  }, {
    duration: 3500,
    complete: function(){
      $(`#right-side`).animate({
        "left": `75%`
    }, 3500);

    // Loop function
    slideLeftHorizontalWalls();
  }
  });
}

function slideVerticalWalls(){
  $(`#vertical-walls`).animate({
    "top": `50%`
  }, {
    duration: 3500,
    complete: function(){
      $(`#vertical-walls`).animate({
        "top": `0%`
    }, 3500);

    // Loop function
    slideVerticalWalls();
  }
  });
}
