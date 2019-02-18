/**
 * The small box a user tries to catch. Keeps track of the 
 * boxes coordinates and contains functions to move the box. 
 */
class Box {
	/**
	 * Creates a random starting position for the box within the boundary
	 * of the game. Places the box in that position.
	 * @param {Element} box the DOM element that is the box
	 */
	constructor(box) {
		this.box = box;
		this.x = Math.random() * (window.innerWidth - 150) + 50;
		this.y = Math.random() * (window.innerHeight - 150) + 50;
		this.box.style.left = this.x;
		this.box.style.top = this.y;
	}

	/**
	 * Moves the box the amount of pixels to the right passed in
	 * via the argument speed.
	 * @param {int} speed the number of pixels to move the box.
	 */
	moveRight(speed) {
		this.box.style.left = (this.x + speed);
    	this.x = this.x + speed;
	}

	/**
	 * Moves the box the amount of pixels to the left passed in
	 * via the argument speed.
	 * @param {int} speed the number of pixels to move the box.
	 */
	moveLeft(speed) {
		this.box.style.left = (this.x - speed) ;
		this.x = this.x - speed;
	}

	/**
	 * Moves teh box the amount of pixels down passed in via the 
	 * parameter speed.
	 * @param {int} speed the number of pixels to move the box.
	 */
	moveDown(speed) {
		this.box.style.top = (this.y + speed);
		this.y = this.y + speed;
	}
	
	/**
	 * Moves the box the amount of pixels up passed in via the 
	 * parameter speed.
	 * @param {int} speed the number of pixels to move the box.
	 */
	moveUp(speed) {
		this.box.style.top = (this.y - speed);
		this.y = this.y - speed;
	}
}