import { useState } from 'react';

interface Layer3JigsawProps {
  onComplete: () => void;
}

interface JigsawPiece {
  id: number;
  text: string;
  matchId: number; // ID of the piece in column B that it matches
}

export default function Layer3Jigsaw({ onComplete }: Layer3JigsawProps) {
  // Simplified version: 10 pairs instead of 30 for MVP
  const columnA: JigsawPiece[] = [
    { id: 1, text: 'JIG', matchId: 1 },
    { id: 2, text: 'Jimbo In Grahams', matchId: 2 },
    { id: 3, text: 'ZUP', matchId: 3 },
    { id: 4, text: '6A 69 67 73 61 77', matchId: 4 },
    { id: 5, text: 'EMIT', matchId: 5 },
    { id: 6, text: 'Code Observation', matchId: 6 },
    { id: 7, text: 'WARD', matchId: 7 },
    { id: 8, text: '50 55 5A 5A', matchId: 8 },
    { id: 9, text: 'Going At Tiny Elephants', matchId: 9 },
    { id: 10, text: 'TRAMS', matchId: 10 },
  ];

  const columnB: JigsawPiece[] = [
    { id: 1, text: 'SAW', matchId: 1 },
    { id: 2, text: 'Silly Awesome Wings', matchId: 2 },
    { id: 3, text: 'ELZ', matchId: 3 },
    { id: 4, text: '70 75 7A 7A 6C 65', matchId: 4 },
    { id: 5, text: 'TIME', matchId: 5 },
    { id: 6, text: 'Dangerous Entry', matchId: 6 },
    { id: 7, text: 'DRAW', matchId: 7 },
    { id: 8, text: '4C 45', matchId: 8 },
    { id: 9, text: 'GATE', matchId: 9 },
    { id: 10, text: 'SMART', matchId: 10 },
  ];

  const [matches, setMatches] = useState<Map<number, number>>(new Map());
  const [selectedA, setSelectedA] = useState<number | null>(null);
  const [selectedB, setSelectedB] = useState<number | null>(null);
  const [error, setError] = useState('');

  const handleSelectA = (id: number) => {
    if (matches.has(id)) return; // Already matched
    setSelectedA(id);
    if (selectedB !== null) {
      tryMatch(id, selectedB);
    }
  };

  const handleSelectB = (id: number) => {
    if (Array.from(matches.values()).includes(id)) return; // Already matched
    setSelectedB(id);
    if (selectedA !== null) {
      tryMatch(selectedA, id);
    }
  };

  const tryMatch = (aId: number, bId: number) => {
    const pieceA = columnA.find(p => p.id === aId);
    const pieceB = columnB.find(p => p.id === bId);

    if (pieceA && pieceB && pieceA.matchId === pieceB.matchId) {
      // Correct match!
      setMatches(new Map(matches).set(aId, bId));
      setError('');
      setSelectedA(null);
      setSelectedB(null);

      // Check if all matched
      if (matches.size + 1 === columnA.length) {
        setTimeout(() => {
          setError('✓ ALL PAIRS MATCHED. LAYER 3 COMPLETE.');
          setTimeout(onComplete, 2000);
        }, 500);
      }
    } else {
      setError('⚠ INCORRECT MATCH. These pieces do not connect.');
      setTimeout(() => {
        setError('');
        setSelectedA(null);
        setSelectedB(null);
      }, 1500);
    }
  };

  const isMatched = (columnType: 'A' | 'B', id: number) => {
    if (columnType === 'A') {
      return matches.has(id);
    } else {
      return Array.from(matches.values()).includes(id);
    }
  };

  const progress = matches.size;
  const total = columnA.length;

  return (
    <div className="size-full flex items-center justify-center bg-black p-8 overflow-auto">
      <div className="w-full max-w-6xl border-2 border-purple-500 p-8 bg-black/90">
        <div className="space-y-6">
          <div className="text-center mb-6">
            <div className="text-3xl font-bold text-purple-500 mb-4">
              LAYER 3: JIGSAW PROTOCOL
            </div>
            <div className="text-xl text-yellow-400">
              "Match the pieces"
            </div>
            <div className="text-[#00ff00] mt-2">
              Progress: {progress} / {total} pairs matched
            </div>
          </div>

          <div className="bg-purple-950/30 border border-purple-500 p-4 text-[#00ff00] text-sm">
            <div className="text-yellow-400 font-bold mb-2">INSTRUCTIONS:</div>
            <div>Match Column A (Holes) to Column B (Tabs) using word clues:</div>
            <ul className="list-disc list-inside mt-2 space-y-1 text-xs">
              <li>Direct: JIG + SAW = JIGSAW</li>
              <li>First Letters: "Jimbo In Grahams" (J-I-G) + "Silly Awesome Wings" (S-A-W)</li>
              <li>Reversed: ZUP reversed = PUZ, ELZ reversed = ZLE → PUZZLE</li>
              <li>HEX to Text: Convert hexadecimal to ASCII characters</li>
              <li>Anagrams: EMIT = TIME, WARD = DRAW, TRAMS = SMART</li>
            </ul>
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

          <div className="grid grid-cols-2 gap-8">
            {/* Column A - Holes */}
            <div>
              <div className="text-center font-bold text-purple-400 mb-4 text-xl">
                COLUMN A (Holes)
              </div>
              <div className="space-y-2">
                {columnA.map((piece) => (
                  <button
                    key={piece.id}
                    onClick={() => handleSelectA(piece.id)}
                    disabled={isMatched('A', piece.id)}
                    className={`w-full p-3 border-2 font-mono transition-all ${
                      isMatched('A', piece.id)
                        ? 'bg-green-950 border-green-500 text-green-500 opacity-50 cursor-not-allowed'
                        : selectedA === piece.id
                        ? 'bg-purple-500 border-purple-300 text-black'
                        : 'bg-black border-purple-500 text-purple-400 hover:bg-purple-950'
                    }`}
                  >
                    {piece.text}
                    {isMatched('A', piece.id) && ' ✓'}
                  </button>
                ))}
              </div>
            </div>

            {/* Column B - Tabs */}
            <div>
              <div className="text-center font-bold text-cyan-400 mb-4 text-xl">
                COLUMN B (Tabs)
              </div>
              <div className="space-y-2">
                {columnB.map((piece) => (
                  <button
                    key={piece.id}
                    onClick={() => handleSelectB(piece.id)}
                    disabled={isMatched('B', piece.id)}
                    className={`w-full p-3 border-2 font-mono transition-all ${
                      isMatched('B', piece.id)
                        ? 'bg-green-950 border-green-500 text-green-500 opacity-50 cursor-not-allowed'
                        : selectedB === piece.id
                        ? 'bg-cyan-400 border-cyan-300 text-black'
                        : 'bg-black border-cyan-500 text-cyan-400 hover:bg-cyan-950'
                    }`}
                  >
                    {piece.text}
                    {isMatched('B', piece.id) && ' ✓'}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="text-xs text-gray-600 text-center border-t border-gray-800 pt-4">
            Layer 3 - Pattern Recognition & Cryptography
          </div>
        </div>
      </div>
    </div>
  );
}
