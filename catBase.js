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
	constructor(name,station,apmt) {

		super("cat.svg", station.x, station.y, 50, 50);

		this.name = name;
		this.station = station;
		this.color = randomColor();
		this.toDoList = [this.wander()];
		this.apmt=apmt
	}

	wander() {
		let room=apmt.stationList[randInt(5)];
		//start moving your xy coordinates to dest room xy coordinates
	}

/*	clumsyBathroom() {

	}

	clumsyEasle() {

	}

	crankyComp() {

	}

	crankyCouch() {

	}
*/
	hungryFood() {
		//start moving to kitchen
		//create player task 'Hungry wants food' at the kitchen
	}
/*
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
*/
	sneakyKitchen() {
		//move to kitchen and disapear
		//create invisible top-priority task at kitchen 'sneaky suprise'
		//create visible text at center of screen after 30 seconds 'where's sneaky'
	}

	sneakyBathroom() {
		//move to bathroom and disapear
		//create invisible top-priority task at bathroom 'sneaky suprise'
		//create visible text at center of screen after 30 seconds 'where's sneaky'

	}

	sneakyEasle() {
		//move to easle and disapear
		//create invisible top-priority task at easle 'sneaky suprise'
		//create visible text at center of screen after 30 seconds 'where's sneaky'

	}

	sneakyComp() {
		//move to computer and disapear
		//create invisible top-priority task at computer 'sneaky suprise'
		//create visible text at center of screen after 30 seconds 'where's sneaky'

	}

	sneakyCouch() {
		//move to couch and disapear
		//create invisible top-priority task at couch 'sneaky suprise'
		//create visible text at center of screen after 30 seconds 'where's sneaky'

	}
/*
	sneazyEasle() {

	}

	stinkyBathroom() {

	}
*/
	onUpdate() {
		//read toDoList and do it
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
	constructor(name,catList, x, y, width, height) {
		super(name, x, y, width, height);
		this.catList=[hungry,picky,screamy,sneaky];
	//	 this.player=player    IDK how to actually do this but we need to get the player object like we get the cats in the line above
		let hungry=this.catList[0];
		let picky=this.catList[1];
		let screamy=this.catList[2];
		let sneaky=this.catList[3];
		let food=0;
	}
	sendTask(id){
		if (id==99) {
			hungry.toDoList.push(hungryFood());
		}
/*		else if (id==98){
			picky.toDoList.push(pickyFood());
		}
		else if (id==97) {
			screamy.toDoList.push(screamyFood());
		}
*/		if (id==96) {
			sneaky.toDoList.push(sneakyKitchen());
		}
		if (true) {
<<<<<<< HEAD
			food=food+1
=======
			food=food+1;
>>>>>>> a6b37217fd025019e64c9f96b7b6f5b42264fd60
			if (food%200==0) {
				player.toDoList.push(ohNom());
			}
		}
	}
}


class Bathroom extends Station{
	constructor(name, taskListCat, x, y, width, height) {
		super(name, x, y, width, height);
		this.catList=[stinky,clumsy,sneaky];

		let stinky=this.catList[0];
		let clumsy=this.catList[1];
		let sneaky=this.catList[2];
		let teeth=-100;
	}

	sendTask(id){
/*		if (id==99) {
			stinky.toDoList.push(stinkyBathroom());
		}
		else if (id==98){
			clumsy.toDoList.push(clumsyBathroom());
		}
*/		if (id==97) {
			sneaky.toDoList.push(sneakyBathroom());
		}
		else if (true)
			teeth=teeth+1;
			else if (teeth%200==0) {
				player.toDoList.push(brushyBrushy());
			}
	}
}


class Computer extends Station{
	constructor(name, taskListCat, x, y, width, height) {
		super(name, x, y, width, height);
		this.catList=[lazy,cranky,needy,sneaky];
		let lazy=this.catList[0];
		let cranky=this.catList[1];
		let needy=this.catList[2];
		let sneaky=this.catList[3];
	}





	sendTask(id){
/*		if (id==99) {
			lazy.toDoList.push(lazyComp());
		}
		else if (id==98){
			cranky.toDoList.push(crankyComp());
		}
		else if (id==97) {
			needy.toDoList.push(needyComp());
		}
*/		if (id==96) {
			sneaky.toDoList.push(sneakyComp());
		}
	}
}


class Easle extends Station{
	constructor(name, taskListCat, x, y, width, height) {
		super(name, x, y, width, height);
		this.catList=[lazy,sneazy,clumsy,sneaky];

		let lazy=this.catList[0];
		let sneazy=this.catList[1];
		let clumsy=this.catList[2];
		let sneaky=this.catList[3];
	}

	sendTask(id){
/*		if (id==99) {
			lazy.toDoList.push(lazyEasle());
		}
		else if (id==98){
			sneazy.toDoList.push(sneazyEasle());
		}
		else if (id==97) {
			clumsy.toDoList.push(clumsyEasle());
		}
*/		if (id==96) {
			sneaky.toDoList.push(sneakyEasle());
		}
	}
}


class Couch extends Station{
	constructor(name, taskListCat, x, y, width, height) {
		super(name, x, y, width, height);
		this.catList=[lazy,cranky,needy,sneaky];

		let lazy=this.catList[0];
		let cranky=this.catList[1];
		let needy=this.catList[2];
		let sneaky=this.catList[3];
	}

	sendTask(id){
/*		if (id==99) {
			lazy.toDoList.push(lazyCouch());
		}
		else if (id==98){
			cranky.toDoList.push(crankyCouch());
		}
		else if (id==97) {
			needy.toDoList.push(needyCouch());
		}
*/		if (id==96) {
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


alert('test');
