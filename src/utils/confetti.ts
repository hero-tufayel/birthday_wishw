import confetti from 'canvas-confetti';

export const triggerLuxuryConfetti = () => {
  const colors = ['#F5C564', '#D4AF37', '#FFF3D6', '#E2A938', '#FFFFFF', '#F0E6D2'];

  // Left burst
  confetti({
    particleCount: 65,
    angle: 60,
    spread: 70,
    origin: { x: 0.1, y: 0.75 },
    colors,
    ticks: 350,
    gravity: 0.75,
    scalar: 1.1,
    shapes: ['circle', 'square'],
  });

  // Right burst
  confetti({
    particleCount: 65,
    angle: 120,
    spread: 70,
    origin: { x: 0.9, y: 0.75 },
    colors,
    ticks: 350,
    gravity: 0.75,
    scalar: 1.1,
    shapes: ['circle', 'square'],
  });

  // Golden shimmer star shower from top
  setTimeout(() => {
    confetti({
      particleCount: 50,
      spread: 100,
      origin: { x: 0.5, y: 0.2 },
      colors,
      ticks: 300,
      gravity: 0.6,
      scalar: 0.9,
      drift: 0.1,
    });
  }, 400);
};

export const triggerGrandFireworks = () => {
  const count = 200;
  const defaults = {
    origin: { y: 0.7 },
    colors: ['#FFE6A3', '#D4AF37', '#E5BA5A', '#F9E2AF', '#FFFFFF'],
  };

  function fire(particleRatio: number, opts: confetti.Options) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio),
    });
  }

  fire(0.25, {
    spread: 26,
    startVelocity: 55,
  });
  fire(0.2, {
    spread: 60,
  });
  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 45,
  });
};
