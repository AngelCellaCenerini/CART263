class SausageDog extends Animal {

  constructor(x, y, image) {
    super(x, y, image);

    this.found = false;
    this.rotationSpeed = 0.25;
  }

  update(){
    super.update();

    // Check if User finds Sausage Dog
    if (this.found){
      this.angle = this.angle + this.rotationSpeed;
    }
  }

  mousePressed(){
    if(this.overlap(mouseX, mouseY)){
      this.found = true;
    }
  }
}
