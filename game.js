export class game {
  constructor(squares) {
    //  Reset game
    squares.forEach(element => {
      $(element).removeClass('markP1');
      $(element).removeClass('markP2');
    });
    //
    this.marks = 0; // Keep track of number of marks
    this.winnerDeclared = false;
    this.numSquares = 0;
    this.numSquares = squares.length;
    console.log(this.numSquares);

    this.player1turn = true; // if true : player 1, if false : player 2

    //  To initialize 2d array
    //  First, set the entire object as empty
    this.squares = [];

    //  Then for each cell, init to empty
    for (var i = 0; i < this.numSquares; i++) {
      this.squares[i] = [];
    }

    let k = 0;
    for (let i = 0; i < this.numSquares / 3; i++) {
      for (let j = 0; j < this.numSquares / 3; j++) {
        this.squares[i].push(squares[k]);
        // console.log(this.squares[i][j])
        k += 1;
      }
    }
  }
  resetGame(msg) {
    $('#msgg').text(msg);
    $('#modelId').modal('toggle'); //Toggle pop up result
  }

  hasWinner() {
    let win = false;
    let markP1H = 0,
      markP2H = 0;
    let markP1V = 0,
      markP2V = 0;
    // Check horizontal and vertical
    for (let i = 0; i < this.numSquares / 3; i++) {
      //  Reset counters
      markP1H = 0;
      markP2H = 0;
      markP1V = 0;
      markP2V = 0;
      for (let j = 0; j < this.numSquares / 3; j++) {
        //  Horizontal check
        if ($(this.squares[i][j]).hasClass('markP1')) markP1H += 1;
        else if ($(this.squares[i][j]).hasClass('markP2')) markP2H += 1;
        // Vertical check
        if ($(this.squares[j][i]).hasClass('markP2')) markP1V += 1;
        else if ($(this.squares[j][i]).hasClass('markP1')) markP2V += 1;
      }
      if (markP1H == 3 || markP1V == 3 || markP2H == 3 || markP2V == 3) {
        win = true;
        this.winnerDeclared = true;
        return win;
      }
    }
    //  Check diagonals
    let markP1LR = 0,
      markP2LR = 0;
    let markP1RL = 0,
      markP2RL = 0;
    let j = this.numSquares / 3 - 1;
    for (let i = 0; i < this.numSquares / 3; i++) {
      //  left to right
      if ($(this.squares[i][i]).hasClass('markP1')) markP1LR += 1;
      else if ($(this.squares[i][i]).hasClass('markP2')) markP2LR += 1;
      //  right to left
      if ($(this.squares[i][j]).hasClass('markP1')) markP1RL += 1;
      else if ($(this.squares[i][j]).hasClass('markP2')) markP2RL += 1;
      j -= 1;
    }
    if (markP1LR == 3 || markP1RL == 3 || markP2LR == 3 || markP2RL == 3) {
      win = true;
      this.winnerDeclared = true;
      return win;
    }
    if (this.marks < 9) this.marks += 1;
    else resetGame('Its a Draw!');
    return win;
  }
}
