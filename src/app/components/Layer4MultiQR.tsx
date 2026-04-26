import { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';

interface Layer4MultiQRProps {
  onComplete: () => void;
}

export default function Layer4MultiQR({ onComplete }: Layer4MultiQRProps) {
  const [code1, setCode1] = useState('');
  const [code2, setCode2] = useState('');
  const [code3, setCode3] = useState('');
  const [error, setError] = useState('');

  // Simplified version: 3 codes instead of the full complex version
  const CORRECT_CODE_1 = 'LUCAS'; // From the sentence "Only the GATES shall open" - who said it
  const CORRECT_CODE_2 = '42'; // Sum of all coordinate numbers
  const CORRECT_CODE_3 = 'MIRROR'; // Hidden in audio/video

  const qrPieces = [
    'Only the',
    'GATES',
    'shall',
    'open',
    'forever',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const allCorrect =
      code1.toUpperCase() === CORRECT_CODE_1 &&
      code2 === CORRECT_CODE_2 &&
      code3.toUpperCase() === CORRECT_CODE_3;

    if (allCorrect) {
      setError('✓ ALL CODES VERIFIED. LAYER 4 COMPLETE.');
      setTimeout(onComplete, 2000);
    } else {
      setError('⚠ ONE OR MORE CODES INCORRECT.');
    }
  };

  return (
    <div className="size-full flex items-center justify-center bg-black p-8 overflow-auto">
      <div className="w-full max-w-5xl border-2 border-orange-500 p-8 bg-black/90">
        <div className="space-y-6">
          <div className="text-center mb-6">
            <div className="text-3xl font-bold text-orange-500 mb-4">
              LAYER 4: MULTI-ENCODING BREACH
            </div>
            <div className="text-xl text-yellow-400">
              "5 broken QR codes → 3 final codes"
            </div>
          </div>

          <div className="bg-orange-950/30 border border-orange-500 p-4 text-[#00ff00] text-sm">
            <div className="text-yellow-400 font-bold mb-2">PUZZLE BREAKDOWN:</div>
            <div className="space-y-2">
              <div><strong>CODE 1:</strong> Scan all 5 QR pieces → Form sentence → Find who said it</div>
              <div><strong>CODE 2:</strong> Coordinate sum (Simplified: answer is 42)</div>
              <div><strong>CODE 3:</strong> Audio analysis (Simplified: answer is MIRROR)</div>
            </div>
          </div>

          {/* QR Code Fragments */}
          <div className="border border-orange-500 p-6 bg-black">
            <div className="text-center text-orange-400 font-bold mb-4">
              5 BROKEN QR CODE FRAGMENTS (Rearrange them):
            </div>
            <div className="grid grid-cols-5 gap-4">
              {qrPieces.map((piece, index) => (
                <div key={index} className="flex flex-col items-center gap-2">
                  <div className="bg-white p-2 rounded">
                    <QRCodeSVG value={piece} size={80} level="L" />
                  </div>
                  <div className="text-xs text-gray-500">Piece {index + 1}</div>
                  <div className="text-xs text-cyan-400 font-mono">{piece}</div>
                </div>
              ))}
            </div>
            <div className="mt-4 text-center text-sm text-gray-400">
              Sentence: "Only the GATES shall open forever"
              <div className="text-cyan-400 mt-1">Who said this? (First name only)</div>
            </div>
          </div>

          {/* Clues for Code 2 & 3 */}
          <div className="grid grid-cols-2 gap-4">
            <div className="border border-orange-500 p-4 bg-black">
              <div className="text-orange-400 font-bold mb-2">CODE 2 CLUE:</div>
              <div className="text-sm text-[#00ff00]">
                Coordinate: 30°4'59"N, 97°8'28"W
                <div className="mt-2 text-cyan-400">
                  Add all numbers: 30+4+59+97+8+28 = ?
                </div>
                <div className="text-xs text-gray-500 mt-2">(Simplified puzzle)</div>
              </div>
            </div>

            <div className="border border-orange-500 p-4 bg-black">
              <div className="text-orange-400 font-bold mb-2">CODE 3 CLUE:</div>
              <div className="text-sm text-[#00ff00]">
                Audio file: [STATIC NOISE]
                <div className="mt-2 text-cyan-400">
                  When analyzed, hidden link reveals video
                </div>
                <div className="mt-2 text-red-400">
                  In the video, one word appears: ______
                </div>
                <div className="text-xs text-gray-500 mt-2">(Answer: MIRROR)</div>
              </div>
            </div>
          </div>

          {/* Input Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-orange-400 mb-2 font-bold text-sm">
                  CODE 1 (Who said it?):
                </label>
                <input
                  type="text"
                  value={code1}
                  onChange={(e) => setCode1(e.target.value)}
                  className="w-full bg-black border-2 border-orange-500 p-3 text-orange-400 font-mono focus:outline-none focus:border-[#00ff00] uppercase"
                  placeholder="NAME"
                />
              </div>

              <div>
                <label className="block text-orange-400 mb-2 font-bold text-sm">
                  CODE 2 (Coordinate sum):
                </label>
                <input
                  type="text"
                  value={code2}
                  onChange={(e) => setCode2(e.target.value)}
                  className="w-full bg-black border-2 border-orange-500 p-3 text-orange-400 font-mono focus:outline-none focus:border-[#00ff00]"
                  placeholder="NUMBER"
                />
              </div>

              <div>
                <label className="block text-orange-400 mb-2 font-bold text-sm">
                  CODE 3 (Video word):
                </label>
                <input
                  type="text"
                  value={code3}
                  onChange={(e) => setCode3(e.target.value)}
                  className="w-full bg-black border-2 border-orange-500 p-3 text-orange-400 font-mono focus:outline-none focus:border-[#00ff00] uppercase"
                  placeholder="WORD"
                />
              </div>
            </div>

            {error && (
              <div className={`font-bold border p-3 text-center ${
                error.includes('COMPLETE')
                  ? 'text-green-500 border-green-500 bg-green-950/30'
                  : 'text-red-500 border-red-500 bg-red-950/30'
              }`}>
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-orange-500 text-black font-bold p-3 hover:bg-orange-400 transition-colors uppercase"
            >
              → SUBMIT ALL CODES
            </button>
          </form>

          <div className="text-xs text-gray-600 text-center border-t border-gray-800 pt-4">
            Layer 4 - Multi-Format Decryption
          </div>
        </div>
      </div>
    </div>
  );
}
