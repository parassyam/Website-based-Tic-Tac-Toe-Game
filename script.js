const squares = Array.from(document.querySelectorAll('.square'));
const message = document.querySelector('.message');
const restartBtn = document.querySelector('.restart-btn');

let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];

const winningCombinations = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // baris
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // kolom
  [0, 4, 8], [2, 4, 6] // diagonal
];

function handleSquareClick(index) {
  if (board[index] !== '' || checkWinner()) {
    return;
  }

  board[index] = currentPlayer;
  squares[index].textContent = currentPlayer;

  const winner = checkWinner();
  if (winner) {
    displayMessage(`Player ${winner} wins!`);
    disableSquareClicks();
  } else if (isBoardFull()) {
    displayMessage("It's a draw!");
  } else {
    changePlayer();
    displayMessage(`Player ${currentPlayer}'s turn`);
  }
}

function changePlayer() {
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function checkWinner() {
  for (let combination of winningCombinations) {
    const [a, b, c] = combination;
    if (
      board[a] === board[b] &&
      board[b] === board[c] &&
      board[a] !== ''
    ) {
      return board[a];
    }
  }
  return null;
}

function isBoardFull() {
  return board.every(cell => cell !== '');
}

function displayMessage(msg) {
  message.textContent = msg;
}

function disableSquareClicks() {
  squares.forEach(square => square.removeEventListener('click', squareClickHandler));
}

function enableSquareClicks() {
  squares.forEach(square => square.addEventListener('click', squareClickHandler));
}

function restartGame() {
  currentPlayer = 'X';
  board = ['', '', '', '', '', '', '', '', ''];
  squares.forEach((square, index) => {
    square.textContent = '';
    square.addEventListener('click', squareClickHandler);
  });
  displayMessage('');
  enableSquareClicks();
}

function squareClickHandler() {
  const index = squares.indexOf(this);
  handleSquareClick(index);
}

squares.forEach(square => square.addEventListener('click', squareClickHandler));
restartBtn.addEventListener('click', restartGame);
