const myCanvas = document.getElementById("myCanvas");
const context = myCanvas.getContext("2d");

let isErasing = false;
let isDrawing = false;
let lastX = 0;
let lastY = 0;

const clearButton = document.getElementById('clearButton');
clearButton.addEventListener('click', clearCanvas);

const eraseButton = document.getElementById("eraserButton");
eraseButton.addEventListener('click', toggleEraser);

myCanvas.addEventListener('mousedown', handleMouseDown);
myCanvas.addEventListener('mousemove', handleMouseMove);
myCanvas.addEventListener('mouseup', handleMouseUp);
myCanvas.addEventListener('mouseout', handleMouseOut);

function handleMouseDown(e) {
    const canvasRect = myCanvas.getBoundingClientRect();
    isDrawing = true;
    lastX = e.clientX - canvasRect.left;
    lastY = e.clientY - canvasRect.top;
}

function handleMouseMove(e) {
    if (!isDrawing) return;
    
    const currentX = e.offsetX;
    const currentY = e.offsetY;
    
    context.strokeStyle = isErasing ? 'white' : 'black';
    context.lineWidth = 5;
    context.lineCap = 'round';
    
    context.beginPath();
    context.moveTo(lastX, lastY);
    context.lineTo(currentX, currentY);
    context.stroke();
    
    lastX = currentX;
    lastY = currentY;
}

function handleMouseUp() {
    isDrawing = false;
}

function handleMouseOut() {
    isDrawing = false;
}

function clearCanvas() {
    context.clearRect(0, 0, myCanvas.width, myCanvas.height);
}

function toggleEraser() {
    isErasing = !isErasing;
    
    if (isErasing) {
        isDrawing = false;
        context.globalCompositeOperation = 'destination-out';
    } else {
        context.globalCompositeOperation = 'source-over';
    }
}