class PigEnemy extends Enemy {
  constructor(board) {
    super(board);
    this.sy = 10;
    this.width = 75;
    this.height = 40;
    this.element.setAttribute("src", "../../assets/img/pig.gif");
  }
  draw() {
    super.draw();
    // this.element.style.backgroundColor = "rgb(255, 192, 203)";
  }
  move() {
    super.move();
  }
}
