class Game {
    constructor(board){
        this.board = board;
        this.background = new Background(this.board);
        this.player = new Player(this.board);
    }

    start(){
        setInterval(()=>{
            this.draw();
            this.move();

            //this.cleanUp()

        }, 1000 / 60)
    }

   move (){
    this.player.move();
    //this.background.move()
   }

    draw(){
        this.background.draw();
        this.player.draw();
    }
}