"use strict";

/**
Exercise 03:  Inappropriate Spy Profile Generator
Angel Cella Cenerini

Sometimes we get to choose our own name, but not our weakness.
However, we do have the power to reset the button ;)
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

// Red Button
let redButton = {
  x: 0,
  y: 0,
  width: 150
}

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

let state = `title` // Title, simulation

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

  alarmSFX = loadSound(`assets/sounds/alarm.mp3`);
}


/**
General Settings
*/
function setup() {
createCanvas(windowWidth, windowHeight);
noStroke();
rectMode(CENTER);
imageMode(CENTER);

}

function generateSpyProfile(){
  spyProfile.name = prompt(`Identify yourself.`);
  let ukPoliticaParties = random(ukPoliticaPartiesData.parties);
  spyProfile.alias = `The ${ukPoliticaParties}`;
  spyProfile.secretWeapon = random(charitiesData.charities);
  spyProfile.weakness = random(symptomsData.symptoms);
  spyProfile.nickname_given_by_Mother = random(plantsData.cannabis);
  let norwegianCity = random(norwegianCitiesData.cities);
  spyProfile.stash_location = norwegianCity.city;
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
Generate Profile + Display Button
*/
function draw() {
background(0);

if(state === `title`){
  // Title Text
  titleText();
}
else if(state === `profileGenerator`){

let profile = `**AGENT IDENTIFICATION**

Name: ${spyProfile.name}

Alias: ${spyProfile.alias}

Secret Weapon: ${spyProfile.secretWeapon}

Weakness: ${spyProfile.weakness}

Nickname given by Mother: ${spyProfile.nickname_given_by_Mother}

Stash Location: ${spyProfile.stash_location}

Password: ${spyProfile.password}`;

// Profile Text
profileText(profile);

// Red Button
displayRedButton();

// Button Warning/Instructions
buttonInstructions();

// Glass
displayGlass();

// Red Hue
displayRedHue();
}

}

// Title
function titleText(){
  // Profile Text
  push();
  fill(255);
  textSize(22);
  textFont(`Courier`);
  textAlign(CENTER, CENTER);
  text(`THIS IS SENSITIVE INFORMATION. HOWEVER, YOU CAN ACCESS IT BY PRESSING 'ENTER'.`, width/2, height/2);
  pop();
}
//

// Profile Generator
function generatingProfile(){
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

function profileText(profile){
  // Profile Text
  push();
  fill(255);
  textSize(22);
  textFont(`Courier`);
  textAlign(LEFT, TOP);
  text(profile, 100, 100);
  pop();
}

function displayRedButton(){
  // Red Button

  redButton.x = 3*width/4;
  redButton.y = height/2;

  push();
  fill(170);
  rect(redButton.x, redButton.y + 7*redButton.width/30, 5*redButton.width/3);
  fill(220);
  rect(redButton.x, redButton.y + 6, 5*redButton.width/3);
  fill(185, 0, 0);
  ellipse(3*width/4, redButton.y + redButton.width/15, redButton.width);
  fill(255, 0, 0);
  ellipse(redButton.x, redButton.y, redButton.width);
  noFill();
  stroke(255);
  strokeWeight(3);
  rect(redButton.x, redButton.y + glass.width/18, glass.width);
  pop();
}

function buttonInstructions(){
  // Button Warning/Instructions
  push();
  fill(255);
  textSize(24);
  textFont(`Courier`);
  textAlign(CENTER, CENTER);
  text(`BREAK IN CASE OF EMERGENCY`, 3*width/4, height/2 - 200);
  text(`PRESS "B" TO BREAK`, 3*width/4, height/2 + 240);
  pop();
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
  if(keyCode === 13 && state === `title`){
    state = `profileGenerator`;
    generatingProfile();
  }

  if(keyCode === 66 && state === `profileGenerator`){
    // Press B to reset Profile
    localStorage.removeItem(KEY_NAME);
    alarmSFX.play(); // Blast that siren alarm
    glass.active = false; // "Break" glass
    redHue.active = true; // "Turn on" red light
  }
}
