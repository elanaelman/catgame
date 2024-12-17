//Small test case. Shows that interrupt works.
//This runs in test_js.html


let hungry = new Cat("Hungry", "C:/Users/Elana/Documents/GitHub/CatGame/images/vampire.svg", [0,0]);
// let eat = new Action("Eat", 1, 1, true, 1000, "Food");
// hungry.possibleTasks.push(eat);
// let cats = [hungry];

// let kitchen = new Station("Kitchen");
// let food = new Event(1, "Food", kitchen);
// kitchen.possibleEvents.push(food);
// let stations = [kitchen];


// let distract = new Event(0, "Distraction", undefined)


function run() {
	canvas = document.getElementById("catCanvas");
	ctx = canvas.getContext("2d");	
	sprite = hungry.sprite;
	playerSprite = player.sprite
	ctx.drawImage(sprite.image, sprite.x, sprite.y);
	// manager.onUpdate(1);
	// hungry.interrupt(distract);
	// manager.onUpdate(1);
	// manager.onUpdate(1);
	console.log("done");
}
window.addEventListener("load", run);