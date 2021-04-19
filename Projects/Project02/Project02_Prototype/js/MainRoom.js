class MainRoom extends Room {
  // Description and Comments explained in main class Room
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
    this.state = `chasingLevel`;
    this.enteringX = 480;
    this.enteringY = 345;
    this.secondState = `starterRoom`;
    this.secondEnteringX = 500;
    this.secondEnteringY = 430;
    this.firstOption = `firstRoom`;      // Possible Room User could reach from Main Room
    this.secondOption = `emptyRoom`;
    // this.thirdOption = `thirdRoom`;
    // this.fouthOption = `emptyRoom`;
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
    this.achievement2G = 168;
    this.achievement2B = 215;
    // Third Achievement
    this.achievement3X = 400;
    this.achievement3G = 105;
    this.achievement3B = 132;
    // Fourth Achievement
    this.achievement4X = 500;
    this.achievement4G = 32;
    this.achievement4B = 153;
    // Fifth Achievement
    this.achievement5X = 600;
    this.achievement5R = 14;
    this.achievement5G = 114;
    this.achievement5B = 246;
  }

  roomSystem(avatar, dialogueBox){
    // this.switchState();
    // this.selectDestinationRoom();
    this.switchRelevantRooms(avatar, dialogueBox);
    this.displayAchievementsDoors();
  }

  switchState(avatar, dialogueBox){
    if(this.randomness){
      // Rewrite Function from Main Room
      // So that 'change' is only calcutlated once
      let d1 = dist(this.doorX, this.doorY, avatar.x, avatar.y);
      if (d1 < (this.doorWidth/6 + avatar.size/7)){
        // this.selectDestinationRoom();
        state = this.state;
        this.activateDialogueBox(dialogueBox);
        avatar.x = this.enteringX;
        avatar.y = this.enteringY;
      }
    }
  }

  selectDestinationRoom(){
    // Only called if Door System is random
    if(this.randomness){
      // Randomize Room User Reaches from Main Room
      // Check User Progress
      if (achievedSenses.length < 0){
        this.firstOption = `firstRoom`;
      }
      else if(achievedSenses.length < 1 && achievedSenses.length > 0){ // this necessary?
        this.firstOption = `secondRoom`;
      }
      else if(achievedSenses.length < 2 && achievedSenses.length > 1){
        this.firstOption = `thirdRoom`;
      }

      // Calculate Probability
       if (change < 0.3){
         // 30% Chance to reach relevant Room
         this.state = this.firstOption;
       }
       else{
         // 70% Chance to reach Empty Room
         this.state = this.secondOption;
       }
    }
  }

  switchRelevantRooms(avatar, dialogueBox){
    // Swith To Relevant Rooms
    // Body Room
    let d2 = dist(this.achievement1X, this.achievementY, avatar.x, avatar.y);
    if (d2 < (this.achievementWidth/6 + avatar.size/7)){
      this.activateDialogueBox(dialogueBox);
      this.state = `firstRoom`;
      avatar.x = this.enteringX;
      avatar.y = this.enteringY;
    }
    // Memory Room
    let d3 = dist(this.achievement2X, this.achievementY, avatar.x, avatar.y);
    if (d3 < (this.achievementWidth/6 + avatar.size/7)){
      this.activateDialogueBox(dialogueBox);
      this.state = `secondRoom`;
      avatar.x = this.enteringX;
      avatar.y = this.enteringY;
    }
    // Vision Room
    let d4 = dist(this.achievement3X, this.achievementY, avatar.x, avatar.y);
    if (d4 < (this.achievementWidth/6 + avatar.size/7)){
      this.activateDialogueBox(dialogueBox);
      this.state = `thirdRoom`;
      avatar.x = this.enteringX;
      avatar.y = this.enteringY;
    }
    // Language Room
    let d5 = dist(this.achievement4X, this.achievementY, avatar.x, avatar.y);
    if (d5 < (this.achievementWidth/6 + avatar.size/7)){
      this.activateDialogueBox(dialogueBox);
      this.state = `fourthRoom`;
      avatar.x = this.enteringX;
      avatar.y = this.enteringY;
    }
    // Will Room
    let d6 = dist(this.achievement5X, this.achievementY, avatar.x, avatar.y);
    if (d6 < (this.achievementWidth/6 + avatar.size/7)){
      this.activateDialogueBox(dialogueBox);
      this.state = `fifthRoom`;
      avatar.x = this.enteringX;
      avatar.y = this.enteringY;
    }
  }

  displayDoor(){
    // Only called if Room Status is Random
    if(this.randomness){
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
    if (achievedSenses.length > 0){

      if (achievedSenses.length > 2){

        // Make Default (White) Door Disappear
        this.randomness = false;


        // 1st Achievement Door
        fill(this.achievement1R, this.achievement1G, this.achievement1B);
        rect(this.achievement1X, this.achievementY, this.achievementWidth, this.achievementHeight);

        // 2nd Achievement Door
        fill(this.achievementR, this.achievement2G, this.achievement2B);
        rect( this.achievement2X, this.achievementY, this.achievementWidth, this.achievementHeight);

        // 3rd Achievement Door
        fill(this.achievementR, this.achievement3G, this.achievement3B);
        rect(this.achievement3X, this.achievementY, this.achievementWidth, this.achievementHeight);

      }
      if (achievedSenses.length > 3){

        // 4th Achievement Door
        fill(this.achievementR, this.achievement4G, this.achievement4B);
        rect(this.achievement4X, this.achievementY, this.achievementWidth, this.achievementHeight);
      }
      if (achievedSenses.length > 4){

        // 5th Achievement Door
        fill(this.achievement5R, this.achievement5G, this.achievement5B);
        rect(this.achievement5X, this.achievementY, this.achievementWidth, this.achievementHeight);
      }

    }
    pop();
  }
}
