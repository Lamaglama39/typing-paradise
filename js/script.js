"use strict";

import { changeMode } from "./mode.js";
import { setLevel } from "./start.js";
import { spawnCharacter } from "./create.js";
import { inputDecision } from "./input.js";
import { moveResultpage } from "./screen.js";

// Startクリック時のゲーム開始処理
function startGame(gameLavel) {
  // キャラクターの情報を格納する配列
const characters = [];
let score = 0; // 得点
let time = 60; // 制限時間
let timerId; // タイマーのID
let keyCount = 0; // キー入力回数
let rank = "";

  // HTML要素のinputBoxを取得
  const inputBox = document.getElementById("inputBox");
  // HTML要素のlastKeyPressedを取得
  const lastKeyPressedDisplay = document.getElementById("lastKeyPressed");
  // HTML要素のscoreDisplayを取得
  const scoreDisplay = document.getElementById("scoreDisplay");
  // HTML要素のtimeDisplayを取得
  const timeDisplay = document.getElementById("timeDisplay");

  // canvas関連の要素取得
  const canvas = document.getElementById("gameCanvas"); // HTML要素のgameCanvasを取得
  const ctx = canvas.getContext("2d"); // 2Dコンテキストを取得
  // canvas要素のサイズ取得
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;

  // inputBoxにフォーカスを当てる
  document.getElementById("inputBox").focus();

  addInputEventListener();
  function addInputEventListener() {
    inputBox.addEventListener("input", handleInput);
  }

  function removeInputEventListener() {
    inputBox.removeEventListener("input", handleInput);
  }

  function handleInput() {
    const result = inputDecision(
      scoreDisplay,
      inputBox,
      lastKeyPressedDisplay,
      characters,
      score,
      keyCount
    );
    score = result.score;
    keyCount = result.keyCount;
  }

  // 難易度を判定し、キャラクターの生成間隔と移動速度を設定
  let characterSpeed = "";
  let characterquantity = "";
  let charArrays;
  [characterSpeed, characterquantity, charArrays] = setLevel(
    characterSpeed,
    characterquantity,
    charArrays,
    gameLavel
  );

  // キャラクターを生成するインターバルを設定
  let spawnIntervalId = setInterval(
    () => {
      spawnCharacter(canvas, charArrays, characters, characterSpeed); // キャラクターを生成する関数を実行
    },
    characterquantity // キャラクターを生成する間隔
  );
  let updateIntervalId = setInterval(() => { // 修正: 変数を追加
    update(canvas, ctx, characters); // キャラクターの位置を更新するインターバルを設定
  }, 12);
  timerId = setInterval(() => {
    // 制限時間を管理するタイマーを設定
    // 残り時間が0になった場合の終了処理
    if (time <= 0) {
      clearInterval(spawnIntervalId); // キャラクターを生成するインターバルをクリア
      clearInterval(timerId); // タイマーをクリア
      clearInterval(updateIntervalId); // 修正: 画面の更新を停止
      removeInputEventListener();

      rank = judgeRank(score); // ランク判定処理
      setResult(gameLavel, keyCount, score, rank);
      moveResultpage();
      return;
    }
    time--; // 残り時間を1秒減らす
    timeDisplay.innerText = "残り時間: " + time; // 残り時間を表示するHTML要素を更新
  }, 1000);
}

function clearGameState() {
  const inputBox = document.getElementById("inputBox");
  const lastKeyPressedDisplay = document.getElementById("lastKeyPressed");
  const scoreDisplay = document.getElementById("scoreDisplay");
  const timeDisplay = document.getElementById("timeDisplay");

  inputBox.value = "";
  lastKeyPressedDisplay.innerText = "入力: ";
  scoreDisplay.innerText = "0";
  timeDisplay.innerText = "残り時間: ";
}

// リザルト画面のRank判定処理
function judgeRank(score) {
  console.log(`judgeRank rank: ${score}`)
  console.log(typeof score)
  switch (true) {
    case score >= 1000:
      return "S";
    case score >= 800:
      return "A";
    case score >= 600:
      return "B";
    case score >= 400:
      return "C";
    case score >= 200:
      return "D";
    default:
      return "E";
  }
}

// リザルト画面のスコア表示
function setResult(gameLavel, keyCount, score, rank) {
  // スコアなどを表示する要素
  const resultDifficulty = document.getElementById("result-difficulty");
  const resultKeytype = document.getElementById("result-keytype");
  const resultScore = document.getElementById("result-score");
  const resultRank = document.getElementById("result-rank");

  // resultの各値をセット
  resultDifficulty.innerText = gameLavel;
  resultKeytype.innerHTML = keyCount + "回";
  resultScore.innerHTML = score + "点";
  resultRank.innerHTML = rank;
}

// canvas要素の更新処理
function update(canvas, ctx, characters) {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // キャンバスをクリア

  for (const character of characters) {
    // 配列charactersに含まれる各キャラクターに対して繰り返す
    ctx.fillStyle = character.color; // キャラクターの塗りつぶし色を設定
    ctx.font = character.fontSize + "px 游明朝"; // キャラクターのフォントを設定
    ctx.fillText(character.char, character.x, character.y); // キャラクターを描画
    character.x += character.xSpeed; // x方向の移動量を加算
    character.y += character.ySpeed; // y方向の移動量を加算
    // console.log("Character coordinates:", character.x, character.y);
    // キャラクターが画面外に出た場合は配列から削除
    if (
      character.x < -200 ||
      character.x > canvas.width + 200 ||
      character.y < -200 ||
      character.y > canvas.height + 200
    ) {
      // 配列からキャラクターを削除
      characters.splice(characters.indexOf(character), 1);
    }
  }
}

// demoGame関数の定義
function demoGame() {
  let demoCharacters = [];
  let demoCanvas = document.getElementById("demoCanvas");
  let demoCtx = demoCanvas.getContext("2d");
  demoCanvas.width = demoCanvas.clientWidth;
  demoCanvas.height = demoCanvas.clientHeight;
  const character = ["サンプル", "さんぷる", "見本"];
  const demo = setInterval(() => {
    demoCtx.clearRect(0, 0, demoCanvas.width, demoCanvas.height);

    // ここで、文字の出現確率を調整する
    if (Math.random() * 100 < 2) {
      spawnCharacter(demoCanvas, character, demoCharacters, 0.5);
    }

    for (const character of demoCharacters) {
      demoCtx.fillStyle = character.color;
      demoCtx.font = character.fontSize + "px 游明朝";
      demoCtx.fillText(character.char, character.x, character.y);
      character.x += character.xSpeed;
      character.y += character.ySpeed;
    }

    demoCharacters = demoCharacters.filter((character) => {
      return character.y < demoCanvas.height;
    });
  }, 15);

  demoGame.endDemo = function () {
    clearInterval(demo);
  };
}

// 音声を流す関数
function typingSound(fileName) {
  const audio = new Audio();
  audio.src = `src/${fileName}`;
  audio.play();
}

// ライトモード/ダークモードの切り替え
changeMode();

export { startGame, demoGame, typingSound, clearGameState };
