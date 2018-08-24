/*
 *  vertical and horizontal lines!
 *
 */

width = window.innerWidth;
height = window.innerHeight;

var bg_col = 0;
var px_col = 255;

//number of lines to either side of mouse
var divisor = 50;

function setup() {
    canvas = createCanvas(window.innerWidth, window.innerHeight);
    
}

function draw() {

    bg_col = map(mouseX, 0, width, 0, 255);
    background(bg_col);

    //original line
    noStroke();
    px_col = map(mouseX, 0, width, 255, 0);
    fill(px_col);
    rect(mouseX , 0, 2, height);

    //draw lines to the left
    var i = 1
    while (i <= divisor) {
        var loc = mouseX * (i / divisor);
        rect(loc, 0, 2, height);
        i++;
    }

    //draw lines to the right
    i = 1
    while (i <= divisor) {
        var loc = mouseX + ((i / divisor) * (width - mouseX));
        rect(loc, 0, 2, height);
        i++;
    } 
    
    //draw lines from top
    var i = 1
    while (i <= divisor) {
        var loc = mouseY * (i / divisor);
        rect(0, loc, width, 2);
        i++;
    }

    //draw lines to bottom
    i = 1
    while (i <= divisor) {
        var loc = mouseY + ((i / divisor) * (height - mouseY));
        rect(0, loc, width, 2);
        i++;
    } 
}