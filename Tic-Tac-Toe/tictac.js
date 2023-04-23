console.log('test');

function startGame() {
  for (var i = 1; i <= 9; i++) {
    clearBoard(i);
    document.getElementById('s' + i).style.removeProperty('background-color');
  }
  document.player = 'X';
  document.winner = null;
  document.turn = 1;
  displayMessage('It is currently ' + document.player + "'s turn");
}

function displayMessage(msg) {
  document.getElementById('message').innerText = msg;
}

function nextMove(square) {
  if (document.winner != null) {
    displayMessage(document.player + ' already won!');
  } else if (square.innerText == '') {
    square.innerText = document.player;
    switchPlayer();
  } else {
    displayMessage('Pick an empty square');
  }
}

function switchPlayer() {
  document.turn++;
  console.log(document.turn);
  if (checkDraw(document.player)) {
    displayMessage('I am so sorry there is no winner');
  } else if (checkWinner(document.player)) {
    showWinner(document.player);
    displayMessage('Congrats the winner is: ' + document.player);
    document.winner = document.player;
  } else if (document.player == 'X') {
    document.player = 'O';
    displayMessage('It is currently ' + document.player + "'s turn");
  } else {
    document.player = 'X';
    displayMessage('It is currently ' + document.player + "'s turn");
  }
}

function checkWinner(move) {
  var result = false;
  if (
    checkRow(1, 2, 3, move) ||
    checkRow(4, 5, 6, move) ||
    checkRow(7, 8, 9, move) ||
    checkRow(1, 5, 9, move) ||
    checkRow(3, 5, 7, move) ||
    checkRow(1, 4, 7, move) ||
    checkRow(2, 5, 8, move) ||
    checkRow(3, 6, 9, move)
  ) {
    result = true;
  }
  return result;
}

function checkDraw(move) {
  result = false;
  console.log(result);
  if (
    !(
      checkRow(1, 2, 3, move) ||
      checkRow(4, 5, 6, move) ||
      checkRow(7, 8, 9, move) ||
      checkRow(1, 5, 9, move) ||
      checkRow(3, 5, 7, move) ||
      checkRow(1, 4, 7, move) ||
      checkRow(2, 5, 8, move) ||
      checkRow(3, 6, 9, move)
    ) &&
    document.turn > 9
  ) {
    result = true;
    console.log(result);
  }
  return result;
}

function checkRow(a, b, c, move) {
  var result = false;
  if (getBox(a) == move && getBox(b) == move && getBox(c) == move) {
    result = true;
  }
  return result;
}

function getBox(number) {
  return document.getElementById('s' + number).innerText;
}

function clearBoard(number) {
  document.getElementById('s' + number).innerText = '';
}

function showWinner(move) {
  if (checkRow(1, 2, 3, move)) {
    document.getElementById('s' + 1).style.backgroundColor = '#DBFF76';
    document.getElementById('s' + 2).style.backgroundColor = '#DBFF76';
    document.getElementById('s' + 3).style.backgroundColor = '#DBFF76';
  } else if (checkRow(4, 5, 6, move)) {
    document.getElementById('s' + 4).style.backgroundColor = '#DBFF76';
    document.getElementById('s' + 5).style.backgroundColor = '#DBFF76';
    document.getElementById('s' + 6).style.backgroundColor = '#DBFF76';
  } else if (checkRow(7, 8, 9, move)) {
    document.getElementById('s' + 7).style.backgroundColor = '#DBFF76';
    document.getElementById('s' + 8).style.backgroundColor = '#DBFF76';
    document.getElementById('s' + 9).style.backgroundColor = '#DBFF76';
  } else if (checkRow(1, 5, 9, move)) {
    document.getElementById('s' + 1).style.backgroundColor = '#DBFF76';
    document.getElementById('s' + 5).style.backgroundColor = '#DBFF76';
    document.getElementById('s' + 9).style.backgroundColor = '#DBFF76';
  } else if (checkRow(3, 5, 7, move)) {
    document.getElementById('s' + 3).style.backgroundColor = '#DBFF76';
    document.getElementById('s' + 5).style.backgroundColor = '#DBFF76';
    document.getElementById('s' + 7).style.backgroundColor = '#DBFF76';
  } else if (checkRow(1, 4, 7, move)) {
    document.getElementById('s' + 1).style.backgroundColor = '#DBFF76';
    document.getElementById('s' + 4).style.backgroundColor = '#DBFF76';
    document.getElementById('s' + 7).style.backgroundColor = '#DBFF76';
  } else if (checkRow(2, 5, 8, move)) {
    document.getElementById('s' + 2).style.backgroundColor = '#DBFF76';
    document.getElementById('s' + 5).style.backgroundColor = '#DBFF76';
    document.getElementById('s' + 8).style.backgroundColor = '#DBFF76';
  } else if (checkRow(3, 6, 9, move)) {
    document.getElementById('s' + 3).style.backgroundColor = '#DBFF76';
    document.getElementById('s' + 6).style.backgroundColor = '#DBFF76';
    document.getElementById('s' + 9).style.backgroundColor = '#DBFF76';
  }
}
