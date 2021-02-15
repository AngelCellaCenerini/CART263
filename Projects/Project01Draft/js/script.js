"use strict";

/**
Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!
*/

let state = `carRide`; // Title, Intro/Instructions, CarRide, CutScene, Chase, BadEnding(01, 02), JurassicParkMoment, PetDino, Selfie, Credits

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
textFont(`Courier`);
textAlign(CENTER, CENTER);
rectMode(CENTER);
noStroke();



}


/**
Description of draw()
*/
function draw() {

  background(0);

  if (state === `title`){

    push();
    fill(255);
    rect(width/2, height/2, 1000, 530);
    textSize(20);
    text(`JURASSIC PARK...`, width/2, height/7);
    text(`...MOMENT.`, width/2, 6*height/7);
    pop();

  }
  else if (state === `intro`){

    push();
    fill(255);
    rect(width/2, height/2, 1000, 530);
    textSize(20);
    text(`You embark on your journey in search of the Jurassic Park Moment.`, width/2, height/7);
    text(`Among the lush vegetation, you hear a sound...Type it down as to document it.`, width/2, 6*height/7);
    pop();

  }
  else if (state === `carRide`){

    push();
    fill(255);
    rect(width/2, height/2, 1000, 530);
    textSize(20);
    text(`You keep the radio on while travelling. Press the arrow key > to skip channel frequencies. Press ENTER to skip this level.`, width/2, height/7);
    textStyle(ITALIC);
    text(`<<Country roads, take me home...>>`, width/2, 6*height/7);
    pop();

  }
  else if (state === `cutScene`){

    push();
    fill(255);
    rect(width/2, height/2, 1000, 530);
    textSize(20);
    text(`Looks like all that noise attracted unwanted attention!`, width/2, height/7);
    text(`Quick! Press G to step on the gas!`, width/2, 6*height/7);
    pop();

  }
  else if (state === `chase`){

    push();
    fill(255);
    rect(width/2, height/2, 1000, 530);
    textSize(20);
    text(`You embark on your journey in search of the Jurassic Moment.`, width/2, height/7);
    text(`Among the lush vegetation, you hear a sound...`, width/2, 6*height/7);
    pop();

  }
  else if (state === `badEnding01`){

  }
  else if (state === `jurassicParkMoment`){

    push();
    fill(255);
    rect(width/2, height/2, 1000, 530);
    textSize(20);
    text(`You embark on your journey in search of the Jurassic Moment.`, width/2, height/7);
    text(`Among the lush vegetation, you hear a sound...`, width/2, 6*height/7);
    pop();

  }
  else if (state === `petDino`){

    push();
    fill(255);
    rect(width/2, height/2, 1000, 530);
    textSize(20);
    text(`You embark on your journey in search of the Jurassic Moment.`, width/2, height/7);
    text(`Among the lush vegetation, you hear a sound...`, width/2, 6*height/7);
    pop();

  }
  else if (state === `badEnding02`){

  }
  else if (state === `selfie`){

  }
  else if (state === `credits`){

  }


}
