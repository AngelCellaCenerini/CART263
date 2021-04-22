class Ending{
  // Ending screen is a dark screen fading into Blade Runner quote
  constructor(){
    this.x = 400;
    this.y = 300;
    this.opacity = 255;            // To create Fading Effect
    this.transparency = -1;      // To create Fading Effect
    this.active = false;           // Turns true after 2 sec
    this.timer = 0;                // Initially time state
  }

  update(dialogueBox){
      // Run State after 2 sec
      this.activateState();
      this.run(dialogueBox);
    }

  activateState(){
    // Time 2 sec before "activating" Ending State
    this.timer++;
     if (this.timer > 2*60){
       this.active = true;
    }
  }

  run(dialogueBox){
    // Only called when State status turns active
    if(this.active){
      // Update and display Dialogue Box
      this.activateDialogueBox(dialogueBox);
      dialogueBox.display(dialogueBox);
      // Update and create Fading Effect
      this.fade();
      this.display();
    }
  }

  fade(){
    // Create Fading Effect
    this.opacity += this.transparency;
  }

  activateDialogueBox(dialogueBox){
    // Center Dialogue Box to canvas
    dialogueBox.x = this.x;
    dialogueBox.y = this.y;
    // Reset and Activate Dialogue box each time User enters state
    dialogueBox.reset();
    setTimeout(function() {
      dialogueBox.typewriter(dialogues.simulation_dialogues[gameData.state]);
    }, 1000);
  }

  display(){
    // "Display" Fading Effect
    push();
    fill(20, this.opacity);
    rect(this.x, this.y, width, height);
    pop();
  }
}
