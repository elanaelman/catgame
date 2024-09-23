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



class Player extends Sprite {
	constructor(x, y) {
		super("vampire.svg", x, y, 50, 50);
	}

	goDo() {
		//go to the place you click
	}
}

class Cat extends Sprite {
	constructor(name, station) {

		super("cat.svg", station.x, station.y, 50, 50);

		this.name = name;
		this.station = station;
		this.color = randomColor();
		this.toDoList = [this.wander()];
	}

	wander() {
		//lorum ipsum blah blah
	}

	onUpdate() {
		//raed toDoList and do it
	}
}


class Apmt {
	constructor() {
		//station objects
		const kitchen = new Kitchen('Kitchen', [], 0, 0, 50, 50);
		const bathroom = new Station('Bathroom', [], 50, 0, 50, 50);
		const computer = new Station('Computer', [], 100, 0, 50, 50);
		const easle = new Station('Easle', [], 150, 0, 50, 50);
		const couch = new Station('Couch', [], 200, 0, 50, 50);

		this.stationList = [kitchen, bathroom, computer, easle, couch];

		//cats object
		const hungry = new Cat('Hungry', kitchen);
		const lazy = new Cat('Lazy', couch);
		const cranky = new Cat('Cranky', computer);
		const needy = new Cat('Needy', computer);
		const screamy = new Cat('Screamy', kitchen);
		const stinky = new Cat('Stinky', bathroom);
		const clumsy = new Cat('Clumsy', easle);
		const sneazy = new Cat('Sneazy', bathroom);
		const sneaky = new Cat('Sneaky', easle);
		const picky = new Cat('Picky', couch);
		this.catList = [hungry, lazy, cranky, needy, screamy, stinky, clumsy, sneazy, sneaky, picky];

		//test
		//		this.hungryList=[];
	}
}


class Station {
	constructor(name,task, x, y, width, height) {
		this.name = name;
		this.task = task;
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
	}
	playerTask() {
		console.log(this.name,'has an alert!');
		// pass task to player
	}

	onUpdate() {
		let seed=randInt(100);
	}

}

class Kitchen extends Station{
	constructor(name,taskListCat, x, y, width, height) {
		super(name, x, y, width, height);
		//this.taskListCat=[hungryFood,pickyFood,screamyFood,sneakyKitchen];

		//Testing
		let seed = 99;
		sendTask(seed);
	}

	sendTask(id){
		if (id = 99) {
			hungryFood();
		}
		else if (id = 98) {
			pickyFood();
		}
		else if (id = 97) {
			screamyFood();
		}
		else if (id = 96) {
			sneakyKitchen();
		}
	}

	hungryFood(){
		hungryList.push('hungryFood');
	}

	pickyFood(){
		pickyList.push('pickyFood');
	}

	screamyFood(){
		screamyList.push('screamyFood');
	}

	sneakyHide(){
		sneakyList.push('sneakyKitchen')
	}
}


class Bathroom extends Station{
	constructor(name, taskListCat, x, y, width, height) {
		super(name, x, y, width, height);
	}
	
}


class Computer extends Station{
	constructor(name, taskListCat, x, y, width, height) {
		super(name, x, y, width, height);
	}
	
}


class Easle extends Station{
	constructor(name, taskListCat, x, y, width, height) {
		super(name, x, y, width, height);
	}
	
}


class Couch extends Station{
	constructor(name, taskListCat, x, y, width, height) {
		super(name, x, y, width, height);
	}
	
}






function randInt(max) {
	let value = Math.floor(Math.random() * max);
	return value;
}

function randomColor(){
	let colorType = Math.floor(Math.random()*3);
	switch(colorType) {
		case 0: return 'orange'; break;
		case 1:	return 'black'; break;
		case 2: return 'white'; break;
	}
}
