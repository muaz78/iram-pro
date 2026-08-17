import React, { useEffect, useRef } from 'react';

interface PetalsCanvasProps {
  burst?: boolean;
  heartRain?: boolean;
}

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  rotation: number;
  rotationSpeed: number;
  tilt: number;
  tiltSpeed: number;
  opacity: number;
  targetOpacity: number;
  color: string;
  type: 'petal' | 'bokeh' | 'heart' | 'sparkle';
  phase: number;
  swayFreq: number;
  swayAmp: number;
  isWhite?: boolean;
}

const DEFAULT_PALETTE = [
  'rgba(255, 221, 226, 0.85)', // Artistic soft petal #FFDDE2
  'rgba(255, 228, 230, 0.85)', // Pale blush rose #FFE4E6
  'rgba(249, 168, 168, 0.70)', // Warm rose #F9A8A8
  'rgba(232, 162, 162, 0.65)', // Terracotta rose #E8A2A2
  'rgba(255, 245, 225, 0.75)', // Ivory shimmer #FFF5E1
];

// Rich palette for dense Heart Rain celebration (Pinks & Whites)
const HEART_RAIN_PALETTE = [
  'rgba(255, 255, 255, 0.95)', // Crisp Pure White Heart
  'rgba(255, 240, 245, 0.90)', // Lavender Blush White
  'rgba(255, 221, 226, 0.92)', // Soft Ballet Pink
  'rgba(255, 192, 203, 0.88)', // Classic Romance Pink
  'rgba(244, 114, 182, 0.88)', // Vibrant Rose Pink
  'rgba(232, 162, 162, 0.90)', // Terracotta Blush
  'rgba(251, 113, 133, 0.85)', // Rosebud Crimson
  'rgba(255, 245, 230, 0.90)', // Warm Pearl Ivory
];

