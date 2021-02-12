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

// Bubble
let bubble = undefined;

// Bubbles
let bubbles = [];
let numPinkBubbles = 2;
let numVioletBubbles = 2;
let numBlueBubbles = 2;
let numGreenBubbles = 2;

// Twinkles
let twinkleSFX1 = undefined;
let twinkleSFX2 = undefined;
let twinkleSFX3 = undefined;
let twinkleSFX4 = undefined;

// Track Popped Bubbles
let poppedBubbles = [];


// State
let state = `running`;  // Loading, Running
/**
Description of preload
*/
function preload() {

  twinkleSFX1 = loadSound(`assets/sounds/xilo1.mp3`);
  twinkleSFX2 = loadSound(`assets/sounds/xilo2.mp3`);
  twinkleSFX3 = loadSound(`assets/sounds/xilo3.mp3`);
  twinkleSFX4 = loadSound(`assets/sounds/xilo4.mp3`);

}


/**
Description of setup
*/
function setup() {
createCanvas(windowWidth, windowHeight);
// noCursor();

// // Access User's Webcam
// video = createCapture(VIDEO);
// video.hide();  // hide HTML element
//
// // Load Handpose Model
// handpose = ml5.handpose(video, {
//    flipHorizontal: true
//  }, function(){
//    console.log(`Handpose Model Loaded`);
//    state = `running`;
//  });
//
//  // Set up Handpose Model
//  handpose.on(`predict`, function(results){
//    console.log(results);
//    predictions = results;
//  });

// Bubbles
// Pink Bubble
for (let i = 0; i < numPinkBubbles; i++) {
  let x = random(0, width);
  let y = random(-500, height);
  let size = random(50, 120);
  let pinkBubble = new PinkBubble(x, y, size, twinkleSFX1);
  bubbles.push(pinkBubble);
}
// Violet Bubble
for (let i = 0; i < numVioletBubbles; i++) {
  let x = random(0, width);
  let y = random(-500, height);
  let size = random(50, 120);
  let violetBubble = new VioletBubble(x, y, size, twinkleSFX2);
  bubbles.push(violetBubble);
}
// Blue Bubble
for (let i = 0; i < numBlueBubbles; i++) {
  let x = random(0, width);
  let y = random(-500, height);
  let size = random(50, 120);
  let blueBubble = new BlueBubble(x, y, size, twinkleSFX3);
  bubbles.push(blueBubble);
}
// Green Bubble
for (let i = 0; i < numGreenBubbles; i++) {
  let x = random(0, width);
  let y = random(-500, height);
  let size = random(50, 120);
  let greenBubble = new GreenBubble(x, y, size, twinkleSFX4);
  bubbles.push(greenBubble);
}

}


/**
Description of draw()
*/
function draw() {

background(0);

if (state === `loading`){

  push();
  fill(255);
  textSize(35);
  textFont(`Courier`);
  textAlign(CENTER, CENTER);
  // text(`Great things take time. Please enjoy the loading screen.`, width/2, height/3);
  text(`GREAT THINGS TAKE TIME. PLEASE ENJOY THE LOADING SCREEN.`, width/2, height/3);
  textSize(25);
  text(`This is a loading screen. The program is loading...`, width/2, height/2);
  pop();

}
else if(state === `title`){

}
else if(state === `running`){

  // if(predictions.length > 0){
  //   let hand = predictions[0];
  //   // Locate Index Finger
  //   let index = hand.annotations.indexFinger;
  //   // Locate Index Finger's Base
  //   let base = index[0];
  //   // Base's Coordinates
  //   let baseX = base[0];
  //   let baseY = base[1];
  //     // Locate Index Finger's Tip
  //   let tip = index[3];
  //   // Tip's Coordinates
  //   let tipX = tip[0];
  //   let tipY = tip[1];
  //
  //   // Draw Pin
  //   push();
  //   noFill();
  //   stroke(255);
  //   strokeWeight(4);
  //   line(baseX, baseY, tipX, tipY);
  //   pop();
  //
  //   // Draw Pin Head
  //   push();
  //   noStroke();
  //   fill(255, 0, 0);
  //   ellipse(baseX, baseY, 20);
  //   pop();
  //
  //   // Check Bubble Popping
  //   let d = dist(tipX, tipY, bubble.x, bubble.y);
  //   if (d < bubble.size/2){
  //     bubble.x = random(width);
  //     bubblue.y = height;
  //   }

  // for (let i = 0; i < bubbles.length; i++) {
  //   let bubble = bubbles[i];
  //   let d = dist(tipX, tipY, bubble.x, bubble.y);
  //   bubble.play();
  // }
  //
  // }

  // Bubbles
  for (let i = 0; i < bubbles.length; i++) {
    let bubble = bubbles[i];
    bubble.update();
  }

  // Track Popped Bubbles
  checkPoppedBubbles();

}
else if(state === `applause`){

}


}

function checkPoppedBubbles(){
  if(poppedBubbles.length > 20){
    state = `applause`;
}
}

function mousePressed(){
    for (let i = 0; i < bubbles.length; i++) {
      let bubble = bubbles[i];
      if(mouseX > bubble.x - bubble.size/2 &&
         mouseX < bubble.x + bubble.size/2 &&
         mouseY > bubble.y - bubble.size/2 &&
         mouseY < bubble.y + bubble.size/2){
           bubble.play();
           bubble.reset();
           poppedBubbles.push(bubble);
      }
    }
}
