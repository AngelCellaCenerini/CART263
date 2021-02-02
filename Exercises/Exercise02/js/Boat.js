class Boat{
  constructor(x, y, image){
    this.x = x;
    this.y = y;
    this.image = image;
    this.vx = 0;
    this.vy = 0;
    this.speed = 2;
  }

  update(){
    this.move();
    this.wrap();
    this.display();
  }

  move(){
    this.x = this.x + this.vx;
    this.y = this.y + this.vy;

    let change = random(0, 1);
    if (change < 0.02){
      this.vx = random(-this.speed, this.speed);
      this.vy = random(-this.speed, this.speed);
    }
    // Constrain
    this.x = constrain( this.x, 0, width);
    this.y = constrain( this.y, height/3, height);

  }

  wrap(){
    // Orizontally
    if (this.x > width) {
      this.x -= width;
    }
    else if(this.x < 0){
      this.x += width;
    }
    // Vertically
    if (this.y > height) {
      this.y -= height;
    }
    else if(this.y < height/3){
      this.y += height;
    }
  }

  display(){
    image(this.image, this.x, this.y);
  }
}
