//This file defines core classes: Manager, Ghost, Cat, Action, Station, Event.
//We can probably rename this file to objects.js. I suck at planning. lmk what you think


//Set to false to shut off console messages.
//Note that I cleaned this upp so it doesn't flood now :) --Elana
let debug = true;


//Manager keeps lists of cats and stations, and updates each cat and station each tick.
//It coordinates between cats and stations.
class Manager {
	cats;
	player;
	stations;
	startTime;

	constructor(cats, player, stations, startTime) {
		this.cats = cats;
		this.player = player;
		this.stations = stations;
		this.startTime = startTime;
		if (debug) {
			console.log("Manager constructed");
		}
	}

	onUpdate(deltaTime) {

		for (const station of this.stations) {
			station.generateEvents(deltaTime);
		}

		this.player.onUpdate(deltaTime);

		for (const cat of this.cats) {
			cat.onUpdate(deltaTime);

			cat.generateTodos(deltaTime);

			if (cat.currentAction == null) {
				this.findCatsNextAction(cat);
			}
		}
	}

	findCatsNextAction(cat) {
		//This is disgusting, sorry. Complexity is total events * actions...
		//We could improve this by sorting both lists with, like, any metric, 
		//	then using a binary search. That should bring it down to linear.
		//	(Timing is irrelevant for this small a game, it just hurts my pride.) 
		for (const action of cat.todos) {
			if (isIndependent(action)) {
				cat.setCurrentAction(action, null);
				return;
			} else {
				for (const station of this.stations) {

					let match = station.availableEvents.find(event => actionMatchesEvent(action, event) || (action.matchesEvent == null));

					if (match != undefined) {
						cat.setCurrentAction(action, match);
						return;
					}
				}
			}
		}
	}

}


//Action represents a task cats may take on, including frequency, duration, and triggering event.
class Action {
	//set on construction:
	name;
	probability;
	priority;
	retainedOnInterrupt;	//whether this returns to the todo list if interrupted
	totalTime; //in seconds
	finished;
	matchesEvent;
	preventedBy;

	//set when this becomes a cat's currentAction:
	matchedEvent;	
	elapsedTime;

	//todo: remove retainedOnInterrupt
	constructor(name, probability, priority, retainedOnInterrupt, totalTime, matchesEvent, preventedBy) {
		this.name = name;
		this.probability = probability;
		this.priority = priority;
		this.retainedOnInterrupt = retainedOnInterrupt;
		this.totalTime = totalTime;
		this.matchesEvent = matchesEvent;
		this.preventedBy = preventedBy;
	}

	beginAction(matchedEvent) {
		this.finished = false;
		this.matchedEvent = matchedEvent;
		this.elapsedTime = 0;
	}

	//For more detailed progression, define a class extending Action
	//	and write your own progressAction. Please call super.progressAction at the end.
	progressAction(deltaTime) {
		this.elapsedTime += deltaTime;

		if (this.totalTime <= this.elapsedTime) {
			this.finished = true;
		}
	}

}


//Ghost is a base class for Cat tracking current actions.
class Ghost {
	name;
	currentAction;
	possibleTasks;	//list of all possible actions
	todos;	//list of planned actions. probably sort these by priority
	sprite;
	homePosition;

	constructor(name, image, position) {
		this.name = name;
		this.possibleTasks = [];
		this.todos = [];
		this.sprite = new Sprite(image, position);
		this.homePosition = position;
	}

	//todo: sorting should be for todos, not possible tasks!
	addPossibleTasks(taskList) {
		this.possibleTasks = this.possibleTasks.concat(taskList);
		this.possibleTasks.sort((a, b) => (b.priority-a.priority));
	}


	//If a subclass overwrites this, it should probably call super.setCurrentAction(...)
	setCurrentAction(action, matchedEvent) {

		if (debug) {
			console.log(`${this.name} will begin action ${action.name}`);
		}

		action.beginAction(matchedEvent);
		this.currentAction = action;
		if (matchedEvent == null) {
			this.sprite.move(this.homePosition);
		} else {
			this.sprite.move(matchedEvent.station.position);
			matchedEvent.station.toggle = false;
		}

	}

