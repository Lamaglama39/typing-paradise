  // 入力文字の成否判定、スコア加算処理
  function checkCharacterMatch(inputChar, characters, score) {
    for (let i = 0; i < characters.length; i++) {
      // 配列charactersに含まれる各キャラクターに対して繰り返す
      if (characters[i].char === inputChar) {
        // 入力された文字列がキャラクターと一致する場合
        characters.splice(i, 1); // 配列からキャラクターを削除
        correctSound(); // 正解音を再生
        // ((文字数 + (最大文字サイズ - 実際の文字サイズ )) * 文字スピード)をスコアに加算
        score += Math.floor((inputChar.length+ (45 - characters[i].fontSize)) * characters[i].scoreSpeed ); 
        console.log(score)
      }
    }
    return score;
  }

  // 入力文字判定イベント
function inputDecision(scoreDisplay, inputBox, lastKeyPressedDisplay, characters, score, keyCount) {
  const lastKeyPressed = inputBox.value; // inputBoxの値を取得
  score = checkCharacterMatch(lastKeyPressed, characters, score); // 入力された文字列とキャラクターをマッチングする
  scoreDisplay.innerText = score; // スコアを表示するHTML要素を更新
  lastKeyPressedDisplay.innerText = "入力: " + lastKeyPressed; // 最後に入力された文字列を表示するHTML要素を更新
  inputBox.value = ""; // inputBoxの値を空にする
  keyCount++; // キー入力回数をカウント
  console.log(keyCount)
  
  return { score, keyCount }; // scoreとkeyCountを返すように修正
}


  // 正解時の音声を流す関数
  function correctSound() {
    const audio = new Audio();
    audio.src = "src/correctBuzzer.mp3";
    audio.play();
  }

export { inputDecision };