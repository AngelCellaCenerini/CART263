/**
Exercise 06: Raving Redactionist++
Angel Cella Cenerini

No! Nonna's secret recipe! They're trying to steal it!
...Or maybe they're trying to grab your attention and send a message?
*/

"use strict";

// How frequently function is called
const FREQUENCY = 700;
// Set Probability value
const PROBABILITY = 0.05;
// SFX
const mammaMiaSFX = new Audio("assets/sounds/mammaMia.mp3");

// Set Up
setUp();

function setUp(){
  // Highlight Information via User Input
  $(`#secret-passage`).on(`mouseenter`, highlight);  // the `hover` event doesn't seem to work :/, that's why I used mouseenter/leave

  // Censor Information via User Input
  $(`.top-secret`).on(`click`, redact);

  // Insert Guess for Encoded Message
  $(`#button`).on(`click`, guessSecretMessage);

  // Attempt Reavealing Cesonred Information periodically
  setInterval(revelation, FREQUENCY);

}
//


// Functions
function highlight(){
  // Highlight Encoded Message
  $(`.encoded-message`).addClass(`highlighted`);
}

function redact(event){
  // Censor Recipe Sections
  $(this).removeClass(`revealed`);
  $(this).addClass(`redacted`);
}

function revelation(){
  // Reveal Censored Sections
  $(`.redacted`).each(attemptReveal);
}

function attemptReveal(){
  // Attemp Reavealing Censored Sectios
  let r = Math.random();
  if( r < PROBABILITY){
    $(this).removeClass(`redacted`);
    $(this).addClass(`revealed`);
  }
}

function guessSecretMessage(){
  // Check if User decoded Secret Message
  let input = $(`#text-input`).val();
  if (input === `I'm imprisoned in the kitchen send help`){
    // Display Nonna Mario Reaction
    $(`#mario`).css(`visibility`, `visible`);
    mammaMiaSFX.play();
  }
  else {
    if (input === `i'm imprisoned in the kitchen send help`){
      // Remind User that grammar is a thing
      window.alert("This program is grammar sensitive");
    }
    else{
      // Inform User of Wrong Guess
      window.alert("Nope");
    }
  }
}
//
