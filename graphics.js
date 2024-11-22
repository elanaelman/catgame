let testXY = [300,200];

class Sprite {
	img;
	x;
	y;
	width;
	height;
	ready;
	moved;

	destination; //in pixels
	speed; //pixels per millisecond

	constructor(img_name, x, y, width, height) {
		this.img = new Image();
		this.img.src = "images/" + img_name;
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.ready = false;
		this.moved = true;
		this.pitPat = new Audio('walking.mp3');
	}
	
	move(deltaTime) {
/*		if ((this.destination != null) && (this.speed != 0)) {
			let dir = direction(this.x, this.y, this.destination[0], this.destination[1]);
			let nextX = this.x + (dir[0] * this.speed * deltaTime);
			let nextY = this.y + (dir[1]*this.speed*deltaTime);
			
			if (distance(this.x, this.y, this.destination[0], this.destination[1])
				<= distance(this.x, this.y, nextX, nextY)) {
				//Stop at the destination if we would overshoot it.
				this.x = this.destination[0];
				this.y = this.destination[1];
				this.destination = null;

			} else {
				this.x = nextX;
				this.y = nextY;
			}
			this.moved = true;
*/
		if (this.destination != null) {
			this.pitPat.play();
			setTimeout(updatePOS(),750);
			} else {
			this.moved = false;
		}
	}

	updatePos() {
		this.x = this.destination[0];
		this.y = this.destination[1];
	}
	
	onUpdate(deltaTime) {
		//this.move(deltaTime);
	}

	setDestination(x, y) {
		this.destination = [x, y];
	}

	setSpeed(speed) {
		this.speed = speed;
	}
	
	//If a subclass calls onUpdate(deltaTime), that function should call the super.OnUpdate().
}

class TaskBox {
	constructor(taskText, textBoxX, textBoxY, buttonText, regionID, onclick) {
		this.taskText = taskText; 
		this.textBoxX = textBoxX;
		this.textBoxY = textBoxY;
		this.buttonText = buttonText;
		this.regionID = regionID; //what is this for?
		this.onclick = onclick;
	}
}

class PlayerSprite extends Sprite {
	constructor() {
		
		super("vampire.svg", 0, 0, 50, 50);
		this.name = "Player";
/*
		this.textBoxList = {
			"testBoxX": [100],
			"testBoxY": [200]
		}

		this.kitchenText = {
			"kitchenTextX": [291],
			"kitchenTextY": [35]
		}

		this.taskList = {
			"blank":["",0,0,"blank"],
			"testTask":["hello world",this.textBoxList.testBoxX,this.textBoxList.testBoxY,"testTask"],
			"makeCoffee":["*Yawn...* I could sure use a cup of coffee.",this.textBoxList.kitchenTextX,this.textBoxList.kitchenTextY,"makeCoffee"]
		}


		this.toDoList = [];
*/
		this.h=true;
		console.log('player constructed');
	}


	onStart() {
		this.setDestination(100, 100);
		this.setSpeed(0.1);
		
	}

	onUpdate(deltaTime) {
		
	}
	

}

class Task extends Ghost{
	taskText;
	x;
	y;
	name;
	buttonEffect;
	coordinates;
	buttonText;

	constructor(task) {
		super();
		this.taskText=task[0];
		this.x=task[1];
		this.y=task[2];
		this.name=task[3];
	
	
	}

	executeTestTask = () => {
		console.log("executing testTask");
	}

}


class CatSprite extends Sprite {
	constructor(name) {

		super("transCat.png", 0, 0, 50, 50);

		this.name = name;
		this.color = randomColor();
	}

/*
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

	clumsyBathroom = () => {

	}

	clumsyEasle = () => {

	}

	crankyComp = () => {

	}

	crankyCouch = () => {

	}

	hungryFood = () => {
		//start moving to kitchen
		//create player task 'Hungry wants food' at the kitchen
	}

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
	sneazyEasle = () => {

	}

	stinkyBathroom = () => {

	}
*/
	onUpdate = () => {
		//read toDoList and do it
	}
}


class StationSprite {
	constructor(name, task, x, y, width, height) {
		this.name = name;
		this.task = task;
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
	}

	onUpdate(deltaTime) {
		//let seed = randInt(100);
	}

	playerTask = () => {
		console.log(this.name,'has an alert!');
		// pass task to player
	}

}

/*
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
		else if (id==98){
			picky.toDoList.push(pickyFood());
		}
		else if (id==97) {
			screamy.toDoList.push(screamyFood());
		}
		if (id==96) {
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
		if (id==99) {
			stinky.toDoList.push(stinkyBathroom());
		}
		else if (id==98){
			clumsy.toDoList.push(clumsyBathroom());
		}
		if (id==97) {
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
		if (id==99) {
			lazy.toDoList.push(lazyComp());
		}
		else if (id==98){
			cranky.toDoList.push(crankyComp());
		}
		else if (id==97) {
			needy.toDoList.push(needyComp());
		}
		if (id==96) {
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
		if (id==99) {
			lazy.toDoList.push(lazyEasle());
		}
		else if (id==98){
			sneazy.toDoList.push(sneazyEasle());
		}
		else if (id==97) {
			clumsy.toDoList.push(clumsyEasle());
		}
		if (id==96) {
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
		if (id==99) {
			lazy.toDoList.push(lazyCouch());
		}
		else if (id==98){
			cranky.toDoList.push(crankyCouch());
		}
		else if (id==97) {
			needy.toDoList.push(needyCouch());
		}
		if (id==96) {
			sneaky.toDoList.push(sneakyCouch());
		}
	}
}
*/






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
