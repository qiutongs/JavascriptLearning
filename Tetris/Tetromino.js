var TETROMINOS = {
  "O": function() {
    return new OTetromino();
  },
  "I": function() {
    return new ITetromino();
  },
  "T": function() {
    return new TTetromino();
  },
  "J": function() {
    return new JTetromino();
  },
  "L": function() {
    return new LTetromino();
  },
  "S": function() {
    return new STetromino();
  },
  "Z": function() {
    return new ZTetromino();
  }
}

class Tetromino {

  constructor() {
    this.leftIndex = 5;
    this.squares = [];
    this.lastMoveType = null;
  }

  move(type) {
    switch (type) {
      case "left":
        this.moveLeft();
        break;
      case "right":
        this.moveRight();
        break;
      case "down":
        this.moveDown();
        break;
      case "clockRotate":
        this.clockRotate();
        break;
    }

    this.lastMoveType = type;
  }

  unMove() {
    if (this.lastMoveType != null) {
      switch (this.lastMoveType) {
        case "left":
          this.moveRight();
          break;
        case "right":
          this.moveLeft();
          break;
        case "down":
          this.moveUp();
          break;
        case "clockRotate":
          this.antiClockRotate();
          break;
      }
    }
  }

  clockRotate() {
    var CLOCK_ROTATE_MATRIX = [
      [0, -1],
      [1, 0]
    ];
    this.rotate(CLOCK_ROTATE_MATRIX);
  }

  antiClockRotate() {
    var ANTI_CLOCK_ROTATE_MATRIX = [
      [0, 1],
      [-1, 0]
    ];
    this.rotate(ANTI_CLOCK_ROTATE_MATRIX);
  }

  moveUp() {
    for (var i = 0; i < this.squares.length; i++) {
      this.squares[i].moveUp();
    }
  }

  moveDown() {
    for (var i = 0; i < this.squares.length; i++) {
      this.squares[i].moveDown();
    }
  }

  moveLeft() {
    for (var i = 0; i < this.squares.length; i++) {
      this.squares[i].moveLeft();
    }
  }

  moveRight() {
    for (var i = 0; i < this.squares.length; i++) {
      this.squares[i].moveRight();
    }
  }

  draw() {
    for (var i = 0; i < this.squares.length; i++) {
      this.squares[i].draw();
    }
  }

  rotate(rotateMatrix) {
    for (var i = 0; i < this.squares.length; i++) {
      if (this.squares[i] != this.origin) {
        var relativeX = this.squares[i].xIndex - this.origin.xIndex;
        var relativeY = this.squares[i].yIndex - this.origin.yIndex;
        var newRelativeX = relativeX * rotateMatrix[0][0] + relativeY * rotateMatrix[1][0];
        var newRelativeY = relativeX * rotateMatrix[0][1] + relativeY * rotateMatrix[1][1];

        this.squares[i].xIndex = this.origin.xIndex + newRelativeX;
        this.squares[i].yIndex = this.origin.yIndex + newRelativeY;
      }
    }
  }
}

class OTetromino extends Tetromino {

  constructor() {
    super();

    this.color = "yellow";
    this.origin = null;

    var highestYIndex = SQUARES_IN_HEIGHT - 1;
    this.squares[0] = new Square(this.leftIndex, highestYIndex + 1, this.color);
    this.squares[1] = new Square(this.leftIndex + 1, highestYIndex + 1, this.color);
    this.squares[2] = new Square(this.leftIndex, highestYIndex, this.color);
    this.squares[3] = new Square(this.leftIndex + 1, highestYIndex, this.color);
  }

  rotate(rotateMatrix) {}
}

class ITetromino extends Tetromino {

  constructor() {
    super();

    this.color = "green";

    var highestYIndex = SQUARES_IN_HEIGHT - 1;
    this.squares[0] = new Square(this.leftIndex, highestYIndex + 1, this.color);
    this.squares[1] = new Square(this.leftIndex + 1, highestYIndex + 1, this.color);
    this.squares[2] = new Square(this.leftIndex + 2, highestYIndex + 1, this.color);
    this.squares[3] = new Square(this.leftIndex + 3, highestYIndex + 1, this.color);

    this.origin = this.squares[1];
  }
}

class TTetromino extends Tetromino {

  constructor() {
    super();

    this.color = "pink";

    var highestYIndex = SQUARES_IN_HEIGHT - 1;
    this.squares[0] = new Square(this.leftIndex, highestYIndex + 1, this.color);
    this.squares[1] = new Square(this.leftIndex + 1, highestYIndex + 1, this.color);
    this.squares[2] = new Square(this.leftIndex + 2, highestYIndex + 1, this.color);
    this.squares[3] = new Square(this.leftIndex + 1, highestYIndex, this.color);

    this.origin = this.squares[1];
  }
}

class JTetromino extends Tetromino {

  constructor() {
    super();

    this.color = "blue";

    var highestYIndex = SQUARES_IN_HEIGHT - 1;
    this.squares[0] = new Square(this.leftIndex, highestYIndex + 1, this.color);
    this.squares[1] = new Square(this.leftIndex + 1, highestYIndex + 1, this.color);
    this.squares[2] = new Square(this.leftIndex + 2, highestYIndex + 1, this.color);
    this.squares[3] = new Square(this.leftIndex + 2, highestYIndex, this.color);

    this.origin = this.squares[1];
  }
}

class LTetromino extends Tetromino {

  constructor() {
    super();

    this.color = "orange";

    var highestYIndex = SQUARES_IN_HEIGHT - 1;
    this.squares[0] = new Square(this.leftIndex, highestYIndex + 1, this.color);
    this.squares[1] = new Square(this.leftIndex + 1, highestYIndex + 1, this.color);
    this.squares[2] = new Square(this.leftIndex + 2, highestYIndex + 1, this.color);
    this.squares[3] = new Square(this.leftIndex, highestYIndex, this.color);

    this.origin = this.squares[1];
  }
}

class STetromino extends Tetromino {

  constructor() {
    super();

    this.color = "purple";

    var highestYIndex = SQUARES_IN_HEIGHT - 1;
    this.squares[0] = new Square(this.leftIndex + 1, highestYIndex + 1, this.color);
    this.squares[1] = new Square(this.leftIndex + 2, highestYIndex + 1, this.color);
    this.squares[2] = new Square(this.leftIndex, highestYIndex, this.color);
    this.squares[3] = new Square(this.leftIndex + 1, highestYIndex, this.color);

    this.origin = this.squares[0];
  }
}

class ZTetromino extends Tetromino {

  constructor() {
    super();

    this.color = "red";

    var highestYIndex = SQUARES_IN_HEIGHT - 1;
    this.squares[0] = new Square(this.leftIndex, highestYIndex + 1, this.color);
    this.squares[1] = new Square(this.leftIndex + 1, highestYIndex + 1, this.color);
    this.squares[2] = new Square(this.leftIndex + 1, highestYIndex, this.color);
    this.squares[3] = new Square(this.leftIndex + 2, highestYIndex, this.color);

    this.origin = this.squares[1];
  }
}