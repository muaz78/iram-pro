import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Heart } from 'lucide-react';

interface HandwritingRevealProps {
  onComplete?: () => void;
  onNext: () => void;
}

interface PathDef {
  id: string;
  d: string;
  strokeWidth: number;
  color: string;
  duration: number; // in ms
}

const PATHS: PathDef[] = [
  // 1. Capital 'I' - Beautiful cursive flourish
  {
    id: 'path-i',
    d: 'M 45 45 C 55 25, 85 20, 105 30 C 120 40, 110 65, 82 85 C 60 102, 58 128, 72 142 C 82 152, 102 148, 118 138',
    strokeWidth: 4.6,
    color: '#3D3935',
    duration: 750,
  },
  // 2. Letter 'r'
  {
    id: 'path-r',
    d: 'M 125 136 C 135 118, 142 92, 156 82 C 168 74, 182 78, 180 94 C 178 112, 175 130, 190 134',
    strokeWidth: 4.0,
    color: '#3D3935',
    duration: 480,
  },
  // 3. Letter 'a'
  {
    id: 'path-a',
    d: 'M 190 134 C 205 110, 225 80, 242 84 C 255 88, 252 110, 235 125 C 218 138, 202 130, 206 108 C 210 88, 230 84, 246 84 C 248 102, 246 122, 258 132',
    strokeWidth: 4.0,
    color: '#3D3935',
    duration: 550,
  },
  // 4. Letter 'm'
  {
    id: 'path-m',
    d: 'M 258 132 C 265 112, 272 90, 284 86 C 298 82, 302 100, 302 130 C 310 106, 320 86, 334 86 C 348 86, 350 104, 348 132',
    strokeWidth: 4.0,
    color: '#3D3935',
    duration: 650,
  },
  // 5. Final Flourish Underline
  {
    id: 'path-flourish',
    d: 'M 348 132 C 370 144, 398 138, 410 120 C 418 106, 400 96, 386 108 C 328 155, 140 165, 45 140',
    strokeWidth: 2.6,
    color: '#E8A2A2',
    duration: 650,
  },
];

