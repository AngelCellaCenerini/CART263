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


function random(array){
  let index = Math.floor(Math.random() * array.length);
  return array[index];
}