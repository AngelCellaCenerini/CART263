/**
Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!
*/

"use strict";

// Discover Letters
$(`#first-string`).on(`mouseover`, function(event) {
  // Display Text
  setTimeout( ()=>{
    $(this).animate({
        "opacity": `1`
      }, 700);
  }, 200);

  // Bounce Text
  $(this).effect(`bounce`);

  // Make Text Disappear
  setTimeout( ()=>{
    $(this).animate({
        "opacity": `0`
      }, 700);
  }, 1500);

});
