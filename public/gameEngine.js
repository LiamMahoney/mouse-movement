class GameEngine {
    
    box;
    mouseX;
    mouseY;
    boxRect;
    boxTop;
    boxBottom;
    boxLeft;
    boxRight;
    mouseInRangeFlag;
    containerTop;
    containerBottom;
    containerLeft;
    containerRight;

//TODO: need to change all variables listed above that are used below this line to have "this" in front of them
//TODO: use let instead of var EVERYWEHRE

    /**
     * Creates an instance of the game engine. Needs the box to be 
     * passed in so the functinos can access it. Also sets the 
     * container variables which hold the coordinates of the container
     * the game is played within.
     * @param {Element} box the small box that avoids the user's mouse 
     */
    constructor(box) {
        this.box = box;
        this.containerTop = document.getElementById("container").getBoundingClientRect().top;
        this.containerBottom = document.getElementById("container").getBoundingClientRect().bottom;
        this.containerLeft = document.getElementById("container").getBoundingClientRect().left;
        this.containerRight = document.getElementById("container").getBoundingClientRect().right;
    }

    /**
     * Updates the class fields with updated information. 
     * @param {Event} event object passed from mousemove event 
     */
    updateVars(event) {
        this.mouseX = event.clientX;
        this.mouseY = event.clientY;
        this.boxRect = document.getElementById("box").getBoundingClientRect();
        this.boxTop = this.boxRect.top;
        this.boxBottom = this.boxRect.bottom;
        this.boxLeft = this.boxRect.left;
        this.boxRight = this.boxRect.right;

        if (this.mouseInRange()) this.mouseInRangeFlag = true;
    }

    /**
     * Checks if the mouse is within 100 pixels of the box.
     * @returns true if it is, false otherwise.
     */
    mouseInRange() {
        if ((this.boxLeft - 100 < this.mouseX && this.mouseX < this.boxRight + 100) && (this.boxTop - 100 < this.mouseY && this.mouseY < this.boxBottom + 100)) return true;
        return false;
    }

    /**
     * Checks if the box is within 40 pixels of the border. 
     * @returns true if it is, false otherwise.
     */
    boxAlongBorder() {
        if (this.boxTop <= this.containerTop + 40 || this.boxLeft <= this.containerLeft + 40 || this.boxRight >= this.containerRight - 40 || this.boxBottom >= this.containerBottom - 40) return true;
        return false;
    }
 
    /**
     * Checks if any part of the box is within 40 pixels of a corner. 
     * Note: this functino is intentionally giving up some efficiency 
     * in favor of better readability of the code. 
     * //TODO: link to github readme picture discribing this better.
     * @returns three letter string code if it's within a corner, 
     * false otherwise.
     */
    boxInCorner() {
        if (this.boxTop < this.containerTop + 40 && this.boxLeft < this.containerLeft + 40) {
            // top left corner
            return "TLC";
        } else if (this.boxTop < this.containerTop + 40 && this.boxRight > this.containerRight - 40) {
            // top right corner
            return "TRC";
        } else if (this.boxBottom > this.containerBottom - 40 && this.boxRight > this.containerRight - 40) {
            // bottom right corner
            return "BRC";
        } else if (this.boxBottom > this.containerBottom - 40 && this.boxLeft < this.containerLeft + 40) {
            // bottom left corner
            return "BLC";
        }
        return false;
    }

    /**
     * Determines if the mouse is to the right or below the box
     * by drawing a hypothetical line through the top left and 
     * bottom right corners of the box and checking whether the 
     * mouse is above or below that line.
     */
    topLeftCornerMove() {
        let b = this.boxTop - this.boxRight;
        let yPrime = this.mouseX + b;
        let val = yPrime - this.mouseY;
        if (val < 0 && this.mouseY < this.boxTop + 120 && this.mouseX < this.boxLeft + 120) {
            this.box.moveRight(40);
        } else if (val >= 0 && this.mouseY < this.boxTop + 120 && this.mouseX < this.boxLeft + 120) {
            this.box.moveDown(40);
        }
    }

    /**
     * Determines if the mouse is to the left or below the box
     * by drawing a hypothetical line through the top right and 
     * bottom left corners of the box and checking whether the 
     * mouse is above or below that line.
     */
    topRightCornerMove() {
        let b = this.boxTop + this.boxRight;
        let yPrime = (-1*this.mouseX) + b;
        let val = yPrime - this.mouseY;
        if (val < 0 && this.mouseY < this.boxTop + 120 && this.mouseX > this.boxRight - 120) {
            this.box.moveLeft(40);
        } else if (val >= 0 && this.mouseY < this.boxTop + 120 &&  this.mouseX > this.boxRight - 120) {
            this.box.moveDown(40);
        }
    }

    /**
     * Determiens if the mouse is to the left or above the box
     * by drawing a hypothetical line through the top left and 
     * bottom right corners of the box and checking whether the 
     * mouse is above or below that line.
     */
    bottomRightCornerMove() {
        let b = this.boxTop - this.boxLeft;
        let yPrime = this.mouseX + b;
        let val = yPrime - this.mouseY;
        if (val < 0 && this.mouseX > this.boxRight - 120 && this.mouseY > this.boxBottom - 120) {
            this.box.moveUp(40);
        } else if (val >= 0 && this.mouseX > this.boxRight - 120 && this.mouseY > this.boxBottom - 120) {
            this.box.moveLeft(40);
        } 
    }

    /**
     * Determines if hte mouse is to the right or above the box
     * by drawing a hypothetical line through the top right and 
     * bottom left corners of the box and checking whether the
     * mouse is above or below that line.
     */
    bottomLeftCornerMove() {
        let b = this.boxTop + this.boxRight;
        let yPrime = (-1*this.mouseX) + b;
        let val = yPrime - this.mouseY;
        if (val < 0 && this.mouseY > this.boxBottom - 120 && this.mouseX < this.boxLeft + 120) {
            this.box.moveUp(40);
        } else if (val >= 0 && this.mouseY > this.boxBottom - 120 && this.mouseX < this.boxLeft + 120) {
            this.box.moveRight(40);
        }
    }

    /**
     * Checks if the box is within 40 pixels of the top border.
     * @returns true if it is, false otherwise.
     */
    boxAlongTopBorder() {
        if (this.boxTop < this.containerTop + 40 && this.mouseInRangeFlag) return true;
        return false;
    }

    /**
     * Checks if the box is within 40 pixels fo the right border.
     * @returns true if it is, false otherwise. 
     */
    boxAlongRightBorder() {
        if (this.boxRight > this.containerRight - 40 && this.mouseInRangeFlag) return true;
        return false;
    }

    /**
     * Checks if the box is within 40 pixels of the bottom border.
     * @returns true if it is, false otherwise.
     */
    boxAlongBottomBorder() {
        if (this.boxBottom > this.containerBottom - 40 && this.mouseInRangeFlag) return true;
        return false;
    }

    /**
     * Checks if the box is within 40 pixels of the left border.
     * @returns true if it is, false otherwise.
     */
    boxAlongLeftBorder() {
        if (this.boxLeft < this.containerLeft + 40 && this.mouseInRangeFlag) return true;
        return false;
    }

    /**
     * First determines if the mouse is in the left or right half of 
     * the extended box. Once that is determined, need to see if the mouse
     * is above or below a hypothetical line drawn through the 
     * corners of the box to determine which move to make.
     */
    topBorderMove() {
        if (this.mouseX > this.boxLeft + 10) {
            // mouse is to the right of the box
            var b = this.boxTop - this.boxRight;
            var yPrime = this.mouseX + b;
            var val = yPrime - this.mouseY;
            if (val < 0) {
                // mouse is below line
                this.box.moveLeft(30);
            } else if (val >= 0) {
                // mouse is above line
                this.box.moveLeft(30);
                this.box.moveDown(30);
            }
        } else if (this.mouseX <= this.boxLeft + 10) {
            //mouse is to the left of the box
            var b = this.boxTop + this.boxRight;
            var yPrime = (-1*this.mouseX) + b;
            var val = yPrime - this.mouseY;
            if (val < 0) {
                // mouse is below line
                this.box.moveRight(30);
            } else if (val >= 0) {
                //mouse is above line
                this.box.moveDown(30);
                this.box.moveRight(30);
            }
        }
    }
    /**
     * First determines if the mouse is in the top or bottom half
     * of the extended box. Once that is determined, checks if the mouse is 
     * above or below a hypothetical line drawn through the corners
     * of the box to determine which move to make.
     */
    rightBorderMove() {
        if (this.mouseY <= this.boxTop + 10) {
            // mouse is above the box
            var b = this.boxTop - this.boxLeft;
            var yPrime = this.mouseX + b;
            var val = yPrime - this.mouseY;
            if (val < 0 && this.mouseX > this.boxRight - 120 && this.mouseY > this.boxBottom - 120) {
                // mouse is below the line
                this.box.moveLeft(30);
            } else if (val >= 0 && this.mouseX > this.boxRight - 120 && this.mouseY > this.boxBottom - 120) {
                // mouse is above the line
                this.box.moveLeft(30);
                this.box.moveDown(30);
            }
        } else if (this.mouseY > this.boxTop + 10) {
            // mouse is below the box
            var b = this.boxTop + this.boxRight;
            var yPrime = (-1*this.mouseX) + b;
            var val = yPrime - this.mouseY;
            if (val < 0 && this.mouseY < this.boxTop + 120 && this.mouseX > this.boxRight - 120) {
                // mouse is below line
                this.box.moveUp(30);
                this.box.moveLeft(30);
            } else if (val >= 0 && this.mouseY < this.boxTop + 120 &&  this.mouseX > this.boxRight - 120) {
                // mouse is above line
                this.box.moveUp(30);
            }
        }
    }

    /**
     * First determines if the mouse is in the left or right half
     * of the extended box. Once that is determined, checks if the mouse is
     * above or below a hypothetical line drawn through the corners
     * of the box to determine which move to make.
     */
    bottomBorderMove() {
        if (this.mouseX > this.boxLeft + 10) {
            // mouse is to the right of the box
            var b = this.boxTop + this.boxRight;
            var yPrime = (-1*this.mouseX) + b;
            var val = yPrime - this.mouseY;
            if (val < 0 && this.mouseY > this.boxBottom - 120 && this.mouseX < this.boxLeft + 120) {
                // mouse is below line
                this.box.moveUp(30);
                this.box.moveLeft(30);
            } else if (val >= 0 && this.mouseY > this.boxBottom - 120 && this.mouseX < this.boxLeft + 120) {
                // mouse is above the line
                this.box.moveLeft(30);
            }
        } else if (this.mouseX <= this.boxLeft + 10) {
            // mouse is to the left of the box
            var b = this.boxTop - this.boxLeft;
            var yPrime = this.mouseX + b;
            var val = yPrime - this.mouseY;
            if (val < 0 && this.mouseX > this.boxRight - 120 && this.mouseY > this.boxBottom - 120) {
                // mouse is below line
                this.box.moveUp(30);
                this.box.moveRight(30);
            } else if (val >= 0 && this.mouseX > this.boxRight - 120 && this.mouseY > this.boxBottom - 120) {
                // mouse is above line
                this.box.moveRight(30);
            }
        }
    }

    /**
     * First determines if the mouse is in the top or bottom half
     * of the extended box. Once that is determined, checks if the mouse is
     * above or below a hypothetical line drawn through the corners of
     * the box to determine whcih move to make.
     */
    leftBorderMove() {
        if (this.mouseY > this.boxTop + 10) {
            // mouse is in bottom half of extended box
            var b = this.boxTop - this.boxRight;
            var yPrime = this.mouseX + b;
            var val = yPrime - this.mouseY;
            if (val < 0 && this.mouseY < this.boxTop + 120 && this.mouseX < this.boxLeft + 120) {
                // mouse is below line
                this.box.moveUp(30);
                this.box.moveRight(30);
            } else if (val >= 0 && this.mouseY < this.boxTop + 120 && this.mouseX < this.boxLeft + 120) {
                // mouse is above line
                this.box.moveUp(30);
            }
        } else if (this.mouseY <= this.boxTop + 10) {
            // mouse is in top half of extended box
            var b = this.boxTop + this.boxRight;
            var yPrime = (-1*this.mouseX) + b;
            var val = yPrime - this.mouseY;
            if (val < 0 && this.mouseY > this.boxBottom - 120 && this.mouseX < this.boxLeft + 120) {
                // mouse is below line
                this.box.moveDown(30);
            } else if (val >= 0 && this.mouseY > this.boxBottom - 120 && this.mouseX < this.boxLeft + 120) {
                // mouse is above line
                this.box.moveRight(30);
                this.box.moveDown(30);
            }
        }
    }

    /**
     * Guaranteed to move the box down and right. 40% chance of 
     * moving the box up, 40% chance of moving the box left and
     * a 20% chance of just moving the box down and right.
     * Randomness added to make the box's behavior less predictable.
     */
    box1Move() {
        this.box.moveDown(30);
        this.box.moveRight(30);
        var temp = Math.random();
        if (temp < .4) {
            this.box.moveUp(30);
        } else if (.4 < temp && temp < .8) {
            this.box.moveLeft(30);
        }
    }

    /**
     * Guaranteed to move the box down. 40% chance of moving the
     * box to the right, 40% chance of moving the box to the left, 
     * and a 20% chance of just moving the box down.
     * Randomnees added to make the box's behavior less predictable.
     */
    box2Move() {
        this.box.moveDown(30);
        var temp = Math.random();
        if (temp < .4) {
            this.box.moveRight(30);
        } else if (.4 < temp && temp < .8) {
            this.box.moveLeft(30);
        }
    }

    /**
     * Guaranteed to move the box down and left. 40% chance of 
     * moving the box up, 40% chance of moving the box right and
     * a 20% chance of just moving the box down and left.
     * Randomness added to make the box's behavior less predictable.
     */
    box3Move() {
        this.box.moveLeft(30);
        this.box.moveDown(30);
        var temp = Math.random();
        if (temp < .4) {
            this.box.moveRight(30);
        } else if (.4 < temp < .8) {
            this.box.moveUp(30);
        }
    }

    /**
     * Guaranteed to move the box left. 40% chance of moving the
     * box up, 40% chance of moving the box down, 
     * and a 20% chance of just moving the box left.
     * Randomnees added to make the box's behavior less predictable.
     */
    box4Move() {
        this.box.moveLeft(30);
        var temp = Math.random();
        if (temp < .4) {
            this.box.moveUp(30);
        } else if (.4 < temp && temp < .8) {
            this.box.moveDown(30);
        }
    }

    /**
     * Guaranteed to move the box up and left. 40% chance of 
     * moving the box down, 40% chance of moving the box right and
     * a 20% chance of just moving the box up and left.
     * Randomness added to make the box's behavior less predictable.
     */
    box5Move() {
        this.box.moveLeft(30);
        this.box.moveUp(30);
        var temp = Math.random();
        if (temp < .4) {
            this.box.moveDown(30);
        } else if (.4 < temp && temp < .8) {
            this.box.moveRight(30);
        }
    }

    /**
     * Guaranteed to move the box left. 40% chance of moving the
     * box up, 40% chance of moving the box down, 
     * and a 20% chance of just moving the box left.
     * Randomnees added to make the box's behavior less predictable.
     */
    box6Move() {
        this.box.moveUp(30);
        var temp = Math.random();
        if (temp < .4) {
            this.box.moveLeft(30);
        } else if (.4 < temp && temp < .8) {
            this.box.moveRight(30);
        }
    }

    /**
     * Guaranteed to move the box up and right. 40% chance of 
     * moving the box down, 40% chance of moving the box left and
     * a 20% chance of just moving the box up and right.
     * Randomness added to make the box's behavior less predictable.
     */
    box7Move() {
        this.box.moveRight(30);
        this.box.moveUp(30);
        var temp = Math.random();
        if (temp < .4) {
            this.box.moveDown(30);
        } else if (.4 < temp && temp < .8) {
            this.box.moveLeft(30);
        }
    }

    /**
     * Guaranteed to move the box right. 40% chance of moving the
     * box up, 40% chance of moving the box down, 
     * and a 20% chance of just moving the box right.
     * Randomnees added to make the box's behavior less predictable.
     */
    box8Move() {
        this.box.moveRight(30);
        var temp = Math.random();
        if (temp < .4) {
            this.box.moveUp(30);
        } else if (.4 < temp && temp < .8) {
            this.box.moveDown(30);
        }
    }

    /**
     * Checks if the mouse is both above the box and to the left of the left
     * edge of the box.
     * @returns true if it is, false otherwise.
     */
    mouseInBox1() {
        if ((this.boxTop - 100 < this.mouseY && this.mouseY < this.boxTop) && (this.boxLeft - 100 < this.mouseX && this.mouseX < this.boxLeft)) return true;
        return false;
    }

    /**
     * Checks if the mouse is in the 20 pixels direclty above the box.
     * @returns true if it is, false otherwise.
     */
    mouseInBox2() {
        if ((this.boxTop - 100 < this.mouseY && this.mouseY < this.boxTop) && (this.boxLeft < this.mouseX && this.mouseX < this.boxRight)) return true;
        return false;
    }

    /**
     * Checks if the mouse is both above the box and to the right of the 
     * right edge of the box.
     * @returns true if it is, false otherwise.
     */
    mouseInBox3() {
        if ((this.boxTop - 100 < this.mouseY && this.mouseY < this.boxTop) && (this.boxRight < this.mouseX && this.mouseX < this.boxRight + 100)) return true;
        return false;
    }

    /**
     * Checks if the mosue is in the 20 pixels directly to the right 
     * of the box. 
     * @returns true if it is, false otherwise.
     */
    mouseInBox4() {
        if ((this.boxTop < this.mouseY && this.mouseY < this.boxBottom) && (this.boxRight < this.mouseX && this.mouseX < this.boxRight + 100)) return true;
        return false;
    }

    /**
     * Checks if the mouse is both below the box and to the right of the 
     * right edge of the box.
     * @returns true if it is, false otherwise.
     */
    mouseInBox5() {
        if ((this.boxBottom < this.mouseY && this.mouseY < this.boxBottom + 100) && (this.boxRight < this.mouseX && this.mouseX < this.boxRight + 100)) return true;
        return false;
    }

    /**
     * Checkks if the mouse is in the 20 pixels directly below the box.
     * @returns true if it is, false otherwise.
     */
    mouseInBox6() {
        if ((this.boxBottom < this.mouseY && this.mouseY < this.boxBottom + 100) && (this.boxLeft < this.mouseX && this.mouseX < this.boxRight)) return true;
        return false;
    }

    /**
     * Checks if the mouse is both below the box and to the left of the left 
     * edge of the box.
     * @returns true if it is, false otherwise.
     */
    mouseInBox7() {
        if ((this.boxBottom < this.mouseY && this.mouseY < this.boxBottom + 100) && (this.boxLeft - 100 < this.mouseX && this.mouseX < this.boxLeft)) return true;
        return false;
    }

    /**
     * Checks if the mouse is in the 20 pixels directly to the right 
     * of the box.
     * @returns true if it is, false otherwise.
     */
    mouseInBox8() {
        if ((this.boxTop < this.mouseY && this.mouseY < this.boxBottom) && (this.boxLeft - 100 < this.mouseX && this.mouseX < this.boxLeft)) return true;
        return false;
    }

    /**
     * Makes a corner move depending on which corner the box is in. Corner
     * flags are discovered through the boxInCorner() function.
     * @param {string} corner three letter string code that signals which 
     * corner the box is in. Should be either TLC, TRC, BRC, or BLC.
     */
    cornerMove(corner) {
        switch(corner) {
            case("TLC"): 
                this.topLeftCornerMove();
                break;
            case("TRC"):
                this.topRightCornerMove();
                break;
            case("BRC"): 
                this.bottomRightCornerMove();
                break;
            case("BLC"):
                this.bottomLeftCornerMove();
                break;
        }
    }

    /**
     * Determines which border the box is along and then 
     * executes the proper move based on that dicision.
     */
    borderMove() {
        if (this.boxAlongTopBorder()) {
            this.topBorderMove();
        } else if (this.boxAlongRightBorder()) {
            this.rightBorderMove();
        } else if (this.boxAlongBottomBorder()) {
            this.bottomBorderMove();
        } else if (this.boxAlongLeftBorder()) {
            this.leftBorderMove();
        }
    }

    /**
     * Checks if box is in corner (any part of the box is within 40 
     * pixels of the side and top/bottom boundary), if it's not, then 
     * the box must be within 40 pixels of the border, and a border 
     * move should happen.
     */
    determineBorderMove() {
        let corner = this.boxInCorner();

        if (corner) {
            this.cornerMove(corner)
        } else {
            this.borderMove();
        }
    }

    /**
     * Determines where the mouse is in relation to the box, and then
     * executes the correct move based on that knowledge. 
     * A better understanding of the numbering system used here can be
     * found in the project's github readme
     * (https://github.com/LiamMahoney/Mouse-Movement/blob/master/README.md).
     */
    normalMove() {
        if (this.mouseInBox1()) {
            this.box1Move();
        } else if (this.mouseInBox2()) {
            this.box2Move();
        } else if (this.mouseInBox3()) {
            this.box3Move();
        } else if (this.mouseInBox4()) {
            this.box4Move();
        } else if (this.mouseInBox5()) {
            this.box5Move();
        } else if (this.mouseInBox6()) {
            this.box6Move();
        } else if (this.mouseInBox7()) {
            this.box7Move();
        } else if (this.mouseInBox8()) {
            this.box8Move();
        }
    }

    /**
     * Determines which actions to take based on the postion of the box 
     * and the position of the user's mouse. Should be called after
     * a mousemovement event has been emitted from within the div 
     * #container.
     * @param {Event} event object passed from mousemove event
     */
    movementDriver(event) {
        this.updateVars(event);

        if (this.boxAlongBorder()) {
            this.determineBorderMove();
        } else {
            this.normalMove();
        }

    }
}