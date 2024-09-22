// JavaScript source code

const canvas = document.getElementById("catCanvas");
const ctx = canvas.getContext("2d");

screen = new Screen(canvas, ctx, [new Player(300, 200, 50, 50)]);

function draw() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "blue";
    ctx.fillRect(320, 20, 50, 50);
    screen.onUpdate();
}

function startGame() {
    setInterval(draw, 10); //redraw every 10 seconds

    apmt = new Apmt();
    screen = new Screen(canvas, ctx, apmt.catList.concat([new Player(300, 200, 50, 50)]));

    alert(apmt.catList[0].name);
}


window.addEventListener("load", startGame);


