/**
Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!
*/

"use strict";

// Discover Eyelid
$(`#eyelid`).on(`mouseenter`, function(event) {
  // Display Eyelid Borders via Mouse Input
  $(this).addClass(`found`, 2000);
  // Make Eyelid draggable
  // $(this).draggable({
  //   revert: "invalid", // when not dropped, the item will revert back to its initial position
  //   containment: "document",

    // Clone dragged letters
    // helper: `clone`
  });


$(`#eyelid`).draggable({
  axis: `y`,
  revert: true,
  containment: `#eye-constrainer`,
  scroll: false
  // revertDuration: 200
});
// $( "#eyelid" ).draggable( "revert", "revertDuration", 200 );

// Hide Eyelid
$(`#eyelid`).on(`mouseleave`, function(event) {
  // Display Eyelid Borders via Mouse Input
  $(this).removeClass(`found`, 2000);
});

// Set Up Droppable Element
// $( "#eyelid" ).draggable({ revert: "invalid" });
// $(`#eyelid` ).draggable({
   // cancel: "a.ui-icon", // clicking an icon won't initiate dragging
   // revert: "invalid", // when not dropped, the item will revert back to its initial position
   // containment: "document",
   // helper: "clone",
   // cursor: "move"
 // });
// $(`#eyelid`).droppable({
//   drop: function(event, ui){
//     // PLace letter in Draggable Element
//     let upperEyelid = ui.draggable.text();
//     $(this).append(upperEyelid);
//     ui.draggable.draggable(`disable`);
//     ui.draggable.removeClass(`found`);
//   }
// });
