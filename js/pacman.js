var gPacman;
const PACMAN = '<span class="pacman">ᗤ</span>';

function createPacman(board) {
  gPacman = {
    location: {
      i: 3,
      j: 5
    },
    isSuper: false
  };
  board[gPacman.location.i][gPacman.location.j] = PACMAN;
}

function movePacman(eventKeyboard) {
  if (!gGame.isOn) return;
  // console.log('eventKeyboard:', eventKeyboard);

  var nextLocation = getNextLocation(eventKeyboard);
  // User pressed none-relevant key in the keyboard
  if (!nextLocation) return;

  var nextCell = gBoard[nextLocation.i][nextLocation.j];

  // Hitting a WALL, not moving anywhere
  if (nextCell === WALL) return;

  // Hitting FOOD? update score
  if (nextCell === FOOD) {
    updateScore(1);
    gFoodLeft--;
    console.log('food left ', gFoodLeft);
    if (gFoodLeft === 0) victorious();
  }
  if (nextCell === GHOST) {
    if (!gPacman.isSuper) {
      gameOver()
      renderCell(gPacman.location, EMPTY);
      return;
    }
    else {
      for (var i = 0; i < gGhosts.length; i++) {
        if (gGhosts[i].location.i === nextLocation.i && gGhosts[i].location.j === nextLocation.j) {
          if (gGhosts[i].currCellContent === FOOD) {
            updateScore(1);
            gFoodLeft--;
            console.log('food left ', gFoodLeft);
          }
          gGhosts.splice(i, 1);

        }
      }
    }
  }

  if (nextCell === SUPERFOOD) {
    if (!gPacman.isSuper) {
      for (var i = 0; i < gGhosts.length; i++) {
        gGhosts[i].color = 'blue';
        renderCell(gGhosts[i].location, getGhostHTML(gGhosts[i]));
        gPacman.isSuper = true;
      }
      setTimeout(function () {
        for (var i = 0; i < gGhosts.length; i++) {
          gGhosts[i].color = getRandomColor();
          renderCell(gGhosts[i].location, getGhostHTML(gGhosts[i]));
        }
        gPacman.isSuper = false;
        while (gGhosts.length < ghostsN) {
          console.log(gGhosts.length);
          createGhost(gBoard);
        }
      }, 5000);
    }
    else {
      if (gPacman.isSuper) {
        return;
      }
    }
  }

  if (nextCell === CHERRY) {
    updateScore(10);
  }

  // Update the model to reflect movement
  gBoard[gPacman.location.i][gPacman.location.j] = EMPTY;
  // Update the DOM
  renderCell(gPacman.location, EMPTY);

  // Update the pacman MODEL to new location  
  gPacman.location = nextLocation;

  gBoard[gPacman.location.i][gPacman.location.j] = PACMAN;

  // Render updated model to the DOM
  renderCell(gPacman.location, PACMAN);

}

function getNextLocation(keyboardEvent) {
  var nextLocation = {
    i: gPacman.location.i,
    j: gPacman.location.j
  };

  switch (keyboardEvent.code) {
    case 'ArrowUp':
      nextLocation.i--;
      document.querySelector(`.cell${gPacman.location.i}-${gPacman.location.j}`).classList.add('looking-up');
      break;
    case 'ArrowDown':
      nextLocation.i++;
      break;
    case 'ArrowLeft':
      nextLocation.j--;
      break;
    case 'ArrowRight':
      nextLocation.j++;
      break;
    default: return null;
  }



  return nextLocation;
}