// JavaScript source code

const canvas = document.getElementById("catCanvas");
const ctx = canvas.getContext("2d");


function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "blue";
    ctx.fillRect(10, 10, 580, 380);
}

function startGame() {
    setInterval(draw, 10); //redraw every 10 seconds
}

window.addEventListener("load", startGame);


