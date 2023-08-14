function setup() {
  createCanvas(1280, 720, WEBGL);
}

const hexapod = new Hexapod();

function draw() {
  background(0);
  stroke(100);
  noFill();
  box(20);
  camera(0, 200, 150, 0, 0, 0, 0, 1, 0);

  if (keyIsDown(UP_ARROW)) {
    hexapod.forward();
  } else if (keyIsDown(DOWN_ARROW)) {
    hexapod.backward();
  } else if (keyIsDown(RIGHT_ARROW)) {
    hexapod.rotateccw();
  } else if (keyIsDown(LEFT_ARROW)) {
    hexapod.rotatecw();
  } else if (keyIsDown(32)) {
    hexapod.increaseHeight();
  } else if (keyIsDown(8)) {
    hexapod.decreaseHeight();
  } else {
    hexapod.idle();
  }
}
