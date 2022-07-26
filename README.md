# tetris.js
Simple Tetris build using JavaScript + jQuery + HTML + CSS

## Planning your game

* User Stories
* Wireframes
* Data

## User Stories / User Journey

As a Player:

* I want to start a game of Tetris when I'm ready
* I want to select which level of play I'm starting at
* I want to see the scores as I'm playing
* I want to see the current level as I'm playing
* I want to see the upcoming tetrimino piece while I'm on a current piece
* I want to see a list of my scores to see how well I've been performing

## Wireframes
(In no particular order)
* Main canvas
* Score
* Lines
* Level 
* Next Piece
* Start Level 0-9 buttons
* High Scores
* Instructions

## Data

0. Tetris.js is a single-player game. The gameplay mechanism generally follow that of Tetris that we all know and love.
1. Main canvas will be represented as an array of 10 (width) by 20 (height), in which empty cells are represented by 0.
2. Each tetrimino will be represented as an array of arrays e.g.

    * I-piece = [[0,0,0,0],
                [1,1,1,1],
                [0,0,0,0],
                [0,0,0,0]]

    * T-piece = [[0,6,0],
                [6,6,6],  
                [0,0,0]]

    The non-zero elements in each tetrimino array has different numbers, each pointing to a different HEX color value (so that each tetrimino has a unique cell color)

3. Players may start the game by selecting level 0 to 9. Each level corresponds to a different starting speed, which is calculated as such: `timer = 2000/(level+1)`

    *e.g. If a player starts at level 3, there will be (2000/4) = 500ms gap between one frame and the next. Subsequent levels also follow this formula.

4. Players enter the next level for every 10 lines cleared, in addition to their starting level. For example, a level 9 start brings the player to level 10 after 10 lines cleared.

5. Score calculation depends on the amount of lines cleared and the level players are currently at:
    * 1 line - 40 * (level + 1)
    * 2 lines - 100 * (level + 1)
    * 3 lines - 300 * (level + 1)
    * 4 lines - 1200 * (level + 1)
    (score calculation is adapted from the classic NES Tetris, which emphasizes tetris/4-line clears)

6. Soft drops and hard drops are also worth some amount of scores:
    * Soft drop = 1 * distance
    * Hard drop = 2 * distance

## Others
* Credit:
   * Drawing grids and cells in JavaScript using .getElementById and .getContext('2d') - [https://youtu.be/zdaXHq95YHw]
   * Using requestAnimationFrame() to set animation fps - []
