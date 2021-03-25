class Play extends Phaser.Scene {
  constructor(){
    super({
      key: `play`
    });
  }

  create(){
    // Create avatar
    this.avatar = this.physics.add.image(400, 300, `avatar`);
    // COnstrain Avatar to Canvas
    this.avatar.setCollideWorldBounds(true);

    // Access User's Keys
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update(){

    // Move Avatar via Keys Input
    // Left/Right Keys
    if (this.cursors.left.isDown){
      this.avatar.setAngularVelocity(-150);
      console.log(`called`);
    }
    else if ( this.cursors.right.isDown ){
      this.avatar.setAngularVelocity(150);
    }
    else {
        this.avatar.setAngularVelocity(0);
    }

    // Up Key
    if (this.cursors.up.isDown){
      this.physics.velocityFromRotation(this.avatar.rotation, 200, this.avatar.body.acceleration);
    }
    else {
      this.avatar.setAcceleration(0);
    }

  }
}
