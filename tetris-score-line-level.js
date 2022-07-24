//-----------------------------------------------//
//! Set variables for score, line, and level

let totalScore = 0;
let totalLine = 0;
let startingLevel = 0;
let level = 0;
let highScores = [0,0,0,0,0,0,0,0,0,0];
//set score scheme for 1-4 line count
const scoreScheme = [(40 * (level + 1)), (100 * (level + 1)), (300 * (level + 1)),	(1200 * (level + 1))];

//-----------------------------------------------//
//! FUNCTIONS

//* calculate score
function score (lineNum) {
    if(lineNum > 0){
        let score = scoreScheme[lineNum-1];
        totalScore += score;
        logScore(totalScore);
    }
}

//* add score when Move Down is pressed
function dropdownScore () {
    let dropdownValue = 0;
    if(level == 0){
        dropdownValue = 1;
    } else {
        dropdownValue = level;
    }
    totalScore += dropdownValue;
}

//* calculate total lines burned/scored
function lineCount (lineNum) {
    if(lineNum > 0){
        totalLine += lineNum;
        logLineCount(totalLine);
    }
}

//* calculate level (starting level + 1 for every 10 lines burned)
function setLevel() {
    level = Math.floor(totalLine/10) + startingLevel;
    logLevel(level);    
}

//* reset score and line count (when game is over or when a new game starts)
function scoreReset () {
    totalScore = 0;
    totalLine = 0;
    level = 0;
    $nextPieceGrid.empty(); //empty Next Piece div
    logScore(totalScore);
    logLineCount(totalLine);
    logLevel(level);
}

//* display score
function logScore (num) {
    const $score = $('#score');
    $score.html(`SCORE<br>${num}`);
}

//* display line count
function logLineCount (num) {
    const $lineCount = $('#line-count');
    $lineCount.html(`LINES<br>${num}`);
}

//* display level
function logLevel (num) {
    const $level = $('#level');
    $level.html(`LEVEL<br>${num}`);
}

//* calculate how fast/how slow pieces move down, based on level
function levelUpTimer () {
    let timer = 2000/(level+1);
    return timer;
}

function recordScore () {
    highScores.push(totalScore);
    highScores.sort(function(a, b){return b-a}); //sort descending
    highScores.pop();
    logHighScores(highScores); 
}

function logHighScores (arr) {
    $("#ol-high-scores").empty();
    for (let i = 0 ; i < arr.length ; i++){
        const $li = $('<li>').text(arr[i]);
        $("#ol-high-scores").append($li);
    }
}
