import { Document, Person } from '../types/documents';

interface DocumentViewProps {
  document: Document;
  person: Person;
}

export default function DocumentView({ document, person }: DocumentViewProps) {
  if (document.type === 'passport') {
    return (
      <div className="w-full max-w-2xl bg-gradient-to-br from-red-900 to-red-950 border-4 border-yellow-700 rounded-lg p-8 shadow-2xl">
        <div className="text-center mb-6">
          <div className="text-3xl font-bold text-yellow-400">PASSPORT</div>
          <div className="text-sm text-gray-300">{document.nationality}</div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-1">
            <div className="w-32 h-40 rounded border-2 border-gray-600 flex items-center justify-center text-6xl" style={{ backgroundColor: document.photo }}>
              {document.gender === 'M' ? '👨' : '👩'}
            </div>
          </div>

          <div className="col-span-2 space-y-3 text-sm">
            <div>
              <div className="text-gray-400 text-xs">SURNAME</div>
              <div className="font-bold text-lg">{document.lastName}</div>
            </div>
            <div>
              <div className="text-gray-400 text-xs">GIVEN NAMES</div>
              <div className="font-bold text-lg">{document.firstName}</div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-gray-400 text-xs">SEX</div>
                <div className="font-bold">{document.gender}</div>
              </div>
              <div>
                <div className="text-gray-400 text-xs">DATE OF BIRTH</div>
                <div className="font-bold">{document.dateOfBirth}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-4 text-sm border-t border-gray-600 pt-4">
          <div>
            <div className="text-gray-400 text-xs">PASSPORT NO.</div>
            <div className="font-mono font-bold">{document.number}</div>
          </div>
          <div>
            <div className="text-gray-400 text-xs">DATE OF ISSUE</div>
            <div className="font-mono">{document.issueDate}</div>
          </div>
          <div>
            <div className="text-gray-400 text-xs">DATE OF EXPIRY</div>
            <div className="font-mono font-bold text-yellow-400">{document.expiryDate}</div>
          </div>
        </div>
      </div>
    );
  }

  if (document.type === 'identityCard') {
    return (
      <div className="w-full max-w-xl bg-gradient-to-br from-blue-900 to-blue-950 border-4 border-cyan-600 rounded-lg p-6 shadow-2xl">
        <div className="text-center mb-4">
          <div className="text-2xl font-bold text-cyan-400">IDENTITY CARD</div>
          <div className="text-xs text-gray-300">{document.nationality}</div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-1">
            <div className="w-24 h-32 rounded border-2 border-gray-600 flex items-center justify-center text-4xl" style={{ backgroundColor: document.photo }}>
              {document.gender === 'M' ? '👨' : '👩'}
            </div>
          </div>

          <div className="col-span-2 space-y-2 text-xs">
            <div>
              <div className="text-gray-400">NAME</div>
              <div className="font-bold">{document.firstName} {document.lastName}</div>
            </div>
            <div>
              <div className="text-gray-400">DATE OF BIRTH</div>
              <div className="font-bold">{document.dateOfBirth}</div>
            </div>
            <div>
              <div className="text-gray-400">SEX</div>
              <div className="font-bold">{document.gender}</div>
            </div>
            <div>
              <div className="text-gray-400">ID NUMBER</div>
              <div className="font-mono font-bold">{document.number}</div>
            </div>
            <div>
              <div className="text-gray-400">EXPIRES</div>
              <div className="font-mono text-cyan-400">{document.expiryDate}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (document.type === 'workPass') {
    return (
      <div className="w-full max-w-xl bg-gradient-to-br from-orange-900 to-orange-950 border-4 border-orange-600 rounded-lg p-6 shadow-2xl">
        <div className="text-center mb-4">
          <div className="text-2xl font-bold text-orange-400">WORK AUTHORIZATION</div>
        </div>

        <div className="space-y-3 text-sm">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-gray-400 text-xs">WORKER NAME</div>
              <div className="font-bold">{document.firstName} {document.lastName}</div>
            </div>
            <div>
              <div className="text-gray-400 text-xs">PASS NUMBER</div>
              <div className="font-mono font-bold">{document.number}</div>
            </div>
          </div>

          <div>
            <div className="text-gray-400 text-xs">EMPLOYER</div>
            <div className="font-bold text-orange-300">{document.employer}</div>
          </div>

          <div>
            <div className="text-gray-400 text-xs">OCCUPATION</div>
            <div className="font-bold">{document.occupation}</div>
          </div>

          <div className="grid grid-cols-2 gap-4 border-t border-gray-600 pt-3">
            <div>
              <div className="text-gray-400 text-xs">ISSUED</div>
              <div className="font-mono">{document.issueDate}</div>
            </div>
            <div>
              <div className="text-gray-400 text-xs">EXPIRES</div>
              <div className="font-mono text-orange-400">{document.expiryDate}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (document.type === 'vaccination') {
    return (
      <div className="w-full max-w-xl bg-gradient-to-br from-green-900 to-green-950 border-4 border-green-600 rounded-lg p-6 shadow-2xl">
        <div className="text-center mb-4">
          <div className="text-2xl font-bold text-green-400">VACCINATION CERTIFICATE</div>
          <div className="text-xs text-gray-300">International Health Organization</div>
        </div>

        <div className="space-y-3 text-sm">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-gray-400 text-xs">PATIENT NAME</div>
              <div className="font-bold">{document.firstName} {document.lastName}</div>
            </div>
            <div>
              <div className="text-gray-400 text-xs">CERTIFICATE NO.</div>
              <div className="font-mono font-bold">{document.number}</div>
            </div>
          </div>

          <div>
            <div className="text-gray-400 text-xs">VACCINE TYPE</div>
            <div className="font-bold text-green-300">{document.vaccineType}</div>
          </div>

          <div className="grid grid-cols-2 gap-4 border-t border-gray-600 pt-3">
            <div>
              <div className="text-gray-400 text-xs">DATE ADMINISTERED</div>
              <div className="font-mono">{document.dateAdministered}</div>
            </div>
            <div>
              <div className="text-gray-400 text-xs">VALID UNTIL</div>
              <div className="font-mono text-green-400">{document.expiryDate}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (document.type === 'visa') {
    return (
      <div className="w-full max-w-xl bg-gradient-to-br from-purple-900 to-purple-950 border-4 border-purple-600 rounded-lg p-6 shadow-2xl">
        <div className="text-center mb-4">
          <div className="text-2xl font-bold text-purple-400">ENTRY VISA</div>
        </div>

        <div className="space-y-3 text-sm">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-gray-400 text-xs">APPLICANT NAME</div>
              <div className="font-bold">{document.firstName} {document.lastName}</div>
            </div>
            <div>
              <div className="text-gray-400 text-xs">VISA NUMBER</div>
              <div className="font-mono font-bold">{document.number}</div>
            </div>
          </div>

          <div>
            <div className="text-gray-400 text-xs">PURPOSE OF VISIT</div>
            <div className="font-bold text-purple-300">{document.purpose}</div>
          </div>

          <div>
            <div className="text-gray-400 text-xs">DURATION OF STAY</div>
            <div className="font-bold">{document.duration}</div>
          </div>

          <div className="grid grid-cols-2 gap-4 border-t border-gray-600 pt-3">
            <div>
              <div className="text-gray-400 text-xs">ISSUED</div>
              <div className="font-mono">{document.issueDate}</div>
            </div>
            <div>
              <div className="text-gray-400 text-xs">EXPIRES</div>
              <div className="font-mono text-purple-400">{document.expiryDate}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <div>Unknown document type</div>;
}
