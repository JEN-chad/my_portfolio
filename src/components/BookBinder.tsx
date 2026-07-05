import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import InteractiveTerminal from "./InteractiveTerminal";
import VaultSandbox from "./VaultSandbox";

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
  const [checkedConnect, setCheckedConnect] = useState<number[]>([]);
  const [postcardState, setPostcardState] = useState<"editing" | "sending" | "sent">("editing");
  
  // Postcard form states
  const [senderName, setSenderName] = useState("");
  const [senderEmail, setSenderEmail] = useState("");
  const [senderMsg, setSenderMsg] = useState("");

  // Projects states
  const [selectedProjectId, setSelectedProjectId] = useState<string>("hiremind");
  const [viewedProjects, setViewedProjects] = useState<string[]>(["hiremind"]);
  const [hoveredProjectId, setHoveredProjectId] = useState<string | null>(null);

  // Draggable notes reset physics
  const isTidiedRef = useRef(true);
  const [isTidiedState, setIsTidiedState] = useState(true);
  const langControls = useAnimation();
  const frontendControls = useAnimation();
  const toolsControls = useAnimation();
  const backendControls = useAnimation();
  const exploreControls = useAnimation();
  const exp1Controls = useAnimation();
  const exp2Controls = useAnimation();
  const exp3Controls = useAnimation();

  useEffect(() => {
    langControls.set({ rotate: -2, x: 0, y: 0 });
    frontendControls.set({ rotate: 2, x: 0, y: 0 });
    toolsControls.set({ rotate: -1, x: 0, y: 0 });
    backendControls.set({ rotate: 2, x: 0, y: 0 });
    exploreControls.set({ rotate: 2, x: 0, y: 0 });
    exp1Controls.set({ rotate: -1, x: 0, y: 0 });
    exp2Controls.set({ rotate: 1, x: 0, y: 0 });
    exp3Controls.set({ rotate: -2, x: 0, y: 0 });
  }, [isBookOpen, currentPage]);

  const handleDragStart = () => {
    isTidiedRef.current = false;
    setIsTidiedState(false);
  };

  const tidyDesk = () => {
    isTidiedRef.current = true;
    setIsTidiedState(true);
    const springTransition = { type: "spring", stiffness: 200, damping: 18 };
    langControls.start({ x: 0, y: 0, rotate: -2, transition: springTransition });
    frontendControls.start({ x: 0, y: 0, rotate: 2, transition: springTransition });
    toolsControls.start({ x: 0, y: 0, rotate: -1, transition: springTransition });
    backendControls.start({ x: 0, y: 0, rotate: 2, transition: springTransition });
    exploreControls.start({ x: 0, y: 0, rotate: 2, transition: springTransition });
    exp1Controls.start({ x: 0, y: 0, rotate: -1, transition: springTransition });
    exp2Controls.start({ x: 0, y: 0, rotate: 1, transition: springTransition });
    exp3Controls.start({ x: 0, y: 0, rotate: -2, transition: springTransition });
  };

  // Projects list
  const projects = [
    {
      id: "hiremind",
      title: "HireMindAI",
      subtitle: "AI Recruitment Operating System",
      description: "Automated candidate evaluations, resume parsers, and custom interview graders built using Vertex AI pipeline platforms.",
      category: "ai",
      type: "dossier",
      metrics: [
        "Automates up to 95% of the screening lifecycle",
        "Reduces manual recruiter hours by over 80%",
        "Standardizes candidate technical/behavioral scoring",
        "Authenticates resumes through background validation layers"
      ],
      stack: ["Next.js", "Drizzle ORM", "Neon Postgres", "Google Gemini", "Vertex AI", "Resend"],
      codeUrl: "https://github.com/JEN-chad/HireMindAI",
      demoUrl: "https://github.com/JEN-chad/HireMindAI"
    },
    {
      id: "codesentry",
      title: "codesentry",
      subtitle: "Real-time AI Code Security CLI Scanner",
      description: "CLI scanner catching hardcoded secrets, SQLi, and unsafe deserialization before they commit.",
      category: "tooling",
      type: "monitor",
      metrics: [
        "Completes commit code scans in under 0.4 seconds",
        "Flags hardcoded keys, SQLi, and unsafe deserializations",
        "Bypasses heavy dependencies using pure-Python rules",
        "Generates drop-in AI prompts for ChatGPT/Claude fixes"
      ],
      stack: ["Python", "FastAPI", "CLI", "Static Analysis", "AI prompting"],
      codeUrl: "https://github.com/JEN-chad/codesentry",
      demoUrl: "https://github.com/JEN-chad/codesentry"
    },
    {
      id: "oncoenv",
      title: "OncoEnv",
      subtitle: "Bioinformatics RL Agent Environment",
      description: "A procedural biological world state generator designed to train and benchmark autonomous science LLM agents.",
      category: "ai",
      type: "dossier",
      metrics: [
        "Simulates scRNA-seq count matrices & regulatory networks",
        "Features 40+ simulated tools (QC, clustering, markers)",
        "Implements dense stepwise biological reward functions",
        "Enables hyper-fast training loops built on numpy/scipy"
      ],
      stack: ["Python", "FastAPI", "Uvicorn", "Pydantic", "NumPy", "SciPy", "OpenEnv"],
      codeUrl: "https://github.com/JEN-chad/OncoEnv",
      demoUrl: "https://github.com/JEN-chad/OncoEnv"
    },
    {
      id: "vault",
      title: "Crack The Vault",
      subtitle: "LLM Prompt Injection Security Game",
      description: "Interactive cyberpunk sandbox challenging players to trick an AI guard into releasing college symposium funds.",
      category: "ai",
      type: "sandbox",
      metrics: [
        "Leverages a dynamic safety threshold rising as players win",
        "Features real-time policy engine scoring & injection guards",
        "Includes a fully populated 3D admin monitor dashboard",
        "Ensures complete prompt safety isolation via isolated gateways"
      ],
      stack: ["FastAPI", "Next.js", "Expo Mobile", "Drizzle ORM", "Neon Postgres", "Docker"],
      codeUrl: "https://github.com/JEN-chad/Crack-The-Vault",
      demoUrl: "https://github.com/JEN-chad/Crack-The-Vault"
    },
    {
      id: "devflow",
      title: "DevFlow",
      subtitle: "GitHub Integrated Sprint Workspace",
      description: "SaaS project manager merging Agile boards with real-time GitHub webhook sync loops.",
      category: "web",
      type: "dossier",
      metrics: [
        "Syncs commits, PRs, and issues directly to board tickets",
        "Maintains multi-client rooms using Socket.io synchronization",
        "Provides sprint burndown velocity and cycle time tracking",
        "Features a buttery-smooth drag-and-drop kanban grid"
      ],
      stack: ["MongoDB", "Express", "React", "Node.js", "Socket.io", "Tailwind CSS"],
      codeUrl: "https://github.com/JEN-chad/DevFlow",
      demoUrl: "https://github.com/JEN-chad/DevFlow"
    },
    {
      id: "collabboard",
      title: "CollabBoard",
      subtitle: "Real-Time Kanban Workspace",
      description: "Real-time task board built with optimistic client updates and conflict resolution protocols.",
      category: "web",
      type: "dossier",
      metrics: [
        "Maintains real-time board collaboration over WebSockets",
        "Handles write collisions through version conflict checkers",
        "Features optimistic updates on clients for near-zero lag",
        "Includes user audit logs detailing historical board events"
      ],
      stack: ["React", "Vite", "Tailwind CSS", "Socket.io", "Express", "MongoDB"],
      codeUrl: "https://github.com/JEN-chad/CollabBoard",
      demoUrl: "https://github.com/JEN-chad/CollabBoard"
    },
    {
      id: "supportdesk",
      title: "SupportDesk",
      subtitle: "Multi-Tenant Support Ticketing Platform",
      description: "Enterprise Zendesk clone featuring strict query-level customer workspace isolation.",
      category: "web",
      type: "dossier",
      metrics: [
        "Guarantees multi-tenant database isolation boundaries",
        "Supports workspace invitations and collaborative tickets",
        "Displays real-time support team performance analytics",
        "Maintains swift UI states using TanStack Query caching"
      ],
      stack: ["React", "Tailwind CSS", "React Query", "Node.js", "Express", "MongoDB"],
      codeUrl: "https://github.com/JEN-chad/SupportDesk",
      demoUrl: "https://github.com/JEN-chad/SupportDesk"
    }
  ];

  const handleSelectProject = (id: string) => {
    setSelectedProjectId(id);
    if (!viewedProjects.includes(id)) {
      setViewedProjects(prev => [...prev, id]);
    }
  };

  const selectedProject = projects.find(p => p.id === selectedProjectId) || projects[0];

  const checklistItems = [
    "Building useful AI products",
    "Solving meaningful problems",
    "Collaborating with curious builders",
  ];

  const toggleCheckConnect = (i: number) => {
    setCheckedConnect(prev =>
      prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i]
    );
  };

  const allConnectChecked = checkedConnect.length === checklistItems.length;

  const handleSendPostcard = (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderName || !senderEmail || !senderMsg) return;

    setPostcardState("sending");

    setTimeout(() => {
      setPostcardState("sent");
      // Trigger fallback mailto in new window
      const subject = encodeURIComponent(`Portfolio Connect from ${senderName}`);
      const body = encodeURIComponent(`${senderMsg}\n\nSender Email: ${senderEmail}`);
      window.location.href = `mailto:jenishj.dev@gmail.com?subject=${subject}&body=${body}`;
    }, 1200);
  };

  const handleResetPostcard = () => {
    setSenderName("");
    setSenderEmail("");
    setSenderMsg("");
    setPostcardState("editing");
  };

  // 3D book cover flips open
  const handleOpenBook = () => {
    setIsBookOpen(true);
    setCurrentPage(0);
  };

  // Tabs configuration
  const tabs = [
    { label: "intro 📝", index: 0, color: "bg-[#e7d7c1] text-slate-800" },
    { label: "skills 🛠", index: 1, color: "bg-[#88c5f7] text-slate-800" },
    { label: "projects 📁", index: 2, color: "bg-[#fbc67b] text-slate-800" },
    { label: "experience 💼", index: 3, color: "bg-[#a259ff]/20 text-[#a259ff] border-[#a259ff]/30" },
    { label: "postcard ✉️", index: 4, color: "bg-note-yellow text-slate-800" },
  ];

  return (
    <div ref={constraintsRef} className="w-full max-w-6xl mx-auto py-6 px-4 select-none relative z-20">
      
      {/* 3D BOOK CONTAINER */}
      <div className="relative w-full flex justify-center items-center perspective-lg min-h-[660px]">
        
        {/* DESK ENVIRONMENT ACCENTS - only when book is closed */}
        <AnimatePresence>
          {!isBookOpen && (
            <>
              {/* Left Desk Note */}
              <motion.div
                initial={{ opacity: 0, x: -50, rotate: -12 }}
                animate={{ opacity: 0.8, x: 0, rotate: -8 }}
                exit={{ opacity: 0, x: -80, transition: { duration: 0.35 } }}
                className="absolute left-[2%] lg:left-[10%] xl:left-[14%] top-[15%] w-40 h-40 bg-[#fced88] p-4 shadow-md rotate-[-8deg] font-hand-kalam text-slate-800 text-sm border border-yellow-300 rounded-sm select-none pointer-events-none hidden md:block"
              >
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-5 bg-white/40 shadow-sm rounded-sm" />
                <p className="font-bold border-b border-slate-400/50 pb-1 mb-2">💡 manifesto:</p>
                <p className="text-xs leading-normal">"I only build tools that solve practical bottlenecks & friction points."</p>
              </motion.div>

              {/* Right Desk Coffee Mug */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 0.85, x: 0 }}
                exit={{ opacity: 0, x: 80, transition: { duration: 0.35 } }}
                className="absolute right-[2%] lg:right-[10%] xl:right-[14%] bottom-[20%] w-24 h-24 text-cream-light font-hand-kalam select-none pointer-events-none hidden md:block"
              >
                {/* Steaming Coffee mug illustration */}
                <svg viewBox="0 0 100 100" className="w-full h-full text-cream-light opacity-60" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M30 75 Q 50 78, 70 75 L 67 45 L 33 45 Z" />
                  <path d="M70 50 Q 82 50, 80 60 Q 78 70, 68 68" />
                  <path d="M35 40 Q 40 30, 35 20 M 45 38 Q 50 28, 45 18 M 55 40 Q 60 30, 55 20" strokeDasharray="3 3" />
                  <path d="M20 78 Q 50 82, 80 78" strokeWidth="1" />
                </svg>
                <p className="text-[10px] text-center text-cream-light/40 font-mono mt-1 uppercase tracking-widest">charging... ☕</p>
              </motion.div>
              
              {/* Hand-drawn red arrow pointing to book */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                animate={{ opacity: 0.9, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.3 } }}
                className="absolute left-[18%] lg:left-[22%] xl:left-[26%] bottom-[12%] text-red-500 hidden xl:block select-none pointer-events-none"
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

        <AnimatePresence mode="wait">
          
          {/* ================= CLOSED BOOK COVER ================= */}
          {!isBookOpen ? (
            <motion.div
              key="closed-cover"
              initial={{ rotateY: 0, opacity: 0, scale: 0.95 }}
              animate={{ rotateY: 0, opacity: 1, scale: 1 }}
              exit={{ 
                rotateY: -110, 
                opacity: 0, 
                scale: 0.9, 
                x: "-30%",
                transition: { duration: 0.7, ease: [0.25, 1, 0.5, 1] } 
              }}
              whileHover={{ 
                scale: 1.04, 
                rotate: 0.5, 
                y: -10, 
                boxShadow: "0 35px 70px rgba(0,0,0,0.6)" 
              }}
              onClick={handleOpenBook}
              style={{ transformOrigin: "left center" }}
              className="w-full max-w-[500px] h-[600px] bg-[#2d2520] border-[12px] border-[#1d1815] rounded-l-md rounded-r-3xl shadow-2xl flex flex-col justify-between p-8 text-center cursor-pointer transition-shadow duration-300 relative overflow-hidden group select-none"
            >
              {/* Cover texture / aging */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.4))] pointer-events-none" />
              <div className="absolute inset-0 lined-paper-bg opacity-[0.02] pointer-events-none" />

              {/* Decorative Leather Spine on left */}
              <div className="absolute left-0 top-0 bottom-0 w-8 bg-[#1d1815] border-r-2 border-[#ff5a46]/20 shadow-inner" />

              {/* Title Sticker */}
              <div className="mt-16 bg-[#fcfbe3] p-6 border-4 border-dashed border-[#d35442]/60 rounded-xl rotate-[-2deg] shadow-lg max-w-[360px] mx-auto relative group-hover:rotate-[1deg] transition-transform duration-300">
                <h1 className="text-4xl sm:text-5xl font-marker text-[#d35442] mb-2">Jenish J</h1>
                <p className="font-hand-kalam text-xl text-slate-800 font-bold border-t border-[#d35442]/20 pt-2">
                  creative notebook
                </p>
                <div className="absolute -top-3 -left-3 text-3xl">⭐</div>
                <div className="absolute -bottom-3 -right-3 text-3xl">☕</div>
              </div>

              {/* Tape Sticker */}
              <div className="tape w-28 h-6 rotate-12 mx-auto mt-6 z-10 text-[10px] font-mono text-slate-700/80 flex items-center justify-center">
                STUDENT & AI DEV
              </div>

              {/* Greeting Card tag at bottom */}
              <div className="mb-10 text-cream-light space-y-4">
                <motion.p 
                  animate={{ scale: [1, 1.06, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  className="font-hand-kalam text-2xl text-[#4ade80]"
                >
                  click to open book 📖
                </motion.p>
                <div className="flex justify-center items-center gap-1 text-red-400 font-hand-kalam text-sm select-none">
                  <span>( flip open</span>
                  <motion.span 
                    animate={{ x: [0, 4, 0] }} 
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    ➔
                  </motion.span>
                  <span>)</span>
                </div>
                <p className="font-mono text-xs text-cream-light/60 tracking-wider">
                   चेन्नई, भारत · Chennai, India
                </p>
              </div>

              {/* Bottom Spine details */}
              <div className="absolute bottom-2 left-10 font-mono text-[9px] text-[#ff5a46]/40 uppercase select-none tracking-widest">
                AI-Native OS v1.42
              </div>
            </motion.div>
          ) : (
            
            // ================= OPEN BOOK SPREAD =================
            <motion.div
              key="open-book"
              initial={{ rotateY: 90, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="w-full flex flex-col md:grid md:grid-cols-12 relative z-10"
            >
              
              {/* ================= BINDER SPINE (Center Rings) ================= */}
              <div className="absolute left-[calc(41.666%-12px)] top-0 bottom-0 w-6 flex flex-col justify-around py-8 z-30 pointer-events-none select-none hidden md:flex">
                {Array.from({ length: 14 }).map((_, i) => (
                  <div key={i} className="w-6 h-3 rounded-full bg-gradient-to-r from-slate-700 via-slate-500 to-slate-800 border border-slate-900 shadow-md transform -translate-x-[2px]" />
                ))}
              </div>

              {/* ================= LEFT PAGE ================= */}
              <div className="md:col-span-5 bg-[#fcf9d6] border-l-[12px] border-notebook-border/80 rounded-r-none md:rounded-l-2xl shadow-2xl p-6 sm:p-8 relative paper-texture transition-all duration-300 md:-rotate-0.5 min-h-[580px] flex flex-col justify-between">
                
                {/* Red Margin Line */}
                <div className="absolute right-6 top-0 bottom-0 w-[1.5px] bg-[#d35442]/30 hidden md:block" />

                {/* Left Page content pages based on currentPage */}
                <div className="flex-1 flex flex-col justify-between">
                  
                  {/* SPREAD 0: Intro Cover / Developer Manifesto */}
                  {currentPage === 0 && (
                    <div className="space-y-5">
                      <div className="border-b-2 border-dashed border-[#d35442]/20 pb-2">
                        <h2 className="text-3xl font-marker text-[#d35442] mb-1">my manifesto</h2>
                        <p className="font-hand-kalam text-base text-slate-800 font-bold uppercase tracking-wider">the mindset behind the builds</p>
                      </div>
                      
                      <div className="font-hand-kalam text-[15px] text-slate-800 space-y-4 leading-normal select-none">
                        <p>
                          I don't just write code; I design systems that take over the repetitive parts of my day so I can spend more time thinking about new ideas.
                        </p>
                        
                        <div className="space-y-2">
                          <p className="font-bold text-[#d35442] text-base flex items-center gap-1.5">
                            <span>1. Solve Real Friction 🛠:</span>
                          </p>
                          <p className="pl-3 border-l-2 border-[#d35442]/20 text-slate-700">
                            I only build tools that solve practical bottlenecks (e.g. <b>codesentry</b> scanning AI code for leaks, <b>HireMindAI</b> automating ATS workflows).
                          </p>
                        </div>

                        <div className="space-y-2">
                          <p className="font-bold text-[#d35442] text-base flex items-center gap-1.5">
                            <span>2. Tactile Feedback 🖱:</span>
                          </p>
                          <p className="pl-3 border-l-2 border-[#d35442]/20 text-slate-700">
                            A portfolio should feel like exploring someone's desk. If it doesn't click, hover, or react with physical intent, it's not finished.
                          </p>
                        </div>

                        <div className="space-y-2">
                          <p className="font-bold text-[#d35442] text-base flex items-center gap-1.5">
                            <span>3. Human-Centric AI 🧠:</span>
                          </p>
                          <p className="pl-3 border-l-2 border-[#d35442]/20 text-slate-700">
                            AI shouldn't be a generic chat box. It should be a workspace companion integrated directly into developer tools.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* SPREAD 1: Skills Intro */}
                  {currentPage === 1 && (
                    <div className="space-y-6">
                      <div className="border-b-2 border-dashed border-[#d35442]/20 pb-4">
                        <h2 className="text-4xl font-marker text-[#d35442] mb-1">skills stack</h2>
                        <p className="font-hand-kalam text-lg text-slate-800 font-bold uppercase tracking-wider">the languages & tools</p>
                      </div>

                      <div className="font-hand-kalam space-y-4 text-slate-800">
                        <div>
                          <p className="font-bold text-[#d35442] text-lg">Languages & Core:</p>
                          <p className="text-lg pl-3 border-l-2 border-[#d35442]/20">TypeScript, JavaScript, Python, HTML, CSS</p>
                        </div>
                        <div>
                          <p className="font-bold text-[#d35442] text-lg">Frontend UI/UX:</p>
                          <p className="text-lg pl-3 border-l-2 border-[#d35442]/20">React, Next.js, Vue, Tailwind CSS, Framer Motion</p>
                        </div>
                        <div>
                          <p className="font-bold text-[#d35442] text-lg">AI & Automation Platforms:</p>
                          <p className="text-lg pl-3 border-l-2 border-[#d35442]/20">Google Gemini, Vertex AI, OpenEnv Core, OpenAI API</p>
                        </div>
                        <div>
                          <p className="font-bold text-[#d35442] text-lg">Databases & Operations:</p>
                          <p className="text-lg pl-3 border-l-2 border-[#d35442]/20">Node.js, Express, Drizzle ORM, Docker, Neon Postgres</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* SPREAD 2: Projects List */}
                  {currentPage === 2 && (
                    <div className="space-y-4">
                      <h2 className="text-4xl font-marker text-[#d35442] mb-3 border-b-2 border-dashed border-[#d35442]/20 pb-3 select-none">
                        project index
                      </h2>

                      {/* checklist index */}
                      <ul className="space-y-2 font-hand-kalam text-xl">
                        {projects.map((project, idx) => {
                          const isSelected = selectedProjectId === project.id;
                          const isViewed = viewedProjects.includes(project.id);
                          return (
                            <li
                              key={project.id}
                              className="relative p-2 rounded transition-all duration-200 cursor-pointer flex items-center gap-3 z-10"
                              onMouseEnter={() => setHoveredProjectId(project.id)}
                              onMouseLeave={() => setHoveredProjectId(null)}
                              onClick={() => handleSelectProject(project.id)}
                            >
                              {/* Gliding highlighter overlay */}
                              <AnimatePresence>
                                {hoveredProjectId === project.id && (
                                  <motion.div
                                    layoutId="highlighter"
                                    className="absolute inset-0 bg-yellow-300/40 rounded-sm -z-10 transform -rotate-1 skew-x-3"
                                    transition={{ type: "spring", stiffness: 250, damping: 20 }}
                                  />
                                )}
                              </AnimatePresence>

                              <div className="w-5.5 h-5.5 rounded-full border-2 border-[#d35442] flex items-center justify-center bg-white/60 shrink-0">
                                {isViewed && (
                                  <span className="text-[#d35442] font-bold text-xs leading-none">✓</span>
                                )}
                              </div>

                              <span className={`text-base leading-none ${
                                isSelected ? "text-slate-900 font-bold border-b border-slate-900/60" : "text-slate-700/80 hover:text-slate-900"
                              }`}>
                                {idx + 1}. {project.title}
                              </span>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  )}

                  {/* SPREAD 3: Experience Ledger */}
                  {currentPage === 3 && (
                    <div className="space-y-6">
                      <div className="border-b-2 border-dashed border-[#d35442]/20 pb-4">
                        <h2 className="text-4xl font-marker text-[#d35442] mb-1">internships</h2>
                        <p className="font-hand-kalam text-lg text-slate-800 font-bold uppercase tracking-wider">work & learnings ledger</p>
                      </div>

                      <div className="font-hand-kalam space-y-5 text-slate-800">
                        <div className="p-3 bg-white/40 border border-slate-300/30 rounded shadow-sm">
                          <p className="text-slate-950 font-bold text-lg leading-tight">AI Engineering Intern</p>
                          <p className="text-xs font-mono text-slate-500 mt-0.5">Zoho Corporation · June 2023 - Dec 2023</p>
                          <p className="text-base text-slate-700 mt-2 leading-snug">Fine-tuned local open-source LLM layers. Built high-velocity webhook parsers and refactored UI components with Vitest tests.</p>
                        </div>
                        <div className="p-3 bg-white/40 border border-slate-300/30 rounded shadow-sm">
                          <p className="text-slate-950 font-bold text-lg leading-tight">Bioinformatics Software Intern</p>
                          <p className="text-xs font-mono text-slate-500 mt-0.5">OpenEnv Labs · Jan 2024 - June 2024</p>
                          <p className="text-base text-slate-700 mt-2 leading-snug">Designed OpenAI-compatible agent API bindings, static analysis scan scripts, and CD workflows.</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* SPREAD 4: Connect Alignments */}
                  {currentPage === 4 && (
                    <div className="space-y-6">
                      <div className="border-b-2 border-dashed border-[#d35442]/20 pb-4">
                        <h2 className="text-4xl font-marker text-[#d35442] mb-1">alignments</h2>
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
                                {isChecked && (
                                  <span className="text-[#d35442] font-bold text-sm">✓</span>
                                )}
                              </div>
                              <span className={`font-hand-kalam text-lg leading-tight transition-colors duration-150 ${isChecked ? "text-[#b83b2a] font-bold" : "text-slate-700 group-hover:text-slate-900"}`}>
                                {text}
                              </span>
                            </li>
                          );
                        })}
                      </ul>

                      {/* Align completion post-it */}
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

                {/* Always shipping subtext */}
                <div className="border-t border-[#d35442]/10 pt-4 flex justify-between items-center text-slate-600 font-mono text-[9.5px] uppercase select-none tracking-widest mt-6">
                  <span>Chennai, India</span>
                  <span>GMT +5:30</span>
                </div>

                {/* Lined Paper Lines background layer */}
                <div className="absolute inset-0 lined-paper-bg opacity-[0.03] pointer-events-none rounded-l-2xl" />
              </div>

              {/* ================= RIGHT PAGE ================= */}
              <div className="md:col-span-7 bg-[#fcfdf2] rounded-l-none md:rounded-r-2xl shadow-2xl p-6 sm:p-8 relative paper-texture transition-all duration-300 md:rotate-0.5 min-h-[580px] flex flex-col justify-between border-r-2 border-slate-300">
                
                {/* Right Page Content pages */}
                <div className="flex-1 flex flex-col">
                  
                  {/* SPREAD 0: Belief Notes (Draggable) */}
                  {currentPage === 0 && (
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="font-hand-kalam text-xl text-slate-800 font-bold mb-6 text-center select-none">
                          🛠 Beliefs scattered on desk:
                        </h3>
                        
                        {/* Draggable notes area */}
                        <div className="relative w-full h-[360px] border border-dashed border-slate-300/40 rounded-lg p-4 group">
                          
                          {/* Note 1: Clarity over complexity */}
                          <motion.div
                            drag
                            dragConstraints={constraintsRef}
                            dragElastic={0.1}
                            onDragStart={handleDragStart}
                            animate={langControls}
                            whileDrag={{ scale: 1.05, rotate: 0, zIndex: 100 }}
                            whileHover={{ y: -4, rotate: -2 }}
                            className="absolute w-44 h-36 bg-[#fced88] shadow-md border border-yellow-200 p-4 flex items-center justify-center rounded-sm cursor-grab active:cursor-grabbing font-hand-kalam text-slate-800 text-center text-xl select-none"
                            style={{ left: "10%", top: "40px" }}
                          >
                            Clarity over<br />complexity.
                          </motion.div>

                          {/* Note 2: Software ease */}
                          <motion.div
                            drag
                            dragConstraints={constraintsRef}
                            dragElastic={0.1}
                            onDragStart={handleDragStart}
                            animate={frontendControls}
                            whileDrag={{ scale: 1.05, rotate: 0, zIndex: 100 }}
                            whileHover={{ y: -4, rotate: 2 }}
                            className="absolute w-48 h-36 bg-[#88c5f7]/30 shadow-md border border-[#88c5f7]/50 p-4 flex items-center justify-center rounded-sm cursor-grab active:cursor-grabbing font-hand-kalam text-slate-800 text-center text-xl select-none"
                            style={{ right: "10%", top: "20px" }}
                          >
                            Software should<br />make work<br />easier.
                          </motion.div>

                          {/* Note 3: Learn Build Repeat */}
                          <motion.div
                            drag
                            dragConstraints={constraintsRef}
                            dragElastic={0.1}
                            onDragStart={handleDragStart}
                            animate={toolsControls}
                            whileDrag={{ scale: 1.05, rotate: 0, zIndex: 100 }}
                            whileHover={{ y: -4, rotate: -1 }}
                            className="absolute w-44 h-36 bg-note-tan shadow-md border border-slate-300 p-4 flex flex-col items-center justify-center rounded-sm cursor-grab active:cursor-grabbing font-hand-kalam text-slate-800 text-center text-xl select-none"
                            style={{ left: "28%", top: "180px" }}
                          >
                            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 text-xl select-none">📎</div>
                            Learn.<br />Build.<br />Repeat.
                          </motion.div>

                          {/* Reset Tidy Button */}
                          <AnimatePresence>
                            {!isTidiedState && (
                              <motion.button
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                onClick={tidyDesk}
                                className="absolute bottom-4 right-4 bg-[#e7d7c1] border border-black/10 px-3 py-1 rounded-full text-xs font-hand-kalam text-slate-700 hover:bg-slate-800 hover:text-white cursor-pointer select-none"
                              >
                                tidy desk 🧹
                              </motion.button>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>

                      {/* Small Quote Footer */}
                      <p className="text-right font-hand-kalam text-sm italic text-slate-500 mt-4">
                        *all cards above are draggable
                      </p>
                    </div>
                  )}

                  {/* SPREAD 1: Skills Desk (Draggable stack cards) */}
                  {currentPage === 1 && (
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="font-hand-kalam text-xl text-slate-800 font-bold mb-4 text-center select-none">
                          🛠 Drag your categories around the desk:
                        </h3>

                        <div className="relative w-full h-[380px] border border-dashed border-slate-300/40 rounded-lg p-4 group">
                          
                          {/* Note 1: Frontend stack */}
                          <motion.div
                            drag
                            dragConstraints={constraintsRef}
                            dragElastic={0.1}
                            onDragStart={handleDragStart}
                            animate={langControls}
                            whileDrag={{ scale: 1.05, zIndex: 100 }}
                            whileHover={{ y: -4 }}
                            className="absolute w-44 bg-white shadow-md border p-4 rounded-sm cursor-grab active:cursor-grabbing text-slate-800 font-hand-kalam"
                            style={{ left: "8%", top: "20px" }}
                          >
                            <h4 className="font-bold text-[#d35442] border-b pb-1 mb-2">Frontend</h4>
                            <ul className="text-sm space-y-1">
                              <li>React & Vite</li>
                              <li>Next.js</li>
                              <li>Vue & HTML</li>
                              <li>Tailwind CSS</li>
                            </ul>
                          </motion.div>

                          {/* Note 2: Backend stack */}
                          <motion.div
                            drag
                            dragConstraints={constraintsRef}
                            dragElastic={0.1}
                            onDragStart={handleDragStart}
                            animate={frontendControls}
                            whileDrag={{ scale: 1.05, zIndex: 100 }}
                            whileHover={{ y: -4 }}
                            className="absolute w-44 bg-[#fcfbe3] shadow-md border p-4 rounded-sm cursor-grab active:cursor-grabbing text-slate-800 font-hand-kalam"
                            style={{ right: "8%", top: "40px" }}
                          >
                            <h4 className="font-bold text-[#d35442] border-b pb-1 mb-2">Backend</h4>
                            <ul className="text-sm space-y-1">
                              <li>Node.js</li>
                              <li>Express</li>
                              <li>PostgreSQL</li>
                              <li>MongoDB</li>
                            </ul>
                          </motion.div>

                          {/* Note 3: Tools I Like */}
                          <motion.div
                            drag
                            dragConstraints={constraintsRef}
                            dragElastic={0.1}
                            onDragStart={handleDragStart}
                            animate={toolsControls}
                            whileDrag={{ scale: 1.05, zIndex: 100 }}
                            whileHover={{ y: -4 }}
                            className="absolute w-48 bg-note-tan shadow-md border p-4 rounded-sm cursor-grab active:cursor-grabbing text-slate-800 font-hand-kalam"
                            style={{ left: "28%", top: "180px" }}
                          >
                            <h4 className="font-bold text-[#d35442] border-b pb-1 mb-2">Tools</h4>
                            <ul className="text-sm space-y-1">
                              <li>Docker</li>
                              <li>Drizzle ORM</li>
                              <li>Google Gemini</li>
                              <li>n8n Automation</li>
                            </ul>
                          </motion.div>

                          {/* Tidy Desk button */}
                          <AnimatePresence>
                            {!isTidiedState && (
                              <motion.button
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                onClick={tidyDesk}
                                className="absolute bottom-4 right-4 bg-[#e7d7c1] border border-black/10 px-3 py-1 rounded-full text-xs font-hand-kalam text-slate-700 hover:bg-slate-800 hover:text-white cursor-pointer select-none"
                              >
                                tidy desk 🧹
                              </motion.button>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* SPREAD 2: Build Logs workspace (dossier folders / monitors) */}
                  {currentPage === 2 && (
                    <div className="flex-1 flex flex-col justify-center">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={selectedProject.id}
                          initial={{ opacity: 0, scale: 0.96 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.96 }}
                          transition={{ duration: 0.2 }}
                          className="w-full"
                        >
                          
                          {/* MONITOR WORKSPACE */}
                          {selectedProject.type === "monitor" && (
                            <div className="bg-slate-400 p-4 sm:p-5 rounded-xl shadow-md border-b-4 border-r-4 border-slate-500 relative max-w-[480px] mx-auto">
                              <div className="bg-black rounded p-3 h-[280px] relative overflow-hidden border-2 border-slate-800 shadow-inner select-text">
                                <div className="screen-glare absolute inset-0 pointer-events-none" />
                                <InteractiveTerminal />
                              </div>
                              <div className="absolute bottom-1 right-5 w-8 h-1 bg-green-500 rounded-full" />
                              
                              {/* Stack listing below monitor screen */}
                              <div className="mt-3 pt-2 border-t border-slate-500/20">
                                <p className="font-mono text-[10px] text-slate-200 font-bold select-none">🛠 Tech Stack:</p>
                                <div className="flex flex-wrap gap-1 mt-1">
                                  {selectedProject.stack.map(tag => (
                                    <span key={tag} className="text-[9px] text-[#4ade80] bg-slate-800 px-1.5 py-0.5 rounded shadow-sm border border-slate-700 font-mono">
                                      {tag}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>
                          )}

                          {/* SANDBOX VAULT WORKSPACE */}
                          {selectedProject.type === "sandbox" && (
                            <div className="bg-[#f0e6d2] border-4 border-[#d35442]/80 rounded-xl shadow-md p-4 relative paper-texture max-w-[480px] mx-auto select-text">
                              <h3 className="text-xl font-marker text-[#d35442] mb-1">{selectedProject.title}</h3>
                              <p className="font-hand-kalam text-sm text-slate-600 mb-3">{selectedProject.subtitle}</p>
                              
                              <div className="mb-2">
                                <VaultSandbox />
                              </div>

                              <div className="mt-3">
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

                          {/* DOSSIER WORKSPACE */}
                          {selectedProject.type === "dossier" && (
                            <div className="bg-[#fcfbe3] border-l-8 border-l-[#d35442] rounded-r-xl shadow-md p-5 relative paper-texture max-w-[480px] mx-auto min-h-[420px] flex flex-col justify-between">
                              <div>
                                <h3 className="text-2xl font-marker text-[#d35442] mb-0.5 select-none">{selectedProject.title}</h3>
                                <p className="font-hand-kalam text-base text-slate-800 font-bold border-b border-[#d35442]/20 pb-1 mb-3">{selectedProject.subtitle}</p>
                                
                                <p className="font-hand-kalam text-sm text-slate-600 leading-snug mb-4 select-none">
                                  {selectedProject.description}
                                </p>

                                <div className="bg-white/50 border rounded p-3 mb-4 shadow-inner">
                                  <h4 className="font-hand-kalam text-xs text-[#d35442] font-bold mb-1.5 select-none">⚡ Business Impact:</h4>
                                  <ul className="font-hand-kalam text-xs space-y-1 text-slate-700 list-disc list-inside select-none">
                                    {selectedProject.metrics.map((m, i) => <li key={i}>{m}</li>)}
                                  </ul>
                                </div>
                              </div>

                              <div>
                                <div className="flex flex-wrap gap-1 mb-4 select-none">
                                  {selectedProject.stack.map(tag => (
                                    <span key={tag} className="text-[10px] text-slate-800 bg-[#e2cfb6] px-2 py-0.5 rounded shadow-sm font-hand-kalam border border-black/5">
                                      {tag}
                                    </span>
                                  ))}
                                </div>

                                <div className="flex gap-3">
                                  <a 
                                    href={selectedProject.codeUrl} 
                                    target="_blank" 
                                    rel="noreferrer" 
                                    className="font-hand-kalam text-xs border border-dashed border-slate-800 px-3 py-1 rounded hover:bg-slate-800 hover:text-white transition-all select-none"
                                  >
                                    GitHub Code 💻
                                  </a>
                                  <a 
                                    href={selectedProject.demoUrl} 
                                    target="_blank" 
                                    rel="noreferrer" 
                                    className="font-hand-kalam text-xs border border-dashed border-[#d35442] px-3 py-1 rounded hover:bg-[#d35442] hover:text-white transition-all select-none text-[#d35442]"
                                  >
                                    Live Demo 🔗
                                  </a>
                                </div>
                              </div>
                            </div>
                          )}

                        </motion.div>
                      </AnimatePresence>
                    </div>
                  )}

                  {/* SPREAD 3: Experience Cards (Draggable thumbtack notes) */}
                  {currentPage === 3 && (
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="font-hand-kalam text-xl text-slate-800 font-bold mb-6 text-center select-none">
                          💼 Internships pinned on desk:
                        </h3>

                        <div className="relative w-full h-[360px] border border-dashed border-slate-300/40 rounded-lg p-4 group">
                          
                          {/* Note 1: Zoho Internship */}
                          <motion.div
                            drag
                            dragConstraints={constraintsRef}
                            dragElastic={0.1}
                            onDragStart={handleDragStart}
                            animate={exp1Controls}
                            whileDrag={{ scale: 1.05, zIndex: 100 }}
                            whileHover={{ y: -4 }}
                            className="absolute w-48 bg-white text-card-foreground p-4 rounded-sm shadow-md cursor-grab active:cursor-grabbing font-hand-kalam text-slate-800"
                            style={{ left: "5%", top: "30px" }}
                          >
                            <div className="thumbtack select-none" />
                            <h4 className="font-bold text-sm">AI Engineering Intern</h4>
                            <p className="text-[10px] text-slate-500 font-mono mt-0.5">Zoho Corp · June - Dec 2023</p>
                            <ul className="list-disc list-inside space-y-1 text-xs text-slate-700 mt-2 select-none">
                              <li>Fine-tuned open LLMs</li>
                              <li>High-speed telemetry</li>
                              <li>Modular UI & tests</li>
                            </ul>
                          </motion.div>

                          {/* Note 2: OpenEnv Internship */}
                          <motion.div
                            drag
                            dragConstraints={constraintsRef}
                            dragElastic={0.1}
                            onDragStart={handleDragStart}
                            animate={exp2Controls}
                            whileDrag={{ scale: 1.05, zIndex: 100 }}
                            whileHover={{ y: -4 }}
                            className="absolute w-48 bg-[#fcfbe3] text-card-foreground p-4 rounded-sm shadow-md cursor-grab active:cursor-grabbing font-hand-kalam text-slate-800"
                            style={{ right: "5%", top: "50px" }}
                          >
                            <div className="thumbtack select-none" />
                            <h4 className="font-bold text-sm">Software Engineering</h4>
                            <p className="text-[10px] text-slate-500 font-mono mt-0.5">OpenEnv · Jan - June 2024</p>
                            <ul className="list-disc list-inside space-y-1 text-xs text-slate-700 mt-2 select-none">
                              <li>RL Agent bindings</li>
                              <li>Python scan hooks</li>
                              <li>CI/CD Docker setups</li>
                            </ul>
                          </motion.div>

                          {/* Note 3: Torn Paper Debugging note */}
                          <motion.div
                            drag
                            dragConstraints={constraintsRef}
                            dragElastic={0.1}
                            onDragStart={handleDragStart}
                            animate={exp3Controls}
                            whileDrag={{ scale: 1.05, zIndex: 100 }}
                            whileHover={{ y: -4 }}
                            className="absolute w-44 cursor-grab active:cursor-grabbing pt-3"
                            style={{ left: "28%", top: "185px" }}
                          >
                            <div className="torn-paper text-slate-800 p-4 shadow-lg text-center font-hand-kalam text-base leading-tight bg-[#fced88]">
                              <div className="thumbtack select-none" />
                              learned that<br />
                              debugging is<br />
                              basically<br />
                              detective work 🕵️
                            </div>
                          </motion.div>

                          {/* Tidy Desk button */}
                          <AnimatePresence>
                            {!isTidiedState && (
                              <motion.button
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                onClick={tidyDesk}
                                className="absolute bottom-4 right-4 bg-[#e7d7c1] border border-black/10 px-3 py-1 rounded-full text-xs font-hand-kalam text-slate-700 hover:bg-slate-800 hover:text-white cursor-pointer select-none"
                              >
                                tidy desk 🧹
                              </motion.button>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* SPREAD 4: Connect Postcard (Interactive mailing form) */}
                  {currentPage === 4 && (
                    <div className="flex-1 flex flex-col justify-center items-center">
                      <AnimatePresence mode="wait">
                        
                        {/* POSTCARD EDITING STATE */}
                        {postcardState === "editing" && (
                          <motion.form
                            key="postcard-edit"
                            onSubmit={handleSendPostcard}
                            className="w-full max-w-[460px] bg-[#f8f5dc] border-[6px] border-[#e7d7c1] rounded-lg shadow-layered p-5 relative paper-texture flex flex-col sm:grid sm:grid-cols-2 gap-4 text-slate-800 font-hand-kalam"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0, scale: 0.9, rotate: -8, y: -200, transition: { duration: 0.8 } }}
                          >
                            {/* Card divider */}
                            <div className="absolute top-4 bottom-4 left-1/2 w-[1px] bg-slate-400/40 hidden sm:block" />

                            {/* Left Side: Message Fields */}
                            <div className="space-y-3">
                              <div>
                                <label className="block text-xs text-[#d35442] font-bold select-none mb-1">Your Name:</label>
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
                                <label className="block text-xs text-[#d35442] font-bold select-none mb-1">Your Email:</label>
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
                                <label className="block text-xs text-[#d35442] font-bold select-none mb-1">Your Note:</label>
                                <textarea
                                  required
                                  rows={3}
                                  value={senderMsg}
                                  onChange={e => setSenderMsg(e.target.value)}
                                  placeholder="I love your portfolio, let's setup a call..."
                                  className="w-full bg-transparent border-b border-slate-400/60 pb-1 outline-none text-xs resize-none placeholder:text-slate-500/50 leading-relaxed"
                                />
                              </div>
                            </div>

                            {/* Right Side: Stamp & Mail triggers */}
                            <div className="flex flex-col justify-between items-center sm:pl-4 text-center">
                              
                              {/* Postage Stamp */}
                              <div className="w-16 h-20 border-2 border-dashed border-slate-400 bg-white/60 rounded flex flex-col justify-center items-center shadow-inner relative select-none">
                                <span className="text-xl">📬</span>
                                <span className="text-[7.5px] font-mono text-slate-500 mt-1 uppercase">Chennai</span>
                                <span className="text-[6.5px] font-mono text-slate-400">Postage</span>
                              </div>

                              {/* Target details */}
                              <div className="font-hand-kalam text-xs text-slate-600/80 leading-normal select-none my-2 sm:my-0">
                                <p className="font-bold border-b border-slate-300 w-28 mx-auto">To: Jenish J</p>
                                <p>Chennai, India</p>
                                <p className="text-[10px] text-slate-400/60 mt-1">GMT +5:30</p>
                              </div>

                              {/* Submit button */}
                              <button
                                type="submit"
                                className="bg-[#d35442] text-white font-bold px-4 py-2 rounded shadow hover:bg-[#b83b2a] transition-all cursor-pointer select-none text-sm active:scale-95"
                              >
                                Send Postcard ✉️
                              </button>
                            </div>
                          </motion.form>
                        )}

                        {/* SENDING / FLYING STATE */}
                        {postcardState === "sending" && (
                          <motion.div
                            key="postcard-send"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex flex-col items-center justify-center p-8 text-center text-slate-800 font-hand-kalam"
                          >
                            <span className="text-5xl animate-bounce mb-4">✈️</span>
                            <h4 className="text-xl font-bold">Mailing Postcard...</h4>
                            <p className="text-sm text-slate-500">Routing through Chennai servers...</p>
                          </motion.div>
                        )}

                        {/* POSTCARD SENT CONFIRMATION */}
                        {postcardState === "sent" && (
                          <motion.div
                            key="postcard-sent"
                            initial={{ scale: 0.8, opacity: 0, rotate: 2 }}
                            animate={{ scale: 1, opacity: 1, rotate: -2 }}
                            className="bg-yellow-100 border-2 border-yellow-300 p-6 rounded shadow-lg max-w-[380px] text-center font-hand-kalam text-slate-800 relative"
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

                {/* Page Navigation Indicator */}
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
