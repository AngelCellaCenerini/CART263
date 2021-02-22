class Credits{
  constructor(x, y){
    this.x = x;
    this.y = y;
    this.string = `"You have to treat it almost like a little animal - it's good at certain things and not good at certain other things."


    "We can do a Pinch Simulator now - pinch, pinch!"`;
    this.vx = 0;
    this.vy = 0;
    this.speed = -1;
  }

  update(){
    this.move();
    this.display();
  }

  move(){
   this.y += this.vy;
   this.vy = this.speed;
  }

  display(){
    push();
    fill(255);
    text(this.string, this.x, this.y);
    pop();
  }
}
