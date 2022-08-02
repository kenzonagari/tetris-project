# tetris.js
Simple Tetris build using JavaScript + jQuery + HTML + CSS

<img src="https://i.imgur.com/NcZzO4P.png" width="400">

Try it out! https://tetris-js-kenzo.vercel.app/

## Motivation

As part of the General Assembly Software Engineering course, I aim to test and deepen my understanding of JavaScript + HTML + CSS by building a simple Tetris game, specifically one inspired by [the 1989 classic NES Tetris version](https://en.wikipedia.org/wiki/Tetris_(NES_video_game)) that I have *obsessively* played over the past few years. I was very much inspired to build Tetris by reading about its history, especially how its creator Alexei Pajitnov had coded the game in only 2 weeks with one 80s Soviet-era computer ("in a cave, with a box of scraps!"). While my familiarity with the complexity of Tetris did slightly discourage me from embarking on this project, my deep love for the game finally convinced me that the hassle might be more than worth it.

<img src="https://i.imgur.com/NGDi5Wt.png" width="400">

## Description

Tetris is a single-player puzzle game. Per [Wikipedia](https://en.wikipedia.org/wiki/Tetris), "In Tetris, players complete lines by moving differently shaped pieces (tetrominoes), which descend onto the playing field. The completed lines disappear and grant the player points, and the player can proceed to fill the vacated spaces. The game ends when the uncleared lines reach the top of the playing field. The longer the player can delay this outcome, the higher their score will be".

Since this particular Tetris build is inspired by the classic 1989 version, modern Tetris functionalities such as wall kick, multiple next piece preview, piece hold, and auto-lock delay are not included. However, Hard Drop function is included to allow for a faster game pace (and also to satisfy my personal curiosity).

## Timeline

* 1 week of planning + building basic design and downward movement of a Tetris piece,
* followed with 2 weeks of finalizing piece rotation system, scoring, next piece, and high score functionality.

## User Experience

As a Player:

1. Before Gameplay:
   * I want to start a game of Tetris when I'm ready
   * I want to select which level of play I'm starting at
   * I want to see the instructions on how to move the pieces

2. During Gameplay:
   * I want to see the scores as I'm playing
   * I want to see the current level as I'm playing
   * I want to see the upcoming piece while I'm on a current piece

3. After Gameplay:
   * I want to see a list of my scores to see how well I've been performing
   * I want to be able to start again at a level of my choosing

## Wireframe
<img src="https://i.imgur.com/bfdGhg1.png" width="700">

I drew a simple wireframe which contains: 
* Main board/canvas
* Score
* Lines
* Level 
* Next Piece
* Start Level 0-9 buttons
* High Scores
* Instructions

## Code Overview

### Main Board / Canvas

The Tetris canvas is represented as an array of arrays: 20 arrays (height), each having 10 empty cells of 0. I created an array of the specified dimension using the function createEmptyArray:

<img src="https://i.imgur.com/RcImFSH.png" width="400">

### Tetris Pieces

Each Tetris piece is similarly represented as an array of arrays e.g.

<img src="https://i.imgur.com/jVDdefa.png" width="250">

The non-zero elements in each piece array has different numbers, each pointing to a different HEX color value (so that each piece has a unique cell color).
  
### Collision

Pieces are merged/locked into the canvas array if collision occurs i.e. if a piece has hit the bottom of its trajectory and can no longer move down. In my collision function, several conditions are checked for the function to return a Boolean value:

<img src="https://i.imgur.com/4lWlhtE.png" width="900">

In addition to the collision function which checks for vertical collision and decide whether a Player scores / game is over / etc, there is also the horizontalCollision function which primarily checks if a piece can be moved sideways or rotated (both in conjunction with the collision function).

<img src="https://i.imgur.com/6z6JH2w.png" width="900">

### Piece Rotation

The rotation of a tetris piece is a matter of mapping the non-zero cells of the piece array into different coordinates. Take the clockwise T-piece, for example:

<img src="https://i.imgur.com/aaLCCVk.png" width="300">

Mapping each of the desired array coordinate from the current one reveals a pattern:

<img src="https://i.imgur.com/vvyrgm0.png" width="200">

From the pattern, we can deduce the following formula (note that the mathematical operation is on the right side to follow code syntax).

<img src="https://i.imgur.com/Rl3orRC.png" width="300">

A similar process for the counterclockwise T-piece rotation yields the following formula.

<img src="https://i.imgur.com/39JsBEq.png" width="300">

I then applied the two formulas inside two functions, cwRotate and ccwRotate. Great success!

<img src="https://i.imgur.com/eDavexO.png" height="125"><img src="https://i.imgur.com/J74WOgL.png" height="125">

### Auto-drop

The hallmark of Tetris is each piece moving downward at a speed unaffected by the player's input. In this particular build, I use requestAnimationFrame() to control the rate at which the pieces fall, such that the rate increases the higher the level.

<img src="https://i.imgur.com/hbV5sEw.png" width="900">

### Levels, Scores, and Lines 

1. Players may start the game by selecting level 0 to 9. Each level corresponds to a different starting speed, which is calculated as such: `timer = 1500/(level+1)`

    *e.g. If a player starts at level 3, there will be (1500/4) = 375ms gap between one frame and the next. Subsequent levels also follow this formula.

2. Players enter the next level for every 10 lines cleared, in addition to their starting level. For example, a level 9 start brings the player to level 10 after 10 lines cleared.

3. Score calculation depends on the amount of lines cleared and the level players are currently at:
    * 1 line - 40 * (level + 1)
    * 2 lines - 100 * (level + 1)
    * 3 lines - 300 * (level + 1)
    * 4 lines - 1200 * (level + 1)
    (score calculation is adapted from the classic NES Tetris, which emphasizes tetris/4-line clears)

4. Soft drops and hard drops are also worth some amount of scores:
    * Soft drop = 1 * distance
    * Hard drop = 2 * distance

## Future Developments

One major fix that this particular build needs is the finetuning of the keyboard input to allow for a fast-paced gameplay. A particular quirk in the JavaScript keydown input is that pressing one key while holding another somehow negates the latter, and as such I may work towards finding a solution to this quirk. Input speed parameters such as Auto-Repeat Delay and Auto-Repeat Speed are also something that can be investigated further.

While the game currently doesn't have any of the modern Tetris functionalities (except for Hard Drop), it is certainly more than possible to work on add-ons such as piece hold, ghost pieces .etc to make the game more playable for modern players.

## Summary

Building Tetris using JavaScript proves to be an incredibly enriching experience that helps me solidify my understanding of the JavaScript language and sharpen my HTML + CSS skills. To have achieved most of the functionalities that make the game reasonably playable in a few weeks' time is rather encouraging, and I look forward to using the knowledge I've picked up over the course of this project and apply it in future projects. Last but not least, this project has given me the opportunity to gain a more profound insight into the game I've fallen in love with over the years, and for that I am deeply grateful.    

## Others
* Credit:
   * Drawing grids and cells in JavaScript using .getElementById and .getContext('2d') - [https://youtu.be/zdaXHq95YHw]
   * Using requestAnimationFrame() to set animation fps - [https://researchhubs.com/post/computing/javascript/requestAnimationFrame.html]

