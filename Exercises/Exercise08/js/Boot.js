class Boot extends Phaser.Scene{
  constructor(){
    super({
      key: `boot`
    });
  }

  preload(){

    // Load Assets
    // Avatar
    this.load.image(`avatar`, `assets/images/avatar.png`)
    // Thumbs Down / Sadness
    this.load.image(`thumbs-down`, `assets/images/thumbDown.png`)
    // Thumbs Up / Toxic Positivity
    this.load.image(`thumbs-up`, `assets/images/thumbUp.png`)

    // Switch Scene
    this.load.on(`complete`, () => {
      this.scene.start(`play`);
    })
  }

  create(){

  }

  update(){

  }
}
