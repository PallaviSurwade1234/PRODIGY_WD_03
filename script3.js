let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('reset');
const messageBox = document.getElementById('message');

cells.forEach(cell => {
  cell.addEventListener('click', handleClick);
});

resetButton.addEventListener('click', resetGame);

function handleClick(event) {
  const index = event.target.dataset.index;

  if (board[index] !== '' || checkWin()) {
    return;
  }

  board[index] = currentPlayer;
  event.target.textContent = currentPlayer;

  if (checkWin()) {
    messageBox.textContent = `Player ${currentPlayer} wins!`;
  } else if (board.every(cell => cell !== '')) {
    messageBox.textContent = 'It\'s a draw!';
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    messageBox.textContent = `Player ${currentPlayer}'s turn`;
  }
}

function checkWin() {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], 
    [0, 3, 6], [1, 4, 7], [2, 5, 8], 
    [0, 4, 8], [2, 4, 6]             
  ];

  return winPatterns.some(pattern => {
    return pattern.every(index => board[index] === currentPlayer);
  });
}

function resetGame() {
  board = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  cells.forEach(cell => {
    cell.textContent = '';
  });
  messageBox.textContent = " Now Player X's turn";
}
