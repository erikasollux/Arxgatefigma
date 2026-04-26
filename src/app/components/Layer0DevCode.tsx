import { useState } from 'react';

interface Layer0DevCodeProps {
  onComplete: () => void;
}

const CORRECT_CODE = 'XXXXX-XXXXX-XXXXX-XXXXX-XXXXX'; // Windows 95-style product code

export default function Layer0DevCode({ onComplete }: Layer0DevCodeProps) {
  const [input, setInput] = useState('');
  const [error, setError] = useState('');
  const [attempts, setAttempts] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (input.toUpperCase() === CORRECT_CODE) {
      setError('');
      setTimeout(onComplete, 500);
    } else {
      setAttempts(attempts + 1);
      setError('⚠ INVALID DEVELOPER KEY. ACCESS DENIED.');

      // Give hint after 2 failed attempts
      if (attempts >= 2) {
        setError('⚠ INVALID DEVELOPER KEY. HINT: Format XXXXX-XXXXX-XXXXX-XXXXX-XXXXX (all X\'s)');
      }
    }
  };

  return (
    <div className="size-full flex items-center justify-center bg-black p-8">
      <div className="w-full max-w-2xl border-2 border-[#00ff00] p-8 bg-black/90">
        <div className="space-y-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-[#00ff00] mb-2">
              ═══════════════════════════════════
            </div>
            <div className="text-2xl text-cyan-400 mb-2">
              ARX GATE ACCESS CONTROL
            </div>
            <div className="text-3xl font-bold text-[#00ff00]">
              ═══════════════════════════════════
            </div>
          </div>

          <div className="space-y-4 text-[#00ff00]">
            <div>OS Version: ARX GATE v1.0.0-DEV</div>
            <div>Security Level: MAXIMUM</div>
            <div className="border-t border-[#00ff00] pt-4 mt-4">
              <div className="text-yellow-400 font-bold mb-2">⚠ DEVELOPER ACCESS REQUIRED</div>
              <div>This system requires a valid Developer Key to proceed.</div>
              <div className="text-sm text-gray-400 mt-2">
                (You don't have the code... but you found one that looks like a Windows product code)
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[#00ff00] mb-2 font-bold">
                ENTER DEVELOPER KEY:
              </label>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="w-full bg-black border-2 border-[#00ff00] p-3 text-[#00ff00] font-mono text-lg focus:outline-none focus:border-cyan-400 uppercase"
                placeholder="XXXXX-XXXXX-XXXXX-XXXXX-XXXXX"
                autoFocus
              />
            </div>

            {error && (
              <div className="text-red-500 font-bold border border-red-500 p-3 bg-red-950/30">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-[#00ff00] text-black font-bold p-3 hover:bg-cyan-400 transition-colors uppercase"
            >
              → SUBMIT KEY
            </button>
          </form>

          <div className="text-xs text-gray-600 text-center border-t border-gray-800 pt-4">
            Layer 0 - Developer Authentication
          </div>
        </div>
      </div>
    </div>
  );
}
