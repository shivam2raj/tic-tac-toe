
const express = require("express");
const cors = require("cors");
const app = express();

app.get("/", (req, res) => {
    res.send("Hello tic-tac-toe");
});

app.use(express.json());
app.use(cors());

const board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
];

function playerMove(col, row, value) {
    board[col][row] = value;
}

function iterateBoard() {
    for (let i = 0; i < board.length; i++) {
        console.log(board[i]);
    }
}

function getEmptyCells() {
    let emptyCells = [];

    for (i = 0; i < board.length; i++) {
        for (j = 0; j < board[i].length; j++) {
            if (board[i][j] == "") emptyCells.push({i,j});
        }
    }
    return emptyCells;
}

function computerMove() {
    let emptyCells = getEmptyCells();

    if (emptyCells.length == 0) {
        return null;
    }

    const randomIndex = Math.floor(Math.random() * emptyCells.length);

    const { i,j} = emptyCells[randomIndex];

    board[i][j] = "O";

    return {i,j};
}

function checkWinner() {
    let emptyCells = getEmptyCells();

    if (emptyCells.length == 4) {
        return null;
    }

    for (let row = 0; row < 3; row++) {
        if (
            board[row][0] == board[row][1] &&
            board[row][1] == board[row][2] &&
            board[row][0] !== ""
        ) {
            return board[row][0];
        }
    }

    for (let col = 0; col < 3; col++) {
        if (
            board[0][col] === board[1][col] &&
            board[1][col] === board[2][col] &&
            board[0][col] !== ""
        ) {
            return board[0][col];
        }
    }

    // Check diagonals
    if (
        board[0][0] === board[1][1] &&
        board[1][1] === board[2][2] &&
        board[0][0] !== ""
    ) {
        return board[0][0];
    }

    if (
        board[0][2] === board[1][1] &&
        board[1][1] === board[2][0] &&
        board[0][2] !== ""
    ) {
        return board[0][2];
    }

    return null;
}

app.post("/player-move", (req, res) => {
    const rowIndex = req.headers.rowindex;
    const colIndex = req.headers.colindex;

    playerMove(colIndex, rowIndex, "x");

    iterateBoard();

    computerMove();

    let winner = checkWinner();

    if(winner)
    {
        res.send("the winner is " + winner);
    }
    else{
        res.status(200).send("player has successfully moved");
    }

});

app.listen(3000);