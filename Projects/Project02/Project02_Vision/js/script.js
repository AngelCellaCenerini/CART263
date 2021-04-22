/**
Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!
*/

"use strict";

// $(`.pentagram`).hide();

// Discover Eyelid
$(`#eyelid`).on(`mouseenter`, function(event) {
  // Display Eyelid Borders via Mouse Input
  $(this).addClass(`found`, 2000);
  // setTimeout( ()=>{
    // Display Pentagram
    // $(`.pentagram`).display(3000);
    $(`.pentagram`).animate({
      "opacity": `1`
    }, 2000);
  // }, 1000);

  // Make Eyelid draggable
  $(`#eyelid`).on(`mouseleave`, function(event) {
    // Display Eyelid Borders via Mouse Input
    $(this).removeClass(`found`, 200);
  });
  });

// Drag Eyelid Upwards
$(`#eyelid`).draggable({
  axis: `y`,
  revert: true,
  containment: `#eye-constrainer`,
  scroll: false
});


// PLay notes
$(`.pentagram`).keydown(function(event) {
  // $(`#do`).show();
  $(`#do`).addClass(`visible`, 2000);
});
