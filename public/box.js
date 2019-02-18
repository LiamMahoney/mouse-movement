class Box {

	constructor(box) {
		this.box = box;
		this.x = Math.random() * (window.innerWidth - 150) + 50;
		this.y = Math.random() * (window.innerHeight - 150) + 50;
		this.box.style.left = this.x;
		this.box.style.top = this.y;
	}

	moveRight(speed) {
		this.box.style.left = (this.x + speed);
    	this.x = this.x + speed;
	}

	moveLeft(speed) {
		this.box.style.left = (this.x - speed) ;
		this.x = this.x - speed;
	}

	moveDown(speed) {
		this.box.style.top = (this.y + speed);
		this.y = this.y + speed;
	}
	
	moveUp(speed) {
		this.box.style.top = (this.y - speed);
		this.y = this.y - speed;
	}
}