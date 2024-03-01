let currentPlayer = 'X';
let gameBoard = [
  ['', '', ''],
  ['', '', ''],
  ['', '', '']
];
let gameActive = true;

function handleClick(row, col) {
  if (gameBoard[row][col] === '' && gameActive) {
    gameBoard[row][col] = currentPlayer;
    document.getElementById(`cell${row}${col}`).textContent = currentPlayer;
    checkWinner();
    switchPlayer();
  }
}

function switchPlayer() {
  currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';
  updateStatus(`Player ${currentPlayer}'s turn`);
}

function checkWinner() {
  if (
    checkRow(0) || checkRow(1) || checkRow(2) ||
    checkColumn(0) || checkColumn(1) || checkColumn(2) ||
    checkDiagonal(0, 0, 2, 2) || checkDiagonal(0, 2, 2, 0)
  ) {
    updateStatus(`Player ${currentPlayer} wins!`);
    gameActive = false;
  } else if (isBoardFull()) {
    updateStatus('It\'s a draw!');
    gameActive = false;
  }
}

function checkRow(row) {
  return (
    gameBoard[row][0] === currentPlayer &&
    gameBoard[row][1] === currentPlayer &&
    gameBoard[row][2] === currentPlayer
  );
}

function checkColumn(col) {
  return (
    gameBoard[0][col] === currentPlayer &&
    gameBoard[1][col] === currentPlayer &&
    gameBoard[2][col] === currentPlayer
  );
}

function checkDiagonal(startRow, startCol, endRow, endCol) {
  return (
    gameBoard[startRow][startCol] === currentPlayer &&
    gameBoard[(startRow + endRow) / 2][(startCol + endCol) / 2] === currentPlayer &&
    gameBoard[endRow][endCol] === currentPlayer
  );
}

function isBoardFull() {
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      if (gameBoard[row][col] === '') {
        return false;
      }
    }
  }
  return true;
}

function resetGame() {
  currentPlayer = 'X';
  gameBoard = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ];
  gameActive = true;

  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      document.getElementById(`cell${row}${col}`).textContent = '';
    }
  }

  updateStatus(`Player ${currentPlayer}'s turn`);
}

function updateStatus(message) {
  document.getElementById('status').textContent = message;
}
