//Assorted useful functions.
//Currently not used in live code, feel free to ignore.

//Distance between points (x1, y1) and (x2, y2)
function distance(x1, y1, x2, y2) {
    return Math.sqrt((x2-x1)**2 + (y2-y1)**2);
}


//Direction vector from point (x1, y1) to (x2, y2)
function direction(x1, y1, x2, y2) {
    let xDiff = x2 - x1;
    let yDiff = y2 - y1;
    let total = xDiff + yDiff;
    return [xDiff / total, yDiff / total];
}

//Returns a random integer between 0 (inclusive) and max (exclusive)
function randInt(max) {
	let value = Math.floor(Math.random() * max);
	return value;
}


//Returns one of three random colors.
function randomColor() {
	let colorType = Math.floor(Math.random() * 3);
	switch (colorType) {
		case 0: return 'orange';
		case 1: return 'black';
		case 2: return 'white';
	}
}