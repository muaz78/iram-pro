import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Heart, Sparkles, Feather, Calendar, Mail, MailOpen } from 'lucide-react';
import { TypewriterText } from './TypewriterText';

interface MemoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MemoryModal: React.FC<MemoryModalProps> = ({ isOpen, onClose }) => {
  const [modalOpenedTime, setModalOpenedTime] = useState<number>(0);
  const [isUnfolded, setIsUnfolded] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      setModalOpenedTime(Date.now());
      setIsUnfolded(false);
      const timer = setTimeout(() => {
        setIsUnfolded(true);
      }, 350);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#3a282e]/25 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.93, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 28, stiffness: 350 }}
            className="relative w-full max-w-2xl bg-[#FDFBF7] rounded-[40px] p-6 sm:p-10 shadow-2xl border border-white/80 z-10 my-8 overflow-hidden"
          >
            {/* Soft decorative background glows */}
            <div className="absolute -top-20 -right-20 w-48 h-48 bg-[#FFE4E6] rounded-full blur-2xl opacity-60 pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-[#FFF5E1] rounded-full blur-2xl opacity-75 pointer-events-none" />

            {/* Close Button */}
            <button
              onClick={onClose}
              aria-label="Close message"
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/80 text-[#7A746E] transition-colors cursor-pointer z-20"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header with Envelope Icon */}
            <div className="text-center mb-6 relative">
              <motion.div
                initial={{ scale: 0.5, rotate: -15 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#FFE4E6] text-[#E8A2A2] mb-3 shadow-inner relative"
              >
                {isUnfolded ? (
                  <MailOpen className="w-6 h-6 animate-pulse" />
                ) : (
                  <Mail className="w-6 h-6" />
                )}
                {/* Floating golden spark */}
                <motion.div
                  animate={{ y: [-2, 2, -2], opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute -top-1 -right-1 text-[#E8A2A2]"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                </motion.div>
              </motion.div>
              <p className="text-xs uppercase tracking-[0.4em] text-[#A69F97] font-medium">
                EK CHHOTI SI AUR KAHANI
              </p>
              <h3 className="font-serif-elegant text-2xl sm:text-3xl text-[#3D3935] mt-1 font-normal">
                A Letter for Iram ♡
              </h3>
            </div>

            {/* 3D Envelope Unfolding Container */}
            <div className="relative perspective-[1200px] mb-6">
              {/* Top Envelope Flap Animation */}
              <motion.div
                initial={{ rotateX: 0, opacity: 1 }}
                animate={{ rotateX: 180, opacity: 0.2 }}
                transition={{ duration: 0.75, delay: 0.15, ease: [0.4, 0, 0.2, 1] }}
                style={{ transformOrigin: 'top center' }}
                className="absolute -top-3 left-1/2 -translate-x-1/2 w-48 h-8 bg-gradient-to-b from-[#F5E6D3] to-transparent border-t-2 border-[#E8A2A2]/40 rounded-t-xl pointer-events-none z-20 flex items-center justify-center"
              >
                <div className="w-6 h-6 rounded-full bg-[#E8A2A2] text-white flex items-center justify-center shadow-md -translate-y-2">
                  <Heart className="w-3.5 h-3.5 fill-current" />
                </div>
              </motion.div>

              {/* Unfolding Letter Paper */}
              <motion.div
                initial={{
                  rotateX: -40,
                  scaleY: 0.65,
                  opacity: 0,
                  y: -25,
                  boxShadow: '0 5px 15px rgba(0,0,0,0.05)',
                }}
                animate={{
                  rotateX: 0,
                  scaleY: 1,
                  opacity: 1,
                  y: 0,
                  boxShadow: '0 15px 35px rgba(232, 162, 162, 0.15)',
                }}
                transition={{
                  duration: 0.9,
                  delay: 0.25,
                  ease: [0.16, 1, 0.3, 1],
                }}
                style={{ transformOrigin: 'top center' }}
                className="glass-panel rounded-3xl p-6 sm:p-7 border border-white/90 shadow-md relative bg-gradient-to-b from-[#FFFDF9] via-[#FAF6F0] to-[#FFFDF9] overflow-hidden"
              >
                {/* Paper fold crease texture lines */}
                <div className="absolute inset-x-0 top-1/3 h-[1px] bg-gradient-to-r from-transparent via-[#E8DCCB]/50 to-transparent pointer-events-none" />
                <div className="absolute inset-x-0 top-2/3 h-[1px] bg-gradient-to-r from-transparent via-[#E8DCCB]/50 to-transparent pointer-events-none" />

                {/* Postage Stamp Accent in Top Right */}
                <div className="absolute top-4 right-4 hidden sm:flex flex-col items-center justify-center p-2 rounded-lg border border-dashed border-[#E8A2A2]/60 bg-[#FFE4E6]/30 text-[#E8A2A2]">
                  <Feather className="w-4 h-4 mb-0.5" />
                  <span className="text-[9px] uppercase tracking-widest font-mono">IRAM</span>
                </div>

                {/* Letter Content */}
                <p className="font-script-handwritten text-3xl sm:text-4xl text-[#3D3935] mb-4">
                  <TypewriterText
                    key={`dear-${modalOpenedTime}`}
                    text="Dear Iram,"
                    delay={700}
                    speed={55}
                    cursorColor="#E8A2A2"
                  />
                </p>
                <p className="mb-4 text-[#7A746E] font-serif-elegant italic text-base sm:text-lg leading-relaxed">
                  <TypewriterText
                    key={`p1-${modalOpenedTime}`}
                    text="Kaha tha na maine... kuch baatein bas dil mein nahi rakhi jaati. Har chhoti baat jo tum karti ho, jis tarah se tum baat karti ho, woh sab kuch dil ko bohot sukoon deta hai."
                    delay={1300}
                    speed={24}
                  />
                </p>
                <p className="text-[#7A746E] font-serif-elegant italic text-base sm:text-lg leading-relaxed">
                  <TypewriterText
                    key={`p2-${modalOpenedTime}`}
                    text="Ye website sirf ek sawaal nahi thi, balki meri feelings ko sabse khoobsurat tareeqe se tum tak pahunchane ki ek koshish thi. Thank you for being such a special part of my life."
                    delay={4500}
                    speed={24}
                  />
                </p>

                {/* Letter Footer */}
                <div className="mt-6 pt-4 border-t border-[#E8A2A2]/30 flex items-center justify-between">
                  <span className="text-xs text-[#A69F97] italic flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#E8A2A2]" /> For today & always
                  </span>
                  <span className="font-script-handwritten text-2xl sm:text-3xl text-[#E8A2A2]">
                    Forever yours ♡
                  </span>
                </div>
              </motion.div>
            </div>

            {/* Memory Cards Grid */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6"
            >
              <div className="glass-panel p-5 rounded-2xl border border-white/80 shadow-sm flex flex-col justify-between hover:shadow-md transition-all">
                <div>
                  <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#FFE4E6] text-[#E8A2A2] text-[11px] font-semibold tracking-wider uppercase mb-2">
                    Special Moment #1
                  </span>
                  <h4 className="font-serif-elegant text-lg text-[#3D3935] mb-1 font-semibold">
                    Tumhari smile ✨
                  </h4>
                  <p className="text-xs text-[#7A746E] leading-relaxed">
                    Jab bhi tum hasti ho, lagta hai jaise poori duniya thodi aur khoobsurat ho gayi ho.
                  </p>
                </div>
                <div className="mt-3 flex justify-end text-[#E8A2A2]">
                  <Sparkles className="w-4 h-4" />
                </div>
              </div>

              <div className="glass-panel p-5 rounded-2xl border border-white/80 shadow-sm flex flex-col justify-between hover:shadow-md transition-all">
                <div>
                  <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#FFE4E6] text-[#E8A2A2] text-[11px] font-semibold tracking-wider uppercase mb-2">
                    Special Moment #2
                  </span>
                  <h4 className="font-serif-elegant text-lg text-[#3D3935] mb-1 font-semibold">
                    Hamari baatein 🌸
                  </h4>
                  <p className="text-xs text-[#7A746E] leading-relaxed">
                    Wo der raat tak baatein aur bina kisi matlab ki hansi... best time of my day.
                  </p>
                </div>
                <div className="mt-3 flex justify-end text-[#E8A2A2]">
                  <Heart className="w-4 h-4 fill-[#FFE4E6]" />
                </div>
              </div>
            </motion.div>

            {/* Bottom button */}
            <div className="mt-8 text-center">
              <button
                onClick={onClose}
                className="btn-artistic-primary px-8 py-3 rounded-full text-xs font-bold tracking-[0.2em] uppercase cursor-pointer"
              >
                Close & Keep in heart ♡
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

