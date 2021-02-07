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

const KEY_NAME = `spy-profile-data`;
const UK_POLITICAL_PARTIES_LIST = `https://raw.githubusercontent.com/dariusk/corpora/master/data/governments/uk_political_parties.json`;
const CHARITIES_LIST = `https://raw.githubusercontent.com/dariusk/corpora/master/data/corporations/charities.json`;
const PERSONALITY_TEST_LIST = `https://raw.githubusercontent.com/dariusk/corpora/master/data/psychology/personality_test.json`;

/**
Description of preload
*/
function preload() {
  ukPoliticaPartiesData = loadJSON(UK_POLITICAL_PARTIES_LIST);
  charitiesData = loadJSON(CHARITIES_LIST);
  personalityTestData = loadJSON(PERSONALITY_TEST_LIST);
}


/**
Description of setup
*/
function setup() {
createCanvas(windowWidth, windowHeight);

let data = JSON.parse(localStorage.getItem(KEY_NAME));  // attempt to load data

if (data !== null){

  let password = prompt(`State your password.`);
  if (password === data.password){
    setSpyData();
  }
  // else{
  //
  // }

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

  localStorage.setItem(KEY_NAME, JSON.stringify(spyProfile));
}

function setSpyData(){

  let data = JSON.parse(localStorage.getItem(KEY_NAME));
  
  spyProfile.name = data.name;
  spyProfile.alias = data.alias;
  spyProfile.secretWeapon = data.secretWeapon;
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

Password: ${spyProfile.password}`;

push();
fill(255);
textSize(22);
textFont(`Courier`);
textAlign(LEFT, TOP);
text(profile, 100, 100);
pop();
}
