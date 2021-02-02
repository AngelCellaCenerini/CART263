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

  update(){
    if(this.active){
      this.rotate();
      this.display();
      this.timer++;

      if (this.timer > 2*60){
        this.active = false;
        this.timer = 0;
       }
    }
  }

  rotate(){
      this.angle = this.angle + this.rotationSpeed;
  }

  display(){
    push();
    translate(this.x, this.y);
    rotate(this.angle);
    image(this.image, 0, 0);
    pop();
  }

//   overlap(x, y){
//     if(x > this.x - this.image.width/2 &&
//        x < this.x + this.image.width/2 &&
//        y > this.y - this.image.height/2 &&
//        y < this.y + this.image.height/2){
//         return true;
//     }
//     else{
//        return false;
//   }
// }

}
