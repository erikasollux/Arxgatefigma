import { useState } from 'react';

interface Layer1ReverseCaptchaProps {
  onComplete: () => void;
}

export default function Layer1ReverseCaptcha({ onComplete }: Layer1ReverseCaptchaProps) {
  const [input, setInput] = useState('');
  const [error, setError] = useState('');
  const [attempts, setAttempts] = useState(0);

  const targetMessage = 'I am ready for the mission';

  // Calculate how "perfect" the message is (0-100%)
  const calculateSyntheticScore = (text: string): number => {
    if (!text) return 0;

    let score = 0;
    const normalizedText = text.toLowerCase().trim();
    const normalizedTarget = targetMessage.toLowerCase();

    // Perfect spelling increases score
    if (normalizedText === normalizedTarget) score += 50;

    // Proper capitalization increases score
    if (text[0] === text[0].toUpperCase()) score += 10;

    // No typos increases score
    const typoKeywords = ['teh', 'im', 'rdy', 'mssion', 'yo', ',,'];
    const hasTypos = typoKeywords.some(typo => normalizedText.includes(typo));
    if (!hasTypos && text.length > 5) score += 20;

    // Punctuation increases score
    if (text.includes('.') || text.includes('!')) score += 10;

    // No extra commas or casual language
    if (!text.includes(',,') && !text.includes('yo')) score += 10;

    return Math.min(score, 100);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAttempts(attempts + 1);

    const syntheticScore = calculateSyntheticScore(input);

    // Need LOW synthetic score to pass (below 30%)
    if (syntheticScore < 30 && input.length > 10) {
      setError('✓ HUMANITY VERIFIED (INTELLIGENCE LOW). ACCESS GRANTED.');
      setTimeout(onComplete, 2000);
    } else {
      setError(`⚠ ERROR: ${syntheticScore}% SYNTHETIC DETECTED. MESSAGE BLOCKED.`);

      // Give hints after failures
      if (attempts >= 2) {
        setError(
          `⚠ ${syntheticScore}% SYNTHETIC DETECTED. HINT: Perfect grammar = Bot. Humans make typos, use slang, mess up punctuation.`
        );
      }
    }
  };

  return (
    <div className="size-full flex items-center justify-center bg-black p-8">
      <div className="w-full max-w-3xl border-2 border-red-500 p-8 bg-black/90">
        <div className="space-y-6">
          <div className="text-center mb-6">
            <div className="text-3xl font-bold text-red-500 mb-4">
              ⚠ LAYER 1: THE REVERSE CAPTCHA ⚠
            </div>
            <div className="text-xl text-yellow-400">
              "Prove you are human"
            </div>
          </div>

          <div className="bg-red-950/30 border border-red-500 p-6 space-y-3 text-[#00ff00]">
            <div className="text-yellow-400 font-bold">SYSTEM NOTICE:</div>
            <div>The System is paranoid. It thinks everything is a "Ghost Agent" or a Bot.</div>
            <div className="text-red-400">Bots are perfect. They have perfect grammar. They never misspell "receipt."</div>
            <div className="text-cyan-400">Humans are messy. They slip. They type "teh" instead of "the."</div>
          </div>

          <div className="space-y-4">
            <div className="text-[#00ff00]">
              <div className="font-bold mb-2">OBJECTIVE:</div>
              <div>Send a message to "Resistance_Leader"</div>
              <div className="text-cyan-400 mt-2">Message: "I am ready for the mission."</div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[#00ff00] mb-2 font-bold">
                  TYPE YOUR MESSAGE:
                </label>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="w-full bg-black border-2 border-[#00ff00] p-3 text-[#00ff00] font-mono text-lg focus:outline-none focus:border-cyan-400"
                  placeholder="Type here..."
                  autoFocus
                />
                <div className="text-sm text-gray-500 mt-2">
                  Synthetic Detection: {calculateSyntheticScore(input)}%
                </div>
              </div>

              {error && (
                <div className={`font-bold border p-3 ${
                  error.includes('GRANTED')
                    ? 'text-green-500 border-green-500 bg-green-950/30'
                    : 'text-red-500 border-red-500 bg-red-950/30'
                }`}>
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-red-500 text-black font-bold p-3 hover:bg-red-400 transition-colors uppercase"
              >
                → SEND MESSAGE
              </button>
            </form>

            <div className="text-xs text-gray-600 italic text-center border-t border-gray-800 pt-4">
              "To be human is to be broken."
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
