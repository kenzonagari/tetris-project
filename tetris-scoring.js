let totalScore = 0;
let totalLine = 0;
let level = 19;
const scoreScheme = [(40 * (level + 1)), (100 * (level + 1)), (300 * (level + 1)),	(1200 * (level + 1))];

function score (lineNum) {
    if(lineNum > 0){
        let score = scoreScheme[lineNum-1];
        totalScore += score;
        logScore(totalScore);
    }
    return;
}

function lineCount (lineNum) {
    if(lineNum > 0){
        totalLine += lineNum;
        logLineCount(totalLine);
    }
    return;
}

function scoreReset () {
    totalScore = 0;
    totalLine = 0;
    logScore(totalScore);
    logLineCount(totalLine);
}

function logScore (num) {
    const $score = $('#score');
    $score.html(`Score:<br>${num}`);
}

function logLineCount (num) {
    const $lineCount = $('#line-count');
    $lineCount.html(`Line Count:<br>${num}`);
}

//  function dropdownScore () {

//  }