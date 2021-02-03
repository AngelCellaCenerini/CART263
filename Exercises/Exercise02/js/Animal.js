class Animal{
  constructor(x, y, image){
  this.x = x;
  this.y = y;
  this.image = image;
  this.angle = 0;
  this.rotationSpeed = 0.05;
  this.vx = 0;
  this.vy = 0;
  this.speed = 3;
  this.acive = false;
  this.timer = 0;
  }

  update(){                       // Called with Correct Guess
    if(this.active){
      this.rotate();
      this.display();
      this.timer++;

      if (this.timer > 3*60){
        this.active = false;
        this.timer = 0;
       }
    }
  }

  upgrade(){                       // Called with Wrong Guess
    if(this.active){
      this.angle = 180;
      this.float();
      this.display();
      this.timer++;

      if (this.timer > 3*60){
        this.active = false;
        this.timer = 0;
       }
    }
  }

  rotate(){
      this.angle = this.angle + this.rotationSpeed;
  }

  float(){

    this.y = this.y + this.vy;

    let change = random(0, 1);
    if (change < 0.5){
      this.vy = random(-this.speed, this.speed);
    }
  }

  display(){
    push();
    translate(this.x, this.y);
    rotate(this.angle);
    image(this.image, 0, 0);
    pop();
  }

}
