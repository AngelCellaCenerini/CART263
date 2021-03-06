class FifthRoom extends Room {
  // Description and Comments explained in main class Room
  // Fifth Room is subdivided into subclasses to facilitate the scrolling of dialogues
  constructor(){
    super();
    this.roomX = 400;
    this.roomY = 320;
    this.doorX = 480;
    this.doorY = 395;
    this.roomWidth = 600;
    this.roomHeight = 200;
    this.roomLeftBorder = 125;
    this.roomRightBorder = 675;
    this.roomUpBorder = 245;
    this.roomDownBorder = 395;
    this.red = 14;
    this.green = 114;
    this.blue = 246;
    this.enteringX = 580;
    this.enteringY = 430;
    this.active = false;
    this.roomTimer = 0;                         // Timer to switch class/state
    this.stateDuration = 12;                     // How long state lasts
    this.currentState = `fifthRoom`;            // Current state of User location
    this.nextState = `fifthRoom2`;              // State User will be redirected after the time expressed by "this.stateDuration"
    // Previous Achievements "Symbols"
    this.achievementY = 270;
    this.achievementR = 255;
    this.achievementWidth = 40;
    this.achievementHeight = 30;
    // First Achievement
    this.achievement1X = 150;
    this.achievement1R = 150;
    this.achievement1G = 34;
    this.achievement1B = 118;
    // Second Achievement
    this.achievement2X = 250;
    this.achievement2G = 168;
    this.achievement2B = 215;
    // Third Achievement
    this.achievement3X = 550;
    this.achievement3G = 105;
    this.achievement3B = 132;
    // Fourth Achievement
    this.achievement4X = 650;
    this.achievement4G = 32;
    this.achievement4B = 153;
  }

  add(dialogueBox){
    // Add methods to fifthRoom.update (hence the name)
    this.switchToNextPhase(dialogueBox);
    this.displayPreviousAchievements();
  }

  switchToNextPhase(dialogueBox){
    // Switch state to next phase of Fifth Room
    // Start timer
    if ( gameData.state === this.currentState ){
      this.roomTimer++;
    }
    else{
      // Interrupt and restart timer if User leaves Room
      this.roomTimer = 0;
      this.activateDialogueBox(dialogueBox);
    }

    if( this.roomTimer > this.stateDuration*60 ){
      // Switch Room
      gameData.state = this.nextState;
      // Reset State dialogues
      // dialogueBox.reset();
      // Start next State dialogue Box
      // setTimeout( ()=>{
        this.activateDialogueBox(dialogueBox);
      // }, 3000);
    }
  }
  //
  // reset(){
  //   if(gameData.state !== `fifthRoom`){
  //
  //   }
  // }

  displayPreviousAchievements(){
    // Display Colored Rectangles Associated with Previous Achievements
    push();
    fill(this.achievement1R, this.achievement1G, this.achievement1B);
    rect(this.achievement1X, this.achievementY, this.achievementWidth, this.achievementHeight);
    fill(this.achievementR, this.achievement2G, this.achievement2B);
    rect( this.achievement2X, this.achievementY, this.achievementWidth, this.achievementHeight);
    fill(this.achievementR, this.achievement3G, this.achievement3B);
    rect(this.achievement3X, this.achievementY, this.achievementWidth, this.achievementHeight);
    fill(this.achievementR, this.achievement4G, this.achievement4B);
    rect(this.achievement4X, this.achievementY, this.achievementWidth, this.achievementHeight);
    pop();
  }

}
