class Play extends Phaser.Scene {
  constructor(){
    super({
      key: `play`
    });
  }

  create(){

    // Create SFX
    this.setUpSFX();


    // Create Background - Animated Noise
    this.noise = this.add.sprite(400, 300, `background-image`);
    this.anims.create({
      key: `noise`,
      frames: this.anims.generateFrameNumbers(`background-image`,{
        start: 0,
        end: 2
      }),
      frameRate: 30,
      repeat: -1
    });
    this.noise.play(`noise`);

    // Create Avatar
    this.avatar = this.physics.add.image(400, 300, `avatar`);
    // Constrain Avatar to Canvas
    this.avatar.setCollideWorldBounds(true);

    // Create Thumbs Down Emoji
    let x = Math.random()*this.sys.canvas.width;
    let y = Math.random()*this.sys.canvas.height;
    this.peacefulness = this.physics.add.image(x, y, `quietness`);

    // Overlap Avatar and Sadness Sprite
    this.physics.add.overlap(this.avatar, this.peacefulness, this.getSad, null, this);


    // Create Thumbs Up Emojis (Group)
    this.crowd = this.physics.add.group({
      key: `people`,
      quantity: 100,
      bounceX: 0.5,
      bounceY: 0.5,
      collideWorldBounds: true,
      dragX: 50,
      dragY: 50
    });
    // // Animate People Emojis
    // this.anims.create({
    //   key: `people`,
    //   frames: this.anims.generateFrameNumbers(`crowd`,{
    //     start: 0,
    //     end: 3
    //   }),
    //   frameRate: 30,
    //   repeat: -1
    // });
    // this.crowd.play(`people`);
    // Position Thumbs Up Emojis within Canvas
    Phaser.Actions.RandomRectangle(this.crowd.getChildren(), this.physics.world.bounds);


    // Collide Avatar and Happiness Group
    this.physics.add.collider(this.avatar, this.crowd, this.playCrowdSFX, null, this);
    // Collide Sprites within Happiness Group
    this.physics.add.collider(this.crowd, this.crowd);
    // Collide Sadness Sprite Happiness Group
    this.physics.add.collider(this.peacefulness, this.crowd);



    // Access User's Keys
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  playCrowdSFX(){
    this.crowdDistortion.play();
  }

  getSad(avatar){
    this.noise.destroy();
    this.crowd.remove();
    // this.avatar.image(`serene-avatar`);
    this.wavesSFX.play();
  }

  update(){
    // Control Avatar Via Keys
    this.move();
  }

  setUpSFX(){
    // Create SFX
    // Crowd Noise
    this.crowdDistortion = this.sound.add('crowd-noise');
    // Beach Waves
    this.wavesSFX = this.sound.add('ocean-waves');
  }

  move(){
    // Move Avatar via Keys Input
    // Left/Right Keys
    if (this.cursors.left.isDown){
      this.avatar.setAngularVelocity(-150);
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
