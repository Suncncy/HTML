(function () {
  const slider = document.getElementById("slider");
  const slides = Array.from(document.querySelectorAll(".slide"));
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const dotsWrap = document.getElementById("dots");

  // 保障：至少 3 张
  if (!slider || slides.length < 3 || !prevBtn || !nextBtn || !dotsWrap) return;

  let index = 0;
  let timer = null;
  const interval = 4000; // 自动轮播间隔（毫秒）

  // 生成圆点
  const dots = slides.map((_, i) => {
    const btn = document.createElement("button");
    btn.className = "dot" + (i === 0 ? " is-active" : "");
    btn.setAttribute("aria-label", `切换到第 ${i + 1} 张`);
    btn.addEventListener("click", () => go(i));
    dotsWrap.appendChild(btn);
    return btn;
  });

  function setActive(i) {
    slides.forEach((s, idx) => s.classList.toggle("is-active", idx === i));
    dots.forEach((d, idx) => d.classList.toggle("is-active", idx === i));
  }

  function go(i) {
    index = (i + slides.length) % slides.length;
    setActive(index);
    restart();
  }

  function next() {
    go(index + 1);
  }

  function prev() {
    go(index - 1);
  }

  function start() {
    stop();
    timer = setInterval(next, interval);
  }

  function stop() {
    if (timer) clearInterval(timer);
    timer = null;
  }

  function restart() {
    start();
  }

  // 手动切换
  nextBtn.addEventListener("click", next);
  prevBtn.addEventListener("click", prev);

  // 悬停暂停（加分项，体验更好）
  slider.addEventListener("mouseenter", stop);
  slider.addEventListener("mouseleave", start);

  // 键盘左右键支持（加分项）
  window.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") prev();
    if (e.key === "ArrowRight") next();
  });

  // 初始化
  setActive(0);
  start();
})();
