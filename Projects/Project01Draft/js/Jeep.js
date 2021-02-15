class Jeep{
  constructor(x, y, image){
    this.x = x;
    this.y = y;
    this.image = image;
    this.vx = 0;
    this.vy = 0;
    this.speed = 3;
    this.borderX = 400;  // To respect "canvas" (illustration background)
    this.borderY = 150;  // To respect "canvas" (illustration background)
  }

  update(){
    this.move();
    this.constrain();
    this.crash(obstacle);
    this.display();
  }

  move(){

    // User moves jeep with arrow keys
    if(keyIsDown(LEFT_ARROW)){
      this.vx = -this.speed;
    }
    else if(keyIsDown(RIGHT_ARROW)){
      this.vx = this.speed;
    }
    else{
      this.vx = 0;
    }

    if(keyIsDown(UP_ARROW)){
      this.vy = -this.speed;
    }
    else if(keyIsDown(DOWN_ARROW)){
      this.vy = this.speed;
    }
    else{
      this.vy = 0;
    }

    this.x += this.vx;
    this.y += this.vy;
  }

  constrain(){
    // Constrain Jeep to "canvas" (background illustration)
    this.x = constrain(this.x, width/2 - this.borderX, width/2 + this.borderX);
    this.y = constrain(this.y, height/2 - this.borderY, height/2 + this.borderY);
  }

  crash(obstacle){
    // Check if Jeep crashes against obstacles
    d = dist(this.x, this.y, obstacle.x, obstacle.y);
    if (d < this.){
      state = `badEnding01`;
    }
  }

  display(){
    image(this.image, this.x, this.y);
  }
}
