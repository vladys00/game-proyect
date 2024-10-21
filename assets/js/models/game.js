class Game {
  constructor(board) {
    this.board = board;
    // this.initData();

    this.background = new Background(this.board);
    this.questionManager = new Question(this);
    this.player = new Player(this.board);
    this.liveCounter = new LiveCounter(this.board, this.player.lives);

    this.playAgain = document.getElementById("play-again");
    this.points = document.getElementById("counter-num");
    this.gameOver = document.getElementById("game-over");
    this.questionDiv = document.getElementById("questionBox");
    this.imageBox = document.getElementById("img-div");
    this.finalScore = document.getElementById("finalScore");

    this.possibleQuestions = questionsData;
    this.questions = [];
    this.questionTick = 400;
    this.Qtick = 0;

    this.rocks = [];
    this.rockTick = 100;

    this.nuts = [];
    this.nutTick = 125;

    this.scoreNum = 0;

    this.enemies = [];
    this.enemytick = 500;
    this.tick = 0;

    this.ratsEnemies = [];
    this.ratEnemyTick = 90;

    this.pigsEnemies = [];
    this.pigEnemyTick = 70;

    this.interval;
  }
  initData() {}

  start() {
    this.interval = setInterval(() => {
      this.draw();
      this.move();
      this.checkCollision();
      this.tick++;
      this.Qtick++;

      if (this.counterNum % 100 === 0) {
        this.pigEnemyTick -= 10;
      }
      if (this.counterNum % 150 === 0) {
        this.ratEnemyTick -= 5;
      }
      if (this.counterNum % 200 === 0) {
        this.enemytick -= 15;
      }

      if (this.tick % this.enemytick === 0) {
        this.enemies.push(new Enemy(this.board));
        // Why it is thi.board in the properties
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

      if (this.tick % this.rockTick === 0) {
        this.rocks.push(new RockPoints(this.board));
      }

      if (this.tick % this.nutTick === 0) {
        this.nuts.push(new NutPoints(this.board));
      }
      //this.cleanUp()

      this.liveCounter.draw();
    }, 1000 / 60);
  }

  //   cleanUp (){
  //     this.enemies = this.enemies.filter((enemy)=>{
  //         if(enemy.y < -enemy.height){
  //             enemy.remove();
  //             return false;
  //         } else {
  //             return true;
  //         }
  //     })
  //     this.ratsEnemies = this.ratsEnemies.filter((rat)=>{
  //         if(rat.y < -rat.height){
  //             rat.remove();
  //             return false;
  //         } else {
  //             return true;
  //         }
  //     })
  //     this.pigsEnemies = this.pigsEnemies.filter((pig)=>{
  //         if(pig.y < -pig.height){
  //             pig.remove();
  //             return false;
  //         } else {
  //             return true;
  //         }
  //     })
  //   }

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
    this.rocks.forEach((rock) => {
      rock.move();
    });
    this.nuts.forEach((nut) => {
      nut.move();
    });
  }

  draw() {
    this.points.innerHTML = `${this.scoreNum}`;
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
    this.rocks.forEach((rock) => {
      rock.draw();
    });
    this.nuts.forEach((nut) => {
      nut.draw();
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
      this.scoreNum -= 15;
      if(this.scoreNum<0){
        this.scoreNum = 0;
      }
      this.player.lives -= 1;
      this.liveCounter.lives = this.player.lives;
      this.liveCounter.draw();

      if (this.player.lives === 0) {
        console.log("END GAME!!");
        window.clearInterval(this.interval);
        this.finalScore.innerHTML = `${this.scoreNum}`;
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
      this.scoreNum -= 10;
      if(this.scoreNum<0){
        this.scoreNum = 0;
      }
      this.player.lives -= 1;
      this.liveCounter.lives = this.player.lives;
      this.liveCounter.draw();

      if (this.player.lives === 0) {
        console.log("END GAME!!");
        window.clearInterval(this.interval);
        this.finalScore.innerHTML = `${this.scoreNum}`;
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
      this.scoreNum -= 10;
      if(this.scoreNum<0){
        this.scoreNum = 0;
      }
      this.player.lives -= 1;
      this.liveCounter.lives = this.player.lives;
      this.liveCounter.draw();

      if (this.player.lives === 0) {
        console.log("END GAME!!");
        window.clearInterval(this.interval);
        this.finalScore.innerHTML = `${this.scoreNum}`;
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
      if (this.player.lives === 0) {
        console.log("END GAME!!");
        window.clearInterval(this.interval);
        this.finalScore.innerHTML = `${this.scoreNum}`;
        this.gameOver.style.display = "flex";
      }
    }
    this.playAgain.addEventListener("click", function () {
      console.log(this);
      location.reload();
    });

    const rock = this.rocks.find((rock) => {
      return this.player.collideWith(rock);
    });
    if (rock) {
      this.rocks = this.rocks.filter((passedRock) => {
        return passedRock !== rock;
      });
      this.scoreNum += 10;
    }
    const nut = this.nuts.find((nut) => {
      return this.player.collideWith(nut);
    });
    if (nut) {
      this.nuts = this.nuts.filter((passedNut) => {
        return passedNut !== nut;
      });
      this.scoreNum += 15;
    }
  }
}
