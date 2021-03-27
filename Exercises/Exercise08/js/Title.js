class Title extends Phaser.Scene {
  constructor(){
    super({
      key: `title`
    });
  }

  create(){
    this.displayText();
    // Access User's Keys
    this.ENTERkey = this.input.keyboard.addKey('ENTER');
    // Switch Scene
    if (this.ENTERkey.isDown){
      this.scene.start(`play`);
    }
  }

  update(){

  }


  displayText(){
    // Create Text
    // Title
    this.styleT = {
      fontSize: 34
    };
    this.title = this.add.text(100, 200, 'Normal People Scare Me', this.styleT);
    // Credits
    this.styleC = {
      fontSize: 18
    };
    this.citation = this.add.text(100, 250, '- A Cringy Shirt', this.styleC);
    // Instructions
    this.styleI = {
      fontSize: 18
    };
    this.citation = this.add.text(500, 550, 'Press ENTER to start >', this.styleI);
  }
}
