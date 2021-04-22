class FirstRoom extends Room {
  // Description and Comments explained in main class Room
  constructor(){
    super();
    this.roomX = 400;
    this.roomY = 300;
    this.doorX = 480;
    this.doorY = 395;
    this.roomWidth = 300;
    this.roomHeight = 250;
    this.roomLeftBorder = 280;
    this.roomRightBorder = 520;
    this.roomUpBorder = 205;
    this.roomDownBorder = 395;
    this.red = 150;
    this.green = 34;
    this.blue = 118;
    this.enteringX = 580;
    this.enteringY = 430;
    this.state = `mainRoom`;
    this.active = false;
    this.buttonId = `first-room-button`;  // Id of Button HTML Element (one button per "relevant" Rooms)
    this.destinationHTML = `vision.html`;
  }

  manageButton(){
    // Identigy HTML Element
    let roomButton = document.getElementById(this.buttonId);

    roomButton.onclick = function() {
      // window.location = this.destinationHTML;
      // achievedSenses.push(achievedSense);
      let destination = `vision.html`;
      window.location = destination;
    };

    // Display Button
    roomButton.style.visibility = `visible`;

  }
}
