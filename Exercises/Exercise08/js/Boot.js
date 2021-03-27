class Boot extends Phaser.Scene{
  constructor(){
    super({
      key: `boot`
    });
  }

  preload(){

    // Load Assets
    // SFX
    // Crowd Glicthed Noise
    this.load.audio('crowd-noise', 'assets/sounds/crowd-noise.mp3');
    // Ocean Waves SFX
    this.load.audio('ocean-waves', 'assets/sounds/ocean.mp3');


    // Images
    // Background Image
    this.load.spritesheet(`background-image`, `assets/images/noise.png`, {
      frameWidth: 800,
      frameHeight: 600,
      endFrame: 2
    });

    // Avatar
    // Default State - Stressed (Hah, isn't that relatable XD)
    this.load.image(`avatar`, `assets/images/stressed-avatar.png`);
    // Serene State
    this.load.image(`serene-avatar`, `assets/images/serene-avatar.png`);
    // Deserted Island - Quietness
    this.load.image(`quietness`, `assets/images/deserted-island.png`);
    // Crowd - Noise
    this.load.spritesheet(`people`, `assets/images/crowd.png`, {
      frameWidth: 32,
      frameHeight: 32,
      endFrame: 3
    });


    // Switch Scene
    this.load.on(`complete`, () => {
      this.scene.start(`title`);
    });
  }

  create(){

  }

  update(){

  }
}
