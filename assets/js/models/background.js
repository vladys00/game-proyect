class Background {
    constructor(board){
        this.board = board;
        this.width = this.board.clienWidth;
        this.height = this.board.clientHeight;
        this.x = 0;
        this.y = 0;

        this.element = document.createElement("img");
        this.element.setAttribute("src", "../../assets/img/sand.jpg")
        this.element.className = "background";
        this.element.style.position = "absolute";
        this.element.style.objectFit = "cover";
    }

    draw(){
        this.element.style.width = this.width +"px";
        this.element.style.height = this.height + "px";
        this.element.style.left = this.x + "px";
        this.element.style.bottom = this.y + "px";
    
        this.board.appendChild(this.element);

    }


}