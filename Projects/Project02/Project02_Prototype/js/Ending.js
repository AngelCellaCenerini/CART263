class Ending{
  // Ending screen displays a Blade Runner quote fading into the dark background
  constructor(){
    this.x = 400;                // Center DIalogue Box
    this.y = 300;                // Center DIalogue Box
    this.opacity = 0;            // Create Fading Effect
    this.transparency = 1;       // Create Fading Effect

  }

  update(dialogueBox){
      // Adjust Dialogue Box
      this.customizeDialogueBox(dialogueBox);
      // Update and create Fading Effect
      setTimeout( ()=>{
        this.fade();
      }, 8000);
      // Display Fading Effect
      this.display();
    }

  customizeDialogueBox(dialogueBox){
    // Center Dialogue Box
    dialogueBox.x = this.x;
    dialogueBox.y = this.y;
    // Change Text color to white
    dialogueBox.fontColor = 255;
    // Make Dialogue Box Transparent
    dialogueBox.transparency = true;
    // Display Dialogue
    dialogueBox.display(dialogueBox);
  }

  fade(){
    // Create Fading Effect
    this.opacity += this.transparency;
  }

  display(){
    // "Display" Fading Effect
    push();
    fill(20, this.opacity);
    rect(this.x, this.y, width, height);
    pop();
  }
}
