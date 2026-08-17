import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';
import { TypewriterText } from '../TypewriterText';

interface Page5HappyEndingProps {
  onOpenMemoryModal: () => void;
}

export const Page5HappyEnding: React.FC<Page5HappyEndingProps> = ({ onOpenMemoryModal }) => {
  const [mousePos, setMousePos] = useState({ x: '50%', y: '50%' });
  const [stage, setStage] = useState<number>(1);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = `${((e.clientX - rect.left) / rect.width) * 100}%`;
    const y = `${((e.clientY - rect.top) / rect.height) * 100}%`;
    setMousePos({ x, y });
  };

  return (
    <motion.div
      key="page-5"
      initial={{ opacity: 0, scale: 0.98, filter: 'blur(10px)', y: 20 }}
      animate={{ opacity: 1, scale: 1, filter: 'blur(0px)', y: 0 }}
      exit={{ opacity: 0, scale: 0.98, filter: 'blur(10px)', y: -15 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-2xl mx-auto text-center"
    >
      {/* 1. Ambient Warm Glow */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.8, delay: 0.1 }}
        className="absolute -inset-10 bg-gradient-to-tr from-[#FFE4E6]/50 via-[#FFDDE2]/40 to-[#FFF5E1]/50 rounded-[70px] blur-3xl pointer-events-none -z-10"
      />

      {/* 2. "Iram..." appears */}
      <motion.div
        initial={{ opacity: 0, y: 12, filter: 'blur(6px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 1.0, delay: 0.3, ease: 'easeOut' }}
        className="font-script-handwritten text-6xl sm:text-8xl text-[#3D3935] mb-2 flex items-center justify-center gap-3"
      >
        <span>Iram...</span>
        <motion.span
          animate={{ scale: [1, 1.25, 1], rotate: [0, 6, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          className="text-[#E8A2A2] text-4xl inline-block"
        >
          ♡
        </motion.span>
      </motion.div>

      {/* 3. "Toh phir..." with typewriter typing */}
      <div className="font-serif-elegant italic text-xl sm:text-2xl text-[#7A746E] mb-2 min-h-[36px]">
        {stage >= 1 && (
          <p>
            <TypewriterText
              text="Toh phir..."
              delay={800}
              speed={50}
              onComplete={() => {
                setTimeout(() => setStage((s) => Math.max(s, 2)), 350);
              }}
            />
          </p>
        )}
      </div>

      {/* 4. "Hamari kahani yahin se shuru hoti hai." with typewriter typing */}
      <div className="min-h-[70px] mb-8">
        {stage >= 2 && (
          <h1 className="font-serif-elegant text-3xl sm:text-5xl text-[#E8A2A2] font-normal leading-tight max-w-xl mx-auto drop-shadow-[0_2px_20px_rgba(232,162,162,0.4)]">
            <TypewriterText
              text="Hamari kahani yahin se shuru hoti hai."
              delay={150}
              speed={42}
              cursorColor="#E8A2A2"
              onComplete={() => {
                setTimeout(() => setStage((s) => Math.max(s, 3)), 500);
              }}
            />
          </h1>
        )}
      </div>

      {/* 5. Glass Note Card with Warm Finished Atmosphere */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 16 }}
        animate={{
          opacity: stage >= 3 ? 1 : 0,
          scale: stage >= 3 ? 1 : 0.96,
          y: stage >= 3 ? 0 : 16,
        }}
        transition={{ duration: 1.0, ease: 'easeOut' }}
        onMouseMove={handleMouseMove}
        style={
          {
            '--mouse-x': mousePos.x,
            '--mouse-y': mousePos.y,
          } as React.CSSProperties
        }
        className={`glass-panel glass-interactive p-8 sm:p-10 rounded-[40px] max-w-lg mx-auto shadow-2xl border border-white/80 text-center relative overflow-hidden ${
          stage >= 3 ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
      >
        <div className="text-[#7A746E] text-base sm:text-lg leading-relaxed mb-3 italic font-serif-elegant min-h-[28px]">
          {stage >= 3 && (
            <p>
              "
              <TypewriterText
                text="Thank you for saying yes. 🌸"
                delay={200}
                speed={40}
                onComplete={() => {
                  setTimeout(() => setStage((s) => Math.max(s, 4)), 300);
                }}
              />
              {stage >= 4 && '"'}
            </p>
          )}
        </div>

        <div className="text-[#A69F97] text-sm tracking-wide min-h-[24px]">
          {stage >= 4 && (
            <p>
              <TypewriterText
                text="Ab dekhte hain ye kahani humein kahan le jaati hai..."
                delay={150}
                speed={32}
                onComplete={() => {
                  setTimeout(() => setStage(5), 300);
                }}
              />
            </p>
          )}
        </div>

        {/* Action Button */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: stage >= 5 ? 1 : 0, y: stage >= 5 ? 0 : 10 }}
          transition={{ duration: 0.7 }}
          className="mt-8"
        >
          <button
            onClick={onOpenMemoryModal}
            className="btn-artistic-primary animate-heartbeat-soft px-8 py-3.5 rounded-full text-xs font-bold tracking-[0.2em] uppercase cursor-pointer inline-flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-white" />
            <span>Ek chhoti si aur cheez hai</span>
            <span>→</span>
          </button>
        </motion.div>
      </motion.div>

      {/* Playful & Sincere Footer Line */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: stage >= 5 ? 0.8 : 0 }}
        transition={{ duration: 1.2, delay: 0.2 }}
        className="mt-12 text-[#A69F97] text-[10px] sm:text-xs uppercase tracking-[0.35em]"
      >
        Made with a little courage, a lot of feelings, and way too much effort. ♡
      </motion.div>
    </motion.div>
  );
};

