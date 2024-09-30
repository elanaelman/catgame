let textBoxDraw = [		//textbox locations in order: kitchen, easle, couch, computer, bathroom
						// locations are XY pairs starting top left and going
	[296,10,396,10,396,40,296,40]
];
kitchenBox=false; //used to toggle boxes on and off in the future, just here for placeholding rn

// I have set the player task to blank which is nothing, and toggled of the kitchen textbox

class Game {
	animationFrame;
	canvas;
	ctx;
	lastTime;
	apmt;
	name;
	objectList;
	spriteListl;

	constructor(canvas) {
		this.name = 'game';
		this.canvas = canvas;
		this.ctx = canvas.getContext("2d");
		this.ctx.font = "bold 100px serif";
		this.lastTime = window.performance.now();

		this.apmt = new Apmt();
		this.player = this.apmt.player;
		
		this.objectList = this.apmt.getObjectList();
		this.spriteList = this.apmt.getSpriteList();

	}


	start = () => {
		for (const obj of this.objectList) {
			obj.onStart(this.apmt);
		}
		this.main(window.performance.now());

	}


	main = (timeOfAnimationFrame) => {
		//Queue main again for the next screen refresh
		//requestAnimationFrame passes a timestamp to main.
		//Note that this timestamp is not avaialable during the first call to main.
		this.animationFrame = window.requestAnimationFrame(this.main);

		let deltaTime = timeOfAnimationFrame - this.lastTime;
		this.update(deltaTime);
		this.render();
		this.lastTime = timeOfAnimationFrame;

	}

	update = (dTime) => {
		this.apmt.onUpdate(dTime);
		//console.log(this.objectList);
		for (const obj of this.objectList) {
			obj.onUpdate(dTime);
		}

	}

	render = () => {
		//TODO Need to clear selectively instead of whole screen if using moved property
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		if (kitchenBox=true){
			for (let i=0; i<textBoxDraw.length; i++) {
				this.ctx.beginPath();
				this.ctx.moveTo(textBoxDraw[i][0],textBoxDraw[i][1]);
				this.ctx.lineTo(textBoxDraw[i][2],textBoxDraw[i][3]);
				this.ctx.lineTo(textBoxDraw[i][4],textBoxDraw[i][5]);
				this.ctx.lineTo(textBoxDraw[i][6],textBoxDraw[i][7]);
				this.ctx.lineTo(textBoxDraw[i][0],textBoxDraw[i][1]);
				this.ctx.stroke();
			}
		}
		console.log(0);

		this.drawText(this.player);
		
		for (const sprite of this.spriteList) {
			//if (sprite.moved) {
				this.drawSprite(sprite);
				// TODO: images don't show on the first drawSprite call if called too early (something isn't loaded yet?). So I turned this off for now.
			//}
		}
	}

	drawSprite = (sprite) => {
		this.ctx.drawImage(sprite.img, sprite.x, sprite.y, sprite.width, sprite.height);
	}

	drawText = (player) => {
		this.ctx.fillText(player.task.taskText, player.task.x, player.task.y);
	}

	endGame = () => {
		window.cancelAnimationFrame(this.animationFrame);
	}

}



function startGame() {
	let canvas = document.getElementById("catCanvas");
	let game = new Game(canvas);
	game.start();
	console.log('game startd');
}

window.addEventListener("load", startGame);
