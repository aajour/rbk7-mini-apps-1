var buttons = document.getElementsByClassName("boardItem");
var currentPlayer = document.getElementById("currentPlayer");
var xScore = document.getElementById("xScore");
var yScore = document.getElementById("yScore");

var board = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
var result = [0, 0];

function changeCurrentPlayer() {
  if (currentPlayer.textContent === "X") {
    currentPlayer.textContent = "O";
  } else {
    currentPlayer.textContent = "X";
  }
}

function handleBtnClick(id) {
  var btn = buttons[id];
  handleBoardClick(btn);
  boardRecord(id);
  checker();
  changeCurrentPlayer();
}

function handleBoardClick(btn) {
  btn.value = currentPlayer.textContent;
  btn.disabled = true;
  btn.setAttribute("style", "cursor:not-allowed;color:red");
}

function boardRecord(id) {
  if (id >= 0 && id <= 2) {
    board[0][id] = currentPlayer.textContent;
  }
  if (id >= 3 && id <= 5) {
    board[1][Math.abs(3 - id)] = currentPlayer.textContent;
  }
  if (id >= 6 && id <= 8) {
    board[2][Math.abs(6 - id)] = currentPlayer.textContent;
  }
}

function checkRows() {
  var result = false;
  for (var i = 0; i < board.length; i++) {
    if (checkEquality(board[i])) {
      result = true;
    }
  }
  return result;
}

function checkCols() {
  var result = false;
  var col1 = [];
  var col2 = [];
  var col3 = [];

  for (var i = 0; i < 3; i++) {
    col1.push(board[i][0]);
  }
  for (var i = 0; i < 3; i++) {
    col2.push(board[i][1]);
  }
  for (var i = 0; i < 3; i++) {
    col3.push(board[i][2]);
  }

  if (checkEquality(col1) || checkEquality(col2) || checkEquality(col3)) {
    result = true;
  }
  return result;
}

function checkDiagonals() {
  var result = false;

  var majorDiagonal = [board[0][0], board[1][1], board[2][2]];
  var minorDiagonal = [board[0][2], board[1][1], board[2][0]];
  if (checkEquality(majorDiagonal) || checkEquality(minorDiagonal)) {
    result = true;
  }
  return result;
}

function checker() {
  if (checkCols() || checkRows() || checkDiagonals()) {
    alert(`player ${currentPlayer.textContent} win!`);
    if (currentPlayer.textContent === "X") {
      result[0]++;
      xScore.textContent = result[0];
      yScore.textContent = result[1];
    }
    if (currentPlayer.textContent === "O") {
      result[1]++;
      xScore.textContent = result[0];
      yScore.textContent = result[1];
    }
    reset();
  }
}

function reset() {
  for (const btn of buttons) {
    btn.disabled = false;
    btn.value = " ";
    btn.setAttribute("style", "cursor:pointer");
    currentPlayer.textContent = "X";
    board = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
  }
}

function checkEquality(arr) {
  return arr.every(element => element === arr[0]);
}
