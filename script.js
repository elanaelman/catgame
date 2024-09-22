// JavaScript source code

const canvas = document.getElementById("catCanvas");
const ctx = canvas.getContext("2d");

apmt = new Apmt();
player = new Player(300, 200, 50, 50);
spriteList = this.apmt.catList.concat([this.player]);
screen = new Screen(canvas, ctx, this.spriteList);

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "blue";
    ctx.fillRect(320, 20, 50, 50);

    for (const sprite of this.spriteList) {
        ctx.drawImage(sprite.img, sprite.x, sprite.y, sprite.width, sprite.height);
        alert(sprite.x);
    }

}

draw();




