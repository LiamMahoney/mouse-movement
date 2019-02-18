/**
 * Manages the state of the game. Responsible for loading different
 * game states (changing the UI) and submitting and getting scores.
 */
class GameController {

    gameEngine;
    timerInterval;
    startTime;
    score;

    /**
     * Creates a new instance of a GameController object. Creates an 
     * instance of Box and an instance of GameEngine. Also adds an event listener
     * that prevents left clicking (some users were using left click to move
     * the mouse without the box being able to respond).
     */
    constructor() {
        let box = new Box(document.getElementById("box"));
        this.gameEngine = new GameEngine(box);
        document.addEventListener("contextmenu", event => event.preventDefault()); // prevents left click
    }

    /**
     * Does the necessary work to prepare the UI for the game to start. Sets
     * the timer interval, which is what keeps track of the score. Sets two 
     * event listeners that shouldn't be present on the starting screen.
     */
    gameStart() {
        document.getElementById("startButton").classList.add("hide");
        document.getElementById("box").classList.remove("hide");
        document.getElementById("timer").classList.remove("hide");
        document.getElementById("container").addEventListener("mousemove", (event) => {
            this.gameEngine.movementDriver(event); //If not placed here mouseMove fires on start screen
        });
        document.getElementById("container").addEventListener("mouseleave", () => {
            this.userLost(); 
        });
        this.startTime = new Date().getTime() / 2000;
        this.timerInterval = setInterval(() => {
            this.updateTimer();
        }, 20);
    }

    /**
     * Updates the score (time) when called.
     */
    updateTimer() {
        let currTime = new Date().getTime() / 2000;
        document.getElementById("timer").innerHTML = (currTime - this.startTime).toFixed(2);
    }

    /**
     * Called when the successfully got their mouse over the box. Mostly
     * does UI work. Grabs the score from the DOM.
     */
    userWon() {
        clearInterval(this.timerInterval);
        this.score = document.getElementById("timer").innerHTML;
        document.getElementById("box").classList.add("hide");
        document.getElementById("container").removeAttribute("onmousemove");
        document.getElementById("enterScore").classList.remove("hide");
        document.getElementById("container").removeAttribute("onmouseleave");
        document.getElementById("scoreTime").innerHTML = " " + this.score;
    }
    
    /**
     * Called when the user loses (their mouse goes outisde of the boundary).
     * Mostly does UI work.
     */
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

    /**
     * Refreshes the page. Used for the play again functionality.
     */
    refreshPage() {
        location = location;
    }

    /**
     * Submits a score to the database to store it in the scoreboard.
     */
    submitScore() {
        this.putScore((response) => {
            this.getScores(() => {
                this.listScores(response);
            });
            document.getElementById("enterScore").classList.add("hide");
        });
    }

    /**
     * HTTP request to put score in database.
     * @param {function} callback function to execute once score has been placed.
     */
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

    /**
     * Gets the scores from the database.
     * @param {function} callback function to execute when the scores have
     * been retrieved.
     */
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

    /**
     * Puts the scores into the UI as the scoreboard.
     * @param {string} scores stringified JSON object containing score data
     */
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

    /**
     * Initializes the scoreboard column headings (Rank, Name, Score)
     */
    initializeScores() {
        document.getElementById("scores").innerHTML = `         
        <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Time</th>
        </tr>`;
    }
}
