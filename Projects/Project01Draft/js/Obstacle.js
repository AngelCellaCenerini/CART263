class Obstacle{
  constructor(x, y, image){
    this.x = x;
    this.y = y;
    this.image = image;
    this.vx = 0;
    this.vy = 0;
    this.speed = -2;
    this.borderX = 400;  // To respect "canvas" (illustration background)
    this.borderY = 80;  // To respect "canvas" (illustration background)

  }

  update(){
    this.move();
    this.reset();
    this.display();
  }

  move(){
    this.x += this.vx;
    this.vx = this.speed;
  }

  reset(){
    // Reset Obstacle if off-screen
    if (this.x < (width/2 - this.borderX)){
      this.x = ( width/2 + this.borderX, width/2 + 2*this.borderX );
      this.y = random( height/2 - this.borderY, height/2 + this.borderY);
    }
  }

  display(){
    image(this.image, this.x, this.y);
  }
}
