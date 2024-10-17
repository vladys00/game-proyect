class Game {
  constructor(board) {
    this.board = board;
    this.background = new Background(this.board);
    this.player = new Player(this.board);
    this.liveCounter = new LiveCounter(this.board, this.player.lives);

    this.questions = [];
    this.questionTick = 100;
    this.Qtick = 0;

    this.questionManager = new Question(this);

    this.enemies = [];
    this.enemytick = 500;
    this.tick = 0;

    this.gameOver = document.getElementById("game-over");
    this.question = document.getElementById("questionBox");
  }

  start() {
    this.interval = setInterval(() => {
      this.draw();
      this.move();
      this.checkCollision();
      this.tick++;
      this.Qtick++;

      if (this.tick % this.enemytick === 0) {
        this.enemies.push(new Enemy(this.board)); // Why it is thi.board in the properties
      }

      if (this.Qtick % this.questionTick === 0) {
        this.questions.push(new QuestionBox(this.board));
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

    this.questions.forEach((question) => {
      question.move();
    });
  }

  draw() {
    this.background.draw();
    this.player.draw();
    this.enemies.forEach((enemy) => {
      enemy.draw();
    });
    this.questions.forEach((question) => {
      question.draw();
    });
  }

  checkCollision() {
    const enemy = this.enemies.find((enemy) => {
      return this.player.collideWith(enemy);
    });

    if (enemy) {
      this.enemies = this.enemies.filter((passedEnemy) => {
        return passedEnemy !== enemy;
      });

      enemy.element.remove();
      this.player.lives -= 1;
      this.liveCounter.lives = this.player.lives;
      this.liveCounter.draw();

      if (this.player.lives === 0) {
        console.log("END GAME!!");
        window.clearInterval(this.interval);
        this.gameOver.style.display = "flex";
      }
    }

    const collidedQuestion = this.questions.find((question) => {
      return this.player.collideWith(question);
    });

    if (collidedQuestion) {
        window.clearInterval(this.interval);
        this.question.style.display = "flex";

        this.questions = this.questions.filter((question) => {
            return collidedQuestion !== question;
          });
    }
  }

}
