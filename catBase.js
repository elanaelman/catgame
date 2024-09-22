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

	clumsyBathroom() {

	}

	clumsyEasle() {

	}

	crankyComp() {

	}

	crankyCouch() {

	}

	hungryFood() {

	}

	lazyComp() {

	}

	lazyCouch() {

	}

	needyComp() {

	}

	needyCouch() {

	}

	pickyFood() {

	}

	screamyFood() {

	}

	sneakyKitchen() {

	}

	sneakyBathroom() {

	}

	sneakyEasle() {

	}

	sneakyComp() {

	}

	sneakyCouch() {

	}

	sneazyEasle() {

	}

	stinkyBathroom() {

	}

	onUpdate() {
		//read toDoList and do it
	}
}


class Apmt {
	constructor() {
		//station objects
		const kitchen = new Station('Kitchen');
		const bathroom = new Station('Bathroom');
		const computer = new Station('Computer');
		const easle = new Station('Easle');
		const couch = new Station('Couch');

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
		this.task = task
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

class kitchen extends Station{
	constructor(name,catList) {
		super(name);
		this.catList=[hungry,picky,screamy,sneaky];

		let hungry=this.catList[0];
		let picky=this.catList[1];
		let screamy=this.catList[2];
		let sneaky=this.catList[3];
	}

	sendTask(id){
		if (id = 99) {
			hungry.toDoList.push(hungryFood());
		}
		else if (id = 98){
			picky.toDoList.push(pickyFood());
		}
		else if (id = 97) {
			screamy.toDoList.push(screamyFood());
		}
		else if (id = 96) {
			sneaky.toDoList.push(sneakyKitchen());
		}
	}
}


class bathroom extends Station{
	constructor(name,catList) {
		super(name);
		this.catList=[stinky,clumsy,sneaky];

		let stinky=this.catList[0];
		let clumsy=this.catList[1];
		let sneaky=this.catList[2];
	}

	sendTask(id){
		if (id = 99) {
			stinky.toDoList.push(stinkyBathroom());
		}
		else if (id = 98){
			clumsy.toDoList.push(clumsyBathroom());
		}
		else if (id = 97) {
			sneaky.toDoList.push(sneakyBathroom());
		}
	}
}


class computer extends Station{
	constructor(name,catList) {
		super(name);
		this.catList=[lazy,cranky,needy,sneaky];

		let lazy=this.catList[0];
		let cranky=this.catList[1];
		let needy=this.catList[2];
		let sneaky=this.catList[3];
	}

	sendTask(id){
		if (id = 99) {
			lazy.toDoList.push(lazyComp());
		}
		else if (id = 98){
			cranky.toDoList.push(crankyComp());
		}
		else if (id = 97) {
			needy.toDoList.push(needyComp());
		}
		else if (id = 96) {
			sneaky.toDoList.push(sneakyComp());
		}
	}
}


class easle extends Station{
	constructor(name,catList) {
		super(name);
		this.catList=[lazy,sneazy,clumsy,sneaky];

		let lazy=this.catList[0];
		let sneazy=this.catList[1];
		let clumsy=this.catList[2];
		let sneaky=this.catList[3];
	}

	sendTask(id){
		if (id = 99) {
			lazy.toDoList.push(lazyEasle());
		}
		else if (id = 98){
			sneazy.toDoList.push(sneazyEasle());
		}
		else if (id = 97) {
			clumsy.toDoList.push(clumsyEasle());
		}
		else if (id = 96) {
			sneaky.toDoList.push(sneakyEasle());
		}
	}
}


class couch extends Station{
	constructor(name,catList) {
		super(name);
		this.catList=[lazy,cranky,needy,sneaky];

		let lazy=this.catList[0];
		let cranky=this.catList[1];
		let needy=this.catList[2];
		let sneaky=this.catList[3];
	}

	sendTask(id){
		if (id = 99) {
			lazy.toDoList.push(lazyCouch());
		}
		else if (id = 98){
			cranky.toDoList.push(crankyCouch());
		}
		else if (id = 97) {
			needy.toDoList.push(needyCouch());
		}
		else if (id = 96) {
			sneaky.toDoList.push(sneakyCouch());
		}
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
