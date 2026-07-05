import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import InteractiveTerminal from "./InteractiveTerminal";
import VaultSandbox from "./VaultSandbox";
import LofiWalkman from "./LofiWalkman";

interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  category: "ai" | "web" | "tooling";
  type: "monitor" | "sandbox" | "dossier";
  metrics: string[];
  stack: string[];
  codeUrl: string;
  demoUrl: string;
}

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
  
  // Navigation tabs
  const tabs = [
    { label: "blueprint 📝", index: 0, color: "bg-[#e7d7c1] text-slate-800" },
    { label: "floppy disk 🛠", index: 1, color: "bg-[#88c5f7] text-slate-800" },
    { label: "cassettes 📁", index: 2, color: "bg-[#fbc67b] text-slate-800" },
    { label: "polaroids 💼", index: 3, color: "bg-[#a259ff]/20 text-[#a259ff] border-[#a259ff]/30" },
    { label: "postcard ✉️", index: 4, color: "bg-note-yellow text-slate-800" },
  ];

  // Mindset Brain node state
  const [activeBrainNode, setActiveBrainNode] = useState<string>("manifesto");

  // Floppy reader states
  const [loadedDisk, setLoadedDisk] = useState<string | null>(null);
  const [diskLoadingState, setDiskLoadingState] = useState<"idle" | "loading" | "loaded">("idle");

  // Cassette deck states
  const [selectedProjectId, setSelectedProjectId] = useState<string>("hiremind");
  const [isPlayingTape, setIsPlayingTape] = useState(true);

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

  // Zoho/OpenEnv ledger experiences
