let textBoxDraw = [		//textbox locations in order: kitchen, easle, couch, computer, bathroom
						// locations are XY pairs starting top left and going
	[296,10,396,10,396,40,296,40]
];
kitchenBox=true; //used to toggle boxes on and off in the future, just here for placeholding rn

// I have set the player task to blank which is nothing, and toggled of the kitchen textbox

class Game {
	animationFrame;
	canvas;
	ctx;

	cats;
	stations;

	manager;

	lastTime;
	name;
	spriteList;

	constructor(canvas) {
		this.name = 'game';
		this.canvas = canvas;

		this.ctx = canvas.getContext("2d");
		this.ctx.font = "bold 100px serif";
		this.lastTime = window.performance.now();

		this.canvas.addEventListener("click", this.onClick);

		this.spriteList = [];

		let hungry = new Cat("Hungry");
		let eat = new Action("Eat", 0.5, 1, true, false, "Food");
		hungry.possibleTasks.push(eat);
		this.cats = [hungry];

		let office = new Station("Office");
		let kitchen = new Station("Kitchen");
		let food = new Event(0.01, "Food");
		kitchen.possibleEvents.push(food);
		let email = new Event(0.01, "Email");
		office.possibleEvents.push(email);
		this.stations = [office, kitchen];

		this.manager = new Manager(this.cats, this.stations, this.lastTime);

	}


	start = () => {
		/*
		for (const obj of this.objectList) {
			obj.onStart(this.apmt);
		}
		*/

		this.main(window.performance.now());

	}


	main = (timeOfAnimationFrame) => {
		//Queue main again for the next screen refresh
		//requestAnimationFrame passes a timestamp to main.
		this.animationFrame = window.requestAnimationFrame(this.main);

		let deltaTime = timeOfAnimationFrame - this.lastTime;
		this.manager.onUpdate(deltaTime);
		this.render();
		this.lastTime = timeOfAnimationFrame;

	}

	render = () => {
		//TODO Need to clear selectively instead of whole screen if using moved property
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		if (kitchenBox=true){
			this.drawTextBox(textBoxDraw);
		}

		//this.drawText(this.player);
		
		for (const sprite of this.spriteList) {
			//if (sprite.moved) {
				this.drawSprite(sprite);
				// TODO: images don't show on the first drawSprite call if called too early (something isn't loaded yet?). So I turned this off for now.
			//}
		}
	}


	onClick = () => {

		//Identify objects under mouse


	}


	drawSprite = (sprite) => {
		this.ctx.drawImage(sprite.img, sprite.x, sprite.y, sprite.width, sprite.height);
	}

	drawText = (player) => {
		this.ctx.fillText(player.task.taskText, player.task.x, player.task.y);
	}

	drawTextBox = (textBoxDraw) => {
		for (let i = 0; i < textBoxDraw.length; i++) {
			this.ctx.beginPath();
			this.ctx.moveTo(textBoxDraw[i][0], textBoxDraw[i][1]);
			this.ctx.lineTo(textBoxDraw[i][2], textBoxDraw[i][3]);
			this.ctx.lineTo(textBoxDraw[i][4], textBoxDraw[i][5]);
			this.ctx.lineTo(textBoxDraw[i][6], textBoxDraw[i][7]);
			this.ctx.lineTo(textBoxDraw[i][0], textBoxDraw[i][1]);
			this.ctx.stroke();
		}
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