export const PetalsCanvas: React.FC<PetalsCanvasProps> = ({ burst = false, heartRain = false }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

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
    };

    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouseRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);

    // Dynamic particle counts:
    // heartRain: ~110 raining hearts, petals & sparkles
    // burst: ~75 particles
    // standard: ~24 peaceful floating particles
    const count = heartRain ? 120 : burst ? 75 : 24;
    const particles: Particle[] = [];

    const createParticle = (initialRandomY = true, forceType?: Particle['type']): Particle => {
      let type: Particle['type'];
      if (forceType) {
        type = forceType;
      } else if (heartRain) {
        const r = Math.random();
        if (r < 0.76) type = 'heart';        // 76% dense falling hearts
        else if (r < 0.90) type = 'petal';   // 14% fluttering petals
        else type = 'sparkle';               // 10% glittering sparkles
      } else if (burst) {
        type = Math.random() > 0.4 ? 'petal' : Math.random() > 0.4 ? 'heart' : 'sparkle';
      } else {
        const r = Math.random();
        if (r < 0.25) type = 'petal';        // 4-5 petals
        else if (r < 0.65) type = 'bokeh';   // 7-9 soft particles
        else if (r < 0.82) type = 'heart';   // 2-3 tiny hearts
        else type = 'sparkle';               // 4-5 sparkles
      }

      const isPetal = type === 'petal';
      const isHeart = type === 'heart';
      const isBokeh = type === 'bokeh';

      const palette = heartRain ? HEART_RAIN_PALETTE : DEFAULT_PALETTE;
      const color = palette[Math.floor(Math.random() * palette.length)];
      const isWhite = color.includes('255, 255, 255') || color.includes('255, 240, 245') || color.includes('255, 245, 230');

      let speedY: number;
      if (heartRain) {
        // Dramatic downward rain velocity
        if (isHeart) {
          speedY = 1.6 + Math.random() * 2.4; // steady rainfall shower
        } else if (isPetal) {
          speedY = 1.2 + Math.random() * 1.8;
        } else {
          speedY = 0.8 + Math.random() * 1.5;
        }
      } else if (isHeart) {
        speedY = -(0.25 + Math.random() * 0.45); // Gentle upward float in standard mode
      } else if (isPetal) {
        speedY = 0.45 + Math.random() * 0.75;
      } else if (isBokeh) {
        speedY = 0.15 + Math.random() * 0.35;
      } else {
        speedY = 0.1 + Math.random() * 0.25;
      }

      return {
        x: Math.random() * width,
        y: initialRandomY
          ? Math.random() * height
          : heartRain
          ? -20 - Math.random() * 60
          : isHeart
          ? height + 20 + Math.random() * 40
          : -20 - Math.random() * 40,
        size: isPetal
          ? (heartRain ? 9 + Math.random() * 13 : 8 + Math.random() * 12)
          : isHeart
          ? (heartRain ? 8 + Math.random() * 16 : 6 + Math.random() * 8)
          : isBokeh
          ? 4 + Math.random() * 10
          : 2 + Math.random() * 4,
        speedY,
        speedX: (Math.random() - 0.5) * (heartRain ? 0.8 : 0.45),
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * (heartRain ? 0.035 : 0.015),
        tilt: Math.random() * Math.PI * 2,
        tiltSpeed: 0.01 + Math.random() * (heartRain ? 0.03 : 0.018),
        opacity: isBokeh
          ? 0.25 + Math.random() * 0.35
          : heartRain
          ? 0.65 + Math.random() * 0.35
          : 0.4 + Math.random() * 0.45,
        targetOpacity: 0.3 + Math.random() * 0.5,
        color,
        type,
        phase: Math.random() * Math.PI * 2,
        swayFreq: 0.01 + Math.random() * (heartRain ? 0.025 : 0.01),
        swayAmp: heartRain ? 1.2 + Math.random() * 1.6 : 0.8,
        isWhite,
      };
    };

    // Initialize with balanced types
    for (let i = 0; i < count; i++) {
      particles.push(createParticle(true));
    }

    // Main lightweight animation loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p, index) => {
        p.phase += p.swayFreq;
        p.tilt += p.tiltSpeed;
        p.rotation += p.rotationSpeed;
        p.y += p.speedY;
        p.x += p.speedX + Math.sin(p.phase) * p.swayAmp;

        // Soft mouse nudge interaction
        const dx = p.x - mouseRef.current.x;
        const dy = p.y - mouseRef.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 110 && dist > 0) {
          const force = (110 - dist) / 110;
          p.x += (dx / dist) * force * 2.5;
          p.y += (dy / dist) * force * 2.5;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);

        if (p.type === 'petal') {
          // Drifting flower petal with natural 3D tilt
          const scaleX = Math.cos(p.tilt);
          ctx.scale(scaleX, 1);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.opacity;

          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.bezierCurveTo(-p.size * 0.7, -p.size * 1.1, -p.size * 0.7, -p.size * 1.9, 0, -p.size * 2.1);
          ctx.bezierCurveTo(p.size * 0.7, -p.size * 1.9, p.size * 0.7, -p.size * 1.1, 0, 0);
          ctx.fill();

          // Subtle center vein
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.45)';
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(0, -p.size * 1.7);
          ctx.stroke();
        } else if (p.type === 'heart') {
          // Delicate pink or white heart with 3D flutter
          const scaleX = Math.cos(p.tilt);
          ctx.scale(scaleX, 1);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.opacity;

          if (heartRain) {
            // Heart rain glow
            ctx.shadowColor = p.isWhite ? 'rgba(255, 255, 255, 0.6)' : 'rgba(232, 162, 162, 0.5)';
            ctx.shadowBlur = p.isWhite ? 6 : 4;
          }

          const s = p.size * 0.55;
          ctx.beginPath();
          ctx.moveTo(0, s * 0.3);
          ctx.bezierCurveTo(-s, -s * 0.55, -s * 1.25, s * 0.45, 0, s * 1.3);
          ctx.bezierCurveTo(s * 1.25, s * 0.45, s, -s * 0.55, 0, s * 0.3);
          ctx.fill();

          // Inner highlight for 3D depth on larger hearts
          if (p.size > 14) {
            ctx.fillStyle = 'rgba(255, 255, 255, 0.35)';
            ctx.beginPath();
            ctx.arc(-s * 0.35, -s * 0.1, s * 0.2, 0, Math.PI * 2);
            ctx.fill();
          }
        } else if (p.type === 'bokeh') {
          // Soft glowing ambient dust mote
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.opacity * 0.5;
          ctx.beginPath();
          ctx.arc(0, 0, p.size, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Delicate sparkle star/dot with twinkle
          ctx.fillStyle = p.isWhite ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 250, 240, 0.9)';
          const shimmer = (Math.sin(p.phase * 3.5) + 1) * 0.5;
          ctx.globalAlpha = shimmer * p.opacity;

          if (heartRain) {
            ctx.shadowColor = 'rgba(255, 245, 225, 0.8)';
            ctx.shadowBlur = 6;
          }

          ctx.beginPath();
          ctx.arc(0, 0, p.size, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();

        // Boundary recycling
        if (p.speedY > 0 && p.y > height + 35) {
          particles[index] = createParticle(false, p.type);
        } else if (p.speedY < 0 && p.y < -35) {
          particles[index] = createParticle(false, p.type);
        } else if (p.x < -50 || p.x > width + 50) {
          particles[index] = createParticle(false, p.type);
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [burst, heartRain]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 h-full w-full opacity-90"
      aria-hidden="true"
    />
  );
};

