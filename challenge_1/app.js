var buttons = document.getElementsByClassName("myButton1");
var currentPlayer = document.getElementById("currentPlayer");
var board = [[], [], []];

function changeCurrentPlayer() {
  if (currentPlayer.textContent === "X") {
    currentPlayer.textContent = "O";
  } else {
    currentPlayer.textContent = "X";
  }
}

function handleBtnClick(id) {
  var btn = buttons[id];
  test(btn);
  changeCurrentPlayer();
}

function test(btn) {
  btn.value = currentPlayer.textContent;
  btn.disabled = true;
  btn.setAttribute("style", "cursor:not-allowed;color:red");
}
