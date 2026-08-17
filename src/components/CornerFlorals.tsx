import React, { useEffect, useState } from 'react';

export const CornerFlorals: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      // Subtle parallax offset (-10px to +10px)
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      {/* Artistic Flair Colorful Ambient Blobs with Gentle Breathing Parallax */}
      <div
        className="absolute -top-20 -left-20 w-[420px] h-[420px] bg-[#FFE4E6] rounded-full blur-[80px] opacity-60 transition-transform duration-700 ease-out"
        style={{
          transform: `translate(${mousePos.x * 0.6}px, ${mousePos.y * 0.6}px)`,
        }}
      />
      <div
        className="absolute -bottom-24 -right-24 w-[520px] h-[520px] bg-[#FFF5E1] rounded-full blur-[90px] opacity-75 transition-transform duration-700 ease-out"
        style={{
          transform: `translate(${mousePos.x * -0.5}px, ${mousePos.y * -0.5}px)`,
        }}
      />
      <div
        className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[320px] h-[320px] bg-[#FFD1D1] rounded-full blur-[70px] opacity-35 transition-transform duration-1000 ease-out"
        style={{
          transform: `translate(${mousePos.x * 0.3}px, ${mousePos.y * 0.3}px)`,
        }}
      />

      {/* Stylized Floating Petals with Staggered Delays */}
      <div className="absolute w-4 h-6 top-[12%] left-[16%] bg-[#FFDDE2] opacity-70 rotate-45 rounded-[0_100%_0_100%] shadow-sm animate-floating" style={{ animationDelay: '0s', animationDuration: '6.5s' }} />
      <div className="absolute w-3 h-5 top-[38%] right-[12%] bg-[#FFDDE2] opacity-65 rotate-12 rounded-[0_100%_0_100%] animate-floating" style={{ animationDelay: '1.8s', animationDuration: '7.2s' }} />
      <div className="absolute w-5 h-7 bottom-[18%] left-[8%] bg-[#FFDDE2] opacity-75 rotate-[60deg] rounded-[0_100%_0_100%] animate-floating" style={{ animationDelay: '3.4s', animationDuration: '8s' }} />
      <div className="absolute w-3.5 h-5.5 bottom-[28%] right-[20%] bg-[#FFDDE2] opacity-60 rotate-[35deg] rounded-[0_100%_0_100%] animate-floating" style={{ animationDelay: '4.8s', animationDuration: '6.8s' }} />

      {/* Top Left Botanical Branch */}
      <svg
        className="absolute -top-10 -left-10 w-44 h-44 sm:w-60 sm:h-60 text-[#E8A2A2] opacity-50 transform rotate-12 transition-transform duration-700 ease-out"
        style={{
          transform: `rotate(12deg) translate(${mousePos.x * 0.3}px, ${mousePos.y * 0.3}px)`,
        }}
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M20 20 Q70 60 120 140 Q150 180 180 190"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <path
          d="M50 45 C40 25 65 20 70 38 C75 55 55 58 50 45 Z"
          fill="#FFE4E6"
          stroke="currentColor"
          strokeWidth="0.8"
        />
        <path
          d="M80 80 C65 65 90 55 98 72 C104 88 88 92 80 80 Z"
          fill="#FFE4E6"
          stroke="currentColor"
          strokeWidth="0.8"
        />
        <path
          d="M110 120 C100 100 125 95 130 112 C135 128 118 132 110 120 Z"
          fill="#FFE4E6"
          stroke="currentColor"
          strokeWidth="0.8"
        />
        <circle cx="150" cy="165" r="14" fill="#FFDDE2" stroke="currentColor" strokeWidth="0.8" />
        <circle cx="146" cy="162" r="8" fill="#F9A8A8" fillOpacity="0.6" />
        <circle cx="154" cy="168" r="4" fill="#E8A2A2" fillOpacity="0.5" />
      </svg>

      {/* Bottom Right Botanical Branch */}
      <svg
        className="absolute -bottom-12 -right-12 w-48 h-48 sm:w-64 sm:h-64 text-[#E8A2A2] opacity-50 transform rotate-190 transition-transform duration-700 ease-out"
        style={{
          transform: `rotate(190deg) translate(${mousePos.x * -0.3}px, ${mousePos.y * -0.3}px)`,
        }}
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M20 20 Q70 60 120 140 Q150 180 180 190"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <path
          d="M50 45 C40 25 65 20 70 38 C75 55 55 58 50 45 Z"
          fill="#FFE4E6"
          stroke="currentColor"
          strokeWidth="0.8"
        />
        <path
          d="M80 80 C65 65 90 55 98 72 C104 88 88 92 80 80 Z"
          fill="#FFE4E6"
          stroke="currentColor"
          strokeWidth="0.8"
        />
        <circle cx="155" cy="170" r="16" fill="#FFDDE2" stroke="currentColor" strokeWidth="0.8" />
        <circle cx="150" cy="166" r="9" fill="#F9A8A8" fillOpacity="0.6" />
        <circle cx="160" cy="172" r="5" fill="#E8A2A2" fillOpacity="0.5" />
      </svg>

      {/* Bottom Left Minimalist Signature Tag */}
      <div className="absolute bottom-8 left-8 hidden sm:flex items-center gap-3 opacity-40 select-none">
        <div className="w-[1px] h-10 bg-[#3D3935]" />
        <div className="font-serif-elegant italic text-xs text-[#3D3935] tracking-[0.25em]">
          FOR HER
        </div>
      </div>
    </div>
  );
};
