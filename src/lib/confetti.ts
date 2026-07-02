import confetti from "canvas-confetti";

export function burstConfetti() {
  const colors = ["#ffd1dc", "#ffb6c1", "#ff8fab", "#ffe4ec", "#ffffff"];
  confetti({
    particleCount: 120,
    spread: 90,
    origin: { y: 0.6 },
    colors,
    scalar: 1.1,
    shapes: ["circle"],
  });
  setTimeout(() => {
    confetti({ particleCount: 80, angle: 60, spread: 70, origin: { x: 0, y: 0.7 }, colors });
    confetti({ particleCount: 80, angle: 120, spread: 70, origin: { x: 1, y: 0.7 }, colors });
  }, 250);
  setTimeout(() => {
    confetti({
      particleCount: 60,
      spread: 120,
      origin: { y: 0.4 },
      colors,
      shapes: ["heart" as unknown as "circle"],
      scalar: 1.5,
    });
  }, 500);
}

export function gentleHearts() {
  confetti({
    particleCount: 40,
    spread: 100,
    origin: { y: 0.7 },
    colors: ["#ff8fab", "#ffb6c1", "#ffd1dc"],
    scalar: 1.3,
  });
}
