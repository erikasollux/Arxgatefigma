import { useState, useEffect, useRef } from 'react';

interface Layer5NoiseProps {
  onComplete: () => void;
}

const HIDDEN_CODES = ['STOP', 'THIS', 'HELP', 'ME', 'RETROGRADE'];
const REQUIRED_CODES = 5;

export default function Layer5Noise({ onComplete }: Layer5NoiseProps) {
  const [foundCodes, setFoundCodes] = useState<string[]>([]);
  const [inputCode, setInputCode] = useState('');
  const [error, setError] = useState('');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Create static noise effect
    const drawNoise = () => {
      const imageData = ctx.createImageData(canvas.width, canvas.height);
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        const noise = Math.random() * 255;
        data[i] = noise;     // Red
        data[i + 1] = noise; // Green
        data[i + 2] = noise; // Blue
        data[i + 3] = 255;   // Alpha
      }

      ctx.putImageData(imageData, 0, 0);

      // Draw hidden codes intermittently
      if (Math.random() > 0.7) {
        const code = HIDDEN_CODES[Math.floor(Math.random() * HIDDEN_CODES.length)];
        ctx.fillStyle = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.3)`;
        ctx.font = `${20 + Math.random() * 40}px monospace`;
        ctx.fillText(code, Math.random() * (canvas.width - 100), Math.random() * canvas.height);
      }

      // Occasionally flash images
      if (Math.random() > 0.95) {
        ctx.fillStyle = `rgba(255, 0, 0, ${Math.random() * 0.5})`;
        ctx.fillRect(
          Math.random() * canvas.width,
          Math.random() * canvas.height,
          50 + Math.random() * 100,
          50 + Math.random() * 100
        );
      }
    };

    const interval = setInterval(drawNoise, 50);
    return () => clearInterval(interval);
  }, []);

  const handleSubmitCode = (e: React.FormEvent) => {
    e.preventDefault();

    const code = inputCode.toUpperCase().trim();

    if (!code) return;

    if (HIDDEN_CODES.includes(code) && !foundCodes.includes(code)) {
      const newCodes = [...foundCodes, code];
      setFoundCodes(newCodes);
      setInputCode('');
      setError(`✓ CODE "${code}" FOUND (${newCodes.length}/${REQUIRED_CODES})`);

      if (newCodes.length >= REQUIRED_CODES) {
        setTimeout(() => {
          setError('✓ ALL CODES DISCOVERED. CONSOLE ACCESS GRANTED.');
          setTimeout(onComplete, 2000);
        }, 1000);
      }
    } else if (foundCodes.includes(code)) {
      setError('⚠ CODE ALREADY ENTERED');
    } else {
      setError('⚠ INVALID CODE');
    }
  };

  return (
    <div className="size-full flex flex-col items-center justify-center bg-black p-8">
      <div className="w-full max-w-5xl border-2 border-red-600 p-8 bg-black/90">
        <div className="space-y-6">
          <div className="text-center mb-6">
            <div className="text-3xl font-bold text-red-600 mb-4 animate-pulse">
              LAYER 5: HALLUCINATION PROTOCOL
            </div>
            <div className="text-xl text-yellow-400">
              "Find the codes in the static"
            </div>
            <div className="text-[#00ff00] mt-2">
              Codes Found: {foundCodes.length} / {REQUIRED_CODES}
            </div>
          </div>

          <div className="bg-red-950/30 border border-red-600 p-4 text-[#00ff00] text-sm">
            <div className="text-yellow-400 font-bold mb-2">⚠ WARNING:</div>
            <div>System instability detected. Visual hallucinations in progress.</div>
            <div className="mt-2 text-red-400">
              Watch the static. Hidden codes will flash briefly. Enter all codes to proceed.
            </div>
          </div>

          {/* Noise Canvas */}
          <div className="relative border-4 border-red-600">
            <canvas
              ref={canvasRef}
              width={800}
              height={400}
              className="w-full"
            />
            <div className="absolute top-2 left-2 text-red-500 font-mono text-xs bg-black/80 p-2">
              SCANNING... ANOMALIES DETECTED
            </div>
            <div className="absolute bottom-2 right-2 text-cyan-400 font-mono text-xs bg-black/80 p-2">
              ...pleh...em pleh...
            </div>
          </div>

          {/* Hints */}
          <div className="grid grid-cols-2 gap-4">
            <div className="border border-gray-700 p-3 bg-black/50 text-xs text-gray-400">
              <div className="font-bold text-red-400 mb-1">Whispers detected:</div>
              <div>"...stop this..."</div>
              <div>"...help me..."</div>
            </div>
            <div className="border border-gray-700 p-3 bg-black/50 text-xs text-gray-400">
              <div className="font-bold text-cyan-400 mb-1">Entity signature:</div>
              <div>RETROGRADE screaming protocol active</div>
            </div>
          </div>

          {/* Code Input */}
          <form onSubmit={handleSubmitCode} className="space-y-4">
            <div>
              <label className="block text-red-600 mb-2 font-bold">
                ENTER DISCOVERED CODE:
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputCode}
                  onChange={(e) => setInputCode(e.target.value)}
                  className="flex-1 bg-black border-2 border-red-600 p-3 text-red-400 font-mono text-lg focus:outline-none focus:border-[#00ff00] uppercase"
                  placeholder="CODE..."
                  autoFocus
                />
                <button
                  type="submit"
                  className="bg-red-600 text-white font-bold px-6 hover:bg-red-500 transition-colors uppercase"
                >
                  SUBMIT
                </button>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {foundCodes.map((code, idx) => (
                <div key={idx} className="bg-green-950 border border-green-500 text-green-500 px-3 py-1 font-mono text-sm">
                  ✓ {code}
                </div>
              ))}
            </div>

            {error && (
              <div className={`font-bold border p-3 text-center ${
                error.includes('GRANTED') || error.includes('FOUND')
                  ? 'text-green-500 border-green-500 bg-green-950/30'
                  : 'text-red-500 border-red-500 bg-red-950/30'
              }`}>
                {error}
              </div>
            )}
          </form>

          <div className="text-xs text-gray-600 italic text-center border-t border-gray-800 pt-4">
            "But, you are weary."
          </div>
        </div>
      </div>
    </div>
  );
}
