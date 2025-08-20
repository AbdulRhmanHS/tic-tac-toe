
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
        document.querySelectorAll('.cell').forEach(cell => cell.textContent = '');
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

  function playerRound () {

    // At the start of the game
    const symbol = document.querySelector('.symbol');
    symbol.textContent = getActivePlayer().name;
    
    document.querySelectorAll('.cell').forEach(cell => {
      cell.addEventListener('click', () => {
        if (cell.textContent == '' && !winner.win) {
          let row = cell.dataset.row;
          let col = cell.dataset.column;

          // Update the game board
          board.setCell(getActivePlayer().symbol, row, col);
          cell.textContent = getActivePlayer().symbol;
          
          // Switch turn in the game and the screen
          switchPlayerTurn();
          symbol.textContent = getActivePlayer().name;

          winner = gameLogic(board.getGameBoard());
          printNewRound();

          if (winner.win) {
            console.log(`Player ${winner.player} wins!`);
          }
          else if (Array.from(document.querySelectorAll('.cell')).every(cell => cell.textContent != '')) {
            console.log("It's a tie");
          }
        }
        else if (winner.win || Array.from(document.querySelectorAll('.cell')).every(cell => cell.textContent != '')) {
          board.resetBoard();
          winner.win = false;
        }
      })
    })

  }

  return { playerRound }
}

const game = gameController();

game.playerRound();