class Player {
    constructor(board) {
        this.board = board;
        this.x = this.board.clientWidth / 2;
        this.yFloor = MAIN_FLOOR;
        this.y =  this.yFloor;
       
        this.sx = 5;
        this.sy = 5;
        this.width = 80;
        this.height = 50;
        this.eventListeners()

        //Here we write the code like if we were in adding elements in HTML or styles with CSS
        this.element = document.createElement("img");
        this.element.setAttribute("src", "../../assets/img/character.png")
        this.element.className = "player";
        this.element.style.position = "absolute";
       
        this.movements = {
            up: false,
            down: false,
            right: false,
            left: false,
        };

    }
    draw(){
        this.element.style.width = this.width + "px";
        this.element.style.height = this.height + "px";
        this.element.style.left = this.x + "px";
        this.element.style.bottom = this.y + "px";
    
        this.board.appendChild(this.element);
    }

    eventListeners(){
        window.addEventListener("keydown", (event)=> {
            switch (event.key){
                case "ArrowUp":
                    this.movements.up = true;
                    break;
                case "ArrowDown":
                    this.movements.down = true;
                    break;
                case "ArrowLeft":
                        this.movements.left = true;
                        break;
                case "ArrowRight":
                        this.movements.right = true;
                        break;
            }

        });

        window.addEventListener("keyup", (event)=> {
            switch (event.key){
                case "ArrowUp":
                    this.movements.up = false;
                    break;
                case "ArrowDown":
                    this.movements.down = false;
                    break;
                case "ArrowLeft":
                        this.movements.left = false;
                        break;
                case "ArrowRight":
                        this.movements.right = false;
                        break;
            }

        });


    
    }

    move(){
        if (this.movements.up){
            this.y += this.sy;
        } else if (this.movements.down){
            this.y -= this.sy;
        }

        if (this.movements.left){
            this.x -= this.sx;
        } else if (this.movements.right){
            this.x += this.sx;
        }
        
    }
}

//Here we are "drawing", each time this styles will be applied to our player