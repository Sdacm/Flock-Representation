class Boid {
	// Class Constructor
	constructor(type){
		this.position = new Vector(random(0, width), random(0, height));
		this.velocity = new Vector();
		this.velocity.setMagnitude(random(2, 4));
		this.velocity.setDirection(random(0, 2 * Math.PI));
		this.acceleration = new Vector();
		this.perception = 200;
		this.maxForce = 0.1;
		this.maxSpeed = 3;
		this.type = type;
		this.isAlive = true;
		if (this.type == 1) this.maxSpeed = 5;
	}
	// When a Boid reaches a edge, it reapears at the oposite side of the canvas
	edges(){
		if (this.position.x > width) {
			this.position.x = 0;
		} else if (this.position.x < 0) {
			this.position.x = width;
		}
		if (this.position.y > height) {
			this.position.y = 0;
		} else if (this.position.y < 0) {
			this.position.y = height;
		}
	}
	// Separation steering force
	separation(boids){
		var steering = new Vector();
		if (this.type == 1) return steering;
		var total = 0;
		for (var other of boids) {
			var d = this.position.distance(other.position);
			if (other != this && other.type != 1 && d < this.perception) {
				var difference = this.position.subNew(other.position);
				difference.divide(d);
				steering.add(difference);
				total++;
			}
		}
		if (total > 0) {
			steering.divide(total);
			steering.setMagnitude(this.maxSpeed);
			steering.subtract(this.velocity);
			steering.limit(this.maxForce);
		}
		return steering; 
	}
	// Alignment steering force
	alignment(boids){
		var steering = new Vector();
		if (this.type == 1) return steering;
		var total = 0;
		for (var other of boids) {
			var d = this.position.distance(other.position);
			if (other != this && other.type != 1 && d < this.perception) {
				steering.add(other.velocity);
				total++;
			}
		}
		if (total > 0) {
			steering.divide(total);
			steering.setMagnitude(this.maxSpeed);
			steering.subtract(this.velocity);
			steering.limit(this.maxForce);
		}
		return steering; 
	}
	// Cohesion steering force
	cohesion(boids){
		var steering = new Vector();
		if (this.type == 1) return steering;
		var total = 0;
		for (var other of boids) {
			var d = this.position.distance(other.position);
			if (other != this && other.type != 1 && d < this.perception) {
				steering.add(other.position);
				total++;
			}
		}
		if (total > 0) {
			steering.divide(total);
			steering.subtract(this.position);
			steering.setMagnitude(this.maxSpeed);
			steering.subtract(this.velocity);
			steering.limit(this.maxForce);
		} 
		return steering; 
	}
	// Hunting and runing away from predators steering force
	hunting(boids){
		var steering = new Vector();
		if (this.type == 0){
			for (var other of boids) {
				if (other.type == 1) {
					var d = this.position.distance(other.position);
					if (d < this.perception) {
						var difference = this.position.subNew(other.position);
						difference.divide(d);
						steering = difference;
						steering.setMagnitude(this.maxSpeed);
						steering.subtract(this.velocity);
						steering.limit(this.maxForce);
					}
				}
			}
		}
		else if (this.type == 1) {
			for (var other of boids) {
				if (other.type == 0) {
					var d = this.position.distance(other.position);
					if (d < this.perception) {
						steering.add(other.position);
						steering.subtract(this.position);
						steering.setMagnitude(this.maxSpeed);
						steering.subtract(this.velocity);
						steering.limit(this.maxForce);
					}
				}
				if (other.type == 2) {
					var d = this.position.distance(other.position);
					if (d < this.perception) {
						var difference = this.position.subNew(other.position);
						difference.divide(d);
						steering = difference;
						steering.setMagnitude(this.maxSpeed);
						steering.subtract(this.velocity);
						steering.limit(this.maxForce);
					}
				}
			}
		}
		else {
			for (var other of boids) {
				if (other.type == 1) {
					var d = this.position.distance(other.position);
					if (d < this.perception) {
						steering.add(other.position);
						steering.subtract(this.position);
						steering.setMagnitude(this.maxSpeed);
						steering.subtract(this.velocity);
						steering.limit(this.maxForce);
					}
				}
			}
		}
		return steering;
	}
	// Killing of an inferior chain ranking boid when colliding
	killing(boids){
		if (this.type == 0) return;
		if (this.type == 1) {
			var killingDistance = 10;
			for (var other of boids) {
				var d = this.position.distance(other.position);
				if (other != this && other.type == 0 && d < killingDistance) {
					other.isAlive = false;
				}
			}
		}
		else {
			var killingDistance = 20;
			for (var other of boids) {
				var d = this.position.distance(other.position);
				if (other != this && other.type == 1 && d < killingDistance) {
					other.isAlive = false;
				}
			}
		}
	}
	// Joining the forces of all different steerings together
	flock(boids){
		var separation = this.separation(boids);
		var alignment = this.alignment(boids);
		var cohesion = this.cohesion(boids);
		var hunting = this.hunting(boids);
		separation.multiply(separationMultiplier);
		alignment.multiply(alignmentMultiplier);
		cohesion.multiply(cohesionMultiplier);
		this.acceleration.add(separation);
		this.acceleration.add(alignment);
		this.acceleration.add(cohesion);
		this.acceleration.add(hunting);
	}
	// Updating the position of each Boid every frame 
	update() {
		this.position.add(this.velocity);
		this.velocity.add(this.acceleration);
		this.velocity.limit(this.maxSpeed);
		this.acceleration.multiply(0);
	}
	// Visual representation of the Boids
	show() {
		if (this.type == 0) {
			ctx.fillStyle = "white";
		} else if (this.type == 1) {
			ctx.fillStyle = "red";
		} else {
			ctx.fillStyle = "#ffff66";
		}
		ctx.beginPath();
		if (this.type < 2) {
			ctx.arc(this.position.x,this.position.y,5,0,2*Math.PI);
		}
		else {
			ctx.arc(this.position.x,this.position.y,10,0,2*Math.PI);
		}
		ctx.fill();
	}
}