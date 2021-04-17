class ThirdRoom extends FirstRoom {
  // Description and Comments explained in main class Room and sub class First Room
  // Sub class of First Room (sub class of main Class Room)
  constructor(){
    super();
    this.red = 255;
    this.green = 168;
    this.blue = 215;
    this.state = `mainRoom`;
    this.buttonId = `third-room-button`;

  }
}
