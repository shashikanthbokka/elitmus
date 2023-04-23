var timerFunction;
var isSorted = ''
var images = [
  { src: "/assets/images/london-bridge.jpg", title: "London Bridge" },
  { src: "/assets/images/lotus-temple.jpg", title: "Lotus Temple" },
  { src: "/assets/images/qutub-minar.jpg", title: "Qutub Minar" },
  {
    src: "/assets/images/statue-of-liberty.jpg",
    title: "Statue Of Liberty",
  },
  { src: "/assets/images/taj-mahal.jpg", title: "Taj Mahal" },
];

window.onload = function () {
  var gridSize = document
    .querySelector('#levelPanel input[type="radio"]:checked')
    .getAttribute("value");
  imagePuzzle.startGame(images, gridSize);
};
function restart() {
  var gridSize = document
    .querySelector('#levelPanel input[type="radio"]:checked')
    .getAttribute("value");
  imagePuzzle.startGame(images, gridSize);
}
function rules() {
  alert(
    "Re arrange the image parts in a way that it correctly forms the picture. \nThe no. of steps taken will be counted."
  );
}
function about() {
  alert(
    "Developed by Shashikanth Bokka. \nHe can be contacted at: soft.gandhi@gmail.com"
  );
}
var imagePuzzle = {
  stepCount: 0,
  startTime: new Date().getTime(),
  startGame: function (images, gridSize) {
    this.setImage(images, gridSize);
    helper.doc("playPanel").style.display = "block";
    helper.shuffle("sortable");
    this.stepCount = 0;
    this.startTime = new Date().getTime();
    this.tick();
  },
  tick: function () {
    var now = new Date().getTime();
    var elapsedTime = parseInt((now - imagePuzzle.startTime) / 1000, 10);
    helper.doc("timerPanel").textContent = elapsedTime;
    timerFunction = setTimeout(imagePuzzle.tick, 1000);
  },
  setImage: function (images, gridSize = 4) {
    var percentage = 100 / (gridSize - 1);
    var image = images[Math.floor(Math.random() * images.length)];
    helper.doc("imgTitle").innerHTML = image.title;
    helper.doc("actualImage").setAttribute("src", image.src);
    helper.doc("sortable").innerHTML = "";
    for (var i = 0; i < gridSize * gridSize; i++) {
      var xpos = percentage * (i % gridSize) + "%";
      var ypos = percentage * Math.floor(i / gridSize) + "%";

      let li = document.createElement("li");
      li.id = i;
      li.setAttribute("data-value", i);
      li.style.backgroundImage = "url(" + image.src + ")";
      li.style.backgroundSize = gridSize * 100 + "%";
      li.style.backgroundPosition = xpos + " " + ypos;
      li.style.width = 400 / gridSize + "px";
      li.style.height = 400 / gridSize + "px";

      li.setAttribute("draggable", "true");
      li.ondragstart = (event) =>
        event.dataTransfer.setData("data", event.target.id);
      li.ondragover = (event) => event.preventDefault();
      li.ondrop = (event) => {
        let origin = helper.doc(event.dataTransfer.getData("data"));
        let dest = helper.doc(event.target.id);
        let p = dest.parentNode;

        if (origin && dest && p) {
          let temp = dest.nextSibling;
          let x_diff = origin.offsetLeft - dest.offsetLeft;
          let y_diff = origin.offsetTop - dest.offsetTop;

          if (y_diff == 0 && x_diff > 0) {
            //LEFT SWAP
            p.insertBefore(origin, dest);
            p.insertBefore(temp, origin);
          } else {
            p.insertBefore(dest, origin);
            p.insertBefore(origin, temp);
          }

          let vals = Array.from(helper.doc("sortable").children).map(
            (x) => x.id
          );
          var now = new Date().getTime();
          helper.doc("stepCount").textContent = ++imagePuzzle.stepCount;
          document.querySelector(".timeCount").textContent = parseInt(
            (now - imagePuzzle.startTime) / 1000,
            10
          );

          if (isSorted(vals)) {
            // helper.doc('actualImageBox').style.display = 'none';
            // helper.doc('gameOver').style.display = 'block';
            uploadResults()
            console.log('completed')
            helper.doc("actualImageBox").innerHTML =
              helper.doc("gameOver").innerHTML;
            helper.doc("stepCount").textContent = imagePuzzle.stepCount;
          }
        }
      };
      li.setAttribute("dragstart", "true");
      helper.doc("sortable").appendChild(li);
    }
    helper.shuffle("sortable");
  },
};

isSorted = (arr) =>
  arr.every((elem, index) => {
    return elem == index;
  });

var helper = {
  doc: (id) => document.getElementById(id) || document.createElement("div"),

  shuffle: (id) => {
    var ul = document.getElementById(id);
    for (var i = ul.children.length; i >= 0; i--) {
      ul.appendChild(ul.children[(Math.random() * i) | 0]);
    }
  },
};

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-app.js";
import {
  getDatabase,
  set,
  ref,
  update,
  onValue,
} from "https://www.gstatic.com/firebasejs/9.20.0/firebase-database.js";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
} from "https://www.gstatic.com/firebasejs/9.20.0/firebase-auth.js";
const app = initializeApp({
  apiKey: "AIzaSyCGqYkypNBsj3-D05-7CiDZQd-eHmjuksg",
  authDomain: "project-escape-23.firebaseapp.com",
  projectId: "project-escape-23",
  storageBucket: "project-escape-23.appspot.com",
  messagingSenderId: "346453512843",
  appId: "1:346453512843:web:e00ababbff8e43f820fa8e",
});
var time_taken = 0
const timers = setInterval(() => {
  time_taken += 1
}, 1000)
var uploaded = false;
var user = localStorage.getItem('user')
if (user) {
  user = JSON.parse(user)
} else {
  alert('Login to Continue')
  window.location.href = '/'
}
const uploadResults = async () => {
  clearInterval(timers)
  if (!uploaded) {
    uploaded = true;
    try {
      try {
        const db = getDatabase();
        await update(ref(db, "users/" + user.uid), {
          result_3_time: time_taken,
        });
        window.location.href = '/html/generalknowledge.html';
      } catch (er) {
        console.error("Error adding document: ", er);
      }
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
};


document.getElementById('btnRule').addEventListener('click', rules)
document.getElementById('next-puzzle').addEventListener('click', uploadResults)
document.getElementById('medium').addEventListener('change', (e) => imagePuzzle.startGame(images, e.value))