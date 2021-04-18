class ChasingLevel{
  // User reaches Vhasing Level each time they achieve a "sense"; losing means having to retry the level
  // Level increases difficulty each time
  // Last Chasing Level brings User to victory
  constructor(avatarImage){
    this.roomX = 400;          // Distinguishing Room vs "Doors" properties
    this.roomY = 300;          // Distinguishing Room vs "Doors" properties
    this.doorX = 400;          // Distinguishing Room vs "Doors" properties
    this.doorY = -40;          // Distinguishing Room vs "Doors" properties
    this.roomWidth = 250;
    this.roomHeight = 700;
    this.roomLeftBorder = 300;
    this.roomRightBorder = 500;
    this.roomUpBorder = 120;
    this.roomDownBorder = 650;
    this.doorWidth = 55;
    this.doorHeight = 25;
    this.opacity = 255;
    this.state = `mainRoom`;
    this.enteringX = 395;       // Spawn avatar in middle of Main Room
    this.enteringY = 305;       // Spawn avatar in middle of Main Room
    this.limit = 430;           // Line User has to surpass to lose level
    this.active = true;         // Turns false when User loses

  }

  update(avatar, avatarImage, dialogueBox){
    // Default Behavior
    this.constrain(avatar);
    this.switchState(avatar, dialogueBox);
    this.capture(avatar);
    this.displayWalls();
    this.displayDoor();
    this.displayFloorCracks();
    this.displayStatics();
    // Call Avatar in Room class(es)
    // avatar.update(avatarImage);
    avatar.escape(avatarImage);
    // Call Dialogue Box in Room class (rather than main script)
    dialogueBox.display(dialogueBox);
  }

  constrain(avatar){
    // Constrain Avatar to Room
    avatar.x = constrain(avatar.x, this.roomLeftBorder, this.roomRightBorder);
    avatar.y = constrain(avatar.y, this.roomUpBorder, this.roomDownBorder);
  }


  switchState(avatar, dialogueBox){
    // Switch State by overlapping displayed "Door"
    let d1 = dist(this.doorX, this.doorY, avatar.x, avatar.y);
    if (d1 < (this.doorWidth/6 + avatar.size/7)){
      state = this.state;
      this.activateDialogueBox(dialogueBox);
      avatar.x = this.enteringX;
      avatar.y = this.enteringY;
    }
  }

  capture(avatar){
    // Level "captures" Avatar
    if( avatar.y > this.limit){
      // Freeze Avatar
      avatar.vy = 0;
      avatar.chasingLevelSpeed = 0;
      // Freeze Level
      this.active = false;
    }

  }

  displayWalls(){
    // Room Walls
    push();
    // noFill();
    fill(20);
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

  displayStatics(){  // Array?
    // Statics
    push();
    let randomX = random(0, 800);
    let randomY = random(0, 600);
    stroke(255);
    strokeWeight(3);
    point(randomX, randomY, randomX, randomY);
    point(randomX, randomY, randomX, randomY);
    point(randomX, randomY, randomX, randomY);
    point(randomX, randomY, randomX, randomY);
    point(randomX, randomY, randomX, randomY);
    point(randomX, randomY, randomX, randomY);
    point(randomX, randomY, randomX, randomY);
    point(randomX, randomY, randomX, randomY);
    pop();
  }

  displayFloorCracks(){
    // Cracking Floor (kinda)
    push();
    let randomX1 = random(270, 530);
    let randomY1 = random(400, 600);
    let randomX2 = random(270, 530);
    let randomY2 = random(400, 600);
    stroke(255, 255);
    let randomStroke = random(2, 6);
    strokeWeight(randomStroke);
    line(randomX1, randomY1, randomX2, randomY2);
    line(randomX2, randomY2, randomX1, randomY1);
    line(randomX1, randomY1, randomX2, randomY2);
    line(randomX2, randomY2, randomX1, randomY1);
    pop();
  }

  activateDialogueBox(dialogueBox){
    // Reset and Activate Dialogue box each time User enters state
    dialogueBox.reset();
    setTimeout(function() {
      dialogueBox.typewriter(dialogues.simulation_dialogues[state]);
    }, 1000);
  }

}
