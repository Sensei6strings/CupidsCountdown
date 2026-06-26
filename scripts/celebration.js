let celebrationPlayed = false;

function triggerCelebration() {
  if (celebrationPlayed) return;
  celebrationPlayed = true;

  const app = document.getElementById("app");
  const glow = document.getElementById("eventGlow");

  // =============================
  // 🌌 PHASE 1: REALITY SHIFT
  // =============================
  document.body.classList.add("event-active");

  setTimeout(() => {
    document.body.classList.add("shake");
  }, 800);

  // =============================
  // 💓 PHASE 2: HEARTBEAT PULSE
  // =============================
  const heartbeat = setInterval(() => {
    document.body.style.transform = 
      `scale(${1 + Math.sin(Date.now() / 200) * 0.003})`;
  }, 16);

  // =============================
  // ✨ PHASE 3: LIGHT BURST
  // =============================
  setTimeout(() => {
    glow.style.opacity = 1;
  }, 1200);

  setTimeout(() => {
    glow.style.opacity = 0;
  }, 2600);

  // =============================
  // 🎬 PHASE 4: FREEZE MOMENT
  // =============================
  setTimeout(() => {
    clearInterval(heartbeat);
    document.body.classList.remove("shake");

    app.style.filter = "blur(2px) brightness(1.6)";
  }, 3200);

  // =============================
  // 🎉 PHASE 5: MESSAGE DROP
  // =============================
  setTimeout(() => {
    const overlay = document.createElement("div");

    overlay.innerHTML = `
      <div style="
        position:fixed;
        top:0;left:0;
        width:100%;height:100%;
        display:flex;
        justify-content:center;
        align-items:center;
        flex-direction:column;
        background:rgba(200, 236, 1, 0.85);
        color:white;
        font-size:40px;
        text-align:center;
        z-index:9999;
      ">
        <div>❤️ We Made It ❤️</div>
      </div>
    `;

    document.body.appendChild(overlay);
  }, 4200);

  // =============================
  // 🌅 PHASE 6: TRANSITION TO COUNT-UP
  // =============================
  setTimeout(() => {
    app.style.filter = "none";
    window.mode = "after";
  }, 6000);
}
