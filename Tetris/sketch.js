// Game workflow flag
var gameOver = false;

// Game board
var board = new Board();

// Currently moving tetromino
var currentTetromino = null;

function setup() {
  createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
  frameRate(FRAME_RATE);

  // Initialize a tetromino
  currentTetromino = generateTetromino();
}

function draw() {
  // Draw background of the game.
  background(220);

  // Draw the board.
  board.draw();

  // Draw the side bar
  drawSideBar();

  if (gameOver == false) {
    runGame();
  }
}

function drawSideBar() {
  
  // Print the score.
  fill("black");
  textSize(20);
  text("Score", (SQUARES_IN_WIDTH + 1) * SQUARE_SIZE, (SQUARES_IN_HEIGHT - 2) * SQUARE_SIZE);
  text(board.score, (SQUARES_IN_WIDTH + 1) * SQUARE_SIZE, (SQUARES_IN_HEIGHT - 1) * SQUARE_SIZE);
  
  // Game over!
  if (gameOver) {
      fill("black");
      textSize(30);
      text("GAME OVER!", (SQUARES_IN_WIDTH/4) * SQUARE_SIZE, (SQUARES_IN_HEIGHT/2) * SQUARE_SIZE);
  }
}

function runGame() {

  currentTetromino.draw();

  currentTetromino.move("down");

  // If the tetromino overlaps with board after moving, undo it.
  if (board.isOverlapped(currentTetromino)) {
    // Undo the move.
    currentTetromino.unMove();

    // Add it to board and check if it reaches the top.
    if (board.add(currentTetromino) == false) {
      gameOver = true;
      console.log("game over!");
    } else {
      // Current tetromino can be replaced to a new one.
      currentTetromino = generateTetromino();
    }
  }
}

// Randomly generate one kind of tetromino
function generateTetromino() {
  var keysArray = Object.keys(TETROMINOS);
  return TETROMINOS[random(keysArray)]();
}

function keyPressed() {
  if (currentTetromino != null) {
    if (keyCode === LEFT_ARROW) {
      currentTetromino.move("left");
    } else if (keyCode === RIGHT_ARROW) {
      currentTetromino.move("right");
    } else if (keyCode === UP_ARROW) {
      currentTetromino.move("clockRotate");
    } else if (keyCode === DOWN_ARROW) {
      currentTetromino.move("down");
    }

    // If the tetromino overlaps with board after moving, undo it.
    if (board.isOverlapped(currentTetromino)) {
      currentTetromino.unMove();
    }
  }
}