let testXY = [300,200];

class Ghost {
	apmt;


	//Subclasses should call super.onStart() at the END of their onStart functions.
	onStart(apmt) {
		this.apmt = apmt;
		this.ready = true;
	}

	//Every Ghost object must define an onUpdate(deltaTime) function.
	//Every Ghost must assign to apmt
}

class Sprite extends Ghost {
	img;
	x;
	y;
	width;
	height;
	ready;
	moved;

	destination; //in pixels
	speed; //pixels per millisecond

	constructor(img_name, color, width, height, apmt) {
		super();
		this.img = new Image();
		this.img.src = "images/" + img_name;
		this.width = width;
		this.height = height;
		this.ready = false;
		this.moved = true;
	}

	//Subclasses should call super.onStart() at the END of their onStart functions.
	onStart(x, y, apmt) {
		this.x = x;
		this.y = y;
		super.onStart(apmt);
	}

	move(deltaTime) {
		if ((destination != null) && (speed != 0)) {

			let dir = direction(this.x, this.y, this.destination.x, this.destination.y);
			let nextX = this.x + (dir[0]*speed);
			let nextY = this.y + (dir[1]*speed);
			
			if (distance(this.x, this.y, this.destination.x, this.destination.y)
				<= distance(this.x, this.y, nextX, nextY)) {
				//Stop at the destination if we would overshoot it.
				this.x = destination.x;
				this.y = destination.y;
				this.destination = null;
			} else {
				this.x += dir[0] * speed;
				this.y += dir[1] * speed;
			}
			this.moved = true;
		} else {
			this.moved = false;
		}
	}

	onUpdate(deltaTime) {
		this.move(deltaTime);
	}
	
	//If a subclass calls onUpdate(deltaTime), that function should call the super.OnUpdate().
}


class Player extends Sprite {
	constructor() {
		super("vampire.svg", 50, 50);
		this.direction = "right";
		let textBoxList = {
			"testTask": [830 - 534, 10]
		}
		let taskList = {
			"testTask":["hello world",this.testButtonEffect,textBoxList.testTask,"kitchenButton"]
		}
		let toDoList = [];
	}

	//NOTE hi alex! Please see the 'move' function in Sprite. 
	//We should probably add a 'goTo' function to Sprite which sets destination and speed(?).
	goTo = (position) => {
		let pitPat =
			this.x = position[0];
		this.y = position[1];
		/*
				let dist = deltaTime * 0.1;
		
		
				if (this.x < 0) {
					this.direction = "right";
				}
				else if (this.x > 200) {
					this.direction = "left";
				}
		
				if (this.direction == "left") {
					this.x -= dist;
				} else {
					this.x += dist;
				}
				this.moved = true;
				//translate to position, position should be a list of x and y coordinates.
		*/
	}

	onUpdate = () => {

		//this.goTo(position)

//		ping();

		//this.createTask(this.toDoList);
	}

	goDo = () => {
		//goTo(the place you click);
	}

	createTask = (toDos) => {
		let text = toDos[0][0];
		let effect = toDos[0][1];
		let textbox = toDos[0][2];
		let button = toDos[0][3];

		cxt.fillText(text,textbox[0],textbox[1]);
		document.getElementByID(button).onClick = effect;
	}

/*
	ping = () => {		//listens for other things to tell it to do something
		let inbound = //any strings that have been sent for the player
		for (let i=0; i<inbound.length; i++) {
			toDoList.push(inbound[i]);
		}
	}
*/
	testButtonEffect = () => {
		let textbox = taskList.toDos[0][2];
		ctx.fillText("button!",textbox[0],textbox[1]);
	}

}


class Cat extends Sprite {
	constructor(name) {

		super("cat.jpg", 50, 50);

		this.name = name;
		this.color = randomColor();
		this.toDoList = [];
	}
	

	onUpdate = (deltaTime) => {
		//do some stuff
	}

	addTask = (trigger) => {
		switch (trigger) {
			case "Test":
				testPush();
			case "Easle":
				sneakyComp();
				break;
			case "Food":
				hungryFood();
		}
	}

	wander = () => {
		let room=this.apmt.stationList[randInt(5)];
		//start moving your xy coordinates to dest room xy coordinates
	}

