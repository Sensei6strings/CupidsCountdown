// =============================
// 🌫 PARTICLE SYSTEM
// SOFT ATMOSPHERIC MOTION
// =============================

function createParticle() {
  const layer = document.getElementById("particles");
  const p = document.createElement("div");

  const size = Math.random() * 4 + 2;

  p.style.position = "absolute";
  p.style.width = size + "px";
  p.style.height = size + "px";
  p.style.borderRadius = "50%";
  p.style.background = "rgba(255,255,255,0.6)";
  p.style.left = Math.random() * window.innerWidth + "px";
  p.style.top = window.innerHeight + "px";
  p.style.opacity = Math.random();

  layer.appendChild(p);

  let y = window.innerHeight;

  const move = setInterval(() => {
    y -= 1.2;
    p.style.top = y + "px";

    if (y < -20) {
      p.remove();
      clearInterval(move);
    }
  }, 16);
}

function startParticles() {
  setInterval(createParticle, 250);
}