const possibleQuestions = [
  {
    questionImg: "purpleC",
    correctOption: "C",
    answered: false,
  },
];

class Question {
  constructor(game) {
    this.question = { questionImg: "", correctOption: "C", answered: false };
    //elegir una pregunta random del array
    this.setUpFormListener();
    this.game = game
  }

  setUpFormListener() {
    const form = document.getElementById("form");



    form.onsubmit = (event) => {
      const value = document.getElementById("answer").value; // se almacena el valor del numero que as seleccinado
      event.preventDefault();

      

      this.checkQuestion(value === this.question.correctOption)
    this.question.answered = true;
    };
  }

  checkQuestion(result) {
    if (result === true) {
      console.log("acertó");
    } else {
      console.log("falló");
    }

    this.game.question.style.display = "none";
    this.game.start();
  }

  selectAnotherQuestion() {}
}
