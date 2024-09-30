function distance(x1, y1, x2, y2) {
    return Math.sqrt((x2-x1)**2 + (y2-y1)**2);
}

function direction(x1, y1, x2, y2) {
    let xDiff = x2 - x1;
    let yDiff = y2 - y1;
    let total = xDiff + yDiff;
    return [xDiff / total, yDiff / total];
}