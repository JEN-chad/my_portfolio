import { useState, useRef, useEffect, KeyboardEvent } from "react";

interface LogLine {
  type: "input" | "output" | "error";
  text: string;
}

export default function InteractiveTerminal() {
  const [history, setHistory] = useState<LogLine[]>([
    { type: "output", text: "Welcome to Jenish's CRT-Term v1.42" },
    { type: "output", text: "Type 'help' or click a command tag below to begin." },
  ]);
  const [inputValue, setInputValue] = useState("");
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll on new output
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const focusInput = () => {
    inputRef.current?.focus();
  };

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    if (!trimmedCmd) return;

    const newHistory = [...history, { type: "input" as const, text: cmd }];

    if (trimmedCmd === "codesentry check") {
      setHistory([
        ...newHistory,
        {
          type: "output",
          text: `Scanning last commit (2 files changed)...
Searching for security vulnerabilities...

[!] VULNERABILITY FOUND in src/config/database.ts:L14
    Pattern: Hardcoded Secret (AWS Client Key)
    Vulnerability: High Risk
    Code: const AWS_SECRET_KEY = "AKIAIOSFODNN7EXAMPLE";
    
[!] VULNERABILITY FOUND in src/controllers/user.ts:L42
    Pattern: SQL Injection (Unsafe query concatenation)
    Vulnerability: Critical Risk
    Code: db.execute("SELECT * FROM users WHERE id = '" + req.query.id + "'");

Scan complete. 2 vulnerabilities detected in 0.38s.
Type 'codesentry fix' to generate AI prompt remedies.`,
        },
      ]);
    } else if (trimmedCmd === "codesentry fix") {
      setHistory([
        ...newHistory,
        {
          type: "output",
          text: `Generating Claude/ChatGPT security fix prompt...

Drop this prompt into your AI Assistant to fix the issues:
-------------------------------------------------------------
Please refactor the following code to resolve security vulnerabilities:
1. Hardcoded secret key in database.ts (use process.env).
2. SQL injection vulnerability in user.ts (use parameterized inputs).

Code:
const AWS_SECRET_KEY = "AKIAIOSFODNN7EXAMPLE";
db.execute("SELECT * FROM users WHERE id = '" + req.query.id + "'");
-------------------------------------------------------------`,
        },
      ]);
    } else {
      switch (trimmedCmd) {
        case "help":
          setHistory([
            ...newHistory,
            {
              type: "output",
              text: `Available commands:
  help            - Display this help information
  about           - Learn more about Jenish
  skills          - Print developer skill tree
  projects        - Show the 7 actual projects
  codesentry check - Run CLI security scan demo
  codesentry fix   - Generate AI prompt remedy
  coffee          - Dispense retro caffeine
  clear           - Clean the screen`,
            },
          ]);
          break;
        case "about":
          setHistory([
            ...newHistory,
            {
              type: "output",
              text: `Jenish J - AI Developer & Creative Builder
Based in Chennai, India.
I build intelligent automation pipelines, design bioinformatics RL environments, 
and engineer secure web applications with a scrapbook soul.`,
            },
          ]);
          break;
        case "skills":
          setHistory([
            ...newHistory,
            {
              type: "output",
              text: `Jenish's Skill Stack
├── Languages: TS, JS, Python, HTML, CSS
├── Frontend: React, Next.js, Vue, Tailwind CSS
├── AI & ML: Google Gemini, Vertex AI, OpenEnv, OpenAI API
└── Backend: Node.js, Express, Drizzle ORM, Docker, PostgreSQL`,
            },
          ]);
          break;
        case "projects":
          setHistory([
            ...newHistory,
            {
              type: "output",
              text: `Actual Projects List:
1. HireMindAI - AI-Native Recruitment OS
2. codesentry - Real-time security CLI scanner
3. OncoEnv - Procedural Bioinformatics RL Environment
4. Crack The Vault - LLM security Prompt Injection game
5. DevFlow - Real-time Agile Project SaaS with GitHub Sync
6. CollabBoard - Collaborative Board with Optimistic UI
7. SupportDesk - Multi-Tenant Ticketing Platform`,
            },
          ]);
          break;
        case "coffee":
          setHistory([
            ...newHistory,
            {
              type: "output",
              text: `    (  )   (  )
     )  (   )  (
    [__________]
     |        |==)
     |  COFFEE|  )
     |________|==)
    (__________)
Caffeine level: 100%
"Ready to scan some AI code!"`,
            },
          ]);
          break;
        case "clear":
          setHistory([]);
          break;
        default:
          setHistory([
            ...newHistory,
            {
              type: "error",
              text: `command not found: '${cmd}'. Type 'help' for options.`,
            },
          ]);
          break;
      }
    }
    setInputValue("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCommand(inputValue);
    }
  };

  return (
    <div className="font-mono text-sm flex flex-col h-full select-text text-terminal-green">
      {/* Scrollable Shell Logs */}
      <div 
        onClick={focusInput}
        className="flex-1 overflow-y-auto pr-1 space-y-2 max-h-[220px] scrollbar-thin scrollbar-thumb-terminal-green/20"
      >
        {history.map((line, idx) => (
          <div key={idx} className="whitespace-pre-wrap leading-relaxed">
            {line.type === "input" ? (
              <span>
                <span className="text-[#a259ff]">visitor@jenish-term:~$</span>{" "}
                <span className="text-cream-light">{line.text}</span>
              </span>
            ) : line.type === "error" ? (
              <span className="text-red-400">{line.text}</span>
            ) : (
              <span className="text-cream-light/90">{line.text}</span>
            )}
          </div>
        ))}
        <div ref={terminalEndRef} />
      </div>

      {/* Input Prompt */}
      <div className="flex items-center gap-2 mt-2 pt-2 border-t border-terminal-green/20">
        <span className="text-[#a259ff] shrink-0">visitor@jenish-term:~$</span>
        <div className="flex-1 flex items-center relative">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full bg-transparent outline-none border-none p-0 text-cream-light font-mono focus:ring-0 focus:outline-none"
            autoFocus
          />
          {inputValue === "" && (
            <span className="absolute left-0 text-terminal-green animate-pulse">_</span>
          )}
        </div>
      </div>

      {/* Quick Command Pills for mobile & easy click */}
      <div className="flex flex-wrap gap-2 mt-4 pt-3 border-t border-terminal-green/10">
        {["help", "skills", "projects", "codesentry check", "codesentry fix", "clear"].map((tag) => (
          <button
            key={tag}
            onClick={() => handleCommand(tag)}
            className="text-xs border border-terminal-green/30 px-2 py-0.5 rounded hover:bg-terminal-green/20 hover:text-white transition-colors cursor-pointer select-none font-mono"
          >
            [{tag}]
          </button>
        ))}
      </div>
    </div>
  );
}
