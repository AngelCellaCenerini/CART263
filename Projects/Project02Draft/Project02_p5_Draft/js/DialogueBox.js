class DialogueBox {
  constructor(){
    this.x = 400;
    this.y = 60;
    this.boxWidth = 700;
    this.boxHeight = 80;
    this.fullText = ``;
    this.displayText = ``;
    this.nextChar = 0;
    this.speed = 50;
    this.interval = undefined;

  }

  typewriter(message, x, y){
    this.reset();
    this.fullText = message;
    this.x = x;
    this.y = y;
    this.interval = setInterval(this.addNextCharacter.bind(this), this.speed);
  }

  reset() {
    this.fullText = ``;
    this.displayText = ``;
    this.nextChar = 0;
    clearInterval(this.interval);
  }

  addNextCharacter() {
    // Adds Next Character
    if (this.nextChar >= this.fullText.length) {
      return;
    }
    this.displayText += this.fullText.charAt(this.nextChar);
    this.nextChar = this.nextChar + 1;
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
}
