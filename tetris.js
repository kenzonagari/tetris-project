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
    ctx1.strokeStyle = "#000";
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

// const callIPiece = (a = 0, b = 0) => {
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//     ctx.beginPath(); //resetPath
//     ctx.rect(a, b, unitX*4, unitY); //x, y, width, height
//     ctx.fillStyle = "red";
//     ctx.stroke();
//     ctx.fill();
// }

const pieceArray = [
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
        [1,1,1],    //T-piece
        [0,1,0],
];

function drawPiece (arr, offsetX,  offsetY) {
    for (let j = 0; j < arr.length; j++){ //y-axis
        for (let i = 0; i < arr[j].length; i++){ //x-axis
            if(arr[j][i] !== 0){ //arr[y][x] 
                ctx.fillStyle = 'blue';
                ctx.fillRect(i + offsetX, j + offsetY, 1, 1); //x, y, width, height
            }
        }
    }
}

function lockPiece (canvasArr, pieceArr, x, y) {
    
    for (let j = 0; j < pieceArr.length; j++){ //y-axis
        for (let i = 0; i < pieceArr[j].length; i++){ //x-axis
            if(pieceArr[j][i] !== 0){ // for every array in pieceArr that is 1,
                canvasArr[j + y][i + x] = pieceArr[j][i]; 
                // fill up the corresponding grids in canvasArr (relative to x,y as the base point)
            }
        }
    }
    console.table(canvasArr);
}

function collision (canvasArr, pieceArr, x, y){
    for (let j = 0; j < canvasArr.length; j++){ //y-axis
        for (let i = 0; i < canvasArr[j].length; i++){ //x-axis
            if(posY + y === 20){ // if canvasArr collides with the bottom end,

            }
        }
    }
}

function movePiece (dir) {
    ctx.clearRect(0, 0, 10, 20);
    if (dir === "left"){
        if(posX > 0){
            posX--; 
        }
    }
    else if (dir === "up"){
        if(posY > 0){
            posY--;
        }
    }
    else if (dir === "right"){
        if(posX < 10){
            posX++;
        }
    }
    else if (dir === "down"){
        if(posY < 20){
            posY++;
            dropCounter = 0;
        }  
    }
    console.log(dir, 'was pressed', posX, posY);

    if (posY === 20){
        collision(canvasArray, pieceArray, posX, posY);
    }
    // lockPiece(canvasArray, pieceArray, posX, posY);
    drawPiece(pieceArray, posX, posY);
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
movePiece();

//lockPiece(canvasArray, pieceArray);
console.table(canvasArray);
update();

document.addEventListener('keydown', function(event) { //assign function to key input
    if(event.keyCode == 37) { //LEFT
        movePiece("left");
    }
    else if(event.keyCode == 38) { //UP
        movePiece("up");
    }
    else if(event.keyCode == 39) { //RIGHT
        movePiece("right");
    }
    else if(event.keyCode == 40) { //DOWN
        movePiece("down");
    }
});
