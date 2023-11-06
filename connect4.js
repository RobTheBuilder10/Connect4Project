// Constants
const ROWS = 6;
const COLS = 7;
const EMPTY = 0;
const PLAYER_ONE = 1;
const PLAYER_TWO = 2;
const WINNING_LENGTH = 4;

// Variables
let board = [];
let currentPlayer = PLAYER_ONE;
let gameOver = false;

// Elements
const boardElement = document.getElementById('board');
const messageElement = document.getElementById('message');

// Initialize the game board
function initBoard() {
    for (let row = 0; row < ROWS; row++) {
        board[row] = [];
        for (let col = 0; col < COLS; col++) {
            board[row][col] = EMPTY;
        }
    }
}

// Render the game board
function renderBoard() {
    boardElement.innerHTML = '';
    for (let row = 0; row < ROWS; row++) {
        const rowElement = document.createElement('div');
        rowElement.classList.add('row');
        for (let col = 0; col < COLS; col++) {
            const cellElement = document.createElement('div');
            cellElement.classList.add('cell');
            if (board[row][col] === PLAYER_ONE) {
                cellElement.classList.add('player-one');
            } else if (board[row][col] === PLAYER_TWO) {
                cellElement.classList.add('player-two');
            }
            rowElement.appendChild(cellElement);
        }
        boardElement.appendChild(rowElement);
    }
}

// Handle player moves
function handleMove(col) {
    if (gameOver) {
        return;
    }
    for (let row = ROWS - 1; row >= 0; row--) {
        if (board[row][col] === EMPTY) {
            board[row][col] = currentPlayer;
            renderBoard();
            if (checkWin(row, col)) {
                gameOver = true;
                messageElement.textContent = `Player ${currentPlayer} wins!`;
            } else if (checkDraw()) {
                gameOver = true;
                messageElement.textContent = 'Draw!';
            } else {
                switchPlayer();
            }
            break;
        }
    }
}

// Check for a win condition
function checkWin(row, col) {
    return (
        checkHorizontal(row) ||
        checkVertical(row, col) ||
        checkDiagonal1(row, col) ||
        checkDiagonal2(row, col)
    );
}

function checkHorizontal(row) {
    let count = 0;
    for (let col = 0; col < COLS; col++) {
        if (board[row][col] === currentPlayer) {
            count++;
            if (count === WINNING_LENGTH) {
                return true;
            }
        } else {
            count = 0;
        }
    }
    return false;
}

function checkVertical(row, col) {
    let count = 0;
    for (let r = row; r < ROWS; r++) {
        if (board[r][col] === currentPlayer) {
            count++;
            if (count === WINNING_LENGTH) {
                return true;
            }
        } else {
            break;
        }
    }
    return false;
}

function checkDiagonal1(row, col) {
    let count = 0;
    let r = row;
    let c = col;
    while (r < ROWS && c < COLS) {
        if (board[r][c] === currentPlayer) {
            count++;
            if (count === WINNING_LENGTH) {
                return true;
            }
        } else {
            break;
        }
        r++;
        c++;
    }
    r = row - 1;
    c = col - 1;
    while (r >= 0 && c >= 0) {
        if (board[r][c] === currentPlayer) {
            count++;
            if (count === WINNING_LENGTH) {
                return true;
            }
        } else {
            break;
        }
        r--;
        c--;
    }
    return false;
}

function checkDiagonal2(row, col) {
    let count = 0;
    let r = row;
    let c = col;
    while (r < ROWS && c >= 0) {
        if (board[r][c] === currentPlayer) {
            count++;
            if (count === WINNING_LENGTH) {
                return true;
            }
        } else {
            break;
        }
        r++;
        c--;
    }
    r = row - 1;
    c = col + 1;
    while (r >= 0 && c < COLS) {
        if (board[r][c] === currentPlayer) {
            count++;
            if (count === WINNING_LENGTH) {
                return true;
            }
        } else {
            break;
        }
        r--;
        c++;
    }
    return false;
}

// Check for a draw condition
function checkDraw() {
    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
            if (board[row][col] === EMPTY) {
                return false;
            }
        }
    }
    return true;
}

// Switch between players
function switchPlayer() {
    currentPlayer = currentPlayer === PLAYER_ONE ? PLAYER_TWO : PLAYER_ONE;
    messageElement.textContent = `Player ${currentPlayer}'s turn`;
}

// Reset the game
function resetGame() {
    initBoard();
    renderBoard();
    currentPlayer = PLAYER_ONE;
    gameOver = false;
    messageElement.textContent = `Player ${currentPlayer}'s turn`;
}

// Event listeners
boardElement.addEventListener('click', event => {
    const cellElement = event.target.closest('.cell');
    if (!cellElement) {
        return;
    }
    const col = cellElement.cellIndex;
    handleMove(col);
});

document.getElementById('reset-button').addEventListener('click', resetGame);

// Initialize the game
initBoard();
renderBoard();
messageElement.textContent = `Player ${currentPlayer}'s turn`;
