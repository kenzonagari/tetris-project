//! Initialize 2D drawing of main game canvas

const canvas = document.getElementById('grid');
const ctx = canvas.getContext('2d');

// adjust canvas virtual size before drawing
canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

const unitX = canvas.width/10; //width-height of one grid in px
const unitY = canvas.height/20; //width-height of one grid in px

ctx.scale(unitX,unitY); // scales up the current drawing


//-----------------------------------------------//
//! Declare variables related to main canvas 

let canvasArray = createEmptyArray(10,20); //*set the canvas - an array of width 10 and height 20. Each 'grid' is represented by element 0.
let posX=0; //*posX defines the x-coordinate of where the player is at any given time
let posY=0; //*posY defines the y-coordinate of where the player is at any given time

console.log(canvas.width, canvas.height, unitX, unitY, canvasArray.length, canvasArray[0].length );
//500(px) 1000(px) 50 50 20 10


let piece = piecesArray[0]; 
//*piece represents one tetrimino chosen at random, with each tetrimino represented as an array
//*(see tetriminoes.js for complete list of tetrimino arrays)

//-----------------------------------------------//
//! FUNCTIONS

//* draw input array on the main canvas. Argument alpha is used to decide if '0' elements/cells should be filled with black or not (yes if canvas, no if piece).
function draw (arr, offsetX, offsetY, alpha) { 

    for (let j = 0; j < arr.length; j++){ //y-axis (represented as index j to avoid confusion)
        for (let i = 0; i < arr[j].length; i++){ //x-axis (represented as index i to avoid confusion)
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

//* generate new random piece on top of canvas, at the start of a new game or after every piece collision.
function restartPiece(){ 

    setLevel();
    
    piece = piecesArray[pieceRandomizer()];
    posX = 3;
    posY = 0;

    if(piece[1][1] === 1){ //different y-start for I piece (higher)
        posY = -1;
    } 
    
    if(piece[1][1] === 4) { //different x-start for O piece (centered)
        posX = 4; 
    }

    draw(canvasArray, 0, 0, alpha=false); //draw canvas array on the main canvas
    draw(piece, posX, posY); //draw piece array on the main canvas
}

//* Upon collision, merge piece array into canvas array.
//  (locking the elements of the former into the latter, based on the posX and posY values when collision occurs)
function lockPiece (canvasArr, pieceArr, x, y) {
    for (let j = 0; j < pieceArr.length; j++){ //y-axis
        for (let i = 0; i < pieceArr[j].length; i++){ //x-axis
            if(pieceArr[j][i] !== 0){ // for every array in pieceArr that has non-zero value,
                // fill up the corresponding grids in canvasArr (relative to posX and posY as the base point)
                canvasArr[y + j][x + i] = pieceArr[j][i];
            }
        }
    }
    //console.log(canvasArr); //* <--- uncomment to see the merged canvas array after every collision 
}

//* Check if (vertical) collision happens or not. Returns Boolean value.
function collision (canvasArr, pieceArr, x, y){
    for (let j = 0; j < pieceArr.length; j++){ //y-axis
        for (let i = 0; i < pieceArr[j].length; i++){ //x-axis
            if(
                    (pieceArr[j][i] !== 0 && 
                    ((y+j+1) >= canvasArr.length))      // if piece collides with the bottom end... 
                ||  (pieceArr[j][i] !== 0 &&            // or if a cell within the piece array with a non-zero value finds
                    canvasArr[y+j+1][x+i] !== 0)        // another non-zero cell just below it at the canvas array...
            ){                 
                return true;                            // then vertical collision is TRUE.
            }
        }
    }
    return false;
}

//* Check if horizontal collision happens or not. Returns Boolean value.
function horizontalCollision (canvasArr, pieceArr, x, y){
    for (let j = 0; j < pieceArr.length; j++){ //y-axis
        for (let i = 0; i < pieceArr[j].length; i++){ //x-axis
            if(
                    (pieceArr[j][i] !== 0 && 
                    ((x+i) >= canvasArr[j].length))     // if piece collides with either right...  
                ||  (pieceArr[j][i] !== 0 && 
                    ((x+i) < 0))                        // or left wall...
                ||  (pieceArr[j][i] !== 0 &&            
                    canvasArr[y+j][x+i] !== 0)          // or if the piece overlaps against itself...
            ){                 
                return true;                            // then horizontal collision is TRUE.
            }
        }
    }
    return false;
}

//* Move piece based on direction input, and call relevant functions when collision occurs.
function movePiece (dir) {
    //*clear main canvas
    ctx.clearRect(0, 0, canvasArray[0].length, canvasArray.length);  
    
    if (dir === "left"){
        posX--;
        if ((horizontalCollision(canvasArray, piece, posX, posY)) === true){
        posX++;     //void previous move if horizontal collision is true.    
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
            posX--; //void previous move if horizontal collision is true.
            console.log('horizontal collision');
        }
    }
    
    else if (dir === "down"){
        if(posY < canvasArray.length){
            posY++;
            dropCounter = 0; //reset dropCounter (see function Update below)
        }  
    }
    
    console.log(dir, 'was pressed', posX, posY);

    //* re-draw both canvas array and piece array on the main canvas for every movement made. Is there a faster way?
    draw(canvasArray, 0, 0, alpha=false);
    draw(piece, posX, posY);

    //* if collision occurs,
    if (collision(canvasArray, piece, posX, posY)){ 
        // lockDelay();
        console.log("collision! Drop interval:", dropInterval, "level:", level);    //logs dropInterval and current level (latter determines former)
        logScore(totalScore);                                                       //logs scores from soft drop/move down
        lockPiece(canvasArray, piece, posX, posY);                                  //locks piece to canvas array 
        lineClear(canvasArray);                                                     //check for line clear, mainly

        if(posY <= 1){                                                              //if collision occurs when posY is at the top of the canvas,
            gameOver();                                                             //game is over.
        }

        restartPiece();                                                             //otherwise, generate random piece on top and continue game.
    };
}

//* check for line clear. Call other functions when necessary.
function lineClear (canvasArr) {
    let rowCheck = 0;
    let lineAmount = 0;
    for(let j = 0; j < canvasArr.length ; j++){
        rowCheck = 0;
        for(let i = 0; i < canvasArr[j].length ; i++){      //go through each canvas array row 
            if(canvasArr[j][i] !== 0){                      //if a cell inside the row has non-zero value,
                rowCheck++;                                 //rowCheck +1
            }
            if(rowCheck === 10){                            //if rowCheck = 10 (meaning every single cell in a row is full)
                canvasArr.splice(j,1);                      //remove that row from canvas array
                canvasArr.unshift([0,0,0,0,0,0,0,0,0,0]);   //and add row of empty cells at the top of canvas array
                lineAmount++;                               //lineAmount +1
            }
        }
    }

    score(lineAmount);      //lineAmount has possible values from 0-4. Scoring is determined by lineAmount.
    lineCount(lineAmount);  //so is the case with lineCount

    return canvasArr;
}

// function lockDelay () {
//     setTimeout(() => {
//         console.log("collision! Drop interval:", dropInterval, "level:", level);
//       }, 800);
// }

//* transpose cells of an input array based on clockwise rotation 
function cwRotate(arr){

    let emptyArr = createEmptyArray(arr.length,arr.length); //start with empty array of same dimension as input array

    for (let j = 0; j < arr.length; j++){ //y-axis
        for (let i = 0; i < arr[j].length; i++){ //x-axis
            emptyArr[j][i] = arr[Math.abs(i-(arr.length-1))][j];
        };
    }

    arr = emptyArr.map((element) => {   //and map the values of the empty array back to the input array. This avoids inaccurate transposition 
        return element;
      }); 

    return arr; //return transposed output to input array
}

//* transpose cells of an input array based on counter-clockwise rotation
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

//* create a function that only calls cwRotate() and ccwRotate() under certain conditions.
function rotatePiece(dir){
    if(dir === 'cw'){
        piece = cwRotate(piece);
        if((horizontalCollision(canvasArray, piece, (posX), posY)) === true){  
            piece = ccwRotate(piece);   //void previous rotation if horizontal collision is true.
            console.log("can't. stuck.") 
        }
        movePiece('x');
    } else if (dir === 'ccw'){
        piece = ccwRotate(piece);
        if((horizontalCollision(canvasArray, piece, (posX), posY)) === true){
        piece = cwRotate(piece);    //void previous rotation if horizontal collision is true.
        console.log("can't. stuck.") 
        }
        movePiece('z');
    }
}

//* set what happens when Game is over.
function gameOver () {
    alert("game over!");
    ctx.clearRect(0, 0, canvasArray[0].length, canvasArray.length); //clear main canvas
    canvasArray = createEmptyArray(10,20); //start over canvas array (all cells are zero)
    scoreReset(); //reset score
}

//* start new game when called.
function startPlay(startLevelNum){
    alert(`Starting New Game at Level ${startLevelNum}`);
    startingLevel = startLevelNum;  //set starting level
    ctx.clearRect(0, 0, canvasArray[0].length, canvasArray.length); //clear main canvas
    canvasArray = createEmptyArray(10,20); //start over canvas array (all cells are zero)
    scoreReset();   //reset score
    restartPiece(); //restart piece
    movePiece();    //move piece
    update();       //initiate gravity (see function update below)
}

//-----------------------------------------------//
//! Create auto-drop/gravity mechanism

let dropCounter = 0;
let dropInterval = levelUpTimer();
let lastTime = 0;

function update (time = 0) {
    const deltaTime = time - lastTime;
    lastTime = time;
    //console.log(deltaTime);
    dropCounter += deltaTime;
    dropInterval = levelUpTimer();

    //if dropCounter is added enough to be larger than dropInterval (e.g. dropCounter is larger than dropInterval of 1000ms),
    if(dropCounter > dropInterval){ 
        movePiece("down"); //dropCounter is reset to 0 after this function.
    }
    requestAnimationFrame(update); // call itself recursively
}


//-----------------------------------------------//
//! Initialize keypresses and buttons

$(document).keydown(function (event) {
    if(posY !== -1){
        if(event.which === 88) { //x-key
            rotatePiece('cw');
        }
        else if(event.which === 90) { //z-key
            rotatePiece('ccw');
        }
    }
    
    
        if(event.which === 37) { //LEFT arrow
            movePiece("left");
        } 
        else if(event.which === 39) { //RIGHT arrow
            movePiece("right");
        }
        else if(event.which === 40) { //DOWN arrow
            dropdownScore(); //* add dropdown score every time down key is pressed
            movePiece("down");
        }

});

//* button starts game on click, each with different level start
$('#button0').on('click', () => {startPlay(0)}); //level 0
$('#button1').on('click', () => {startPlay(1)}); //level 1
$('#button2').on('click', () => {startPlay(2)}); //level 2
$('#button3').on('click', () => {startPlay(3)}); //level 3
$('#button4').on('click', () => {startPlay(4)}); //level 4
$('#button5').on('click', () => {startPlay(5)}); //level 5
$('#button6').on('click', () => {startPlay(6)}); //level 6
$('#button7').on('click', () => {startPlay(7)}); //level 7
$('#button8').on('click', () => {startPlay(8)}); //level 8
$('#button9').on('click', () => {startPlay(9)}); //level 9


