import { useState, useEffect } from "react";
import Header from "@/components/Header";
import BookBinder from "@/components/BookBinder";
import DoodleCursor from "@/components/DoodleCursor";
import { motion, AnimatePresence } from "framer-motion";

const Index = () => {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [isBookOpen, setIsBookOpen] = useState<boolean>(false);
  
  // Decryption state variables
  const [decrypted, setDecrypted] = useState<boolean>(() => {
    return sessionStorage.getItem("genesis_decrypted") === "true";
  });
  const [isDecrypting, setIsDecrypting] = useState<boolean>(false);
  const [bootLogs, setBootLogs] = useState<string[]>([]);
  const [progress, setProgress] = useState<number>(0);

  const logsSequence = [
    "Connecting to secure central command...",
    "Authenticating researcher credentials...",
    "Scanning credentials & biometric signatures... PASS",
    "Decrypting Project Genesis archives...",
    "Restoring neural memory cells... 100%",
    "Loading anomaly reports & failure archives... OK",
    "Recompiling engineering discoveries... OK",
    "ACCESS GRANTED. DECRYPTION KEY VALID."
  ];

  useEffect(() => {
    if (isDecrypting) {
      let currentLogIdx = 0;
      const logInterval = setInterval(() => {
        if (currentLogIdx < logsSequence.length) {
          setBootLogs(prev => [...prev, `[SYS_LOAD] ${logsSequence[currentLogIdx]}`]);
          setProgress(Math.round(((currentLogIdx + 1) / logsSequence.length) * 100));
          currentLogIdx++;
        } else {
          clearInterval(logInterval);
          setTimeout(() => {
            sessionStorage.setItem("genesis_decrypted", "true");
            sessionStorage.setItem("logbook_unlocked", "true"); // auto-unlock the binder too
            setDecrypted(true);
            setIsBookOpen(true);
          }, 1000);
        }
      }, 500);
      return () => clearInterval(logInterval);
    }
  }, [isDecrypting]);

  const handleStartDecryption = () => {
    setIsDecrypting(true);
  };

  const handleLockTerminal = () => {
    sessionStorage.removeItem("genesis_decrypted");
    sessionStorage.removeItem("logbook_unlocked");
    setDecrypted(false);
    setIsDecrypting(false);
    setBootLogs([]);
    setProgress(0);
    setIsBookOpen(false);
    setCurrentPage(0);
  };

  // Map header navigations directly to book spreads
  const handleNavigate = (target: "about" | "work" | "connect") => {
    if (!decrypted) return;
    setIsBookOpen(true);
    if (target === "about") {
      setCurrentPage(0);
    } else if (target === "work") {
      setCurrentPage(2);
    } else if (target === "connect") {
      setCurrentPage(4);
    }
  };

  return (
    <div className="min-h-screen bg-[#030202] text-stone-200 overflow-x-hidden flex flex-col justify-between py-4 relative font-space">
      {/* Glare and scanlines layer for retro-military feel */}
      <div className="absolute inset-0 pointer-events-none crt-screen z-0" />
      <div className="scanline-sweep" />

      <DoodleCursor />
      
      <AnimatePresence mode="wait">
        {!decrypted ? (
          /* ================= DECRYPTION SCREEN ================= */
          <motion.main
            key="decryption-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex flex-col items-center justify-center p-6 relative z-10 font-jetbrains select-none"
          >
            <div className="w-full max-w-xl bg-black border-[3px] border-neutral-800 rounded-lg p-6 md:p-8 relative overflow-hidden shadow-2xl">
              <div className="absolute top-2 right-4 flex items-center gap-1.5 text-[8.5px] text-red-500 uppercase tracking-widest animate-pulse">
                <span className="w-1.5 h-1.5 rounded-full bg-red-600 inline-block" />
                Classified Connection
              </div>

              {/* Main headers */}
              <div className="space-y-4 text-center md:text-left">
                <h1 className="text-xl md:text-2xl font-bold tracking-widest text-red-500 font-space select-none uppercase blink">
                  ⚠ CLASSIFIED ARCHIVE ACCESS REQUIRED
                </h1>
                
                <div className="border-y border-neutral-800 py-4 my-2 text-xs md:text-sm text-stone-400 space-y-2 font-jetbrains">
                  <p><span className="text-red-500 font-bold">PROJECT:</span> GENESIS</p>
                  <p><span className="text-stone-300 font-bold">SUBJECT:</span> JENISH J</p>
                  <p><span className="text-stone-300 font-bold">ROLE:</span> AI + FULL STACK ENGINEERING EXPERIMENT</p>
                  <p><span className="text-stone-300 font-bold">STATUS:</span> ACTIVE & COMPARTMENTALIZED</p>
                  <p><span className="text-stone-300 font-bold">SECURITY:</span> LEVEL-5 EYES ONLY</p>
                </div>
              </div>

              {/* Boot logs log output box */}
              {isDecrypting && (
                <div className="w-full bg-[#050505] border border-neutral-800 rounded p-4 h-[160px] overflow-y-auto mt-4 text-[10.5px] leading-relaxed text-emerald-400/90 font-jetbrains scrollbar-thin">
                  {bootLogs.map((log, i) => (
                    <p key={i}>{log}</p>
                  ))}
                  <p className="animate-pulse inline-block text-emerald-500">█</p>
                </div>
              )}

              {/* Progress and Button controls */}
              <div className="mt-6 flex flex-col items-center">
                {!isDecrypting ? (
                  <motion.button
                    onClick={handleStartDecryption}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-3 bg-red-950/40 border-2 border-red-700 text-red-400 font-bold text-sm tracking-widest uppercase hover:bg-red-700 hover:text-white transition-all cursor-pointer rounded select-none"
                  >
                    [ INITIATE DECRYPTION ]
                  </motion.button>
                ) : (
                  <div className="w-full space-y-2 select-none">
                    <div className="flex justify-between text-[10px] text-stone-400 uppercase tracking-widest">
                      <span>Decrypting memory cores</span>
                      <span>{progress}%</span>
                    </div>
                    <div className="w-full h-2 bg-neutral-900 border border-neutral-800 rounded overflow-hidden">
                      <motion.div 
                        className="h-full bg-emerald-500 shadow-[0_0_8px_rgba(57,255,20,0.5)]"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.main>
        ) : (
          /* ================= DECRYPTED PORTFOLIO CONTENT ================= */
          <motion.div
            key="decrypted-portfolio"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex flex-col justify-between"
          >
            {/* Global Header linked to page transitions */}
            <Header onNavigate={handleNavigate} />
            
            {/* Center binder workspace */}
            <main className="flex-1 flex items-center justify-center relative w-full z-10 my-4">
              <BookBinder
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                isBookOpen={isBookOpen}
                setIsBookOpen={setIsBookOpen}
              />
            </main>

            {/* Retro handwritten signature footer */}
            <footer className="text-center font-jetbrains text-[9.5px] text-stone-500 py-4 select-none uppercase tracking-wider flex items-center justify-center gap-4">
              <span>confidential research archive · © 2026 Jenish J</span>
              <button 
                onClick={handleLockTerminal}
                className="text-red-700 hover:text-red-500 hover:underline cursor-pointer border-l border-neutral-800 pl-4 uppercase tracking-widest text-[8px]"
              >
                [ Lock Terminal ]
              </button>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
