function distance(x1, y1, x2, y2) {
    return Math.sqrt((x2-x1)**2 + (y2-y1)**2);
}

function direction(x1, y1, x2, y2) {
    let xDiff = x2 - x1;
    let yDiff = y2 - y1;
    let total = xDiff + yDiff;
    return [xDiff / total, yDiff / total];
}
function randInt(max) {
	let value = Math.floor(Math.random() * max);
	return value;
}

function randomColor() {
	let colorType = Math.floor(Math.random() * 3);
	switch (colorType) {
		case 0: return 'orange'; break;
		case 1: return 'black'; break;
		case 2: return 'white'; break;
	}
}