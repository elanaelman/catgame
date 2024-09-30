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