export const HandwritingReveal: React.FC<HandwritingRevealProps> = ({ onComplete, onNext }) => {
  const [penPos, setPenPos] = useState<{ x: number; y: number; visible: boolean }>({
    x: 45,
    y: 45,
    visible: false,
  });
  const [isDoneDrawing, setIsDoneDrawing] = useState<boolean>(false);
  const [showSubtitle, setShowSubtitle] = useState<boolean>(false);
  const [showButton, setShowButton] = useState<boolean>(false);

  const pathRefs = useRef<(SVGPathElement | null)[]>([]);

  useEffect(() => {
    let animFrame: number;
    let timeoutId: number;

    // Initialize all paths as hidden (strokeDasharray/strokeDashoffset)
    pathRefs.current.forEach((pathEl) => {
      if (pathEl) {
        const totalLen = pathEl.getTotalLength();
        pathEl.style.strokeDasharray = `${totalLen}`;
        pathEl.style.strokeDashoffset = `${totalLen}`;
      }
    });

    // Sequence Step 1: Glowing point appears at start
    timeoutId = window.setTimeout(() => {
      setPenPos({ x: 45, y: 45, visible: true });

      // Step 2-8: Continuous stroke drawing
      timeoutId = window.setTimeout(() => {
        let currentIdx = 0;
        let startTime = performance.now();

        const animateLoop = (now: number) => {
          if (currentIdx >= PATHS.length) {
            // Sequence Step 9 & 10: Pen stops, sparkle appears at end
            setIsDoneDrawing(true);
            setPenPos((prev) => ({ ...prev, visible: false }));

            // Wait ~0.5s then animate "Chalo, tumhe kuch batana hai..."
            timeoutId = window.setTimeout(() => {
              setShowSubtitle(true);
              // reveal button smoothly
              timeoutId = window.setTimeout(() => {
                setShowButton(true);
                if (onComplete) onComplete();
              }, 400);
            }, 500);

            return;
          }

          const pathDef = PATHS[currentIdx];
          const pathEl = pathRefs.current[currentIdx];
          const elapsed = now - startTime;
          const progress = Math.min(elapsed / pathDef.duration, 1);

          if (pathEl) {
            const totalLen = pathEl.getTotalLength();
            pathEl.style.strokeDasharray = `${totalLen}`;
            pathEl.style.strokeDashoffset = `${totalLen * (1 - progress)}`;

            // Point on path precisely calculated in real time
            const pt = pathEl.getPointAtLength(progress * totalLen);
            setPenPos({ x: pt.x, y: pt.y, visible: true });
          }

          if (progress < 1) {
            animFrame = requestAnimationFrame(animateLoop);
          } else {
            currentIdx++;
            startTime = performance.now();
            animFrame = requestAnimationFrame(animateLoop);
          }
        };

        animFrame = requestAnimationFrame(animateLoop);
      }, 300);
    }, 400);

    return () => {
      cancelAnimationFrame(animFrame);
      clearTimeout(timeoutId);
    };
  }, [onComplete]);

  return (
    <div className="w-full flex flex-col items-center justify-center text-center px-4 py-4 max-w-xl mx-auto">
      {/* Top Header Tag */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-xs uppercase tracking-[0.4em] text-[#A69F97] font-medium mb-6 select-none"
      >
        — KHAS TUMHARE LIYE —
      </motion.div>

      {/* Main Handwriting Stage Card */}
      <div className="relative w-full py-4 px-2 sm:px-6 flex flex-col items-center justify-center min-h-[200px]">
        {/* Soft breathing radial glow */}
        <motion.div
          animate={{
            scale: penPos.visible || isDoneDrawing ? [1, 1.15, 1] : 0.85,
            opacity: penPos.visible || isDoneDrawing ? [0.35, 0.65, 0.45] : 0,
          }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute inset-0 m-auto w-72 h-36 bg-gradient-to-r from-[#FFE4E6]/60 via-[#FFDDE2]/50 to-[#FFF5E1]/60 rounded-full blur-2xl pointer-events-none -z-10"
        />

        {/* SVG Calligraphy Canvas with Physical Stroke Dash Drawing */}
        <div className="relative w-full max-w-[420px] h-[150px] flex items-center justify-center">
          <svg
            viewBox="0 0 440 170"
            className="w-full h-full overflow-visible drop-shadow-[0_4px_16px_rgba(232,162,162,0.35)]"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {PATHS.map((p, idx) => (
              <path
                key={p.id}
                ref={(el) => (pathRefs.current[idx] = el)}
                d={p.d}
                stroke={p.color}
                strokeWidth={p.strokeWidth}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            ))}

            {/* Glowing Real-Time Pen Cursor Tip tracking path */}
            {penPos.visible && (
              <g transform={`translate(${penPos.x}, ${penPos.y})`}>
                <circle r="12" fill="#E8A2A2" fillOpacity="0.3" className="animate-ping" />
                <circle r="4.5" fill="#E8A2A2" />
                <circle r="2" fill="#FFFFFF" />
              </g>
            )}

            {/* Step 10: Sparkle appears at the end */}
            {isDoneDrawing && (
              <g transform="translate(45, 140)">
                <motion.circle
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: [0, 1.4, 1], opacity: [0, 1, 0.9] }}
                  transition={{ duration: 0.6 }}
                  r="3.5"
                  fill="#E8A2A2"
                />
              </g>
            )}
          </svg>
        </div>

        {/* Finished Name Accent */}
        {isDoneDrawing && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="mt-2 flex items-center justify-center gap-2 text-[#E8A2A2]"
          >
            <Sparkles className="w-4 h-4 text-[#E8A2A2] animate-pulse" />
            <span className="font-script-handwritten text-4xl sm:text-5xl text-[#3D3935] tracking-wide">
              Iram
            </span>
            <Heart className="w-4 h-4 fill-[#E8A2A2] text-[#E8A2A2]" />
          </motion.div>
        )}
      </div>

      {/* Subtitle & Action Button: Wait ~0.5s after handwriting -> Soft Upward Fade */}
      <div className="min-h-[110px] flex flex-col items-center justify-center mt-2">
        {showSubtitle && (
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: 'easeOut' }}
            className="flex flex-col items-center"
          >
            <p className="font-serif-elegant text-lg sm:text-xl text-[#7A746E] italic font-normal tracking-wide mb-6 max-w-md">
              "Chalo, tumhe kuch batana hai..."
            </p>

            {showButton && (
              <motion.button
                initial={{ opacity: 0, y: 12, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.65, ease: 'easeOut' }}
                onClick={onNext}
                className="btn-artistic-primary px-10 py-4 rounded-full text-sm font-bold tracking-[0.2em] uppercase cursor-pointer flex items-center gap-2"
              >
                <span>Chalo, shuru karte hain ♡</span>
                <span>→</span>
              </motion.button>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};
