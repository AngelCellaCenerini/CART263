"use strict";

/**
Exercise04 - Bubble Popper
Angel Cella Cenerini

A laggy popping simulation with melodies. Because if you can't be excellent in real life, you can here :)
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

// Applause Background
let applause = undefined;
// Cheering Crowd SFX
let cheeringSFX = undefined;

// State
let state = `loading`;  // Loading, Running
/**
Description of preload
*/
function preload() {

  // Load SFX
  twinkleSFX1 = loadSound(`assets/sounds/xilo1.mp3`);
  twinkleSFX2 = loadSound(`assets/sounds/xilo2.mp3`);
  twinkleSFX3 = loadSound(`assets/sounds/xilo3.mp3`);
  twinkleSFX4 = loadSound(`assets/sounds/xilo4.mp3`);

  cheeringSFX = loadSound(`assets/sounds/cheers.wav`);

  // Load GIF Background
  applause = loadImage(`assets/images/applause.gif`);

}


/**
General Settings + Create Objects
*/
function setup() {
createCanvas(windowWidth, windowHeight);
noCursor();
imageMode(CENTER);
textFont(`Courier`);
textAlign(CENTER, CENTER);

// Access User's Webcam
video = createCapture(VIDEO);
video.hide();  // hide HTML element

// Load Handpose Model
handpose = ml5.handpose(video, {
   flipHorizontal: true
 }, function(){
   console.log(`Handpose Model Loaded`);
   state = `title`;
 });

 // Set up Handpose Model
 handpose.on(`predict`, function(results){
   console.log(results);
   predictions = results;
 });

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
States
*/
function draw() {

background(0);

if (state === `loading`){

  loadingText();

}
else if(state === `title`){

  titleText();

}
else if(state === `running`){

  // Track User's Index + Draw Pin
  trackIndexFinger();

  // Draw and Update Bubbles' movements
  updateBubbles();

  // Track Popped Bubbles
  checkPoppedBubbles();

}

else if(state === `success`){

  endingLayout();  // text + image (gif)
}

}

function loadingText(){
  push();
  fill(255);
  textSize(40);
  text(`GREAT THINGS TAKE TIME. PLEASE ENJOY THE LOADING SCREEN.`, width/2, height/3);
  textSize(25);
  text(`This is a loading screen. The program is loading...`, width/2, height/2);
  pop();
}

function titleText(){
  push();
  fill(255);
  textSize(45);
  text(`TWINKLIG BUBBLES`, width/2, height/3);
  textSize(25);
  textAlign(TOP, LEFT);
  text(`Can you pop 20 bubbles using only a computational projection of your index finger?

  It's...pretty easy actually, it'd be worrisome if you can't :/`, width/2, height/2);
  textSize(22);
  text(`Press ENTER to begin.`, width/2, 3*height/4);
  pop();
}

function trackIndexFinger(){
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

  // Check Bubble Popping
  for (let i = 0; i < bubbles.length; i++) {
    let bubble = bubbles[i];
    let d = dist(tipX, tipY, bubble.x, bubble.y);
    if(d < bubble.size/2 ){
         bubble.play();
         bubble.reset();
         poppedBubbles.push(bubble);
    }
  }
}
}

function updateBubbles(){
  // Bubbles
  for (let i = 0; i < bubbles.length; i++) {
    let bubble = bubbles[i];
    bubble.update();
  }
}

function checkPoppedBubbles(){
  // Check if User popped 20 bubbles
  if(poppedBubbles.length > 19){
    state = `success`;
    cheeringSFX.play();
}
}

function endingLayout(){
  image(applause, width/2, height/2, width, height); // .gif background
  push();
  fill(0);
  textSize(35);
  textStyle(BOLD);
  text(`Indeed, you have proven yourself to be quite the prodigy child.`, width/2, height/4);
  pop();
}

function keyPressed(){
  if(keyCode === 13 && state === `title`){
    state = `running`;
  }
}
