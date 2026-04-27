import { useEffect, useState } from 'react';

interface BootScreenProps {
  onComplete: () => void;
  showContent: boolean;
}

const bootSequence = [
  'ARX GATE SYSTEM BOOT v1.0.0-DEV',
  'Copyright (C) 2000-2025 Chronos Directorate',
  '',
  'Verifying system integrity...',
  'Loading Chronos Core...',
  'Establishing border parameters...',
  'Initializing morality engine...',
  'Monitoring agents...',
  '',
  'System Ready.',
  '',
  '"Borders are lines."',
  '"Lines are control."',
  '"Control is safety."',
];

export default function BootScreen({ onComplete, showContent }: BootScreenProps) {
  const [lines, setLines] = useState<string[]>([]);

  useEffect(() => {
    if (!showContent) return;

    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < bootSequence.length) {
        setLines((prev) => [...prev, bootSequence[currentIndex]]);
        currentIndex++;
      } else {
        clearInterval(interval);
        setTimeout(onComplete, 1500);
      }
    }, 200);

    return () => clearInterval(interval);
  }, [showContent, onComplete]);

  return (
    <div className="size-full flex items-center justify-center bg-black p-8">
      <div className="w-full max-w-4xl">
        {!showContent ? (
          <div className="flex flex-col items-center gap-8">
            <div className="text-6xl font-bold text-[#00ff00] animate-pulse">
              ARX GATE
            </div>
            <div className="text-2xl text-gray-400">LOADING...</div>
          </div>
        ) : (
          <div className="space-y-1">
            {lines.map((line, index) => (
              <div
                key={index}
                className={`${
                  line.startsWith('"') ? 'text-cyan-400 italic' : 'text-[#00ff00]'
                } ${
                  line.includes('ARX GATE') ? 'text-2xl font-bold border-b border-[#00ff00] pb-2 mb-2' : ''
                } ${
                  line === 'System Ready.' ? 'text-[#ffff00] font-bold' : ''
                }`}
              >
                {line || '\u00A0'}
              </div>
            ))}
            {lines.length > 0 && (
              <div className="inline-block w-2 h-4 bg-[#00ff00] animate-pulse ml-1"></div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
