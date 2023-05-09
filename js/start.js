import easyCharArray from "./charArray/easy.js";
import normalCharArray from "./charArray/normal.js";
import hardCharArray from "./charArray/hard.js";
import veryHardCharArray from "./charArray/veryHard.js";

// 難易度を取得する関数
//  gameLavelで難易度を判定し、キャラクターの生成間隔、移動速度、キャラクターの配列を返す関数
function setLevel(characterSpeed, characterquantity, charaArrays, gameLavel) {
  switch (gameLavel) {
    case "easy":
      characterSpeed = 0.5;
      characterquantity = 400;
      charaArrays = easyCharArray;
      return [characterSpeed, characterquantity, charaArrays];
    case "normal":
      characterSpeed = 1;
      characterquantity = 300;
      charaArrays = normalCharArray;
      return [characterSpeed, characterquantity, charaArrays];
    case "hard":
      characterSpeed = 2;
      characterquantity = 200;
      charaArrays = hardCharArray;
      return [characterSpeed, characterquantity, charaArrays];
    case "veryHard":
      characterSpeed = 3;
      characterquantity = 100;
      charaArrays = veryHardCharArray;
      return [characterSpeed, characterquantity, charaArrays];
  }
}

export { setLevel };
