class Play extends Phaser.Scene {
  constructor(){
    super({
      key: `play`
    });
  }

  create(){
    // Create avatar
    this.avatar = this.physics.add.image(400, 300, `avatar`);
  }

  upload(){

  }
}
