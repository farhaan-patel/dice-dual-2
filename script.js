"use strict";

const scoreP0El = document.getElementById("score--0");
const scoreP1El = document.getElementById("score--1");
const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const btnclose = document.querySelector(".ri-close-line");
const btn = document.querySelector(".dumb");
let score = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;
// name selector

const nameSelector = function () {
  let player0 = String(document.getElementById("player0").value);
  let player1 = String(document.getElementById("player1").value);
  btn.textContent = " loool";
  document.getElementById("name--0").textContent = player0;
  document.getElementById("name--1").textContent = player1;
  document.querySelector(".name-selector").classList.add("hidden");
};
btn.addEventListener("click", function () {
  nameSelector();
});
// switch player
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player1El.classList.toggle("player--active");
  player0El.classList.toggle("player--active");
};

// starting condition
function startingCondition() {
  scoreP0El.textContent = 0;
  scoreP1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  diceEl.classList.add("hidden");
  currentScore = 0;
  score = [0, 0];
  playing = true;
}
startingCondition();

// function
btnRoll.addEventListener("click", function () {
  if (playing) {
    // genrate no
    const dice = Math.trunc(Math.random() * 6) + 1;
    //   display dice
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${dice}.png`;
    // check if it rolled 1
    if (dice !== 1) {
      //  add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
      // current0El.textContent = currentScore;
    } else {
      // switch the player
      switchPlayer();
    }
  }
});
// holds the score
btnHold.addEventListener("click", function () {
  if (playing) {
    // 1. add current score to ACtive player
    score[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      score[activePlayer];
    // 2 check if playes score is >=100 then finish the game
    if (score[activePlayer] >= 100) {
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
      document.getElementById(`name--${activePlayer}`).textContent = `player ${
        activePlayer === 0 ? 1 : 2
      } wines the match🎉🎊🥳 `;
      playing = false;
      //     scoreP0El.textContent = 0;
      // scoreP1El.textContent = 0;
      // current0El.textContent = 0;
      // current1El.textContent = 0;
      diceEl.classList.add("hidden");
    } else {
      switchPlayer();
    }
  }
});
// new game
btnNew.addEventListener("click", function () {
  startingCondition();

  diceEl.classList.add("hidden");
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove("player--winner");
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add("player--active");
  nameSelector();
});
// close btn
btnclose.addEventListener("click", function () {
  document.querySelector(".name-selector").classList.add("hidden");
});
