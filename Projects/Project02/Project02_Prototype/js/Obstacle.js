class Obstacle{
  constructor(x, y){
    // this.x = x;
    this.x = x;
    this.y = y;
    this.size = 28;
    this.frameSize = 33;
    this.radius = 4;
    this.opacity = 210;
    this.vx = 0;
    this.vy = 0;
    this.speed = 1;
    this.active = true;
  }

  update(avatar, chasingLevel){
    // Default Behaviour
    this.randomMovement();
    this.hit(avatar, chasingLevel);
    this.respawn();
    this.display();
  }

  float(){
    // Same Object but mostly visual function; helps confusing User and increasing Level difficulty
    // This "Obstacle" won't reset if User restarts level
    // (trying to suggest the idea that there's a constant typing on "the other side of the screen")
    // Default Behaviour
    this.rise();
    this.reoccur();
    this.display();
  }

  randomMovement(){
    // Create Unstable movements
    // Calculate Probability
     if (random(0, 1) < 0.2){
       // 20% Chance to move around, derailing from the stright path u_u
       this.derail();
     }
     else{
       // 80% Chance to move straight downwards
       this.move();
     }
  }

  move(){

    // Default Movement
    this.x += this.vx;
    this.y += this.vy;

    this.vy = this.speed;

    // Constrain to Walls
    this.x = constrain( this.x, 0, width);
  }

  rise(){

    // Default Movement
    this.x += this.vx;
    this.y += this.vy;

    // Invert Direction, change pace
    this.speed = -0.5;
    this.vy = this.speed;

    // Add radomness to Movement
    this.derail();

    // Constrain to Screen
    this.x = constrain( this.x, 0, width);
  }

  reoccur(){
    // Reset Floating Obstacle once off screen
    if (this.y < 0){
      this.y = random(900, 800);
    }
  }

  derail(){
    // Occasionally change trajectory
    this.y = this.y + this.vy;
    this.x = this.x + this.vx;
    let change = random(0, 1);
    if (change < 0.5){
      this.vx = random(-this.speed, this.speed);
      this.vy = random(-this.speed, this.speed);
    }
  }

  derail2(){
    // Occasionally change trajectory
    this.y = this.y + this.vy;
    this.x = this.x + this.vx;
    let change = random(0, 1);
    if (change < 0.5){
      this.vx = random(this.speed, -this.speed);
      this.vy = random(this.speed, -this.speed);
    }
  }

  hit(avatar, chasingLevel){
    // Check collision with Avatar
    let d = dist(this.x, this.y, avatar.x, avatar.y);
    if(d < this.size/2 + avatar.size/2){
      // Fail Level
      chasingLevel.active = false;

    }
  }

  respawn(){
    // Reset when off screen
    if (this.y > 10*height/9){
      this.y = random(-80, -5);
    }
  }

  display(){
    // Display obstacle
    push();
    // Faded Square (aiming for computer key effect)
    fill(255, this.opacity);
    rect(this.x, this.y, this.size, this.size, this.radius);
    noFill();
    // Blinking Frame
    stroke(255, random(0, 200));
    strokeWeight(2);
    rect(this.x, this.y, this.frameSize, this.frameSize, this.radius);
    pop();
  }
}
