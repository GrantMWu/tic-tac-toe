function gameBoard() {
    const rows = 3;
    const columns = 3;
    const board = [];

    for (let i=0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < columns; j++){
            board[i].push(Cell());
        }
    }

    const getBoard = () => board;

    const placeMark = (row, column, player) => {
        board[row][column].addMark(player);
    }

    const printBoard = () => {
        const boardWithVal = board.map((row) => row.map((cell) => cell.getValue()))

        console.log(boardWithVal);
    }

    return {getBoard, placeMark, printBoard};
}

function Cell() {
    let value = 0;
  
    // Accept a player's token to change the value of the cell
    const addMark = (player) => {
      value = player;
    };
  
    // How we will retrieve the current value of this cell through closure
    const getValue = () => value;
  
    return {
      addMark,
      getValue
    };
  }

  function createPlayer(name, token) {
    return{name, token};
  }

  function gamePlay() {
    board = gameBoard();
    const playerOne = createPlayer("Player One", 'X');
    const playerTwo = createPlayer("Player Two", 'O');
    const message = document.querySelector('.message');

    let activePlayer = playerOne;

    returnActivePlayer = () => activePlayer;

    const switchActivePlayer = () => {
        activePlayer = activePlayer == playerOne? playerTwo : playerOne;
    }
    const updateGame = () => {
        board.printBoard();
        console.log(`${activePlayer.name}'s move`);
        message.innerHTML = `${activePlayer.name}'s move`;
    }

    const checkBoard = () => {
        const arr = board.getBoard();
        let completed = false;

        //check for horizontal matches
        for (let i = 0; i < 3; i++) {
            if (completed) {
                return completed;
            }
            for (let j = 0; j < 2; j++) {
                let current = arr[i][j].getValue();
                let next = arr[i][j+1].getValue();
                if ((!current || !next) || current != next) {
                    completed = false;
                    break;
                }
                completed = true;
            }
        }
        
        //check for vertical matches
        for (let i = 0; i < 3; i++) {
            if (completed) {
              return completed;
          }
          for (let j = 0; j < 2; j++) {
            let current = arr[j][i].getValue();
            let next = arr[j+1][i].getValue();
            if ((!current || !next) || current != next) {
              completed = false;
              break;
            }
            completed = true;
          }
        }

        /*check for diagonal matches */
        let middle = arr[1][1].getValue();
        let topRight = arr[0][2].getValue();
        let topLeft = arr[0][0].getValue();
        let botRight = arr[2][2].getValue();
        let botLeft = arr[2][0].getValue();

        if (middle && ((middle === topLeft && middle === botRight) || (middle === topRight && middle === botLeft))) {
            return true;
        }
        
        return completed;
    }

    const playRound = (row, column) => {
        if (board.getBoard()[row][column].getValue()) {
            console.log("There is already a token in that space. Try another space!");
            message.innerHTML = "There is already a token in that space. Try another space!"
            updateGame();
            return
        };
        board.placeMark(row, column, activePlayer.token);

        /* logic to test if board is one yet */
        if (checkBoard()) {
            board.printBoard();
            console.log(`${activePlayer.name} has won`);
            message.innerHTML = `${activePlayer.name} has won`
            return
        }

        console.log(`game finished: ${checkBoard()}`);
        switchActivePlayer();
        updateGame();
    }

    updateGame();
    
    return{playRound, returnActivePlayer}
  }

function screen () {
    
    const updateScreen = (grid) => {
        const row = grid.value[0];
        const col = grid.value[1];
        
        grid.innerHTML = game.returnActivePlayer().token;
        game.playRound(row, col);
        //returning the incorrect player on screen.
    }
    
    const game = gamePlay();
    const buttons = document.querySelectorAll(".square");

    for(const button of buttons) {
        button.addEventListener('click', function() {
            updateScreen(this);
        });
    }
}

screen ();


//const game = gamePlay();