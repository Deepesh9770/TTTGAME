const board = document.getElementById("board");
const cells = document.querySelectorAll(".cell");
const message = document.getElementById("message");
const resetButton = document.getElementById("reset");

let currentPlayer = "X";
let gameBoard = ["", "", "", "", "", "", "", "", ""];
let gameOver = false;

function makeMove(cell) {
    const cellIndex = Array.from(cells).indexOf(cell);

    if (gameBoard[cellIndex] === "" && !gameOver) {
        cell.textContent = currentPlayer;
        gameBoard[cellIndex] = currentPlayer;
        cell.classList.add("occupied");

        if (checkWin()) {
            gameOver = true;
            message.textContent = `${currentPlayer} wins!`;
        } else if (gameBoard.every((cell) => cell !== "")) {
            gameOver = true;
            message.textContent = "It's a draw!";
        } else {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
        }
    }
}

function checkWin() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (gameBoard[a] !== "" && gameBoard[a] === gameBoard[b] && gameBoard[b] === gameBoard[c]) {
            return true;
        }
    }

    return false;
}

function resetBoard() {
    gameBoard = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    gameOver = false;
    message.textContent = "";
    cells.forEach((cell) => {
        cell.textContent = "";
        cell.classList.remove("occupied");
    });
}

resetButton.addEventListener("click", resetBoard);
