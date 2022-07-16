const canvas1 = document.getElementById('grid-bg');
const ctx1 = canvas1.getContext('2d');

canvas1.width = canvas1.offsetWidth;
canvas1.height = canvas1.offsetHeight;

ctx1.scale(unitX,unitY); //* scales up the current drawing

function drawCanvasArray (arr) { //draw transparent grid based on the argument array dimension
    ctx1.strokeStyle = "white";
    ctx1.lineWidth = 1/unitX;

    for (let i = 0; i <= arr[i].length ; i += 1 ){ //draw vertical lines
        ctx1.beginPath();
        ctx1.moveTo(i, 0);  //move to (0,0), (1,0), (2,0), ...
        ctx1.lineTo(i, 20); //draw
        ctx1.stroke();
    }
    
    for (let i = 0; i <= arr.length ; i++ ){ //draw horizontal lines
        ctx1.beginPath();
        ctx1.moveTo(0, i);  //move to (0,0), (0,1), (0,2), ...
        ctx1.lineTo(10, i); //draw
        ctx1.stroke();
    }
}

drawCanvasArray(canvasArray);

