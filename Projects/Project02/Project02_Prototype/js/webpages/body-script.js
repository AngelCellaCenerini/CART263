/**
Project02 Body Webpage
Angel Cella Cenerini

User has to take into consideration page's "physics" (sliding walls obstructing the way) to collect statue pieces and re-assemble
Canova's "Venere Italica".
*/

"use strict";

// Check for earlier Progress
let gameData = JSON.parse(localStorage.getItem(`gameData`));
if (!gameData) {
  gameData = {
    state: `bodyWebpage`,
    achievedSenses: 0
  }
}

// Keep Track of Statue Progress
// Statue parts collected so far
let collectedParts = 0;
let collectedPart = undefined;
let index = 0;

// Statue Parts/Sections
let parts = [
  `#bust-section`,
  `#left-leg-section`,
  `#head-section`,
  `#right-leg-section`
];
// Statue Section Currently concerned
let currentPart = parts[index];

// Delay Statue Fade In
let delay = 2500;



// Program
// Fade In Statue Section
displayStatueSection(delay);

// Sliding Animations
slidingWalls();

// Drag Circle (representing Statue Section)
dragPiece();

// Drop Statue Section upon Statue
dropPiece();

// Return to Main Program once completed Program
returnToMainProgram();

//


// Functions
function displayStatueSection(delay){
  setTimeout( ()=>{
    $(currentPart).animate({
      "opacity": `1`
    }, 800);
  }, delay);
}

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
    // PLace Statue part upon Statue
    drop: function(event, ui){

      // Hide part once dropped
      $(currentPart).hide();

      // Proceed to Next Statue Section
      index++;
      currentPart = parts[index];

      // Display Next Statue Section
      // Change delay - take less time to start animation
      delay = 1000;
      displayStatueSection(delay);

      // Eventually complete Statue
      if ( index === 1){
        // Display Bust
        collectedPart = `#statue-bust`;
      }
      else if (index === 2){
         // Display Left Leg
         collectedPart = `#statue-left-leg`;
        }
      else if (index === 3){
         // Display Head
         collectedPart = `#statue-head`;
        }
      else if (index === 4){
         // Display Right Leg
         collectedPart = `#statue-right-leg`;
        }

      // Update State
      displayUpdatedStatue(collectedPart);

      // Keep track of progress for Button
      checkProgress();

      }
  });
}

function displayUpdatedStatue(collectedPart){
    // Animate fade in effect for newly achieved Statue Part
    $(collectedPart).animate({
      "opacity": `1`
    }, 300);
}




function slidingWalls(){
  // Sliding Animations
  // Looped animations
  slideRightHorizontalWalls();
  slideLeftHorizontalWalls();
  slideVerticalWalls();
}

// Horizontal Walls sliding from right to left
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
// Horizontal Walls sliding from left to right
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
// Vertical Walls sliding aling Y axis
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

function checkProgress(){
// Check Progress
if(index === 4){
  // Display Button to return to Main Program
  setTimeout( ()=>{
    $(`#body-webpage`).animate({
            "opacity": `1`
          }, 400);
      }, 1000);
}
}

function returnToMainProgram(){
  // Click Button to return to Main Program
  $(`#body-webpage`).on(`click`, function() {
    gameData.state = `chasingLevel`;
    localStorage.setItem(`gameData`,JSON.stringify(gameData));
    window.location = `index.html`;
  });
}
//
