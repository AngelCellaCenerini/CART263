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
    state: `memoryWebpage`,
    achievedSenses: 0

  }
}

$(`#memory-webpage`).on(`click`, function() {
  gameData.state = `chasingLevel2`;
  localStorage.setItem(`gameData`,JSON.stringify(gameData));
  window.location = `index.html`;
});