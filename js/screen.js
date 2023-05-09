"use strict";
import { startGame, demoGame, typingSound, clearGameState } from "./script.js";

// タイトル画面
// タイトル画面の要素
const titlepage = document.getElementById("titlepage");
const startBtn = document.getElementById("start-btn");
const howtoBtn = document.getElementById("howto-btn");
typingSound('typingTitle.mp3')
// タイトル画面から説明画面へ
howtoBtn.addEventListener("click", () => {
  titlepage.style.display = "none";
  howtopage.style.display = "block";
  demoGame();
  typingSound('typingDescription.mp3')
});

// 説明画面
// 説明画面の要素
const howtopage = document.getElementById("howtopage");
const exitBtn = document.getElementById("exit-btn");

// 説明画面からタイトル画面へ
exitBtn.addEventListener("click", () => {
  howtopage.style.display = "none";
  titlepage.style.display = "block";
  demoGame.endDemo(); // デモの終了
  typingSound('typingTitle.mp3');
});

// タイトル画面から難易度選択画面へ
startBtn.addEventListener("click", () => {
  titlepage.style.display = "none";
  selectpage.style.display = "block";
  typingSound('typingSelect.mp3');
});

// 難易度選択画面
// 難易度選択画面の要素
const selectpage = document.getElementById("selectpage");
const easyBtn = document.getElementById("easy-btn");
const normalBtn = document.getElementById("normal-btn");
const hardBtn = document.getElementById("hard-btn");
const veryhardBtn = document.getElementById("veryhard-btn");

// 難易度選択画面からゲーム画面へ
let gameLavel = "";
easyBtn.addEventListener("click", () => {
  gameLavel = "easy"
  selectToGamepage(gameLavel)
});
normalBtn.addEventListener("click", () => {
  gameLavel = "normal"
  selectToGamepage(gameLavel)
});
hardBtn.addEventListener("click", () => {
  gameLavel = "hard"
  selectToGamepage(gameLavel)
});
veryhardBtn.addEventListener("click", () => {
  gameLavel = "veryHard"
  selectToGamepage(gameLavel)
});

function selectToGamepage(gameLavel) {
  selectpage.style.display = "none";
  gamepage.style.display = "block";
  setTimeout(() => {
    startGame(gameLavel);
  }, 0);
}

// ゲーム画面
// ゲーム画面の要素
const gamepage = document.getElementById("gamepage");

// ゲーム画面からリザルト画面へ
function moveResultpage() {
  gamepage.style.display = "none";
  resultpage.style.display = "block";
  typingSound('typingResult.mp3');
  clearGameState();
}

// リザルト画面
const resultpage = document.getElementById("resultpage");

// 画面推移するボタン要素
const revengeBtn = document.getElementById("revenge-btn");
const reselectionBtn = document.getElementById("reselection-btn");
const titleBtn = document.getElementById("title-btn");

// リザルト画面から再挑戦へ
revengeBtn.addEventListener("click", () => {
  resultpage.style.display = "none";
  gamepage.style.display = "block";
  resultToGamepage(gameLavel);
});

function resultToGamepage(gameLavel) {
  selectpage.style.display = "none";
  gamepage.style.display = "block";
  setTimeout(() => {
    startGame(gameLavel);
  }, 0);
}

// リザルト画面から難易度選択画面へ
reselectionBtn.addEventListener("click", () => {
  resultpage.style.display = "none";
  selectpage.style.display = "block";
  typingSound('typingSelect.mp3');
});

// リザルト画面からタイトル画面へ
titleBtn.addEventListener("click", () => {
  resultpage.style.display = "none";
  titlepage.style.display = "block";
  typingSound('typingTitle.mp3')
});

export { moveResultpage };