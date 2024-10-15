class Enemy {
  constructor(board) {
    this.board = board;
    this.width = 20;
    this.height = 40;

    this.maxWidth = this.board.clientWidth - this.width * 2;
    this.x = Math.floor(Math.random() * (this.maxWidth - this.width + 1) + this.width);

    this.y = this.board.clientHeight;
    this.sy = 10;
    this.sx = 5;

    this.element = document.createElement("div");
    this.element.className = "enemy";
    this.element.style.position = "absolute";

    
    
  }
  draw() {
    this.element.style.width = this.width + "px";
    this.element.style.height = this.height + "px";
    this.element.style.backgroundColor = "red";
    
    
    this.element.style.bottom = this.y + "px";
    this.element.style.left = this.x + "px";

    

    this.board.appendChild(this.element);
  }
  move() {
    this.y -= this.sy;
  }
}
