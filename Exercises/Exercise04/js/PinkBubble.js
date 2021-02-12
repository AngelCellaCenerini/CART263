class PinkBubble{
  constructor( x, y, size, twinkle ){
    this.x = x;
    this.y = y;
    this.size = size;
    this.twinkle = twinkle;
    this.vx = 0;
    this.vy = - 2;
    this.red = 256;
    this.green = 209;
    this.blue = 261;
    this.brightnessIncrease = 40;
  }

  update(){
    this.move();
    this.relocate();
    this.display();
  }

  move(){

    this.x += this.vx;
    this.y += this.vy;
  }

  relocate(){
    if( this.y < 0 ){
      this.x = random(width);
      this.y = height;
    }
  }

  reset(){
      this.x = random(width);
      this.y = height;
  }

  display(){
    push();
    noStroke();
    fill(this.red, this.green, this.blue, 180);
    ellipse(this.x, this.y, this.size);
    fill(this.red + this.brightnessIncrease, this.green + this.brightnessIncrease, this.blue + this.brightnessIncrease, 160);
    ellipse(this.x + this.size/5, this.y - this.size/5, this.size/4);
    pop();
  }

  play(){
    this.twinkle.play();
  }
}