	testPush = () => {
		goTo(testXY);
		push("testFunctionPlayer");
		goTo([0,0]);
	}

/*	clumsyBathroom = () => {

	}

	clumsyEasle = () => {

	}

	crankyComp = () => {

	}

	crankyCouch = () => {

	}
*/
	hungryFood = () => {
		//start moving to kitchen
		//create player task 'Hungry wants food' at the kitchen
	}
/*
	lazyComp = () => {

	}

	lazyCouch = () => {

	}

	needyComp = () => {

	}

	needyCouch = () => {

	}

	pickyFood = () => {

	}

	screamyFood = () => {

	}
*/
	sneakyKitchen = () => {
		//move to kitchen and disapear
		//create invisible top-priority task at kitchen 'sneaky suprise'
		//create visible text at center of screen after 30 seconds 'where's sneaky'
	}

	sneakyBathroom = () => {
		//move to bathroom and disapear
		//create invisible top-priority task at bathroom 'sneaky suprise'
		//create visible text at center of screen after 30 seconds 'where's sneaky'

	}

	sneakyEasle = () => {
		//move to easle and disapear
		//create invisible top-priority task at easle 'sneaky suprise'
		//create visible text at center of screen after 30 seconds 'where's sneaky'

	}

	sneakyComp = () => {
		//move to computer and disapear
		//create invisible top-priority task at computer 'sneaky suprise'
		//create visible text at center of screen after 30 seconds 'where's sneaky'

	}

	sneakyCouch = () => {
		//move to couch and disapear
		//create invisible top-priority task at couch 'sneaky suprise'
		//create visible text at center of screen after 30 seconds 'where's sneaky'

	}
/*
	sneazyEasle = () => {

	}

	stinkyBathroom = () => {

	}
*/
	onUpdate = () => {
		//read toDoList and do it
	}
}


class Apmt {
	catList;
	stationList;
	player;

	constructor() {
		this.player = new Player(0, 0);

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

		//


		//test
		//		this.hungryList=[];
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
}


class Station extends Ghost{
	constructor(name, task, x, y, width, height) {
		super();
		this.name = name;
		this.task = task;
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
	}
	playerTask = () => {
		console.log(this.name,'has an alert!');
		// pass task to player
	}

	onUpdate = () => {
		let seed=randInt(100);
	}

}


class Kitchen extends Station {
	constructor(name,catList, x, y, width, height) {
		super(name, x, y, width, height);
		this.catList=catList;
	//	 this.player=player    IDK how to actually do this but we need to get the player object like we get the cats in the line above
		let hungry=this.catList[0];
		let picky=this.catList[1];
		let screamy=this.catList[2];
		let sneaky=this.catList[3];
		let food=0;
	}
	sendTask = (id) => {
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
			food=food+1;
			if (food%200==0) {
				player.toDoList.push(ohNom());
			}
		}
	}
}


class Bathroom extends Station{
	constructor(name, catList, x, y, width, height) {
		super(name, x, y, width, height);
		this.catList=catList;

		let stinky=this.catList[0];
		let clumsy=this.catList[1];
		let sneaky=this.catList[2];
		let teeth=-100;
	}

	sendTask = (id) => {
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
	constructor(name, catList, x, y, width, height) {
		super(name, x, y, width, height);
		this.catList=catList;
		let lazy=this.catList[0];
		let cranky=this.catList[1];
		let needy=this.catList[2];
		let sneaky=this.catList[3];
	}





	sendTask = (id) => {
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
	constructor(name, catList, x, y, width, height) {
		super(name, x, y, width, height);
		this.catList=catList;

		let lazy=this.catList[0];
		let sneazy=this.catList[1];
		let clumsy=this.catList[2];
		let sneaky=this.catList[3];
	}

	sendTask = (id) => {
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
	constructor(name, catList, x, y, width, height) {
		super(name, x, y, width, height);
		this.catList=catList;

		let lazy=this.catList[0];
		let cranky=this.catList[1];
		let needy=this.catList[2];
		let sneaky=this.catList[3];
	}

	sendTask = (id) => {
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

alert("I compiled!");
