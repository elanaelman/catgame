//Small test case. Shows that interrupt works.
//This runs in test_js.html

function run() {
	canvas = document.getElementById("catCanvas");
	game = new Game(canvas);
	alert("hi?")
	game.hungry.generateTodos(1);
	console.log("done");
}

window.addEventListener("load", run);
