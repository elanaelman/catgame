//todo: summary comment 8-)

// I have set the player task to blank which is nothing, and toggled of the kitchen textbox


//global variables: cats, stations, player

//cats:
let hungry = new Cat("Hungry", "images/transCat.png" , [0,0]);
let sleepy = new Cat("Sleepy", "images/transCat.png", [0,0]);
let cats = [hungry, sleepy];

//stations:
let office = new Station("Office", "images/email.jpg", [26, 250], false);
let kitchen = new Station("Kitchen", "images/email.jpg", [216, 40], false);
let stations = [office, kitchen];

//player:
let lucy = new Player("Lucy", "images/vampire.svg", [100,100]);


//Game instantiates objects and runs the game loop.
class Game {
	animationFrame;
	canvas;
	ctx;

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
		let checkEmail = new Action("Check Email", 1, 0, true, 100, "Email", "Sleep");
		lucy.possibleTasks.push(checkEmail);
		//Cat
		let eat = new Action("Eat", 0.1, 1, true, 6000, "Food", null);
		let play = new Action("Play", 1, 0, false, 6000, "Toy", null);
		let sleep = new Action("Sleep", 1, 1, false, 60000, null, null);
		//todo: when hungry, eat food if available, otherwise bother lucy
		hungry.possibleTasks.push(eat);
		hungry.possibleTasks.push(play);
		sleepy.possibleTasks.push(sleep);
		//Stations
		let email = new Event(0.1, "Email", office);
		office.possibleEvents.push(email);
		let food = new Event(0, "Food", kitchen);
		kitchen.possibleEvents.push(food);
		//Interrupts
		let playerStation = new Station("Player Station", [], [0, 0]);
		let toy = new Event(0, "Toy", playerStation);
		playerStation.possibleEvents.push(toy);

		

		//todo fix likely bug: player stuck offering toy forever if cat not interested
		document.getElementById("catToyHungry").addEventListener('click', function() {playerStation.addAvailableEvent(toy); hungry.interrupt(toy)});
		document.getElementById("catToySleepy").addEventListener('click', function() {playerStation.addAvailableEvent(toy); sleepy.interrupt(toy)});
		document.getElementById("catFood").addEventListener('click', function() {kitchen.addAvailableEvent(food)});	

		document.getElementById("checkEmail").addEventListener('click', function() {lucy.attemptAction(checkEmail, email)});

		//Package cats and stations together:
		this.manager = new Manager(cats, lucy, stations, this.lastTime);

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
		this.drawSprite(lucy.sprite);
		for (const station of stations) {
			if (station.toggle == 1) {
				this.drawSprite(station.sprite);
			}
		}
			
		
		for (const cat of cats) {
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
