var timerInterval;
var startTime;
var score;
var box = new Box(document.getElementById("box"));
var containerTop = document.getElementById("container").getBoundingClientRect().top;
var containerBottom = document.getElementById("container").getBoundingClientRect().bottom;
var containerLeft = document.getElementById("container").getBoundingClientRect().left;
var containerRight = document.getElementById("container").getBoundingClientRect().right;

function initialize() {
  box.initialFunc();
  document.addEventListener('contextmenu', event => event.preventDefault());
}

function gameStart() {
  document.getElementById("startButton").classList.add("hide");
  document.getElementById("box").classList.remove("hide");
  document.getElementById("timer").classList.remove("hide");
  document.getElementById("container").setAttribute("onmousemove", "mouseMove()"); //If not placed here mouseMove fires on start screen
  document.getElementById("container").setAttribute("onmouseleave", "mouseLeave()");
  startTime = new Date().getTime()/2000;
  timerInterval = setInterval(updateTimer, 20);
}

function mouseMove() {
  var mouseX = event.clientX;
  var mouseY = event.clientY;
  var boxRect = document.getElementById("box").getBoundingClientRect()
  var boxTop = boxRect.top;
  var boxBottom = boxRect.bottom;
  var boxLeft = boxRect.left;
  var boxRight = boxRect.right;
  var mouseInRange = false;
  if ((boxLeft - 100 < mouseX && mouseX < boxRight + 100) && (boxTop - 100 < mouseY && mouseY < boxBottom + 100)) {
    mouseInRange = true;
  }
  //Box is a long border of screen/div
  if (boxTop <= containerTop + 40 || boxLeft <= containerLeft + 40 || boxRight >= containerRight - 40 || boxBottom >= containerBottom - 40) {
    //Top left corner
    if (boxTop < containerTop + 40 && boxLeft < containerLeft + 40) {
      var b = boxTop - boxRight;
      var yPrime = mouseX + b;
      var val = yPrime - mouseY;
      if (val < 0 && mouseY < boxTop + 120 && mouseX < boxLeft + 120) {
        box.moveRight(40);
      } else if (val >= 0 && mouseY < boxTop + 120 && mouseX < boxLeft + 120) {
        box.moveDown(40);
      }
      //Top right corner
    } else if (boxTop < containerTop + 40 && boxRight > containerRight - 40) {
      var b = boxTop + boxRight;
      var yPrime = (-1*mouseX) + b;
      var val = yPrime - mouseY;
      if (val < 0 && mouseY < boxTop + 120 && mouseX > boxRight - 120) {
        box.moveLeft(40);
      } else if (val >= 0 && mouseY < boxTop + 120 &&  mouseX > boxRight - 120) {
        box.moveDown(40);
      }
      //Bottom right corner
    } else if (boxBottom > containerBottom - 40 && boxRight > containerRight - 40) {
      var b = boxTop - boxLeft;
      var yPrime = mouseX + b;
      var val = yPrime - mouseY;
      if (val < 0 && mouseX > boxRight - 120 && mouseY > boxBottom - 120) {
        box.moveUp(40);
      } else if (val >= 0 && mouseX > boxRight - 120 && mouseY > boxBottom - 120) {
        box.moveLeft(40);
      }
      //Bottom left corner
    } else if (boxBottom > containerBottom - 40 && boxLeft < containerLeft + 40) {
      var b = boxTop + boxRight;
      var yPrime = (-1*mouseX) + b;
      var val = yPrime - mouseY;
      if (val < 0 && mouseY > boxBottom - 120 && mouseX < boxLeft + 120) {
        box.moveUp(40);
      } else if (val >= 0 && mouseY > boxBottom - 120 && mouseX < boxLeft + 120) {
        box.moveRight(40);
      }
      //Along top of border
    } else if (boxTop < containerTop + 40 && mouseInRange) {
      if (mouseX > boxLeft + 10) {
        var b = boxTop - boxRight;
        var yPrime = mouseX + b;
        var val = yPrime - mouseY;
        if (val < 0) {
          box.moveLeft(30);
        } else if (val >= 0) {
          box.moveLeft(30);
          box.moveDown(30);
        }
      } else if (mouseX <= boxLeft + 10) {
        var b = boxTop + boxRight;
        var yPrime = (-1*mouseX) + b;
        var val = yPrime - mouseY;
        if (val < 0) {
          box.moveRight(30);
        } else if (val >= 0) {
          box.moveDown(30);
          box.moveRight(30);
        }
      }
      //Along right of border TODO: random isn't working from bottom
    } else if (boxRight > containerRight - 40 && mouseInRange) {
      if (mouseY <= boxTop + 10) {
        var b = boxTop - boxLeft;
        var yPrime = mouseX + b;
        var val = yPrime - mouseY;
        if (val < 0 && mouseX > boxRight - 120 && mouseY > boxBottom - 120) {
          box.moveLeft(30);
        } else if (val >= 0 && mouseX > boxRight - 120 && mouseY > boxBottom - 120) {
          box.moveLeft(30);
          box.moveDown(30);
        }
      } else if (mouseY > boxTop + 10) {
        var b = boxTop + boxRight;
        var yPrime = (-1*mouseX) + b;
        var val = yPrime - mouseY;
        if (val < 0 && mouseY < boxTop + 120 && mouseX > boxRight - 120) {
          box.moveUp(30);
          box.moveLeft(30);
        } else if (val >= 0 && mouseY < boxTop + 120 &&  mouseX > boxRight - 120) {
          box.moveUp(30);
        }
      }
      //Along bottom
    } else if (boxBottom > containerBottom - 40 && mouseInRange) {
      if (mouseX > boxLeft + 10) {
        var b = boxTop + boxRight;
        var yPrime = (-1*mouseX) + b;
        var val = yPrime - mouseY;
        if (val < 0 && mouseY > boxBottom - 120 && mouseX < boxLeft + 120) {
          box.moveUp(30);
          box.moveLeft(30);
        } else if (val >= 0 && mouseY > boxBottom - 120 && mouseX < boxLeft + 120) {
          box.moveLeft(30);
        }
      } else if (mouseX <= boxLeft + 10) {
        var b = boxTop - boxLeft;
        var yPrime = mouseX + b;
        var val = yPrime - mouseY;
        if (val < 0 && mouseX > boxRight - 120 && mouseY > boxBottom - 120) {
          box.moveUp(30);
          box.moveRight(30);
        } else if (val >= 0 && mouseX > boxRight - 120 && mouseY > boxBottom - 120) {
          box.moveRight(30);
        }
      }
      //Along left
    }  else if (boxLeft < containerLeft + 40 && mouseInRange) {
      if (mouseY > boxTop + 10) {
        var b = boxTop - boxRight;
        var yPrime = mouseX + b;
        var val = yPrime - mouseY;
        if (val < 0 && mouseY < boxTop + 120 && mouseX < boxLeft + 120) {
          box.moveUp(30);
          box.moveRight(30);
        } else if (val >= 0 && mouseY < boxTop + 120 && mouseX < boxLeft + 120) {
          box.moveUp(30);
        }
      } else if (mouseY <= boxTop + 10) {
        var b = boxTop + boxRight;
        var yPrime = (-1*mouseX) + b;
        var val = yPrime - mouseY;
        if (val < 0 && mouseY > boxBottom - 120 && mouseX < boxLeft + 120) {
          box.moveDown(30);
        } else if (val >= 0 && mouseY > boxBottom - 120 && mouseX < boxLeft + 120) {
          box.moveRight(30);
          box.moveDown(30);
        }
      }
    }
    //Box is not along border of screen/div
  } else {
    //Mouse is in top left square
    if ((boxTop - 100 < mouseY && mouseY < boxTop) && (boxLeft - 100 < mouseX && mouseX < boxLeft)) {
      box.moveDown(30);
      box.moveRight(30);
      var temp = Math.random();
      if (temp < .4) {
        box.moveUp(30);
      } else if (.4 < temp && temp < .8) {
        box.moveLeft(30);
      }
    //Mouse is in square directly above box
  } else if ((boxTop - 100 < mouseY && mouseY < boxTop) && (boxLeft < mouseX && mouseX < boxRight)) {
      box.moveDown(30);
      var temp = Math.random();
      if (temp < .4) {
        box.moveRight(30);
      } else if (.4 < temp && temp < .8) {
        box.moveLeft(30);
      }
    //Mouse is in top right square
    } else if ((boxTop - 100 < mouseY && mouseY < boxTop) && (boxRight < mouseX && mouseX < boxRight + 100)) {
      box.moveLeft(30);
      box.moveDown(30);
      var temp = Math.random();
      if (temp < .4) {
        box.moveRight(30);
      } else if (.4 < temp < .8) {
        box.moveUp(30);
      }
    //Mouse is in square directly to right of box
    } else if ((boxTop < mouseY && mouseY < boxBottom) && (boxRight < mouseX && mouseX < boxRight + 100)) {
      box.moveLeft(30);
      var temp = Math.random();
      if (temp < .4) {
        box.moveUp(30);
      } else if (.4 < temp && temp < .8) {
        box.moveDown(30);
      }
    //Mouse is in bottom right square
    } else if ((boxBottom < mouseY && mouseY < boxBottom + 100) && (boxRight < mouseX && mouseX < boxRight + 100)) {
      box.moveLeft(30);
      box.moveUp(30);
      var temp = Math.random();
      if (temp < .4) {
        box.moveDown(30);
      } else if (.4 < temp && temp < .8) {
        box.moveRight(30);
      }
    //Mouse is in square directly below box
    } else if ((boxBottom < mouseY && mouseY < boxBottom + 100) && (boxLeft < mouseX && mouseX < boxRight)) {
      box.moveUp(30);
      var temp = Math.random();
      if (temp < .4) {
        box.moveLeft(30);
      } else if (.4 < temp && temp < .8) {
        box.moveRight(30);
      }
    //Mouse is in bottom left square
    } else if ((boxBottom < mouseY && mouseY < boxBottom + 100) && (boxLeft - 100 < mouseX && mouseX < boxLeft)) {
      box.moveRight(30);
      box.moveUp(30);
      var temp = Math.random();
      if (temp < .4) {
        box.moveDown(30);
      } else if (.4 < temp && temp < .8) {
        box.moveLeft(30);
      }
    //Mouse is in square directly left of box
    } else if ((boxTop < mouseY && mouseY < boxBottom) && (boxLeft - 100 < mouseX && mouseX < boxLeft)) {
      box.moveRight(30);
      var temp = Math.random();
      if (temp < .4) {
        box.moveUp(30);
      } else if (.4 < temp && temp < .8) {
        box.moveDown(30);
      }
    }
  }

}

