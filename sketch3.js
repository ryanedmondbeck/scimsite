/*
 *	bezier curve
 *  with changing control points
 *  and with moving anchors
 */

width = window.innerWidth;
height = window.innerHeight;

var bg_col = 0;
var px_col = 255;

//number of lines to either side of mouse
var divisor = 2;

anchorY1 = 0;
speed = 3;
speed2 = -4;
anchorX1 = width;

function setup() {
  	canvas = createCanvas(window.innerWidth, window.innerHeight);
	
}

function draw() {

	bg_col = map(mouseX, 0, width, 0, 255);
	background(bg_col);

	//bezier curve settings
	px_col = map(mouseX, 0, width, 255, 0);
    noFill();
    strokeWeight(2);
    stroke(px_col);

    anchorY1 = anchorY1 + speed;
    if (anchorY1 > height) {
        speed = speed * -1;
    }
    if (anchorY1 < 0) {
        speed = speed * -1;
    }

    anchorX1 = anchorX1 + speed2;
    if (anchorX1 > width) {
        speed2 = speed2 * -1;
    }
    if (anchorX1 < 0) {
        speed2 = speed2 * -1;
    }
    
    
    //draw lines to the left
    var i = 1
    while (i <= divisor) {
    	var loc = mouseX/7 * (i / divisor);
        bezier(loc, anchorY1, width/4-(i*10), height/3+(i*10), width*3/4-(i*10), height*2/3+(i*10), (width-loc), height);
        i++;
    }
    //draw lines that loop
    var i = 1
    while (i <= divisor) {
        var loc = mouseX/7 * (i / divisor);
        bezier(loc, anchorY1, width/4-(i*10), height/3+(i*10), width*3/4-(i*10), height*2/3+(i*10), loc, anchorY1);
        i++;
    }
    //draw lines to the top
    var i = 1
    while (i <= divisor) {
        var loc = mouseX/7 * (i / divisor);
        bezier(anchorX1, 0, width/4-(i*10), height/3+(i*10), width*3/4-(i*10), height*2/3+(i*10), loc, anchorY1);
        i++;
    }

}