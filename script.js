const statusDisplay = document.getElementById('status');
const gameBoard = document.getElementById('game-board');
const resetButton = document.getElementById('reset-button');

let currentPlayer = 'X';
let gameActive = true;
let gameState = ['', '', '', '', '', '', '', '', ''];

// Function to handle cell click
function handleCellClick(clickedCellEvent) {
  const clickedCell = clickedCellEvent.target;
  const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

  if (gameState[clickedCellIndex] !== '' || !gameActive) {
    return;
  }

  gameState[clickedCellIndex] = currentPlayer;
  clickedCell.innerHTML = currentPlayer;
  updateGameStatus();
}

// Function to check for a winner or a draw
function checkWinner() {
  const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < winningConditions.length; i++) {
    const [a, b, c] = winningConditions[i];
    if (
      gameState[a] !== '' &&
      gameState[a] === gameState[b] &&
      gameState[a] === gameState[c]
    ) {
      gameActive = false;
      return gameState[a] + ' wins!';
    }
  }

  if (!gameState.includes('')) {
    gameActive = false;
    return 'Draw!';
  }

  return null;
}

// Function to update game status
function updateGameStatus() {
  const winner = checkWinner();
  if (winner) {
    statusDisplay.innerHTML = winner;
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  statusDisplay.innerHTML = currentPlayer + "'s turn";
}

// Function to reset the game
function resetGame() {
  currentPlayer = 'X';
  gameActive = true;
  gameState = ['', '', '', '', '', '', '', '', ''];
  statusDisplay.innerHTML = currentPlayer + "'s turn";
  gameBoard.querySelectorAll('.game-cell').forEach(cell => (cell.innerHTML = ''));
}

// Event listeners
gameBoard.addEventListener('click', handleCellClick);
resetButton.addEventListener('click', resetGame);

// Generate game board cells
for (let i = 0; i < 9; i++) {
  const cell = document.createElement('div');
  cell.classList.add('game-cell');
  cell.setAttribute('data-cell-index', i);
  gameBoard.appendChild(cell);
}
