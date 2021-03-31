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
  }
}
