class Timer{
  constructor(x, y, sound){
  this.x = x;
  this.y = y;
  this.width = 100;
  this.height = 40;
  this.radius = 10;
  this.vx = 0;
  this.vy = 0;
  this.timer = 20;
  this.sound = sound;
  }

  display(sausageDog){
    push();
    noStroke();
    fill(255);
    rectMode(CENTER, CENTER);
    rect(this.x, this.y, this.width, this.height, this.radius);
    fill(0);
    textSize(16);
    text(this.timer, this.x, this.y);
    pop();
    if(!sausageDog.found){
      if (frameCount % 60 == 0 && this.timer > 0) {
        this.timer --;
      }
      if (this.timer == 0) {
        state = `badEnding`;
        this.sound.play();
      }
    }
  }
}