	//If a subclass overwrites this, it should probably call super.onUpdate(...)
	onUpdate(deltaTime) {
		if (this.currentAction != null) {
			this.currentAction.progressAction(deltaTime);
			if (this.currentAction.finished) {
				if (debug) {
					console.log(`${this.name} has finished action ${this.currentAction.name}`);
				}

				if (this.currentAction.name == "Eat") {
					writeBox(`${this.name} lets out a content purr`);
					kitchen.toggle = false;
				}

				if (this.currentAction.name == "Check Email") {
					writeBox("There's a game scheduled for this weekend");
					office.toggle = false;
				}
				this.finishCurrentAction();
			}
		}
	}
	
	//p is the probability of event occuring in 1 ms
	//deltaTime is measured in ms
	//P MUST BE BETWEEN 0 AND 1
	probabilizer(p, deltaTime) {
		return 1-Math.pow(1-p, deltaTime);
	}

	generateTodos(deltaTime) {
		for (const task of this.possibleTasks) {
			let r = Math.random();
			if (r < this.probabilizer(task.probability, deltaTime)) {
				//todo: sort list so this search is less bad
				//see comment in manager's findCatsNextAction

				//todo: what the heck is wrong with array.prototype.includes
				let found = false;
				for (const t of this.todos) {
					if (t.name === task.name) {
						found = true;
						break;
					}
				}
				if (!found) {
					this.addTodo(task);
					if (task.name == "Eat") {
						writeBox("The cat lets out a pittiful meow");
						kitchen.toggle = true;
						
					}
					if (task.name == "Keyboard") {
						/*this task doenst exist but I think it should be what we use for it stoping you from checking your  */
					}
				}
			}
		}
	}

	addTodo(task) {
		this.todos.push(task);
		if (debug) {
			console.log(this.name + ": Adding todo: " + task.name);
		}
	}

	finishCurrentAction() {
		let matchedEvent = this.currentAction.matchedEvent;
		if (matchedEvent != null) {
			matchedEvent.station.consumeEvent(matchedEvent);
		}
		this.removeTodo(this.currentAction);
		this.currentAction = null;
		this.finished = true;
	}

	removeTodo(action) {
		let index = this.todos.findIndex((a) => a==action);
		this.todos.splice(index, 1);
	}
}

class Cat extends Ghost {

	interrupt(event) {
		//Interrupts CANNOT have retainedOnInterrupt == true.
		let match = this.todos.find(action => actionMatchesEvent(action, event));

		if (match != undefined) {
			if (debug) {
				console.log(`Successfully interrupted ${this.name} with ${event.name}`);
			}

			if (this.currentAction != null && (! this.currentAction.retainedOnInterrupt)) {
				this.removeTodo(this.currentAction);
			}

			this.setCurrentAction(match, event);
		} else {
			if (debug) {
				console.log(`Failed to distract ${this.name} with ${event.name}`);
			}
		}
	}
}

class Player extends Ghost {

	attemptAction(action, matchedEvent) {
		if ( (action != null) && (matchedEvent != null) ) {
			if (!this.isActionPrevented(action, matchedEvent.station)) {
				this.setCurrentAction(action, matchedEvent);
			} else if (debug) {
				console.log(`Player action ${action.name} prevented by a cat action`);
			}
		}
	}

	isActionPrevented(action, station) {
		let prevented = false;

		for (const cat of cats) {
			if ( (cat.currentAction != null) && (cat.currentAction.name === action.preventedBy) ) {
				prevented = true;
				break;
			}
		}

		return prevented;
	}
}

class Sprite {
	image;
	x;
	y;
	width;
	height;

	constructor(img, position) {
		this.image = new Image();
		this.image.src = img;
		this.width = 100;
		this.height = 50;
		this.x = position[0];
		this.y = position[1];
	}

