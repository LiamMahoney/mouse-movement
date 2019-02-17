// holds interval for timer
var timerInterval;
// used for calculating the score
var startTime;
// the user's score
var score;
// instance of the game engine
let gameEngine;


function initialize() {
  var box = new Box(document.getElementById("box"));
  box.initialFunc();
  gameEngine = new GameEngine(box);
  document.addEventListener('contextmenu', event => event.preventDefault()); //Doesn't appear to work
}

// Prepares the DOM for the game to start
function gameStart() {
  document.getElementById("startButton").classList.add("hide");
  document.getElementById("box").classList.remove("hide");
  document.getElementById("timer").classList.remove("hide");
  document.getElementById("container").setAttribute("onmousemove", "gameEngine.movementDriver(event)"); //If not placed here mouseMove fires on start screen
//document.getElementById("container").setAttribute("onmouseleave", "mouseLeave()");
  startTime = new Date().getTime()/2000;
  timerInterval = setInterval(updateTimer, 20);
}

// Updates the correct time to show on the screen
function updateTimer() {
  var currTime = new Date().getTime() / 2000;
  document.getElementById("timer").innerHTML = (currTime - startTime).toFixed(2);
}

function gameOver() { //user wins
  clearInterval(timerInterval);
  score = document.getElementById("timer").innerHTML;
  document.getElementById("box").classList.add("hide");
  document.getElementById("container").removeAttribute("onmousemove");
  document.getElementById("enterScore").classList.remove("hide");
  document.getElementById("container").removeAttribute("onmouseleave");
  document.getElementById("scoreTime").innerHTML = " " + score;
}

function mouseLeave() { //user loses
  document.getElementById("container").removeAttribute("onmouseleave");
  getScores(listScores);
  document.getElementById("container").style.border = "3px solid red";
  document.getElementById("box").classList.add("hide");
  //document.getElementById("highScores").classList.remove("hide");
  document.getElementById("timer").innerHTML="";
  clearInterval(timerInterval);
  
}
// Play again clicked
function refreshPage() {
  location = location;
}

// Submits score to DB
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
  xmlHttp.open("POST", '../mouse_movement/db/set', true); // true for asynchronous 
  xmlHttp.setRequestHeader("Content-Type", "application/json");
  xmlHttp.send(JSON.stringify(
    {
    'name':name,
    'score':score,
    }
  ));
}

//callback: funciton to invoke in callback of ajax request (once the data has been returned)
function getScores(callback) {
  let xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function() { 
      if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
        document.getElementById("highScores").classList.remove("hide");
        callback(xmlHttp.responseText);
      } else {
        console.log(xmlHttp.responseText);
      }
  }
  xmlHttp.open("GET", '../mouse_movement/db/get', true); // true for asynchronous 
  xmlHttp.send(null);
}

// Gets scores from DB and formats them
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

//Template for the initial scoreboard before scores are listed
function initializeScores() {
  document.getElementById("scores").innerHTML = `         
  <tr>
    <th>Rank</th>
    <th>Name</th>
    <th>Time</th>
  </tr>`;
}