
var gameboardId = document.getElementById("gameboard");
var PlayerPosition={
    X : 0,
    Y : 0,
};
var goals; 
var maxGoals

function move(x, y){
    let nextTile = document.getElementById((PlayerPosition.X+x) + "," + (PlayerPosition.Y+y));
    let currentTile = document.getElementById(PlayerPosition.X + "," + PlayerPosition.Y);
    let blockNextTile = document.getElementById((PlayerPosition.X+x*2) + "," + (PlayerPosition.Y+y*2));

    if(nextTile.classList.contains(Entities.Block)){        
        if(!(blockNextTile.classList.contains(Tiles.Wall)||blockNextTile.classList.contains(Entities.Block)
            ||blockNextTile.classList.contains(Entities.BlockDone))){            
            
                if(blockNextTile.classList.contains(Tiles.Goal)){
                blockNextTile.classList.add(Entities.BlockDone);
                goals++;
            }
            else{
                blockNextTile.classList.add(Entities.Block);
            }
            nextTile.classList.remove(Entities.Block);
            nextTile.classList.add(Entities.Character);
            currentTile.classList.remove(Entities.Character);
            PlayerPosition.X+=x;
            PlayerPosition.Y+=y;
        }
    }
    else if(nextTile.classList.contains(Entities.BlockDone)){
        if(!(blockNextTile.classList.contains(Entities.Block)||blockNextTile.classList.contains(Entities.BlockDone)
            ||blockNextTile.classList.contains(Tiles.Wall))){

            if(blockNextTile.classList.contains(Tiles.Goal)){
                blockNextTile.classList.add(Entities.BlockDone);                
            }
            else {  //Empty
                blockNextTile.classList.add(Entities.Block);
                goals--;
            }
            nextTile.classList.remove(Entities.BlockDone);
            nextTile.classList.add(Entities.Character);
            currentTile.classList.remove(Entities.Character);
            PlayerPosition.X+=x;
            PlayerPosition.Y+=y;
        }
    
    }
    else if(nextTile.classList.contains(Tiles.Space)|| nextTile.classList.contains(Tiles.Goal)){
        nextTile.classList.add(Entities.Character);
        currentTile.classList.remove(Entities.Character);
        PlayerPosition.X+=x;
        PlayerPosition.Y+=y;
    }
    document.getElementById("score").innerHTML=goals;
    if(goals==maxGoals){
        document.getElementById("gameboard").innerHTML="Du vann!";
    }
}

function readKey(key){
    key.preventDefault();
    switch (key.keyCode){
        case 37:  //left
            move(-1, 0);
            break;
        case 38:  //up
            move(0 , -1);
            break;
        case 39:  //right
            move(1, 0);
            break;
        case 40:  //down
            move(0, 1);
            break;
    }

}

function init(){
    window.addEventListener("keydown",readKey);
    drawBoard();
}

function drawBoard(){
    goals=0;
    maxGoals = 0;
    document.getElementById("score").innerHTML=goals;
    let gameboardId = document.getElementById("gameboard");
    gameboardId.innerHTML="";
    console.log(Tiles.Wall);
    console.log(Entities.Character);
    
    for(let col = 0 ; col < tileMap01.height ; col++){
        for(let row = 0 ; row < tileMap01.width ; row++){
            let node = document.createElement("div");
            node.classList.add("tile-all");
            node.id = "" + row + ',' + col;
            element = tileMap01.mapGrid[col][row].toString();
            
            switch(element){
                case 'W':
                    node.classList.add(Tiles.Wall);
                    
                    break;
                case ' ':
                    node.classList.add(Tiles.Space);
                    
                    break;
                case 'B':
                    node.classList.add(Entities.Block);
                    node.classList.add(Tiles.Space);
                    break;
                case 'P':
                    node.classList.add(Entities.Character);
                    node.classList.add(Tiles.Space);
                    PlayerPosition.X = row;
                    PlayerPosition.Y = col;
                    break;
                case 'G':
                    node.classList.add(Tiles.Goal);
                    maxGoals++;
                    break;
                default :
                    break;                 
            }
            gameboardId.appendChild(node);
        }
    }
  }