	move(newPosition) {
		this.x = newPosition[0];
		this.y = newPosition[1];
		//todo: do by station instead of position
	}
}

//Event is an object which may trigger a cat's action.
//	The player will be able to create and engage with events.
class Event {
	probability;
	name;
	station;

	constructor(probability, name, station) {
		this.probability = probability; //probability event triggered in 1 ms
		this.name = name;
		this.station = station;
	}
}

//Station represents a region of the apartment providing events that cats may engage with.
//	I plan for Player to also engage with stations and their events.
class Station {
	name;
	possibleEvents;
	availableEvents;
	sprite;
	position;
	toggle;

	constructor(name, sprite, position, toggle) {
		this.name = name;
		this.possibleEvents = [];
		this.availableEvents = [];
		this.sprite = new Sprite(sprite, position);
		this.position = position;
		this.toggle = toggle;
	}

	generateEvents(deltaTime) {
		for (const event of this.possibleEvents) {
			let p = Math.random();

			//todo: fix bug: deltaTime may be negative on first tick
			if (p * deltaTime < event.probability) {

				//todo: correctly calculate probability that event triggered
				//Currently we do probability * elapsed time (in ms).
				//Correct would be to find probability of triggering within 
				//	x ms given the probability of triggering in one ms.
				let found = false;
				for (const e of this.availableEvents) {
					if (e.name === event.name) {
						found = true;
						break;
					}
				}
				if (!found) {
					this.addAvailableEvent(event);
					if (event.name == "Email") {
						writeBox("You get an email from a friend; its about DND");
						office.toggle = true;
					}
				}
			}

		}
	}

	addAvailableEvent(event) {
		//todo: what the heck is wrong with array.prototype.includes
		//SCREAM
		this.availableEvents.push(event);

		if (debug) {
			console.log(this.name + ": Adding available event: " + event.name);
		}
	}

	//Get rid of an event. Intended to use after an action finishes with it.
	consumeEvent(event) {
		let index = this.availableEvents.findIndex((e) => {e == event;});
		this.availableEvents.splice(index, 1);
		if (debug) {
			console.log(event.name + " is no longer available in " + this.name);
		}
	}
}


let lines = 0;
function writeBox(text) {
	let cuts = document.getElementById("HTMLtextBox").textContent.split('\n');
	if ((typeof text == "string")&&(lines < 2)) {
		document.getElementById("HTMLtextBox").textContent += '\n';
		document.getElementById("HTMLtextBox").textContent += text;
		ding();
		lines += 1;
	}else if ((typeof text == "string")&&(lines >= 2)) {
		cuts = document.getElementById("HTMLtextBox").textContent.split('\n');
		cuts.splice(0,1);
		cuts = cuts.join('\n');
		
		document.getElementById("HTMLtextBox").textContent = cuts;
		document.getElementById("HTMLtextBox").textContent += "\n";
		document.getElementById("HTMLtextBox").textContent += text;		
		ding();
	}
}

function ding() {
	let ding = new Audio('sounds/ding.mp3');
	ding.play();
}

function isIndependent(action) {
	return action.matchesEvent == null;
}

function actionMatchesEvent(action, event) {
	return event.name === action.matchesEvent;
}

/* Dropdown mamagment -- Ripped from internet: https://www.w3schools.com/howto/howto_js_dropdown.asp */

/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function dropFunction() {
	document.getElementById("myDropdown").classList.toggle("show");
  }
  
  // Close the dropdown menu if the user clicks outside of it
  window.onclick = function(event) {
	if (!event.target.matches('.dropbtn')) {
	  var dropdowns = document.getElementsByClassName("dropdown-content");
	  var i;
	  for (i = 0; i < dropdowns.length; i++) {
		var openDropdown = dropdowns[i];
		if (openDropdown.classList.contains('show')) {
		  openDropdown.classList.remove('show');
		}
	  }
	}
  }
