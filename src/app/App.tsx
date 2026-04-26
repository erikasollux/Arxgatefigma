import { useState, useEffect } from 'react';
import BootScreen from './components/BootScreen';
import Layer0DevCode from './components/Layer0DevCode';
import Layer1ReverseCaptcha from './components/Layer1ReverseCaptcha';
import Layer2QRPuzzle from './components/Layer2QRPuzzle';
import Layer3Jigsaw from './components/Layer3Jigsaw';
import Layer4MultiQR from './components/Layer4MultiQR';
import Layer5Noise from './components/Layer5Noise';
import SecretConsole from './components/SecretConsole';
import InspectionInterface from './components/InspectionInterface';

type GamePhase =
  | 'boot'
  | 'layer0'
  | 'layer1'
  | 'layer2'
  | 'layer3'
  | 'layer4'
  | 'layer5'
  | 'console'
  | 'inspection';

export default function App() {
  const [phase, setPhase] = useState<GamePhase>('boot');
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Boot screen shows for 3 seconds, then moves to Layer 0
    if (phase === 'boot') {
      const timer = setTimeout(() => {
        setShowContent(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [phase]);

  const handleBootComplete = () => {
    setPhase('layer0');
  };

  const handleLayer0Complete = () => {
    setPhase('layer1');
  };

  const handleLayer1Complete = () => {
    setPhase('layer2');
  };

  const handleLayer2Complete = () => {
    setPhase('layer3');
  };

  const handleLayer3Complete = () => {
    setPhase('layer4');
  };

  const handleLayer4Complete = () => {
    setPhase('layer5');
  };

  const handleLayer5Complete = () => {
    setPhase('console');
  };

  const handleConsoleComplete = () => {
    setPhase('inspection');
  };

  return (
    <div className="size-full bg-black text-white font-mono overflow-hidden">
      {phase === 'boot' && (
        <BootScreen onComplete={handleBootComplete} showContent={showContent} />
      )}
      {phase === 'layer0' && <Layer0DevCode onComplete={handleLayer0Complete} />}
      {phase === 'layer1' && <Layer1ReverseCaptcha onComplete={handleLayer1Complete} />}
      {phase === 'layer2' && <Layer2QRPuzzle onComplete={handleLayer2Complete} />}
      {phase === 'layer3' && <Layer3Jigsaw onComplete={handleLayer3Complete} />}
      {phase === 'layer4' && <Layer4MultiQR onComplete={handleLayer4Complete} />}
      {phase === 'layer5' && <Layer5Noise onComplete={handleLayer5Complete} />}
      {phase === 'console' && <SecretConsole onComplete={handleConsoleComplete} />}
      {phase === 'inspection' && <InspectionInterface />}
    </div>
  );
}
