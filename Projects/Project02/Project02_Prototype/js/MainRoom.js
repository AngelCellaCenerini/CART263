class MainRoom extends Room {
  // Description and Comments explained in main class Room
  constructor(){
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
    this.state = `firstRoom`;
    this.enteringX = 480;
    this.enteringY = 345;
    this.secondState = `starterRoom`;
    this.secondEnteringX = 500;
    this.secondEnteringY = 430;
    this.firstOption = `firstRoom`;      // Possible Room User could reach from Main Room
    this.secondOption = `emptyRoom`;
    // this.thirdOption = `thirdRoom`;
    // this.fouthOption = `emptyRoom`;
  }

  switchState(avatar, dialogueBox){
    // Rewrite Function from Main Room
    // So that 'change' is only calcutlated once
    let d1 = dist(this.doorX, this.doorY, avatar.x, avatar.y);
    if (d1 < (this.doorWidth/6 + avatar.size/7)){
      // this.selectDestinationRoom();
      state = this.state;
      this.displayDialogueBox(dialogueBox);
      avatar.x = this.enteringX;
      avatar.y = this.enteringY;
    }
  }

  selectDestinationRoom(){
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
