import { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';

interface Layer2QRPuzzleProps {
  onComplete: () => void;
}

export default function Layer2QRPuzzle({ onComplete }: Layer2QRPuzzleProps) {
  const [input, setInput] = useState('');
  const [error, setError] = useState('');
  const [showHint, setShowHint] = useState(false);

  // The QR code contains encoded text that needs to be decoded
  // ROT13 of "GATEWAY"
  const qrData = 'TNGRJNL';
  const correctAnswer = 'GATEWAY';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (input.toUpperCase() === correctAnswer) {
      setError('✓ CODE ACCEPTED. PROCEEDING TO LAYER 3.');
      setTimeout(onComplete, 1500);
    } else {
      setError('⚠ INVALID CODE. TRANSLATION ERROR.');
      setShowHint(true);
    }
  };

  return (
    <div className="size-full flex items-center justify-center bg-black p-8">
      <div className="w-full max-w-4xl border-2 border-cyan-400 p-8 bg-black/90">
        <div className="space-y-6">
          <div className="text-center mb-6">
            <div className="text-3xl font-bold text-cyan-400 mb-4">
              LAYER 2: DYNAMIC QR TRANSLATION
            </div>
            <div className="text-xl text-yellow-400">
              "Scan → Translate → Enter"
            </div>
          </div>

          <div className="bg-cyan-950/30 border border-cyan-400 p-6 space-y-3 text-[#00ff00]">
            <div className="text-yellow-400 font-bold">INSTRUCTIONS:</div>
            <div>1. Scan the QR code below</div>
            <div>2. The code contains encrypted text</div>
            <div>3. Translate the code using ROT13 cipher</div>
            <div>4. Enter the decoded message</div>
            {showHint && (
              <div className="text-red-400 mt-4 border-t border-red-400 pt-3">
                HINT: ROT13 shifts each letter 13 positions in the alphabet. A→N, B→O, etc.
              </div>
            )}
          </div>

          <div className="flex flex-col items-center gap-6">
            <div className="bg-white p-8 rounded-lg">
              <QRCodeSVG value={qrData} size={256} level="H" />
            </div>

            <div className="text-center">
              <div className="text-[#00ff00] mb-2">QR CODE DATA (if you can't scan):</div>
              <div className="text-2xl font-bold text-cyan-400 font-mono tracking-widest bg-black border border-cyan-400 p-4">
                {qrData}
              </div>
              <div className="text-sm text-gray-500 mt-2">
                Use ROT13 cipher to decode this text
              </div>
            </div>

            <form onSubmit={handleSubmit} className="w-full space-y-4">
              <div>
                <label className="block text-[#00ff00] mb-2 font-bold">
                  ENTER DECODED MESSAGE:
                </label>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="w-full bg-black border-2 border-cyan-400 p-3 text-cyan-400 font-mono text-lg focus:outline-none focus:border-[#00ff00] uppercase"
                  placeholder="DECODED TEXT..."
                  autoFocus
                />
              </div>

              {error && (
                <div className={`font-bold border p-3 ${
                  error.includes('ACCEPTED')
                    ? 'text-green-500 border-green-500 bg-green-950/30'
                    : 'text-red-500 border-red-500 bg-red-950/30'
                }`}>
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-cyan-400 text-black font-bold p-3 hover:bg-cyan-300 transition-colors uppercase"
              >
                → SUBMIT CODE
              </button>
            </form>
          </div>

          <div className="text-xs text-gray-600 text-center border-t border-gray-800 pt-4">
            Layer 2 - Cryptographic Analysis
          </div>
        </div>
      </div>
    </div>
  );
}
