import React, { useState } from 'react';
import { motion } from 'motion/react';
import { romanticAudio } from '../../utils/audio';
import { TypewriterText } from '../TypewriterText';

interface Page1LandingProps {
  onNext: () => void;
}

export const Page1Landing: React.FC<Page1LandingProps> = ({ onNext }) => {
  const [mousePos, setMousePos] = useState({ x: '50%', y: '50%' });
  const [showButton, setShowButton] = useState({ shown: false });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = `${((e.clientX - rect.left) / rect.width) * 100}%`;
    const y = `${((e.clientY - rect.top) / rect.height) * 100}%`;
    setMousePos({ x, y });
  };

  const handleOpen = () => {
    if (!romanticAudio.getIsPlaying()) {
      romanticAudio.play();
    }
    onNext();
  };

  return (
    <motion.div
      key="page-1"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.97, filter: 'blur(10px)', y: -15 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-lg mx-auto"
    >
      {/* 0.3s Ambient Glow Backdrop */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.6, delay: 0.3, ease: 'easeOut' }}
        className="absolute -inset-6 bg-gradient-to-tr from-[#FFE4E6]/40 via-[#FFDDE2]/30 to-[#FFF5E1]/40 rounded-[60px] blur-3xl pointer-events-none -z-10"
      />

      {/* 0.7s Glass Card Rise & Smooth Fade */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.1, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
        onMouseMove={handleMouseMove}
        style={
          {
            '--mouse-x': mousePos.x,
            '--mouse-y': mousePos.y,
          } as React.CSSProperties
        }
        className="glass-panel glass-interactive p-8 sm:p-12 rounded-[44px] sm:rounded-[50px] shadow-2xl text-center relative overflow-hidden border border-white/80"
      >
        {/* 1.2s Heart icon with subtle scale animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: [1, 1.15, 1] }}
          transition={{
            opacity: { duration: 0.6, delay: 1.2 },
            scale: { duration: 2.4, delay: 1.2, repeat: Infinity, ease: 'easeInOut' },
          }}
          className="mb-6 text-[#E8A2A2] text-3xl select-none"
        >
          ♡
        </motion.div>

        {/* 1.5s "Hey, Iram ♡" with typing / handwriting feel */}
        <div className="font-serif-elegant text-4xl sm:text-5xl text-[#3D3935] font-normal mb-4 tracking-tight min-h-[58px] flex items-center justify-center">
          <TypewriterText
            text="Hey, Iram ♡"
            delay={1400}
            speed={65}
            cursorColor="#E8A2A2"
          />
        </div>

        {/* 2.4s "Tumhare liye kuch banaya hai..." */}
        <p className="text-[#7A746E] mb-2 leading-relaxed tracking-wide text-base sm:text-lg min-h-[28px]">
          <TypewriterText
            text="Tumhare liye kuch banaya hai..."
            delay={2400}
            speed={38}
            cursorColor="#E8A2A2"
          />
        </p>

        {/* 3.8s Smaller description */}
        <p className="text-[#7A746E] mb-8 leading-relaxed tracking-wide italic text-sm sm:text-base font-serif-elegant min-h-[48px]">
          <TypewriterText
            text="Bas 2 minute chahiye... phir jo tumhara dil kahe, woh keh dena."
            delay={3800}
            speed={32}
            cursorColor="#E8A2A2"
            onComplete={() => setShowButton({ shown: true })}
          />
        </p>

        {/* Action button appears once typing finishes */}
        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.95 }}
          animate={{
            opacity: showButton.shown ? 1 : 0,
            y: showButton.shown ? 0 : 16,
            scale: showButton.shown ? 1 : 0.95,
          }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className={showButton.shown ? 'pointer-events-auto' : 'pointer-events-none'}
        >
          <button
            onClick={handleOpen}
            className="btn-artistic-primary animate-heartbeat-soft px-10 py-4 rounded-full text-sm font-bold tracking-[0.2em] uppercase cursor-pointer inline-flex items-center gap-2"
          >
            <span>Open it ♡</span>
            <span>→</span>
          </button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};


