class MainRoom extends Room {
  // Description and Comments explained in main class Room
  // When Main Room becomes "complete" (!this.ongoing), all doors and related systems are nullified
  constructor(avatarImage, lightImage){
    super();
    this.roomX = 400;
    this.roomY = 340;
    this.doorX = 580;
    this.doorY = 510;
    this.secondDoorX = 140;
    this.secondDoorY = 350;
    this.roomWidth = 600;
    this.roomHeight = 450;
    this.roomLeftBorder = 125;
    this.roomRightBorder = 675;
    this.roomUpBorder = 150;
    this.roomDownBorder = 515;
    this.state = ``;
    this.enteringX = 480;
    this.enteringY = 345;
    this.secondState = `starterRoom`;
    this.secondEnteringX = 500;
    this.secondEnteringY = 430;
    this.firstOption = `firstRoom`;      // Possible "relevamt" Room User could reach from Main Room
    this.secondOption = `emptyRoom`;     // Possible "empty" Room User could reach from Main Room
    this.lightImage = lightImage;
    this.lightX = 400;
    this.lightY = 222;
    this.opacityValue1 = 180;
    this.opacityValue2 = 250;
    // Room's Status - Random (User "happens" in Rooms) or Not (Specific Doors for Specific Rooms appear)
    // Starts Random, becomes Systematic after 3rd achieved sense
    this.randomness = true;
    // Previous "Achievements" Rooms
    this.achievementY = 500;
    this.achievementR = 255;
    this.achievementWidth = 35;
    this.achievementHeight = 30;
    // First Achievement
    this.achievement1X = 200;
    this.achievement1R = 150;
    this.achievement1G = 34;
    this.achievement1B = 118;
    // Second Achievement
    this.achievement2X = 300;
    this.achievement2G = 105;
    this.achievement2B = 132;
    // Third Achievement
    this.achievement3X = 400;
    this.achievement3G = 168;
    this.achievement3B = 215;
    // Fourth Achievement
    this.achievement4X = 500;
    this.achievement4G = 32;
    this.achievement4B = 153;
    // Fifth Achievement
    this.achievement5X = 600;
    this.achievement5R = 14;
    this.achievement5G = 114;
    this.achievement5B = 246;

    // Final mechanics before end of program
    // Avatar Destination
    this.positionX = 400;
    this.positionY = -20;
    this.timing = 0;

  }

  roomSystem(avatar, dialogueBox){
    if (this.ongoing === true ){
      // Once Room system is no longer Random, User can select specific Rooms
      this.switchRelevantRooms(avatar, dialogueBox);
      this.displayAchievementsDoors();
    }
    // Deactivate White Door depending on User progress
    this.deactivateDoor();

    // Ending Mechanism before the end of the program
    this.engulf(avatar, dialogueBox);

  }

  switchState(avatar, dialogueBox){
    if(this.randomness){
      // Rewrite Function from Main Room
      // Consider Randomness in switching Room/State
      let d1 = dist(this.doorX, this.doorY, avatar.x, avatar.y);
      if (d1 < (this.doorWidth/6 + avatar.size/7)){
        this.selectDestinationRoom();
        gameData.state = this.state;
        this.activateDialogueBox(dialogueBox);
        avatar.x = this.enteringX;
        avatar.y = this.enteringY;
      }
    }
  }

  deactivateDoor(){
    if (gameData.achievedSenses > 2){
      // Make Default (White) Door Disappear
      this.randomness = false;
    }
  }

  selectDestinationRoom(){
    // Only called if Door System is random
    if(this.randomness){
      // Randomize Room User Reaches from Main Room
      // Check User Progress
      if (gameData.achievedSenses === 0){
        this.firstOption = `firstRoom`;
      }
      else if(gameData.achievedSenses === 1 ){ // this necessary?
        this.firstOption = `secondRoom`;
      }
      else if(gameData.achievedSenses === 2){
        this.firstOption = `thirdRoom`;
      }

      // Calculate Probability
       if (random(0, 1) < 0.2){
         // 20% Chance to reach relevant Room
         this.state = this.firstOption;
       }
       else{
         // 80% Chance to reach Empty Room
         this.state = this.secondOption;
       }
    }
  }