const experiences = [
  {
    id: "Academor",
    role: "AI Engineering Intern",
    company: "Academor",
    duration: "June 24 - July 24",
    bullets: [
      "Fine-tuned ML models in PyTorch",
      "Built data preprocessing pipelines",
      "Optimized deep learning workflows"
    ]
  },
    {
    id: "GFG",
    role: "Full Stack Developer Course",
    company: "GeeksforGeeks",
    duration: "April 25 - July 25",
    bullets: [
      "14-week React & Node JS course",
      "Built production-ready MERN apps",
      "Mastered MongoDB & Express APIs"
    ]
  },
  {
    id: "Zuntra",
    role: "AI Agent & Automation Intern",
    company: "Zuntra",
    duration: "Sep 25 - Mar 26",
    bullets: [
      "Integrated LLM APIs & systems",
      "Built React & Node.js features",
      "Designed autonomous AI workflows"
    ]
  }

];

  // 7 Projects list
  const projects: Project[] = [
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

  const selectedProject = projects.find(p => p.id === selectedProjectId) || projects[0];

  const diskSkills: Record<string, string[]> = {
    languages: ["TypeScript", "JavaScript", "Python", "SQL", "HTML5 & CSS3", "Bash Scripting"],
    frontend: ["Next.js", "React.js", "Tailwind CSS", "Expo Mobile", "TanStack Query", "Framer Motion", "Shadcn UI"],
    backend: ["Node.js", "Express.js", "FastAPI (Python)", "Socket.io (WebSockets)", "Drizzle ORM", "Mongoose ODM", "MongoDB", "PostgreSQL (Neon)", "Redis"],
    tools: ["Docker", "Git / GitHub", "GitHub Webhooks & OAuth", "NumPy & SciPy", "Google Gemini & Vertex AI", "Resend Mailer", "Nginx"]
  };

  const handleLoadDisk = (diskId: string) => {
    if (loadedDisk === diskId) return;
    setDiskLoadingState("loading");
    setTimeout(() => {
      setLoadedDisk(diskId);
      setDiskLoadingState("loaded");
    }, 1000);
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
            {/* Left Blueprint Sticker */}
            <motion.div
              initial={{ opacity: 0, x: -50, rotate: -12 }}
              animate={{ opacity: 0.8, x: 0, rotate: -8 }}
              exit={{ opacity: 0, x: -80, transition: { duration: 0.3 } }}
              className="absolute left-[2%] lg:left-[8%] xl:left-[12%] top-[12%] w-44 h-44 bg-[#fced88] p-5 shadow-lg rotate-[-8deg] font-hand-kalam text-slate-800 border border-yellow-300 rounded-sm pointer-events-none hidden md:block"
            >
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-5 bg-white/40 shadow-sm rounded-sm" />
              <p className="font-bold border-b border-slate-400/50 pb-1 mb-2">💡 manifesto:</p>
              <p className="text-xs leading-normal">"I only build tools that solve practical bottlenecks & friction points."</p>
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
              onClick={() => { setIsBookOpen(true); setCurrentPage(0); }}
              style={{ transformOrigin: "left center" }}
              className="w-full max-w-[500px] h-[600px] bg-[#221c18] border-[12px] border-[#13100e] rounded-l-md rounded-r-3xl shadow-2xl flex flex-col justify-between p-8 text-center cursor-pointer transition-shadow duration-300 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.4))] pointer-events-none" />
              <div className="absolute left-0 top-0 bottom-0 w-8 bg-[#13100e] border-r-2 border-[#ff5a46]/20 shadow-inner" />

              {/* Cover Sticker */}
              <div className="mt-16 bg-[#fcfbe3] p-6 border-4 border-dashed border-[#d35442]/60 rounded-xl rotate-[-2deg] shadow-lg max-w-[360px] mx-auto relative group-hover:rotate-[1deg] transition-transform duration-300">
                <h1 className="text-4xl sm:text-5xl font-marker text-[#d35442] mb-2">Jenish J</h1>
                <p className="font-hand-kalam text-xl text-slate-800 font-bold border-t border-[#d35442]/20 pt-2 uppercase tracking-wide">
                  inventor's logbook
                </p>
                <div className="absolute -top-3 -left-3 text-3xl">⚙️</div>
                <div className="absolute -bottom-3 -right-3 text-3xl">🔋</div>
              </div>

              {/* Tape Sticker */}
              <div className="tape w-32 h-6 rotate-[6deg] mx-auto mt-6 z-10 text-[10px] font-mono text-slate-900 font-bold flex items-center justify-center bg-white/90 shadow-sm">
                SYSTEM LAB FILE
              </div>

              <div className="mb-10 text-cream-light space-y-4">
                <motion.p 
                  animate={{ scale: [1, 1.06, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  className="font-hand-kalam text-2xl text-[#4ade80]"
                >
                  tap to boot console ⚙️
                </motion.p>
                <div className="flex justify-center items-center gap-1 text-red-400 font-hand-kalam text-sm select-none">
                  <span>( initialize</span>
                  <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 1, repeat: Infinity }}>➔</motion.span>
                  <span>)</span>
                </div>
              </div>
            </motion.div>
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
                          <circle cx="100" cy="20" r="10" fill="#d35442" className="cursor-pointer hover:scale-125 transition-transform" onMouseEnter={() => setActiveBrainNode("manifesto")} />
                          <circle cx="40" cy="70" r="10" fill="#88c5f7" className="cursor-pointer hover:scale-125 transition-transform" onMouseEnter={() => setActiveBrainNode("friction")} />
                          <circle cx="160" cy="70" r="10" fill="#a259ff" className="cursor-pointer hover:scale-125 transition-transform" onMouseEnter={() => setActiveBrainNode("ai")} />
                          <circle cx="100" cy="100" r="10" fill="#fbc67b" className="cursor-pointer hover:scale-125 transition-transform" onMouseEnter={() => setActiveBrainNode("tactile")} />

                          <text x="100" y="36" textAnchor="middle" fontSize="7" className="font-mono fill-slate-700 font-bold select-none">MANIFESTO</text>
                          <text x="40" y="86" textAnchor="middle" fontSize="7" className="font-mono fill-slate-700 font-bold select-none">FRICTION</text>
                          <text x="160" y="86" textAnchor="middle" fontSize="7" className="font-mono fill-slate-700 font-bold select-none">INTELLIGENCE</text>
                          <text x="100" y="114" textAnchor="middle" fontSize="7" className="font-mono fill-slate-700 font-bold select-none">TACTILE</text>
                        </svg>
                      </div>

                      {/* Display text based on hovered node */}
                      <div className="bg-white/60 border border-slate-300 rounded p-3 h-[180px] shadow-sm font-hand-kalam text-slate-800 leading-snug flex flex-col justify-center text-center">
                        {activeBrainNode === "manifesto" && (
                          <p className="text-sm"><b>MANIFESTO</b>: "I build smart systems that automate tedious bottlenecks so builders can think bigger."</p>
                        )}
                        {activeBrainNode === "friction" && (
                          <p className="text-sm"><b>SOLVE FRICTION</b>: "repetitive work is a bug. codesentry and HireMindAI were built directly to solve developer and hiring pipelines bottlenecks."</p>
                        )}
                        {activeBrainNode === "ai" && (
                          <p className="text-sm"><b>AI INTELLIGENCE</b>: "AI models shouldn't reside inside sterile chatbot frames. They must be woven directly into terminal workflows and science sandboxes (OncoEnv)."</p>
                        )}
                        {activeBrainNode === "tactile" && (
                          <p className="text-sm"><b>TACTILE MECHANICS</b>: "A digital workspace should feel real. Draggable cards, clickable slots, and spinning cassettes are what make code memorable."</p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* SPREAD 1: Floppy Catalog Box */}
                  {currentPage === 1 && (
                    <div className="space-y-4">
                      <div className="border-b-2 border-dashed border-[#d35442]/20 pb-2">
                        <h2 className="text-3xl font-marker text-[#d35442] mb-0.5">disk catalog</h2>
                        <p className="font-hand-kalam text-xs text-slate-800 font-bold uppercase tracking-wider">select a disk to insert in reader</p>
                      </div>

                      {/* Disk catalog list */}
                      <div className="grid grid-cols-2 gap-4 pt-4">
                        {[
                          { id: "languages", label: "Languages", color: "bg-blue-600 border-blue-800" },
                          { id: "frontend", label: "Frontend", color: "bg-purple-600 border-purple-800" },
                          { id: "backend", label: "Backend", color: "bg-emerald-600 border-emerald-800" },
                          { id: "tools", label: "Tools", color: "bg-orange-600 border-orange-800" }
                        ].map(disk => (
                          <div 
                            key={disk.id}
                            onClick={() => handleLoadDisk(disk.id)}
                            className={`p-3 rounded border-2 text-white font-mono cursor-pointer flex flex-col justify-between shadow-md hover:-translate-y-1 hover:shadow-lg transition-all select-none ${disk.color}`}
                          >
                            <div className="flex justify-between items-start">
                              <div className="w-5 h-5 bg-white rounded-sm flex items-center justify-center shadow-inner">
                                <div className="w-3.5 h-3.5 bg-slate-200 border-t border-slate-400" />
                              </div>
                              <span className="text-[7.5px] border border-white/30 px-1 rounded uppercase tracking-wider font-bold">3.5" HD</span>
                            </div>
                            <p className="text-xs font-bold border-t border-white/20 mt-4 pt-1 uppercase tracking-wide">{disk.label}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* SPREAD 2: Project Cassettes */}
                  {currentPage === 2 && (
                    <div className="space-y-3">
                      <h2 className="text-3xl font-marker text-[#d35442] border-b-2 border-dashed border-[#d35442]/20 pb-1.5 select-none">
                        project deck
                      </h2>
                      <p className="font-hand-kalam text-xs text-slate-600 mb-1 select-none">select a cassette to spin in the deck:</p>

                      <div className="space-y-1.5 max-h-[380px] overflow-y-auto pr-1">
                        {projects.map((project, idx) => {
                          const isSelected = selectedProjectId === project.id;
                          return (
                            <div
                              key={project.id}
                              onClick={() => handleSelectProject(project.id)}
                              className={`p-2.5 rounded border border-slate-300 shadow-sm cursor-pointer select-none font-mono flex items-center gap-3 transition-colors ${
                                isSelected ? "bg-[#e7d7c1] border-[#d35442] text-slate-800 font-bold" : "bg-white/60 hover:bg-[#e7d7c1]/20 text-slate-700"
                              }`}
                            >
                              {/* Small Cassette outline */}
                              <div className="w-9 h-5 border border-slate-600 rounded bg-slate-900 flex justify-around items-center px-1">
                                <div className="w-1.5 h-1.5 rounded-full bg-slate-400 border border-slate-600" />
                                <div className="w-1.5 h-1.5 rounded-full bg-slate-400 border border-slate-600" />
                              </div>
                              <span className="text-xs leading-none">{idx + 1}. {project.title}</span>
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
              <div className="md:col-span-7 bg-[#fcfdf2] rounded-r-2xl p-6 sm:p-8 relative paper-texture transition-all duration-300 border-r-2 border-slate-300 min-h-[580px] flex flex-col justify-between">
                
                <div className="flex-1 flex flex-col justify-center">
                  
                  {/* SPREAD 0: Manifesto Details */}
                  {currentPage === 0 && (
                    <div className="space-y-4 font-hand-kalam text-slate-800 relative">
                      <h3 className="text-3xl font-marker text-[#d35442] border-b pb-1 select-none">my manifesto</h3>
                      
                      <div className="space-y-3 text-sm leading-relaxed">
                        <p>
                          I don't just write code; I design systems that take over the repetitive parts of my day so I can spend more time thinking about new ideas.
                        </p>
                        
                        <div className="p-3 bg-white/40 border rounded shadow-sm">
                          <p className="font-bold text-[#d35442] text-sm">1. Solve Real Friction 🛠:</p>
                          <p className="text-slate-700 mt-1 pl-2 border-l border-slate-400">
                            I only build tools that solve practical bottlenecks (e.g. <b>codesentry</b> scanning AI code for leaks, <b>HireMindAI</b> automating ATS workflows).
                          </p>
                        </div>

                        <div className="p-3 bg-white/40 border rounded shadow-sm">
                          <p className="font-bold text-[#d35442] text-sm">2. Tactile Feedback 🖱:</p>
                          <p className="text-slate-700 mt-1 pl-2 border-l border-slate-400">
                            A portfolio should feel like exploring someone's desk. If it doesn't click, hover, or react with physical intent, it's not finished.
                          </p>
                        </div>

                        <div className="p-3 bg-white/40 border rounded shadow-sm">
                          <p className="font-bold text-[#d35442] text-sm">3. Human-Centric AI 🧠:</p>
                          <p className="text-slate-700 mt-1 pl-2 border-l border-slate-400">
                            AI shouldn't be a generic chat box. It should be a workspace companion integrated directly into developer tools.
                          </p>
                        </div>
                      </div>

                      {/* Draggable Sticky note for human touch */}
                      <motion.div
                        drag
                        dragConstraints={constraintsRef}
                        dragElastic={0.15}
                        whileDrag={{ scale: 1.05, zIndex: 100 }}
                        whileHover={{ rotate: 1, scale: 1.02 }}
                        className="absolute bottom-[-20px] right-[-10px] w-40 bg-[#fced88] border border-yellow-300 p-3 shadow-md rounded rotate-[-4deg] cursor-grab active:cursor-grabbing text-slate-800 text-[10px] leading-tight select-none hidden sm:block z-30"
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

                  {/* SPREAD 1: Floppy Disk Reader Interface */}
                  {currentPage === 1 && (
                    <div className="space-y-6">
                      
                      {/* Floppy Reader Slot */}
                      <div className="bg-slate-700 rounded-lg p-5 border-b-4 border-r-4 border-slate-800 shadow-md relative max-w-[420px] mx-auto select-none">
                        <div className="h-4 bg-slate-900 rounded border-2 border-slate-600 shadow-inner relative flex items-center px-4 overflow-hidden mb-3">
                          <AnimatePresence>
                            {diskLoadingState === "loading" && (
                              <motion.div 
                                className="h-full bg-blue-500" 
                                initial={{ width: 0 }} 
                                animate={{ width: "100%" }} 
                                exit={{ opacity: 0 }}
                                transition={{ duration: 1 }}
                              />
                            )}
                          </AnimatePresence>
                          <span className="absolute right-4 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-red-600 shadow animate-pulse" />
                        </div>
                        <p className="font-mono text-[9px] text-slate-400 uppercase tracking-widest text-right">3.5" Floppy Disk Reader Slot</p>
                      </div>

                      {/* Display Screen */}
                      <div className="bg-black rounded-lg p-4 h-[240px] border-4 border-slate-800 shadow-inner font-mono text-xs text-[#4ade80] max-w-[420px] mx-auto flex flex-col justify-between relative overflow-hidden select-text">
                        <div className="screen-glare absolute inset-0 z-10 pointer-events-none" />
                        
                        <div className="relative z-20 space-y-2">
                          {diskLoadingState === "idle" && (
                            <p className="text-slate-500 animate-pulse text-center mt-16">INSERT A FLOPPY DISK TO BOOT DIAGNOSTIC REPORT...</p>
                          )}
                          
                          {diskLoadingState === "loading" && (
                            <div className="space-y-1">
                              <p>BOOT DIAGNOSTICS: INITIALIZING...</p>
                              <p>MOUNTING DRIVE: OK [3.5" HD]</p>
                              <p className="text-yellow-400">READING FILE BLOCKS... [PLEASE WAIT]</p>
                            </div>
                          )}

                          {diskLoadingState === "loaded" && loadedDisk && (
                            <div className="space-y-1.5">
                              <p className="text-[#a259ff] font-bold">SYSTEM DIAGNOSTIC: {loadedDisk.toUpperCase()} DISK LOADED</p>
                              <p className="text-slate-400">------------------------------------</p>
                              {diskSkills[loadedDisk].map((skill, i) => (
                                <p key={i} className="flex justify-between">
                                  <span>&gt; {skill}</span>
                                  <span className="text-cream-light font-bold">ONLINE</span>
                                </p>
                              ))}
                              <p className="text-slate-400">------------------------------------</p>
                              <p className="text-xs text-yellow-400 font-bold">STATUS: OK [100% READY TO COMPILE]</p>
                            </div>
                          )}
                        </div>

                        {diskLoadingState === "loaded" && (
                          <div className="text-[8px] text-slate-500 border-t border-slate-800 pt-2 flex justify-between select-none">
                            <span>Diagnostic v1.42</span>
                            <span>Jenish J Console</span>
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
