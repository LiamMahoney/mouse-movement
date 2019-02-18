let gameController;

function initializer() {
    gameController = new GameController();
    document.getElementById("scoreboard-button").addEventListener('click', () => {
        gameController.refreshPage();
    });
    document.getElementById("scoreboard-again-button").addEventListener('click', () => {
        gameController.refreshPage();
    });
    document.getElementById("startButton").addEventListener('click', () => {
        gameController.gameStart();
    });
    document.getElementById("box").addEventListener('mouseover', () => {
        gameController.userWon();
    });
    document.getElementById("container").addEventListener('mosueleave', () => {
        gameController.userLost();
    });
    document.getElementById("submit-score-button").addEventListener('click', () => {
        gameController.submitScore();
    });
}


