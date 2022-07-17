// console.log($);

const canvas = document.getElementById('grid');
const ctx = canvas.getContext('2d');

//* adjust canvas virtual size before drawing
canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

const unitX = canvas.width/10; //width-height of one grid in px
const unitY = canvas.height/20; //width-height of one grid in px

let posX=0;
let posY=0;

ctx.scale(unitX,unitY); //* scales up the current drawing

function createEmptyArray (w, h) {
    let arr = [];

    for (let i = 0 ; i < h ; i++){
        arr.push(new Array(w).fill(0))
    }

    return arr;
}

let canvasArray = createEmptyArray(10,20);

console.log(canvas.width, canvas.height, unitX, unitY, canvasArray.length, canvasArray[0].length );



let piece = piecesArray[0];

function restartPiece(){

    setLevel();
    
    piece = piecesArray[pieceRandomizer()];
    posX = 3;
    posY = 0;

    if(piece[1][1] === 1){ //different y start for I piece
        posY = -1;
    } 
    
    if(piece[1][1] === 4) { //different x start for O piece
        posX = 4; 
    }

    draw(canvasArray, 0, 0, alpha=false);
    draw(piece, posX, posY);
}

function draw (arr, offsetX,  offsetY, alpha) {
    for (let j = 0; j < arr.length; j++){ //y-axis
        for (let i = 0; i < arr[j].length; i++){ //x-axis
            if(arr[j][i] !== 0){ //arr[y][x] 
                ctx.fillStyle = piecesColor[arr[j][i]-1];
                ctx.fillRect(i + offsetX, j + offsetY, 1, 1); //x, y, width, height
            } else if (alpha == false){
                ctx.fillStyle = 'black';
                ctx.fillRect(i + offsetX, j + offsetY, 1, 1);
            }
        }
    }
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
    //console.log(canvasArr);
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
                return true;
            }
        }
    }
    return false;
}

function horizontalCollision (canvasArr, pieceArr, x, y){
    for (let j = 0; j < pieceArr.length; j++){ //y-axis
        for (let i = 0; i < pieceArr[j].length; i++){ //x-axis
            if(
                    (pieceArr[j][i] !== 0 && 
                    ((x+i) >= canvasArr[j].length))     // if piece collides with either left...  
                ||  (pieceArr[j][i] !== 0 && 
                    ((x+i) < 0))                         // or right wall...
                ||  (pieceArr[j][i] !== 0 && // check that the piece will not overlap against itself
                    canvasArr[y+j][x+i] !== 0)
            ){                 
                return true;
            }
        }
    }
    return false;
}

function movePiece (dir) {
    ctx.clearRect(0, 0, canvasArray[0].length, canvasArray.length);  
    
    if (dir === "left"){
        posX--;
        if ((horizontalCollision(canvasArray, piece, posX, posY)) === true){
        posX++;    
        console.log('horizontal collision');
        }
    }
    
    else if (dir === "up"){
        if(posY >= 0){
            posY--;
        }
    }
    
    else if (dir === "right"){
        posX++;
        if ((horizontalCollision(canvasArray, piece, posX, posY)) === true){
            console.log('horizontal collision');
            posX--;
        }
    }
    
    else if (dir === "down"){
        if(posY < canvasArray.length){
            posY++;
            dropCounter = 0;
        }  
    }
    
    console.log(dir, 'was pressed', posX, posY);

    draw(canvasArray, 0, 0, alpha=false);
    draw(piece, posX, posY);

    if (collision(canvasArray, piece, posX, posY)){ 
        //lockDelay();
        logScore(totalScore); //scores from soft drop
        
        console.log("collision! Drop interval:", dropInterval, "level:", level);
        lockPiece(canvasArray, piece, posX, posY);
        gameOver();
        lineClear(canvasArray);
        
        restartPiece();
    };
}

function lineClear (canvasArr) {
    let rowCheck = 0;
    let lineAmount = 0;
    for(let j = 0; j < canvasArr.length ; j++){
        rowCheck = 0;
        for(let i = 0; i < canvasArr[j].length ; i++){
            if(canvasArr[j][i] !== 0){
                rowCheck++;
            }
            if(rowCheck === 10){
                canvasArr.splice(j,1);
                canvasArr.unshift([0,0,0,0,0,0,0,0,0,0]);
                lineAmount++;
            }
        }
    }

    score(lineAmount);
    lineCount(lineAmount);

    return canvasArr;
}

function lockDelay () {
    setTimeout(() => {
        console.log('oh....hai!');
      }, 1000)
}

function cwRotate(arr){

    let emptyArr = createEmptyArray(arr.length,arr.length);

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

    let emptyArr = createEmptyArray(arr.length,arr.length);
    
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

function rotatePiece(dir){

    if(dir === 'cw'){
        piece = cwRotate(piece);
        if((horizontalCollision(canvasArray, piece, (posX), posY)) === true){
            piece = ccwRotate(piece);
            console.log("can't. stuck.") 
        }
    } else if (dir === 'ccw'){
        piece = ccwRotate(piece);
        if((horizontalCollision(canvasArray, piece, (posX), posY)) === true){
        piece = cwRotate(piece);
        console.log("can't. stuck.") 
        }
    }
    movePiece();
}

function gameOver () {
    if(posY <= 1){
        console.log("game over!");
        ctx.clearRect(0, 0, canvasArray[0].length, canvasArray.length);
        canvasArray = createEmptyArray(10,20);
        scoreReset();
    }
}

$(document).keydown(function (event) {
    if(posY !== -1){
        if(event.which === 88) { //x-key
            rotatePiece('cw');
        }
        else if(event.which === 90) { //z-key
            rotatePiece('ccw');
        }
    }
    
    
        if(event.which === 37) { //LEFT
            movePiece("left");
        } 
        else if(event.which === 39) { //RIGHT
            movePiece("right");
        }
        else if(event.which === 40) { //DOWN
            dropdownScore();
            movePiece("down");
        }

});

let dropCounter = 0;
let dropInterval = levelUp();
let lastTime = 0;

function update (time = 0) {
    const deltaTime = time - lastTime;
    lastTime = time;
    //console.log(deltaTime);
    dropCounter += deltaTime;
    dropInterval = levelUp();

    if(dropCounter > dropInterval){        
        movePiece("down");
    }
    requestAnimationFrame(update);
}

restartPiece();
movePiece();
update();
