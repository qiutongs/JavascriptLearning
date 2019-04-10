/* 
 * A square has x, y and color.
 * The origin of grid is at bottom left.
 */
class Square {

  constructor(xIndex, yIndex, color) {
    this.xIndex = xIndex;
    this.yIndex = yIndex;
    this.color = color;
  }

  moveUp() {
    this.yIndex += 1;
  }
  
  moveDown() {
    this.yIndex -= 1;
  }
  
  moveLeft() {
    this.xIndex -= 1;
  }
  
  moveRight() {
    this.xIndex += 1;
  }
  
  draw() {
    Square.drawSquare(this.xIndex, this.yIndex, this.color);
  }
  
  static drawSquare(xIndex, yIndex, color) {
    fill(color);
    
    var actualYIndex = SQUARES_IN_HEIGHT - 1 - yIndex;
    square(xIndex * SQUARE_SIZE, actualYIndex * SQUARE_SIZE, SQUARE_SIZE);
  }
}