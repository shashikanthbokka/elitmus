var GameState = { PLAYING: 1, WIN: 2, LOST: 3, STOPPED: 4 };
var endTime = new Date().getTime();

var Game = {
  board: null,
  view: null,
  state: GameState.STOPPED,
  mines: 0,

  start: function () {
    if (!GameState.STOPPED) return;

    this.prepareBoard();
    this.state = GameState.PLAYING;
  },

  restart: function () {
    if (this.mines <= 0) return;
    this.state = GameState.PLAYING;
    this.board.refresh(this.mines);
  },

  prepareBoard: function () {
    let level = document.getElementById("level").value;
    let size = 0;

    switch (level) {
      case "beginner":
        size = 8;
        this.mines = 10;
        break;

      default:
        // TODO: wrong level
        break;
    }

    let type = document.getElementById("type").value;

    let model, view;

    switch (type) {
      case "classic":
        model = new BoardModel(size, size);
        view = new BoardView(model, "board");
        break;

      default:
        break;
    }

    this.board = new Board(model, view);
    this.board.refresh(this.mines);
  },

  changeState: function (state) {
    if (this.state == state) return;
    this.state = state;
    switch (state) {
      case GameState.WIN:
        setTimeout(function () {
          window.location.href = "/html/video6.html";
        }, 1000);
        break;
      case GameState.LOST:
        this.board.openAllMines();
        alert("You lose!");
        break;
    }
  },
};
