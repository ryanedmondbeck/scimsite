/*
 *	bezier curve
 *  with changing control points
 */

width = window.innerWidth;
height = window.innerHeight;

var bg_col = 0;
var px_col = 255;

//number of lines to either side of mouse
var divisor = 20;

function windowResized() {
    resizeCanvas(window.innerWidth, window.innerHeight);
}

function setup() {
  	canvas = createCanvas(window.innerWidth, window.innerHeight);
    canvas.position(0, 0);
    canvas.style('z-index', '-1');
	
}

function draw() {

	bg_col = map(mouseX, 0, width, 0, 255);
	background(bg_col);

	//bezier curve settings
	px_col = map(mouseX, 0, width, 255, 0);
    noFill();
    strokeWeight(2);
    stroke(px_col);


    //draw lines to the left
    for (var i = 0; i <= divisor; i++) {
    	var loc = mouseX * (i / divisor);
        bezier(loc, 0, width/4-(i*10), height/3+(i*10), width*3/4-(i*10), height*2/3+(i*10), (width-loc), height);
    }

}