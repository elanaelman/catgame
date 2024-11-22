let hungry = new Cat("Hungry");
let eat = new Action("Eat", 1, 1, true, 1, false, "Food");
hungry.possibleTasks.push(eat);
let cats = [hungry];

let kitchen = new Station("Kitchen");
let food = new Event(1, "Food");
kitchen.possibleEvents.push(food);
let stations = [kitchen];

let manager = new Manager(cats, stations, 0);


manager.onUpdate(1);
manager.onUpdate(1);