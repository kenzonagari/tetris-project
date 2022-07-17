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

let temp = Math.floor(Math.random()*7);

function pieceRandomizer(){
    
    let randomNum = 0;
    randomNum = temp;

    let randomNum2 = Math.floor(Math.random()*7);
    temp = randomNum2;

    logRandomPiece(piecesArray[temp]);
    return randomNum;
}

function logRandomPiece(num){
    $nextPiece = $('#next-piece');
    $nextPiece.html(`NEXT PIECE<br>${num}`)
    return;
}