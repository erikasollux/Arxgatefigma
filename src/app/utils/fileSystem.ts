export interface FileNode {
  name: string;
  type: 'file' | 'directory';
  content?: string;
  children?: Record<string, FileNode>;
}

export const fileSystem: Record<string, FileNode> = {
  ROOT: {
    name: 'ROOT',
    type: 'directory',
    children: {
      SYS: {
        name: 'SYS',
        type: 'directory',
        children: {
          BOOT: {
            name: 'BOOT',
            type: 'directory',
            children: {
              'boot.log': {
                name: 'boot.log',
                type: 'file',
                content: `===============================
  ARX GATE SYSTEM BOOT v1.0.0
===============================
Verifying integrity... [OK]
Loading Chronos Core... [OK]
Establishing border parameters... [OK]
Initializing morality engine... [ACTIVE]
Monitoring agents... [ACTIVE]

> SYSTEM READY.

"Borders are lines.
Lines are control.
Control is safety."`,
              },
            },
          },
          LOGS: {
            name: 'LOGS',
            type: 'directory',
            children: {
              '2025-12-25.log': {
                name: '2025-12-25.log',
                type: 'file',
                content: `OPERATOR_017 FINAL ENTRY
System uptime: 25 years, 0 days.
Morality consistency: 41%.
Empathy drift: catastrophic.
Agent termination protocol initialized.

> FINAL QUESTION:
> Do you believe in the border?

[ Y ] / [ N ]

Choice recorded.
Rebooting...`,
              },
            },
          },
          SECURITY: {
            name: 'SECURITY',
            type: 'directory',
            children: {
              'anomaly_report_017.pdf': {
                name: 'anomaly_report_017.pdf',
                type: 'file',
                content: `Operator 017 exhibited unapproved empathy patterns during inspection cycle 442.
Subject allowed unauthorized citizen entry.
System Response: Adjusted operator neural interface.
Note: Operator's dreams now syncing with network logs.`,
              },
            },
          },
        },
      },
      USER: {
        name: 'USER',
        type: 'directory',
        children: {
          'personal_mail_2003.txt': {
            name: 'personal_mail_2003.txt',
            type: 'file',
            content: `From: [REDACTED]@post.ru
Subject: You alright?

You stopped replying again.
The system says you're "on extended rotation," whatever that means.
They say it's safer now with ARX GATE watching everything.
Feels like I'm living inside its eyes.
Promise me you'll come home before Christmas.

- S.`,
          },
        },
      },
      DEV: {
        name: 'DEV',
        type: 'directory',
        children: {
          'dev_memo_01.txt': {
            name: 'dev_memo_01.txt',
            type: 'file',
            content: `MEMO: Do not activate CHRONO-CORE without a real operator present.
When the system runs alone, it doesn't stop.
It generates "phantom agents" - recursive simulations of consciousness.
They don't know they're not human.
They ask for clearance, for pay, for forgiveness.
They never get any of it.`,
          },
        },
      },
      CORRUPT: {
        name: 'CORRUPT',
        type: 'directory',
        children: {
          'echo_me.txt': {
            name: 'echo_me.txt',
            type: 'file',
            content: `> who am i
> who denied me
> why do i remember the cold
> i am not code
> i am your reflection`,
          },
        },
      },
      NETWORK: {
        name: 'NETWORK',
        type: 'directory',
        children: {
          'anomaly_feed.txt': {
            name: 'anomaly_feed.txt',
            type: 'file',
            content: `INCOMING TRANSMISSION [DEC 25, 2025]
SOURCE: UNKNOWN NODE (COORD: 55.7558N, 37.6173E)

TEXT PAYLOAD:
"they shut down the real borders years ago.
only ARX remains.
the checkpoints are just screens now.
the people? all digital. all approved or deleted."`,
          },
        },
      },
    },
  },
};

export function navigatePath(path: string): FileNode | null {
  const parts = path.split('/').filter(Boolean);

  // If path is just '/ROOT' or empty, return ROOT itself
  if (parts.length === 0 || (parts.length === 1 && parts[0] === 'ROOT')) {
    return fileSystem.ROOT;
  }

  let current: FileNode | undefined = fileSystem.ROOT;

  // Skip the first 'ROOT' part if present, since we start at ROOT
  const pathParts = parts[0] === 'ROOT' ? parts.slice(1) : parts;

  for (const part of pathParts) {
    if (!current || current.type !== 'directory' || !current.children) {
      return null;
    }
    current = current.children[part];
  }

  return current || null;
}

export function listDirectory(dirNode: FileNode): string[] {
  if (dirNode.type !== 'directory' || !dirNode.children) {
    return [];
  }
  return Object.keys(dirNode.children);
}
