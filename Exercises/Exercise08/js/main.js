/**
Desperately Seeking Sadness ++
Angel Cella Cenerini

Noisy crowds, noisy crowds.
Why not yearn for the Island of Peacefulness?
*/

"use strict";

// Set Up Phaser program
let config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: `arcade`
  },
  scene: [ Boot, Title, Play]  // set up Scenes
};

// Create Game
let game = new Phaser.Game(config);