  switchRelevantRooms(avatar, dialogueBox){
    if(!this.randomness){
    // Swith To Relevant Rooms depending on User progress
    if (gameData.achievedSenses > 2){
    // Body Room
    let d2 = dist(this.achievement1X, this.achievementY, avatar.x, avatar.y);
    if (d2 < (this.achievementWidth/6 + avatar.size/7)){
      this.activateDialogueBox(dialogueBox);
      this.state = `firstRoom`;

      gameData.state = this.state;
      avatar.x = this.enteringX;
      avatar.y = this.enteringY;
    }
    // Memory Room
    let d3 = dist(this.achievement2X, this.achievementY, avatar.x, avatar.y);
    if (d3 < (this.achievementWidth/6 + avatar.size/7)){
      this.activateDialogueBox(dialogueBox);
      this.state = `secondRoom`;
      gameData.state = this.state;
      avatar.x = this.enteringX;
      avatar.y = this.enteringY;
    }
    // Vision Room
    let d4 = dist(this.achievement3X, this.achievementY, avatar.x, avatar.y);
    if (d4 < (this.achievementWidth/6 + avatar.size/7)){
      this.activateDialogueBox(dialogueBox);
      this.state = `thirdRoom`;

      gameData.state = this.state;
      avatar.x = this.enteringX;
      avatar.y = this.enteringY;
    }
    // Language Room
    let d5 = dist(this.achievement4X, this.achievementY, avatar.x, avatar.y);
    if (d5 < (this.achievementWidth/6 + avatar.size/7)){
      this.activateDialogueBox(dialogueBox);
      this.state = `fourthRoom`;

      gameData.state = this.state;
      avatar.x = this.enteringX;
      avatar.y = this.enteringY;
    }
    }
    if (gameData.achievedSenses > 3){
    // Will Room
    let d6 = dist(this.achievement5X, this.achievementY, avatar.x, avatar.y);
    if (d6 < (this.achievementWidth/6 + avatar.size/7)){
      this.activateDialogueBox(dialogueBox);
      this.state = `fifthRoom`;
      gameData.state = this.state;
      avatar.x = this.enteringX;
      avatar.y = this.enteringY;
    }
  }
  }
  }

  engulf(avatar, dialogueBox){
    // Final Scene before program ends
    // Check if journey is complete
    if (!this.ongoing){

      // CHange Room borders (avatar restraint)
      this.roomUpBorder = -20;

      // Change Avatar speed
      avatar.speed = 0.8;
      // Drag User towards the light (amen?)
      let dx = avatar.x - (this.positionX);
      let dy = avatar.y - (this.positionY);

      if (dx < 0){
      avatar.vx = avatar.speed;
      }
      else if(dx > 0){
        avatar.vx = -avatar.speed;
      }

      if (dy < 0){
        avatar.vy = avatar.speed;
      }
      else if(dy > 0){
        avatar.vy = -avatar.speed;
      }


      // Switch State to Ending Screen (after 7 seconds)
      // Start counting
      this.timing ++;
      if (this.timing > 7*60){
          // Switch state
          gameData.state = `finale`;
          // Reset State dialogues
          dialogueBox.reset();
          // Start next State dialogue Box
          setTimeout( ()=>{
            this.activateDialogueBox(dialogueBox);
          }, 4000);
      }
    }
  }

  displayDoor(){
    // Only called if Room Status is Random and ongoing
    if(this.randomness === true){
      // Display Door
      push();
      noStroke();
      fill(255, this.opacity);
      rect(this.doorX, this.doorY, this.doorWidth, this.doorHeight, this.radius);
      pop();
    }
  }

  displayAchievementsDoors(){
    // Display Doors to "relevant" Rooms
    push();
    // Display only if User has achieved 3 "senses", then display door according to next level
    if (gameData.achievedSenses > 0){

      if (gameData.achievedSenses > 2){

        // Make Default (White) Door Disappear
        // this.randomness = false;


        // 1st Achievement Door
        fill(this.achievement1R, this.achievement1G, this.achievement1B);
        rect(this.achievement1X, this.achievementY, this.achievementWidth, this.achievementHeight);

        // 2nd Achievement Door
        fill(this.achievementR, this.achievement2G, this.achievement2B);
        rect( this.achievement2X, this.achievementY, this.achievementWidth, this.achievementHeight);

        // 3rd Achievement Door
        fill(this.achievementR, this.achievement3G, this.achievement3B);
        rect(this.achievement3X, this.achievementY, this.achievementWidth, this.achievementHeight);

        // 4th Achievement Door
        fill(this.achievementR, this.achievement4G, this.achievement4B);
        rect(this.achievement4X, this.achievementY, this.achievementWidth, this.achievementHeight);
      }
      if (gameData.achievedSenses > 3){

        // 5th Achievement Door
        fill(this.achievement5R, this.achievement5G, this.achievement5B);
        rect(this.achievement5X, this.achievementY, this.achievementWidth, this.achievementHeight);
      }

    }
    pop();
  }
}
