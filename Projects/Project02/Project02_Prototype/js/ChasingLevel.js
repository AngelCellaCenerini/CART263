class ChasingLevel{
  // User reaches Vhasing Level each time they achieve a "sense"; losing means having to retry the level
  // Level increases difficulty each time
  // Last Chasing Level brings User to victory
  constructor(){
    this.roomX = 400;              // Distinguishing Room vs "Doors" properties
    this.roomY = 300;              // Distinguishing Room vs "Doors" properties
    this.roomWidth = 250;
    this.roomHeight = 700;
    this.roomLeftBorder = 300;
    this.roomRightBorder = 500;
    this.roomUpBorder = 120;
    this.roomDownBorder = 650;
    this.doorX = 400;              // Distinguishing Room vs "Doors" properties
    this.doorY = -40;              // Distinguishing Room vs "Doors" properties
    this.doorWidth = 55;
    this.doorHeight = 25;
    this.doorVX = 0;               // Door moves downwards
    this.doorVY = 0;               // Door moves downwards
    this.doorSpeed = 0.5;          // Door moves downwards
    this.activeDoor = false;       // To reset Door
    this.doorTimer = 0;            // To activate Door
    this.levelDuration = 8;        // How long User has to last before Door activates
    this.opacity = 255;            // Elements' oOpacity
    this.state = `mainRoom`;       // State level switches to (if User doesn't lose, obv)
    this.enteringX = 395;          // Spawn avatar in middle of Main Room
    this.enteringY = 305;          // Spawn avatar in middle of Main Room
    this.limit = 430;              // Line User has to surpass to lose level
    this.active = true;            // Turns false when User loses
    this.dotsNumber = 20;          // Static Effect
    this.numericStrings = 3;       // "Lines of code" Effect (intended as "reprogramming" of Avatar/User)
    this.stringX1 = 380;           // String values (vary in different Chasing Levels)
    this.stringX2 = 400;
    this.stringY1 = 420;
    this.stringY2 = 600;
    this.stringWidth1 = 100;
    this.stringWidth2 = 700;
    this.stringHeight1 = 200;
    this.stringHeight2 = 600;
  }

  update(avatar, avatarImage, dialogueBox, obstacle){
    // Default Behavior
    this.constrain(avatar);
    this.switchState(avatar, dialogueBox);
    this.capture(avatar);
    this.fail(avatar);
    // this.hit(obstacle, avatar);
    this.activateDoor();
    this.moveDoor();
    this.resetLevel(avatar, obstacle);
    this.displayWalls();
    this.displayDoor();
    this.displayCodeLines();
    this.displayStatics();
    // Call Avatar in Chasing Level class(es)
    avatar.escape(avatarImage);
    // Call Dialogue Box in Chasing Level class (rather than main script)
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
      this.active = false;
    }
  }

  fail(avatar){
    if(!this.active){
      // Freeze Avatar
      avatar.vy = 0;
      avatar.chasingLevelSpeed = 0;
      // Freeze Level
      this.active = false;
      // Freeze Door
      this.doorVY = 0;
      this.doorSpeed = 0;

      // Display Instructions to reset Level
      this.resetLevelInstructions();
    }
  }

  resetLevelInstructions(){
    // Display Instructions
    push();
    let opacity = random(10, 220);
    fill(255, opacity);
    textSize(20);
    text(`
    P
    r
    e
    s
    s

    R

    t
    o

    r
    e
    t
    r
    y`, 500, 150);
    pop();
  }

  activateDoor(){
    // Active only if User survives level for certain amount of time
    if (!this.activeDoor){
        this.doorTimer++;
        if (this.doorTimer > this.levelDuration*60){
          this.activeDoor = true;
        }
  }
}

  moveDoor(){
    // Move Door Downwards
    if (this.activeDoor){
      // Move only if User hasn't lost
      this.doorX += this.doorVX;
      this.doorY += this.doorVY;

      this.doorVY = this.doorSpeed;
    }
  }

  resetLevel(avatar, obstacle){
    // Reset Level if User fails
    // Press R to Reset
    if ( this.active === false && keyIsDown(82) ){

      // Reset Level Status
      this.active = true;

      // Reset Avatar
      avatar.x = 400;
      avatar.y = 300;
      avatar.chasingLevelSpeed = 1;
      // Reset Door
      this.doorX = 400;
      this.doorY = -40;
      this.doorSpeed = 0.5;
      this.doorTimer = 0;
      this.activeDoor = false;

      // Reset Obstacles
      for (let i = 0; i < obstacles.length; i ++){
        let obstacle = obstacles[i];
          obstacle.y = random(-150, -10);
      }
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
       let stringX = random(this.stringX1, this.stringX2);
       let stringY = random(this.stringY1, this.stringY2);
       let stringWidth = random(this.stringWidth1, this.stringWidth2);
       let stringHeigth = random(this.stringHeight1, this.stringHeight2);
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
