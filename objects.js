let hungry = new Cat("Hungry");
let eat = new Action("Eat", 0.5, 1, true, false, "Food");
hungry.possibleTasks.push(eat);


let office = new Station("Office");
let kitchen = new Station("Kitchen");

let food = new Event(0.5, "Food");
kitchen.possibleEvents.push(food);

let email = new Event(0.1, "Email");
office.possibleEvents.push(food);

let manager = new Manager([hungry], [office, kitchen], 0);
