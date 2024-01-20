//accessing all elements.

let boxes = document.querySelectorAll(".box");
let restart_btn = document.querySelector(".restart_btn");
let newgame_btn = document.querySelector(".newgame_btn");
let popup = document.querySelector(".popup");
let msg = document.querySelector(".msg");
let turn = document.querySelector(".turn");
let oscore = document.querySelector(".oscore");
let xscore = document.querySelector(".xscore");

// declaring variables

let oTurn = true;
let count = 0;
let o = 0;
let x = 0;

//winning pattern

let winningPattern = [
  [0, 1, 2],
  [0, 3, 6],
  [2, 5, 8],
  [6, 7, 8],
  [3, 4, 5],
  [1, 4, 7],
  [0, 4, 8],
  [2, 4, 6],
];

// disable all buttons

const disableBtns = () => {
  boxes.forEach((box) => (box.disabled = true));

  // enable popup
  // draw
  if (count == 9) {
    setTimeout(() => {
      popup.classList.remove("hide");
    }, 900);
  }

  // win
  else {
    setTimeout(() => {
      popup.classList.remove("hide");
    }, 2000);
  }
};

//Enable all buttons (For New Game and Restart)

const enableBtns = () => {
  boxes.forEach((box) => {
    box.innerText = "";
    box.disabled = false;
    box.style.backgroundColor = "#f1faee";
    box.classList.remove("animate");
    turn.classList.remove("hidden");
  });

  //disable popup
  popup.classList.add("hide");
};

//New Game button

newgame_btn.addEventListener("click", () => {
  count = 0;
  enableBtns();
});

//Restart button

restart_btn.addEventListener("click", () => {
  count = 0;
  enableBtns();
});

//draw msg printer

const drawMsg = () => {
  disableBtns();
  msg.innerHTML = "&#x1F60E <br> It's a Draw";
};

//winner msg printer

const winnerMsg = (player) => {
  disableBtns();
  if (player == "O") {
    o += 1;
    msg.innerHTML = "&#x1F389 <br> Winner is O ";
  } else {
    x += 1;
    msg.innerHTML = "&#x1F389 <br> Winner is X ";
  }
  oscore.innerText = o;
  xscore.innerText = x;
};

// check winner

const checkWinner = () => {
  for (let pattern of winningPattern) {
    let value0 = boxes[pattern[0]].innerText;
    let value1 = boxes[pattern[1]].innerText;
    let value2 = boxes[pattern[2]].innerText;

    if (value0 != "" && value1 != "" && value2 != "") {
      if (value0 == value1 && value1 == value2) {
        turn.classList.add("hidden");
        boxes[pattern[0]].style.backgroundColor = "#48cae4";
        boxes[pattern[1]].style.backgroundColor = "#48cae4";
        boxes[pattern[2]].style.backgroundColor = "#48cae4";
        boxes[pattern[0]].classList.add("animate");
        boxes[pattern[1]].classList.add("animate");
        boxes[pattern[2]].classList.add("animate");
        console.log("winner", value0);
        winnerMsg(value0);
      }
    }
  }
};

//click button

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (oTurn) {
      box.innerText = "O";
      turn.innerText = "Player X";
      box.style.color = "#9e1971";
      turn.style.color = "#38b000";
      oTurn = false;
    } else {
      box.innerText = "X";
      turn.innerText = "Player O";
      box.style.color = "#38b000";
      turn.style.color = "#9e1971";
      oTurn = true;
    }
    box.disabled = true;
    count += 1;
    if (count == 9) {
      drawMsg();
    }
    checkWinner();
  });
});
