import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import InteractiveTerminal from "./InteractiveTerminal";
import VaultSandbox from "./VaultSandbox";
import LofiWalkman from "./LofiWalkman";
import FloatingKey from "./FloatingKey";
import { projects, Project } from "@/data/projects";


interface BookBinderProps {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  isBookOpen: boolean;
  setIsBookOpen: (open: boolean) => void;
}

export default function BookBinder({
  currentPage,
  setCurrentPage,
  isBookOpen,
  setIsBookOpen,
}: BookBinderProps) {
  const constraintsRef = useRef<HTMLDivElement>(null);
  const lockRef = useRef<HTMLDivElement>(null);
  const coverShakeControls = useAnimation();

  // Session-persisted unlock state
  const [bookLocked, setBookLocked] = useState<boolean>(
    () => sessionStorage.getItem("logbook_unlocked") !== "true"
  );

  // Navigation tabs
  const tabs = [
    { label: "blueprint", index: 0, color: "bg-[#e7d7c1] text-slate-800" },
    { label: "toolbox", index: 1, color: "bg-[#88c5f7] text-slate-800" },
    { label: "project deck", index: 2, color: "bg-[#fbc67b] text-slate-800" },
    { label: "experience", index: 3, color: "bg-[#a259ff]/20 text-[#a259ff] border-[#a259ff]/30" },
    { label: "connect", index: 4, color: "bg-note-yellow text-slate-800" },
  ];

  // Mindset Brain node state
  const [activeBrainNode, setActiveBrainNode] = useState<string>("purpose");
  const [isUnlocking, setIsUnlocking] = useState(false);

  // Handle key unlock completion
  const handleUnlockComplete = useCallback(() => {
    sessionStorage.setItem("logbook_unlocked", "true");
    setBookLocked(false);
    setIsUnlocking(true);
    setTimeout(() => {
      setIsBookOpen(true);
      setCurrentPage(0);
      setIsUnlocking(false);
    }, 650);
  }, [setIsBookOpen, setCurrentPage]);

  // Shake the cover when clicked while locked
  const handleLockedCoverClick = useCallback(() => {
    coverShakeControls.start({
      x: [0, -10, 10, -8, 8, -4, 4, 0],
      rotate: [0, -2, 2, -1.5, 1.5, 0],
      transition: { duration: 0.55, ease: "easeInOut" },
    });
  }, [coverShakeControls]);

  // Seed coverShakeControls so the cover is visible on mount
  useEffect(() => {
    coverShakeControls.start({ opacity: 1, scale: 1, x: 0, rotate: 0 });
  }, [coverShakeControls]);

  // Floppy reader states
  const [loadedDisk, setLoadedDisk] = useState<string | null>(null);
  const [diskLoadingState, setDiskLoadingState] = useState<"idle" | "loading" | "loaded">("idle");

  // Cassette deck states
  const [selectedProjectId, setSelectedProjectId] = useState<string>("hiremind");
  const [isPlayingTape, setIsPlayingTape] = useState(true);
  const [projectFilter, setProjectFilter] = useState<"all" | "ai" | "sde">("all");

  const filteredProjects = projects.filter(p => {
    if (projectFilter === "ai") return p.category === "ai";
    if (projectFilter === "sde") return p.category === "sde" || p.category === "tooling";
    return true;
  });


  // Polaroid hover flips
  const [flippedPolaroid, setFlippedPolaroid] = useState<string | null>(null);

  // Postcard send animation state
  const [postcardState, setPostcardState] = useState<"editing" | "sending" | "sent">("editing");
  const [senderName, setSenderName] = useState("");
  const [senderEmail, setSenderEmail] = useState("");
  const [senderMsg, setSenderMsg] = useState("");
  const [checkedConnect, setCheckedConnect] = useState<number[]>([]);

  const checklistItems = [
    "Building useful AI products",
    "Solving meaningful problems",
    "Collaborating with curious builders",
  ];

  const allConnectChecked = checkedConnect.length === checklistItems.length;

  // Resume-backed experiences ledger
  const experiences = [
    {
      id: "Zuntra",
      role: "AI & Automation Intern (Software Engineering)",
      company: "Zuntra Digital Private Limited",
      duration: "Sep 2025 – Apr 2026",
      bullets: [
        "Designed & developed HireMind (Next.js, Neon PostgreSQL) recruitment platform",
        "Built Vertex AI (Gemini) & RAG pipeline generating interview questions & candidate scoring",
        "Developed 20+ REST API endpoints for auth, resume parsing, ATS scoring & evaluations",
        "Delivered 15+ core features across Agile sprints, refining performance & production readiness"
      ]
    },
    {
      id: "Panimalar",
      role: "B.Tech in AI & Data Science (CGPA: 8.75/10)",
      company: "Panimalar Engineering College",
      duration: "2023 – 2027",
      bullets: [
        "Current Academic CGPA: 8.75 / 10",
        "Winner – College Ideathon (Team Leader, AI-driven solution)",
        "Master of Ceremonies (MC), College Club (300+ students)",
        "Core DSA: LeetCode (150+) & TakeUForward (200+)"
      ]
    },
    {
      id: "Certifications",
      role: "Certifications & Industry Credentials",
      company: "Oracle, Infosys, GFG & Anthropic",
      duration: "2024 – 2025",
      bullets: [
        "Oracle Cloud Infrastructure 2025 Certified DevOps Professional",
        "Oracle Cloud Infrastructure 2024 Generative AI Certified Professional",
        "Oracle Data Platform 2025 Certified Foundations Associate",
        "GUVI Oracle SQL, GFG Full Stack Development & Anthropic AI Fluency"
      ]
    }
  ];

  // 7 Projects list sourced from @/data/projects

  const selectedProject = projects.find(p => p.id === selectedProjectId) || projects[0];

  const diskSkills: Record<string, string[]> = {
    languages: ["JavaScript (ES6+)", "Python", "Java", "SQL", "TypeScript", "HTML5 & CSS3"],
    frontend: ["React.js", "Next.js", "Tailwind CSS", "Expo Mobile", "TanStack Query", "Framer Motion", "Shadcn UI"],
    backend: ["Node.js", "Express.js", "FastAPI (Python)", "Socket.io (WebSockets)", "Drizzle ORM", "Mongoose ODM", "MongoDB", "PostgreSQL (Neon)"],
    tools: ["Oracle Cloud (OCI)", "GCP (Vertex AI)", "Docker", "Docker Compose", "Git / GitHub", "Postman", "Vercel", "Render", "Firebase"]
  };

  const handleLoadDisk = (diskId: string) => {
    if (loadedDisk === diskId) return;
    setDiskLoadingState("loading");
    setTimeout(() => {
      setLoadedDisk(diskId);
      setDiskLoadingState("loaded");
    }, 1000);
  };

  const handleOpenBook = () => {
    if (isUnlocking) return;
    setIsUnlocking(true);
    setTimeout(() => {
      setIsBookOpen(true);
      setIsUnlocking(false);
      setCurrentPage(0);
    }, 650);
  };

  const handleSelectProject = (id: string) => {
    setSelectedProjectId(id);
    setIsPlayingTape(false);
    setTimeout(() => {
      setIsPlayingTape(true);
    }, 150);
  };

  const handleSendPostcard = (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderName || !senderEmail || !senderMsg) return;

    setPostcardState("sending");

    setTimeout(() => {
      setPostcardState("sent");
      const subject = encodeURIComponent(`Invention Lab Connect from ${senderName}`);
      const body = encodeURIComponent(`${senderMsg}\n\nSender Email: ${senderEmail}`);
      window.location.href = `mailto:jenishj.dev@gmail.com?subject=${subject}&body=${body}`;
    }, 2200); // Wait for paper plane animation to finish
  };

  const handleResetPostcard = () => {
    setSenderName("");
    setSenderEmail("");
    setSenderMsg("");
    setPostcardState("editing");
  };

  const toggleCheckConnect = (i: number) => {
    setCheckedConnect(prev =>
      prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i]
    );
  };

  return (
    <div ref={constraintsRef} className="w-full max-w-6xl mx-auto py-4 px-4 select-none relative z-20">
      
      {/* ALWAYS ACTIVE LOFI WALKMAN - top right corner of the desk */}
      <div className="absolute right-4 top-[-20px] z-50 hidden md:block">
        <LofiWalkman />
      </div>

      {/* ================= DESK ENVIRONMENT ACCENTS ================= */}
      <AnimatePresence>
        {!isBookOpen && (
          <>
            {/* Left Manifesto Sticky Note */}
            <motion.div
              initial={{ opacity: 0, x: -50, rotate: -12 }}
              animate={{ opacity: 0.8, x: 0, rotate: -6 }}
              exit={{ opacity: 0, x: -80, transition: { duration: 0.3 } }}
              className="absolute left-[2%] lg:left-[8%] xl:left-[12%] top-[14%] w-44 h-44 bg-[#fcf5b2] p-5 shadow-md rotate-[-6deg] font-hand-kalam text-slate-800 border border-yellow-300 rounded-sm pointer-events-none hidden md:block z-10"
            >
              <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-14 h-4 bg-white/40 shadow-sm border border-slate-400/5 rotate-[-1deg]" />
              <p className="font-bold border-b border-slate-400/30 pb-0.5 mb-2 text-xs uppercase tracking-wider text-slate-700">manifesto:</p>
              <div className="text-xs space-y-1 mt-2 text-slate-800 font-semibold leading-relaxed">
                <p>build useful things.</p>
                <p>solve real friction.</p>
                <p>iterate often.</p>
              </div>
            </motion.div>

            {/* Right Desk Coffee Mug */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 0.8, x: 0 }}
              exit={{ opacity: 0, x: 80, transition: { duration: 0.3 } }}
              className="absolute right-[2%] lg:right-[8%] xl:right-[12%] bottom-[20%] w-24 h-24 text-cream-light font-hand-kalam pointer-events-none hidden md:block"
            >
              <svg viewBox="0 0 100 100" className="w-full h-full text-cream-light opacity-60" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M30 75 Q 50 78, 70 75 L 67 45 L 33 45 Z" />
                <path d="M70 50 Q 82 50, 80 60 Q 78 70, 68 68" />
                <path d="M35 40 Q 40 30, 35 20 M 45 38 Q 50 28, 45 18 M 55 40 Q 60 30, 55 20" strokeDasharray="3 3" />
                <path d="M20 78 Q 50 82, 80 78" strokeWidth="1" />
              </svg>
              <p className="text-[10px] text-center text-cream-light/40 font-mono mt-1 uppercase tracking-widest">charging... ☕</p>
            </motion.div>
            
            {/* Red pointing Arrow */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 0.9, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.3 } }}
              className="absolute left-[18%] lg:left-[22%] xl:left-[26%] bottom-[12%] text-red-500 hidden xl:block pointer-events-none"
            >
              <svg width="100" height="80" viewBox="0 0 100 80" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M10 10 Q 50 15, 80 50" strokeDasharray="4 4" />
                <path d="M68 46 L 80 50 L 78 38" />
              </svg>
              <p className="font-hand-kalam text-sm text-red-400 rotate-[8deg] mt-1 pl-4">click to flip open! ➔</p>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ================= 3D BOOK CASE ================= */}
      <div className="relative w-full flex justify-center items-center perspective-lg min-h-[660px]">
        <AnimatePresence mode="wait">
          
          {/* CLOSED BOOK COVER */}
          {!isBookOpen ? (
            <div className="relative inline-flex justify-center w-full max-w-[500px] mx-auto">
              {/* ======= STANDALONE DIARY LOCK STRAP ======= */}
              <motion.div
                className="absolute right-[-2px] top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-1 pointer-events-none"
                animate={isUnlocking ? { x: 60, rotate: 18, opacity: 0 } : { x: 0, rotate: 0, opacity: 1 }}
                transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
              >
                {/* Top strap band */}
                <div className="w-4 h-16 rounded-sm shadow-md" style={{ background: "linear-gradient(to right, #6b4c35, #8B6340, #6b4c35)", border: "1px solid #4a2f1c" }} />
                {/* Gold clasp buckle — lockRef targeted by FloatingKey */}
                <motion.div
                  ref={lockRef}
                  animate={isUnlocking ? { scale: 1.3, rotate: -20 } : { rotate: [0, 0] }}
                  transition={{ duration: 0.35 }}
                  className="w-10 h-10 rounded-full flex items-center justify-center shadow-xl"
                  style={{ background: "linear-gradient(135deg, #f6d365 0%, #d4a01a 50%, #f6d365 100%)", border: "2px solid #8B6340", boxShadow: "0 2px 8px rgba(0,0,0,0.5), inset 0 1px 2px rgba(255,255,255,0.3)" }}
                >
                  <span className="text-lg select-none leading-none">{isUnlocking ? "🔓" : "🔒"}</span>
                </motion.div>
                {/* Bottom strap band */}
                <div className="w-4 h-16 rounded-sm shadow-md" style={{ background: "linear-gradient(to right, #6b4c35, #8B6340, #6b4c35)", border: "1px solid #4a2f1c" }} />
              </motion.div>
              <motion.div
                key="closed-cover"
                initial={{ rotateY: 0, opacity: 0, scale: 0.95 }}
                animate={isUnlocking 
                  ? { rotateY: -10, rotateX: 2, scale: 0.98 }
                  : coverShakeControls}
                exit={{ 
                  rotateY: -110, 
                  opacity: 0, 
                  scale: 0.9, 
                  x: "-30%",
                  transition: { duration: 0.7, ease: [0.25, 1, 0.5, 1] } 
                }}
                whileHover={isUnlocking || bookLocked ? {} : { 
                  scale: 1.04, 
                  rotate: 0.5, 
                  y: -10, 
                  boxShadow: "0 35px 70px rgba(0,0,0,0.6)" 
                }}
                onClick={bookLocked ? handleLockedCoverClick : handleOpenBook}
                style={{ transformOrigin: "left center", cursor: bookLocked ? "not-allowed" : "pointer" }}
                className="w-full max-w-[500px] h-[600px] bg-[#221c18] border-[12px] border-[#13100e] rounded-l-md rounded-r-3xl shadow-2xl flex flex-col justify-between p-8 text-center transition-shadow duration-300 relative group"
              >
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.4))] pointer-events-none" />
                
                {/* Vertical red spine line */}
                <div className="absolute left-[36px] top-0 bottom-0 w-[1.5px] bg-[#d35442]/30 pointer-events-none" />

                {/* Silver Paperclip */}
                <div className="absolute left-6 top-28 z-10 w-6 h-12 rotate-[-5deg] pointer-events-none select-none drop-shadow-sm">
                  <svg viewBox="0 0 24 24" className="w-full h-full stroke-slate-400 fill-none stroke-[2]">
                    <path d="M6 9v7.5a4.5 4.5 0 0 0 9 0V6a3 3 0 0 0-6 0v8.5a1.5 1.5 0 0 0 3 0V9" />
                  </svg>
                </div>

                {/* Subtle Pencil sketches (Braces & Commits) */}
                <div className="absolute left-12 top-16 w-12 h-12 opacity-[0.15] pointer-events-none select-none text-slate-500">
                  <svg viewBox="0 0 100 100" className="w-full h-full stroke-current fill-none stroke-[1.5]">
                    <path d="M 20 20 Q 35 20, 35 35 Q 35 50, 50 50 M 50 50 Q 35 50, 35 65 Q 35 80, 20 80" />
                    <circle cx="70" cy="35" r="6" />
                    <circle cx="70" cy="70" r="6" />
                    <path d="M 70 41 L 70 64" strokeDasharray="3 3" />
                  </svg>
                </div>

                {/* Coffee Stain Ring */}
                <div className="absolute right-10 top-16 w-20 h-20 opacity-20 pointer-events-none select-none">
                  <svg viewBox="0 0 100 100" className="w-full h-full stroke-[#6b4c35] fill-none stroke-[2]">
                    <circle cx="50" cy="50" r="42" strokeDasharray="30 20 40 10" />
                    <circle cx="52" cy="51" r="39" opacity="0.6" strokeDasharray="50 10 10 30" />
                  </svg>
                </div>

                {/* Right Side Sketch (frontend -> system -> impact in a box) */}
                <div className="absolute right-8 top-[170px] w-28 h-28 opacity-25 pointer-events-none select-none text-slate-550">
                  <svg viewBox="0 0 120 120" className="w-full h-full stroke-current fill-none stroke-[1.2]">
                    <path d="M 15 20 Q 60 14, 105 20 Q 110 60, 105 100 Q 60 106, 15 100 Q 10 60, 15 20" strokeDasharray="40 2 30 4" />
                    <path d="M 17 23 Q 60 17, 102 23 Q 107 60, 102 97 Q 60 103, 17 97 Q 12 60, 17 23" opacity="0.4" />
                    
                    <text x="60" y="38" textAnchor="middle" fontSize="8" className="font-hand-kalam font-bold fill-current stroke-none">frontend</text>
                    <path d="M 60 44 L 60 52 M 58 49 L 60 52 L 62 49" />
                    
                    <text x="60" y="65" textAnchor="middle" fontSize="8" className="font-hand-kalam font-bold fill-current stroke-none">system</text>
                    <path d="M 60 71 L 60 79 M 58 76 L 60 79 L 62 76" />
                    
                    <text x="60" y="92" textAnchor="middle" fontSize="8" className="font-hand-kalam font-bold fill-current stroke-none">impact</text>
                  </svg>
                </div>

                {/* Ideas worth rebuilding notes */}
                <div className="absolute left-16 bottom-24 font-hand-kalam text-[10px] text-slate-550/30 italic pointer-events-none select-none rotate-[-1deg]">
                  ideas worth rebuilding...
                </div>

                {/* Field notes box */}
                <div className="absolute right-12 bottom-20 border border-dashed border-slate-500/35 rounded p-1.5 font-mono text-[8px] text-slate-550/40 leading-tight text-center pointer-events-none select-none">
                  <p>FIELD NOTES</p>
                  <p>2023-2027</p>
                </div>

                {/* Center Card (Field Notes of an AI Systems Builder) */}
                <div className="mt-14 bg-[#fcfbe3] px-6 py-6 border border-slate-300 shadow-md max-w-[290px] w-full mx-auto relative rotate-[1.5deg] text-left select-none rounded-sm">
                  {/* Tape */}
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-16 h-5 bg-white/40 shadow-sm border border-slate-400/5 rotate-[-0.5deg]" />
                  
                  <p className="font-hand-kalam text-xs text-[#d35442] font-bold tracking-wider uppercase mb-1.5">JENISH J</p>
                  
                  <h1 className="font-hand-kalam text-xl font-bold text-slate-900 leading-snug select-none">
                    Field Notes of an<br />
                    AI Systems Builder
                  </h1>
                  
                  <div className="border-t border-slate-400/20 mt-4 pt-2.5 flex justify-between font-mono text-[9px] text-slate-500">
                    <span>2023 — Present</span>
                    <span className="text-[#d35442] font-bold uppercase">VOL. 01</span>
                  </div>
                </div>

                {/* Bottom text */}
                <div className="mb-8 text-slate-455/75 space-y-2">
                  <motion.p 
                    animate={{ opacity: [0.6, 0.9, 0.6] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="font-hand-kalam text-base tracking-wider cursor-pointer"
                  >
                    {bookLocked ? "use key to unlock ✦" : "start reading ➔"}
                  </motion.p>
                  <div className="text-[10px] font-mono text-slate-500/30 select-none uppercase tracking-widest">
                    ( click to flip )
                  </div>
                </div>
              </motion.div>
              {/* Floating Key — only shown while book is locked */}
              {bookLocked && (
                <FloatingKey
                  lockRef={lockRef as React.RefObject<HTMLDivElement>}
                  onUnlockComplete={handleUnlockComplete}
                  bookShakeControls={{ shake: handleLockedCoverClick }}
                  bookLocked={bookLocked}
                />
              )}
            </div>
          ) : (
            
            // OPEN BOOK SPREAD
            <motion.div
              key="open-book"
              initial={{ rotateY: 90, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="w-full flex flex-col md:grid md:grid-cols-12 relative z-10"
            >
              {/* Binder center rings */}
              <div className="absolute left-[calc(41.666%-12px)] top-0 bottom-0 w-6 flex flex-col justify-around py-8 z-30 pointer-events-none hidden md:flex">
                {Array.from({ length: 14 }).map((_, i) => (
                  <div key={i} className="w-6 h-3 rounded-full bg-gradient-to-r from-slate-700 via-slate-500 to-slate-800 border border-slate-900 shadow-md transform -translate-x-[2px]" />
                ))}
              </div>

              {/* ================= LEFT PAGE ================= */}
              <div className="md:col-span-5 bg-[#fcf9d6] border-l-[12px] border-notebook-border/80 rounded-l-2xl p-6 sm:p-8 relative paper-texture transition-all duration-300 min-h-[580px] flex flex-col justify-between">
                <div className="absolute right-6 top-0 bottom-0 w-[1.5px] bg-[#d35442]/30 hidden md:block" />
                
                <div className="flex-1 flex flex-col justify-between relative z-10">
                  
                  {/* SPREAD 0: Brain Nodes Blueprint */}
                  {currentPage === 0 && (
                    <div className="space-y-4">
                      <div className="border-b-2 border-dashed border-[#d35442]/20 pb-2">
                        <h2 className="text-3xl font-marker text-[#d35442] mb-0.5">mindset blueprint</h2>
                        <p className="font-hand-kalam text-xs text-slate-800 font-bold uppercase tracking-wider">hover nodes to decode brain</p>
                      </div>

                      {/* Interactive SVG Network Map */}
                      <div className="relative w-full h-48 border border-slate-400/20 bg-white/40 rounded flex items-center justify-center p-2 shadow-inner">
                        <svg className="w-full h-full overflow-visible" viewBox="0 0 200 120">
                          {/* Connections */}
                          <line x1="100" y1="20" x2="40" y2="70" stroke="#d35442" strokeWidth="1.5" strokeDasharray="3 3" />
                          <line x1="100" y1="20" x2="160" y2="70" stroke="#d35442" strokeWidth="1.5" strokeDasharray="3 3" />
                          <line x1="40" y1="70" x2="100" y2="100" stroke="#d35442" strokeWidth="1.5" strokeDasharray="3 3" />
                          <line x1="160" y1="70" x2="100" y2="100" stroke="#d35442" strokeWidth="1.5" strokeDasharray="3 3" />
                          <line x1="100" y1="20" x2="100" y2="100" stroke="#d35442" strokeWidth="1.5" className="opacity-30" />

                          {/* Nodes */}
                          <circle cx="100" cy="20" r="10" fill="#d35442" className="cursor-pointer hover:scale-125 transition-transform" onMouseEnter={() => setActiveBrainNode("purpose")} />
                          <circle cx="40" cy="70" r="10" fill="#88c5f7" className="cursor-pointer hover:scale-125 transition-transform" onMouseEnter={() => setActiveBrainNode("problem")} />
                          <circle cx="160" cy="70" r="10" fill="#a259ff" className="cursor-pointer hover:scale-125 transition-transform" onMouseEnter={() => setActiveBrainNode("ai")} />
                          <circle cx="100" cy="100" r="10" fill="#fbc67b" className="cursor-pointer hover:scale-125 transition-transform" onMouseEnter={() => setActiveBrainNode("systems")} />

                          <text x="100" y="36" textAnchor="middle" fontSize="9" className="font-mono fill-slate-700 font-bold select-none">PURPOSE</text>
                          <text x="40" y="86" textAnchor="middle" fontSize="9" className="font-mono fill-slate-700 font-bold select-none">PROBLEM</text>
                          <text x="160" y="86" textAnchor="middle" fontSize="9" className="font-mono fill-slate-700 font-bold select-none">AI</text>
                          <text x="100" y="114" textAnchor="middle" fontSize="9" className="font-mono fill-slate-700 font-bold select-none">SYSTEMS</text>
                        </svg>
                      </div>

                      {/* Display text based on hovered node */}
                      <div className="bg-white/60 border border-slate-300 rounded p-3 h-[100px] shadow-sm font-hand-kalam text-slate-800 leading-snug flex flex-col justify-center text-center">
                        {activeBrainNode === "purpose" && (
                          <p className="text-base"><b>PURPOSE</b>: "Build things people actually need"</p>
                        )}
                        {activeBrainNode === "problem" && (
                          <p className="text-base"><b>PROBLEM</b>: "Understand friction before writing code"</p>
                        )}
                        {activeBrainNode === "ai" && (
                          <p className="text-base"><b>AI</b>: "Use intelligence to improve workflows"</p>
                        )}
                        {activeBrainNode === "systems" && (
                          <p className="text-base"><b>SYSTEMS</b>: "Design reliable full-stack solutions"</p>
                        )}
                      </div>

                      {/* CURRENT CURIOSITIES CHECKLIST */}
                      <div className="mt-4 pt-3 border-t border-dashed border-slate-350/50 font-hand-kalam text-slate-800 select-none text-left">
                        <p className="text-[13px] font-bold uppercase tracking-wider text-[#d35442] mb-2 font-mono">□ CURRENT CURIOSITIES</p>
                        <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm pl-1 font-semibold text-slate-800">
                          <p>□ AI Agents</p>
                          <p>□ Realtime Systems</p>
                          <p>□ Product Engineering</p>
                          <p>□ System Design</p>
                          <p className="col-span-2">□ Human Computer Interaction</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* SPREAD 1: Engineer's Toolbox */}
                  {currentPage === 1 && (
                    <div className="space-y-4">
                      <div className="border-b-2 border-dashed border-[#d35442]/20 pb-2">
                        <h2 className="text-3xl font-marker text-[#d35442] mb-0.5">engineer's toolbox</h2>
                        <p className="font-hand-kalam text-xs text-slate-600 italic">tools collected while building systems — insert a module to inspect</p>
                      </div>

                      {/* Disk kit cards */}
                      <div className="grid grid-cols-2 gap-3 pt-2 pr-6">
                        {[
                          { id: "languages", num: "01", kit: "CODE KIT", sub: "languages & core tools", color: "bg-blue-700 border-blue-900", year: "2023" },
                          { id: "frontend", num: "02", kit: "INTERFACE KIT", sub: "frontend engineering", color: "bg-purple-700 border-purple-900", year: "2023" },
                          { id: "backend", num: "03", kit: "SYSTEM KIT", sub: "backend & architecture", color: "bg-emerald-700 border-emerald-900", year: "2024" },
                          { id: "tools", num: "04", kit: "WORKSHOP KIT", sub: "dev utilities & ops", color: "bg-orange-700 border-orange-900", year: "2024" }
                        ].map(disk => (
                          <div
                            key={disk.id}
                            onClick={() => handleLoadDisk(disk.id)}
                            className={`p-3 rounded border-2 text-white font-mono cursor-pointer flex flex-col justify-between shadow-md hover:-translate-y-1 hover:shadow-lg transition-all select-none relative overflow-hidden ${
                              loadedDisk === disk.id ? `${disk.color} ring-2 ring-white/40` : disk.color
                            }`}
                          >
                            <div className="flex justify-between items-start">
                              <div className="w-5 h-5 bg-white rounded-sm flex items-center justify-center shadow-inner flex-shrink-0">
                                <div className="w-3.5 h-3.5 bg-slate-200 border-t border-slate-400" />
                              </div>
                              <span className="text-[7px] border border-white/30 px-1 rounded uppercase tracking-wider font-bold">3.5" HD</span>
                            </div>
                            <div className="mt-3 border-t border-white/20 pt-1.5">
                              <p className="text-[8px] text-white/60 font-bold tracking-widest uppercase">DISK {disk.num}</p>
                              <p className="text-xs font-bold uppercase tracking-wide leading-tight">{disk.kit}</p>
                              <p className="text-[8px] text-white/60 italic mt-0.5 font-hand-kalam normal-case tracking-normal">{disk.sub}</p>
                              <p className="text-[7px] text-white/40 font-hand-kalam mt-1 italic">collected: {disk.year}</p>
                            </div>
                            {loadedDisk === disk.id && (
                              <div className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse shadow" />
                            )}
                          </div>
                        ))}
                      </div>

                      {/* Handwritten desk note */}
                      <div className="pt-1 font-hand-kalam text-[10px] text-slate-400/70 italic text-right pr-1">
                        "tools change, problem-solving stays."
                      </div>
                    </div>
                  )}

                  {/* SPREAD 2: Project Cassettes */}
                  {currentPage === 2 && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between border-b-2 border-dashed border-[#d35442]/20 pb-1 select-none">
                        <h2 className="text-3xl font-marker text-[#d35442]">
                          project deck
                        </h2>
                        <span className="font-hand-kalam text-xs text-slate-600 font-bold">
                          {filteredProjects.length} / {projects.length} builds
                        </span>
                      </div>

                      {/* Domain Category Filter Chips */}
                      <div className="flex items-center gap-2 pt-0.5 select-none flex-wrap">
                        {[
                          { id: "all", label: `ALL (${projects.length})` },
                          { id: "ai", label: `AI & AGENTS (${projects.filter(p => p.category === "ai").length})` },
                          { id: "sde", label: `SDE & SYSTEMS (${projects.filter(p => p.category !== "ai").length})` },
                        ].map((tab) => (
                          <button
                            key={tab.id}
                            onClick={() => setProjectFilter(tab.id as "all" | "ai" | "sde")}
                            className={`font-hand-kalam text-xs px-3 py-1 rounded-full border transition-all cursor-pointer ${
                              projectFilter === tab.id
                                ? "bg-[#d35442] text-white border-[#b83b2a] font-bold shadow-sm"
                                : "bg-[#e7d7c1]/50 text-slate-800 border-slate-400/40 hover:bg-[#e7d7c1] hover:border-slate-500"
                            }`}
                          >
                            {tab.label}
                          </button>
                        ))}
                      </div>

                      <p className="font-hand-kalam text-xs text-slate-600 mb-1 select-none">select a cassette to spin in the deck:</p>

                      <div className="space-y-1.5 max-h-[330px] overflow-y-auto pr-1">
                        {filteredProjects.map((project, idx) => {
                          const isSelected = selectedProjectId === project.id;
                          const isAi = project.category === "ai";
                          return (
                            <div
                              key={project.id}
                              onClick={() => handleSelectProject(project.id)}
                              className={`p-2.5 rounded border border-slate-300 shadow-sm cursor-pointer select-none font-mono flex items-center justify-between transition-colors ${
                                isSelected ? "bg-[#e7d7c1] border-[#d35442] text-slate-800 font-bold" : "bg-white/60 hover:bg-[#e7d7c1]/20 text-slate-700"
                              }`}
                            >
                              <div className="flex items-center gap-2.5 min-w-0">
                                {/* Small Cassette outline */}
                                <div className="w-8 h-4.5 border border-slate-600 rounded bg-slate-900 flex justify-around items-center px-1 shrink-0">
                                  <div className="w-1.5 h-1.5 rounded-full bg-slate-400 border border-slate-600" />
                                  <div className="w-1.5 h-1.5 rounded-full bg-slate-400 border border-slate-600" />
                                </div>
                                <span className="text-xs leading-none truncate">{idx + 1}. {project.title}</span>
                              </div>

                              {/* Role Domain Badge */}
                              <span className={`text-[10px] px-2 py-0.5 rounded font-hand-kalam font-bold uppercase tracking-wider shrink-0 ${
                                isAi 
                                  ? "bg-[#d35442]/10 text-[#a53b2b] border border-[#d35442]/30" 
                                  : "bg-slate-700/10 text-slate-800 border border-slate-700/30"
                              }`}>
                                {isAi ? "AI AGENT" : "SDE CORE"}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* SPREAD 3: Experience Timeline */}
                  {currentPage === 3 && (
                    <div className="space-y-6">
                      <div className="border-b-2 border-dashed border-[#d35442]/20 pb-4">
                        <h2 className="text-4xl font-marker text-[#d35442] mb-1">internships</h2>
                        <p className="font-hand-kalam text-lg text-slate-800 font-bold uppercase tracking-wider">work & learnings ledger</p>
                      </div>

                      <div className="font-hand-kalam space-y-5 text-slate-800">
                        {experiences.map(exp => (
                          <div 
                            key={exp.id} 
                            onClick={() => setFlippedPolaroid(exp.id)}
                            className="p-3 bg-white/40 border border-slate-300/30 rounded shadow-sm hover:bg-white/70 cursor-pointer transition-colors"
                          >
                            <p className="text-slate-950 font-bold text-lg leading-tight">{exp.role}</p>
                            <p className="text-xs font-mono text-slate-500 mt-0.5">{exp.company} · {exp.duration}</p>
                            <p className="text-xs text-red-500 font-bold mt-2 hover:underline">Tap to view Polaroid note ➔</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* SPREAD 4: Connect Alignments */}
                  {currentPage === 4 && (
                    <div className="space-y-5">
                      <div className="border-b-2 border-dashed border-[#d35442]/20 pb-2">
                        <h2 className="text-3xl font-marker text-[#d35442] mb-1">alignments</h2>
                        <p className="font-hand-kalam text-lg text-slate-800 font-bold uppercase tracking-wider">what i look for in projects</p>
                      </div>

                      <ul className="space-y-4">
                        {checklistItems.map((text, i) => {
                          const isChecked = checkedConnect.includes(i);
                          return (
                            <li 
                              key={i} 
                              onClick={() => toggleCheckConnect(i)}
                              className={`group flex items-center gap-3 p-2 -ml-2 rounded-md transition-all duration-150 cursor-pointer ${isChecked ? "bg-[#ff5a46]/5" : "hover:bg-[#ff5a46]/5"}`}
                            >
                              <div className="w-6 h-6 rounded border-2 border-[#d35442] flex-shrink-0 flex items-center justify-center bg-white/50 transition-colors">
                                {isChecked && <span className="text-[#d35442] font-bold text-sm">✓</span>}
                              </div>
                              <span className={`font-hand-kalam text-lg leading-tight transition-colors duration-150 ${isChecked ? "text-[#b83b2a] font-bold" : "text-slate-700 group-hover:text-slate-900"}`}>
                                {text}
                              </span>
                            </li>
                          );
                        })}
                      </ul>

                      <AnimatePresence>
                        {allConnectChecked && (
                          <motion.div
                            initial={{ scale: 0.8, opacity: 0, rotate: -2 }}
                            animate={{ scale: 1.05, opacity: 1, rotate: 2 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            className="bg-yellow-100 border border-yellow-300 p-3 rounded shadow-md mt-4 text-center font-hand-kalam text-[#b83b2a]"
                          >
                            🎉 Checked! Fill out the mailing postcard on the right to connect.
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )}

                </div>

                <div className="border-t border-[#d35442]/10 pt-4 flex justify-between items-center text-slate-600 font-mono text-[9.5px] uppercase select-none tracking-widest mt-6">
                  <span>Chennai, India</span>
                  <span>GMT +5:30</span>
                </div>
                <div className="absolute inset-0 lined-paper-bg opacity-[0.03] pointer-events-none rounded-l-2xl" />
              </div>

              {/* ================= RIGHT PAGE ================= */}
              <div className="md:col-span-7 bg-[#fcf9d6] rounded-r-2xl p-6 sm:p-8 relative paper-texture transition-all duration-300 border-r-2 border-slate-300 min-h-[580px] flex flex-col justify-between">
                
                <div className="flex-1 flex flex-col justify-center">
                  
                  {/* SPREAD 0: Manifesto Details */}
                  {/* SPREAD 0: Builder Notes */}
                  {currentPage === 0 && (
                    <div className="space-y-4 font-hand-kalam text-slate-800 relative select-none">
                      <h3 className="text-3xl font-marker text-[#d35442] border-b pb-1 select-none">BUILDER NOTES</h3>
                      
                      <p className="text-sm text-slate-500 italic mb-4 leading-relaxed">
                        "Notes collected from building, breaking,<br className='hidden' /> debugging and rebuilding systems."
                      </p>

                      <div className="space-y-4 relative pr-2">
                        {/* Note 01 */}
                        <div className="p-4 bg-white border border-slate-200/80 rounded shadow-sm relative rotate-[-0.5deg] max-w-[420px] transition-transform hover:scale-[1.01]">
                          <div className="absolute -top-2 left-6 w-14 h-4 bg-white/40 border border-slate-400/5 shadow-sm rotate-[1.5deg] pointer-events-none" />
                          <p className="font-mono text-[11px] text-[#d35442] font-bold tracking-wider mb-2 uppercase">NOTE 01 / SOLVE REAL FRICTION</p>
                          <p className="text-sm font-semibold text-slate-800 leading-relaxed">
                            Observation:
                          </p>
                          <p className="text-sm font-normal text-slate-700 leading-relaxed">
                            People don't need more features.<br />They need fewer problems.
                          </p>
                          <div className="mt-2 flex gap-3 text-xs text-slate-500 font-mono">
                            <span className="font-bold">Built from:</span>
                            <span>→ HireMindAI</span>
                            <span>→ CodeSentry</span>
                          </div>
                          
                          {/* Annotation 1 */}
                          <div className="absolute right-[-45px] top-[14px] font-hand-kalam text-[11px] text-slate-500/75 italic rotate-[6deg] pointer-events-none hidden lg:block whitespace-nowrap">
                            learned while building HireMind ➔
                          </div>
                        </div>

                        {/* Note 02 */}
                        <div className="p-4 bg-white border border-slate-200/80 rounded shadow-sm relative rotate-[1deg] max-w-[420px] transition-transform hover:scale-[1.01]">
                          <div className="absolute -top-2 right-12 w-14 h-4 bg-white/40 border border-slate-400/5 shadow-sm rotate-[-1deg] pointer-events-none" />
                          
                          {/* Annotation 2 */}
                          <div className="absolute left-[-55px] top-[12px] font-hand-kalam text-[11px] text-slate-500/75 italic rotate-[-12deg] pointer-events-none hidden lg:block whitespace-nowrap">
                            ➔ UX matters :)
                          </div>

                          <p className="font-mono text-[11px] text-[#d35442] font-bold tracking-wider mb-2 uppercase">NOTE 02 / BUILD FOR HUMANS</p>
                          <p className="text-sm font-semibold text-slate-800 leading-relaxed">
                            Observation:
                          </p>
                          <p className="text-sm font-normal text-slate-700 leading-relaxed">
                            Good software should feel natural,<br />not complicated.
                          </p>
                          <div className="mt-2 flex gap-3 text-xs text-slate-500 font-mono">
                            <span className="font-bold">Focus:</span>
                            <span>→ Clean interfaces</span>
                            <span>→ Smooth workflows</span>
                          </div>
                        </div>

                        {/* Note 03 */}
                        <div className="p-4 bg-white border border-slate-200/80 rounded shadow-sm relative rotate-[-1deg] max-w-[420px] transition-transform hover:scale-[1.01]">
                          <div className="absolute -top-2 left-10 w-14 h-4 bg-white/40 border border-slate-400/5 shadow-sm rotate-[2deg] pointer-events-none" />
                          <p className="font-mono text-[11px] text-[#d35442] font-bold tracking-wider mb-2 uppercase">NOTE 03 / AI AS A TOOL</p>
                          <p className="text-sm font-semibold text-slate-800 leading-relaxed">
                            Observation:
                          </p>
                          <p className="text-sm font-normal text-slate-700 leading-relaxed">
                            AI should remove repetitive work,<br />so humans focus on better decisions.
                          </p>
                          <div className="mt-2 flex gap-3 text-xs text-slate-500 font-mono">
                            <span className="font-bold">Exploring:</span>
                            <span>→ AI Agents</span>
                            <span>→ Automation</span>
                          </div>

                          {/* Annotation 3 */}
                          <div className="absolute right-[-45px] top-[14px] font-hand-kalam text-[11px] text-slate-500/75 italic rotate-[8deg] pointer-events-none hidden lg:block whitespace-nowrap">
                            current obsession: agents ➔
                          </div>
                        </div>
                      </div>

                      {/* Small handwritten footer */}
                      <div className="text-center pt-3 font-hand-kalam text-xs text-slate-400/75 italic select-none">
                        "still learning, still shipping."
                      </div>

                      {/* Draggable Sticky note for human touch */}
                      <motion.div
                        drag
                        dragConstraints={constraintsRef}
                        dragElastic={0.15}
                        whileDrag={{ scale: 1.05, zIndex: 100 }}
                        whileHover={{ rotate: 1, scale: 1.02 }}
                        className="absolute bottom-[-15px] right-[-15px] w-40 bg-[#fced88] border border-yellow-300 p-3 shadow-md rounded rotate-[-4deg] cursor-grab active:cursor-grabbing text-slate-800 text-[10px] leading-tight select-none hidden xl:block z-30"
                      >
                        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-3.5 bg-white/40 shadow-sm" />
                        <p className="font-bold border-b border-slate-400/50 pb-0.5 mb-1.5 uppercase text-[8px] text-[#d35442]">desk log 📝</p>
                        <p>• Setup: Keychron Q2 Browns</p>
                        <p>• Coffee: 3 cups today ☕</p>
                        <p>• Obsession: RL bio simulations</p>
                        <p className="text-[7px] text-slate-500 mt-1 italic text-center">(Drag me anywhere!)</p>
                      </motion.div>
                    </div>
                  )}

                  {/* SPREAD 1: Workbench Scanner */}
                  {currentPage === 1 && (
                    <div className="space-y-4">

                      {/* Floppy Reader Slot */}
                      <div className="bg-slate-700 rounded-lg p-4 border-b-4 border-r-4 border-slate-800 shadow-md relative max-w-[420px] mx-auto select-none">
                        <div className="h-4 bg-slate-900 rounded border-2 border-slate-600 shadow-inner relative flex items-center px-4 overflow-hidden mb-2">
                          <AnimatePresence>
                            {diskLoadingState === "loading" && (
                              <motion.div
                                className="h-full bg-amber-500"
                                initial={{ width: 0 }}
                                animate={{ width: "100%" }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 1 }}
                              />
                            )}
                          </AnimatePresence>
                          <span className={`absolute right-4 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full shadow animate-pulse ${
                            diskLoadingState === "loaded" ? "bg-green-400" : "bg-red-600"
                          }`} />
                        </div>
                        <div className="flex justify-between items-center">
                          <p className="font-mono text-[8px] text-slate-400 uppercase tracking-widest">3.5" Module Reader</p>
                          <p className="font-hand-kalam text-[8px] text-slate-500 italic">Property of: Jenish's Workshop</p>
                        </div>
                      </div>

                      {/* Workbench Display Screen */}
                      <div className="bg-[#0d1117] rounded-lg p-4 border-4 border-slate-800 shadow-inner font-mono text-xs max-w-[420px] mx-auto flex flex-col justify-between relative overflow-hidden select-text" style={{ minHeight: '240px' }}>
                        <div className="screen-glare absolute inset-0 z-10 pointer-events-none" />

                        <div className="relative z-20 space-y-2">
                          {diskLoadingState === "idle" && (
                            <div className="flex flex-col items-center justify-center h-[200px] gap-2 text-center">
                              <div className="w-8 h-8 border-2 border-slate-600 rounded flex items-center justify-center">
                                <div className="w-4 h-4 bg-slate-700 border border-slate-500" />
                              </div>
                              <p className="text-slate-500 text-[10px] animate-pulse">insert a disk to scan tools</p>
                            </div>
                          )}

                          {diskLoadingState === "loading" && (
                            <div className="space-y-1 text-amber-400">
                              <p>WORKBENCH SCANNER</p>
                              <p className="text-slate-400">Reading disk...</p>
                              <p className="text-amber-300 animate-pulse">Scanning modules... please wait</p>
                            </div>
                          )}

                          {diskLoadingState === "loaded" && loadedDisk && (() => {
                            const usageMap: Record<string, { label: string; usedIn: string[] }> = {
                              languages: {
                                label: "DAILY USE",
                                usedIn: ["TypeScript → HireMindAI, Portfolio", "Python → codesentry, OncoEnv", "JavaScript → DevFlow, CollabBoard", "SQL → Neon DB, APIs", "HTML5 & CSS3 → all web projects", "Bash → dev scripts & CI"]
                              },
                              frontend: {
                                label: "DAILY USE",
                                usedIn: ["Next.js → HireMindAI, Portfolio", "React.js → DevFlow, SupportDesk", "Tailwind CSS → every interface", "Expo → Crack The Vault mobile", "TanStack Query → SupportDesk", "Framer Motion → Portfolio", "Shadcn UI → HireMindAI"]
                              },
                              backend: {
                                label: "DAILY USE",
                                usedIn: ["Node.js → DevFlow, SupportDesk", "Express.js → API backends", "FastAPI → codesentry, OncoEnv", "Socket.io → CollabBoard, DevFlow", "MongoDB → MERN stack projects", "PostgreSQL → HireMindAI", "Redis → caching layers"]
                              },
                              tools: {
                                label: "EXPLORING",
                                usedIn: ["Docker → Crack The Vault deploy", "Git / GitHub → all projects", "GitHub Webhooks → DevFlow", "NumPy & SciPy → OncoEnv", "Gemini & Vertex AI → HireMindAI", "Resend → email systems", "Nginx → server deployments"]
                              }
                            };
                            const info = usageMap[loadedDisk];
                            const statusColor = info.label === "DAILY USE" ? "text-green-400" : info.label === "EXPLORING" ? "text-yellow-400" : "text-blue-400";
                            return (
                              <div className="space-y-2">
                                <div className="flex justify-between items-center border-b border-slate-700 pb-1.5">
                                  <p className="text-slate-300 font-bold text-[10px] uppercase tracking-wider">WORKBENCH SCANNER</p>
                                  <span className={`text-[8px] font-bold uppercase tracking-widest border px-1.5 py-0.5 rounded ${
                                    info.label === "DAILY USE" ? "border-green-700 text-green-400" : "border-yellow-700 text-yellow-400"
                                  }`}>{info.label}</span>
                                </div>
                                <p className="text-slate-500 text-[9px]">Tools discovered:</p>
                                <div className="space-y-1 max-h-[140px] overflow-y-auto pr-1">
                                  {info.usedIn.map((line, i) => {
                                    const [tool, ...rest] = line.split(" → ");
                                    return (
                                      <div key={i}>
                                        <span className="text-[#4ade80]">✓ {tool}</span>
                                        {rest.length > 0 && (
                                          <p className="text-slate-500 text-[8px] pl-3">used in: → {rest.join(" → ")}</p>
                                        )}
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            );
                          })()}
                        </div>

                        {diskLoadingState === "loaded" && (
                          <div className="text-[8px] text-slate-600 border-t border-slate-800 pt-2 flex justify-between select-none mt-2">
                            <span>toolbox v2</span>
                            <span>last opened: today</span>
                          </div>
                        )}
                      </div>

                    </div>
                  )}

                  {/* SPREAD 2: Projects Cassette Player */}
                  {currentPage === 2 && (
                    <div className="space-y-4">
                      
                      {/* Cassette Tape Deck UI Accent */}
                      <div className="bg-slate-700 rounded-lg p-4 border-b-4 border-r-4 border-slate-800 shadow-md relative max-w-[480px] mx-auto select-none mb-3">
                        <div className="bg-slate-900 border-2 border-slate-800 rounded p-3 flex justify-between items-center relative overflow-hidden h-[80px]">
                          {/* Left Spinning Reel */}
                          <div className="w-12 h-12 rounded-full border-4 border-slate-600 bg-slate-800 flex justify-center items-center relative shadow-inner">
                            <motion.div 
                              className="w-1 h-8 bg-slate-400"
                              animate={isPlayingTape ? { rotate: 360 } : {}}
                              transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                            />
                          </div>

                          {/* Cassette Tape window */}
                          <div className="flex-1 border-2 border-slate-800 bg-[#e7d7c1]/20 rounded mx-3 flex items-center justify-center font-mono text-[9px] text-yellow-400/80 font-bold tracking-widest uppercase">
                            {selectedProject.title}
                          </div>

                          {/* Right Spinning Reel */}
                          <div className="w-12 h-12 rounded-full border-4 border-slate-600 bg-slate-800 flex justify-center items-center relative shadow-inner">
                            <motion.div 
                              className="w-1 h-8 bg-slate-400"
                              animate={isPlayingTape ? { rotate: 360 } : {}}
                              transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Display active project diagnostic view */}
                      <div className="w-full">
                        {selectedProject.type === "monitor" && (
                          <div className="bg-slate-400 p-4 rounded-xl shadow-md border-b-4 border-r-4 border-slate-500 relative max-w-[480px] mx-auto select-text">
                            <div className="bg-black rounded p-3 h-[240px] relative overflow-hidden border-2 border-slate-800 shadow-inner">
                              <div className="screen-glare absolute inset-0 pointer-events-none" />
                              <InteractiveTerminal />
                            </div>
                            
                            <div className="mt-3 pt-2 border-t border-slate-500/20">
                              <p className="font-mono text-[9px] text-slate-200 font-bold select-none">🛠 Tech Stack:</p>
                              <div className="flex flex-wrap gap-1 mt-1 select-none">
                                {selectedProject.stack.map(tag => (
                                  <span key={tag} className="text-[8.5px] text-[#4ade80] bg-slate-800 px-1.5 py-0.5 rounded shadow-sm border border-slate-700 font-mono">
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}

                        {selectedProject.type === "sandbox" && (
                          <div className="bg-[#f0e6d2] border-4 border-[#d35442]/80 rounded-xl shadow-md p-4 relative paper-texture max-w-[480px] mx-auto select-text">
                            <h3 className="text-xl font-marker text-[#d35442] mb-1">{selectedProject.title}</h3>
                            <p className="font-hand-kalam text-sm text-slate-600 mb-3">{selectedProject.subtitle}</p>
                            
                            <div className="mb-2">
                              <VaultSandbox />
                            </div>

                            <div className="mt-3 select-none">
                              <div className="flex flex-wrap gap-1">
                                {selectedProject.stack.map(tag => (
                                  <span key={tag} className="text-[10px] text-slate-800 bg-[#e7d7c1] px-2 py-0.5 rounded shadow-sm font-hand-kalam border border-black/10">
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}

                        {selectedProject.type === "dossier" && (
                          <div className="bg-[#fcfbe3] border-l-8 border-l-[#d35442] rounded-r-xl shadow-md p-5 relative paper-texture max-w-[480px] mx-auto min-h-[320px] flex flex-col justify-between select-text">
                            <div>
                              <h3 className="text-2xl font-marker text-[#d35442] mb-0.5 select-none">{selectedProject.title}</h3>
                              <p className="font-hand-kalam text-base text-slate-800 font-bold border-b border-[#d35442]/20 pb-1 mb-2">{selectedProject.subtitle}</p>
                              <p className="font-hand-kalam text-sm text-slate-600 leading-snug mb-3 select-none">{selectedProject.description}</p>

                              <div className="bg-white/50 border rounded p-3 mb-3 shadow-inner">
                                <h4 className="font-hand-kalam text-xs text-[#d35442] font-bold mb-1 select-none">⚡ Business Impact:</h4>
                                <ul className="font-hand-kalam text-xs space-y-0.5 text-slate-700 list-disc list-inside select-none">
                                  {selectedProject.metrics.map((m, i) => <li key={i}>{m}</li>)}
                                </ul>
                              </div>
                            </div>

                            <div>
                              <div className="flex flex-wrap gap-1 mb-3 select-none">
                                {selectedProject.stack.map(tag => (
                                  <span key={tag} className="text-[9.5px] text-slate-800 bg-[#e2cfb6] px-2 py-0.5 rounded shadow-sm font-hand-kalam border border-black/5">
                                    {tag}
                                  </span>
                                ))}
                              </div>

                              <div className="flex gap-3">
                                <a href={selectedProject.codeUrl} target="_blank" rel="noreferrer" className="font-hand-kalam text-xs border border-dashed border-slate-800 px-3 py-1 rounded hover:bg-slate-800 hover:text-white transition-all select-none">
                                  GitHub Code 💻
                                </a>
                                <a href={selectedProject.demoUrl} target="_blank" rel="noreferrer" className="font-hand-kalam text-xs border border-dashed border-[#d35442] px-3 py-1 rounded hover:bg-[#d35442] hover:text-white transition-all select-none text-[#d35442]">
                                  Live Demo 🔗
                                </a>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                    </div>
                  )}

                  {/* SPREAD 3: Flippable Polaroids */}
                  {currentPage === 3 && (
                    <div className="space-y-4 flex flex-col items-center">
                      <h3 className="font-hand-kalam text-base text-slate-800 font-bold select-none mb-2">
                        📷 Hover photo snapshots to flip details:
                      </h3>

                      <div className="flex flex-wrap gap-4 justify-center w-full max-h-[380px] overflow-y-auto pr-1">
                        {experiences.map(exp => {
                          const isFlipped = flippedPolaroid === exp.id;
                          return (
                            <div 
                              key={exp.id}
                              onMouseEnter={() => setFlippedPolaroid(exp.id)}
                              onMouseLeave={() => setFlippedPolaroid(null)}
                              className="relative w-40 h-48 cursor-pointer perspective-md"
                            >
                              <motion.div
                                animate={{ rotateY: isFlipped ? 180 : 0 }}
                                transition={{ duration: 0.5 }}
                                style={{ transformStyle: "preserve-3d" }}
                                className="w-full h-full relative"
                              >
                                
                                {/* Front: Polaroid Photo */}
                                <div 
                                  style={{ backfaceVisibility: "hidden" }}
                                  className="w-full h-full bg-white p-2.5 shadow-md border rounded-sm flex flex-col justify-between absolute inset-0"
                                >
                                  <div className="w-full h-28 bg-white border rounded-sm flex items-center justify-center relative overflow-hidden p-2">
                                    <div className="screen-glare absolute inset-0 opacity-10 pointer-events-none" />
                                    <img 
                                      src={
                                        exp.id === "Academor" 
                                          ? "/academor.png" 
                                          : exp.id === "Zuntra" 
                                          ? "/zuntra.png" 
                                          : "/Gfg.png"
                                      } 
                                      alt={exp.company} 
                                      className="max-w-full max-h-full object-contain select-none"
                                    />
                                  </div>
                                  <div className="text-center font-hand-kalam text-slate-800 mt-2 select-none">
                                    <p className="font-bold text-xs">{exp.company}</p>
                                    <p className="text-[10px] text-slate-500 font-mono">{exp.duration}</p>
                                  </div>
                                </div>

                                {/* Back: Polaroid Notes */}
                                <div 
                                  style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                                  className="w-full h-full bg-yellow-100 p-2.5 shadow-md border rounded-sm border-yellow-200 absolute inset-0 flex flex-col justify-between font-hand-kalam text-slate-800 text-[10px] leading-snug"
                                >
                                  <div>
                                    <p className="font-bold text-xs text-[#d35442] border-b pb-1 mb-1.5">{exp.role}</p>
                                    <ul className="list-disc list-inside space-y-0.5">
                                      {exp.bullets.map((b, i) => <li key={i}>{b}</li>)}
                                    </ul>
                                  </div>
                                  <p className="text-[8px] font-mono text-slate-500 text-right uppercase mt-1 select-none">Notes on back</p>
                                </div>

                              </motion.div>
                            </div>
                          );
                        })}
                      </div>

                    </div>
                  )}

                  {/* SPREAD 4: Connect Postcard & Paper Plane */}
                  {currentPage === 4 && (
                    <div className="flex-1 flex flex-col justify-center items-center relative overflow-visible">
                      <AnimatePresence mode="wait">
                        
                        {/* POSTCARD EDITING */}
                        {postcardState === "editing" && (
                          <motion.form
                            key="postcard-edit"
                            onSubmit={handleSendPostcard}
                            className="w-full max-w-[460px] bg-[#f8f5dc] border-[6px] border-[#e7d7c1] rounded-lg shadow-layered p-5 relative paper-texture flex flex-col sm:grid sm:grid-cols-2 gap-4 text-slate-800 font-hand-kalam"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                          >
                            <div className="absolute top-4 bottom-4 left-1/2 w-[1px] bg-slate-400/40 hidden sm:block" />

                            {/* Message fields */}
                            <div className="space-y-3">
                              <div>
                                <label className="block text-xs text-[#d35442] font-bold mb-0.5">Your Name:</label>
                                <input
                                  type="text"
                                  required
                                  value={senderName}
                                  onChange={e => setSenderName(e.target.value)}
                                  placeholder="Recruiter Name..."
                                  className="w-full bg-transparent border-b border-slate-400/60 pb-1 outline-none text-sm placeholder:text-slate-500/50"
                                />
                              </div>
                              <div>
                                <label className="block text-xs text-[#d35442] font-bold mb-0.5">Your Email:</label>
                                <input
                                  type="email"
                                  required
                                  value={senderEmail}
                                  onChange={e => setSenderEmail(e.target.value)}
                                  placeholder="name@company.com..."
                                  className="w-full bg-transparent border-b border-slate-400/60 pb-1 outline-none text-sm placeholder:text-slate-500/50"
                                />
                              </div>
                              <div>
                                <label className="block text-xs text-[#d35442] font-bold mb-0.5">Your Note:</label>
                                <textarea
                                  required
                                  rows={3}
                                  value={senderMsg}
                                  onChange={e => setSenderMsg(e.target.value)}
                                  placeholder="I love your portfolio, let's connect..."
                                  className="w-full bg-transparent border-b border-slate-400/60 pb-1 outline-none text-xs resize-none placeholder:text-slate-500/50 leading-relaxed"
                                />
                              </div>
                            </div>

                            {/* Stamp & Address details */}
                            <div className="flex flex-col justify-between items-center sm:pl-4 text-center">
                              <div className="w-16 h-20 border-2 border-dashed border-slate-400 bg-white/60 rounded flex flex-col justify-center items-center shadow-inner relative">
                                <span className="text-xl">📬</span>
                                <span className="text-[7.5px] font-mono text-slate-500 mt-1 uppercase">Chennai</span>
                                <span className="text-[6.5px] font-mono text-slate-400">Postage</span>
                              </div>

                              <div className="font-hand-kalam text-xs text-slate-600/80 leading-normal select-none my-2 sm:my-0">
                                <p className="font-bold border-b border-slate-300 w-28 mx-auto">To: Jenish J</p>
                                <p>Chennai, India</p>
                                <p className="text-[10px] text-slate-400/60 mt-1">GMT +5:30</p>
                              </div>

                              <button
                                type="submit"
                                className="bg-[#d35442] text-white font-bold px-4 py-2 rounded shadow hover:bg-[#b83b2a] transition-all cursor-pointer text-sm active:scale-95"
                              >
                                Send Postcard ✉️
                              </button>
                            </div>
                          </motion.form>
                        )}

                        {/* SENDING: PAPER AIRPLANE LOOPING PATH ANIMATION */}
                        {postcardState === "sending" && (
                          <motion.div
                            key="postcard-send"
                            className="absolute flex items-center justify-center select-none"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                          >
                            {/* SVG Paper Plane looping across the page spread */}
                            <motion.svg 
                              width="50" 
                              height="50" 
                              viewBox="0 0 24 24" 
                              fill="none" 
                              stroke="#d35442" 
                              strokeWidth="2"
                              animate={{ 
                                x: [0, 150, -50, 420], 
                                y: [0, -120, -180, 0], 
                                rotate: [0, -15, -45, 20], 
                                scale: [1, 1.2, 0.8, 0] 
                              }}
                              transition={{ duration: 2.2, ease: "easeInOut" }}
                              className="text-[#d35442] drop-shadow-md"
                            >
                              <path d="M22 2L11 13M22 2l-7 20-4-9-9-4z" />
                            </motion.svg>
                            <p className="absolute bottom-[-60px] font-hand-kalam text-sm text-[#d35442] font-bold animate-pulse whitespace-nowrap">Mailing Postcard... ✈️</p>
                          </motion.div>
                        )}

                        {/* POSTCARD CONFIRMED */}
                        {postcardState === "sent" && (
                          <motion.div
                            key="postcard-sent"
                            initial={{ scale: 0.8, opacity: 0, rotate: 2 }}
                            animate={{ scale: 1, opacity: 1, rotate: -2 }}
                            className="bg-yellow-100 border-2 border-yellow-300 p-6 rounded shadow-lg max-w-[385px] text-center font-hand-kalam text-slate-800 relative"
                          >
                            <div className="absolute -top-3 left-[40%] -translate-x-1/2 w-16 h-6 bg-white/40 shadow-sm rounded-sm" />
                            <span className="text-4xl block mb-3">📬</span>
                            <h4 className="text-2xl font-bold text-[#b83b2a] mb-2">Postcard Sent!</h4>
                            <p className="text-base leading-relaxed mb-4">
                              Your letter has been sent to my inbox! I will get back to you as soon as I finish my coffee.
                            </p>
                            <button
                              onClick={handleResetPostcard}
                              className="text-xs bg-slate-800 text-white px-3 py-1 rounded hover:bg-slate-700 cursor-pointer select-none"
                            >
                              Write another note
                            </button>
                          </motion.div>
                        )}

                      </AnimatePresence>
                    </div>
                  )}

                </div>

                {/* Page turn indicator footer */}
                <div className="border-t border-[#d35442]/10 pt-4 flex justify-between items-center text-slate-500 font-mono text-[9px] uppercase select-none tracking-widest mt-6">
                  <span>Page {currentPage + 1} / 5</span>
                  <button 
                    onClick={() => setIsBookOpen(false)}
                    className="hover:underline text-[#d35442]/80 uppercase cursor-pointer"
                  >
                    Close Book 📘
                  </button>
                </div>
              </div>

              {/* ================= BINDER TABS (Folder Dividers on Right Edge) ================= */}
              <div className="absolute right-[-10px] md:right-[-42px] top-[15%] bottom-[15%] w-10 flex flex-col justify-between py-12 z-0 pointer-events-auto">
                {tabs.map((tab) => {
                  const isActive = currentPage === tab.index;
                  return (
                    <button
                      key={tab.index}
                      onClick={() => setCurrentPage(tab.index)}
                      className={`font-hand-kalam text-[10px] md:text-xs leading-none py-3 px-1 border-2 border-l-0 border-slate-700/30 rounded-r-md transition-all duration-300 relative cursor-pointer select-none flex items-center justify-center -rotate-90 md:rotate-0 ${tab.color} ${
                        isActive 
                          ? "translate-x-[2px] z-30 font-bold opacity-100 shadow-md scale-110" 
                          : "opacity-60 hover:opacity-100 hover:translate-x-[1.5px] z-10"
                      }`}
                      style={{
                        transformOrigin: "left center",
                        width: "80px",
                        height: "36px",
                      }}
                    >
                      {tab.label}
                    </button>
                  );
                })}
              </div>

            </motion.div>
          )}

        </AnimatePresence>
      </div>

    </div>
  );
}
