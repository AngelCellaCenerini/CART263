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
  $(`#eyelid`).on(`mouseleave`, function(event) {
    // Display Eyelid Borders via Mouse Input
    $(this).removeClass(`found`, 200);
  });
  });


$(`#eyelid`).draggable({
  axis: `y`,
  revert: true,
  containment: `#eye-constrainer`,
  scroll: false
});
