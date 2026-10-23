import React, { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  size: number;
  baseAlpha: number;
  alpha: number;
  twinkleSpeed: number;
  twinklePhase: number;
}

interface GoldDust {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  alpha: number;
  hueShift: number;
  wobbleSpeed: number;
  wobblePhase: number;
}

interface CosmicCanvasProps {
  glowIntensity?: number; // 0 to 1
  accentGold?: boolean;
}

export const CosmicCanvas: React.FC<CosmicCanvasProps> = ({ glowIntensity = 0.5, accentGold = true }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initParticles();
    };

    window.addEventListener('resize', handleResize);

    // Track mouse for subtle parallax
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = (e.clientX / window.innerWidth - 0.5) * 40;
      mouseRef.current.targetY = (e.clientY / window.innerHeight - 0.5) * 40;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Stars & Dust arrays
    let stars: Star[] = [];
    let goldDust: GoldDust[] = [];

    const initParticles = () => {
      // Star density based on screen size
      const starCount = Math.floor((width * height) / 3800);
      stars = [];
      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 1.6 + 0.4,
          baseAlpha: Math.random() * 0.7 + 0.2,
          alpha: Math.random() * 0.8 + 0.2,
          twinkleSpeed: Math.random() * 0.025 + 0.008,
          twinklePhase: Math.random() * Math.PI * 2,
        });
      }

      // Golden particles
      const dustCount = Math.floor((width * height) / 12000);
      goldDust = [];
      for (let i = 0; i < dustCount; i++) {
        goldDust.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 2.5 + 0.8,
          speedY: -(Math.random() * 0.45 + 0.15),
          speedX: (Math.random() - 0.5) * 0.2,
          alpha: Math.random() * 0.7 + 0.2,
          hueShift: Math.random() * 15 - 7,
          wobbleSpeed: Math.random() * 0.02 + 0.01,
          wobblePhase: Math.random() * Math.PI * 2,
        });
      }
    };

    initParticles();

    let time = 0;
    const render = () => {
      time += 0.02;

      // Smooth mouse damping
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      // Deep celestial canvas background
      ctx.fillStyle = '#04050a';
      ctx.fillRect(0, 0, width, height);

      // Subtle midnight navy radial glow in upper-middle
      const bgGlow = ctx.createRadialGradient(
        width * 0.5 + mouseRef.current.x * 0.5,
        height * 0.45 + mouseRef.current.y * 0.5,
        10,
        width * 0.5,
        height * 0.5,
        width * 0.8
      );
      bgGlow.addColorStop(0, 'rgba(16, 24, 48, 0.6)');
      bgGlow.addColorStop(0.5, 'rgba(8, 12, 28, 0.4)');
      bgGlow.addColorStop(1, 'rgba(4, 5, 10, 0)');
      ctx.fillStyle = bgGlow;
      ctx.fillRect(0, 0, width, height);

      // Warm golden aura when accentGold is true
      if (accentGold) {
        const goldGlow = ctx.createRadialGradient(
          width * 0.5 + mouseRef.current.x * 0.8,
          height * 0.85 + mouseRef.current.y * 0.8,
          20,
          width * 0.5,
          height * 0.85,
          width * 0.6
        );
        const intensity = 0.08 * glowIntensity;
        goldGlow.addColorStop(0, `rgba(245, 197, 100, ${intensity * 1.5})`);
        goldGlow.addColorStop(0.4, `rgba(180, 130, 40, ${intensity})`);
        goldGlow.addColorStop(1, 'rgba(4, 5, 10, 0)');
        ctx.fillStyle = goldGlow;
        ctx.fillRect(0, 0, width, height);
      }

      // Draw Twinkling Stars
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        s.twinklePhase += s.twinkleSpeed;
        const currentAlpha = s.baseAlpha + Math.sin(s.twinklePhase) * 0.35;
        const boundedAlpha = Math.max(0.05, Math.min(1, currentAlpha));

        // Parallax offset
        const px = s.x + mouseRef.current.x * (s.size * 0.15);
        const py = s.y + mouseRef.current.y * (s.size * 0.15);

        ctx.beginPath();
        ctx.arc(px, py, s.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(235, 240, 255, ${boundedAlpha})`;
        ctx.fill();

        // Extra sparkle on bright larger stars
        if (s.size > 1.4 && boundedAlpha > 0.7) {
          ctx.beginPath();
          ctx.arc(px, py, s.size * 2.2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(245, 215, 140, ${(boundedAlpha - 0.7) * 0.5})`;
          ctx.fill();
        }
      }

      // Draw Floating Golden Stardust
      for (let i = 0; i < goldDust.length; i++) {
        const d = goldDust[i];
        d.y += d.speedY;
        d.wobblePhase += d.wobbleSpeed;
        const wobble = Math.sin(d.wobblePhase) * 0.6;
        d.x += d.speedX + wobble * 0.15;

        // Wrap around
        if (d.y < -10) {
          d.y = height + 10;
          d.x = Math.random() * width;
        }
        if (d.x < -10) d.x = width + 10;
        if (d.x > width + 10) d.x = -10;

        const px = d.x + mouseRef.current.x * 0.3;
        const py = d.y + mouseRef.current.y * 0.3;

        // Golden glowing particle
        ctx.beginPath();
        ctx.arc(px, py, d.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(245, 200, 95, ${d.alpha * glowIntensity})`;
        ctx.fill();

        // Outer soft glow halo
        ctx.beginPath();
        ctx.arc(px, py, d.size * 2.4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212, 175, 55, ${d.alpha * 0.25 * glowIntensity})`;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [glowIntensity, accentGold]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden="true"
    />
  );
};
