import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';

interface PlayfulButtonProps {
  onFinallySurrender?: () => void;
}

const MESSAGES = [
  'Sochne do 🙈',
  'Chochlo... ek baar please 🥺',
  'Arre rukooo 😭',
  'Iram please 😂',
  'Itna bhaag kyun rahi ho? 😭',
  'Pakad ke dikhao 😜',
  'Okay okay 😭\nMain samajh gaya... tumhe manana padega.',
];

export const PlayfulButton: React.FC<PlayfulButtonProps> = ({ onFinallySurrender }) => {
  const [attemptIndex, setAttemptIndex] = useState<number>(0);
  const [position, setPosition] = useState<{ x: number; y: number; rotate: number }>({
    x: 0,
    y: 0,
    rotate: 0,
  });
  const [hasSurrendered, setHasSurrendered] = useState<boolean>(false);
  const [isShaking, setIsShaking] = useState<boolean>(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const maxAttempts = 6;

  const dodge = (isMobileTap = false) => {
    if (hasSurrendered) return;

    if (isMobileTap) {
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 200);
    }

    const nextAttempt = attemptIndex + 1;
    setAttemptIndex(nextAttempt);

    if (nextAttempt >= maxAttempts) {
      setHasSurrendered(true);
      setPosition({ x: 0, y: 0, rotate: 0 });
      if (onFinallySurrender) onFinallySurrender();
      return;
    }

    // Safe bounded random offset so button remains on screen but slips away
    const isSmallScreen = typeof window !== 'undefined' && window.innerWidth < 640;
    const rangeX = isSmallScreen ? 90 : 160;
    const rangeY = 70;

    const signX = Math.random() > 0.5 ? 1 : -1;
    const signY = Math.random() > 0.5 ? 1 : -1;
    const rot = (Math.random() > 0.5 ? 1 : -1) * (3 + Math.random() * 4); // 3deg to 7deg

    const newX = signX * (45 + Math.random() * rangeX);
    const newY = signY * (25 + Math.random() * rangeY);

    setPosition({ x: newX, y: newY, rotate: rot });
  };

  const handleMouseEnter = () => {
    dodge(false);
  };

  const handleTouchStart = () => {
    dodge(true);
  };

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!hasSurrendered) {
      dodge(true);
    }
  };

  const currentMessage = hasSurrendered
    ? MESSAGES[6]
    : MESSAGES[Math.min(attemptIndex, MESSAGES.length - 2)];

  return (
    <div className="relative inline-block">
      <motion.button
        ref={buttonRef}
        type="button"
        onMouseEnter={handleMouseEnter}
        onTouchStart={handleTouchStart}
        onClick={handleClick}
        animate={{
          x: position.x,
          y: position.y,
          rotate: position.rotate,
          scale: hasSurrendered ? 0.96 : 1,
        }}
        transition={{
          type: 'spring',
          stiffness: 350,
          damping: 22,
        }}
        whileTap={{ scale: 0.94 }}
        className={`px-8 sm:px-10 py-4 sm:py-5 rounded-full text-sm sm:text-base font-medium transition-colors duration-300 select-none cursor-pointer whitespace-pre-line text-center ${
          isShaking ? 'animate-playful-wiggle' : ''
        } ${
          hasSurrendered
            ? 'glass-panel text-[#E8A2A2] border border-[#E8A2A2]/50 shadow-sm'
            : 'glass-panel hover:bg-white/70 text-[#7A746E] border border-white/80 shadow-sm backdrop-blur-md hover:shadow-md'
        }`}
        style={{
          maxWidth: '260px',
        }}
      >
        {currentMessage}
      </motion.button>
    </div>
  );
};
