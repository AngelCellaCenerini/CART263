class SecondRoom extends FirstRoom {
  // Description and Comments explained in main class Room and sub class First Room
  // Sub class of First Room (sub class of main Class Room)
  constructor(){
    super();
    this.red = 255;
    this.green = 105;
    this.blue = 132;
    this.buttonId = `second-room-button`;

  }
  manageButton(){
    // Identigy HTML Element
    let roomButton = document.getElementById(this.buttonId);

    roomButton.onclick = function() {
      // achievedSenses.push(achievedSense);
      // window.location = this.destinationHTML;
      let destination = `memory.html`;
      window.location = destination;
    };

    // Display Button
    roomButton.style.visibility = `visible`;

  }
}
