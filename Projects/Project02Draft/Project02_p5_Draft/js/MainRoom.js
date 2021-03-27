class MainRoom extends Room {
  constructor(){
    super();
    this.roomX = 400;
    this.roomY = 300;
    this.doorX = 580;
    this.doorY = 470;
    this.secondDoorX = 140;
    this.secondDoorY = 310;
    this.roomWidth = 600;
    this.roomHeight = 450;
    this.roomLeftBorder = 125;
    this.roomRightBorder = 675;
    this.roomUpBorder = 110;
    this.roomDownBorder = 495;
    this.state = `title`;
    this.secondState = `starterRoom`;
    this.secondEnteringX = 500;
    this.secondEnteringY = 430;
  }
}
