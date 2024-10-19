class RatEnemy extends Enemy {
  constructor(board) {
    super(board);
    this.width = 70;
    this.height = 30;
    this.sy = 10;
    
    // this.element = document.createElement("img");
    this.element.setAttribute("src", "../../assets/img/rat.gif");
  }

  draw(){
    super.draw();
    
  }
  move() {
    super.move();
  }
}
