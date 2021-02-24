class Vegetation{
  constructor(x, y, image, change){
    this.x = x;
    this.y = y;
    this.image = image;
    this.vx = 0;
    this.vy = 0;
    this.speed = 2;
    this.borderX = 1000;  // "canvas" (background illustration )
    this.borderY = 480;   // "canvas" (background illustration )
    this.change = change;

  }

  update(){
    this.move();
    this.reset();
    this.display();
  }

  move(){
    this.x -= this.vx;
    this.vx = this.speed;
  }

  reset(){
    // Reset Vegetation if off-screen
    if (this.x < (width/2 - 2*this.borderX/3)){
      this.x = random( width/2 + this.borderX/2, width/2 + 2*this.borderX/3 );
      this.y = random( height/2 - this.borderY/2, height/2 + this.borderY/2);
      this.change = random(0, 1);
      if (this.change < 0.5){
          this.y = random(height/2 - 2*this.borderY/5, height/2 - this.borderY/2);
        }
        else{
          this.y = random(height/2 + this.borderY/5, height/2 + this.borderY/2);
        }
    }
  }

  display(){
    image(this.image, this.x, this.y);
  }
}
