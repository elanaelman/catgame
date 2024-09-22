class Screen {
	constructor(canvas, context, spriteList) {
		this.canvas = canvas;
		this.context = context;
		this.spriteList = spriteList;
	}

	drawObject(img, x, y, width, height) {
		ctx.drawImage(img, x, y, width, height);
	}

	onUpdate() {
		for (const sprite of this.spriteList) {
			this.drawObject(sprite.img, sprite.x, sprite.y, sprite.width, sprite.height);
		}
	}
}

class Station {
	constructor(name,task, x, y, width, height) {
		this.name = name;
		this.task = task;
	}
	playerTask() {
		console.log(this.name,'has an alert!');
		// pass task to player
	}

	onUpdate() {
		let seed=randInt(100);
	}

}

class kitchen extends Station{
	constructor(name,taskListCat) {
		super(name);
		//this.taskListCat=[hungryFood,pickyFood,screamyFood,sneakyKitchen];
	}
	let seed = 99;
	sendTask(seed);

	function sendTask(id){
		if (id=99){
			hungryFood();
		}
		else if (id=98){
			pickyFood();
		}
		else if (id=97){
			screamyFood();
		}
		else if (id=96){
			sneakyKitchen();
		]
	}

	function hungryFood(){
		hungryList.push('hungryFood');
	}

	function pickyFood(){
		pickyList.push('pickyFood');
	}

	function screamyFood(){
		screamyList.push('screamyFood');
	}

	function sneakyHide(){
		sneakyList.push('sneakyKitchen')
	}
}


class bathroom extends Station{
	
}


class computer extends Station{
	
}


class easle extends Station{
	
}


class couch extends Station{
	
}

function randInt(max) {
	let value=Math.floor(Math.random()*max);
	return value;
}

class Apmt {
	constructor {
		//station objects
		const kitchen = new Station('Kitchen');
		const bathroom = new Station('Bathroom');
		const computer = new Station('Computer');
		const easle = new Station('Easle');
		const couch = new Station('Couch');
		const this.stationList = [kitchen, bathroom, computer, easle, couch];

		//cats object
		const hungry = new Cat('Hungry',kitchen);
		const lazy = new Cat('Lazy',couch);
		const cranky = new Cat('Cranky',computer);
		const needy = new Cat('Needy',computer);
		const screamy = new Cat('Screamy',kitchen);
		const stinky = new Cat('Stinky',bathroom);
		const clumsy = new Cat('Clumsy',easle);
		const sneazy = new Cat('Sneazy',bathroom);
		const sneaky = new Cat('Sneaky',easle);
		const picky = new Cat('Picky',couch);
		this.catList = [hungry, lazy, cranky, needy, screamy, stinky, clumsy, sneazy, sneaky, picky];

		//test
//		this.hungryList=[];
	}
}

class Sprite {
	constructor(img_name, x, y, width, height) {
		this.img = new Image();
		this.img.src = img_name;
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		//TODO add moved flag
	}

	//kitchen: 320, 20, 50, 50
}

class Cat {
	constructor(name,station) {
		this.name = name;
		this.station = station;
		this.color = randomColor();
		this.toDoList = [wander()];
	}

	function wander() {
		//lorum ipsum blah blah
	}

	function onUpdate() {
		//raed toDoList and do it
	}
}

class Player extends Sprite {
	constructor(x, y, width, height) {
		super("vampire.svg", x, y, width, height);
	}

	goDo() {
		//go to the place you click
	}
}



function randomColor(){
	let colorType = Math.floor(Math.random()*3);
	switch(colorType) {
		case 0: return 'orange'; break;
		case 1:	return 'black'; break;
		case 2: return 'white'; break;
	}
}

alert(hungry.name);
