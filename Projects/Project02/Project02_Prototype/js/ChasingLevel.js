class ChasingLevel{
  // User reaches Vhasing Level each time they achieve a "sense"; losing means having to retry the level
  // Level increases difficulty each time
  // Last Chasing Level brings User to victory
  constructor(avatarImage){
    this.roomX = 400;             // Distinguishing Room vs "Doors" properties
    this.roomY = 300;             // Distinguishing Room vs "Doors" properties
    this.roomWidth = 250;
    this.roomHeight = 700;
    this.roomLeftBorder = 300;
    this.roomRightBorder = 500;
    this.roomUpBorder = 120;
    this.roomDownBorder = 650;
    this.doorX = 400;             // Distinguishing Room vs "Doors" properties
    this.doorY = -40;             // Distinguishing Room vs "Doors" properties
    this.doorWidth = 55;
    this.doorHeight = 25;
    this.doorVX = 0;              // Door moves downwards
    this.doorVY = 0;              // Door moves downwards
    this.doorSpeed = 1;        // Door moves downwards
    this.opacity = 255;
    this.state = `mainRoom`;
    this.enteringX = 395;          // Spawn avatar in middle of Main Room
    this.enteringY = 305;          // Spawn avatar in middle of Main Room
    this.limit = 430;              // Line User has to surpass to lose level
    this.active = true;            // Turns false when User loses
    this.levelDuration = 2000;    // Time amount User has to survive level
    this.dotsNumber = 20;          // Static Effect
    this.numericStrings = 3;       // "Lines of code" Effect (intended as "reprogramming" of Avatar/User)

  }

  update(avatar, avatarImage, dialogueBox){
    // Default Behavior
    this.constrain(avatar);
    this.switchState(avatar, dialogueBox);
    this.capture(avatar);
    this.activateDoor();
    this.displayWalls();
    this.displayDoor();
    this.displayCodeLines();
    this.displayStatics();
    // Call Avatar in Room class(es)
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

  activateDoor(){
    // Display only if User survives level for certain amount of time
    if ( this.active ){
      setTimeout( ()=>{
        this.moveDoor();
        // this.displayDoor();
      }, this.levelDuration);
    }

  }

  moveDoor(){
    // Move Door Downwards
    if (this.active){
      // Move only if User hasn't lost
      this.doorX += this.doorVX;
      this.doorY += this.doorVY;

      this.doorVY = this.doorSpeed;
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
    push();
    noStroke();
    fill(255, this.opacity);
    rect(this.doorX, this.doorY, this.doorWidth, this.doorHeight);
    pop();
  }

  displayStatics(){
    // Statics
    push();
    stroke(255);
    let randomStroke = random(0.5, 2.5);
    strokeWeight(randomStroke);
    for(let i = 0; i < this.dotsNumber; i ++){
       let randomX = random(0, 800);
       let randomY = random(0, 600);
       point(randomX, randomY, randomX, randomY);
    }
    pop();
  }

  displayCodeLines(){
    // Lines of Code - "Their" attempt to reprogram User/AVatar
    push();
    textAlign(CENTER, CENTER);
    textSize(20);
    let red = random(40, 255);
    let green = random(40, 255);
    let blue = random(40, 255);
    fill(red, green, blue);
    for(let i = 0; i < this.numericStrings; i ++){
       let r = random(0, 1);
       let stringX = random(380, 400);
       let stringY = random(420, 600);
       let stringWidth = random(100, 700);
       let stringHeigth = random(200, 600);
       text(r, stringX, stringY, stringWidth, stringHeigth);
    }

    if(!this.active){
      textSize(47);
      for(let i = 0; i < this.numericStrings; i ++){
         let r = random(0, 1);
         let stringX = random(300, 500);
         let stringY = random(100, 600);
         let stringWidth = random(500, 800);
         let stringHeigth = random(100, 700);
         text(r, stringX, stringY, stringWidth, stringHeigth);
      }
    }
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
