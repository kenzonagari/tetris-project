let totalScore = 0;
let totalLine = 0;
const scoreScheme = [(40 * (level + 1)), (100 * (level + 1)), (300 * (level + 1)),	(1200 * (level + 1))];

function score (lineNum) {
    if(lineNum > 0){
        let score = scoreScheme[lineNum-1];
        totalScore += score;
        const $score = $('#score');
        $score.html(`Score:<br>${totalScore}`);
    }
    return;
}

 function lineCount (lineNum) {
    if(lineNum > 0){
        totalLine += lineNum;
        const $lineCount = $('#line-count');
        $lineCount.html(`Line Count:<br>${totalLine}`);
    }
    return;
 }