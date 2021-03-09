/**
Haiku Generator++
Angel Cella Cenerini

This is a template. You must fill in the title,
author, and this description to match your project!
*/

"use strict";

let fiveSyllableLines = [
  `Oh, to have money`,
  `The rainbow doesn't know`,
  `A blue raspberry`,
  `The loud, barking horse`,
  `A lonely, green frown`,
  `Hiccuping raindrops`,
  `The joyous weekend`,
  `The rolling desire`
];

let sevenSyllableLines = [
  `The apple questioned the tree`,
  `Oh, to crave the summer breeze`,
  `Oh, to be old and bitter`,
  `The smile has long fallen down`,
  `Seeking without eyesight`,
  `The flower seeking judgment`,
  `Fear not the approaching duck`
];

let line1 = random(fiveSyllableLines);
let line2 = random(sevenSyllableLines);
let line3 = random(fiveSyllableLines);

let line1P = document.getElementById(`line-1`);
let line2P = document.getElementById(`line-2`);
let line3P = document.getElementById(`line-3`);

line1P.innerText = line1;
line2P.innerText = line2;
line3P.innerText = line3;

line1P.addEventListener(`click`, lineClicked);
line2P.addEventListener(`click`, lineClicked);
line3P.addEventListener(`click`, lineClicked);


function lineClicked(event){
  fadeOut(event.target, 1);

}

function fadeOut(element, opacity){
  opacity -= 0.01;
  element.style[`opacity`] = opacity;
  if (opacity > 0){
    requestAnimationFrame( function(){
      fadeOut(element, opacity);
    });
  }
  else{
      setNewLine(element);
      fadeIn(element, 0);
  }
}

function fadeIn(element, opacity){
  opacity += 0.01;
  element.style[`opacity`] = opacity;
  if (opacity < 1){
    requestAnimationFrame( function(){
      fadeIn(element, opacity);
    });
  }
}

function setNewLine(element){
  if (element === line1P || element === line2P){
    element.innerText = random(fiveSyllableLines);
  }
  else if (element === line3P){
    element.innerText = random(sevenSyllableLines);
  }
}

function random(array){
  let index = Math.floor(Math.random() * array.length);
  return array[index];
}
