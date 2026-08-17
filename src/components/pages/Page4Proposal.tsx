import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PlayfulButton } from '../PlayfulButton';
import { Heart, Sparkles } from 'lucide-react';
import { TypewriterText } from '../TypewriterText';
import { romanticAudio } from '../../utils/audio';

interface Page4ProposalProps {
  onAccept: () => void;
}

interface DriftingHeart {
  id: number;
  emoji: string;
  left: number; // percentage
  bottom: number; // percentage
  size: number; // px
  duration: number; // seconds
  driftX: number; // px
  rotate: number; // deg
  delay: number; // seconds
}

const HEART_EMOJIS = ['💖', '💕', '💗', '💓', '🌸', '✨', '💘', '🥰', '♡', '💌'];

export const Page4Proposal: React.FC<Page4ProposalProps> = ({ onAccept }) => {
  const [isAccepting, setIsAccepting] = useState<boolean>(false);
  const [mousePos, setMousePos] = useState({ x: '50%', y: '50%' });
  const [proposalStep, setProposalStep] = useState<number>(1);
  const [driftingHearts, setDriftingHearts] = useState<DriftingHeart[]>([]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = `${((e.clientX - rect.left) / rect.width) * 100}%`;
    const y = `${((e.clientY - rect.top) / rect.height) * 100}%`;
    setMousePos({ x, y });
  };

  const spawnDriftingHearts = () => {
    const count = 35;
    const newHearts: DriftingHeart[] = [];

    for (let i = 0; i < count; i++) {
      const emoji = HEART_EMOJIS[Math.floor(Math.random() * HEART_EMOJIS.length)];
      const left = 5 + Math.random() * 90;
      const bottom = Math.random() * 25; // start from bottom half/near button
      const size = 18 + Math.floor(Math.random() * 26); // 18px to 44px
      const duration = 2.2 + Math.random() * 1.8; // 2.2s to 4s
      const driftX = (Math.random() - 0.5) * 140; // drift left or right
      const rotate = (Math.random() - 0.5) * 45; // rotate
      const delay = Math.random() * 0.45; // slight stagger

      newHearts.push({
        id: Date.now() + i + Math.random(),
        emoji,
        left,
        bottom,
        size,
        duration,
        driftX,
        rotate,
        delay,
      });
    }

    setDriftingHearts((prev) => [...prev, ...newHearts]);
  };

  const handleYesClick = () => {
    if (isAccepting) return;
    setIsAccepting(true);
    romanticAudio.playChime();
    spawnDriftingHearts();

    // Give time to enjoy celebratory drifting hearts and typewriter message
    setTimeout(() => {
      onAccept();
    }, 2200);
  };

  return (
    <motion.div
      key="page-4"
      initial={{ opacity: 0, scale: 0.98, filter: 'blur(10px)', y: 20 }}
      animate={{ opacity: 1, scale: 1, filter: 'blur(0px)', y: 0 }}
      exit={{ opacity: 0, scale: 0.98, filter: 'blur(10px)', y: -15 }}
      transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-2xl mx-auto relative"
    >
      {/* Drifting Heart Emojis Overlay */}
      <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
        <AnimatePresence>
          {driftingHearts.map((heart) => (
            <motion.div
              key={heart.id}
              initial={{
                opacity: 0,
                scale: 0.3,
                x: 0,
                y: 0,
                rotate: 0,
              }}
              animate={{
                opacity: [0, 1, 1, 0.85, 0],
                scale: [0.3, 1.15, 1, 0.95, 0.7],
                x: [0, heart.driftX * 0.4, heart.driftX],
                y: [0, -300, -700],
                rotate: [0, heart.rotate * 0.5, heart.rotate],
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: heart.duration,
                delay: heart.delay,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              style={{
                position: 'absolute',
                left: `${heart.left}%`,
                bottom: `${heart.bottom}%`,
                fontSize: `${heart.size}px`,
                filter: 'drop-shadow(0 4px 12px rgba(232, 162, 162, 0.6))',
              }}
            >
              {heart.emoji}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div
        onMouseMove={handleMouseMove}
        style={
          {
            '--mouse-x': mousePos.x,
            '--mouse-y': mousePos.y,
          } as React.CSSProperties
        }
        className="glass-panel glass-interactive rounded-[50px] sm:rounded-[60px] p-8 sm:p-14 relative overflow-hidden text-center shadow-2xl border border-white/80"
      >
        {/* Celebration Flash & Typewriter Overlay upon clicking YES */}
        <AnimatePresence>
          {isAccepting && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0 bg-gradient-to-tr from-[#FFE4E6]/95 via-white/95 to-[#FFDDE2]/95 backdrop-blur-md z-30 pointer-events-none flex flex-col items-center justify-center p-6 text-center"
            >
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: [0.5, 1.25, 1], opacity: [0, 1, 1] }}
                transition={{ duration: 0.6 }}
                className="text-[#E8A2A2] mb-4"
              >
                <Heart className="w-20 h-20 fill-[#E8A2A2] animate-heartbeat-soft drop-shadow-[0_4px_20px_rgba(232,162,162,0.5)]" />
              </motion.div>

              <div className="font-serif-elegant text-2xl sm:text-4xl text-[#3D3935] font-normal mb-2 max-w-md">
                <TypewriterText
                  text="Haan! ♡ Dil khush ho gaya... 🌸✨"
                  delay={100}
                  speed={38}
                  cursorColor="#E8A2A2"
                />
              </div>

              <div className="text-sm sm:text-base text-[#7A746E] italic font-serif-elegant mt-2">
                <TypewriterText
                  text="Hamari kahani ka naya safar shuru ho raha hai..."
                  delay={1000}
                  speed={28}
                  cursorColor="#E8A2A2"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Top Header Tag */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-xs uppercase tracking-[0.4em] text-[#A69F97] font-medium mb-6 select-none"
        >
          — AUR AB... EK SAWAAL —
        </motion.div>

        {/* Narrative Flow */}
        <div className="my-3 text-[#3D3935] max-w-lg mx-auto">
          {/* Step 1: "Iram..." typed with handwritten script font */}
          <div className="font-script-handwritten text-6xl sm:text-8xl text-[#3D3935] mb-4 min-h-[90px] flex items-center justify-center">
            <TypewriterText
              text="Iram..."
              delay={300}
              speed={95}
              cursorColor="#E8A2A2"
              onComplete={() => {
                setTimeout(() => setProposalStep((s) => Math.max(s, 1)), 400);
              }}
            />
          </div>

          {/* Step 2: Line 1 */}
          <div className="font-serif-elegant text-base sm:text-lg text-[#7A746E] italic mb-2 min-h-[28px]">
            {proposalStep >= 1 && (
              <p>
                <TypewriterText
                  text="Mujhe nahi pata tumhara jawab kya hoga..."
                  delay={100}
                  speed={35}
                  cursorColor="#E8A2A2"
                  onComplete={() => {
                    setTimeout(() => setProposalStep((s) => Math.max(s, 2)), 400);
                  }}
                />
              </p>
            )}
          </div>

          {/* Step 3: Line 2 */}
          <div className="font-serif-elegant text-base sm:text-lg text-[#7A746E] italic mb-8 min-h-[28px]">
            {proposalStep >= 2 && (
              <motion.p
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <TypewriterText
                  text="Lekin main ye baat dil mein rakhna nahi chahta."
                  delay={150}
                  speed={35}
                  onComplete={() => {
                    setTimeout(() => setProposalStep((s) => Math.max(s, 3)), 500);
                  }}
                />
              </motion.p>
            )}
          </div>

          {/* Step 4: Confession */}
          <div className="space-y-2 mb-8 min-h-[74px]">
            {proposalStep >= 3 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl sm:text-4xl font-light tracking-tight text-[#3D3935]">
                  <TypewriterText
                    text="Mujhe tum pasand ho."
                    delay={100}
                    speed={45}
                    onComplete={() => {
                      setTimeout(() => setProposalStep((s) => Math.max(s, 4)), 300);
                    }}
                  />
                </h2>
                {proposalStep >= 4 && (
                  <motion.p
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-[#E8A2A2] text-2xl sm:text-3xl font-light mt-1"
                  >
                    <TypewriterText
                      text="Sach mein. ♡"
                      delay={100}
                      speed={55}
                      cursorColor="#E8A2A2"
                      onComplete={() => {
                        setTimeout(() => setProposalStep((s) => Math.max(s, 5)), 600);
                      }}
                    />
                  </motion.p>
                )}
              </motion.div>
            )}
          </div>

          {/* Step 5: Proposal Question Climax (Ethereal bloom filter & typewriter animation) */}
          <div className="mb-10 min-h-[64px] relative flex items-center justify-center">
            {proposalStep >= 5 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.92, filter: 'blur(10px) brightness(1.2)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px) brightness(1)' }}
                transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
                className="relative"
              >
                {/* Ethereal background bloom glow */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: [0, 0.6, 0.35], scale: [0.7, 1.2, 1] }}
                  transition={{ duration: 2, ease: 'easeOut' }}
                  className="absolute -inset-4 bg-gradient-to-r from-[#FFE4E6]/50 via-[#FFDDE2]/60 to-[#FFF5E1]/50 rounded-full blur-2xl pointer-events-none -z-10"
                />
                <h3
                  id="climax-heading"
                  className="climax-heading font-serif-elegant text-3xl sm:text-5xl text-[#3D3935] drop-shadow-[0_4px_24px_rgba(232,162,162,0.45)] inline-block"
                >
                  <TypewriterText
                    text="Iram, will you be mine? ♡"
                    delay={250}
                    speed={50}
                    cursorColor="#E8A2A2"
                    onComplete={() => {
                      setTimeout(() => setProposalStep(6), 400);
                    }}
                  />
                </h3>
              </motion.div>
            )}
          </div>
        </div>

        {/* Step 6: Reveal the two buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.96 }}
          animate={{
            opacity: proposalStep >= 6 ? 1 : 0,
            y: proposalStep >= 6 ? 0 : 16,
            scale: proposalStep >= 6 ? 1 : 0.96,
          }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className={`flex flex-col sm:flex-row items-center justify-center gap-6 min-h-[90px] relative ${
            proposalStep >= 6 ? 'pointer-events-auto' : 'pointer-events-none'
          }`}
        >
          {/* Primary YES Button with glow */}
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(232, 162, 162, 0.5)' }}
            whileTap={{ scale: 0.97 }}
            onClick={handleYesClick}
            className="btn-artistic-primary px-12 sm:px-14 py-4 sm:py-5 rounded-full text-base font-bold tracking-widest uppercase cursor-pointer transition-shadow"
          >
            HAAN ♡
          </motion.button>

          {/* Secondary Playful Escaping Button */}
          <PlayfulButton />
        </motion.div>
      </div>
    </motion.div>
  );
};

