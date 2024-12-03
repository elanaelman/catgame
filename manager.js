//Manager

let debug = true;

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
		if (debug) {
			//console.log(`Next step: ${deltaTime} elapsed`)
		}

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
		for (const action of cat.todos) {
			for (const station of this.stations) {

				let match = station.availableEvents.find(event => event.name === action.matchesEvent);

				if (match != undefined) {

					if (debug) {
						console.log(`${cat.name} will begin action ${action.name} in ${station.name}`);
					}
					action.beginAction(match);
					cat.setCurrentAction(action);
					return;
				}
			}
		}
	}

}

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

	progressAction(deltaTime) {
		this.elapsedTime += deltaTime;

		if (this.totalTime <= this.elapsedTime) {
			this.completeAction();
		}
	}

	completeAction() {
		//todo remove from todolist

	}

}
//todo: implement specific Actions

class Ghost {
	name;
	currentAction;

	constructor(name) {
		this.name = name;
	}

	setCurrentAction(action) {
		this.currentAction = action;
	}

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

	setCurrentAction(action) {
		let index = this.todos.findIndex((a) => {a == action;});
		this.todos.splice(index, 1);
		super.setCurrentAction(action);
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

			match.beginAction(event);
			this.setCurrentAction(match);
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

				//todo: what the heck is wrong with array.prototype.includes
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

	consumeEvent(event) {
		let index = this.availableEvents.findIndex((e) => {e == event;});
		this.availableEvents.splice(index, 1);
	}
}