// =============================
// 📸 MEMORY SYSTEM v5
// 🧭 CLEAN BORDER PROCESSION ENGINE
// =============================

const memoryImages = [
  "images/memories/photo1.jpg",
  "images/memories/photo2.jpg",
  "images/memories/photo3.jpg",
  "images/memories/photo4.jpg",
  "images/memories/photo5.jpg",
  "images/memories/photo6.jpg",
  "images/memories/photo7.jpg",
  "images/memories/photo8.jpg",
  "images/memories/photo9.jpg"
];

// =============================
// 🧠 STATE
// =============================
const memories = [];

// spacing away from screen edge (prevents clipping)
const MARGIN = 60;

// =============================
// 🧭 RECTANGLE TRACK FUNCTION
// =============================
function getTrackPosition(t, w, h) {
  const perimeter = 2 * (w + h - 4 * MARGIN);
  let p = t % perimeter;

  // TOP (left → right)
  if (p < w - 2 * MARGIN) {
    return {
      x: MARGIN + p,
      y: MARGIN
    };
  }
  p -= (w - 2 * MARGIN);

  // RIGHT (top → bottom)
  if (p < h - 2 * MARGIN) {
    return {
      x: w - MARGIN,
      y: MARGIN + p
    };
  }
  p -= (h - 2 * MARGIN);

  // BOTTOM (right → left)
  if (p < w - 2 * MARGIN) {
    return {
      x: w - MARGIN - p,
      y: h - MARGIN
    };
  }
  p -= (w - 2 * MARGIN);

  // LEFT (bottom → top)
  return {
    x: MARGIN,
    y: h - MARGIN - p
  };
}

// =============================
// 📸 CREATE MEMORY
// =============================
function createMemory(index) {
  const layer = document.getElementById("memoryLayer");
  if (!layer) return;

  const img = document.createElement("img");
  img.src = memoryImages[index % memoryImages.length];
  img.className = "memory";

  const size = 90 + Math.random() * 25;

  img.style.width = size + "px";
  img.style.height = size + "px";
  img.style.transform = "translate(-50%, -50%)";

  layer.appendChild(img);

  const spacing = 180; // distance between images on track

  memories.push({
    el: img,
    t: index * spacing,   // 👈 THIS prevents overlap
    speed: 0.8            // consistent motion
  });
}

// =============================
// 🌊 ANIMATION LOOP
// =============================
function animateMemories() {
  const w = window.innerWidth;
  const h = window.innerHeight;

  memories.forEach((m) => {
    m.t += m.speed;

    const pos = getTrackPosition(m.t, w, h);

    m.el.style.left = pos.x + "px";
    m.el.style.top = pos.y + "px";

    // NO ROTATION — keeps images stable & readable
    m.el.style.opacity = 0.9;
  });

  requestAnimationFrame(animateMemories);
}

// =============================
// 🚀 START SYSTEM
// =============================
function startMemories() {
  // initial set
  for (let i = 0; i < 14; i++) {
  createMemory(i);
}

  animateMemories();
}