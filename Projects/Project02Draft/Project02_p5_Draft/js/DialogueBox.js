class DialogueBox {
  constructor(){
    this.x = 400;
    this.y = 60;
    this.boxWidth = 700;
    this.boxHeight = 80;
    this.fullText = ``;
    this.displayText = ``;
    this.nextChar = 0;
    this.speed = 70;
    this.interval = undefined;
    this.timeout = undefined;
    this.active = true;

  }

  type(message){
    // this.timeout = setTimeout(this.typewriter.bind(this, message, this.x, this.y), 1000);
    this.typewriter.bind(this, message, this.x, this.y);
  }

  display(){
      // Dialogue Box
      push();
      stroke(255);
      strokeWeight(5);
      fill(255, 200);
      rect(this.x, this.y, this.boxWidth, this.boxHeight);
      pop();

      // Text
      push();
      fill(20);
      textSize(18);
      textAlign(CENTER, CENTER);
      text(this.displayText, this.x, this.y);
      pop();
  }

  typewriter(message){
    if (this.active){
      this.reset();
      this.fullText = message;
      this.interval = setInterval(this.addNextCharacter.bind(this), this.speed);
    }
  }

  reset() {
    if (this.active){
      this.fullText = ``;
      this.displayText = ``;
      this.nextChar = 0;
      clearInterval(this.interval);
    }
  }

  addNextCharacter() {
    if (this.active){
      // Adds Next Character
      if (this.nextChar >= this.fullText.length) {
        return;
      }
      this.displayText += this.fullText.charAt(this.nextChar);
      this.nextChar = this.nextChar + 1;
    }
  }

}
