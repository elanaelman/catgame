//Small test case. Shows that interrupt works.
//This runs in test_js.html

function run() {
	canvas = document.getElementById("catCanvas");
	game = new Game(canvas);
	//game.cats[0].generateTodos(1);
	let hungry = game.cats[0];
	let tasks = hungry.possibleTasks;
	let eat = tasks[0];
	let play = tasks[1];
	hungry.addTodo(eat);
	hungry.addTodo(play);
	let kitchen = game.stations[1];
	let food =  kitchen.possibleEvents[0];
	kitchen.addAvailableEvent(food);
	hungry.setCurrentAction(eat, food);
	hungry.finishCurrentAction();
	hungry.generateTodos(1);

	console.log("done");
}

window.addEventListener("load", run);