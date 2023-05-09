  // ゲーム終了処理
  function endGame(score) {
    alert("GameOver! Your Score: " + score); // ゲームオーバーのメッセージを表示
    // window.location.reload(); // ページをリロードしてゲームをリセット
    score = 0;
    time = 30;
  }

export { endGame };