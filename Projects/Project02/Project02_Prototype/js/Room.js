class Room{
  // Main Structure for all Rooms within program
  // Outlined Rectangle as Walls constraining User
  // Switching States happens when User overlaps "Doors"
  constructor(avatarImage, lightImage){
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
    this.red = 255;             // Some Rooms vary in colors
    this.green = 255;           // Some Rooms vary in colors
    this.blue = 255;            // Some Rooms vary in colors
    this.opacity = 10;
    this.state = `mainRoom`;
    this.secondState = ``;
    this.enteringX = 180;       // To spawn avatar exactly in front of linking door of next roon rather than randomly
    this.enteringY = 350;       // To spawn avatar exactly in front of linking door of next roon rather than randomly
    this.secondEnteringX = 0;   // Same principles, but applied to Second Door
    this.secondEnteringY = 0;   // Same principles, but applied to Second
    // Include Avatar in Rooms
    this.avatarImage = avatarImage;
    // Display Lights (Starter + Main Rooms)
    this.active = true;         // Display Lights if Active (only active in Starter Room and Main Room)
    this.lightImage = lightImage;
    this.lightX = 400;
    this.lightY = 300;
    this.opacityValue1 = 70;    // Blinking Effect Intensity Varies depending on Lights
    this.opacityValue2 = 180;   // Blinking Effect Intensity Varies depending on Lights

    // Room Status - Complete only when User finishes program
    // Will only turn false for Main Room at the end of program (but it saves a lot of code lines to set the mechanism here)
    this.ongoing = true;

  }

  update(avatar, avatarImage, dialogueBox){
    // Default Behavior
    this.constrain(avatar);
    this.displayWalls();
    this.displayDoor();
    this.switchState(avatar, dialogueBox);
    // Call Avatar in Room class(es)
    avatar.update(avatarImage);
    // Lights - only active in Starter + Main Rooms
    // called after Avatar so that it overlaps it
    this.displayLights();
    // Call Dialogue Box in Room class (rather than main script)
    // Check if program has been completed
    if (this.ongoing){
      dialogueBox.display(dialogueBox);
    }

  }
  addSecondDoor(avatar, dialogueBox){
    // Add Second Door Mechanics
    this.displaySecondDoor();
    this.switchSecondState(avatar, dialogueBox);
  }


  constrain(avatar){
    // Constrain Avatar to Room
    // Check if User has obtained first achievemnt (body)
    if ( gameData.achievedSenses > 0){
      avatar.x = constrain(avatar.x, this.roomLeftBorder, this.roomRightBorder);
      avatar.y = constrain(avatar.y, this.roomUpBorder, this.roomDownBorder);
    }
  }

  switchState(avatar, dialogueBox){
    if (this.ongoing){     // only turns false in Main Room
    // Switch State by overlapping displayed "Door"
    let d1 = dist(this.doorX, this.doorY, avatar.x, avatar.y);
    if (d1 < (this.doorWidth/6 + avatar.size/7)){
      gameData.state = this.state;
      this.activateDialogueBox(dialogueBox);
      avatar.x = this.enteringX;
      avatar.y = this.enteringY;
    }
   }
  }

  switchSecondState(avatar, dialogueBox){
    if (this.ongoing){     // only turns false in Main Room
    // Switch state by overlapping second displayed "Door"
    let d2 = dist(this.secondDoorX, this.secondDoorY, avatar.x, avatar.y);
    if (d2 < (this.doorWidth/6 + avatar.size/7)){
      gameData.state = this.secondState;
      this.activateDialogueBox(dialogueBox);
        avatar.x = this.secondEnteringX;
        avatar.y = this.secondEnteringY;

    }
   }
  }

  displayWalls(){
    // Room Walls
    // Check User Progress
    this.checkUserProgress();
    push();
    noFill();
    stroke(this.red, this.green, this.blue, this.opacity);
    strokeWeight(8);
    rect(this.roomX, this.roomY, this.roomWidth, this.roomHeight);
    pop();
  }

  displayDoor(){
    if (this.ongoing){     // only turns false in Main Room
    // Door
    // (Not really, more like a shape through which the User navigates the rooms)
    // Check User Progress
    this.checkUserProgress();
    push();
    noStroke();
    fill(255, this.opacity);
    rect(this.doorX, this.doorY, this.doorWidth, this.doorHeight, this.radius);
    pop();
    }
  }

  displaySecondDoor(){
    if (this.ongoing){     // only turns false in Main Room
    // Door
    // (Not really, more like a shape through which the User navigates the rooms)
    // Check User Progress
    this.checkUserProgress();
    push();
    noStroke();
    fill(255, this.opacity);
    rect(this.secondDoorX, this.secondDoorY, this.doorHeight, this.doorWidth, this.radius);
    pop();
    }
  }

  checkUserProgress(){
    // Check Achievements obtained
    if ( gameData.achievedSenses >= 2){
      this.opacity = 255;
    }
  }

  activateDialogueBox(dialogueBox){
    // Reset and Activate Dialogue box each time User enters state
    dialogueBox.reset();
    setTimeout(function() {
      dialogueBox.typewriter(dialogues.simulation_dialogues[gameData.state]);
    }, 1000);
  }

  displayLights(){
    // Blinking Light - only called in Starter and Main Room
    if (this.active){
      push();
      // Create Blinking Effect
      let opacity = random(this.opacityValue1, this.opacityValue2);
      tint(255, opacity);
      // Display Light
      image(this.lightImage, this.lightX, this.lightY);
      pop();
    }
  }

}
