class FifthRoom2 extends FifthRoom {
  // Description and Comments explained in class Fifth Room
  // Fifth Room is subdivided into subclasses to facilitate the scrolling of dialogues
  constructor(){
    super();
    this.currentState = `fifthRoom2`;            // Current state of User location
    this.nextState = `fifthRoom3`;              // State User will be redirected after the time expressed by "this.stateDuration"

  }
}
