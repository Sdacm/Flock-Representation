class Vector {
	// class constructor
	constructor(x, y){
		this.x = x || 0;
		this.y = y || 0;
	}
	// return the angle of the vector in radians
	getDirection(){
		return Math.atan2(this.y, this.x);
	}
	// set the direction of the vector in radians
	setDirection(direction){
		var magnitude = this.getMagnitude();
		this.x = Math.cos(direction) * magnitude;
		this.y = Math.sin(direction) * magnitude;
	}
	// get the magnitude of the vector
	getMagnitude(){
		return Math.sqrt(this.x * this.x + this.y * this.y);
	}
	// set the magnitude of the vector
	setMagnitude(magnitude){
		var direction = this.getDirection();
		this.x = Math.cos(direction) * magnitude;
		this.y = Math.sin(direction) * magnitude;
	}
	// add a vector to this one
	add(vector){
		this.x += vector.x;
		this.y += vector.y;
	}
	// subtract a vector from this one
	subtract(vector){
		this.x -= vector.x;
		this.y -= vector.y;
	}
	// subtract two vectors and return a new one
	subNew(vector){
		return new Vector(this.x - vector.x, this.y - vector.y);
	}
	// multiply this vector by a scalar
	multiply(scalar){
		this.x *= scalar;
		this.y *= scalar;
	}
	// divide this vector by a scalar
	divide(scalar){
		this.x /= scalar;
		this.y /= scalar;
	}
	// distance between this vector and other vetor
	distance(vector){
		return Math.hypot(this.x - vector.x, this.y - vector.y);
	}
	// normalizes the vector
	normalize(){
		this.setMagnitude(1);
	}
	// limits this vector to a certain magnitude
	limit(magnitude){
		if (this.getMagnitude() > magnitude){
			this.setMagnitude(magnitude);
		}
	}
	// prints this vector for debugging
	show(){
		console.log("(" + this.x + ", " + this.y + ")");
	}
}