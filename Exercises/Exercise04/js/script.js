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

}
