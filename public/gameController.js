class GameController {

    gameEngine;
    timerInterval;
    startTime;
    score;

    constructor() {
        let box = new Box(document.getElementById("box"));
        //box.initialFunc();
        this.gameEngine = new GameEngine(box);
        document.addEventListener("contextmenu", event => event.preventDefault()); // prevents left click
    }

    gameStart() {
        document.getElementById("startButton").classList.add("hide");
        document.getElementById("box").classList.remove("hide");
        document.getElementById("timer").classList.remove("hide");
        document.getElementById("container").addEventListener("mousemove", (event) => {
            this.gameEngine.movementDriver(event); //If not placed here mouseMove fires on start screen
        });
        document.getElementById("container").addEventListener("mouseleave", () => {
            this.mouseLeave(); 
        });
        this.startTime = new Date().getTime() / 2000;
        this.timerInterval = setInterval(() => {
            this.updateTimer();
        }, 20);
    }

    updateTimer() {
        let currTime = new Date().getTime() / 2000;
        document.getElementById("timer").innerHTML = (currTime - this.startTime).toFixed(2);
    }

    userWon() {
        clearInterval(this.timerInterval);
        this.score = document.getElementById("timer").innerHTML;
        document.getElementById("box").classList.add("hide");
        document.getElementById("container").removeAttribute("onmousemove");
        document.getElementById("enterScore").classList.remove("hide");
        document.getElementById("container").removeAttribute("onmouseleave");
        document.getElementById("scoreTime").innerHTML = " " + this.score;
    }
    
    userLost() {
        document.getElementById("container").removeAttribute("onmouseleave");
        this.getScores((scores) => {
            this.listScores(scores); 
        });
        document.getElementById("container").style.border = "3px solid red";
        document.getElementById("box").classList.add("hide");
        document.getElementById("timer").innerHTML="";
        clearInterval(this.timerInterval);
    }

    mouseLeave() {
        document.getElementById("container").removeAttribute("onmouseleave");
        this.getScores((scores) => {
            this.listScores(scores);
        });
        document.getElementById("container").style.border = "3px solid red";
        document.getElementById("box").classList.add("hide");
        document.getElementById("timer").innerHTML="";
        clearInterval(this.timerInterval);
    }

    refreshPage() {
        location = location;
    }

    submitScore() {
        this.putScore((response) => {
            this.getScores(() => {
                this.listScores(response);
            });
            document.getElementById("enterScore").classList.add("hide");
        });
    }

    putScore(callback) {
        let xmlHttp = new XMLHttpRequest();
        let name = document.getElementById("user-name").value;
        xmlHttp.onreadystatechange = function() { 
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                callback(xmlHttp.responseText);
            }
        }

        xmlHttp.open("POST", '../db/set', true); // true for asynchronous 
        xmlHttp.setRequestHeader("Content-Type", "application/json");

        xmlHttp.send(JSON.stringify(
            {
                'name':name,
                'score':this.score,
            }
        ));
    }

    getScores(callback) {
        let xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function() { 
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                document.getElementById("highScores").classList.remove("hide");
                callback(xmlHttp.responseText);
            } else {
                // TODO: error handling
            }
        }

        xmlHttp.open("GET", '../db/get', true); // true for asynchronous 

        xmlHttp.send(null);
    }

    listScores(scores) {
        this.initializeScores();
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

    initializeScores() {
        document.getElementById("scores").innerHTML = `         
        <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Time</th>
        </tr>`;
    }
}
