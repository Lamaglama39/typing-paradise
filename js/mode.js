// ライトモード/ダークモードの切り替え
// チェックボックスの取得
const btn = document.querySelector("#btn-mode");
const demoConvasFrame = document.getElementById("demoCanvas");
const gameConvasFrame = document.getElementById("gameCanvas");
const results = document.getElementById("results");

function changeMode() {
  btn.addEventListener("click", () => {
    if (btn.classList.contains("switch-light-theme")) {
      // ダークモード
      btn.classList.remove("switch-light-theme");
      btn.classList.add("switch-dark-theme");
      btn.textContent = "ダークモード"
      document.body.classList.remove("light-theme");
      document.body.classList.add("dark-theme");
      demoConvasFrame.classList.remove("democanvas-light-theme");
      demoConvasFrame.classList.add("democanvas-dark-theme");
      gameConvasFrame.classList.remove("border-bottom-light-theme");
      gameConvasFrame.classList.add("border-bottom-dark-theme");
      results.classList.remove("border-bottom-light-theme");
      results.classList.add("border-bottom-dark-theme");
    } else {
      // ライトモード
      btn.classList.remove("switch-dark-theme");
      btn.classList.add("switch-light-theme");
      btn.textContent = "ライトモード"
      document.body.classList.remove("dark-theme");
      document.body.classList.add("light-theme");
      demoConvasFrame.classList.remove("democanvas-dark-theme");
      demoConvasFrame.classList.add("democanvas-light-theme");
      gameConvasFrame.classList.remove("border-bottom-dark-theme");
      gameConvasFrame.classList.add("border-bottom-light-theme");
      results.classList.remove("border-bottom-dark-theme");
      results.classList.add("border-bottom-light-theme");
    }
  });  
}

export { changeMode };