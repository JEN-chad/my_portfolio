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
  // Research archive specific properties
  experimentId: string;
  researchQuestion: string;
  hypothesis: string;
  techFormula: string[]; // chemical element symbols
  observation: string[];
  finalResult: string;
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

  // Session-persisted unlock states
  const [bookLocked, setBookLocked] = useState<boolean>(
    () => sessionStorage.getItem("logbook_unlocked") !== "true"
  );
  const [failuresUnlocked, setFailuresUnlocked] = useState<boolean>(
    () => sessionStorage.getItem("failures_unlocked") === "true"
  );

  // Dynamic tabs configuration
  const tabs = [
    { label: "log #001 📑", index: 0, color: "bg-amber-100/90 text-slate-800 border-amber-300" },
    { label: "upgrades 💾", index: 1, color: "bg-[#88c5f7]/90 text-slate-800 border-blue-300" },
    { label: "experiments 📼", index: 2, color: "bg-[#fbc67b]/90 text-slate-800 border-orange-300" },
    { label: "field logs 🗃️", index: 3, color: "bg-[#a259ff]/20 text-[#a259ff] border-[#a259ff]/30" },
    { label: "evolution 🧬", index: 4, color: "bg-note-yellow text-slate-800 border-yellow-300" },
  ];

  if (failuresUnlocked) {
    tabs.push({ label: "failures ⚠️", index: 5, color: "bg-red-950/20 text-red-500 border-red-500/30 font-bold animate-pulse" });
  }

  // Mindset Brain node state
  const [activeBrainNode, setActiveBrainNode] = useState<string>("manifesto");
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

  // Postcard send animation state
  const [postcardState, setPostcardState] = useState<"editing" | "sending" | "sent">("editing");
  const [senderName, setSenderName] = useState("");
  const [senderEmail, setSenderEmail] = useState("");
  const [senderMsg, setSenderMsg] = useState("");
  const [checkedConnect, setCheckedConnect] = useState<number[]>([]);

  const checklistItems = [
    "Developing user-centered digital products",
    "Bridging design and engineering worlds",
    "Collaborating with PMs and Devs early on",
  ];

  const allConnectChecked = checkedConnect.length === checklistItems.length;

  // Experiences re-skinned as Field Logs
  const experiences = [
    {
      id: "Academor",
      role: "AI Research Assistant",
      company: "Academor",
      duration: "June 24 - July 24",
      mission: "Fine-tune and deploy deep learning pre-processing models.",
      bullets: [
        "Mutated baseline models in PyTorch framework to improve edge-case accuracy.",
        "Engineered data purification pipelines for multi-modal neural ingestion.",
        "Optimized deep learning execution structures, decreasing computational overhead."
      ],
      skills: ["PyTorch", "Data Processing", "Model Optimization"]
    },
    {
      id: "GFG",
      role: "Full Stack Operator Training",
      company: "GeeksforGeeks",
      duration: "April 25 - July 25",
      mission: "Master production-level full stack systems and API integration.",
      bullets: [
        "Completed rigorous 14-week full stack developer course (React, Node, Express, MongoDB).",
        "Built production-ready web platforms with responsive layouts and flex-grids.",
        "Engineered robust REST API validation gates and indexed document databases."
      ],
      skills: ["React.js", "Node.js", "Express APIs", "MongoDB Schema"]
    },
    {
      id: "Zuntra",
      role: "AI Agent & Automations Engineer",
      company: "Zuntra",
      duration: "Sep 25 - Mar 26",
      mission: "Design and implement LLM cognitive graphs and workspace automations.",
      bullets: [
        "Engineered autonomous LLM reasoning nodes and API connector workflows.",
        "Designed and implemented clean, responsive dashboard components in React.",
        "Refactored backend architecture to support real-time Socket.io workspace syncing."
      ],
      skills: ["AI Agents", "LLM APIs", "WebSocket Sync", "Tailwind CSS"]
    }
  ];

  // 7 Projects re-skinned as Experiment Files
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
      demoUrl: "https://github.com/JEN-chad/HireMindAI",
      experimentId: "EXP-023-A",
      researchQuestion: "Can machine-learning pipelines automate candidate reviews without losing evaluation depth?",
      hypothesis: "We can orchestrate a multi-agent validation graph using Vertex AI to parse profile data, cross-reference hashes, and output standardized scores.",
      techFormula: ["Nx", "Pg", "Dr", "Gem", "Vx"],
      observation: [
        "Recruitment screeners process uploads and grade resumes in under 10 seconds.",
        "Candidate drop-off rate reduced by 40% using unified scorecard visualizations."
      ],
      finalResult: "Successfully compiled and deployed OS. Automating 95% of candidate screening lifecycle tasks."
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
      experimentId: "EXP-047-B",
      researchQuestion: "How can we flag secrets and input exploits in pre-commit hooks without delaying developer push loops?",
      hypothesis: "By running rules-based Python regex checks on local diff states, we can bypass external dependencies and immediately compile drop-in AI remedies.",
      techFormula: ["Py", "Fa", "Cli", "Rule"],
      observation: [
        "Scan runs complete in under 0.4 seconds locally.",
        "Successfully prompts ChatGPT/Claude formats for near-instant developer vulnerability patches."
      ],
      finalResult: "Secured commit boundaries, scanning codebase diffs under 0.4s with zero external server dependencies."
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
      experimentId: "EXP-088-C",
      researchQuestion: "How can we evaluate and train autonomous LLM agents in processing cell sequencing data?",
      hypothesis: "A sandbox simulating scRNA-seq matrices and regulatory pathways with mathematical rewards will allow agents to learn pipeline sequences.",
      techFormula: ["Py", "Np", "Sp", "Rl"],
      observation: [
        "Modeled over 40 distinct genetic sequencing tools.",
        "Agent decision paths are graded and verified using stepwise biological metric rewards."
      ],
      finalResult: "Deployed biological environment, allowing rapid validation loops for scientific research agents."
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
      experimentId: "EXP-092-D",
      researchQuestion: "Can we gamify prompt injection defense to train developers on semantic security vulnerabilities?",
      hypothesis: "Creating a simulated cyber terminal that grades user prompts against an adversarial safety model will reveal injection patterns.",
      techFormula: ["Fa", "Nx", "Pg", "Docker"],
      observation: [
        "Bypassed by over 200 security students during university test run.",
        "Dynamic engine raises threshold parameters on repeated wins to pressure player strategies."
      ],
      finalResult: "Deployed gamified sandbox, training participants on prompt isolation and safety gateway parameters."
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
      experimentId: "EXP-051-E",
      researchQuestion: "Can we eliminate team context-switching by bridging git version logs and project boards directly?",
      hypothesis: "Broadcasting GitHub webhook payloads to client rooms via WebSockets allows instant card transitions without manual ticketing steps.",
      techFormula: ["Mdb", "Exp", "React", "Node", "Wss"],
      observation: [
        "Git actions trigger near-instant Kanban adjustments on the client layout.",
        "Interactive burndown algorithms calculate sprint velocities and cycle rates in real-time."
      ],
      finalResult: "Assembled sprint workspace resolving workflow latency between repositories and project managers."
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
      experimentId: "EXP-052-F",
      researchQuestion: "How do we mask latency and resolve state conflicts on collaborative document layouts?",
      hypothesis: "Coupling client-side optimistic rendering with version index verifiers on express will block overlaps while keeping UX snappy.",
      techFormula: ["React", "Wss", "Exp", "Mdb"],
      observation: [
        "Client layouts react near-instantly, updating changes locally before server return confirmations.",
        "Write collisions trigger an visual dialogue allowing the user to select version overrides."
      ],
      finalResult: "Deployed collaborative board ensuring conflict-free workspace updates over rapid network loops."
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
      experimentId: "EXP-060-G",
      researchQuestion: "Can we guarantee tenant data separation in a unified DB node without splitting clusters?",
      hypothesis: "By applying strict workspace ID hashing filters on all document collections, we can build secure separation boundaries.",
      techFormula: ["React", "Node", "Mdb", "Tan"],
      observation: [
        "Separates tenant queries with zero crossover leaks during parallel tests.",
        "TanStack caching keeps ticket retrieval latency minimal."
      ],
      finalResult: "Deployed multi-tenant support architecture ensuring query isolation rules across agent workspaces."
    }
  ];

  const selectedProject = projects.find(p => p.id === selectedProjectId) || projects[0];

  // Upgrades Skills Disk Catalog
  const diskSkills: Record<string, string[]> = {
    competencies: ["User Research & Strategy", "Interaction Design", "Visual System Design", "Strategic Architecture", "Information Architecture", "User Journey Flow Map"],
    process: ["Double Diamond (Discover/Define)", "Design Thinking (Empathize/Prototype)", "Usability Testing Protocols", "Wireframing & UI Rhythm", "Rapid Prototype Validation"],
    tools: ["Figma (Design/Systems)", "Framer & ProtoPie (Motion)", "FigJam & Miro (Collaboration)", "Notion (Dossier Specs)", "Figma Dev Mode & Zeplin"],
    collaboration: ["PM Requirement Syncs", "Engineer Hand-off & UI QA", "Task Completion Metric Tracking", "Feature Adoption Analysis", "Error & Support Reduction"]
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
      const subject = encodeURIComponent(`Project Genesis Connect from ${senderName}`);
      const body = encodeURIComponent(`${senderMsg}\n\nSender Email: ${senderEmail}`);
      window.location.href = `mailto:jenishj.dev@gmail.com?subject=${subject}&body=${body}`;
    }, 2200);
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

  // Triggered by terminal command
  const unlockSecretsTerminal = useCallback(() => {
    sessionStorage.setItem("failures_unlocked", "true");
    setFailuresUnlocked(true);
    setCurrentPage(5);
  }, [setCurrentPage]);

  // Click stamp on cover
  const handleStampClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    sessionStorage.setItem("failures_unlocked", "true");
    setFailuresUnlocked(true);
    alert("⚠ ANOMALY LOGS DETECTED: Secret failures drawer opened on right edge!");
  };

  return (
    <div ref={constraintsRef} className="w-full max-w-6xl mx-auto py-4 px-4 select-none relative z-20 font-space">
      
      {/* Synthesizer audio walkman */}
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
              className="absolute left-[2%] lg:left-[8%] xl:left-[12%] top-[12%] w-44 h-44 bg-neutral-900 border border-red-900/40 p-5 shadow-lg rotate-[-8deg] font-jetbrains text-stone-300 rounded-sm pointer-events-none hidden md:block"
            >
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-4 bg-red-950/20 shadow-sm rounded-sm border border-red-700/20" />
              <p className="font-bold border-b border-red-900/40 pb-1 mb-2 text-red-500 text-[10px]">DIRECTIVE #001:</p>
              <p className="text-[10px] leading-relaxed font-jetbrains text-stone-400">
                "Subject started with scripting mutations. Through failures and iterations, mutated into a full stack system builder."
              </p>
            </motion.div>

            {/* Right Desk Coffee Mug */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 0.8, x: 0 }}
              exit={{ opacity: 0, x: 80, transition: { duration: 0.3 } }}
              className="absolute right-[2%] lg:right-[8%] xl:right-[12%] bottom-[20%] w-24 h-24 text-stone-500 font-mono pointer-events-none hidden md:block"
            >
              <svg viewBox="0 0 100 100" className="w-full h-full text-neutral-800 opacity-60" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M30 75 Q 50 78, 70 75 L 67 45 L 33 45 Z" />
                <path d="M70 50 Q 82 50, 80 60 Q 78 70, 68 68" />
                <path d="M35 40 Q 40 30, 35 20 M 45 38 Q 50 28, 45 18 M 55 40 Q 60 30, 55 20" strokeDasharray="3 3" stroke="#ff5a46" />
                <path d="M20 78 Q 50 82, 80 78" strokeWidth="1" />
              </svg>
              <p className="text-[9px] text-center text-red-700/60 font-jetbrains mt-1 uppercase tracking-widest animate-pulse">charging... ☕</p>
            </motion.div>
            
            {/* Red pointing Arrow */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 0.9, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.3 } }}
              className="absolute left-[18%] lg:left-[22%] xl:left-[26%] bottom-[12%] text-red-700 hidden xl:block pointer-events-none"
            >
              <svg width="100" height="80" viewBox="0 0 100 80" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M10 10 Q 50 15, 80 50" strokeDasharray="4 4" />
                <path d="M68 46 L 80 50 L 78 38" />
              </svg>
              <p className="font-jetbrains text-xs text-red-600 rotate-[8deg] mt-1 pl-4 uppercase tracking-widest">Open Archive ➔</p>
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
              {/* ======= BINDER LOCK STRAP ======= */}
              <motion.div
                className="absolute right-[-2px] top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-1 pointer-events-none"
                animate={isUnlocking ? { x: 60, rotate: 18, opacity: 0 } : { x: 0, rotate: 0, opacity: 1 }}
                transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
              >
                <div className="w-4 h-16 rounded-sm shadow-md" style={{ background: "linear-gradient(to right, #451a1a, #6e2727, #451a1a)", border: "1px solid #301010" }} />
                {/* Lock Clasp */}
                <motion.div
                  ref={lockRef}
                  animate={isUnlocking ? { scale: 1.3, rotate: -20 } : { rotate: [0, 0] }}
                  transition={{ duration: 0.35 }}
                  className="w-10 h-10 rounded-full flex items-center justify-center shadow-xl"
                  style={{ background: "linear-gradient(135deg, #7c2d12 0%, #b91c1c 50%, #7c2d12 100%)", border: "2px solid #450a0a", boxShadow: "0 2px 8px rgba(0,0,0,0.5), inset 0 1px 2px rgba(255,255,255,0.2)" }}
                >
                  <span className="text-lg select-none leading-none">{isUnlocking ? "🔓" : "🔒"}</span>
                </motion.div>
                <div className="w-4 h-16 rounded-sm shadow-md" style={{ background: "linear-gradient(to right, #451a1a, #6e2727, #451a1a)", border: "1px solid #301010" }} />
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
                boxShadow: "0 35px 70px rgba(0,0,0,0.7)" 
              }}
              onClick={bookLocked ? handleLockedCoverClick : handleOpenBook}
              style={{ transformOrigin: "left center", cursor: bookLocked ? "not-allowed" : "pointer" }}
              className="w-full max-w-[500px] h-[600px] bg-[#3a312a] border-[12px] border-[#201b17] rounded-l-md rounded-r-3xl shadow-2xl flex flex-col justify-between p-8 text-center transition-shadow duration-300 relative group"
            >
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.6))] pointer-events-none" />
              <div className="absolute left-0 top-0 bottom-0 w-8 bg-[#201b17] border-r-2 border-red-950 shadow-inner" />

              {/* CONFIDENTIAL Stamp */}
              <div 
                onClick={handleStampClick}
                className="confidential-stamp absolute top-[38%] left-[10%] text-2xl font-bold cursor-pointer hover:scale-105 active:scale-95 transition-transform z-20"
              >
                CONFIDENTIAL
              </div>

              {/* Cover Sticker */}
              <div className="mt-16 bg-[#f0e6cb] p-6 border-4 border-double border-red-900/60 rounded-lg rotate-[-2deg] shadow-lg max-w-[360px] mx-auto relative group-hover:rotate-[1deg] transition-transform duration-300 z-10">
                <h1 className="text-3xl sm:text-4xl font-space font-black tracking-widest text-[#9e2a2b] mb-1 uppercase">PROJECT: GENESIS</h1>
                <p className="font-jetbrains text-xs text-neutral-800 font-bold border-t border-red-900/20 pt-2 uppercase tracking-widest">
                  Classified Research Diary
                </p>
                <div className="absolute -top-3 -left-3 text-2xl">🧬</div>
                <div className="absolute -bottom-3 -right-3 text-2xl">⚡</div>
              </div>

              {/* Tape Sticker */}
              <div className="tape w-36 h-6 rotate-[5deg] mx-auto mt-6 z-10 text-[9px] font-jetbrains text-stone-900 font-bold flex items-center justify-center bg-white/70 shadow-sm border border-black/10">
                SUBJECT #001 LOGBOOK
              </div>

              <div className="mb-10 text-stone-300 space-y-4 font-jetbrains z-10">
                <motion.p 
                  animate={{ scale: [1, 1.04, 1], opacity: [0.8, 1, 0.8] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="text-xs uppercase tracking-widest font-bold"
                  style={{ color: "#d67c52", textShadow: "0 0 10px rgba(214,124,82,0.3)" }}
                >
                  {bookLocked ? "use credentials key to unlock ✦" : "tap folder to open 🗃️"}
                </motion.p>
                <div className="flex justify-center items-center gap-1 text-[10px] uppercase tracking-widest text-stone-500 select-none">
                  <span>( {bookLocked ? "drag key" : "examine"}</span>
                  <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 1, repeat: Infinity }}>➔</motion.span>
                  <span>)</span>
                </div>
              </div>
            </motion.div>
            
            {/* Floating Key */}
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
                  <div key={i} className="w-6 h-3 rounded-full bg-gradient-to-r from-neutral-800 via-neutral-600 to-neutral-800 border border-neutral-950 shadow-md transform -translate-x-[2px]" />
                ))}
              </div>

              {/* ================= LEFT PAGE ================= */}
              <div className="md:col-span-5 bg-paper-bg border-l-[12px] border-notebook-border/80 rounded-l-2xl p-6 sm:p-8 relative paper-texture transition-all duration-300 min-h-[580px] flex flex-col justify-between">
                <div className="absolute right-6 top-0 bottom-0 w-[1.5px] bg-[#9e2a2b]/20 hidden md:block" />
                
                <div className="flex-1 flex flex-col justify-between relative z-10">
                  
                  {/* SPREAD 0: Brain Nodes Blueprint */}
                  {currentPage === 0 && (
                    <div className="space-y-4 text-slate-800">
                      <div className="border-b-2 border-dashed border-[#9e2a2b]/20 pb-2">
                        <h2 className="text-2xl font-space font-black uppercase text-[#9e2a2b] mb-0.5">Subject profile</h2>
                        <p className="font-jetbrains text-[9px] uppercase tracking-widest text-slate-600">research dossier // subject #001</p>
                      </div>

                      {/* Dossier Meta info */}
                      <div className="bg-white/40 border border-black/10 rounded p-3 text-[10.5px] font-jetbrains space-y-1.5 leading-snug">
                        <p><span className="text-red-700 font-bold uppercase">NAME:</span> JENISH J</p>
                        <p><span className="text-slate-600 font-bold uppercase">DESIGNATION:</span> FULL STACK SYSTEM BUILDER</p>
                        <p><span className="text-slate-600 font-bold uppercase">ORIGIN:</span> <span className="redacted-text">Chennai, India</span> (HOVER TO REVEAL)</p>
                        <p><span className="text-slate-600 font-bold uppercase">STATUS:</span> ACTIVE / EVOLVING</p>
                      </div>

                      {/* Interactive SVG Network Map */}
                      <div className="relative w-full h-40 border border-black/10 bg-white/40 rounded flex items-center justify-center p-2 shadow-inner">
                        <svg className="w-full h-full overflow-visible" viewBox="0 0 200 120">
                          <line x1="100" y1="20" x2="40" y2="70" stroke="#9e2a2b" strokeWidth="1.5" strokeDasharray="3 3" />
                          <line x1="100" y1="20" x2="160" y2="70" stroke="#9e2a2b" strokeWidth="1.5" strokeDasharray="3 3" />
                          <line x1="40" y1="70" x2="100" y2="100" stroke="#9e2a2b" strokeWidth="1.5" strokeDasharray="3 3" />
                          <line x1="160" y1="70" x2="100" y2="100" stroke="#9e2a2b" strokeWidth="1.5" strokeDasharray="3 3" />
                          <line x1="100" y1="20" x2="100" y2="100" stroke="#9e2a2b" strokeWidth="1.5" className="opacity-20" />

                          <circle cx="100" cy="20" r="9" fill="#9e2a2b" className="cursor-pointer hover:scale-125 transition-transform" onMouseEnter={() => setActiveBrainNode("manifesto")} />
                          <circle cx="40" cy="70" r="9" fill="#2563eb" className="cursor-pointer hover:scale-125 transition-transform" onMouseEnter={() => setActiveBrainNode("research")} />
                          <circle cx="160" cy="70" r="9" fill="#7c3aed" className="cursor-pointer hover:scale-125 transition-transform" onMouseEnter={() => setActiveBrainNode("develop")} />
                          <circle cx="100" cy="100" r="9" fill="#ea580c" className="cursor-pointer hover:scale-125 transition-transform" onMouseEnter={() => setActiveBrainNode("tactile")} />

                          <text x="100" y="34" textAnchor="middle" fontSize="6.5" className="font-jetbrains fill-slate-700 font-bold select-none uppercase">MANIFESTO</text>
                          <text x="40" y="84" textAnchor="middle" fontSize="6.5" className="font-jetbrains fill-slate-700 font-bold select-none uppercase">RESEARCH</text>
                          <text x="160" y="84" textAnchor="middle" fontSize="6.5" className="font-jetbrains fill-slate-700 font-bold select-none uppercase">DEVELOP</text>
                          <text x="100" y="112" textAnchor="middle" fontSize="6.5" className="font-jetbrains fill-slate-700 font-bold select-none uppercase">TACTILE</text>
                        </svg>
                      </div>

                      {/* Display text based on hovered node */}
                      <div className="bg-white/60 border border-black/10 rounded p-3 h-[135px] shadow-sm font-handwritten text-slate-800 leading-snug flex flex-col justify-center text-center">
                        {activeBrainNode === "manifesto" && (
                          <p className="text-sm"><b>MANIFESTO</b>: "I build smart systems that automate tedious bottlenecks so builders can think bigger."</p>
                        )}
                        {activeBrainNode === "research" && (
                          <p className="text-sm"><b>RESEARCH / DEFINE</b>: "Empathize first. User research, journey maps, and problem statements are the foundation of every design."</p>
                        )}
                        {activeBrainNode === "develop" && (
                          <p className="text-sm"><b>DEVELOP / DELIVER</b>: "Iterative prototyping in Figma and Framer, validated by usability testing, leads to pixel-perfect delivery."</p>
                        )}
                        {activeBrainNode === "tactile" && (
                          <p className="text-sm"><b>TACTILE MECHANICS</b>: "Interfaces should feel alive. Micro-interactions and physical details bridge the gap between design and engineering."</p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* SPREAD 1: Floppy Catalog Box */}
                  {currentPage === 1 && (
                    <div className="space-y-4">
                      <div className="border-b-2 border-dashed border-[#9e2a2b]/20 pb-2">
                        <h2 className="text-2xl font-space font-black uppercase text-[#9e2a2b] mb-0.5">upgrades log</h2>
                        <p className="font-jetbrains text-[9px] uppercase tracking-widest text-slate-600">Select neural floppy module to load</p>
                      </div>

                      {/* Disk catalog list */}
                      <div className="grid grid-cols-2 gap-4 pt-2">
                        {[
                          { id: "competencies", label: "Competencies", color: "bg-blue-800 border-blue-950" },
                          { id: "process", label: "Design Process", color: "bg-purple-800 border-purple-950" },
                          { id: "tools", label: "Tools / Methods", color: "bg-emerald-800 border-emerald-950" },
                          { id: "collaboration", label: "Collaboration", color: "bg-orange-850 border-orange-950" }
                        ].map(disk => (
                          <div 
                            key={disk.id}
                            onClick={() => handleLoadDisk(disk.id)}
                            className={`p-3 rounded border-2 text-white font-jetbrains cursor-pointer flex flex-col justify-between shadow-md hover:-translate-y-1 hover:shadow-lg transition-all select-none ${disk.color}`}
                          >
                            <div className="flex justify-between items-start">
                              <div className="w-5 h-5 bg-stone-100 rounded-sm flex items-center justify-center shadow-inner">
                                <div className="w-3.5 h-3.5 bg-stone-300 border-t border-stone-500" />
                              </div>
                              <span className="text-[7px] border border-white/20 px-1 rounded uppercase tracking-wider font-bold">3.5"</span>
                            </div>
                            <p className="text-[10px] font-bold border-t border-white/10 mt-4 pt-1 uppercase tracking-wide">{disk.label}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* SPREAD 2: Project Cassettes */}
                  {currentPage === 2 && (
                    <div className="space-y-3">
                      <h2 className="text-2xl font-space font-black uppercase text-[#9e2a2b] border-b-2 border-dashed border-[#9e2a2b]/20 pb-1.5 select-none">
                        experiments list
                      </h2>
                      <p className="font-jetbrains text-[9.5px] uppercase text-slate-600 mb-1 select-none">select a cassette to spin in deck:</p>

                      <div className="space-y-1.5 max-h-[380px] overflow-y-auto pr-1 scrollbar-thin">
                        {projects.map((project, idx) => {
                          const isSelected = selectedProjectId === project.id;
                          return (
                            <div
                              key={project.id}
                              onClick={() => handleSelectProject(project.id)}
                              className={`p-2 rounded border border-black/15 shadow-sm cursor-pointer select-none font-jetbrains flex items-center gap-3 transition-colors ${
                                isSelected ? "bg-[#d2bc96] border-[#9e2a2b] text-slate-900 font-bold shadow-md" : "bg-white/40 hover:bg-white/70 text-slate-700"
                              }`}
                            >
                              {/* Small Cassette outline */}
                              <div className="w-8 h-4 border border-slate-600 rounded bg-slate-950 flex justify-around items-center px-0.5">
                                <div className="w-1 h-1 rounded-full bg-slate-400 border border-slate-600" />
                                <div className="w-1 h-1 rounded-full bg-slate-400 border border-slate-600" />
                              </div>
                              <span className="text-[11.5px] leading-none uppercase">{project.experimentId} : {project.title}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* SPREAD 3: Experience Timeline */}
                  {currentPage === 3 && (
                    <div className="space-y-4">
                      <div className="border-b-2 border-dashed border-[#9e2a2b]/20 pb-2">
                        <h2 className="text-2xl font-space font-black uppercase text-[#9e2a2b] mb-1">field reports</h2>
                        <p className="font-jetbrains text-[9px] uppercase tracking-widest text-slate-600">historical mission logbooks</p>
                      </div>

                      <div className="font-jetbrains space-y-4 text-slate-800">
                        {experiences.map(exp => (
                          <div 
                            key={exp.id} 
                            onClick={() => setFlippedPolaroid(exp.id)}
                            className="p-3 bg-white/40 border border-black/10 rounded shadow-sm hover:bg-white/70 cursor-pointer transition-colors"
                          >
                            <p className="text-slate-950 font-bold text-sm leading-tight uppercase">{exp.role}</p>
                            <p className="text-[10px] text-slate-500 mt-0.5 uppercase">{exp.company} · {exp.duration}</p>
                            <p className="text-[9px] text-red-700 font-bold mt-1.5 uppercase hover:underline">Tap snapshot file ➔</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* SPREAD 4: Connect Alignments */}
                  {currentPage === 4 && (
                    <div className="space-y-4 text-slate-800">
                      <div className="border-b-2 border-dashed border-[#9e2a2b]/20 pb-2">
                        <h2 className="text-2xl font-space font-black uppercase text-[#9e2a2b] mb-1">DNA alignment</h2>
                        <p className="font-jetbrains text-[9px] uppercase tracking-widest text-slate-600">mission integration parameters</p>
                      </div>

                      <ul className="space-y-3 pt-2">
                        {checklistItems.map((text, i) => {
                          const isChecked = checkedConnect.includes(i);
                          return (
                            <li 
                              key={i} 
                              onClick={() => toggleCheckConnect(i)}
                              className={`group flex items-center gap-3 p-1.5 -ml-1.5 rounded transition-all duration-150 cursor-pointer ${isChecked ? "bg-red-900/5" : "hover:bg-red-900/5"}`}
                            >
                              <div className="w-5 h-5 rounded border-2 border-[#9e2a2b] flex-shrink-0 flex items-center justify-center bg-white/50 transition-colors">
                                {isChecked && <span className="text-[#9e2a2b] font-bold text-xs">✓</span>}
                              </div>
                              <span className={`font-handwritten text-base leading-tight transition-colors duration-150 ${isChecked ? "text-red-900 font-bold" : "text-slate-700 group-hover:text-slate-950"}`}>
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
                            animate={{ scale: 1.03, opacity: 1, rotate: 2 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            className="bg-yellow-100 border border-yellow-300 p-2.5 rounded shadow-sm text-center font-handwritten text-[#9e2a2b] text-sm"
                          >
                            🎉 Alignment synced. Proceed to Dispatch Dispatch on right.
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )}

                  {/* SPREAD 5: FAILED EXPERIMENTS */}
                  {currentPage === 5 && (
                    <div className="space-y-4 text-slate-800">
                      <div className="border-b-2 border-dashed border-red-700/30 pb-2">
                        <div className="confidential-stamp text-[10px] py-1 px-3 float-right">ANOMALY</div>
                        <h2 className="text-2xl font-space font-black uppercase text-red-700 mb-0.5">anomalies log</h2>
                        <p className="font-jetbrains text-[9px] uppercase tracking-widest text-slate-600">FAILED EXPERIMENTS & ARCHIVES</p>
                      </div>

                      <div className="space-y-3 font-jetbrains text-[10px] leading-relaxed max-h-[380px] overflow-y-auto pr-1 scrollbar-thin">
                        <div className="p-3 bg-red-950/5 border border-red-700/20 rounded shadow-sm">
                          <p className="font-bold text-red-700 uppercase">ANOMALY #08-B: AI Voice Pipeline Crash</p>
                          <p className="text-slate-500 mt-0.5"><span className="font-bold">CAUSE:</span> Real-time WebSocket audio socket congestion and inference latency spike.</p>
                          <p className="text-slate-500"><span className="font-bold">SOLUTION:</span> Redesigned state processing arrays and implemented buffered message queues.</p>
                          <p className="text-slate-800 font-bold mt-1"><span className="text-[#9e2a2b]">+ KNOWLEDGE EXTRACTED:</span> High-throughput streaming protocol engineering.</p>
                        </div>

                        <div className="p-3 bg-red-950/5 border border-red-700/20 rounded shadow-sm">
                          <p className="font-bold text-red-700 uppercase">ANOMALY #12-C: Automated LLM Hallucinations</p>
                          <p className="text-slate-500 mt-0.5"><span className="font-bold">CAUSE:</span> Unconstrained system prompts leaking context parameters in nested agent loops.</p>
                          <p className="text-slate-500"><span className="font-bold">SOLUTION:</span> Formulated rigorous semantic validators and added structured output gateways.</p>
                          <p className="text-slate-800 font-bold mt-1"><span className="text-[#9e2a2b]">+ KNOWLEDGE EXTRACTED:</span> Multi-agent safety boundaries & validation threshold structures.</p>
                        </div>
                      </div>
                    </div>
                  )}

                </div>

                <div className="border-t border-[#9e2a2b]/10 pt-4 flex justify-between items-center text-slate-600 font-jetbrains text-[9px] uppercase select-none tracking-widest mt-6">
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
                    <div className="space-y-4 text-slate-800 relative">
                      <div className="flex justify-between items-center border-b pb-1 select-none">
                        <h3 className="text-2xl font-space font-black uppercase text-[#9e2a2b]">directives summary</h3>
                        <div className="confidential-stamp text-[8.5px] py-0.5 px-2 font-black">RESTRICTED</div>
                      </div>
                      
                      <div className="space-y-3 text-[12px] font-jetbrains leading-relaxed">
                        <p className="italic text-slate-600">
                          "Subject Jenish J mutated through code paradigms. Evolved capabilities to compile autonomous AI systems."
                        </p>
                        
                        <div className="p-3 bg-white/40 border rounded shadow-sm">
                          <p className="font-bold text-[#9e2a2b] text-[11px] uppercase">1. solve friction 🛠:</p>
                          <p className="text-slate-700 mt-1 pl-2 border-l border-slate-400">
                            I only build tools that solve practical bottlenecks (e.g. <b>codesentry</b> scanning AI code for leaks, <b>HireMindAI</b> automating recruitment workflows).
                          </p>
                        </div>

                        <div className="p-3 bg-white/40 border rounded shadow-sm">
                          <p className="font-bold text-[#9e2a2b] text-[11px] uppercase">2. tactile mechanics 🖱:</p>
                          <p className="text-slate-700 mt-1 pl-2 border-l border-slate-400">
                            A digital workspace should feel real. Draggable nodes, inserts, and spinning reels make interactions memorable.
                          </p>
                        </div>

                        <div className="p-3 bg-white/40 border rounded shadow-sm">
                          <p className="font-bold text-[#9e2a2b] text-[11px] uppercase">3. intelligent workflows 🧠:</p>
                          <p className="text-slate-700 mt-1 pl-2 border-l border-slate-400">
                            AI shouldn't be limited to sterile chat interfaces. It must be woven directly into terminal workflows and sandbox tools.
                          </p>
                        </div>
                      </div>

                      {/* Classified sticky note */}
                      <motion.div
                        drag
                        dragConstraints={constraintsRef}
                        dragElastic={0.15}
                        whileDrag={{ scale: 1.05, zIndex: 100 }}
                        whileHover={{ rotate: 1, scale: 1.02 }}
                        className="absolute bottom-[-10px] right-[-10px] w-40 bg-note-yellow border border-yellow-400 p-3 shadow-md rounded rotate-[-4deg] cursor-grab active:cursor-grabbing text-slate-800 text-[10px] leading-tight select-none hidden sm:block z-30 font-jetbrains"
                      >
                        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-3.5 bg-white/40 shadow-sm" />
                        <p className="font-bold border-b border-slate-400/50 pb-0.5 mb-1.5 uppercase text-[8px] text-[#9e2a2b]">OBSERVATION LOG 📝</p>
                        <p>• Setup: Mechanical Browns</p>
                        <p>• Core: Lofi & Caffeine ☕</p>
                        <p>• Outputs: 10+ completed systems</p>
                        <p className="text-[7.5px] text-slate-500 mt-1.5 italic text-center">(Drag logs around desk)</p>
                      </motion.div>
                    </div>
                  )}

                  {/* SPREAD 1: Floppy Disk Reader Interface */}
                  {currentPage === 1 && (
                    <div className="space-y-6">
                      
                      {/* Floppy Reader Slot */}
                      <div className="bg-neutral-800 rounded-lg p-5 border-b-4 border-r-4 border-neutral-950 shadow-md relative max-w-[420px] mx-auto select-none">
                        <div className="h-4 bg-neutral-950 rounded border-2 border-slate-700 shadow-inner relative flex items-center px-4 overflow-hidden mb-3">
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
                        <p className="font-jetbrains text-[9px] text-neutral-400 uppercase tracking-widest text-right">3.5" Floppy Reader Slot</p>
                      </div>

                      {/* Display Screen */}
                      <div className="bg-neutral-950 rounded-lg p-4 h-[240px] border-4 border-neutral-800 shadow-inner font-jetbrains text-xs text-emerald-400 max-w-[420px] mx-auto flex flex-col justify-between relative overflow-hidden select-text crt-screen">
                        <div className="screen-glare absolute inset-0 z-10 pointer-events-none" />
                        <div className="scanline-sweep" />
                        
                        <div className="relative z-20 space-y-2">
                          {diskLoadingState === "idle" && (
                            <p className="text-neutral-500 animate-pulse text-center mt-16 font-jetbrains">INSERT NEURAL MODULE TO BOOT REPORT...</p>
                          )}
                          
                          {diskLoadingState === "loading" && (
                            <div className="space-y-1">
                              <p>BOOT DIAGNOSTICS: INITIALIZING...</p>
                              <p>MOUNTING DRIVE: OK [3.5" HD]</p>
                              <p className="text-yellow-400">LOADING FILE BLOCKS... [PLEASE WAIT]</p>
                            </div>
                          )}

                          {diskLoadingState === "loaded" && loadedDisk && (
                            <div className="space-y-1.5">
                              <p className="text-cyan-400 font-bold">SYSTEM DIAGNOSTIC: {loadedDisk.toUpperCase()} LOADED</p>
                              <p className="text-neutral-500">------------------------------------</p>
                              {diskSkills[loadedDisk].map((skill, i) => (
                                <p key={i} className="flex justify-between text-[11px]">
                                  <span>&gt; {skill}</span>
                                  <span className="text-emerald-500 font-bold uppercase text-[9px]">ONLINE</span>
                                </p>
                              ))}
                              <p className="text-neutral-500">------------------------------------</p>
                              <p className="text-xs text-yellow-500 font-bold uppercase tracking-wider">STATUS: OPTIMIZED</p>
                            </div>
                          )}
                        </div>

                        {diskLoadingState === "loaded" && (
                          <div className="text-[8px] text-neutral-500 border-t border-neutral-800 pt-2 flex justify-between select-none">
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
                      
                      {/* Cassette Tape Deck */}
                      <div className="bg-neutral-800 rounded-lg p-4 border-b-4 border-r-4 border-neutral-950 shadow-md relative max-w-[480px] mx-auto select-none mb-3">
                        <div className="bg-neutral-950 border-2 border-neutral-800 rounded p-3 flex justify-between items-center relative overflow-hidden h-[80px]">
                          {/* Left Spinning Reel */}
                          <div className="w-12 h-12 rounded-full border-4 border-neutral-700 bg-neutral-900 flex justify-center items-center relative shadow-inner">
                            <motion.div 
                              className="w-1 h-8 bg-neutral-500"
                              animate={isPlayingTape ? { rotate: 360 } : {}}
                              transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                            />
                          </div>

                          {/* Cassette Tape window */}
                          <div className="flex-1 border-2 border-neutral-900 bg-emerald-500/5 rounded mx-3 flex items-center justify-center font-jetbrains text-[10px] text-yellow-500 font-bold tracking-widest uppercase">
                            {selectedProject.experimentId} : {selectedProject.title}
                          </div>

                          {/* Right Spinning Reel */}
                          <div className="w-12 h-12 rounded-full border-4 border-neutral-700 bg-neutral-900 flex justify-center items-center relative shadow-inner">
                            <motion.div 
                              className="w-1 h-8 bg-neutral-500"
                              animate={isPlayingTape ? { rotate: 360 } : {}}
                              transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Display active project diagnostic view */}
                      <div className="w-full">
                        {selectedProject.type === "monitor" && (
                          <div className="bg-neutral-700 p-4 rounded-xl shadow-md border-b-4 border-r-4 border-neutral-800 relative max-w-[480px] mx-auto select-text">
                            <div className="bg-black rounded p-3 h-[240px] relative overflow-hidden border border-neutral-800 shadow-inner">
                              <div className="screen-glare absolute inset-0 pointer-events-none" />
                              <InteractiveTerminal onUnlockSecrets={unlockSecretsTerminal} />
                            </div>
                            
                            <div className="mt-3 pt-2 border-t border-neutral-800/40">
                              <p className="font-jetbrains text-[9px] text-stone-300 font-bold select-none">🛠 SYSTEM CODESTACK:</p>
                              <div className="flex flex-wrap gap-1 mt-1 select-none">
                                {selectedProject.stack.map(tag => (
                                  <span key={tag} className="text-[8.5px] text-[#39ff14] bg-neutral-950 px-1.5 py-0.5 rounded shadow-sm border border-neutral-900 font-jetbrains">
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}

                        {selectedProject.type === "sandbox" && (
                          <div className="bg-[#111] border-4 border-neutral-800 rounded-xl shadow-md p-4 relative max-w-[480px] mx-auto select-text">
                            <div className="flex justify-between items-start mb-2 select-none border-b border-neutral-800 pb-1">
                              <div>
                                <h3 className="text-base font-space font-black uppercase text-red-500 leading-none">{selectedProject.title}</h3>
                                <p className="font-jetbrains text-[9px] text-stone-500 uppercase tracking-widest mt-0.5">{selectedProject.subtitle}</p>
                              </div>
                              <span className="text-[9px] border border-red-950 text-red-600 px-1 rounded uppercase tracking-wider font-bold">{selectedProject.experimentId}</span>
                            </div>
                            
                            <div className="mb-2">
                              <VaultSandbox />
                            </div>

                            <div className="mt-3 select-none">
                              <div className="flex flex-wrap gap-1">
                                {selectedProject.stack.map(tag => (
                                  <span key={tag} className="text-[9px] text-stone-300 bg-neutral-900 px-2 py-0.5 rounded shadow-sm font-jetbrains border border-neutral-800">
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}

                        {selectedProject.type === "dossier" && (
                          <div className="bg-[#eee8c8] border-l-8 border-l-[#9e2a2b] rounded-r-xl shadow-md p-5 relative paper-texture max-w-[480px] mx-auto min-h-[320px] flex flex-col justify-between select-text text-slate-800">
                            <div className="space-y-3 text-[11px] font-jetbrains leading-normal">
                              {/* Header info */}
                              <div className="flex justify-between items-start border-b border-black/10 pb-1">
                                <div>
                                  <h3 className="text-base font-space font-bold uppercase text-red-800 leading-none">{selectedProject.title}</h3>
                                  <p className="text-[9px] text-slate-500 uppercase tracking-wider mt-0.5">{selectedProject.subtitle}</p>
                                </div>
                                <span className="text-[9px] border border-[#9e2a2b]/30 text-[#9e2a2b] px-1 rounded uppercase tracking-wider font-bold">{selectedProject.experimentId}</span>
                              </div>

                              <p><span className="text-red-700 font-bold uppercase">RESEARCH QUESTION:</span> {selectedProject.researchQuestion}</p>
                              
                              <p><span className="text-slate-600 font-bold uppercase">HYPOTHESIS:</span> {selectedProject.hypothesis}</p>

                              {/* Tech Formula Badge boxes */}
                              <div className="space-y-1">
                                <span className="text-slate-600 font-bold uppercase text-[9.5px]">TECH FORMULA:</span>
                                <div className="flex flex-wrap gap-1.5 pt-0.5">
                                  {selectedProject.techFormula.map((el, i) => {
                                    const elementLabels: Record<string, string> = {
                                      Nx: "Next.js",
                                      Dr: "Drizzle",
                                      Gem: "Gemini",
                                      Vx: "Vertex AI",
                                      Py: "Python",
                                      Fa: "FastAPI",
                                      Cli: "CLI",
                                      Rule: "Rules",
                                      Np: "NumPy",
                                      Sp: "SciPy",
                                      Rl: "RL",
                                      React: "React",
                                      Docker: "Docker",
                                      Node: "Node.js",
                                      Mdb: "MongoDB",
                                      Wss: "Socket.io",
                                      Exp: "Express",
                                      Tan: "React Query",
                                      Pg: "Postgres"
                                    };
                                    return (
                                      <div key={i} className="flex flex-col items-center justify-center w-9 h-9 border border-black/15 bg-white/70 rounded text-center shadow-sm select-none">
                                        <span className="text-xs font-black text-red-700 leading-none">{el}</span>
                                        <span className="text-[5.5px] uppercase text-slate-500 mt-0.5 leading-none">{elementLabels[el] || el}</span>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>

                              {/* Observation */}
                              <div className="space-y-0.5">
                                <span className="text-slate-600 font-bold uppercase">OBSERVATIONS:</span>
                                <ul className="list-disc list-inside space-y-0.5 text-slate-700 text-[10.5px]">
                                  {selectedProject.observation.map((obs, i) => <li key={i}>{obs}</li>)}
                                </ul>
                              </div>

                              {/* Final Result */}
                              <p><span className="text-emerald-700 font-bold uppercase">FINAL RESULT:</span> {selectedProject.finalResult}</p>
                            </div>

                            <div className="flex gap-3 mt-4">
                              <a href={selectedProject.codeUrl} target="_blank" rel="noreferrer" className="text-[10px] font-jetbrains border border-dashed border-slate-700 px-2.5 py-1 rounded hover:bg-slate-800 hover:text-white transition-all select-none">
                                [ SOURCE CODE ]
                              </a>
                              <a href={selectedProject.demoUrl} target="_blank" rel="noreferrer" className="text-[10px] font-jetbrains border border-dashed border-[#9e2a2b] px-2.5 py-1 rounded hover:bg-[#9e2a2b] hover:text-white transition-all select-none text-[#9e2a2b]">
                                [ RUN REPORT ]
                              </a>
                            </div>
                          </div>
                        )}
                      </div>

                    </div>
                  )}

                  {/* SPREAD 3: Experience Polaroids */}
                  {currentPage === 3 && (
                    <div className="space-y-4 flex flex-col items-center">
                      <h3 className="font-jetbrains text-[9.5px] text-slate-500 uppercase tracking-widest select-none mb-1">
                        📷 HOVER DECLASSIFIED SNAPSHOT FILES TO DECODE DETAILS:
                      </h3>

                      <div className="flex flex-wrap gap-4 justify-center w-full max-h-[380px] overflow-y-auto pr-1 scrollbar-thin">
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
                                  <div className="w-full h-28 bg-[#eee] border rounded-sm flex items-center justify-center relative overflow-hidden p-2">
                                    <div className="screen-glare absolute inset-0 opacity-15 pointer-events-none" />
                                    {/* Placeholder styling instead of missing images */}
                                    <div className="flex flex-col items-center justify-center font-jetbrains text-stone-400 gap-1 uppercase select-none">
                                      <span className="text-xl">🗃️</span>
                                      <span className="text-[7.5px] tracking-widest">{exp.company}</span>
                                    </div>
                                  </div>
                                  <div className="text-center font-jetbrains text-slate-800 mt-2 select-none">
                                    <p className="font-bold text-xs uppercase">{exp.company}</p>
                                    <p className="text-[8.5px] text-slate-500">{exp.duration}</p>
                                  </div>
                                </div>

                                {/* Back: Polaroid Notes */}
                                <div 
                                  style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                                  className="w-full h-full bg-yellow-100 p-2.5 shadow-md border rounded-sm border-yellow-200 absolute inset-0 flex flex-col justify-between font-jetbrains text-slate-800 text-[9.5px] leading-snug"
                                >
                                  <div>
                                    <p className="font-bold text-[10px] text-red-700 border-b pb-0.5 mb-1 uppercase">{exp.role}</p>
                                    <p className="text-[8px] text-slate-600 uppercase tracking-wide leading-tight mb-1"><span className="font-bold">MISSION:</span> {exp.mission}</p>
                                    <ul className="list-disc list-inside space-y-0.5 text-slate-700 text-[8px]">
                                      {exp.bullets.map((b, i) => <li key={i} className="truncate">{b}</li>)}
                                    </ul>
                                  </div>
                                  <div className="border-t border-yellow-300/40 pt-1 flex justify-between items-center text-[7px] text-slate-500 uppercase tracking-widest select-none">
                                    <span>Status: <span className="text-emerald-700 font-bold">COMPLETED</span></span>
                                    <span> eyes only </span>
                                  </div>
                                </div>

                              </motion.div>
                            </div>
                          );
                        })}
                      </div>

                    </div>
                  )}

                  {/* SPREAD 4: Connect Dispatch Postcard */}
                  {currentPage === 4 && (
                    <div className="flex-1 flex flex-col justify-center items-center relative overflow-visible">
                      <AnimatePresence mode="wait">
                        
                        {/* POSTCARD EDITING */}
                        {postcardState === "editing" && (
                          <motion.form
                            key="postcard-edit"
                            onSubmit={handleSendPostcard}
                            className="w-full max-w-[460px] bg-[#f8f5dc] border-[6px] border-[#d2bc96] rounded shadow-layered p-4 relative paper-texture flex flex-col sm:grid sm:grid-cols-2 gap-4 text-slate-800 font-jetbrains text-xs"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                          >
                            <div className="absolute top-4 bottom-4 left-1/2 w-[1px] bg-slate-400/40 hidden sm:block" />

                            {/* Message fields */}
                            <div className="space-y-3 font-jetbrains">
                              <div>
                                <label className="block text-[8px] text-red-700 font-bold uppercase mb-0.5">Sender Identifier:</label>
                                <input
                                  type="text"
                                  required
                                  value={senderName}
                                  onChange={e => setSenderName(e.target.value)}
                                  placeholder="Recruiter Name..."
                                  className="w-full bg-transparent border-b border-slate-400 pb-0.5 outline-none text-xs placeholder:text-slate-500/40"
                                />
                              </div>
                              <div>
                                <label className="block text-[8px] text-red-700 font-bold uppercase mb-0.5">Callback Address:</label>
                                <input
                                  type="email"
                                  required
                                  value={senderEmail}
                                  onChange={e => setSenderEmail(e.target.value)}
                                  placeholder="name@company.com..."
                                  className="w-full bg-transparent border-b border-slate-400 pb-0.5 outline-none text-xs placeholder:text-slate-500/40"
                                />
                              </div>
                              <div>
                                <label className="block text-[8px] text-red-700 font-bold uppercase mb-0.5">Dispatch Directive:</label>
                                <textarea
                                  required
                                  rows={3}
                                  value={senderMsg}
                                  onChange={e => setSenderMsg(e.target.value)}
                                  placeholder="Type mission details here..."
                                  className="w-full bg-transparent border-b border-slate-400 pb-0.5 outline-none text-[10px] resize-none placeholder:text-slate-500/40 leading-relaxed font-jetbrains"
                                />
                              </div>
                            </div>

                            {/* Stamp & Address details */}
                            <div className="flex flex-col justify-between items-center sm:pl-4 text-center">
                              <div className="w-16 h-20 border border-neutral-300 bg-white/70 rounded flex flex-col justify-center items-center shadow-inner relative select-none">
                                <span className="text-xl">🧬</span>
                                <span className="text-[6.5px] font-jetbrains text-slate-500 mt-1 uppercase">GENESIS</span>
                                <span className="text-[5.5px] font-jetbrains text-slate-400">RESEARCH</span>
                              </div>

                              <div className="font-jetbrains text-[9px] text-slate-600 leading-normal select-none my-2 sm:my-0">
                                <p className="font-bold border-b border-slate-300 w-28 mx-auto">TO: SUBJECT #001</p>
                                <p>COMMAND BASE STATION</p>
                                <p className="text-[7.5px] text-slate-400 mt-0.5">GMT +5:30</p>
                              </div>

                              <button
                                type="submit"
                                className="bg-[#9e2a2b] text-white font-bold px-3 py-1.5 rounded shadow hover:bg-red-800 transition-all cursor-pointer text-[10.5px] uppercase active:scale-95 tracking-wider font-jetbrains"
                              >
                                Send Dispatch ✉️
                              </button>
                            </div>
                          </motion.form>
                        )}

                        {/* SENDING */}
                        {postcardState === "sending" && (
                          <motion.div
                            key="postcard-send"
                            className="absolute flex items-center justify-center select-none"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                          >
                            <motion.svg 
                              width="50" 
                              height="50" 
                              viewBox="0 0 24 24" 
                              fill="none" 
                              stroke="#9e2a2b" 
                              strokeWidth="2"
                              animate={{ 
                                x: [0, 150, -50, 420], 
                                y: [0, -120, -180, 0], 
                                rotate: [0, -15, -45, 20], 
                                scale: [1, 1.2, 0.8, 0] 
                              }}
                              transition={{ duration: 2.2, ease: "easeInOut" }}
                              className="text-[#9e2a2b] drop-shadow-md"
                            >
                              <path d="M22 2L11 13M22 2l-7 20-4-9-9-4z" />
                            </motion.svg>
                            <p className="absolute bottom-[-60px] font-jetbrains text-xs text-[#9e2a2b] font-bold animate-pulse uppercase tracking-widest">TRANSMITTING DIRECTIVE... ✈️</p>
                          </motion.div>
                        )}

                        {/* CONFIRMED */}
                        {postcardState === "sent" && (
                          <motion.div
                            key="postcard-sent"
                            initial={{ scale: 0.8, opacity: 0, rotate: 2 }}
                            animate={{ scale: 1, opacity: 1, rotate: -2 }}
                            className="bg-stone-100 border-2 border-stone-200 p-5 rounded shadow-lg max-w-[380px] text-center font-jetbrains text-slate-800 relative"
                          >
                            <div className="absolute -top-3 left-[40%] -translate-x-1/2 w-16 h-5 bg-stone-300 shadow-sm rounded-sm border border-stone-400" />
                            <span className="text-3xl block mb-2">📬</span>
                            <h4 className="text-base font-bold text-emerald-800 mb-1 uppercase">TRANSMISSION COMPLETED!</h4>
                            <p className="text-xs leading-relaxed mb-4">
                              Your directive signals have successfully bypassed network gateways. Subject will process instructions shortly.
                            </p>
                            <button
                              onClick={handleResetPostcard}
                              className="text-[9px] bg-slate-850 text-white px-2.5 py-1 rounded hover:bg-slate-705 cursor-pointer select-none uppercase font-jetbrains"
                            >
                              New Dispatch
                            </button>
                          </motion.div>
                        )}

                      </AnimatePresence>
                    </div>
                  )}

                  {/* SPREAD 5: FAILURES DRAWING / DIAGRAM DETAILS */}
                  {currentPage === 5 && (
                    <div className="space-y-4 font-jetbrains text-slate-800 relative p-2">
                      <div className="border-b pb-1 select-none flex justify-between items-center">
                        <h3 className="text-2xl font-space font-black uppercase text-red-700">evolution principles</h3>
                        <span className="text-[8px] bg-red-800/10 text-red-700 border border-red-700/20 px-2 py-0.5 rounded font-black uppercase">CONFIDENTIAL</span>
                      </div>

                      <div className="space-y-4 text-xs leading-relaxed font-jetbrains">
                        <p className="italic text-slate-600">
                          "Errors are the mutations that drive engineering evolution. Without anomaly records, architectural systems become static."
                        </p>

                        <div className="border border-red-700/20 rounded p-4 bg-red-950/5 relative overflow-hidden flex flex-col justify-center items-center shadow-inner min-h-[160px]">
                          {/* Glitchy blueprint style SVG sketch overlay */}
                          <svg className="w-full h-full absolute inset-0 opacity-10 pointer-events-none" viewBox="0 0 100 100">
                            <line x1="10" y1="10" x2="90" y2="90" stroke="#b22222" strokeWidth="1" />
                            <line x1="90" y1="10" x2="10" y2="90" stroke="#b22222" strokeWidth="1" />
                            <circle cx="50" cy="50" r="30" stroke="#b22222" strokeWidth="1" strokeDasharray="2 2" fill="none" />
                          </svg>
                          
                          <p className="text-center font-bold text-red-700 text-sm uppercase select-none tracking-widest mb-1">SUBJECT ADAPTABILITY INDEX</p>
                          <p className="text-[36px] font-black text-red-800 tracking-widest select-none font-space leading-none uppercase">MAXIMUM</p>
                          <p className="text-[9px] text-slate-500 uppercase tracking-widest mt-2 select-none border-t border-red-900/10 pt-1.5 w-3/4 text-center">ANOMALY REPORT SYSTEM: VERIFIED</p>
                        </div>
                      </div>
                    </div>
                  )}

                </div>

                {/* Page turn indicator footer */}
                <div className="border-t border-[#9e2a2b]/10 pt-4 flex justify-between items-center text-slate-500 font-jetbrains text-[9px] uppercase select-none tracking-widest mt-6">
                  <span>Spread {currentPage + 1} / {failuresUnlocked ? 6 : 5}</span>
                  <button 
                    onClick={() => setIsBookOpen(false)}
                    className="hover:underline text-red-700 font-bold uppercase cursor-pointer"
                  >
                    [ Close Archive ]
                  </button>
                </div>
              </div>

              {/* ================= BINDER TABS ================= */}
              <div className="absolute right-[-10px] md:right-[-42px] top-[10%] bottom-[10%] w-10 flex flex-col justify-between py-8 z-0 pointer-events-auto">
                {tabs.map((tab) => {
                  const isActive = currentPage === tab.index;
                  return (
                    <button
                      key={tab.index}
                      onClick={() => setCurrentPage(tab.index)}
                      className={`font-jetbrains text-[8.5px] uppercase tracking-wider py-3.5 px-0.5 border border-l-0 border-slate-700/30 rounded-r transition-all duration-300 relative cursor-pointer select-none flex items-center justify-center -rotate-90 md:rotate-0 ${tab.color} ${
                        isActive 
                          ? "translate-x-[2px] z-30 font-black opacity-100 shadow-md scale-110" 
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
