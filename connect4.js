const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells (board[y][x])

document.addEventListener('DOMContentLoaded', (event) => {
    const startButton = document.getElementById('startGame');
    
    startButton.addEventListener('click', (event) => {
      // Clear the board first if needed
      document.getElementById('board').innerHTML = '';
      // Call your functions to create and display the board
      makeBoard();
      makeHtmlBoard();
    });
  });
  
  function makeHtmlBoard() {
    const board = document.getElementById('board');
  
    // Assuming your board is made of divs with 'row' and 'col' classes
    for (let row = 0; row < 6; row++) {
      const rowDiv = document.createElement('div');
      rowDiv.classList.add('row');
      for (let col = 0; col < 7; col++) {
        const colDiv = document.createElement('div');
        colDiv.classList.add('col');
        colDiv.addEventListener('click', handleGameClick); // You need to define handleGameClick
        rowDiv.appendChild(colDiv);
      }
      board.appendChild(rowDiv);
    }
  }
  
/** makeBoard: create in-memory board structure */
function makeBoard() {
  board = [];
  for (let y = 0; y < HEIGHT; y++) {
    board.push(Array(WIDTH).fill(null));
  }
}

/** makeHtmlBoard: make the HTML board */
function makeHtmlBoard() {
  const htmlBoard = document.getElementById('board');
  htmlBoard.innerHTML = ''; // Clear the board

  // Create slots in the board
  for (let y = 0; y < HEIGHT; y++) {
    const row = document.createElement('div');
    row.className = 'row';
    for (let x = 0; x < WIDTH; x++) {
      const cell = document.createElement('div');
      cell.className = 'col empty';
      cell.dataset.column = x;
      cell.dataset.row = y;
      row.append(cell);
    }
    htmlBoard.append(row);
  }
}

/** placeInTable: update DOM to place piece into HTML table of board */
function placeInTable(y, x) {
  const piece = document.createElement('div');
  piece.className = `piece player${currPlayer}`;
  const spot = document.querySelector(`[data-row='${y}'][data-column='${x}']`);
  spot.append(piece);
  spot.classList.remove('empty');
}

/** handleClick: handle click of a column to play piece */
function handleClick(evt) {
  // get x from data-column of clicked cell
  const x = +evt.target.dataset.column;

  // get next spot in column (if none, ignore click)
  const y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  board[y][x] = currPlayer;
  placeInTable(y, x);

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} wins!`);
  }

  // check for tie
  if (board.every(row => row.every(cell => cell))) {
    return endGame('Tie!');
  }

  // switch players
  currPlayer = currPlayer === 1 ? 2 : 1;

  // if you want to handle changing the color based on the input
  // you can grab the color from input fields and apply it to the current player piece
}

/** startGame: starts the game by creating the board */
function startGame() {
  makeBoard();
  makeHtmlBoard();
  // Add event listener to columns after the HTML board has been created
  const columns = document.querySelectorAll('.col.empty');
  columns.forEach(column => column.addEventListener('click', handleClick));
}

// Get the start game button and setup its click handler
document.getElementById('startGame').addEventListener('click', startGame);

// The rest of your code with the checkForWin and other functions will follow...
