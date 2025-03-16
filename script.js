const board = document.getElementById("board");
const status = document.getElementById("status");
let currentPlayer = "X";
let cells = ["", "", "", "", "", "", "", "", ""];

function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
            status.innerText = `Player ${cells[a]} Wins!`;
            return true;
        }
    }
    if (!cells.includes("")) {
        status.innerText = "It's a Draw!";
        return true;
    }
    return false;
}

function handleClick(index) {
    if (cells[index] || checkWinner()) return;
    cells[index] = currentPlayer;
    renderBoard();
    if (!checkWinner()) {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        status.innerText = `Player ${currentPlayer}'s Turn`;
    }
}

function renderBoard() {
    board.innerHTML = "";
    cells.forEach((cell, index) => {
        const div = document.createElement("div");
        div.classList.add("cell");
        if (cell) div.classList.add("taken");
        div.innerText = cell;
        div.addEventListener("click", () => handleClick(index));
        board.appendChild(div);
    });
}

function resetGame() {
    cells = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    status.innerText = "Player X's Turn";
    renderBoard();
}

renderBoard();
