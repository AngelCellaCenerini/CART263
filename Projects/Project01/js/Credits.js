class Credits{
  constructor(x, y){
    this.x = x;
    this.y = y;
    this.string = ` JURASSIC PARK MOMENT



    "You have to treat it almost like a little animal - it's good at certain things and not good at certain other things."


    "We can do a Pinch Simulator now - pinch, pinch!"


    "'I'm going to crawl out of the sewer grate in your basement' haha, gross."


    "'adolescence'...that's a very nice password to have. Memorable."


    "Sorry scissors, you don't exist as much as I do."


    "We could get him to say something more British: 'Toodle-oo, pip pip, by jove!'"


    "That's the way you can make yourself feel good if you're having a bad day. You can see 'Pippin is great' in your console."


    "It's flickering in and out of existence, because that's life."


    "It's doing full somersaults, which you don't see many sausage dogs do, but this one is very athletic."


    "It is identifying that I am a person-that's very flattering."


    "I used all of that potential to help us eat flies."


    "Ciao bella!"


    SPECIAL THANKS: NOT Handpose Model`;
    this.vx = 0;
    this.vy = 0;
    this.speed = -0.64;
  }

  update(){
    this.move();
    this.display();
  }

  move(){
   this.y += this.vy;
   this.vy = this.speed;
  }

  display(){
    push();
    fill(255);
    text(this.string, this.x, this.y);
    pop();
  }
}
