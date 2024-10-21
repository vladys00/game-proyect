class Question {
  constructor(game) {
    this.setUpFormListener();
    this.game = game;
  }

  setUpFormListener() {
    const form = document.getElementById("form");

    form.onsubmit = (event) => {
      const value = document.getElementById("answer").value;
      event.preventDefault();

      this.checkQuestion(value === this.game.question.correctOption);
    };
  }

  checkQuestion(result) {
    if (result === true) {
      this.game.scoreNum += 25;
      console.log("acertó");
      if (this.game.player.lives < 4) {
        this.game.player.lives += 1;
      }
      this.game.liveCounter.lives = this.game.player.lives;
      this.game.liveCounter.draw();
    } else {
      this.game.scoreNum -= 25;
      if (this.game.scoreNum < 0) {
        this.game.scoreNum = 0;
      }
      console.log("falló");
      this.game.player.lives -= 1;
      this.game.liveCounter.lives = this.game.player.lives;
      if (this.game.player.lives === 0) {
        console.log("END GAME!!");
        console.log(this.game.interval);
        clearInterval(this.game.interval);
        this.game.finalScore.innerHTML = `${this.game.scoreNum}`;
        this.game.gameOver.style.display = "flex";
      }
      this.game.liveCounter.draw();
    }

    this.game.questionDiv.style.display = "none";
    if (this.game.player.lives > 0) {
      this.game.start();
    }
  }

  selectAnotherQuestion() {}
}
