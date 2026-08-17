import React, { useEffect, useState, useRef } from 'react';

interface TypewriterTextProps {
  text: string;
  delay?: number; // Delay in milliseconds before typing begins
  speed?: number; // Base speed per character in ms (default ~35ms)
  className?: string;
  cursor?: boolean;
  cursorColor?: string;
  hideCursorOnComplete?: boolean;
  pauseOnPunctuation?: boolean;
  onComplete?: () => void;
  onStart?: () => void;
  as?: 'span' | 'p' | 'h1' | 'h2' | 'h3' | 'div';
}

export const TypewriterText: React.FC<TypewriterTextProps> = ({
  text,
  delay = 0,
  speed = 36,
  className = '',
  cursor = true,
  cursorColor = '#E8A2A2',
  hideCursorOnComplete = true,
  pauseOnPunctuation = true,
  onComplete,
  onStart,
  as: Component = 'span',
}) => {
  const [displayedLength, setDisplayedLength] = useState<number>(0);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [cursorVisible, setCursorVisible] = useState<boolean>(true);
  const onCompleteRef = useRef(onComplete);
  const onStartRef = useRef(onStart);

  useEffect(() => {
    onCompleteRef.current = onComplete;
    onStartRef.current = onStart;
  }, [onComplete, onStart]);

  useEffect(() => {
    setDisplayedLength(0);
    setIsTyping(false);
    setIsFinished(false);

    let startTimeoutId: number;
    let typingTimeoutId: number;
    let currentIndex = 0;

    startTimeoutId = window.setTimeout(() => {
      setIsTyping(true);
      if (onStartRef.current) onStartRef.current();

      const typeNextChar = () => {
        if (currentIndex < text.length) {
          currentIndex++;
          setDisplayedLength(currentIndex);

          const char = text[currentIndex - 1];
          let nextDelay = speed + Math.floor(Math.random() * 14 - 7); // natural human variation

          if (pauseOnPunctuation) {
            if (char === '.' || char === '?' || char === '!') {
              nextDelay += 180;
            } else if (char === ',' || char === ';' || char === ':') {
              nextDelay += 100;
            } else if (char === '…') {
              nextDelay += 220;
            }
          }

          typingTimeoutId = window.setTimeout(typeNextChar, Math.max(12, nextDelay));
        } else {
          setIsTyping(false);
          setIsFinished(true);
          if (onCompleteRef.current) onCompleteRef.current();
        }
      };

      typingTimeoutId = window.setTimeout(typeNextChar, speed);
    }, delay);

    return () => {
      clearTimeout(startTimeoutId);
      clearTimeout(typingTimeoutId);
    };
  }, [text, delay, speed, pauseOnPunctuation]);

  // Cursor blink interval
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, 500);

    return () => clearInterval(blinkInterval);
  }, []);

  const displayedText = text.slice(0, displayedLength);
  const shouldShowCursor =
    cursor && (isTyping || (!isFinished && displayedLength === 0) || (!hideCursorOnComplete && isFinished));

  return (
    <Component className={`inline relative ${className}`}>
      <span>{displayedText}</span>
      {shouldShowCursor && (
        <span
          className="inline-block ml-0.5 font-light select-none transition-opacity duration-150"
          style={{
            color: cursorColor,
            opacity: cursorVisible ? 1 : 0,
            transform: 'translateY(-1px)',
          }}
        >
          |
        </span>
      )}
    </Component>
  );
};
