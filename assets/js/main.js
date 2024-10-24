window.addEventListener("load", function () {
  const startBtn = document.getElementById("start-btn");
  const board = document.getElementById("game-board");
  const description = document.getElementById("game-description");
  
  const game = new Game(board);

  startBtn.addEventListener("click", function () {
    startBtn.style.display = "none";
    description.style.display = "none";
    game.start();
  });
});
