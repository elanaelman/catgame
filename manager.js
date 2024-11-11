//Manager

class Manager {
	cats;
	stations;
	startTime;

	constructor(cats, stations, startTime) {
		this.cats = cats;
		this.stations = stations;
		this.startTime = startTime;
	}

	onUpdate(deltaTime) {

		for (const station of this.stations) {
			station.generateEvents(deltaTime);
		}

		for (const cat of this.cats) {
			cat.onUpdate(deltaTime);
			cat.generateTodos(deltaTime);

			if (cat.currentAction == null) {
				findCatsNextAction(cat);
			}

		}
	}

	findCatsNextAction(cat) {
		for (const action of cat.todos) {
			for (const station of this.station) {
				for (const event of station.availableEvents) {

					//This is disgusting, sorry. It's really "only" n^2.
					if (action.matchesEvent == event.name) {
						action.beginAction(event, this);
						this.currentAction = action;
					}

				}
			}
		}
	}

}

// Specific actions should be subclasses of Action. 
// Please call super.progressAction in a subclass that overwrites it.
class Action {
	//set on construction:
	probability;
	priority;
	retainedOnInterrupt;	//whether this returns to the todo list if interrupted
	totalTime;
	finished;
	matchesEvent;

	//set when this becomes a cat's currentAction:
	matchedEvent;	
	actor;		
	elapsedTime;

	beginAction(matchedEvent, actor) {
		finished = false;
		this.matchedEvent = matchedEvent;
		this.actor = actor;
		this.elapsedTime = 0;
		matchedEvent.beginEvent();
	}

	progressAction(deltaTime) {
		this.elapsedTime += deltaTime;
		if (this.totalTime >= this.elapsedTime) {
			this.completeAction();
		}
	}

	completeAction() {
		this.matchedEvent.completeEvent();
	}
}
//todo: implement specific Actions

class Ghost {
	currentAction;
	onUpdate(deltaTime) {
		if (this.currentAction != null) {
			this.currentAction.progressAction(deltaTime);
			if (this.currentAction.done) {
				this.currentAction = null;
			}
		}
	}
}

class Cat extends Ghost {
	possibleTasks;	//list of actions
	todos;	//list of actions. probably sort these by priority

	generateTodos(deltaTime) {
		for (const task of this.possibleTasks) {
			let p = Math.random();
			if (p * deltaTime < task.probability) {
				this.todos.push(task);
			}

			//todo: make sure task is not already in todo list
		}
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
	station;
	probability;
	name;
}

class Station {
	possibleEvents;
	availableEvents;
	generateEvents(deltaTime) {
		for (const event of possibleEvents) {
			let p = Math.random();
			if (p * deltaTime < event.probability) {
				availableEvents.push(event);
			}
		}
	}
}  