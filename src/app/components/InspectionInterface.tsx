import { useRef, useState } from 'react';
import { applicants } from '../data/applicants';
import { Applicant, Document, isExpired, namesMatch } from '../types/documents';
import DocumentView from './DocumentView';

export default function InspectionInterface() {
  const [currentApplicantIndex, setCurrentApplicantIndex] = useState(0);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [feedback, setFeedback] = useState('');
  const [stats, setStats] = useState({ approved: 0, denied: 0, correct: 0, mistakes: 0 });
  const statsRef = useRef(stats);
  const [gameDay, setGameDay] = useState(1);

  const currentApplicant = applicants[currentApplicantIndex];
  const isLastApplicant = currentApplicantIndex >= applicants.length - 1;

  const checkForIssues = (applicant: Applicant): string[] => {
    const issues: string[] = [];
    const docs = applicant.documents;

    // Check for expired documents
    docs.forEach((doc) => {
      if ('expiryDate' in doc && isExpired(doc.expiryDate)) {
        issues.push(`${doc.type.toUpperCase()} is expired`);
      }
    });

    // Check for name mismatches across documents
    if (docs.length > 1) {
      const firstNames = docs.map((d) => ('firstName' in d ? d.firstName : '')).filter(Boolean);
      const lastNames = docs.map((d) => ('lastName' in d ? d.lastName : '')).filter(Boolean);

      const firstNameMatch = firstNames.every((name) => namesMatch(name, firstNames[0]));
      const lastNameMatch = lastNames.every((name) => namesMatch(name, lastNames[0]));

      if (!firstNameMatch || !lastNameMatch) {
        issues.push('Name mismatch between documents');
      }
    }

    // Check for missing vaccination certificate
    const hasVaccination = docs.some((d) => d.type === 'vaccination');
    if (!hasVaccination) {
      issues.push('Missing required vaccination certificate');
    }

    return issues;
  };

  const handleApprove = () => {
    const issues = checkForIssues(currentApplicant);
    const shouldDeny = issues.length > 0;

    if (!shouldDeny) {
      setFeedback('✓ APPROVED - Entry granted. Citizen processed correctly.');
      setStats((prev) => {
        const next = { ...prev, approved: prev.approved + 1, correct: prev.correct + 1 };
        statsRef.current = next;
        return next;
      });
    } else {
      setFeedback(`✗ MISTAKE - You approved someone with issues: ${issues.join(', ')}`);
      setStats((prev) => {
        const next = { ...prev, approved: prev.approved + 1, mistakes: prev.mistakes + 1 };
        statsRef.current = next;
        return next;
      });
    }

    setTimeout(nextApplicant, 2000);
  };

  const handleDeny = () => {
    const issues = checkForIssues(currentApplicant);
    const shouldDeny = issues.length > 0;

    if (shouldDeny) {
      setFeedback(`✓ DENIED - Correct decision. Issues: ${issues.join(', ')}`);
      setStats((prev) => {
        const next = { ...prev, denied: prev.denied + 1, correct: prev.correct + 1 };
        statsRef.current = next;
        return next;
      });
    } else {
      setFeedback('✗ MISTAKE - You denied a valid applicant with no issues.');
      setStats((prev) => {
        const next = { ...prev, denied: prev.denied + 1, mistakes: prev.mistakes + 1 };
        statsRef.current = next;
        return next;
      });
    }

    setTimeout(nextApplicant, 2000);
  };

  const nextApplicant = () => {
    setFeedback('');
    setSelectedDocument(null);

    if (isLastApplicant) {
      const s = statsRef.current;
      const total = s.approved + s.denied;
      const accuracy = total > 0 ? ((s.correct / total) * 100).toFixed(0) : '0';
      setFeedback(`DAY ${gameDay} COMPLETE. Accuracy: ${accuracy}%`);
    } else {
      setCurrentApplicantIndex((prev) => prev + 1);
    }
  };

  if (!currentApplicant) {
    return (
      <div className="size-full bg-black text-[#00ff00] font-mono flex items-center justify-center">
        <div className="text-center">
          <div className="text-3xl font-bold mb-4">DAY {gameDay} COMPLETE</div>
          <div className="space-y-2">
            <div>Approved: {stats.approved}</div>
            <div>Denied: {stats.denied}</div>
            <div>Correct Decisions: {stats.correct}</div>
            <div>Mistakes: {stats.mistakes}</div>
            <div className="mt-4 text-cyan-400">
              Accuracy: {((stats.correct / (stats.approved + stats.denied)) * 100).toFixed(1)}%
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="size-full bg-gray-900 text-white font-mono flex flex-col">
      {/* Header */}
      <div className="bg-black border-b-2 border-[#00ff00] p-4 flex justify-between items-center">
        <div>
          <div className="text-2xl font-bold text-[#00ff00]">ARX GATE BORDER CONTROL</div>
          <div className="text-sm text-gray-400">
            Day {gameDay} | Applicant {currentApplicantIndex + 1} / {applicants.length}
          </div>
        </div>
        <div className="text-right text-sm">
          <div className="text-green-500">Approved: {stats.approved}</div>
          <div className="text-red-500">Denied: {stats.denied}</div>
          <div className="text-yellow-500">Mistakes: {stats.mistakes}</div>
        </div>
      </div>

      {/* Main Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Side - Document List */}
        <div className="w-64 bg-gray-800 border-r border-gray-700 p-4 overflow-y-auto">
          <div className="mb-4">
            <div className="text-lg font-bold text-cyan-400 mb-2">APPLICANT DOCUMENTS</div>
            <div className="text-xs text-gray-500">
              {currentApplicant.person.firstName} {currentApplicant.person.lastName}
            </div>
            <div className="text-xs text-gray-500">{currentApplicant.person.nationality}</div>
          </div>

          <div className="space-y-2">
            {currentApplicant.documents.map((doc, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedDocument(doc)}
                className={`w-full text-left p-3 border rounded transition-colors ${
                  selectedDocument === doc
                    ? 'bg-cyan-600 border-cyan-400 text-white'
                    : 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600'
                }`}
              >
                <div className="font-bold">{doc.type.toUpperCase()}</div>
                <div className="text-xs">{'number' in doc ? doc.number : ''}</div>
              </button>
            ))}
          </div>

          <div className="mt-6 p-3 bg-gray-700 border border-yellow-600 rounded text-xs">
            <div className="font-bold text-yellow-400 mb-2">INSPECTION RULES:</div>
            <ul className="space-y-1 text-gray-300">
              <li>• Check document expiry dates</li>
              <li>• Verify names match across documents</li>
              <li>• Vaccination certificate required</li>
              <li>• Photo must match applicant</li>
            </ul>
          </div>
        </div>

        {/* Center - Document View */}
        <div className="flex-1 bg-gray-900 p-8 overflow-y-auto flex items-center justify-center">
          {selectedDocument ? (
            <DocumentView document={selectedDocument} person={currentApplicant.person} />
          ) : (
            <div className="text-gray-600 text-center">
              <div className="text-4xl mb-4">📄</div>
              <div>Select a document to inspect</div>
            </div>
          )}
        </div>

        {/* Right Side - Controls */}
        <div className="w-64 bg-gray-800 border-l border-gray-700 p-4 flex flex-col">
          <div className="text-lg font-bold text-cyan-400 mb-4">DECISION</div>

          <div className="flex-1">
            <div className="space-y-4">
              <button
                onClick={handleApprove}
                disabled={!!feedback}
                className="w-full bg-green-600 hover:bg-green-500 disabled:bg-gray-600 text-white font-bold py-4 px-6 rounded text-lg transition-colors"
              >
                ✓ APPROVE
              </button>

              <button
                onClick={handleDeny}
                disabled={!!feedback}
                className="w-full bg-red-600 hover:bg-red-500 disabled:bg-gray-600 text-white font-bold py-4 px-6 rounded text-lg transition-colors"
              >
                ✗ DENY
              </button>
            </div>

            {feedback && (
              <div
                className={`mt-6 p-4 border-2 rounded ${
                  feedback.includes('✓')
                    ? 'bg-green-950 border-green-500 text-green-400'
                    : 'bg-red-950 border-red-500 text-red-400'
                }`}
              >
                {feedback}
              </div>
            )}
          </div>

          <div className="text-xs text-gray-600 border-t border-gray-700 pt-4 mt-4">
            <div>Today's Date: 2025-12-20</div>
            <div className="mt-2 text-gray-500 italic">"The system is watching."</div>
          </div>
        </div>
      </div>
    </div>
  );
}
