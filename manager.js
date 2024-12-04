//This file defines core classes: Manager, Ghost, Cat, Action, Station, Event.
//We can probably rename this file to objects.js. I suck at planning. lmk what you think


//Set to false to shut off console messages.
//Note that I cleaned this upp so it doesn't flood now :) --Elana
let debug = true;


//Manager keeps lists of cats and stations, and updates each cat and station each tick.
//It coordinates between cats and stations.
class Manager {
	cats;
	stations;
	startTime;

	constructor(cats, stations, startTime) {
		this.cats = cats;
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
			for (const station of this.stations) {

				let match = station.availableEvents.find(event => event.name === action.matchesEvent);

				if (match != undefined) {

					if (debug) {
						console.log(`${cat.name} will begin action ${action.name} in ${station.name}`);
					}

					cat.setCurrentAction(action, match);
					return;
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

	//set when this becomes a cat's currentAction:
	matchedEvent;	
	elapsedTime;

	constructor(name, probability, priority, retainedOnInterrupt, totalTime, matchesEvent) {
		this.name = name;
		this.probability = probability;
		this.priority = priority;
		this.retainedOnInterrupt = retainedOnInterrupt;
		this.totalTime = totalTime;
		this.matchesEvent = matchesEvent;
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
			this.completeAction();
		}
	}

}


//Ghost is a base class for Cat tracking current actions.
//I plan for Player to also extend Ghost.
class Ghost {
	name;
	currentAction;

	constructor(name) {
		this.name = name;
	}

	//If a subclass overwrites this, it should probably call super.setCurrentAction(...)
	setCurrentAction(action, matchedEvent) {
		action.beginAction(matchedEvent);
		this.currentAction = action;
	}

	//If a subclass overwrites this, it should probably call super.onUpdate(...)
	onUpdate(deltaTime) {
		if (this.currentAction != null) {
			this.currentAction.progressAction(deltaTime);
			if (this.currentAction.finished) {
				if (debug) {
					console.log(`${this.name} has finished action ${this.currentAction.name}`);
				}
				this.currentAction = null;
			}
		}
	}
}

//Cat tracks possible action and todo lists, and may generate todos each tick.
//As noted in Ghost, I planned for Cat and a Player class to each extend Ghost.
//	However, the methods currently in Cat seem applicable to the player also.
//	Maybe we should combine Cat's current functionality back into Ghost,
//	and separate Cat from Player only in terms of graphics?
class Cat extends Ghost {
	possibleTasks;	//list of all possible actions
	todos;	//list of planned actions. probably sort these by priority
	sprite;

	constructor(name) {
		super(name);
		this.possibleTasks = [];
		this.todos = [];
	}

	generateTodos(deltaTime) {
		for (const task of this.possibleTasks) {
			let p = Math.random();
			if (p * deltaTime < task.probability) {
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
					this.todos.push(task);
					if (task.name == "Eat") {
						//document.getElementById("HTMLtextBox").textContent = "The cat lets out a pittiful meow"; 
						/*play a sound*/
					}
					if (task.name == "Keyboard") {
						/*this task doenst exist but I think it should be what we use for it stoping you from checking your email */
					}
					if (debug) {
						console.log(this.name + ": Adding todo: " + task.name);
					}
				}
			}
		}
	}

	setCurrentAction(action, matchedEvent) {
		let index = this.todos.findIndex((a) => {a == action;});
		this.todos.splice(index, 1);
		super.setCurrentAction(action, matchedEvent);
	}

	interrupt(event) {
		//Interrupts CANNOT have retainedOnInterrupt == true.

		let match = this.todos.find(action => event.name === action.matchesEvent);

		if (match != undefined) {
			if (debug) {
				console.log(`Successfully interrupted ${this.name} doing ${this.currentAction.name} with ${event.name}`);
			}

			if (this.currentAction != null && (! this.currentAction.retainedOnInterrupt)) {
				removeTodo(this.currentAction);
			}

			this.setCurrentAction(match, event);
		} else {
			if (debug) {
				console.log(`Failed to distract ${this.name} doing ${this.currentAction.name} with ${event.name}`);
			}
		}



		//todo: clear action or assign new one? engage with distraction?
	}

	finishCurrentAction() {
		this.currentAction.matchedEvent.station.consumeEvent(matchedEvent);
		this.removeTodo(this.currentAction);
		this.finished = true;
	}

	removeTodo(action) {
		let index = this.todos.findIndex((a) => {a == action;});
		this.todos.splice(index, 1);
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


	constructor(name) {
		this.name = name;
		this.possibleEvents = [];
		this.availableEvents = [];
	}

	generateEvents(deltaTime) {
		for (const event of this.possibleEvents) {
			let p = Math.random();

			if (p * deltaTime < event.probability) {
				//todo: correctly calculate probability that event triggered
				//Currently we do probability * elapsed time (in ms).
				//Correct would be to find probability of triggering within 
				//	x ms given the probability of triggering in one ms.

				//todo: what the heck is wrong with array.prototype.includes
				//SCREAM
				let found = false;
				for (const e of this.availableEvents) {
					if (e.name === event.name) {
						found = true;
						break;
					}
				}
				if (!found) {
					this.availableEvents.push(event);

					if (debug) {
						console.log(this.name + ": Adding available event: " + event.name);
					}
				}

			}
		}

	}

	//Get rid of an event. Intended to use after an action finishes with it.
	consumeEvent(event) {
		let index = this.availableEvents.findIndex((e) => {e == event;});
		this.availableEvents.splice(index, 1);
	}
}