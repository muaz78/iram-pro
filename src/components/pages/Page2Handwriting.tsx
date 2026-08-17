import React, { useState } from 'react';
import { motion } from 'motion/react';
import { HandwritingReveal } from '../HandwritingReveal';

interface Page2HandwritingProps {
  onNext: () => void;
}

export const Page2Handwriting: React.FC<Page2HandwritingProps> = ({ onNext }) => {
  const [mousePos, setMousePos] = useState({ x: '50%', y: '50%' });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = `${((e.clientX - rect.left) / rect.width) * 100}%`;
    const y = `${((e.clientY - rect.top) / rect.height) * 100}%`;
    setMousePos({ x, y });
  };

  return (
    <motion.div
      key="page-2"
      initial={{ opacity: 0, scale: 0.98, filter: 'blur(10px)', y: 20 }}
      animate={{ opacity: 1, scale: 1, filter: 'blur(0px)', y: 0 }}
      exit={{ opacity: 0, scale: 0.98, filter: 'blur(10px)', y: -15 }}
      transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-xl mx-auto"
    >
      <div
        onMouseMove={handleMouseMove}
        style={
          {
            '--mouse-x': mousePos.x,
            '--mouse-y': mousePos.y,
          } as React.CSSProperties
        }
        className="glass-panel glass-interactive rounded-[44px] sm:rounded-[50px] p-6 sm:p-12 relative overflow-hidden shadow-2xl border border-white/80"
      >
        <HandwritingReveal onNext={onNext} />
      </div>
    </motion.div>
  );
};

