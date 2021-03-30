class Title extends Phaser.Scene {
  constructor(){
    super({
      key: `title`,
    });
  }

  create(){
    // Display Text
    this.displayText();

    // Switch Scene via SPACEBAR key
    this.switchScene();
  }

  update(){

  }


  displayText(){
    // Create Text
    // Title
    this.styleT = {
      fontSize: 31
    };
    this.title = this.add.text(70, 190, 'The Silence never bothered me anyway', this.styleT);
    // Credits
    this.styleC = {
      fontSize: 16
    };
    this.citation = this.add.text(70, 225, '- An inaccurate Frozen quote ❄️', this.styleC);
    // Instructions
    this.styleI = {
      fontSize: 20
    };
    this.citation = this.add.text(70, 340, 'Find the Island of Peacefulness among the noisy crowd.', this.styleI);
    this.styleS = {
      fontSize: 18
    };
    this.citation = this.add.text(70, 375, 'Press SPACEBAR to start >', this.styleS);
  }

  switchScene(){
    // Switch Scene via SPACEBAR key
    let spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    spaceKey.on('down', (key, event) => {
      this.scene.start(`play`);
    });
  }
}
