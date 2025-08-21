
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

  return { setCell, resetBoard, getGameBoard };
}

function gameLogic (board) {

  let winner = {
    player: null,
    win: false,
    cell1: null,
    cell2: null,
    cell3: null
  };

  // Check each row and column
  for (let i = 0; i < 3; i++) {
    if (board[i][0] == board[i][1] && board[i][1] == board[i][2] && board[i][0] != ' ') {
      winner.win = true;
      winner.player = board[i][0];
      winner.cell1 = [i, 0];
      winner.cell2 = [i, 1];
      winner.cell3 = [i, 2];
    }
    else if (board[0][i] == board[1][i] && board[1][i] == board[2][i] && board[0][i] != ' ') {
      winner.win = true;
      winner.player = board[0][i];
      winner.cell1 = [0, i];
      winner.cell2 = [1, i];
      winner.cell3 = [2, i];
    }
  }

  // Check each diagonal
  if (board[0][0] == board[1][1] && board[1][1] == board[2][2] && board[0][0] != ' ') {
    winner.win = true;
    winner.player = board[0][0];
    winner.cell1 = [0, 0];
    winner.cell2 = [1, 1];
    winner.cell3 = [2, 2];
  }
  else if (board[0][2] == board[1][1] && board[1][1] == board[2][0] && board[0][2] != ' ') {
    winner.win = true;
    winner.player = board[0][2];
    winner.cell1 = [0, 2];
    winner.cell2 = [1, 1];
    winner.cell3 = [2, 0];
  }

  return winner;
}

function gameController (playerOne = 'X', playerTwo = 'O') {

  const board = gameBoard();
  
  const players = [
    {
      name: playerOne,
      symbol: 'X',
      score: 0
    }, 
    {
      name: playerTwo,
      symbol: 'O',
      score: 0
    }
  ];

  let tie = 0;

  let activePlayer = players[0];

  let winner = gameLogic(board.getGameBoard());

  let winInterval = null;
  let tieInterval = null;

  document.querySelector('.x-score .score').textContent = players[0].score;
  document.querySelector('.o-score .score').textContent = players[1].score;
  document.querySelector('.tie-score .score').textContent = tie;

  const increaseScore = (player) => player.score++;

  const switchPlayerTurn = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };

  const getActivePlayer = () => activePlayer;

  function playerRound () {

    // At the start of the game
    const symbol = document.querySelector('.symbol');
    symbol.textContent = getActivePlayer().name;
    
    document.querySelectorAll('.cell').forEach(cell => {
      cell.addEventListener('click', () => {
        if (cell.textContent == '' && !winner.win) {

          // Get the cell coordinates from the dataset
          let row = cell.dataset.row;
          let col = cell.dataset.column;

          // Update the game board
          board.setCell(getActivePlayer().symbol, row, col);
          cell.textContent = getActivePlayer().symbol;
          
          // Switch turn in the game and the screen
          switchPlayerTurn();
          symbol.textContent = getActivePlayer().name;

          // Check for a winner
          winner = gameLogic(board.getGameBoard());

          if (winner.win) {
            // Flashing the winning cells
            winInterval = setInterval(() => {
              Array.from(document.querySelectorAll('.cell')).find(c => c.dataset.row == winner.cell1[0] && c.dataset.column == winner.cell1[1]).classList.toggle('win');
              Array.from(document.querySelectorAll('.cell')).find(c => c.dataset.row == winner.cell2[0] && c.dataset.column == winner.cell2[1]).classList.toggle('win');
              Array.from(document.querySelectorAll('.cell')).find(c => c.dataset.row == winner.cell3[0] && c.dataset.column == winner.cell3[1]).classList.toggle('win');
            }, 300);

            // Increase the score
            const winnerPlayer = players.find(player => player.symbol == winner.player);
            increaseScore(winnerPlayer);
            document.querySelector('.x-score .score').textContent = players[0].score;
            document.querySelector('.o-score .score').textContent = players[1].score;
          }
          else if (Array.from(document.querySelectorAll('.cell')).every(cell => cell.textContent != '')) {
            // Flashing the board grid lines
            tieInterval = setInterval(() => {
              document.querySelectorAll('.cell').forEach(c => {
                c.classList.toggle('tie');
              })
            }, 300);

            // Increase the score
            tie++;
            document.querySelector('.tie-score .score').textContent = tie;
          }
        }
        else if (winner.win || Array.from(document.querySelectorAll('.cell')).every(cell => cell.textContent != '')) {
          board.resetBoard();
          winner.win = false;

          // Clear intervals and remove classes
          if (winInterval !== null) {
            clearInterval(winInterval);
            document.querySelectorAll('.cell').forEach(c => {
              c.classList.remove('win');
            })
          }
          if (tieInterval !== null) {
            clearInterval(tieInterval);
            document.querySelectorAll('.cell').forEach(c => {
              c.classList.remove('tie');
            })
          }
        }
      })
    })

  }

  return { playerRound }
}

const game = gameController();

game.playerRound();