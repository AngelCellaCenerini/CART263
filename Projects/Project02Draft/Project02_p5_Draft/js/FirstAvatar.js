class FirstAvatar {
  constructor(image){
    this.x = 375;
    this.y = 300;
    this.image = image;
    this.size = 32;
    this.vx = 0;
    this.vy = 0;
    this.speed = 4;

  }

  update(){
    this.move();
    this.direct();
    this.display();
  }

  move(){
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

  display(){
    image(this.image, this.x, this.y, this.size);
  }
}
