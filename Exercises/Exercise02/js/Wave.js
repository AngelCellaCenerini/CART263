class Wave{
  constructor(x, y, image, width){
  this.x = x;
  this.y = y;
  this.image = image;
  this.width = width;
  this.speed = 3;
  this.vx = this.speed;
  this.vy = 0;

  // this.margin = width/3;
  }

  update(){
    this.move();
    this.flow();
    // this.wrap();
    this.display();
  }

  move(){
    this.x = this.x + this.vx;
    this.y = this.y + this.vy;

    // this.vx = this.speed;
  }

  flow(){

    // this.vx = this.speed;

    if ( this.x > 2*width/3){
    this.vx = - this.speed;
    }
    else if( this.x < width/3){
        this.vx = this.speed;
    }
  }


  display(){
    image(this.image, this.x, this.y, this.width);
  }
}
