class Obstacle{
  constructor(x, y, image){
    this.x = x;
    this.y = y;
    this.image = image;
    this.width = 130;
    this.vx = 0;
    this.vy = 0;
    this.speed = 2;
    this.acceleration = 1;
    this.borderX = 1000;  // "canvas" (background illustration )
    this.borderY = 530;   // "canvas" (background illustration )

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
    if (this.x < (width/2 - this.borderX/2)){
      this.x = random( width/2 + this.borderX/2, width/2 + 2*this.borderX/3 );
      this.y = random( height/2 - this.borderY/3, height/2 + this.borderY/3);
      // Accelerate (add difficulty)
      this.speed += this.acceleration;
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
    chaseSoundtrack.stop();
  }

  display(){
    image(this.image, this.x, this.y, this.width);
  }
}
