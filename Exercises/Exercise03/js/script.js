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

let ukPoliticaPartiesData = undefined;
let charitiesData = undefined;
let personalityTestData = undefined;

/**
Description of preload
*/
function preload() {
  ukPoliticaPartiesData = loadJSON(`https://raw.githubusercontent.com/dariusk/corpora/master/data/governments/uk_political_parties.json`);
  charitiesData = loadJSON(`https://raw.githubusercontent.com/dariusk/corpora/master/data/corporations/charities.json`);
  personalityTestData = loadJSON(`https://raw.githubusercontent.com/dariusk/corpora/master/data/psychology/personality_test.json`);
}


/**
Description of setup
*/
function setup() {
createCanvas(windowWidth, windowHeight);

let data = JSON.parse(localStorage.getItem(`spy-profile-data`));  // attempt to load data

if (data !== null){
  spyProfile.name = data.name;
  spyProfile.alias = data.alias;
  spyProfile.secretWeapon = data.secretWeapon;
  spyProfile.password = data.password;

}
else {
  generateSpyProfile();
}
}

function generateSpyProfile(){
  spyProfile.name = prompt(`Identify yourself.`);
  let ukPoliticaParties = random(ukPoliticaPartiesData.parties);
  spyProfile.alias = `The ${ukPoliticaParties}`;
  spyProfile.secretWeapon = random(charitiesData.charities);
  spyProfile.password = random(personalityTestData.personality_test);

  localStorage.setItem(`spy-profile-data`, JSON.stringify(spyProfile));
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
