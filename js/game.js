'use strict';
var WALL = '🝙';
var FOOD = '<img src="img/coin.png">';
var EMPTY = ' ';
var SUPERFOOD = '&#129387';
var CHERRY = '&#127826';

var gBoard;
var gGame = {
  score: 0,
  isOn: false
};
var cherryInterval;
var gFoodLeft;

function init() {
  gBoard = buildBoard();

  gFoodLeft = foodCounter();
  console.log(gFoodLeft);

  createPacman(gBoard);
  createGhosts(gBoard);

  printMat(gBoard, '.board-container');
  // console.table(gBoard);
  gGame.isOn = true;
  gGame.score = 0;
  updateScore(0);
  document.querySelector('.modalLost').classList.add('hide');
  document.querySelector('.modalWon').classList.add('hide');

  cherryInterval = setInterval(addCherry, 15000);
}

function buildBoard() {
  var SIZE = 10;
  var board = [];
  for (var i = 0; i < SIZE; i++) {
    board.push([]);
    for (var j = 0; j < SIZE; j++) {
      board[i][j] = FOOD;

      if (i === 0 || i === SIZE - 1 ||
        j === 0 || j === SIZE - 1 ||
        (j === 3 && i > 4 && i < SIZE - 2)) {

        board[i][j] = WALL;
      }
    }
  }
  board[SIZE - 2][SIZE - 2] = SUPERFOOD;
  board[1][1] = SUPERFOOD;
  board[1][SIZE - 2] = SUPERFOOD;
  board[SIZE - 2][1] = SUPERFOOD;
  return board;
}

function updateScore(value) {
  // Update both the model and the dom for the score
  gGame.score += value;
  document.querySelector('header h3 span').innerText = gGame.score;
}


function gameOver() {
  console.log('Game Over');
  gGame.isOn = false;
  clearInterval(gIntervalGhosts);
  gIntervalGhosts = null;
  document.querySelector('.modalLost').classList.remove('hide');
  clearInterval(cherryInterval);
}

function victorious() {
  console.log('You Won');
  gGame.isOn = false;
  clearInterval(gIntervalGhosts);
  gIntervalGhosts = null;
  document.querySelector('.modalWon').classList.remove('hide');
  clearInterval(cherryInterval);
}

function foodCounter() {
  var count = 0;
  for (var i = 0; i < gBoard.length; i++) {
    for (var j = 0; j < gBoard[0].length; j++) {
      if (gBoard[i][j] === FOOD) count++;
    }
  }
  return count;
}

function getEmptyCells() {
  var emptyCells = [];
  for (var i = 0; i < gBoard.length; i++) {
    for (var j = 0; j < gBoard[0].length; j++) {
      if (gBoard[i][j] === ' ') {
        var location = { i: i, j: j };
        emptyCells.push(location);
      }
    }
  }
  return emptyCells;
}

function addCherry() {
  var emptyCells = getEmptyCells();
  if (!emptyCells.length) return;
  var rndCell = getRandomIntInclusive(0, emptyCells.length - 1);
  var rndLocation = emptyCells[rndCell];
  gBoard[rndLocation.i][rndLocation.j] = CHERRY;
  renderCell(rndLocation, CHERRY);
}







