class Game {
  constructor(board) {
    this.board = board;
    this.background = new Background(this.board);
    this.player = new Player(this.board);
    this.enemies = [];
    this.liveCounter = new LiveCounter(this.board, this.player.lives);

    this.enemytick = 30;
    this.tick = 0;
  }

  start() {
    setInterval(() => {
      this.draw();
      this.move();
      this.tick++;

      if (this.tick % this.enemytick === 0) {
        this.enemies.push(new Enemy(this.board)); // Why it is thi.board in the properties
      }
      //this.cleanUp()

      this.liveCounter.draw();
    }, 1000 / 60);
  }

  move() {
    this.player.move();
    this.background.move(this.player);

    this.enemies.forEach((enemy) => {
      enemy.move();
    });
  }

  draw() {
    this.background.draw();
    this.player.draw();
    this.enemies.forEach((enemy) => {
      enemy.draw();
    });
  }

  checkCollisions() {
    const enemy = this.enemies.find((enemy) => {
      return this.player.collideWith(enemy);
    });

    if (enemy) {
      this.enemies = this.enemies.filter(
        (enemyFromArr) => enemyFromArr !== enemy
      );
      enemy.element.remove();
      this.player.lives -= 1;
      this.liveCounter.lives = this.player.lives;
      this.liveCounter.draw();

      if (this.player.lives === 0) {
        window.clearInterval(this.interval);
        this.gameOverBoard.style.display = "flex";
      }
    }
}
