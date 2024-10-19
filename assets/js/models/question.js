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
      console.log("acertó");
      if (this.game.player.lives < 4) {
        this.game.player.lives += 1;
      }
      this.game.liveCounter.lives = this.game.player.lives;
      this.game.liveCounter.draw();
    } else {
      console.log("falló");
      this.game.player.lives -= 1;
      this.game.liveCounter.lives = this.game.player.lives;
      this.game.liveCounter.draw();
    }

    this.game.questionDiv.style.display = "none";
    this.game.start();
  }

  selectAnotherQuestion() {}
}
