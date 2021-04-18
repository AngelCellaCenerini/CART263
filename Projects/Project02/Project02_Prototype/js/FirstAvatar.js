class FirstAvatar {
  // Disembodied Avatar, controlled by Arrow Keys
  constructor(image){
    this.x = 400;
    this.y = 300;
    this.image = image;
    this.size = 32;
    this.vx = 0;
    this.vy = 0;
    this.speed = 4;
    this.chasingLevelSpeed = 1;

  }

  update(){
    // Default Behaviour
    this.move();
    this.direct();
    this.display();
  }

  escape(){
    // Behaviour adpted in Chasing Level(s)
    this.move();
    this.pull();
    this.display();
  }

  move(){
    // Apply movement
    this.x += this.vx;
    this.y += this.vy;
  }

  direct(){
    // Direct Avatar via Arrow Kyes
    // Sideways
    if ( keyIsDown(LEFT_ARROW) ){
      this.vx = -this.speed;
    }
    else if( keyIsDown(RIGHT_ARROW) ){
      this.vx = this.speed;
    }
    else{
          this.vx = 0;
        }

    // Upwards/Downwards
    if( keyIsDown(UP_ARROW) ){
      this.vy = -this.speed;
    }
    else if( keyIsDown(DOWN_ARROW) ){
      this.vy = this.speed;
    }
    else{
          this.vy = 0;
    }

  }

  pull(){
    // Avatar is pulled downwards; User must press key to resist pull
    // Adopt Speed specific to Chasing Level
    this.vy = this.chasingLevelSpeed;
    // Oppose the "pull" downwards
    if ( keyIsDown(LEFT_ARROW) ){
      this.vx = -this.chasingLevelSpeed;
    }
    else if( keyIsDown(RIGHT_ARROW) ){
      this.vx = this.chasingLevelSpeed;
    }
    if ( keyIsDown(UP_ARROW) ){
      this.vy = -this.chasingLevelSpeed;
    }
  }

  display(){
    // Display Avatar
    image(this.image, this.x, this.y, this.size);
  }
}
