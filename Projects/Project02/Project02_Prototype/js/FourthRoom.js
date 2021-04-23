class FourthRoom extends FirstRoom {
  // Description and Comments explained in main class Room and sub class First Room
  // Sub class of First Room (sub class of main Class Room)
  constructor(){
    super();
    this.red = 255;
    this.green = 32;
    this.blue = 153;
    this.buttonId = `fourth-room-button`;
    this.progress = 3;
    this.currentRoom = `fourthRoom`; 

  }
}
