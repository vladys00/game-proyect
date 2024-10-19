class Game {
  constructor(board) {
    this.board = board;
    this.background = new Background(this.board);
    this.player = new Player(this.board);
    this.liveCounter = new LiveCounter(this.board, this.player.lives);

    this.counter = document.getElementById("counter-num");
    this.counterNum = 0;

    this.questions = [];
    this.questionTick = 450;
    this.Qtick = 0;

    this.questionManager = new Question(this);

    this.enemies = [];
    this.enemytick = 100;
    this.tick = 0;

    this.ratsEnemies = [];
    this.ratEnemyTick = 90;

    this.pigsEnemies = [];
    this.pigEnemyTick = 150;

    this.gameOver = document.getElementById("game-over");
    this.questionDiv = document.getElementById("questionBox");
    this.imageBox = document.getElementById("img-div");

    this.possibleQuestions = questionsData;
  }

  start() {
    this.interval = setInterval(() => {
      this.draw();
      this.move();
      this.checkCollision();
      this.tick++;
      this.Qtick++;

      if (this.tick % 10 === 0){
        this.counterNum++;
      }
      if (this.counterNum % 100 === 0){
        this.pigEnemyTick -= 10;
      }
      if (this.counterNum % 150 === 0){
        this.ratEnemyTick -= 5;
      }
      if (this.counterNum % 200 === 0){
        this.enemytick -= 15;
      }
      

      if (this.tick % this.enemytick === 0) {
        this.enemies.push(new Enemy(this.board)); // Why it is thi.board in the properties
      }

      if (this.tick % this.ratEnemyTick === 0) {
        this.ratsEnemies.push(new RatEnemy(this.board)); // Why it is thi.board in the properties
      }
      if (this.tick % this.pigEnemyTick === 0) {
        this.pigsEnemies.push(new PigEnemy(this.board)); // Why it is thi.board in the properties
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
    this.ratsEnemies.forEach((rat) => {
      rat.move();
    });
    this.pigsEnemies.forEach((pig) => {
      pig.move();
    });

    this.questions.forEach((question) => {
      question.move();
    });
  }

  draw() {
    this.counter.innerHTML = `${this.counterNum}`;
    this.background.draw();
    this.player.draw();
    this.enemies.forEach((enemy) => {
      enemy.draw();
    });
    this.ratsEnemies.forEach((rat) => {
      rat.draw();
    });
    this.pigsEnemies.forEach((pig) => {
      pig.draw();
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

    const rat = this.ratsEnemies.find((rat) => {
      return this.player.collideWith(rat);
    });

    if (rat) {
      this.ratsEnemies = this.ratsEnemies.filter((passedRat) => {
        return passedRat !== rat;
      });

      rat.element.remove();
      this.player.lives -= 1;
      this.liveCounter.lives = this.player.lives;
      this.liveCounter.draw();

      if (this.player.lives === 0) {
        console.log("END GAME!!");
        window.clearInterval(this.interval);
        this.gameOver.style.display = "flex";
      }
    }

    const pig = this.pigsEnemies.find((pig) => {
      return this.player.collideWith(pig);
    });

    if (pig) {
      this.pigsEnemies = this.pigsEnemies.filter((passedPig) => {
        return passedPig !== pig;
      });

      pig.element.remove();
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
      this.randomNumber = Math.floor(Math.random() * 3);
      this.question = this.possibleQuestions[this.randomNumber];
      window.clearInterval(this.interval);

      this.imageBox.src = `../../assets/questionsPNG/${this.question.questionSrc}.png`;
      this.questionDiv.style.display = "flex";

      this.questions = this.questions.filter((question) => {
        return collidedQuestion !== question;
      });
    }
  }
}
