// =============================
// 🎆 FIREWORKS ENGINE v2 (CLEAN)
// PHYSICS + CLEAN CANVAS RENDER
// =============================

const canvas = document.getElementById("fireworksCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Resize handling
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// =============================
// 💥 PARTICLES STORAGE
// =============================
let particles = [];

// =============================
// 💥 PARTICLE CLASS
// =============================
class Particle {
  constructor(x, y, color, velocity) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.velocity = velocity;

    this.alpha = 1;
    this.friction = 0.98;
    this.gravity = 0.08;
  }

  update() {
    this.velocity.x *= this.friction;
    this.velocity.y *= this.friction;

    this.velocity.y += this.gravity;

    this.x += this.velocity.x;
    this.y += this.velocity.y;

    this.alpha -= 0.015;
  }

  draw() {
    ctx.save();
    ctx.globalAlpha = this.alpha;

    ctx.beginPath();
    ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);

    ctx.fillStyle = this.color;
    ctx.fill();

    ctx.restore();
  }
}

// =============================
// 🎨 EXPLOSION SYSTEM
// =============================
function explode(x, y) {
  const colors = ["#ff4d6d", "#ffb6c1", "#ffffff", "#ffd700"];

  for (let i = 0; i < 80; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 6;

    particles.push(
      new Particle(x, y, colors[Math.floor(Math.random() * colors.length)], {
        x: Math.cos(angle) * speed,
        y: Math.sin(angle) * speed
      })
    );
  }
}

// =============================
// 🚀 ROCKET LAUNCH (FIXED)
// =============================
function launchFirework() {
  const x = Math.random() * canvas.width;
  const y = canvas.height;

  const targetY = Math.random() * canvas.height * 0.4;

  let rocket = {
    x,
    y,
    vy: -6 - Math.random() * 3,
    exploded: false
  };

  const interval = setInterval(() => {
    if (!rocket.exploded) {
      rocket.y += rocket.vy;

      // rocket trail
      ctx.fillStyle = "white";
      ctx.fillRect(rocket.x, rocket.y, 2, 8);

      if (rocket.y <= targetY) {
        rocket.exploded = true;
        explode(rocket.x, rocket.y);
        clearInterval(interval);
      }
    }
  }, 16);
}

// =============================
// 🔁 MAIN RENDER LOOP
// =============================
function animateFireworks() {
  // IMPORTANT: proper fade (NO color tinting)
  ctx.fillStyle = "rgba(0, 0, 0, 0.15)";
 

  // particles update
  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];

    p.update();
    p.draw();

    if (p.alpha <= 0) {
      particles.splice(i, 1);
    }
  }

  requestAnimationFrame(animateFireworks);
}

// =============================
// 🎆 START ENGINE
// =============================
function startFireworks() {
  animateFireworks();

  setInterval(() => {
    if (document.body.classList.contains("event-active")) {
      launchFirework();
    }
  }, 400);
}