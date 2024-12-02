let hungry = new Cat("Hungry");
let eat = new Action("Eat", 1, 1, true, 1000, "Food");
hungry.possibleTasks.push(eat);
let cats = [hungry];

let kitchen = new Station("Kitchen");
let food = new Event(1, "Food", kitchen);
kitchen.possibleEvents.push(food);
let stations = [kitchen];

let manager = new Manager(cats, stations, 0);

let distract = new Event(0, "Distraction", undefined)

// time = window.performance.now()

// function run(timeOfAnimationFrame) {
// 	//Queue main again for the next screen refresh
// 	//requestAnimationFrame passes a timestamp to main.
// 	animationFrame = window.requestAnimationFrame(run);

// 	deltaTime = timeOfAnimationFrame - time;
// 	manager.onUpdate(deltaTime);
// 	time = timeOfAnimationFrame;

// }

// run(time);

manager.onUpdate(1);
manager.onUpdate(1);
hungry.interrupt(distract);
manager.onUpdate(1);
manager.onUpdate(1);