class Obstacle{
  constructor(x, y, image){
    this.x = x;
    this.y = y;
    this.image = image;
    this.width = 130;
    this.vx = 0;
    this.vy = 0;
    this.speed = 2;
    this.borderX = 400;  // To respect "canvas" (background illustration )
    this.borderY = 80;   // To respect "canvas" (background illustration )

  }

  update(jeep){
    this.move();
    this.reset();
    this.crash(jeep);
    this.display();
  }

  move(){
    this.x -= this.vx;
    this.vx = this.speed;
  }

  reset(){
    // Reset Obstacle if off-screen
    if (this.x < (width/2 - this.borderX)){
      this.x = random( width/2 + this.borderX, width/2 + 2*this.borderX );
      this.y = random( height/2 - this.borderY, height/2 + this.borderY);
    }
  }

  crash(jeep){
    // Check if Obstacles crashe against Jeep
    let d1 = dist(this.x, this.y, jeep.x, jeep.y);
    if (d1 < this.width/4 + jeep.width/4){
      setTimeout(this.switchBadEnding01, 1000);  // wait 1 sec before switching state
    }
  }

  switchBadEnding01(){
    state = `badEnding01`;
  }

  display(){
    image(this.image, this.x, this.y, this.width);
  }
}
