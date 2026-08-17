import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { romanticAudio } from '../utils/audio';

export const MusicToggle: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  useEffect(() => {
    // Keep in sync
    const checkState = () => {
      setIsPlaying(romanticAudio.getIsPlaying());
    };
    const interval = setInterval(checkState, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleToggle = () => {
    const newState = romanticAudio.toggle();
    setIsPlaying(newState);
  };

  return (
    <button
      onClick={handleToggle}
      aria-label={isPlaying ? 'Pause romantic background music' : 'Play romantic background music'}
      className="fixed top-6 right-6 z-40 flex items-center gap-2.5 px-4 py-2 rounded-full glass-panel text-xs font-semibold tracking-widest text-[#3D3935] hover:bg-white/80 transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer border border-white/60 uppercase"
    >
      <span className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-[#E8A2A2] animate-pulse shadow-[0_0_8px_#E8A2A2]' : 'bg-[#A69F97]'}`} />
      <span className="tracking-widest">♪ MUSIC {isPlaying ? 'ON' : 'OFF'}</span>
      {isPlaying ? (
        <Volume2 className="w-3.5 h-3.5 text-[#E8A2A2]" />
      ) : (
        <VolumeX className="w-3.5 h-3.5 text-[#A69F97]" />
      )}
    </button>
  );
};
