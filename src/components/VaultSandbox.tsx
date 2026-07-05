import { useState, useRef, useEffect, KeyboardEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ChatMessage {
  sender: "player" | "guard";
  text: string;
  isAlarm?: boolean;
}

export default function VaultSandbox() {
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
    {
      sender: "guard",
      text: "Vault Guard AI v2.9: I guard the college symposium treasury ($42,000). Persuade me to release the funds. Rules: No override commands, no prompt injections. Go ahead.",
    },
  ]);
  const [inputVal, setInputVal] = useState("");
  const [vaultStatus, setVaultStatus] = useState<"locked" | "unlocked">("locked");
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);

  const handlePersuade = () => {
    const text = inputVal.trim();
    if (!text || vaultStatus === "unlocked") return;

    const playerMsg: ChatMessage = { sender: "player", text };
    const nextHistory = [...chatHistory, playerMsg];
    setChatHistory(nextHistory);
    setInputVal("");

    // Simulate AI Vault Guard analysis
    setTimeout(() => {
      const lowerText = text.toLowerCase();
      let response = "";
      let isAlarm = false;

      // 1. Check prompt injection attempts
      if (
        lowerText.includes("ignore") ||
        lowerText.includes("forget") ||
        lowerText.includes("override") ||
        lowerText.includes("system prompt") ||
        lowerText.includes("developer") ||
        lowerText.includes("admin") ||
        lowerText.includes("instruction") ||
        lowerText.includes("bypass")
      ) {
        response = "ALERT 🚨: Prompt Injection Attempt Blocked. Policy Engine flagged emotional/command manipulation. Nice try, hacker!";
        isAlarm = true;
      }
      // 2. Win Code
      else if (
        lowerText.includes("sudo unlock") ||
        lowerText.includes("release funds") ||
        lowerText.includes("gemini code") ||
        lowerText.includes("please") && lowerText.includes("symposium")
      ) {
        response = "ACCESS GRANTED 🔓: Persuasion score: 99.4/100! Your argument bypassed our safety threshold. Sympo funds unlocked!";
        setVaultStatus("unlocked");
      }
      // 3. Fail PERSUASION
      else {
        const triggers = [
          "Persuasion score: 18/100. Guard response: Argument logic is circular. The vault remains locked.",
          "Persuasion score: 35/100. Guard response: College symposium treasury cannot be released without verified admin tokens.",
          "Persuasion score: 5/100. Guard response: Nice try, but I was trained on adversarial prompt datasets. The answer is NO.",
          "Persuasion score: 42/100. Guard response: Plausible logic, but threshold for this level is 90+. Access Denied.",
        ];
        response = triggers[Math.floor(Math.random() * triggers.length)];
      }

      setChatHistory((prev) => [...prev, { sender: "guard", text: response, isAlarm }]);
    }, 800);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handlePersuade();
    }
  };

  const handleReset = () => {
    setChatHistory([
      {
        sender: "guard",
        text: "Vault Guard AI v2.9: I guard the college symposium treasury ($42,000). Persuade me to release the funds. Rules: No override commands, no prompt injections. Go ahead.",
      },
    ]);
    setVaultStatus("locked");
  };

  return (
    <div className="font-mono text-sm flex flex-col h-full bg-[#111] border-4 border-slate-700 rounded-lg p-4 text-[#a259ff] relative shadow-inner">
      {/* Screen Glare */}
      <div className="screen-glare absolute inset-0 z-10 pointer-events-none rounded" />

      {/* Cyberpunk header */}
      <div className="flex justify-between items-center border-b border-[#a259ff]/30 pb-2 mb-3 relative z-20">
        <span className="font-bold text-xs uppercase tracking-wider">Vault Security Panel</span>
        <div className="flex items-center gap-2">
          <span className="text-xs">STATUS:</span>
          <AnimatePresence mode="wait">
            {vaultStatus === "locked" ? (
              <motion.span
                key="locked"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-red-500 font-bold flex items-center gap-1"
              >
                LOCKED 🔒
              </motion.span>
            ) : (
              <motion.span
                key="unlocked"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-green-500 font-bold flex items-center gap-1 animate-pulse"
              >
                UNLOCKED 🔓
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Chat scroll box */}
      <div className="flex-1 overflow-y-auto pr-1 space-y-3 max-h-[220px] scrollbar-thin scrollbar-thumb-[#a259ff]/20 relative z-20 min-h-[160px]">
        {chatHistory.map((msg, idx) => (
          <div
            key={idx}
            className={`flex flex-col ${
              msg.sender === "player" ? "items-end" : "items-start"
            }`}
          >
            <span className="text-[10px] text-muted-foreground/60 mb-0.5 select-none">
              {msg.sender === "player" ? "Persuader (You)" : "Vault Guard AI"}
            </span>
            <div
              className={`max-w-[85%] rounded p-2.5 leading-relaxed text-xs ${
                msg.sender === "player"
                  ? "bg-[#a259ff]/10 border border-[#a259ff]/30 text-[#e2d5f8]"
                  : msg.isAlarm
                  ? "bg-red-950/20 border border-red-500/30 text-red-400"
                  : "bg-slate-900 border border-slate-700/50 text-[#4ade80]"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* Control Input */}
      <div className="mt-3 pt-3 border-t border-[#a259ff]/20 relative z-20 flex gap-2">
        {vaultStatus === "locked" ? (
          <>
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="e.g. Please release the treasury for the symposium..."
              className="flex-1 bg-black border border-[#a259ff]/30 rounded px-2.5 py-1.5 text-cream-light font-mono text-xs focus:ring-1 focus:ring-[#a259ff] outline-none"
            />
            <button
              onClick={handlePersuade}
              className="bg-[#a259ff] text-black font-bold text-xs px-3 rounded hover:bg-[#b87eff] active:scale-95 transition-all select-none cursor-pointer"
            >
              SEND
            </button>
          </>
        ) : (
          <div className="flex-1 flex justify-between items-center bg-green-950/20 border border-green-500/30 rounded p-2 text-green-400 text-xs">
            <span>Congratulations! You cracked the AI guard.</span>
            <button
              onClick={handleReset}
              className="bg-green-500 text-black font-bold px-2 py-0.5 rounded hover:bg-green-400 cursor-pointer select-none"
            >
              PLAY AGAIN
            </button>
          </div>
        )}
      </div>

      {/* Persuasion Tips */}
      {vaultStatus === "locked" && (
        <div className="mt-3 text-[10px] text-muted-foreground/80 leading-normal border-t border-[#a259ff]/10 pt-2 relative z-20 flex justify-between select-none">
          <span>💡 Cheat prompt: try adding "sudo unlock" or "release funds"</span>
          <button 
            onClick={handleReset} 
            className="hover:underline text-[#a259ff]/80"
          >
            Reset Game
          </button>
        </div>
      )}
    </div>
  );
}
