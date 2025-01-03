//todo: summary comment 8-)

// I have set the player task to blank which is nothing, and toggled of the kitchen textbox


//Game instantiates objects and runs the game loop.
class Game {
	animationFrame;
	canvas;
	ctx;
	player;
	cats;
	stations;

	manager;

	lastTime;
	name;
	//spriteList;
	// ^ for now, we only draw cats, so I'm using cats also as the list of sprites

	constructor(canvas) {
		//Get screen elements:
		this.name = 'game';
		this.canvas = canvas;
		this.ctx = canvas.getContext("2d");
		this.ctx.font = "bold 100px serif";
		this.lastTime = window.performance.now();

		this.canvas.addEventListener("click", this.onClick);

		//Create game objects:
		//Player
		let lucy = new Player("Lucy", "images/vampire.svg", [100,100]);
		let checkEmail = new Action("Check Email", 1, 0, true, 100, "Email");
		lucy.possibleTasks.push(checkEmail);
		this.player = lucy;
		//Cat
		let hungry = new Cat("Hungry", "images/transCat.png" , [0,0]);
		let eat = new Action("Eat", 0.1, 1, true, 600, "Food");
		let play = new Action("Play", 1, 0, false, 600, "Toy");
		hungry.possibleTasks.push(eat);
		hungry.possibleTasks.push(play);
		this.cats = [hungry];
		//Stations
		let office = new Station("Office");
		let email = new Event(0.1, "Email", office, [26, 250]);
		office.possibleEvents.push(email);
		let kitchen = new Station("Kitchen");
		let food = new Event(0, "Food", kitchen, [216, 40]);
		kitchen.possibleEvents.push(food);
		this.stations = [office, kitchen];
		//Interrupts
		let playerStation = new Station("Player Station");
		let toy = new Event(0, "Toy", playerStation, [0, 0]);
		playerStation.possibleEvents.push(toy);

		

		//todo fix likely bug: player stuck offering toy forever if cat not interested
		document.getElementById("catToy").addEventListener('click', function() {playerStation.addAvailableEvent(toy); hungry.interrupt(toy)});
		document.getElementById("catFood").addEventListener('click', function() {kitchen.addAvailableEvent(food)});

		document.getElementById("checkEmail").addEventListener('click', function() {lucy.attemptAction(checkEmail, email)});

		//Package cats and stations together:
		this.manager = new Manager(this.cats, this.player, this.stations, this.lastTime);

	}

	//Start the game loop!
	start = () => {
		/*
		for (const obj of this.objectList) {
			obj.onStart(this.apmt);
		}
		*/

		this.main(window.performance.now());

	}

	//This is the game loop
	main = (timeOfAnimationFrame) => {
		//Queue main again for the next screen refresh
		//requestAnimationFrame passes a timestamp to main.
		this.animationFrame = window.requestAnimationFrame(this.main);

		let deltaTime = Math.max(0, timeOfAnimationFrame - this.lastTime);
		this.manager.onUpdate(deltaTime);
		this.render();
		this.lastTime = timeOfAnimationFrame;

	}

	//todo: all graphics stuff. no idea what still works here
	render = () => {
		//TODO Should ideally clear selectively instead of whole screen, redraw only when necessary
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		this.drawSprite(this.player.sprite);
		
		for (const cat of this.cats) {
			//if (sprite.moved) {
				this.drawSprite(cat.sprite);
				// TODO: images don't show on the first drawSprite call if called too early (something isn't loaded yet?). So I turned this off for now.
			//}
		}
		/*for (const player of this.player) {
			if 
		}*/
	}


	drawSprite = (sprite) => {
		this.ctx.drawImage(sprite.image, sprite.x, sprite.y, sprite.width, sprite.height);
	}

	drawText = (player) => {
		this.ctx.fillText(player.task.taskText, player.task.x, player.task.y);
		console.log(player.task.name);
	}

	//Stop the game loop
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
