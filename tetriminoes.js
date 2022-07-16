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

const piecesColor = ['#00ffff', '#0000ff', '#ff7f00', '#ffff00', '#00ff00', '#800080', '#ff0000'];

function pieceRandomizer(){
    let randomNum = Math.floor(Math.random()*7);
    return randomNum;
}