import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import InteractiveTerminal from "./InteractiveTerminal";
import VaultSandbox from "./VaultSandbox";
import LofiWalkman from "./LofiWalkman";
import FloatingKey from "./FloatingKey";

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
  experimentId: string;
  researchQuestion: string;
  systemDesign: string;
  challenges: string[];
  techFormula: string[];
  result: string;
  status: string;
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
  const lockRef = useRef<HTMLDivElement>(null);
  const coverShakeControls = useAnimation();

  // Session-persisted unlock state
  const [bookLocked, setBookLocked] = useState<boolean>(
    () => sessionStorage.getItem("logbook_unlocked") !== "true"
  );

  // Navigation tabs
  const tabs = [
    { label: "Profile 📝", index: 0, color: "bg-[#e7d7c1] text-slate-800" },
    { label: "Modules 🛠", index: 1, color: "bg-[#88c5f7] text-slate-800" },
    { label: "Archives 📁", index: 2, color: "bg-[#fbc67b] text-slate-800" },
    { label: "Blueprints 📐", index: 3, color: "bg-[#86d9cc] text-slate-800" },
    { label: "Field Logs 💼", index: 4, color: "bg-[#c5aefb] text-slate-800" },
    { label: "Transmission ✉️", index: 5, color: "bg-note-yellow text-slate-800" },
  ];

  // Mindset Brain node state
  const [activeBrainNode, setActiveBrainNode] = useState<string>("manifesto");
  const [isUnlocking, setIsUnlocking] = useState(false);
  const [isBooting, setIsBooting] = useState(false);
  const [bootLines, setBootLines] = useState<string[]>([]);
  const [recruiterOpen, setRecruiterOpen] = useState(false);

  const startBootSequence = useCallback(() => {
    setIsBooting(true);
    setBootLines([]);
    
    const lines = [
      "Opening archive...",
      "Scanning research files...",
      "Loading experiments...",
      "Loading failures...",
      "Loading discoveries...",
      "Welcome Researcher."
    ];

    lines.forEach((line, index) => {
      setTimeout(() => {
        setBootLines(prev => [...prev, line]);
        if (index === lines.length - 1) {
          setTimeout(() => {
            setIsBookOpen(true);
            setCurrentPage(0);
            setIsBooting(false);
          }, 600);
        }
      }, (index + 1) * 350);
    });
  }, [setIsBookOpen, setCurrentPage]);

  // Handle key unlock completion
  const handleUnlockComplete = useCallback(() => {
    sessionStorage.setItem("logbook_unlocked", "true");
    setBookLocked(false);
    setIsUnlocking(true);
    setTimeout(() => {
      setIsUnlocking(false);
      startBootSequence();
    }, 650);
  }, [startBootSequence]);

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

  // Polaroid hover flips
  const [flippedPolaroid, setFlippedPolaroid] = useState<string | null>(null);

  // Blueprint room state
  const [selectedBlueprint, setSelectedBlueprint] = useState<string>("hiremind");

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

  // 7 Projects list with AI Builder Field Journal layout
  const projects: Project[] = [
    {
      id: "hiremind",
      title: "HireMind AI",
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
      demoUrl: "https://github.com/JEN-chad/HireMindAI",
      experimentId: "001-A",
      researchQuestion: "Can AI automate first round technical interviews?",
      systemDesign: "Candidate ➔ Voice AI Agent ➔ Evaluation Engine ➔ Recruiter Dashboard",
      challenges: [
        "Realtime AI communication latency",
        "Resume intelligence accuracy",
        "Authentication systems partitioning",
        "Database architecture scaling"
      ],
      techFormula: ["Next.js", "Gemini", "LiveKit", "MongoDB"],
      result: "Production ready AI interview platform.",
      status: "DEPLOYED"
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
      demoUrl: "https://github.com/JEN-chad/codesentry",
      experimentId: "002-B",
      researchQuestion: "Can static analysis catch AI code vulnerabilities in under 0.5s?",
      systemDesign: "Local Commit ➔ AST Scanner ➔ Security Rules ➔ Remediation Engine",
      challenges: [
        "High-performance regex filters",
        "AST parse boundary limits",
        "Zero dependency execution speed",
        "Developer workflow integration"
      ],
      techFormula: ["Python", "FastAPI", "CLI", "Static Analysis"],
      result: "CLI scanner catching secrets and SQLi before commit.",
      status: "DEPLOYED"
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
      demoUrl: "https://github.com/JEN-chad/OncoEnv",
      experimentId: "003-C",
      researchQuestion: "Can RL agents train effectively on simulated bioinformatics spaces?",
      systemDesign: "RL Agent ➔ Gene Editing Actions ➔ scRNA Simulation ➔ Stepwise Reward Evaluation",
      challenges: [
        "High-dimensional count matrices",
        "Stepwise reward validation",
        "Procedural state speed limits",
        "Bioinformatics regulatory rules"
      ],
      techFormula: ["Python", "NumPy", "SciPy", "Gym", "FastAPI"],
      result: "Procedurally generated regulatory biology world training ground.",
      status: "RESEARCH ACTIVE"
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
      demoUrl: "https://github.com/JEN-chad/Crack-The-Vault",
      experimentId: "004-D",
      researchQuestion: "Can dynamic policy engines neutralize adversarial prompt injections?",
      systemDesign: "User Query ➔ Injection Checkers ➔ LLM Guard Evaluator ➔ Security Response",
      challenges: [
        "Dynamic injection scoring",
        "Adversarial payload isolation",
        "Real-time state verification",
        "Symposium fund locking logic"
      ],
      techFormula: ["FastAPI", "Next.js", "Docker", "Drizzle", "Postgres"],
      result: "Prompt injection security trainer sandbox.",
      status: "ONLINE"
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
      demoUrl: "https://github.com/JEN-chad/DevFlow",
      experimentId: "005-E",
      researchQuestion: "Can webhook integration streams sync agile board tickets in real-time?",
      systemDesign: "Git Webhook ➔ Auth Server ➔ Queue Worker ➔ WebSocket Client Sync",
      challenges: [
        "Concurrent event ordering",
        "Payload signature verification",
        "Socket.io Room coordination",
        "Database transaction speed"
      ],
      techFormula: ["React", "Node.js", "Express", "MongoDB", "Socket.io"],
      result: "Agile project board synced with webhooks.",
      status: "DEPLOYED"
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
      demoUrl: "https://github.com/JEN-chad/CollabBoard",
      experimentId: "006-F",
      researchQuestion: "Can optimistic UI updates resolve multi-user collisions gracefully?",
      systemDesign: "Client Action ➔ Local Optimistic Render ➔ Conflict Sync ➔ DB Commit",
      challenges: [
        "Optimistic UI rollback logs",
        "Write race conflict checks",
        "Near-zero network lag displays",
        "Database versioning protocols"
      ],
      techFormula: ["React", "Vite", "Express", "MongoDB", "WebSockets"],
      result: "Optimistically updated concurrent collaboration board.",
      status: "DEPLOYED"
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
      demoUrl: "https://github.com/JEN-chad/SupportDesk",
      experimentId: "007-G",
      researchQuestion: "Can multi-tenant database structures enforce sub-millisecond query separation?",
      systemDesign: "Tenant Middleware ➔ Shared Database Pool ➔ Query Filter Isolation ➔ Response",
      challenges: [
        "Query-level safety isolation",
        "Dynamic workspace mappings",
        "Real-time diagnostic caching",
        "High availability route logic"
      ],
      techFormula: ["React", "React Query", "Node.js", "Express", "MongoDB"],
      result: "Multi-tenant partitioned workspace support platform.",
      status: "DEPLOYED"
    }
  ];

  const selectedProject = projects.find(p => p.id === selectedProjectId) || projects[0];

  const diskSkills: Record<string, { title: string; installed: string[]; status: string }> = {
    disk01: {
      title: "INTERFACE ENGINE",
      installed: ["React.js", "Next.js", "Tailwind CSS", "GSAP / Framer Motion"],
      status: "PRODUCTION READY"
    },
    disk02: {
      title: "INTELLIGENCE ENGINE",
      installed: ["Google Gemini API", "LangChain & LlamaIndex", "Vector Databases & RAG", "Autonomous AI Agents"],
      status: "RESEARCH ACTIVE"
    },
    disk03: {
      title: "SERVER ENGINE",
      installed: ["Node.js / Express", "FastAPI / Python", "MongoDB / PostgreSQL", "REST & WebSocket APIs"],
      status: "ONLINE"
    },
    disk04: {
      title: "UTILITY & INFRA ENGINE",
      installed: ["Docker Containers", "Git / GitHub Webhooks", "Nginx & Server Configs", "Bash Script Automation"],
      status: "ONLINE"
    }
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
    if (isUnlocking || isBooting) return;
    startBootSequence();
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
              whileHover={isUnlocking || bookLocked || isBooting ? {} : { 
                scale: 1.04, 
                rotate: 0.5, 
                y: -10, 
                boxShadow: "0 35px 70px rgba(0,0,0,0.6)" 
              }}
              onClick={bookLocked ? handleLockedCoverClick : handleOpenBook}
              style={{ transformOrigin: "left center", cursor: bookLocked ? "not-allowed" : "pointer" }}
              className="w-full max-w-[500px] h-[600px] bg-[#221c18] border-[12px] border-[#13100e] rounded-l-md rounded-r-3xl shadow-2xl flex flex-col justify-between p-8 text-center transition-shadow duration-300 relative group overflow-hidden"
            >
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.4))] pointer-events-none" />
              <div className="absolute left-0 top-0 bottom-0 w-8 bg-[#13100e] border-r-2 border-[#ff5a46]/20 shadow-inner" />

              {isBooting ? (
                <div className="flex-1 flex flex-col justify-between bg-black text-[#4ade80] font-mono text-left p-6 rounded border-4 border-slate-800 shadow-inner overflow-hidden relative my-4">
                  <div className="screen-glare absolute inset-0 pointer-events-none" />
                  <div className="space-y-2 z-10 text-sm">
                    {bootLines.map((line, idx) => (
                      <motion.p
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.15 }}
                        className={line === "Welcome Researcher." ? "text-yellow-400 font-bold" : ""}
                      >
                        &gt; {line}
                      </motion.p>
                    ))}
                    <motion.span
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                      className="inline-block text-[#4ade80] font-bold"
                    >
                      _
                    </motion.span>
                  </div>
                  <div className="text-[8px] text-slate-500 border-t border-slate-950 pt-2 flex justify-between z-10 font-bold tracking-wider font-mono">
                    <span>ARCHIVE BOOT v2.027</span>
                    <span>JENISH J SYSTEMS</span>
                  </div>
                </div>
              ) : (
                <>
                  {/* Case File Sticker */}
                  <div className="absolute top-4 left-10 bg-red-600/90 text-white font-mono text-[9px] font-bold px-3 py-1 shadow rounded-sm uppercase tracking-widest rotate-[-4deg] z-10 border border-red-700 select-none">
                    ENGINEERING ARCHIVE · CASE FILE: J-2027
                  </div>

                  {/* Cover Sticker */}
                  <div className="mt-12 bg-[#fcfbe3] p-5 border-4 border-dashed border-[#d35442]/60 rounded-xl rotate-[-2deg] shadow-lg max-w-[360px] mx-auto relative group-hover:rotate-[1deg] transition-transform duration-300 select-none">
                    <h1 className="text-4xl sm:text-5xl font-marker text-[#d35442] mb-1">JENISH J</h1>
                    <p className="font-hand-kalam text-lg text-slate-800 font-bold border-t border-[#d35442]/20 pt-1.5 uppercase tracking-wide leading-tight">
                      engineering field journal
                    </p>
                    <p className="font-hand-kalam text-[10px] text-slate-500 font-bold tracking-widest mt-0.5">
                      AI SYSTEMS ENGINEER · VOL: 2023 - 2027
                    </p>
                    <div className="absolute -top-3 -left-3 text-2xl">⚙️</div>
                    <div className="absolute -bottom-3 -right-3 text-2xl">🔋</div>
                  </div>

                  {/* Metadata Table */}
                  <div className="bg-white/5 border border-white/10 p-3 rounded shadow-sm text-cream-light/90 font-mono text-[10px] text-left max-w-[340px] mx-auto space-y-1.5 rotate-[1deg] backdrop-blur-sm select-none">
                    <div className="flex justify-between border-b border-white/5 pb-1">
                      <span className="text-slate-400">Experiments Completed:</span>
                      <span className="font-bold">10+</span>
                    </div>
                    <div className="flex justify-between border-b border-white/5 pb-1">
                      <span className="text-slate-400">Systems Built:</span>
                      <span className="font-bold">8+</span>
                    </div>
                    <div className="flex justify-between border-b border-white/5 pb-1">
                      <span className="text-slate-400">Primary Research:</span>
                      <span className="font-bold">Human × AI Interaction</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Status:</span>
                      <span className="text-emerald-400 font-bold animate-pulse">ACTIVE BUILDER</span>
                    </div>
                  </div>

                  {/* Tape Sticker */}
                  <div className="tape w-32 h-6 rotate-[6deg] mx-auto mt-2 z-10 text-[9px] font-mono text-slate-900 font-bold flex items-center justify-center bg-white/90 shadow-sm border border-slate-300/30 select-none">
                    SYSTEM LAB FILE
                  </div>

                  <div className="mb-4 text-cream-light space-y-3 select-none">
                    <motion.p 
                      animate={{ scale: [1, 1.04, 1], opacity: [0.8, 1, 0.8] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      className="font-hand-kalam text-lg"
                      style={{ color: "#f6c860", textShadow: "0 0 12px rgba(246,200,96,0.3)" }}
                    >
                      {bookLocked ? "use the key to unlock ✦" : "tap to open ⚙️"}
                    </motion.p>
                    <div className="flex justify-center items-center gap-1 font-hand-kalam text-xs select-none" style={{ color: "rgba(230,207,162,0.55)" }}>
                      <span>( {bookLocked ? "find the key" : "initialize"}</span>
                      <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 1, repeat: Infinity }}>➔</motion.span>
                      <span>)</span>
                    </div>
                  </div>
                </>
              )}
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
                  {/* SPREAD 0: Researcher Manifesto */}
                  {currentPage === 0 && (
                    <div className="space-y-5 font-hand-kalam text-slate-800 relative select-none">
                      <div className="border-b-2 border-dashed border-[#d35442]/20 pb-2">
                        <h2 className="text-3.5xl font-marker text-[#d35442] mb-0.5 uppercase tracking-wide">my manifesto</h2>
                        <p className="text-xs text-slate-500 font-mono uppercase tracking-wider font-bold">research focus & engineering ethos</p>
                      </div>

                      <div className="space-y-4">
                        <p className="text-base font-bold italic leading-relaxed text-[#d35442] border-l-4 border-[#d35442] pl-3">
                          "I build intelligent systems that remove repetitive human workflows."
                        </p>

                        <div className="space-y-2.5">
                          <p className="font-mono text-xs font-bold uppercase tracking-wider text-slate-500 border-b border-slate-300 pb-1 mb-2">
                            Current Research Areas:
                          </p>
                          <div className="flex gap-3 items-start bg-white/40 p-2 rounded shadow-sm border border-slate-200">
                            <span className="font-mono font-bold text-xs bg-[#d35442] text-white rounded px-1.5 py-0.5 leading-none mt-0.5">01</span>
                            <div>
                              <p className="font-bold text-slate-900 leading-tight">AI Powered Automation</p>
                              <p className="text-xs text-slate-600">Autonomous workflow orchestration & task execution layers.</p>
                            </div>
                          </div>
                          <div className="flex gap-3 items-start bg-white/40 p-2 rounded shadow-sm border border-slate-200">
                            <span className="font-mono font-bold text-xs bg-[#88c5f7] text-slate-800 rounded px-1.5 py-0.5 leading-none mt-0.5">02</span>
                            <div>
                              <p className="font-bold text-slate-900 leading-tight">Knowledge Retrieval Systems</p>
                              <p className="text-xs text-slate-600">RAG architectures, semantic vector spaces, & context ingestion pipelines.</p>
                            </div>
                          </div>
                          <div className="flex gap-3 items-start bg-white/40 p-2 rounded shadow-sm border border-slate-200">
                            <span className="font-mono font-bold text-xs bg-[#a259ff]/30 text-[#a259ff] rounded px-1.5 py-0.5 leading-none mt-0.5">03</span>
                            <div>
                              <p className="font-bold text-slate-900 leading-tight">Developer Productivity Tools</p>
                              <p className="text-xs text-slate-600">CLI code analyzers, AST rule checking, & auto-remediation agents.</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-[#d35442]/10 select-none">
                        <p className="text-xs font-mono font-bold text-slate-700 italic">
                          Mission: Build software that solves real friction, not just beautiful interfaces.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* SPREAD 1: Floppy Catalog Box */}
                  {currentPage === 1 && (
                    <div className="space-y-4">
                      <div className="border-b-2 border-dashed border-[#d35442]/20 pb-2">
                        <h2 className="text-3xl font-marker text-[#d35442] mb-0.5">SYSTEM MODULE ARCHIVE</h2>
                        <p className="font-hand-kalam text-xs text-slate-800 font-bold uppercase tracking-wider">Insert capability disk to inspect engineer modules</p>
                      </div>

                      {/* Disk catalog list */}
                      <div className="grid grid-cols-2 gap-4 pt-4">
                        {[
                          { id: "disk01", label: "Interface Engine", color: "bg-blue-600 border-blue-800" },
                          { id: "disk02", label: "Intelligence Engine", color: "bg-purple-600 border-purple-800" },
                          { id: "disk03", label: "Server Engine", color: "bg-emerald-600 border-emerald-800" },
                          { id: "disk04", label: "Utility Engine", color: "bg-orange-600 border-orange-800" }
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
                        EXPERIMENT ARCHIVES
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

                  {/* SPREAD 3: System Blueprint Room Selector */}
                  {currentPage === 3 && (
                    <div className="space-y-5 select-none">
                      <div className="border-b-2 border-dashed border-[#d35442]/20 pb-2">
                        <h2 className="text-3.5xl font-marker text-[#d35442] mb-0.5">BLUEPRINT ROOM</h2>
                        <p className="font-hand-kalam text-xs text-slate-800 font-bold uppercase tracking-wider">inspect engineering pipeline schematics</p>
                      </div>

                      <p className="font-hand-kalam text-sm text-slate-600 leading-snug">
                        Select an architectural drawing drawer to inspect the system flow layout on the active blueprint draft pad:
                      </p>

                      <div className="space-y-3 font-hand-kalam text-slate-800 pt-2">
                        {[
                          { id: "hiremind", title: "01 HireMind AI Pipeline", desc: "ATS voice & screening scoring orchestration loop." },
                          { id: "codesentry", title: "02 codesentry Core Engine", desc: "Local AST parser security rule matching hook." },
                          { id: "oncoenv", title: "03 OncoEnv Reinforcement Loop", desc: "Procedural genomic matrix environment action scoring." }
                        ].map(bp => {
                          const isSelected = selectedBlueprint === bp.id;
                          return (
                            <div
                              key={bp.id}
                              onClick={() => setSelectedBlueprint(bp.id)}
                              className={`p-3 rounded border border-slate-350 shadow-sm cursor-pointer transition-all ${
                                isSelected 
                                  ? "bg-[#e7d7c1] border-[#d35442] text-slate-800 font-bold scale-[1.01]" 
                                  : "bg-white/50 hover:bg-[#e7d7c1]/20 text-slate-700 hover:scale-[1.005]"
                              }`}
                            >
                              <p className="text-sm font-bold text-slate-900">{bp.title}</p>
                              <p className="text-xs text-slate-500 font-mono mt-0.5">{bp.desc}</p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* SPREAD 4: Experience Timeline */}
                  {currentPage === 4 && (
                    <div className="space-y-6 select-none">
                      <div className="border-b-2 border-dashed border-[#d35442]/20 pb-4">
                        <h2 className="text-4xl font-marker text-[#d35442] mb-1">FIELD RESEARCH LOGS</h2>
                        <p className="font-hand-kalam text-lg text-slate-800 font-bold uppercase tracking-wider">work & learnings ledger</p>
                      </div>

                      <div className="font-hand-kalam space-y-4 text-slate-800">
                        {experiences.map((exp, idx) => {
                          const tilts = ["rotate-[-1.5deg]", "rotate-[1deg]", "rotate-[-0.5deg]"];
                          const tilt = tilts[idx % tilts.length];
                          return (
                            <div 
                              key={exp.id} 
                              onClick={() => setFlippedPolaroid(exp.id)}
                              className={`p-3 bg-white/80 border border-slate-350 shadow-sm hover:shadow-md cursor-pointer transition-all relative ${tilt} rounded`}
                            >
                              {/* Tape chunk decoration */}
                              <div className="absolute -top-2 left-1/4 w-12 h-4 bg-white/40 shadow-sm border border-slate-400/5 rotate-[-2deg]" />
                              
                              <p className="text-slate-950 font-bold text-base leading-tight">{exp.role}</p>
                              <p className="text-[10px] font-mono text-slate-500 mt-0.5">{exp.company} · {exp.duration}</p>
                              <p className="text-[9px] text-[#d35442] font-bold mt-1.5 uppercase tracking-wide">inspect notes ➔</p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* SPREAD 5: Connect Alignments */}
                  {currentPage === 5 && (
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
                  
                  {/* SPREAD 0: Mindset Blueprint (Engineer Brain Map) */}
                  {currentPage === 0 && (
                    <div className="space-y-4 font-hand-kalam text-slate-800 relative flex flex-col justify-between h-full select-none">
                      <div className="border-b-2 border-dashed border-[#d35442]/20 pb-1.5">
                        <h3 className="text-3xl font-marker text-[#d35442] mb-0.5 uppercase tracking-wide">engineer brain map</h3>
                        <p className="font-mono text-[9px] text-slate-500 uppercase tracking-widest font-bold">hover nodes to scan technical stack</p>
                      </div>

                      {/* Interactive SVG Network Map */}
                      <div className="relative w-full h-52 border border-slate-300 bg-white/50 rounded flex items-center justify-center p-2 shadow-inner">
                        <svg className="w-full h-full overflow-visible" viewBox="0 0 200 130">
                          {/* Connections */}
                          <line x1="100" y1="18" x2="100" y2="65" stroke="#94a3b8" strokeWidth="2" strokeDasharray="3 3" />
                          <line x1="100" y1="65" x2="100" y2="112" stroke="#94a3b8" strokeWidth="2" strokeDasharray="3 3" />
                          <line x1="35" y1="65" x2="100" y2="65" stroke="#94a3b8" strokeWidth="2" strokeDasharray="3 3" />
                          <line x1="165" y1="65" x2="100" y2="65" stroke="#94a3b8" strokeWidth="2" strokeDasharray="3 3" />

                          {/* Outer node link details */}
                          <line x1="100" y1="18" x2="35" y2="65" stroke="#d35442" strokeWidth="1" opacity="0.25" />
                          <line x1="100" y1="18" x2="165" y2="65" stroke="#d35442" strokeWidth="1" opacity="0.25" />
                          <line x1="100" y1="112" x2="35" y2="65" stroke="#d35442" strokeWidth="1" opacity="0.25" />
                          <line x1="100" y1="112" x2="165" y2="65" stroke="#d35442" strokeWidth="1" opacity="0.25" />

                          {/* Center Node (ENGINEERING CORE) */}
                          <circle cx="100" cy="65" r="13" className="fill-[#e2cfb6] stroke-slate-800 stroke-[1.5] cursor-pointer hover:scale-110 transition-transform" onMouseEnter={() => setActiveBrainNode("core")} />
                          <text x="100" y="68" textAnchor="middle" fontSize="6.5" className="font-mono fill-slate-800 font-extrabold select-none pointer-events-none">CORE</text>

                          {/* Top Node (AI SYSTEMS) */}
                          <circle cx="100" cy="18" r="13" className="fill-purple-300 stroke-purple-700 stroke-[1.5] cursor-pointer hover:scale-110 transition-transform" onMouseEnter={() => setActiveBrainNode("ai")} />
                          <text x="100" y="21" textAnchor="middle" fontSize="6.5" className="font-mono fill-purple-950 font-extrabold select-none pointer-events-none">AI</text>

                          {/* Left Node (FRONTEND) */}
                          <circle cx="35" cy="65" r="13" className="fill-blue-200 stroke-blue-600 stroke-[1.5] cursor-pointer hover:scale-110 transition-transform" onMouseEnter={() => setActiveBrainNode("frontend")} />
                          <text x="35" y="68" textAnchor="middle" fontSize="6.5" className="font-mono fill-blue-950 font-extrabold select-none pointer-events-none">FRONT</text>

                          {/* Right Node (BACKEND) */}
                          <circle cx="165" cy="65" r="13" className="fill-emerald-200 stroke-emerald-600 stroke-[1.5] cursor-pointer hover:scale-110 transition-transform" onMouseEnter={() => setActiveBrainNode("backend")} />
                          <text x="165" y="68" textAnchor="middle" fontSize="6.5" className="font-mono fill-emerald-950 font-extrabold select-none pointer-events-none">BACK</text>

                          {/* Bottom Node (PRODUCT THINKING) */}
                          <circle cx="100" cy="112" r="13" className="fill-orange-200 stroke-orange-500 stroke-[1.5] cursor-pointer hover:scale-110 transition-transform" onMouseEnter={() => setActiveBrainNode("product")} />
                          <text x="100" y="115" textAnchor="middle" fontSize="6.5" className="font-mono fill-orange-950 font-extrabold select-none pointer-events-none">PROD</text>

                          {/* Labels */}
                          <text x="100" y="37" textAnchor="middle" fontSize="6" className="font-mono fill-purple-800 font-bold">AI SYSTEMS</text>
                          <text x="35" y="84" textAnchor="middle" fontSize="6" className="font-mono fill-blue-800 font-bold">FRONTEND</text>
                          <text x="165" y="84" textAnchor="middle" fontSize="6" className="font-mono fill-emerald-800 font-bold">BACKEND</text>
                          <text x="100" y="94" textAnchor="middle" fontSize="6" className="font-mono fill-slate-700 font-bold">ENGINEERING CORE</text>
                          <text x="100" y="129" textAnchor="middle" fontSize="6" className="font-mono fill-orange-700 font-bold">PRODUCT THINKING</text>
                        </svg>
                      </div>

                      {/* Display text based on hovered node inside taped note */}
                      <div className="bg-[#fcfbe3] border border-slate-300 rounded p-3 h-[120px] shadow-sm font-hand-kalam text-slate-800 leading-snug flex flex-col justify-center text-center relative rotate-[0.5deg]">
                        <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-14 h-4 bg-white/40 shadow-sm border border-slate-400/10 rotate-[-1deg]" />
                        
                        {activeBrainNode === "manifesto" && (
                          <div>
                            <p className="text-[10px] font-mono text-slate-400 uppercase tracking-widest font-bold">System Initialization</p>
                            <p className="text-sm mt-1">Hover the graph nodes to inspect cognitive stacks and engineering competencies.</p>
                          </div>
                        )}
                        {activeBrainNode === "frontend" && (
                          <div>
                            <p className="text-[10px] font-mono text-blue-500 uppercase tracking-widest font-bold">FRONTEND MODULES</p>
                            <p className="text-base text-slate-800 font-bold mt-0.5">React · Next.js · UI Engineering · Animation Systems</p>
                            <p className="text-xs text-slate-500 mt-1 font-mono">Building tactile, highly-interactive scrapbook and dashboard environments.</p>
                          </div>
                        )}
                        {activeBrainNode === "backend" && (
                          <div>
                            <p className="text-[10px] font-mono text-emerald-600 uppercase tracking-widest font-bold">BACKEND MODULES</p>
                            <p className="text-base text-slate-800 font-bold mt-0.5">Node.js · Express · REST APIs · Databases (Postgres/Mongo)</p>
                            <p className="text-xs text-slate-500 mt-1 font-mono">Designing high-throughput async processing layers and secure schema definitions.</p>
                          </div>
                        )}
                        {activeBrainNode === "ai" && (
                          <div>
                            <p className="text-[10px] font-mono text-purple-600 uppercase tracking-widest font-bold">INTELLIGENCE MODULES</p>
                            <p className="text-base text-slate-800 font-bold mt-0.5">LLMs (Gemini/Vertex) · RAG Pipelines · AI Agents · Automation</p>
                            <p className="text-xs text-slate-500 mt-1 font-mono">Integrating vector database semantics and orchestrating autonomous task execution agents.</p>
                          </div>
                        )}
                        {activeBrainNode === "core" && (
                          <div>
                            <p className="text-[10px] font-mono text-slate-600 uppercase tracking-widest font-bold">ENGINEERING CORE</p>
                            <p className="text-base text-slate-800 font-bold mt-0.5">System Design · Testing & CI/CD · TypeScript · Algorithms · Docker</p>
                            <p className="text-xs text-slate-500 mt-1 font-mono">Constructing performant, robust, containerized pipelines and maintainable repos.</p>
                          </div>
                        )}
                        {activeBrainNode === "product" && (
                          <div>
                            <p className="text-[10px] font-mono text-orange-600 uppercase tracking-widest font-bold">PRODUCT THINKING</p>
                            <p className="text-base text-slate-800 font-bold mt-0.5">UX Thinking · Problem Solving · Architecture Design · Flows</p>
                            <p className="text-xs text-slate-500 mt-1 font-mono">Bridging visual aesthetics with structural engineering loops for friction-free products.</p>
                          </div>
                        )}
                      </div>
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
                      <div className="bg-black rounded-lg p-4 h-[255px] border-4 border-slate-800 shadow-inner font-mono text-xs text-[#4ade80] max-w-[420px] mx-auto flex flex-col justify-between relative overflow-hidden select-text">
                        <div className="screen-glare absolute inset-0 z-10 pointer-events-none" />
                        
                        <div className="relative z-20 space-y-2">
                          {diskLoadingState === "idle" && (
                            <p className="text-slate-500 animate-pulse text-center mt-16">INSERT A FLOPPY DISK TO BOOT DIAGNOSTIC REPORT...</p>
                          )}
                          
                          {diskLoadingState === "loading" && (
                            <div className="space-y-1.5">
                              <p>BOOT DIAGNOSTICS: INITIALIZING...</p>
                              <p className="text-slate-400">&gt; Analyzing module...</p>
                              <p className="text-yellow-400">&gt; Dependencies found...</p>
                              <p className="text-emerald-400 font-bold">&gt; System ready.</p>
                            </div>
                          )}

                          {diskLoadingState === "loaded" && loadedDisk && (
                            <div className="space-y-1 text-[11px] leading-relaxed">
                              <p className="text-yellow-400 font-bold uppercase">&gt;&gt; MODULE: {diskSkills[loadedDisk].title}</p>
                              <p className="text-slate-500">------------------------------------</p>
                              <p className="text-[#a259ff] font-bold">INSTALLED LIBRARIES:</p>
                              {diskSkills[loadedDisk].installed.map((skill, i) => (
                                <p key={i} className="flex justify-between pl-2 font-semibold">
                                  <span>+ {skill}</span>
                                  <span className="text-[#4ade80] font-bold">[READY]</span>
                                </p>
                              ))}
                              <p className="text-slate-500">------------------------------------</p>
                              <p className="text-xs text-yellow-400 font-bold flex justify-between items-center mt-1">
                                <span>STATUS CODE:</span>
                                <span className="text-emerald-400 animate-pulse font-extrabold bg-emerald-950/40 px-1 border border-emerald-800 rounded">
                                  {diskSkills[loadedDisk].status}
                                </span>
                              </p>
                            </div>
                          )}
                        </div>

                        {diskLoadingState === "loaded" && (
                          <div className="text-[8px] text-slate-500 border-t border-slate-900 pt-2 flex justify-between select-none font-bold">
                            <span>Diagnostic v2.027</span>
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
                        <div className="bg-[#fcfbe3] border-l-8 border-l-[#d35442] rounded-r-xl shadow-md p-5 relative paper-texture max-w-[480px] mx-auto min-h-[380px] flex flex-col justify-between select-text text-slate-800 font-hand-kalam">
                          <div className="space-y-3">
                            <div className="flex justify-between items-center border-b border-[#d35442]/20 pb-1 select-none">
                              <span className="font-mono text-[9px] font-bold text-[#d35442] uppercase tracking-wider">EXPERIMENT ID: {selectedProject.experimentId}</span>
                              <span className="text-[9px] bg-slate-200 text-slate-800 font-mono px-2 py-0.5 rounded font-extrabold uppercase">{selectedProject.status}</span>
                            </div>

                            <div>
                              <h3 className="text-2xl font-marker text-[#d35442] leading-none mb-0.5 select-none">{selectedProject.title}</h3>
                              <p className="text-xs font-bold text-slate-700 leading-snug">{selectedProject.subtitle}</p>
                            </div>

                            <p className="text-xs text-slate-600 select-none">{selectedProject.description}</p>

                            <div className="space-y-1.5 border-t border-slate-200/50 pt-2 text-xs">
                              <p><b className="text-slate-900 font-bold font-mono text-[9px] uppercase tracking-wider select-none">Research Question:</b> {selectedProject.researchQuestion}</p>
                              
                              <div className="bg-white/50 p-2 border rounded font-mono text-[9px] leading-tight text-slate-700 select-all">
                                <span className="font-bold block text-[8px] text-slate-400 uppercase select-none mb-1">System Design:</span>
                                {selectedProject.systemDesign}
                              </div>

                              <div className="select-none">
                                <span className="font-bold font-mono text-[9px] uppercase tracking-wider block text-slate-900 mb-1">Engineering Challenges Solved:</span>
                                <ul className="space-y-0.5 pl-1">
                                  {selectedProject.challenges.map((c, i) => (
                                    <li key={i} className="flex items-center gap-1.5">
                                      <span className="text-emerald-600 font-bold select-none">✓</span>
                                      <span>{c}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </div>

                          <div className="mt-3">
                            {/* Interactive demo embeds */}
                            {selectedProject.type === "monitor" && (
                              <div className="bg-black rounded border border-slate-700/50 p-2 mb-3 h-[180px] relative overflow-hidden">
                                <div className="screen-glare absolute inset-0 pointer-events-none" />
                                <InteractiveTerminal />
                              </div>
                            )}

                            {selectedProject.type === "sandbox" && (
                              <div className="mb-3 border border-slate-300 rounded-lg overflow-hidden bg-slate-950">
                                <VaultSandbox />
                              </div>
                            )}

                            <div className="flex flex-wrap gap-1 mb-3 select-none">
                              <span className="font-mono text-[9px] text-slate-400 uppercase mr-1 select-none flex items-center">Formula:</span>
                              {selectedProject.techFormula.map(tag => (
                                <span key={tag} className="text-[9px] text-slate-800 bg-[#e2cfb6] px-2 py-0.5 rounded shadow-sm font-mono border border-black/5 leading-none">
                                  {tag}
                                </span>
                              ))}
                            </div>

                            <div className="flex gap-4 border-t border-slate-200/50 pt-2.5 select-none justify-between items-center">
                              <a href={selectedProject.codeUrl} target="_blank" rel="noreferrer" className="font-mono text-[10px] border-b border-dashed border-slate-800 hover:text-black transition-colors select-none font-bold uppercase py-0.5">
                                [VIEW SOURCE FILE]
                              </a>
                              <a href={selectedProject.demoUrl} target="_blank" rel="noreferrer" className="font-mono text-[10px] border-b border-dashed border-[#d35442] hover:text-[#d35442] transition-colors select-none text-[#d35442] font-bold uppercase py-0.5">
                                [OPEN LIVE EXPERIMENT]
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>

                    </div>
                  )}

                  {/* SPREAD 3: Flippable Polaroids */}
                  {/* SPREAD 3: System Blueprint Room Canvas */}
                  {currentPage === 3 && (
                    <div className="space-y-4">
                      {/* Blueprint Grid Container */}
                      <div 
                        className="bg-[#1e40af] text-white p-4 rounded-xl border-4 border-blue-900 shadow-md relative overflow-hidden h-[345px] select-none flex flex-col justify-between"
                        style={{
                          backgroundImage: "linear-gradient(rgba(255,255,255,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.07) 1px, transparent 1px)",
                          backgroundSize: "20px 20px"
                        }}
                      >
                        {/* Blueprint header stamp */}
                        <div className="flex justify-between items-start border-b border-white/20 pb-1.5 font-mono text-[9px] uppercase tracking-wider">
                          <span>Jenish J Draft Pad</span>
                          <span className="bg-blue-800 border border-blue-600 px-1 rounded font-bold">DRAFT-2027</span>
                        </div>

                        {/* Rendering selected blueprint SVG */}
                        <div className="flex-1 flex items-center justify-center p-2">
                          {selectedBlueprint === "hiremind" && (
                            <svg viewBox="0 0 240 180" className="w-full h-full stroke-white fill-none stroke-[1.5]">
                              <defs>
                                <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                                  <path d="M 0 0 L 10 5 L 0 10 z" fill="white" />
                                </marker>
                              </defs>
                              
                              <rect x="10" y="30" width="60" height="25" rx="3" strokeDasharray="3 3" />
                              <text x="40" y="45" textAnchor="middle" fill="white" stroke="none" fontSize="7" className="font-mono">Candidate Stream</text>
                              
                              <path d="M 70 42.5 L 90 42.5" markerEnd="url(#arrow)" />
                              
                              <rect x="90" y="20" width="70" height="45" rx="3" />
                              <text x="125" y="35" textAnchor="middle" fill="white" stroke="none" fontSize="8" className="font-mono font-bold">Voice AI Agent</text>
                              <text x="125" y="45" textAnchor="middle" fill="white" stroke="none" fontSize="6.5" className="font-mono">[Vertex AI Pipeline]</text>
                              
                              <path d="M 160 42.5 L 180 42.5" />
                              <path d="M 180 42.5 L 180 90 L 160 90" />
                              
                              <rect x="80" y="80" width="80" height="40" rx="3" />
                              <text x="120" y="95" textAnchor="middle" fill="white" stroke="none" fontSize="8" className="font-mono font-bold">Evaluation Engine</text>
                              <text x="120" y="105" textAnchor="middle" fill="white" stroke="none" fontSize="6.5" className="font-mono">[RAG Semantic Match]</text>
                              
                              <path d="M 80 100 L 40 100 L 40 130" />
                              
                              <rect x="15" y="130" width="50" height="30" rx="3" />
                              <text x="40" y="145" textAnchor="middle" fill="white" stroke="none" fontSize="7.5" className="font-mono">Dashboard API</text>
                              
                              <text x="90" y="145" fill="rgba(255,255,255,0.7)" stroke="none" fontSize="6" className="font-mono italic">Notes: ATS Filtering is 80%</text>
                              <text x="90" y="153" fill="rgba(255,255,255,0.7)" stroke="none" fontSize="6" className="font-mono italic">more robust than keyword search.</text>
                              <text x="90" y="161" fill="rgba(255,255,255,0.7)" stroke="none" fontSize="6" className="font-mono italic">Dynamic voice scoring validated.</text>
                            </svg>
                          )}

                          {selectedBlueprint === "codesentry" && (
                            <svg viewBox="0 0 240 180" className="w-full h-full stroke-white fill-none stroke-[1.5]">
                              <defs>
                                <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                                  <path d="M 0 0 L 10 5 L 0 10 z" fill="white" />
                                </marker>
                              </defs>
                              
                              <rect x="10" y="20" width="60" height="30" rx="3" />
                              <text x="40" y="35" textAnchor="middle" fill="white" stroke="none" fontSize="8" className="font-mono font-bold">git commit hook</text>
                              <text x="40" y="44" textAnchor="middle" fill="white" stroke="none" fontSize="6" className="font-mono">[pre-commit trigger]</text>
                              
                              <path d="M 70 35 L 90 35" markerEnd="url(#arrow)" />
                              
                              <rect x="95" y="15" width="70" height="40" rx="3" />
                              <text x="130" y="33" textAnchor="middle" fill="white" stroke="none" fontSize="8" className="font-mono font-bold">AST Parser</text>
                              <text x="130" y="42" textAnchor="middle" fill="white" stroke="none" fontSize="6.5" className="font-mono">Regex Secrets Rule</text>
                              
                              <path d="M 165 35 L 180 35 L 180 75" markerEnd="url(#arrow)" />
                              
                              <rect x="145" y="80" width="75" height="35" rx="3" />
                              <text x="182.5" y="95" textAnchor="middle" fill="white" stroke="none" fontSize="7.5" className="font-mono font-bold">Vulnerability Score</text>
                              <text x="182.5" y="105" textAnchor="middle" fill="white" stroke="none" fontSize="6" className="font-mono">[remediation generator]</text>
                              
                              <path d="M 145 97.5 L 90 97.5" markerEnd="url(#arrow)" />
                              
                              <rect x="15" y="80" width="75" height="35" rx="3" strokeDasharray="3 3" />
                              <text x="52.5" y="95" textAnchor="middle" fill="white" stroke="none" fontSize="7.5" className="font-mono font-bold">CLI stdout Stream</text>
                              <text x="52.5" y="105" textAnchor="middle" fill="white" stroke="none" fontSize="6" className="font-mono">[commit blocking]</text>
                              
                              <text x="15" y="145" fill="rgba(255,255,255,0.7)" stroke="none" fontSize="6.5" className="font-mono italic">Scan benchmark: ~0.40 seconds.</text>
                              <text x="15" y="155" fill="rgba(255,255,255,0.7)" stroke="none" fontSize="6.5" className="font-mono italic">AST rules neutralize network dep overhead.</text>
                            </svg>
                          )}

                          {selectedBlueprint === "oncoenv" && (
                            <svg viewBox="0 0 240 180" className="w-full h-full stroke-white fill-none stroke-[1.5]">
                              <defs>
                                <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                                  <path d="M 0 0 L 10 5 L 0 10 z" fill="white" />
                                </marker>
                              </defs>
                              
                              <rect x="15" y="30" width="70" height="40" rx="3" />
                              <text x="50" y="48" textAnchor="middle" fill="white" stroke="none" fontSize="8" className="font-mono font-bold">RL Agent</text>
                              <text x="50" y="58" textAnchor="middle" fill="white" stroke="none" fontSize="6" className="font-mono">[gene editor policy]</text>
                              
                              <path d="M 85 40 L 145 40" markerEnd="url(#arrow)" />
                              <text x="115" y="35" textAnchor="middle" fill="white" stroke="none" fontSize="7" className="font-mono">Action: Edit</text>
                              
                              <rect x="155" y="30" width="70" height="85" rx="3" />
                              <text x="190" y="48" textAnchor="middle" fill="white" stroke="none" fontSize="7.5" className="font-mono font-bold">Bio Sim Env</text>
                              <text x="190" y="58" textAnchor="middle" fill="white" stroke="none" fontSize="6" className="font-mono">[scRNA Matrix]</text>
                              <text x="190" y="70" textAnchor="middle" fill="white" stroke="none" fontSize="6" className="font-mono">[40+ Bio Tools]</text>
                              
                              <path d="M 155 95 L 95 95" markerEnd="url(#arrow)" />
                              <text x="125" y="90" textAnchor="middle" fill="white" stroke="none" fontSize="7" className="font-mono">State + Reward</text>
                              
                              <rect x="15" y="85" width="70" height="30" rx="3" strokeDasharray="3 3" />
                              <text x="50" y="100" textAnchor="middle" fill="white" stroke="none" fontSize="7" className="font-mono font-bold">Reward Scoring</text>
                              <text x="50" y="108" textAnchor="middle" fill="white" stroke="none" fontSize="6.5" className="font-mono">[Stepwise Reward]</text>
                              
                              <text x="15" y="145" fill="rgba(255,255,255,0.7)" stroke="none" fontSize="6.5" className="font-mono italic">Hypothesis: RL matrix state rewards converge</text>
                              <text x="15" y="155" fill="rgba(255,255,255,0.7)" stroke="none" fontSize="6.5" className="font-mono italic">faster under stepwise genomic count weights.</text>
                            </svg>
                          )}
                        </div>

                        {/* Blueprint footer details */}
                        <div className="flex justify-between items-end border-t border-white/20 pt-1 font-mono text-[8px] opacity-60">
                          <span>Scale: 1 : 1</span>
                          <span>Rev: 2.027</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* SPREAD 4: Experience Polaroids */}
                  {currentPage === 4 && (
                    <div className="space-y-4 flex flex-col items-center">
                      <h3 className="font-hand-kalam text-base text-slate-800 font-bold select-none mb-2">
                        📷 Hover photo snapshots to flip details:
                      </h3>

                      <div className="flex flex-wrap gap-5 justify-center w-full max-h-[380px] overflow-y-auto pr-1 pt-3">
                        {experiences.map((exp, idx) => {
                          const isFlipped = flippedPolaroid === exp.id;
                          const tilts = ["rotate-[-2.5deg]", "rotate-[3deg]", "rotate-[-1.5deg]"];
                          const tilt = tilts[idx % tilts.length];
                          
                          return (
                            <div 
                              key={exp.id}
                              onMouseEnter={() => setFlippedPolaroid(exp.id)}
                              onMouseLeave={() => setFlippedPolaroid(null)}
                              className={`relative w-40 h-48 cursor-pointer perspective-md transition-transform duration-350 hover:scale-105 hover:rotate-0 ${tilt}`}
                            >
                              {/* Red metal thumbtack decoration */}
                              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-5 h-5 z-30 select-none pointer-events-none drop-shadow">
                                <svg viewBox="0 0 24 24" className="w-full h-full">
                                  <circle cx="12" cy="8" r="6" fill="#d35442" />
                                  <circle cx="10" cy="6" r="2.5" fill="#ff7865" />
                                  <line x1="12" y1="8" x2="14" y2="18" stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round" />
                                </svg>
                              </div>

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

                  {/* SPREAD 5: Connect Postcard & Paper Plane */}
                  {currentPage === 5 && (
                    <div className="flex-1 flex flex-col justify-center items-center relative overflow-visible">
                      
                      {/* Draggable Red Failure Log card */}
                      <motion.div
                        drag
                        dragConstraints={constraintsRef}
                        dragElastic={0.15}
                        whileDrag={{ scale: 1.05, zIndex: 100 }}
                        whileHover={{ rotate: 1, scale: 1.02 }}
                        className="absolute bottom-[-50px] right-[-30px] w-64 bg-[#fce8e6] border-2 border-red-300 p-3.5 shadow-lg rounded rotate-[2.5deg] cursor-grab active:cursor-grabbing text-slate-800 text-[10px] leading-tight select-none hidden lg:block z-30 font-hand-kalam"
                      >
                        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-10 h-4 bg-white/50 shadow-sm border border-red-400/10 rotate-[-1deg]" />
                        <p className="font-bold border-b border-red-400/50 pb-0.5 mb-2 uppercase text-[9px] text-red-600 font-mono">⚠️ ANOMALY RECORD - FAILED LOGS</p>
                        
                        <div className="space-y-3 text-[9.5px]">
                          <div>
                            <p className="font-bold text-red-800 uppercase font-mono leading-none">Log 01: Voice AI Loop Crash</p>
                            <p className="text-slate-700 mt-0.5">TTS buffer overflow during concurrency load tests.</p>
                            <p className="text-emerald-750 font-bold font-mono text-[9px] mt-0.5">✓ Fix: Partitioned events with Redis queue.</p>
                          </div>
                          <div>
                            <p className="font-bold text-red-800 uppercase font-mono leading-none">Log 02: OncoEnv State Explosion</p>
                            <p className="text-slate-700 mt-0.5">Agent stuck in infinite loop due to sparse biological gradients.</p>
                            <p className="text-emerald-750 font-bold font-mono text-[9px] mt-0.5">✓ Fix: Redesigned stepwise Euclidean reward decay.</p>
                          </div>
                        </div>
                        <p className="text-[7px] text-slate-400 mt-3.5 italic text-center select-none font-mono">(Drag folder anywhere to reveal postcard)</p>
                      </motion.div>

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

                      {/* Mobile view of the Failure Log */}
                      <div className="w-full max-w-[460px] bg-[#fce8e6] border-2 border-red-300 p-4 shadow rounded mt-4 text-slate-800 text-xs leading-snug lg:hidden font-hand-kalam select-none">
                        <p className="font-bold border-b border-red-400/50 pb-0.5 mb-2 uppercase text-xs text-red-600 font-mono">⚠️ ANOMALY RECORD - FAILED LOGS</p>
                        <div className="space-y-3">
                          <div>
                            <p className="font-bold text-red-800 uppercase font-mono text-[10px] leading-none">Log 01: Voice AI Loop Crash</p>
                            <p className="text-slate-700 text-xs mt-0.5">TTS buffer overflow during concurrency load tests.</p>
                            <p className="text-emerald-700 font-bold font-mono text-[10px] mt-0.5">✓ Fix: Partitioned events with Redis queue.</p>
                          </div>
                          <div>
                            <p className="font-bold text-red-800 uppercase font-mono text-[10px] leading-none">Log 02: OncoEnv State Explosion</p>
                            <p className="text-slate-700 text-xs mt-0.5">Agent stuck in infinite loop due to sparse biological gradients.</p>
                            <p className="text-emerald-700 font-bold font-mono text-[10px] mt-0.5">✓ Fix: Redesigned stepwise Euclidean reward decay.</p>
                          </div>
                        </div>
                      </div>

                    </div>
                  )}

                </div>

                {/* Page turn indicator footer */}
                <div className="border-t border-[#d35442]/10 pt-4 flex justify-between items-center text-slate-500 font-mono text-[9px] uppercase select-none tracking-widest mt-6">
                  <span>Page {currentPage + 1} / 6</span>
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

      {/* 🔑 FOR RECRUITERS ONLY tab - fixed floating sticky note/tab */}
      <div className="fixed bottom-6 left-6 z-50">
        <motion.button
          onClick={() => setRecruiterOpen(true)}
          whileHover={{ scale: 1.05, rotate: 1 }}
          whileTap={{ scale: 0.95 }}
          className="bg-yellow-100 border-2 border-yellow-400 p-2.5 px-4 shadow-layered font-marker text-xs text-slate-800 rounded uppercase tracking-wider cursor-pointer flex items-center gap-2 select-none border-b-4 border-r-4 rotate-[-1deg]"
        >
          <span>🔑</span> FOR RECRUITERS ONLY
        </motion.button>
      </div>

      {/* Recruiter Briefing Overlay Modal */}
      <AnimatePresence>
        {recruiterOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 select-text"
            onClick={() => setRecruiterOpen(false)}
          >
            {/* Briefing Sheet Container */}
            <motion.div
              initial={{ scale: 0.9, y: 20, rotate: -1.5 }}
              animate={{ scale: 1, y: 0, rotate: 0 }}
              exit={{ scale: 0.9, y: 20, rotate: 1.5 }}
              transition={{ type: "spring", damping: 25, stiffness: 280 }}
              className="bg-[#fcfbe3] border-[8px] border-[#d35442] rounded-xl shadow-2xl p-6 sm:p-8 max-w-lg w-full relative paper-texture text-slate-800 font-hand-kalam rotate-[-0.5deg]"
              onClick={e => e.stopPropagation()}
            >
              {/* Pinned tape look at top */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-28 h-6 bg-white/40 shadow border border-slate-400/5 rotate-[-0.5deg]" />
              
              <button 
                onClick={() => setRecruiterOpen(false)}
                className="absolute top-3 right-4 font-mono text-base font-bold text-[#d35442] hover:text-[#b83b2a] cursor-pointer select-none"
              >
                [X]
              </button>

              <div className="border-b-2 border-dashed border-[#d35442]/30 pb-3 mb-4 select-none">
                <h3 className="text-3xl font-marker text-[#d35442] tracking-wide">RECRUITER BRIEFING BRIEF</h3>
                <p className="font-mono text-[9px] text-slate-500 uppercase tracking-widest font-bold">Fast-Load Engineering Dossier</p>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-bold text-[#d35442] text-sm uppercase font-mono">⚡ Elevator Summary:</h4>
                  <p className="text-sm mt-1 leading-relaxed text-slate-800">
                    I build production-grade automation engines and intelligent RAG systems designed to remove repetitive human friction. I specialize in designing robust backend pipelines, developer CLI scanners, and autonomous AI agents.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-[#d35442] text-sm uppercase font-mono">🎯 Key Competencies:</h4>
                  <ul className="text-sm space-y-1 mt-1 pl-1">
                    <li className="flex items-start gap-2">
                      <span className="text-[#d35442] font-bold">▪</span>
                      <span><b>AI Systems Integration:</b> Context RAG, prompt safety, & multi-agent routing.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#d35442] font-bold">▪</span>
                      <span><b>Backend Pipeline Design:</b> Async queues, webhook routing, & low-latency APIs.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#d35442] font-bold">▪</span>
                      <span><b>Developer Productivity Tools:</b> CLI rules AST scanning, scanner optimizations.</span>
                    </li>
                  </ul>
                </div>

                <div className="border-t border-[#d35442]/20 pt-4 flex flex-col sm:flex-row justify-between items-center gap-3 select-none">
                  <div>
                    <p className="text-[10px] text-slate-500 font-mono">Candidate Name: Jenish J</p>
                    <p className="text-[10px] text-slate-500 font-mono">Target Role: AI / Full Stack Engineer</p>
                  </div>
                  
                  <a 
                    href="/Jenish_Resume.pdf" 
                    download
                    className="w-full sm:w-auto bg-[#d35442] text-white hover:bg-[#b83b2a] font-mono text-xs font-bold py-2.5 px-4 rounded shadow border border-red-700/30 flex items-center justify-center gap-2 active:scale-95 transition-all text-center cursor-pointer"
                  >
                    <span>📥</span> DOWNLOAD RESUME.PDF
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
