//-----------------------------------------------//
//! Initialize piecesArray

const piecesArray = [
    [[0,0,0,0],   //I-piece
    [1,1,1,1],
    [0,0,0,0],
    [0,0,0,0]],

    [[2,0,0],      //J-piece
    [2,2,2],
    [0,0,0]],

    [[0,0,3],      //L-piece
    [3,3,3],
    [0,0,0]],

    [[4,4],      //O-piece
    [4,4]],

    [[0,5,5],    //S-piece
    [5,5,0],
    [0,0,0]],

    [[0,6,0],
    [6,6,6],    //T-piece - 0s make space for rotation
    [0,0,0]],

    [[7,7,0],    //Z-piece
    [0,7,7],
    [0,0,0]]
];

const piecesColor = ['#72C1F5', '#096CAF', '#E07E20', '#ffd350', '#a7c64f', '#a43e6f', '#c84c52'];

//---------------------------------------------//
//! RANDOMIZE CURRENT AND NEXT PIECE

let temp = Math.floor(Math.random()*7);

function pieceRandomizer(){
    
    let randomNum = 0;
    randomNum = temp;

    let randomNum2 = Math.floor(Math.random()*7);
    temp = randomNum2;

    logNextPiece(piecesNextGrid[temp]);
    
    return randomNum;
}

//---------------------------------------------//
//! DRAW NEXT PIECE

const piecesNextGrid = [
    [[0,0,0,0,0,0],   //I-piece
    [0,0,0,0,0,0],
    [0,1,1,1,1,0],
    [0,0,0,0,0,0]],

    [[0,0,0,0,0,0],      //J-piece
    [0,2,0,0,0,0],
    [0,2,2,2,0,0],
    [0,0,0,0,0,0]],

    [[0,0,0,0,0,0],      //L-piece
    [0,0,0,3,0,0],
    [0,3,3,3,0,0],
    [0,0,0,0,0,0]],

    [[0,0,0,0,0,0],      //O-piece
    [0,0,4,4,0,0],
    [0,0,4,4,0,0],
    [0,0,0,0,0,0]],    

    [[0,0,0,0,0,0],      //S-piece
    [0,0,5,5,0,0],
    [0,5,5,0,0,0],
    [0,0,0,0,0,0]],  

    [[0,0,0,0,0,0],      //T-piece
    [0,0,6,0,0,0],
    [0,6,6,6,0,0],
    [0,0,0,0,0,0]], 

    [[0,0,0,0,0,0],      //Z-piece
    [0,7,7,0,0,0],
    [0,0,7,7,0,0],
    [0,0,0,0,0,0]], 
];

const $nextPieceGrid = $('#container-next-piece');

const nextGridArray = createEmptyArray(6, 4);

function logNextPiece(arr){

    $nextPieceGrid.empty();

    for (let j = 0 ; j < nextGridArray.length; j++){
        for (let i = 0 ; i < nextGridArray[j].length ; i++){
            
            const $nextPieceSquare = $('<div>').addClass("piece-square");

            if(arr[j][i] !== 0){
                    $nextPieceGrid.append($nextPieceSquare.css('background',piecesColor[(arr[2][2]-1)]));
                } else {
                    $nextPieceGrid.append($nextPieceSquare.addClass("blank"));
                }
        }
    }
}