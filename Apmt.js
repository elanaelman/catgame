class Apmt {
	catList;
	stationList;
	player;
	taskCooldown;
	timeSinceLastTask;

	constructor() {

		this.taskCooldown = 100;
		this.timeSinceLastTask = 0;
		
		//player
		this.player = new Player();
		this.player.task = new Task('text',100,200);
		//cats object
		const hungry = new Cat('Hungry');
		const lazy = new Cat('Lazy');
		const cranky = new Cat('Cranky');
		const needy = new Cat('Needy');
		const screamy = new Cat('Screamy');
		const stinky = new Cat('Stinky');
		const clumsy = new Cat('Clumsy');
		const sneazy = new Cat('Sneazy');
		const sneaky = new Cat('Sneaky');
		const picky = new Cat('Picky');
		this.catList = [hungry, lazy, cranky, needy, screamy, stinky, clumsy, sneazy, sneaky, picky];

		//station objects
		const kitchen = new Kitchen('Kitchen', [hungry, picky, screamy, sneaky], 0, 0, 50, 50);
		const bathroom = new Station('Bathroom', [stinky, clumsy, sneaky], 50, 0, 50, 50);
		const computer = new Station('Computer', [lazy, cranky, needy, sneaky], 100, 0, 50, 50);
		const easle = new Station('Easle', [lazy, sneazy, clumsy, sneaky], 150, 0, 50, 50);
		const couch = new Station('Couch', [lazy, cranky, needy, sneaky], 200, 0, 50, 50);
		this.stationList = [kitchen, bathroom, computer, easle, couch];



		//test
		//		this.hungryList=[];
	}

	onUpdate = (deltaTime) => {
		this.timeSinceLastTask += deltaTime;
		if (this.timeSinceLastTask > this.eventCooldown) {
			this.timeSinceLastTask %= this.eventCoolDown;
			generateTask();
			alert("hi");
		}
	}

	getObjectList = () => {
		return this.catList.concat(this.stationList, [this.player]);
	}

	getSpriteList = () => {
		return this.catList.concat([this.player]);
	}

	randomRoom = () => {
		return this.stationList[randint(5)];
	}


	generateTask = () => {
		let options = this.player.taskList;
		let task = options[randInt(options.length)];
		this.player.addTodo(task);
	}
}