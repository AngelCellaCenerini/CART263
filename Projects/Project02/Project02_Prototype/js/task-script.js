/**
Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!
*/

"use strict";

// Code goes here

let gameData = JSON.parse(localStorage.getItem(`gameData`));
if (!gameData) {
  gameData = {
    state: `task1`,
    rubySlippers: false,
    thatArray: []
  }
}

$(`#task`).on(`click`, function() {
  gameData.state = `task1Complete`;
  localStorage.setItem(`gameData`,JSON.stringify(gameData));
  window.location = `index.html`;
});
