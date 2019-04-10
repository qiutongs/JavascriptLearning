# Tetris

I should have done this 6 years ago...

- One tetromino falls at a fixed interval. After it is landed, next one is generated.
- Collision detection between the moving tetromino and landed squares in board.
- Support all 7 kinds of tetrominos.
- Arrow keys are used to control the moving tetromino. Particularly, the UP key can rotate it.
- When a row if full, it will be cleared.
- Game keeps running until one tetromino reaches the top of board. 

## High Level

- A "timer" periodically updates the frame.
- Treat the board as a grid of m * n squares.
- Each kind of tetromino knows its color, position, shape and rotation status.
- Collision detection can be done by checking if the tetromino and board will be "overlapped".
- The data structure for board should be efficient for the case that clears rows.

## Objects Design

- GameRunner: control the game flow.
- Board: the game board with a grid. It tracks all the landed squares.
- Tetromino (and 7 subclasses): shape, position
    - subclasses should share common logic when necessary: move, rotate...
- Square: simple coordinate and its color

## Details

### Grid

For convenience, I define the bottom left is origin. Thus the y index is reversed. This computation is encapsulated in Square class.

### Data Structures

For board, it is naturally to make it as 2-d array. To make it easier for clearing rows, it should be array[y][x], namely the first dimension is y.

For tetromino, I make it as an array of 4 squares. Besides, one of them is considered as origin of all of them so that it is the axis point of rotation.

### Rotation

This is complicated part in term of math computation. I created a rotation matrix and do simple multiplication.

```
[ [cosA, sinA],
  [sinA, cosA]
]
```
## Improvement

- Square class may not be necessary. So Tetromino can have 4 pairs of points as shape
- The axis point of rotation can be none of the 4 squares. 
- Clearing row is oversimplified and the data structure is not every efficient because it deletes element in array.

## Libraries

- [p5js](https://p5js.org/): a handy javascript graphic library

## Ref

- https://en.wikipedia.org/wiki/Tetris
- https://en.wikipedia.org/wiki/Tetromino
- https://en.wikipedia.org/wiki/Rotation_matrix

## TODO

- https://gamedevelopment.tutsplus.com/series/implementing-tetris--gamedev-12717