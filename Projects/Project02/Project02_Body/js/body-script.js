/**
Project02 Body Webpage
Angel Cella Cenerini

This is a template. You must fill in the title,
author, and this description to match your project!
*/

"use strict";

// Keep Track of Statue Progress
let collectedParts = 0;


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
