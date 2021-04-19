class Obstacle{
  // constructor(x, y, image){
  constructor(image){
    // this.x = x;
    this.x = 0;
    this.x1 = 160;
    this.x2 = 290;
    // this.y = y;
    this.y = 0;
    this.y1 = -20;
    this.y2 = -100;
    this.image = image;
    this.vx = 0;
    this.vy = 0;
    this.speed = 1;
    this.numberObstacles = 3;
    this.obstacles = [];
  }

  create(){
    for(let i = 0; i < this.numberObstacles; i ++){
       this.x = random(this.x1, this.y1);
       this.y = random(this.x2, this.y2);
       // let obstacle = new Obstacle(x, y, obstacleImage);
       this.obstacles.push(this);
    }
  }

  update(){
    // Default Behaviour
    // Obstacles
    // for (let i = 0; i < this.obstacles.length; i ++){
    //   this = this.obstacles[i];   // !!!!!!!!!!!!!!
    //   this.move();
    //   this.display();
    // }
  }

  move(){

    // Default Movement
    this.x += this.vx;
    this.y += this.vy;

    this.vy = this.speed;

    // Constrain to Walls
    this.x = constrain( this.x, 0, width);
    this.y = constrain( this.y, 0, height);
  }

  derail(){
    // Occasionally change trajectory
    this.y = this.y + this.vy;
    this.x = this.x + this.vx;
    let change = random(0, 1);
    if (change < 0.2){
      this.vx = random(-this.speed, this.speed);
      this.vy = random(-this.speed, this.speed);
    }
  }

  display(){
    image(this.image, this.x, this.y);
  }
}