function updateTimer() {
  var currTime = new Date().getTime() / 2000;
  document.getElementById("timer").innerHTML = (currTime - startTime).toFixed(2);
}

function gameOver() {
  clearInterval(timerInterval);
  score = document.getElementById("timer").innerHTML;
  document.getElementById("box").classList.add("hide");
  document.getElementById("container").removeAttribute("onmousemove");
  document.getElementById("enterScore").classList.remove("hide");
  document.getElementById("container").removeAttribute("onmouseleave");
  document.getElementById("scoreTime").innerHTML = " " + score;
}

function mouseLeave() {
  document.getElementById("container").removeAttribute("onmouseleave");
  getScores(listScores);
  document.getElementById("container").style.border = "3px solid red";
  document.getElementById("box").classList.add("hide");
  //document.getElementById("highScores").classList.remove("hide");
  document.getElementById("timer").innerHTML="";
  clearInterval(timerInterval);
  
}

function refreshPage() {
  location = location;
}

function submitScore() {
  putScore(function(response) {
    getScores(listScores);
    document.getElementById("enterScore").classList.add("hide");
  });
}

//callback: funciton to invoke in callback of ajax request (once the data has been returned)
function putScore(callback) {
  let xmlHttp = new XMLHttpRequest();
  let name = document.getElementById("user-name").value;
  xmlHttp.onreadystatechange = function() { 
      if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
        callback(xmlHttp.responseText);
      }
  }
  xmlHttp.open("POST", './db/set', true); // true for asynchronous 
  xmlHttp.setRequestHeader("Content-Type", "application/json");
  xmlHttp.send(JSON.stringify(
    {
    'name':name,
    'score':score,
    }
));

}

//callback: funciton to invoke in callback of ajax request (once the data has been returend)
function getScores(callback) {
  let xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function() { 
      if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
        document.getElementById("highScores").classList.remove("hide");
        callback(xmlHttp.responseText);
      }
  }
  xmlHttp.open("GET", './db/get', true); // true for asynchronous 
  xmlHttp.send(null);
}

function listScores(scores) {
  initializeScores();
  scores = JSON.parse(scores);
  for (let i = 0; i < scores.length; i++) {
    document.getElementById("scores").innerHTML += `
    <tr class="score-row">
      <td>${i + 1}</td>
      <td>${scores[i].name}</td>
      <td>${scores[i].score}</td>
    </tr>`;
  }
}

function initializeScores() {
  document.getElementById("scores").innerHTML = `         
  <tr>
    <th>Rank</th>
    <th>Name</th>
    <th>Time</th>
  </tr>`;
}