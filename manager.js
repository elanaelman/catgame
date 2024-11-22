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

		for (const station of this.stations) {
			station.generateEvents(deltaTime);
		}

		for (const cat of this.cats) {
			cat.onUpdate(deltaTime);

			if (debug) {
				console.log("Updating cat: " + cat.name);
			}

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

				let match = station.availableEvents.find(event => event.name == action.matchesEvent);

				if (match != undefined) {

					if (debug) {
						console.log(`${cat.name} will begin action ${action.name} in ${station.name}`);
					}


					station.consumeEvent(match);
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

	constructor(name, probability, priority, retainedOnInterrupt, totalTime, finished, matchesEvent) {
		this.name = name;
		this.probability = probability;
		this.priority = priority;
		this.retainedOnInterrupt = retainedOnInterrupt;
		this.totalTime = totalTime;
		this.finished = finished;
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
		this.finished = true;
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
			} else {
				if (debug) {
					console.log(`${this.name} is continuing action ${this.currentAction.name}: time ${this.currentAction.elapsedTime}/${this.currentAction.totalTime}`)
				}
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
				if (! this.todos.includes(t => t.name == task.name)) {
					this.todos.push(task);
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

	interrupt() {
		if (this.currentAction != null) {
			if (this.currentAction.retainedOnInterrupt) {
				this.todos.push(this.currentAction);
			} else {
				//todo: is any cleanup needed otherwise? idk
			}
		}

		//todo: notify station of interrupt

		//todo: clear action or assign new one? engage with distraction?
	}
}

class Event {
	probability;
	name;

	constructor(probability, name) {
		this.probability = probability;
		this.name = name;
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

				//todo: sort list so this search is less bad
				if (! this.availableEvents.includes(e => e.name == event.name)) {

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