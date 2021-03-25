class Boot extends Phaser.Scene{
  constructor(){
    super({
      key: `boot`
    });
  }

  preload(){

    // Load Assets

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
