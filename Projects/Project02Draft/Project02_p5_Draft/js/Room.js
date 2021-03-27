class Room{
  constructor(){
    this.roomX = 400;          // Distinguishing Room vs "Doors" properties
    this.roomY = 350;          // Distinguishing Room vs "Doors" properties
    this.doorX = 490;          // Distinguishing Room vs "Doors" properties
    this.doorY = 480;          // Distinguishing Room vs "Doors" properties
    this.secondDoorX = 0;      // Distinguishing Room vs "Doors" properties
    this.secondDoorY = 0;      // Distinguishing Room vs "Doors" properties
    this.roomWidth = 400;
    this.roomHeight = 330;
    this.roomLeftBorder = 225;
    this.roomRightBorder = 575;
    this.roomUpBorder = 210;
    this.roomDownBorder = 495;
    this.doorWidth = 55;
    this.doorHeight = 25;
    this.radius = 2;
    this.opacity = 255;
    this.state = `mainRoom`;
    this.secondState = ``;
    this.enteringX = 180;
    this.enteringY = 310;
    this.secondEnteringX = 0;
    this.secondEnteringY = 0;

  }

  update(avatar){
    // Default Behavior
    this.constrain(avatar);
    this.displayWalls();
    this.displayDoor();
    this.switchState(avatar);
  }
  addSecondDoor(avatar){
    // Add Second Door Mechanics
    this.displaySecondDoor();
    this.switchSecondState(avatar);
  }


  constrain(avatar){
    // Constrain Avatar to Room
    avatar.x = constrain(avatar.x, this.roomLeftBorder, this.roomRightBorder);
    avatar.y = constrain(avatar.y, this.roomUpBorder, this.roomDownBorder);
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

  displaySecondDoor(){
    // Door
    // (Not really, more like a shape through which the User navigates the rooms)
    push();
    noStroke();
    fill(255, this.opacity);
    rect(this.secondDoorX, this.secondDoorY, this.doorHeight, this.doorWidth, this.radius);
    pop();
  }

  switchState(avatar){
    let d1 = dist(this.doorX, this.doorY, avatar.x, avatar.y);
    if (d1 < (this.doorWidth/6 + avatar.size/7)){
      state = this.state;
      avatar.x = this.enteringX;
      avatar.y = this.enteringY;
    }
  }

  switchSecondState(avatar){
    let d2 = dist(this.secondDoorX, this.secondDoorY, avatar.x, avatar.y);
    if (d2 < (this.doorWidth/6 + avatar.size/7)){
      state = this.secondState;
      avatar.x = this.secondEnteringX;
      avatar.y = this.secondEnteringY;

    }
  }
}
