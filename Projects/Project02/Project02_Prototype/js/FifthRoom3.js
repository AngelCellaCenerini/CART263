class FifthRoom3 extends FifthRoom {
  // Description and Comments explained in class Fifth Room
  // Fifth Room is subdivided into subclasses to facilitate the scrolling of dialogues
  constructor(){
    super();
    this.currentState = `fifthRoom3`;            // Current state of User location
    this.nextState = `fifthRoom4`;              // State User will be redirected after the time expressed by "this.stateDuration"

  }
}
