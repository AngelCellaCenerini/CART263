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
    this.setBackgroundImage();

    // Create Avatar
    this.setAvatar();

    // Create Island Emoji
    this.setIslandEmoji();

    // Create Animated Crowd Group
    this.setCrowd();

    // Create Collisions and Overlap between Sprites
    this.setSpritesInteractions();

    // Access User's Keys
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update(){
    // Control Avatar Via Keys
    this.move();
  }

  // Functions called in Create()
  setUpSFX(){
    // Create SFX
    // Crowd Noise
    this.crowdDistortion = this.sound.add('crowd-noise');
    // Beach Waves
    this.wavesSFX = this.sound.add('ocean-waves');
  }

  setBackgroundImage(){
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
  }

  setAvatar(){
    // Create Avatar
    this.avatar = this.physics.add.image(400, 300, `avatar`);
    // Constrain Avatar to Canvas
    this.avatar.setCollideWorldBounds(true);
  }

  setIslandEmoji(){
    // Create Island Emoji
    let x = Math.random()*this.sys.canvas.width;
    let y = Math.random()*this.sys.canvas.height;
    this.peacefulness = this.physics.add.image(x, y, `quietness`);
  }

  setCrowd(){
    // Create People Emojis (Group)
    this.crowd = this.physics.add.group({
      key: `people`,
      quantity: 100,
      bounceX: 0.5,
      bounceY: 0.5,
      collideWorldBounds: true,
      dragX: 50,
      dragY: 50
    });
    // Animate People Emojis
    this.anims.create({
      key: `rainbow`,
      frames: this.anims.generateFrameNumbers(`people`,{
        start: 0,
        end: 3
      }),
      frameRate: 10,
      repeat: -1
    });
    this.crowd.playAnimation(`rainbow`);
    // Position Thumbs Up Emojis within Canvas
    Phaser.Actions.RandomRectangle(this.crowd.getChildren(), this.physics.world.bounds);
  }

  setSpritesInteractions(){
    // Overlap Avatar and Island/Peacefulness Sprite
    this.physics.add.overlap(this.avatar, this.peacefulness, this.findPeace, null, this);
    // Collide Avatar and Crowd Group
    this.physics.add.collider(this.avatar, this.crowd, this.playCrowdSFX, null, this);
    // Collide Sprites within Crowd Group
    this.physics.add.collider(this.crowd, this.crowd);
    // Collide Island Sprite Crowd Group
    this.physics.add.collider(this.peacefulness, this.crowd);
  }

  playCrowdSFX(){
    // Play when Avatar collides with Crowd Group Sprite
    this.crowdDistortion.play();
  }

  findPeace(avatar){
    // Avatar has overlapped with Island Sprite
    // Remove Background Sprite
    this.noise.destroy();
    // Remove Crowd Group
    this.crowd.clear(true);
    // Remove Crowd Noise SFX
    this.crowdDistortion.destroy();
    // Switch Avatar Sprite
    this.avatar.setTexture(`serene-avatar`);
    // PLay WavesSFX
    this.wavesSFX.play();
  }
  //

  // Function called in Update()
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
