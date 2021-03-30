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
    this.red = 255;           // Some Rooms vary in colors
    this.green = 255;         // Some Rooms vary in colors
    this.blue = 255;          // Some Rooms vary in colors
    this.opacity = 2;
    this.state = `mainRoom`;
    this.secondState = ``;
    this.enteringX = 180;      // To spawn avatar exactly in fron of linking door of next roon rather than randomly
    this.enteringY = 350;      // To spawn avatar exactly in fron of linking door of next roon rather than randomly
    this.secondEnteringX = 0;  // Same principles, but applied to Second Door
    this.secondEnteringY = 0;  // Same principles, but applied to Second Door

  }

  update(avatar, dialogueBox){
    // Default Behavior
    this.constrain(avatar);
    this.displayWalls();
    this.displayDoor();
    this.switchState(avatar, dialogueBox);
  }
  addSecondDoor(avatar, dialogueBox){
    // Add Second Door Mechanics
    this.displaySecondDoor();
    this.switchSecondState(avatar, dialogueBox);
  }


  constrain(avatar){
    // Constrain Avatar to Room
    avatar.x = constrain(avatar.x, this.roomLeftBorder, this.roomRightBorder);
    avatar.y = constrain(avatar.y, this.roomUpBorder, this.roomDownBorder);
  }

  switchState(avatar, dialogueBox){
    let d1 = dist(this.doorX, this.doorY, avatar.x, avatar.y);
    if (d1 < (this.doorWidth/6 + avatar.size/7)){
      state = this.state;
      avatar.x = this.enteringX;
      avatar.y = this.enteringY;
      // this.resetDialogueBox(dialogueBox);
    }
  }

  switchSecondState(avatar, dialogueBox){
    let d2 = dist(this.secondDoorX, this.secondDoorY, avatar.x, avatar.y);
    if (d2 < (this.doorWidth/6 + avatar.size/7)){
      state = this.secondState;
      avatar.x = this.secondEnteringX;
      avatar.y = this.secondEnteringY;
      // this.resetDialogueBox(dialogueBox);

    }
  }

  displayWalls(){
    // Room Walls
    push();
    noFill();
    stroke(this.red, this.green, this.blue, this.opacity);
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

  resetDialogueBox(dialogueBox){
    dialogueBox.reset();
  }

}
