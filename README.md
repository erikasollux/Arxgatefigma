
# App Complexity Clarification

An interactive, multi-layer puzzle game built with React and Vite, themed around a dystopian border control system called **ARX GATE** — inspired by the game *Papers, Please*. The original Figma project is available at https://www.figma.com/design/0pELjh6pN5PhvdCkLG3Dml/App-complexity-clarification.

---

## What is this?

The application presents players with a series of escalating challenges they must solve to gain access to a document inspection terminal. Each layer introduces a new puzzle mechanic, culminating in a "Papers, Please"-style applicant review workflow where the player approves or denies border crossing based on document validity.

The narrative is embedded in a virtual file system and themed UI: an unnamed operator gradually loses autonomy to the ARX GATE system, raising questions about control and identity.

---

## Game Flow

The application progresses through 9 phases managed by `src/app/App.tsx`:

| Phase | Component | Description |
|---|---|---|
| `boot` | `BootScreen` | Typewriter-effect system initialization sequence |
| `layer0` | `Layer0DevCode` | Developer key validation (Windows 95-style product code) |
| `layer1` | `Layer1ReverseCaptcha` | Reverse CAPTCHA: prove humanity by being *intentionally imperfect* |
| `layer2` | `Layer2QRPuzzle` | QR code decryption using ROT13 cipher (encodes "GATEWAY") |
| `layer3` | `Layer3Jigsaw` | Pattern matching with 10 pairs (acrostics, hex, anagrams, reversed text) |
| `layer4` | `Layer4MultiQR` | Multi-encoding breach: 5 QR fragments, coordinate sums, audio clues |
| `layer5` | `Layer5Noise` | Find 5 hidden codes embedded in animated canvas static noise |
| `console` | `SecretConsole` | Virtual DOS-like console with a navigable file system |
| `inspection` | `InspectionInterface` | Approve or deny 5 applicants based on document validity |

---

## Key Features

- **Multi-layer puzzle game** with unique mechanics per stage
- **Virtual file system** (`SecretConsole`) with commands: `DIR`, `CD`, `TYPE`, `HELP`, `STATUS`, `SECRET_COMMAND`
- **Document inspection** workflow — check passport expiry, name matches, vaccination certificates, visas
- **54 shadcn/ui components** for a polished, accessible UI
- **Dark dystopian narrative** embedded in virtual file system logs

---

## Project Structure

```
/
├── src/
│   ├── main.tsx                   # React entry point
│   └── app/
│       ├── App.tsx                # Phase state management (9 phases)
│       ├── components/
│       │   ├── BootScreen.tsx
│       │   ├── Layer0DevCode.tsx
│       │   ├── Layer1ReverseCaptcha.tsx
│       │   ├── Layer2QRPuzzle.tsx
│       │   ├── Layer3Jigsaw.tsx
│       │   ├── Layer4MultiQR.tsx
│       │   ├── Layer5Noise.tsx
│       │   ├── SecretConsole.tsx
│       │   ├── InspectionInterface.tsx
│       │   ├── DocumentView.tsx
│       │   ├── figma/             # Figma-specific image component
│       │   └── ui/                # shadcn/ui component library (54 components)
│       ├── data/
│       │   └── applicants.ts      # 5 test applicants with document issues
│       ├── types/
│       │   └── documents.ts       # TypeScript interfaces for all document types
│       └── utils/
│           └── fileSystem.ts      # Virtual file system simulation
├── src/styles/
│   ├── index.css                  # Main style entry
│   ├── theme.css                  # Tailwind v4 theme (OKLCH color space)
│   ├── tailwind.css               # Tailwind imports
│   └── fonts.css                  # Font definitions
├── index.html                     # HTML entry point
├── vite.config.ts                 # Vite config with Figma asset resolver
├── package.json
└── pnpm-workspace.yaml
```

---

## Tech Stack

| Category | Libraries |
|---|---|
| Framework | React 18, Vite 6 |
| Styling | Tailwind CSS v4, Radix UI, shadcn/ui, MUI v7, Emotion |
| QR Codes | `qrcode.react`, `jsqr` |
| Drag & Drop | `react-dnd` |
| Forms | `react-hook-form` |
| Animation | `motion`, `canvas-confetti` |
| Charts | `recharts` |
| Routing | `react-router` v7 |
| Utilities | `clsx`, `tailwind-merge`, `date-fns`, `cmdk`, `sonner` |
| Package Manager | pnpm |

---

## Running the Code

Install dependencies:

```bash
npm install
# or
pnpm install
```

Start the development server:

```bash
npm run dev
# or
pnpm dev
```

Build for production:

```bash
npm run build
```
