// Canvas
const canvas = document.querySelector('canvas');
const width = canvas.width = window.innerWidth * 0.66;
const height = canvas.height = window.innerHeight * 0.66;
const ctx = canvas.getContext("2d");

// Random number generator
function random(min, max) {
  const num = Math.random() * (max - min + 1) + min;
  return num;
}

// Input
var numberOfBoids = document.getElementById("numberOfBoids").value;
var numberOfReds = document.getElementById("numberOfReds").value;
var numberOfYellows = document.getElementById("numberOfYellows").value;

// Sliders
var separationMultiplier = 1;
var separationValue = document.getElementById("separationValue");
separationValue.innerHTML = separationMultiplier;
function separationChange(value){
	separationMultiplier = parseInt(value);
	separationValue.innerHTML = separationMultiplier;
}
var alignmentMultiplier = 1;
var alignmentValue = document.getElementById("alignmentValue");
alignmentValue.innerHTML = alignmentMultiplier;
function alignmentChange(value){
	alignmentMultiplier = parseInt(value);
	alignmentValue.innerHTML = alignmentMultiplier;
}
var cohesionMultiplier = 1;
var cohesionValue = document.getElementById("cohesionValue");
cohesionValue.innerHTML = cohesionMultiplier;
function cohesionChange(value){
	cohesionMultiplier = parseInt(value);
	cohesionValue.innerHTML = cohesionMultiplier;
}

// Flock
const flock = [];
for(var i = 0; i < numberOfBoids; i++) {
	flock.push(new Boid(0));
}
for(var i = 0; i < numberOfReds; i++) {
	flock.push(new Boid(1));
}
for(var i = 0; i < numberOfYellows; i++) {
	flock.push(new Boid(2));
}
function recreateFlock() {
	numberOfBoids = document.getElementById("numberOfBoids").value;
	numberOfReds = document.getElementById("numberOfReds").value;
	numberOfYellows = document.getElementById("numberOfYellows").value;
	flock.length = 0
	for(var i = 0; i < numberOfBoids; i++) {
		flock.push(new Boid(0));
	}
	for(var i = 0; i < numberOfReds; i++) {
		flock.push(new Boid(1));
	}
	for(var i = 0; i < numberOfYellows; i++) {
		flock.push(new Boid(2));
	}
}

// Draw loop
function draw(){
	ctx.clearRect(0, 0, width, height);
	for (var boid of flock) {
		if (!boid.isAlive){
			const index = flock.indexOf(boid);
			if (index > -1) {
  				flock.splice(index, 1);
			}
		}
		boid.edges();
		boid.flock(flock);
		boid.killing(flock);
		boid.show();
		boid.update();
	}
	requestAnimationFrame(draw);
}
draw();