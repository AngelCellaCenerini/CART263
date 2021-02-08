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
  weakness : `**REDACTED**`,
  nickname_given_by_Mother : `**REDACTED**`,
  stash_location : `**REDACTED**`,
  password: `**REDACTED**`
};

let ukPoliticaPartiesData = undefined;
let charitiesData = undefined;
let symptomsData = undefined;
let plantsData = undefined;
let norwegianCitiesData = undefined;
let personalityTestData = undefined;

const KEY_NAME = `spy-profile-data`;
const UK_POLITICAL_PARTIES_LIST = `https://raw.githubusercontent.com/dariusk/corpora/master/data/governments/uk_political_parties.json`;
const CHARITIES_LIST = `https://raw.githubusercontent.com/dariusk/corpora/master/data/corporations/charities.json`;
const SYMPTOMS_LIST = `https://raw.githubusercontent.com/dariusk/corpora/master/data/medicine/symptoms.json`;
const PLANTS_LIST = `https://raw.githubusercontent.com/dariusk/corpora/master/data/plants/cannabis.json`;
const NORWEGIAN_CITIES_LIST = `https://raw.githubusercontent.com/dariusk/corpora/master/data/geography/norwegian_cities.json`;
const PERSONALITY_TEST_LIST = `https://raw.githubusercontent.com/dariusk/corpora/master/data/psychology/personality_test.json`;

let sirenImage = undefined;

let alarmSFX = undefined;

// Glass
let glass = {
 x: 0,
 y: 0,
 width: 360,
 active: true
};

// Red Hue
let redHue = {
  x: 0,
  y: 0,
  active: false
};

/**
Description of preload
*/
function preload() {
  ukPoliticaPartiesData = loadJSON(UK_POLITICAL_PARTIES_LIST);
  charitiesData = loadJSON(CHARITIES_LIST);
  symptomsData = loadJSON(SYMPTOMS_LIST);
  plantsData = loadJSON(PLANTS_LIST);
  norwegianCitiesData = loadJSON(NORWEGIAN_CITIES_LIST);
  personalityTestData = loadJSON(PERSONALITY_TEST_LIST);

  sirenImage = loadImage(`assets/images/siren.gif`);

  alarmSFX = loadSound(`assets/sounds/alarm.mp3`);
}


/**
Description of setup
*/
function setup() {
createCanvas(windowWidth, windowHeight);
noStroke();
rectMode(CENTER);
imageMode(CENTER);

let data = JSON.parse(localStorage.getItem(KEY_NAME));  // attempt to load data

if (data !== null){

  let password = prompt(`State your password.`);
  if (password === data.password){
    setSpyData();
  }
  else{
  redHue.active = true;  // Red Hue-Light
  alarmSFX.play();  // play Alarm
  responsiveVoice.speak(`Intruder! Intruder! Intruder! Intruder! Intruder!`);  // let British Lady scream "INTRUDER" at you
  }

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
  spyProfile.weakness = random(symptomsData.symptoms);
  spyProfile.nickname_given_by_Mother = random(plantsData.cannabis);
  let norwegianCity = random(norwegianCitiesData.cities);
  spyProfile.stash_location = random(norwegianCity.city);
  spyProfile.password = random(personalityTestData.personality_test);

  localStorage.setItem(KEY_NAME, JSON.stringify(spyProfile));
}

function setSpyData(){

  let data = JSON.parse(localStorage.getItem(KEY_NAME));

  spyProfile.name = data.name;
  spyProfile.alias = data.alias;
  spyProfile.secretWeapon = data.secretWeapon;
  spyProfile.weakness = data.weakness;
  spyProfile.nickname_given_by_Mother = data.nickname_given_by_Mother;
  spyProfile.stash_location = data.stash_location;
  spyProfile.password = data.password;
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

Weakness: ${spyProfile.weakness}

Nickname given by Mother: ${spyProfile.nickname_given_by_Mother}

Stash Location: ${spyProfile.stash_location}

Password: ${spyProfile.password}`;

push();
fill(255);
textSize(22);
textFont(`Courier`);
textAlign(LEFT, TOP);
text(profile, 100, 100);
pop();

// Red Button
push();
fill(170);
rect(3*width/4, height/2 + 35, 250);
fill(220);
rect(3*width/4, height/2 + 6, 250);
fill(185, 0, 0);
ellipse(3*width/4, height/2 + 10, 150);
fill(255, 0, 0);
ellipse(3*width/4, height/2, 150);
noFill();
stroke(255);
strokeWeight(3);
rect(3*width/4, height/2 + 20, 360);
pop();

// Button Warning
push();
fill(255);
textSize(24);
textFont(`Courier`);
textAlign(CENTER, CENTER);
text(`BREAK IN CASE OF EMERGENCY`, 3*width/4, height/2 - 200);
text(`PRESS "B" TO BREAK`, 3*width/4, height/2 + 240);
pop();

// Glass
displayGlass();

// Red Hue
displayRedHue();

}

function displayRedHue(){

  redHue.x = width/2;
  redHue.y =  height/2;
  // Red Hue
  if(redHue.active){
    push();
    fill(255, 0 , 0, 60);
    rect(redHue.x, redHue.y, windowWidth, windowHeight);
    pop();
  }
}

function displayGlass(){

  glass.x = 3*width/4;
  glass.y =  height/2 + 20;

  if(glass.active){
    // Glass
    push();
    fill(255, 200);
    rect(glass.x, glass.y, glass.width);
    pop();
  }
}

function keyPressed(){
  if(keyCode === 66){
    localStorage.removeItem(KEY_NAME);
    alarmSFX.play();
    glass.active = false;
    redHue.active = true;
  }
}
