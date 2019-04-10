/*
 * The game board. It interacts with tetromino.
 * 1. Detect collision.
 * 2. Add landed tetromino.
 */
class Board {

  constructor() {
    // Initialize the squares 2-d array.
    // The element will be color.
    this.squaresTable = [];

    for (var i = 0; i < SQUARES_IN_HEIGHT; i++) {
      // Fill each element to null.
      this.squaresTable[i] = this.newNullRow();
    }

    // Initialize the score to 0.
    this.score = 0;
  }

  /* Public function. 
   * Return true if the `tetromino` is already overlapped with current board.
   * It also includes the outside boundary case. 
   */
  isOverlapped(tetromino) {
    var tetroSquares = tetromino.squares;

    for (var i = 0; i < tetroSquares.length; i++) {
      // Case 1: a square is outside the boundary.
      if (this.isOutside(tetroSquares[i])) {
        return true;
      }

      // Safety check: it is valid for y index of square to be large.
      if (tetroSquares[i].yIndex < SQUARES_IN_HEIGHT) {
        // Case 2: a square's slot is already taken.
        if (this.squaresTable[tetroSquares[i].yIndex][tetroSquares[i].xIndex] != null) {
          return true;
        }
      }
    }

    return false;
  }

  /* Public function. 
   * Add `tetromino` as landed and assume it is not overlapped.
   * Return false if it reached the top.
   */
  add(tetromino) {
    // Increase the score for landing first.
    this.score += SCORE_PER_LANDING;

    // Store the y indices that potentially will be cleared in a row.
    var removeCandidatesY = [];

    var tetroSquares = tetromino.squares;

    for (var i = 0; i < tetroSquares.length; i++) {
      // Safety check: it is valid for y index of square to be large.
      if (tetroSquares[i].yIndex < SQUARES_IN_HEIGHT) {
        // Update the squares table.
        this.squaresTable[tetroSquares[i].yIndex][tetroSquares[i].xIndex] = tetroSquares[i].color;
        
        removeCandidatesY.push(tetroSquares[i].yIndex);
      }
    }

    // Sort in descending order so that we will delete from the larger y index.
    removeCandidatesY.sort();
    removeCandidatesY.reverse();

    for (i = 0; i < removeCandidatesY.length; i++) {
      // If all elements are not null, thus this row should be cleared.
      if (this.squaresTable[removeCandidatesY[i]].includes(null) == false) {
        // Remove the current row.
        this.squaresTable.splice(removeCandidatesY[i], 1);
        // Add a new row.
        this.squaresTable.push(this.newNullRow());
        // Increase the score!
        this.score += 100;
      }
    }

    // Return false if the top row has any non-null value.
    return !this.squaresTable[SQUARES_IN_HEIGHT - 1].some(function(element) {
      return element != null;
    });
  }

  draw() {
    // Draw the backgroud board.
    fill("white");
    rect(0, 0, BOARD_WIDTH, BOARD_HEIGHT);

    // Draw each square.
    for (var i = 0; i < this.squaresTable.length; i++) {
      for (var j = 0; j < this.squaresTable[i].length; j++) {
        if (this.squaresTable[i][j] != null) {
          Square.drawSquare(j, i, this.squaresTable[i][j]);
        }
      }
    }
  }

  // Private function.
  // Return true if `tetroSquare` is outside the board boundary.
  isOutside(tetroSquare) {
    // If x index is too left or right.
    if (tetroSquare.xIndex < 0 || tetroSquare.xIndex > SQUARES_IN_WIDTH - 1) {
      return true;
    }

    // Note it doesn't check the case that y index is too large, which might be a valid case.
    if (tetroSquare.yIndex < 0) {
      return true;
    }

    return false;
  }

  // Private function.
  // Return an array with `SQUARES_IN_WIDTH` length and filled with null.
  newNullRow() {
    var row = [];
    for (var j = 0; j < SQUARES_IN_WIDTH; j++) {
      row[j] = null;
    }
    return row;
  }
}