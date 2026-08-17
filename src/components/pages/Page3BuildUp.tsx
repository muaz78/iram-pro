import React, { useState } from 'react';
import { motion } from 'motion/react';
import { TypewriterText } from '../TypewriterText';

interface Page3BuildUpProps {
  onNext: () => void;
}

export const Page3BuildUp: React.FC<Page3BuildUpProps> = ({ onNext }) => {
  const [mousePos, setMousePos] = useState({ x: '50%', y: '50%' });
  const [step, setStep] = useState<number>(1);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = `${((e.clientX - rect.left) / rect.width) * 100}%`;
    const y = `${((e.clientY - rect.top) / rect.height) * 100}%`;
    setMousePos({ x, y });
  };

  return (
    <motion.div
      key="page-3"
      initial={{ opacity: 0, scale: 0.96, filter: 'blur(8px)' }}
      animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
      exit={{ opacity: 0, scale: 0.98, filter: 'blur(10px)' }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
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
        className="glass-panel glass-interactive rounded-[44px] sm:rounded-[50px] p-8 sm:p-14 relative overflow-hidden text-center shadow-2xl border border-white/80"
      >
        {/* Top Header Tag */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-xs uppercase tracking-[0.4em] text-[#A69F97] font-medium mb-10 select-none"
        >
          — IRAM, EK BAAT KEHNI THI —
        </motion.div>

        {/* Narrative Flow - Live Sequential Typing */}
        <div className="space-y-7 my-6 text-[#3D3935] max-w-lg mx-auto font-serif-elegant italic text-lg sm:text-xl text-left sm:text-center">
          {/* Line 1 */}
          <div className="leading-relaxed min-h-[32px]">
            {step >= 1 && (
              <p>
                "
                <TypewriterText
                  text="Pata nahi tumhe kabhi ehsaas hua ya nahi..."
                  delay={300}
                  speed={38}
                  onComplete={() => {
                    setTimeout(() => setStep((s) => Math.max(s, 2)), 450);
                  }}
                />
                {step > 1 && '"'}
              </p>
            )}
          </div>

          {/* Line 2 */}
          <div className="leading-relaxed min-h-[32px]">
            {step >= 2 && (
              <motion.p
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                "
                <TypewriterText
                  text="Lekin tumhari presence ne meri life mein ek alag si jagah bana li hai."
                  delay={200}
                  speed={34}
                  onComplete={() => {
                    setTimeout(() => setStep((s) => Math.max(s, 3)), 500);
                  }}
                />
                {step > 2 && '"'}
              </motion.p>
            )}
          </div>

          {/* Line 3 */}
          <div className="leading-relaxed min-h-[32px]">
            {step >= 3 && (
              <motion.p
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                "
                <TypewriterText
                  text="Tumse baat karna, tumhari chhoti-chhoti baatein notice karna..."
                  delay={200}
                  speed={34}
                  onComplete={() => {
                    setTimeout(() => setStep((s) => Math.max(s, 4)), 500);
                  }}
                />
                {step > 3 && '"'}
              </motion.p>
            )}
          </div>

          {/* Line 4 */}
          <div className="leading-relaxed min-h-[32px]">
            {step >= 4 && (
              <motion.p
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                "
                <TypewriterText
                  text="Pata hi nahi chala kab ye sab mere liye itna special ho gaya."
                  delay={200}
                  speed={34}
                  onComplete={() => {
                    setTimeout(() => setStep((s) => Math.max(s, 5)), 750);
                  }}
                />
                {step > 4 && '"'}
              </motion.p>
            )}
          </div>

          {/* Line 5 (Emotional Highlight with glowing typing effect) */}
          <div className="pt-6 pb-2 min-h-[50px] text-center">
            {step >= 5 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
              >
                <h3 className="text-2xl sm:text-3xl text-[#E8A2A2] not-italic font-normal tracking-wide drop-shadow-[0_2px_16px_rgba(232,162,162,0.45)]">
                  <TypewriterText
                    text="Shayad isi ko kisi ko pasand karna kehte hain. ♡"
                    delay={300}
                    speed={45}
                    cursorColor="#E8A2A2"
                    onComplete={() => {
                      setTimeout(() => setStep(6), 400);
                    }}
                  />
                </h3>
              </motion.div>
            )}
          </div>
        </div>

        {/* Action Button */}
        <motion.div
          initial={{ opacity: 0, y: 14, scale: 0.96 }}
          animate={{
            opacity: step >= 6 ? 1 : 0,
            y: step >= 6 ? 0 : 14,
            scale: step >= 6 ? 1 : 0.96,
          }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className={`mt-10 ${step >= 6 ? 'pointer-events-auto' : 'pointer-events-none'}`}
        >
          <button
            onClick={onNext}
            className="btn-artistic-primary animate-heartbeat-soft px-10 py-4 rounded-full text-sm font-bold tracking-[0.2em] uppercase cursor-pointer inline-flex items-center gap-2"
          >
            <span>Ek aur baat hai</span>
            <span>→</span>
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
};
