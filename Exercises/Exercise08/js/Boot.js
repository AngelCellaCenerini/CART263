class Boot extends Phaser.Scene{
  constructor(){
    super({
      key: `boot`
    });
  }

  preload(){

    // Load Assets
    this.load.image(`avatar`, `assets/images/avatar.png`)
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
