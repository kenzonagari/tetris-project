const canvas1 = document.getElementById('grid-bg');
const canvas = document.getElementById('grid');
const ctx1 = canvas1.getContext('2d');
const ctx = canvas.getContext('2d');

//* adjust canvas virtual size before drawing
canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;
canvas1.width = canvas1.offsetWidth;
canvas1.height = canvas1.offsetHeight;

const unitX = canvas.width/10; //width-height of one grid in px
const unitY = canvas.height/20; //width-height of one grid in px

let posX=0;
let posY=0;

ctx.scale(unitX,unitY); //* scales up the current drawing
ctx1.scale(unitX,unitY); //* scales up the current drawing



const canvasArray = [ //10 by 20 array
    [0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],
];

console.log(canvas.width, canvas.height, unitX, unitY, canvasArray.length, canvasArray[0].length );

function drawCanvasArray (arr) { //draw transparent grid based on the argument array dimension
    ctx1.strokeStyle = "white";
    ctx1.lineWidth = 1/unitX;

    for (let i = 0; i <= arr[i].length ; i += 1 ){ //draw vertical lines
        ctx1.beginPath();
        ctx1.moveTo(i, 0);  //move to (0,0), (1,0), (2,0), ...
        ctx1.lineTo(i, 20); //draw
        ctx1.stroke();
    }
    
    for (let i = 0; i <= arr.length ; i++ ){ //draw horizontal lines
        ctx1.beginPath();
        ctx1.moveTo(0, i);  //move to (0,0), (0,1), (0,2), ...
        ctx1.lineTo(10, i); //draw
        ctx1.stroke();
    }
}

let pieceArray = [
        // [1,1],      //O-piece
        // [1,1],
        // [1,1,1,1],   //I-piece
        // [0,1,1],    //S-piece
        // [1,1,0],
        // [1,1,0],    //Z-piece
        // [0,1,1],
        // [1,0],      //L-piece
        // [1,0],
        // [1,1],
        // [0,1],      //J-piece
        // [0,1],
        // [1,1],
        [0,0,0],
        [1,1,1],    //T-piece - 0s make space for rotation
        [0,1,0],
];

function restartPos(){
    posX = 4;
    posY = -1;
}

function draw (arr, offsetX,  offsetY, alpha) {
    for (let j = 0; j < arr.length; j++){ //y-axis
        for (let i = 0; i < arr[j].length; i++){ //x-axis
            if(arr[j][i] !== 0){ //arr[y][x] 
                ctx.fillStyle = '#82DFB0';
                ctx.fillRect(i + offsetX, j + offsetY, 1, 1); //x, y, width, height
            } else if (alpha == false){
                ctx.fillStyle = 'black';
                ctx.fillRect(i + offsetX, j + offsetY, 1, 1);
            }
        }
    }
}

function cwRotate(arr){
    let emptyArr = [[0,0,0],[0,0,0],[0,0,0],]
    for (let j = 0; j < arr.length; j++){ //y-axis
        for (let i = 0; i < arr[j].length; i++){ //x-axis
            emptyArr[j][i] = arr[Math.abs(i-(arr.length-1))][j];
        };
    }

    arr = emptyArr.map((element) => {
        return element;
      });

    return arr;
}

function ccwRotate(arr){

    let emptyArr = [[0,0,0],[0,0,0],[0,0,0],]
    
    for (let i = 0; i < arr.length; i++){ //y-axis
        for (let j = 0; j < arr[i].length; j++){ //x-axis
            emptyArr[j][i] = arr[i][Math.abs(j-(arr.length-1))];
        };
    }

    arr = emptyArr.map((element) => {
        return element;
      });

    return arr;
}

function lockPiece (canvasArr, pieceArr, x, y) {
    for (let j = 0; j < pieceArr.length; j++){ //y-axis
        for (let i = 0; i < pieceArr[j].length; i++){ //x-axis
            if(pieceArr[j][i] !== 0){ // for every array in pieceArr that is 1,
                canvasArr[y + j][x + i] = pieceArr[j][i];
                // fill up the corresponding grids in canvasArr (relative to x,y as the base point)
            }
        }
    }
    console.log(canvasArr);
}

function collision (canvasArr, pieceArr, x, y){
    for (let j = 0; j < pieceArr.length; j++){ //y-axis
        for (let i = 0; i < pieceArr[j].length; i++){ //x-axis
            if(
                    (pieceArr[j][i] !== 0 && 
                    ((y+j+1) >= canvasArr.length))     // if piece collides with the bottom end, 
                ||  (pieceArr[j][i] !== 0 && // check grid where the pieceArr is NOT zero
                    canvasArr[y+j+1][x+i] !== 0) // and the canvas grid below that is also NOT zero
                    
            ){ 
                lockPiece(canvasArr, pieceArr, x, y);
                restartPos();
                draw(pieceArray, posX, posY);
                return;
            }
        }
    }
}

function movePiece (dir) {
    ctx.clearRect(0, 0, canvasArray[0].length, canvasArray.length);
    if (dir === "left"){
        if(posX > 0){
            posX--; 
        }
    }
    else if (dir === "up"){
        if(posY >= 0){
            posY--;
        }
    }
    else if (dir === "right"){
        if((posX + pieceArray[0].length) < canvasArray[0].length){
            posX++;
        }
    }
    else if (dir === "down"){
        if(posY < canvasArray.length){
            posY++;
            dropCounter = 0;
        }  
    }
    console.log(dir, 'was pressed', posX, posY);

    // lockPiece(canvasArray, pieceArray, posX, posY);
    draw(canvasArray, 0, 0, alpha=false);
    draw(pieceArray, posX, posY);
    collision(canvasArray, pieceArray, posX, posY);
    
}

let dropCounter = 0;
let dropInterval = 1000;
let lastTime = 0;

function update (time = 0) {
    const deltaTime = time - lastTime;
    lastTime = time;
    //console.log(deltaTime);
    dropCounter += deltaTime;

    if(dropCounter > dropInterval){        
        //movePiece("down");
    }
    requestAnimationFrame(update);
}



drawCanvasArray(canvasArray);
restartPos();
movePiece();
//console.table(canvasArray);
update();

document.addEventListener('keydown', function(event) { //assign function to key input
    if(event.keyCode == 37) { //LEFT
        movePiece("left");
    } 
    else if(event.keyCode == 39) { //RIGHT
        movePiece("right");
    }
    else if(event.keyCode == 40) { //DOWN
        movePiece("down");
    }
});

document.addEventListener('keydown', function(event) { //assign function to key input
    if(event.keyCode == 88) { //x-key
        pieceArray = cwRotate(pieceArray);
        movePiece();
    }
    else if(event.keyCode == 90) { //z-key
        pieceArray = ccwRotate(pieceArray);
        movePiece();
    }
});
