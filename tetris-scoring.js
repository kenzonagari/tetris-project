let totalScore = 0;
let totalLine = 0;
let level = 0;
const scoreScheme = [(40 * (level + 1)), (100 * (level + 1)), (300 * (level + 1)),	(1200 * (level + 1))];

function score (lineNum) {
    if(lineNum > 0){
        let score = scoreScheme[lineNum-1];
        totalScore += score;
        logScore(totalScore);
    }
    return;
}

function dropdownScore () {
    if(level == 0){
        level = 1;
    }
    totalScore = totalScore + (1*level);
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

    return;
}

function logScore (num) {
    const $score = $('#score');
    $score.html(`Score:<br>${num}`);

    return;
}

function logLineCount (num) {
    const $lineCount = $('#line-count');
    $lineCount.html(`Line Count:<br>${num}`);

    return;
}

function setLevel() {
    level = Math.floor(totalLine/10);
    logLevel(level);    
}

function logLevel (num) {
    const $level = $('#level');
    $level.html(`Level:<br>${num}`);
    return;
}

function levelUp () {
    let timer = 1000/(Math.floor(totalLine/10)+1);
    return timer;
}

