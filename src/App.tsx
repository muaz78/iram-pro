import React, { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { PageStage } from './types';
import { PetalsCanvas } from './components/PetalsCanvas';
import { CornerFlorals } from './components/CornerFlorals';
import { MusicToggle } from './components/MusicToggle';
import { MemoryModal } from './components/MemoryModal';
import { Page1Landing } from './components/pages/Page1Landing';
import { Page2Handwriting } from './components/pages/Page2Handwriting';
import { Page3BuildUp } from './components/pages/Page3BuildUp';
import { Page4Proposal } from './components/pages/Page4Proposal';
import { Page5HappyEnding } from './components/pages/Page5HappyEnding';

export default function App() {
  const [currentStage, setCurrentStage] = useState<PageStage>(1);
  const [isMemoryModalOpen, setIsMemoryModalOpen] = useState<boolean>(false);

  return (
    <main className="relative min-h-screen w-full flex flex-col justify-center items-center px-4 py-12 sm:py-16 selection:bg-[#fcd5dc] selection:text-[#882442] overflow-x-hidden">
      {/* Interactive Floating Petals & Heart Rain Canvas on Page 5 */}
      <PetalsCanvas burst={currentStage === 5} heartRain={currentStage === 5} />

      {/* Delicate Botanical Corner Florals & Ambient Light Blobs */}
      <CornerFlorals />

      {/* Floating Music Control Button in top right */}
      <MusicToggle />

      {/* Main Story Container with Smooth Page Transitions */}
      <div className="relative z-10 w-full max-w-2xl my-auto">
        <AnimatePresence mode="wait">
          {currentStage === 1 && (
            <Page1Landing key="page-1" onNext={() => setCurrentStage(2)} />
          )}

          {currentStage === 2 && (
            <Page2Handwriting key="page-2" onNext={() => setCurrentStage(3)} />
          )}

          {currentStage === 3 && (
            <Page3BuildUp key="page-3" onNext={() => setCurrentStage(4)} />
          )}

          {currentStage === 4 && (
            <Page4Proposal key="page-4" onAccept={() => setCurrentStage(5)} />
          )}

          {currentStage === 5 && (
            <Page5HappyEnding
              key="page-5"
              onOpenMemoryModal={() => setIsMemoryModalOpen(true)}
            />
          )}
        </AnimatePresence>
      </div>

      {/* Optional Memory Note / Love Letter Modal */}
      <MemoryModal
        isOpen={isMemoryModalOpen}
        onClose={() => setIsMemoryModalOpen(false)}
      />
    </main>
  );
}
