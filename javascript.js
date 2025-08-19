
// Function to create the game board
function gameBoard () {

  let gameBoard = [];


  // Create the game board at start
  for (let i = 0; i < 3; i++) {
    gameBoard.push([]);

    for (let j = 0; j < 3; j++) {
      gameBoard[i].push(` `);
    }
  }

  const getGameBoard = () => gameBoard;

  const printBoard = () => {
    for (let i = 0; i < 3; i++) {
      console.log(gameBoard[i]);
    }
  }

  function setCell(value, row, col) {
    if (gameBoard[row][col] == ' ') {
      gameBoard[row][col] = value;
    }
  }

  const resetBoard = () => {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        gameBoard[i][j] = ' ';
      }
    }
  }

  return { setCell, printBoard, resetBoard, getGameBoard };
}

function gameLogic (board) {

  let winner = {
    player: null,
    win: false
  };

  // Check each row and column
  for (let i = 0; i < 3; i++) {
    if (board[i][0] == board[i][1] && board[i][1] == board[i][2] && board[i][0] != ' ') {
      winner.win = true;
      winner.player = board[i][0];
    }
    else if (board[0][i] == board[1][i] && board[1][i] == board[2][i] && board[0][i] != ' ') {
      winner.win = true;
      winner.player = board[0][i];
    }
  }

  // Check each diagonal
  if (board[0][0] == board[1][1] && board[1][1] == board[2][2] && board[0][0] != ' ') {
    winner.win = true;
    winner.player = board[0][0];
  }
  else if (board[0][2] == board[1][1] && board[1][1] == board[2][0] && board[0][2] != ' ') {
    winner.win = true;
    winner.player = board[0][2];
  }

  return winner;
}

function gameController (playerOne = 'X', playerTwo = 'O') {

  const board = gameBoard();
  
  const players = [
    {
      name: playerOne,
      symbol: 'X'
    }, 
    {
      name: playerTwo,
      symbol: 'O'
    }
  ];

  let activePlayer = players[0];

  let winner = gameLogic(board.getGameBoard());

  const switchPlayerTurn = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };

  const getActivePlayer = () => activePlayer;

  const printNewRound = () => {
    board.printBoard();
    console.log(`It's ${getActivePlayer().name}'s turn!`);
  }

  const playerRound = () => {
    while (!winner.win) {    
      printNewRound();
      const row = Number(prompt(`Enter a row number (1-3):`)) - 1;
      const col = Number(prompt(`Enter a column number (1-3):`)) - 1;
      board.setCell(getActivePlayer().symbol, row, col);
      winner = gameLogic(board.getGameBoard());
      switchPlayerTurn();
    }
    if (winner.win) {
      board.printBoard();
      console.log(`Player ${winner.player} wins!`);
      board.resetBoard();
      winner.win = false;
    }
  }

  return { playerRound, getActivePlayer }
}

const game = gameController();