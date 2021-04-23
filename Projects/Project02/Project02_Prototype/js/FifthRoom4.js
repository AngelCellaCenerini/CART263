class FifthRoom4 extends FifthRoom {
  // Description and Comments explained in class Fifth Room
  // Fifth Room is subdivided into subclasses to facilitate the scrolling of dialogues
  constructor(){
    super();
    this.stateDuration = 8;                     // How long state lasts
    this.currentState = `fifthRoom4`;            // Current state of User location
    this.nextState = `mainRoom`;              // State User will be redirected after the time expressed by "this.stateDuration"

  }

  add(dialogueBox, mainRoom){

    // Add methods to fifthRoom.update (hence the name)
    this.switchToNextPhase(dialogueBox);

    this.displayPreviousAchievements();
    // Trigger Program Ending
    this.endProgram(mainRoom);
  }

  endProgram(mainRoom){
    // Switch program name to "complete" status
    // (dramatic name, yes)
    mainRoom.ongoing = false;
  }
}
