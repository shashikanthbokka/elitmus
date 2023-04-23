function puzzle4() {
  var inputField = document.getElementById("puzzle4ans");
  var inputValue = inputField.value;
  //   alert(inputValue);
  if (inputValue == "maldives") {
    setTimeout(function () {
      window.location.href = "/html/minesweeper.html";
    }, 1000);
  } else {
    alert("The answer is wrong !");
  }
}
