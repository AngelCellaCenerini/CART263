"use strict";

/**
Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!
*/

let spyProfile = {
  name: `**REDACTED**`,
  alias: `**REDACTED**`,
  secretWeapon: `**REDACTED**`,
  password: `**REDACTED**`
};

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
spyProfile.name = prompt(`Identify yourself.`);
}


/**
Description of draw()
*/
function draw() {
background(0);

let profile = `**AGENT IDENTIFICATION**

Name: ${spyProfile.name}

Alias: ${spyProfile.alias}

Secret Weapon: ${spyProfile.secretWeapon}

Password: ${spyProfile.password}`;

push();
fill(255);
textSize(22);
textFont(`Courier`);
textAlign(LEFT, TOP);
text(profile, 100, 100);
pop();
}
