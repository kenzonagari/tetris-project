//-----------------------------------------------//
//! 

let totalScore = 0;
let totalLine = 0;
let startingLevel = 0;
let level = 0;
const scoreScheme = [(40 * (level + 1)), (100 * (level + 1)), (300 * (level + 1)),	(1200 * (level + 1))];

function score (lineNum) {
    if(lineNum > 0){
        let score = scoreScheme[lineNum-1];
        totalScore += score;
        logScore(totalScore);
    }
}

function dropdownScore () {
    let dropdownValue = 0;
    if(level == 0){
        dropdownValue = 1;
    } else {
        dropdownValue = level;
    }
    totalScore += dropdownValue;
}

function lineCount (lineNum) {
    if(lineNum > 0){
        totalLine += lineNum;
        logLineCount(totalLine);
    }
}

function scoreReset () {
    totalScore = 0;
    totalLine = 0;
    logScore(totalScore);
    logLineCount(totalLine);
}

function logScore (num) {
    const $score = $('#score');
    $score.html(`SCORE<br>${num}`);
}

function logLineCount (num) {
    const $lineCount = $('#line-count');
    $lineCount.html(`LINES<br>${num}`);
}

function setLevel() {
    level = Math.floor(totalLine/10) + startingLevel;
    logLevel(level);    
}

function logLevel (num) {
    const $level = $('#level');
    $level.html(`LEVEL<br>${num}`);
}

function levelUpTimer () {
    let timer = 2000/(level+1);
    return timer;
}

