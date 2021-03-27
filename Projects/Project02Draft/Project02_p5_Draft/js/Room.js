class Room{
  constructor(){
    this.roomX = 400;          // Distinguishing Room vs "Door" properties
    this.roomY = 350;          // Distinguishing Room vs "Door" properties
    this.doorX = 490;          // Distinguishing Room vs "Door" properties
    this.doorY = 480;          // Distinguishing Room vs "Door" properties
    this.roomWidth = 400;      // Distinguishing Room vs "Door" properties
    this.roomHeight = 330;     // Distinguishing Room vs "Door" properties
    this.doorWidth = 55;       // Distinguishing Room vs "Door" properties
    this.doorHeight = 25;      // Distinguishing Room vs "Door" properties
    this.radius = 2;
    this.opacity = 255;
    this.state = `mainRoom`;
  }

  update(avatar){
    this.displayWalls();
    this.displayDoor();
    this.switchState(avatar);
  }

  displayWalls(){
    // Room Walls
    push();
    noFill();
    stroke(255, this.opacity);
    strokeWeight(8);
    rect(this.roomX, this.roomY, this.roomWidth, this.roomHeight);
    pop();
  }

  displayDoor(){
    // Door
    // (Not really, more like a shape through which the User navigates the rooms)
    push();
    noStroke();
    fill(255, this.opacity);
    rect(this.doorX, this.doorY, this.doorWidth, this.doorHeight, this.radius);
    pop();
  }

  switchState(avatar){
    let d = dist(this.doorX, this.doorY, avatar.x, avatar.y);
    if (d < (this.doorWidth/6 + avatar.size/7)){
      state = this.state;
    }
  }
}
