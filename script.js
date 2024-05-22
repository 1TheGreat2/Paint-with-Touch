const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d');
const colorPicker = document.getElementById('colorPicker');
const lineWidthPicker = document.getElementById('lineWidth');
const freehandBtn = document.getElementById('freehand');
const rectangleBtn = document.getElementById('rectangle');
const eraserBtn = document.getElementById('eraser');
const clearCanvasBtn = document.getElementById('clearCanvas');

canvas.width = window.innerWidth - 20;
canvas.height = window.innerHeight - 100;

let painting = false;
let color = '#000000';
let lineWidth = 5;
let currentTool = 'freehand';
let startX, startY;

colorPicker.addEventListener('change', (e) => color = e.target.value);
lineWidthPicker.addEventListener('change', (e) => lineWidth = e.target.value);

freehandBtn.addEventListener('click', () => currentTool = 'freehand');
rectangleBtn.addEventListener('click', () => currentTool = 'rectangle');
eraserBtn.addEventListener('click', () => currentTool = 'eraser');
clearCanvasBtn.addEventListener('click', clearCanvas);

canvas.addEventListener('mousedown', startPainting);
canvas.addEventListener('mouseup', stopPainting);
canvas.addEventListener('mousemove', draw);

function startPainting(e) {
    painting = true;
    startX = e.clientX - canvas.offsetLeft;
    startY = e.clientY - canvas.offsetTop;
    if (currentTool === 'rectangle') {
        ctx.beginPath();
    } else {
        draw(e);
    }
}

function stopPainting() {
    painting = false;
    ctx.closePath();
}

function draw(e) {
    if (!painting) return;

    ctx.lineWidth = lineWidth;
    ctx.lineCap = 'round';

    if (currentTool === 'freehand' || currentTool === 'eraser') {
        ctx.strokeStyle = currentTool === 'eraser' ? '#FFFFFF' : color;
        ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    } else if (currentTool === 'rectangle') {
        let rectX = e.clientX - canvas.offsetLeft;
        let rectY = e.clientY - canvas.offsetTop;
        let width = rectX - startX;
        let height = rectY - startY;
        clearCanvas();
        ctx.strokeStyle = color;
        ctx.strokeRect(startX, startY, width, height);
    }
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}
