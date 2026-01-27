const items = [
  "설갆이",
  "방청소",
  "밥차리기",
  "빨래하기",
  "재활용버리기",
  "정리정돈"
];

const roulette = document.getElementById("roulette");
const result = document.getElementById("result");
const ruleText = document.getElementById("rule");

const angle = 360 / items.length;
let rotation = 0;

// 항목 생성
items.forEach((item, i) => {
  const div = document.createElement("div");
  div.className = "item";
  div.style.transform = `rotate(${angle * i}deg)`;
  div.textContent = item;
  roulette.appendChild(div);
});

// 🔊 사운드
function beep(freq, time) {
  const ctx = new AudioContext();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.frequency.value = freq;
  osc.connect(gain);
  gain.connect(ctx.destination);
  gain.gain.setValueAtTime(0.3, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + time);
  osc.start();
  osc.stop(ctx.currentTime + time);
}

// 🎊 컨페티
function confetti() {
  for (let i = 0; i < 60; i++) {
    const div = document.createElement("div");
    div.className = "confetti";
    div.style.left = Math.random() * window.innerWidth + "px";
    div.style.background = `hsl(${Math.random()*360},100%,50%)`;
    div.style.animationDuration = 2 + Math.random() * 2 + "s";
    document.body.appendChild(div);
    setTimeout(() => div.remove(), 3000);
  }
}

// 룰
function getRule() {
  const r = Math.random();
  if (r < 0.2) return "🎉 보너스! 면제권 획득!";
  if (r < 0.4) return "😈 벌칙! 해당 집안일 2배!";
  return "🙂 일반 수행!";
}

function spin() {
  result.textContent = "";
  ruleText.textContent = "";

  roulette.classList.add("spin-glow");

  if (navigator.vibrate) navigator.vibrate([100, 50, 100]);

  // 회전 중 틱틱
  const tick = setInterval(() => beep(300, 0.05), 150);

  const index = Math.floor(Math.random() * items.length);
  const selectedItem = items[index]; // Store selected item

  // Calculate the target angle for the chosen item to land at the top
  // Each item has an angle 'angle'.
  // The center of item 'index' is at (index * angle + angle / 2).
  // We want this center to be at the pointer (top, which is 0 degrees).
  // So, the rotation needed is `360 - (index * angle + angle / 2)`.
  const degreesToLandOnCenter = (360 - (index * angle + angle / 2)) % 360;

  // Ensure multiple full rotations for visual effect
  const baseRotations = 7 * 360; // Spin at least 7 full rotations

  // Calculate the final target rotation from the initial state (0 degrees)
  // We need to add `baseRotations` to make it spin,
  // then add `degreesToLandOnCenter` to position the selected item at the top,
  // and consider the current `rotation` value to ensure continuous spin.
  rotation = rotation + baseRotations + degreesToLandOnCenter;

  roulette.style.transition =
    "transform 5s cubic-bezier(0.05, 0.8, 0.2, 1)";
  roulette.style.transform = `rotate(${rotation}deg)`;

  setTimeout(() => {
    clearInterval(tick);
    roulette.classList.remove("spin-glow");
    beep(1200, 0.4);
    confetti();
    document.body.classList.add("shake");
    if (navigator.vibrate) navigator.vibrate([200, 100, 200]);

    result.textContent = `🎯 ${selectedItem} 당첨!`; // Use selectedItem
    ruleText.textContent = getRule();

    // Normalize the stored rotation value to keep it between 0 and 359
    rotation = rotation % 360;

    setTimeout(() => document.body.classList.remove("shake"), 500);
  }, 5000);
}