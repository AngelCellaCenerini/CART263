class Play extends Phaser.Scene {
  constructor(){
    super({
      key: `play`
    });
  }

  create(){
    // Create Avatar
    this.avatar = this.physics.add.image(400, 300, `avatar`);
    // Constrain Avatar to Canvas
    this.avatar.setCollideWorldBounds(true);

    // Create Thumbs Down Emoji
    let x = Math.random()*this.sys.canvas.width;
    let y = Math.random()*this.sys.canvas.height;
    this.sadness = this.physics.add.image(x, y, `thumbs-down`);

    // Overlap Avatar and Sadness Sprite
    this.physics.add.overlap(this.avatar, this.sadness, this.getSad, null, this);


    // Create Thumbs Up Emojis (Group)
    this.happiness = this.physics.add.group({
      key: `thumbs-up`,
      quantity: 100,
      bounceX: 0.5,
      bounceY: 0.5,
      collideWorldBounds: true,
      dragX: 50,
      dragY: 50
    });
    // Position Thumbs Up Emojis within Canvas
    Phaser.Actions.RandomRectangle(this.happiness.getChildren(), this.physics.world.bounds);

    // Collide Avatar and Happiness Group
    this.physics.add.collider(this.avatar, this.happiness);
    // Collide Sprites within Happiness Group
    this.physics.add.collider(this.happiness, this.happiness);
    // Collide Sadness Sprite Happiness Group
    this.physics.add.collider(this.sadness, this.happiness);



    // Access User's Keys
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  getSad(avatar, sadness){
    let x = Math.random()*this.sys.canvas.width;
    let y = Math.random()*this.sys.canvas.height;
    this.sadness.setPosition(x, y);
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
