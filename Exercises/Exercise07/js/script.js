/**
Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!
*/

"use strict";

$(`.secret`).one(`mouseover`, function(event) {
  $(this).addClass(`found`, 500);
  $(this).draggable({
    helper: `clone`
  });
});

$(`#answer`).droppable();
