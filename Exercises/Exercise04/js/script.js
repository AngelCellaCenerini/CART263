"use strict";

/**
Exercise04 - Bubble Popper
Angel Cella Cenerini

This is a template. You must fill in the title,
author, and this description to match your project!
*/

// Store User's Webcam
let video = undefined;

// Handpose Model
let handpose = undefined;

// Store Predictions
let predictions = [];

/**
Description of preload
*/
function preload() {

}


/**
Description of setup
*/
function setup() {
createCanvas(windowWidth, windowHeight);

// Access User's Webcam
video = createCapture(VIDEO);
video.hide();  // hide HTML element

// Load Handpose Model
handpose = ml5.handpose(video, {
   flipHorizontal: true
 }, function(){
   console.log(`Handpose Model Loaded`);
 });

 // Set up Handpose Model
 handpose.on(`predict`, function(results){
   console.log(results);
   predictions = results;
 });

}


/**
Description of draw()
*/
function draw() {

background(0);

if(predictions.length > 0){
  let hand = predictions[0];
  // Locate Index Finger
  let index = hand.annotations.indexFinger;
  // Locate Index Finger's Base
  let base = index[0];
  // Base's Coordinates
  let baseX = base[0];
  let baseY = base[1];
    // Locate Index Finger's Tip
  let tip = index[3];
  // Tip's Coordinates
  let tipX = tip[0];
  let tipY = tip[1];

  // Draw Pin
  push();
  noFill();
  stroke(255);
  strokeWeight(4);
  line(baseX, baseY, tipX, tipY);
  pop();

  // Draw Pin Head
  push();
  noStroke();
  fill(255, 0, 0);
  ellipse(baseX, baseY, 20);
  pop();

}



}
