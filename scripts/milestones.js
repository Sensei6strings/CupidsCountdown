const milestoneDefinitions = [
  { days: 0, text: "Our story begins ❤️" },
  { days: 7, text: "1 Week together 🌹" },
  { days: 30, text: "1 Month of us 💕" },
  { days: 100, text: "100 Days ✨" },
  { days: 365, text: "1 Year together 🎉" }
];

let unlocked = new Set();

function checkMilestones(daysTogether) {
  const container = document.getElementById("milestones");

  milestoneDefinitions.forEach(m => {
    if (daysTogether >= m.days && !unlocked.has(m.days)) {
      unlocked.add(m.days);

      const el = document.createElement("div");
      el.className = "milestone";
      el.innerText = m.text;

      Object.assign(el.style, {
        opacity: "0",
        transform: "translateY(20px)",
        transition: "all 1s ease",
        marginTop: "10px",
        fontSize: "16px"
      });

      container.appendChild(el);

      setTimeout(() => {
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
      }, 100);
    }
  });
}