// 文字の生成処理
function spawnCharacter(canvas, charArray, characters, characterSpeed) {
  const char = charArray[Math.floor(Math.random() * charArray.length)]; // charArrayからランダムに1単語を選択
  const direction = Math.floor(Math.random() * 4); // 移動する方向をランダムに選択
  const speed = characterSpeed + Math.random() * 2; // 移動速度をランダムに設定
  const color = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${
    Math.random() * 255
  })`; // 色をランダムに設定
  const fontSize = 15 + Math.random() * 30; // フォントサイズをランダムに設定
  let x, y, xSpeed, ySpeed;
  const scoreSpeed = Math.floor(speed);

  switch (
    direction // 移動する方向に応じて座標と速度を設定
  ) {
    case 0: // 上から下へ
      x = Math.random() * (canvas.width - 50);
      y = 0;
      xSpeed = 0;
      ySpeed = speed;
      break;
    case 1: // 下から上へ
      x = Math.random() * (canvas.width - 50);
      y = canvas.height;
      xSpeed = 0;
      ySpeed = -speed;
      break;
    case 2: // 左から
      x = 0;
      y = Math.random() * (canvas.height - 50);
      xSpeed = speed;
      ySpeed = 0;
      break;
    case 3: // 右から左へ
      x = canvas.width;
      y = Math.random() * (canvas.height - 50);
      xSpeed = -speed;
      ySpeed = 0;
      break;
  }

  // 生成したキャラクターの情報を配列に追加
  characters.push({
    char,
    x,
    y,
    xSpeed,
    ySpeed,
    color,
    fontSize,
    scoreSpeed
  });
}

export { spawnCharacter };