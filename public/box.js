function Box(box) {
  this.x = Math.random() * (window.innerWidth - 150) + 50;
  this.y = Math.random() * (window.innerHeight - 150) + 50;
  this.box = box;

  this.initialFunc = function() {
    this.box.style.left = this.x;
    this.box.style.top = this.y;
  }
  this.moveRight = function(speed) {
    this.box.style.left = (this.x + speed);
    this.x = this.x + speed;
  }
  this.moveLeft = function(speed) {
    this.box.style.left = (this.x - speed) ;
    this.x = this.x - speed;
  }
  this.moveDown = function(speed) {
    this.box.style.top = (this.y + speed);
    this.y = this.y + speed;
  }
  this.moveUp = function(speed) {
    this.box.style.top = (this.y - speed);
    this.y = this.y - speed;
  }


}
