import { useState, useRef, useEffect } from 'react';
import { navigatePath, listDirectory } from '../utils/fileSystem';

interface SecretConsoleProps {
  onComplete: () => void;
}

interface ConsoleOutput {
  text: string;
  type: 'command' | 'output' | 'error';
}

export default function SecretConsole({ onComplete }: SecretConsoleProps) {
  const [currentPath, setCurrentPath] = useState('/ROOT');
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<ConsoleOutput[]>([
    {
      text: '===============================',
      type: 'output',
    },
    {
      text: '  SECRET CONSOLE ACCESS GRANTED',
      type: 'output',
    },
    {
      text: '===============================',
      type: 'output',
    },
    {
      text: 'OS Version: ARX GATE v1.0.0-DEV',
      type: 'output',
    },
    {
      text: 'User: VERIFIED',
      type: 'output',
    },
    {
      text: 'Ready for Command:',
      type: 'output',
    },
    {
      text: '',
      type: 'output',
    },
  ]);

  const outputRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [secretCommandEntered, setSecretCommandEntered] = useState(false);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [history]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const addOutput = (text: string, type: ConsoleOutput['type'] = 'output') => {
    setHistory((prev) => [...prev, { text, type }]);
  };

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;

    addOutput(`> ${trimmed}`, 'command');

    const parts = trimmed.split(' ');
    const command = parts[0].toUpperCase();
    const args = parts.slice(1);

    switch (command) {
      case 'HELP':
        addOutput('Available commands:');
        addOutput('  HELP - List all commands');
        addOutput('  DIR / LS - Show files in current directory');
        addOutput('  CD <folder> - Navigate to folder');
        addOutput('  TYPE <filename> - Display file contents');
        addOutput('  CLEAR - Clear console');
        addOutput('  STATUS - Show system status');
        addOutput('  SECRET_COMMAND - Access the game (requires code)');
        break;

      case 'DIR':
      case 'LS':
        {
          const node = navigatePath(currentPath);
          if (node && node.type === 'directory') {
            const items = listDirectory(node);
            addOutput(`Directory of ${currentPath}:`);
            items.forEach((item) => {
              const childNode = node.children?.[item];
              const type = childNode?.type === 'directory' ? '<DIR>' : '';
              addOutput(`  ${type} ${item}`);
            });
          } else {
            addOutput('Error: Current path is not a directory', 'error');
          }
        }
        break;

      case 'CD':
        {
          if (args.length === 0) {
            addOutput(`Current directory: ${currentPath}`);
          } else {
            const target = args[0];
            let newPath: string;

            if (target === '..') {
              const parts = currentPath.split('/').filter(Boolean);
              parts.pop();
              newPath = '/' + parts.join('/');
            } else if (target.startsWith('/')) {
              newPath = target;
            } else {
              newPath = `${currentPath}/${target}`.replace('//', '/');
            }

            const node = navigatePath(newPath);
            if (node && node.type === 'directory') {
              setCurrentPath(newPath);
              addOutput(`Changed directory to ${newPath}`);
            } else {
              addOutput(`Error: Directory not found: ${target}`, 'error');
            }
          }
        }
        break;

      case 'TYPE':
        {
          if (args.length === 0) {
            addOutput('Error: No filename specified', 'error');
          } else {
            const filename = args[0];
            const node = navigatePath(currentPath);

            if (node && node.type === 'directory' && node.children) {
              const file = node.children[filename];
              if (file && file.type === 'file' && file.content) {
                addOutput('');
                file.content.split('\n').forEach((line) => addOutput(line));
                addOutput('');
              } else {
                addOutput(`Error: File not found: ${filename}`, 'error');
              }
            }
          }
        }
        break;

      case 'CLEAR':
        setHistory([]);
        break;

      case 'STATUS':
        addOutput('System Status:');
        addOutput('  OS: ARX GATE v1.0.0-DEV');
        addOutput('  User: Operator_018');
        addOutput('  Layer Completion: 5/5');
        addOutput('  Empathy Drift: 0%');
        addOutput('  Console Access: GRANTED');
        break;

      case 'SECRET_COMMAND':
        {
          if (args.length === 0) {
            addOutput('Error: Code required', 'error');
            addOutput('Hint: Check the files for clues...', 'error');
          } else {
            const code = args.join(' ').toUpperCase();
            if (code === 'BEGIN' || code === 'START' || code === 'INSPECTION') {
              setSecretCommandEntered(true);
              addOutput('');
              addOutput('✓ CODE ACCEPTED');
              addOutput('Initializing Border Control Interface...');
              addOutput('Loading inspection protocols...');
              addOutput('');
              setTimeout(onComplete, 2000);
            } else {
              addOutput('⚠ Invalid code', 'error');
            }
          }
        }
        break;

      default:
        addOutput(`Unknown command: ${command}. Type HELP for available commands.`, 'error');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      handleCommand(input);
      setInput('');
    }
  };

  return (
    <div className="size-full bg-black text-[#00ff00] font-mono flex flex-col p-4">
      {/* Console Header */}
      <div className="text-center border-b border-[#00ff00] pb-2 mb-4">
        <div className="text-xl font-bold">ARX GATE SECRET CONSOLE</div>
        <div className="text-sm text-cyan-400">Type HELP for available commands</div>
      </div>

      {/* Output Area */}
      <div
        ref={outputRef}
        className="flex-1 overflow-y-auto space-y-1 mb-4 pr-2 scrollbar-thin scrollbar-thumb-[#00ff00] scrollbar-track-black"
      >
        {history.map((item, idx) => (
          <div
            key={idx}
            className={`${
              item.type === 'command'
                ? 'text-cyan-400 font-bold'
                : item.type === 'error'
                ? 'text-red-500'
                : 'text-[#00ff00]'
            }`}
          >
            {item.text || '\u00A0'}
          </div>
        ))}
      </div>

      {/* Input Area */}
      <form onSubmit={handleSubmit} className="flex items-center gap-2 border-t border-[#00ff00] pt-2">
        <span className="text-cyan-400">{currentPath}&gt;</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 bg-black text-[#00ff00] outline-none font-mono"
          autoFocus
        />
        <div className="w-2 h-4 bg-[#00ff00] animate-pulse"></div>
      </form>

      {!secretCommandEntered && (
        <div className="mt-4 text-xs text-gray-600 text-center border-t border-gray-800 pt-2">
          Hint: Explore the file system. Use SECRET_COMMAND when you find the code to proceed.
          <div className="text-cyan-400 mt-1">(Try: SECRET_COMMAND BEGIN)</div>
        </div>
      )}
    </div>
  );
}
