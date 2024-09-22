class Station {
	constructor(name,task) {
	this.name = name;
	}
	task() {
		console.log(this.name,'has an alert!');
	}
}

class Sprite {

}

class Cat {
	constructor(name,station) {
		this.name = name;
		this.station = station;
		this.color = randomColor();
	}
}

class Player {
	constructor(){
	}

	goDo() {
		go to the place you click
	}
}

const kitchen = new Station('Kitchen');
const bathroom = new Station('Bathroom');
const computer = new Station('Computer');
const easle = new Station('Easle');
const couch = new Station('Couch');

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
 


function randomColor(){
	let colorType = Math.floor(Math.random()*3);
	switch(colorType) {
		case 0: return 'orange'; break;
		case 1:	return 'black'; break;
		case 2: return 'white'; break;
	}
}

alert(Hungry.name);


