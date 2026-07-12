const labels = document.querySelectorAll(".label");

const centerFile = document.getElementById("center-file");
const centerTitle = document.getElementById("center-title");
const centerSubtitle = document.getElementById("center-subtitle");

const defaultFile = "MENTAL PROGRAM";
const defaultTitle = "WEROUM";
const defaultSubtitle = "超自分軸の思考法";

labels.forEach((label) => {

  label.addEventListener("mouseenter", () => {

    centerFile.textContent =
      label.dataset.file;

    centerTitle.textContent =
      label.textContent.trim();

    centerSubtitle.textContent =
      label.dataset.title;

  });

  label.addEventListener("mouseleave", () => {

    centerFile.textContent =
      defaultFile;

    centerTitle.textContent =
      defaultTitle;

    centerSubtitle.textContent =
      defaultSubtitle;

  });

});

// ======================================
// 円ナビ8ブロックのフェードイン
// ======================================

let navAnimations = [];

function replayHeroAnimation() {
  const labels = document.querySelectorAll("#top .label");

  if (labels.length === 0) {
    console.log("円ナビが見つかりません");
    return;
  }

  // 以前のアニメーションを停止
  navAnimations.forEach((animation) => {
    animation.cancel();
  });

  navAnimations = [];

  labels.forEach((label, index) => {
    const animation = label.animate(
      [
        {
          opacity: 0
        },
        {
          opacity: 1
        }
      ],
      {
        duration: 900,
        delay: 300 + index * 140,
        easing: "ease-out",
        fill: "backwards"
      }
    );

    navAnimations.push(animation);
  });
}


// script.jsはHTML末尾で読み込まれているため、そのまま実行
requestAnimationFrame(() => {
  requestAnimationFrame(() => {
    replayHeroAnimation();
  });
});


// RETURN TO COREを押したとき
document.querySelectorAll(".back-top").forEach((button) => {
  button.addEventListener("click", (event) => {
    event.preventDefault();

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

    const waitUntilTop = setInterval(() => {
      if (window.scrollY <= 10) {
        clearInterval(waitUntilTop);

        setTimeout(() => {
          replayHeroAnimation();
        }, 150);

        history.replaceState(null, "", "#top");
      }
    }, 50);
  });
});