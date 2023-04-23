const grid = document.querySelector(".grid");
const resultsDisplay = document.querySelector(".results");
let currentShooterIndex = 202;
let width = 15;
let direction = 1;
let invadersId;
let goingRight = true;
let aliensRemoved = [];
let results = 0;
var startTime = new Date().getTime();



import {
  getDatabase,
  set,
  ref, update
} from "https://www.gstatic.com/firebasejs/9.20.0/firebase-database.js";
import { app } from "/js/firebase.js";
for (let i = 0; i < 225; i++) {
  const square = document.createElement("div");
  grid.appendChild(square);
}

var user = localStorage.getItem('user')
console.log(user)
if (user) {
  user = JSON.parse(user)
} else {
  alert('Please Login to Continue')
  window.location.href = '/index.html'
}
var uploaded = false
const uploadResults = async () => {
  if (!uploaded) {
    uploaded = true
    try {
      try {
        const db = getDatabase();
        await update(ref(db, "users/" + user.uid), {
          result_1: results,
        });
        window.location.href = "/html/512.html";
      } catch (er) {
        console.error("Error adding document: ", er);
      }
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
}




const squares = Array.from(document.querySelectorAll(".grid div"));

const alienInvaders = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 30, 31,
  32, 33, 34, 35, 36, 37, 38, 39,
];

function draw() {
  for (let i = 0; i < alienInvaders.length; i++) {
    if (!aliensRemoved.includes(i)) {
      squares[alienInvaders[i]].classList.add("invader");
    }
  }
}

draw();

function remove() {
  for (let i = 0; i < alienInvaders.length; i++) {
    squares[alienInvaders[i]].classList.remove("invader");
  }
}

squares[currentShooterIndex].classList.add("shooter");

function moveShooter(e) {
  squares[currentShooterIndex].classList.remove("shooter");
  switch (e.key) {
    case "ArrowLeft":
      if (currentShooterIndex % width !== 0) currentShooterIndex -= 1;
      break;
    case "ArrowRight":
      if (currentShooterIndex % width < width - 1) currentShooterIndex += 1;
      break;
  }
  squares[currentShooterIndex].classList.add("shooter");
}
document.addEventListener("keydown", moveShooter);

function moveInvaders() {
  const leftEdge = alienInvaders[0] % width === 0;
  const rightEdge =
    alienInvaders[alienInvaders.length - 1] % width === width - 1;
  remove();

  if (rightEdge && goingRight) {
    for (let i = 0; i < alienInvaders.length; i++) {
      alienInvaders[i] += width + 1;
      direction = -1;
      goingRight = false;
    }
  }

  if (leftEdge && !goingRight) {
    for (let i = 0; i < alienInvaders.length; i++) {
      alienInvaders[i] += width - 1;
      direction = 1;
      goingRight = true;
    }
  }

  for (let i = 0; i < alienInvaders.length; i++) {
    alienInvaders[i] += direction;
  }

  draw();

  if (squares[currentShooterIndex].classList.contains("invader", "shooter")) {
    resultsDisplay.innerHTML = "GAME OVER";
    clearInterval(invadersId);
  }

  for (let i = 0; i < alienInvaders.length; i++) {
    if (alienInvaders[i] > squares.length) {
      resultsDisplay.innerHTML = "GAME OVER";
      clearInterval(invadersId);
    }
  }
  if (aliensRemoved.length === alienInvaders.length) {
    resultsDisplay.innerHTML = "YOU WIN";
    clearInterval(invadersId);
  }
}

invadersId = setInterval(moveInvaders, 600);


function shoot(e) {
  let laserId;
  let currentLaserIndex = currentShooterIndex;
  function moveLaser() {
    // mycode
    const boom_inter = setTimeout(
      () => squares[currentLaserIndex].classList.remove("boom"),
      300
    );
    if (resultsDisplay.innerHTML === "YOU WIN") {
      setTimeout(function () {
        console.log(results)
        clearInterval(boom_inter)
        clearInterval(laserId);
        uploadResults()
      }, 1000);
      return;
    } else if (resultsDisplay.innerHTML === "GAME OVER") {
      setTimeout(function () {
        window.location.href = "/html/space.html";
      }, 1000);
      return;
    }
    // mycode
    squares[currentLaserIndex].classList.remove("laser");
    currentLaserIndex -= width;
    squares[currentLaserIndex].classList.add("laser");

    if (squares[currentLaserIndex].classList.contains("invader")) {
      squares[currentLaserIndex].classList.remove("laser");
      squares[currentLaserIndex].classList.remove("invader");
      squares[currentLaserIndex].classList.add("boom");

      clearInterval(laserId);

      const alienRemoved = alienInvaders.indexOf(currentLaserIndex);
      aliensRemoved.push(alienRemoved);
      results++;
      resultsDisplay.innerHTML = results;
      console.log(aliensRemoved);
      console.log(resultsDisplay.innerHTML); // Check the value of innerHTML

    }
  }
  switch (e.key) {
    case "ArrowUp":
      laserId = setInterval(moveLaser, 100);
  }
}

document.addEventListener("keydown", shoot);
