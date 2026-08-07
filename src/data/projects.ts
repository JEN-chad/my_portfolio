export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  category: "ai" | "sde" | "tooling";
  type: "monitor" | "sandbox" | "dossier";
  metrics: string[];
  stack: string[];
  codeUrl: string;
  demoUrl: string;
}

export const projects: Project[] = [
  {
    id: "hiremind",
    title: "HireMindAI",
    subtitle: "AI-Powered Recruitment Platform",
    description: "AI-powered recruitment platform using Next.js, Neon PostgreSQL, and Google Cloud Vertex AI (Gemini) with RAG candidate evaluation pipelines.",
    category: "ai",
    type: "dossier",
    metrics: [
      "Built an LLM-powered candidate evaluation pipeline using Vertex AI (Gemini) & RAG",
      "Developed 20+ REST API endpoints for authentication, resume parsing, ATS scoring & interview management",
      "Delivered 15+ core features across Agile sprints, optimizing candidate-job matching performance",
      "Standardized candidate scoring rubrics & automated background validation layers"
    ],
    stack: ["Next.js", "React.js", "Node.js", "Express.js", "Neon PostgreSQL", "Google Cloud Vertex AI", "Gemini", "RAG"],
    codeUrl: "https://github.com/JEN-chad/HireMindAI",
    demoUrl: "https://github.com/JEN-chad/HireMindAI"
  },
  {
    id: "codesentry",
    title: "codesentry",
    subtitle: "AI-Generated Code Security Validation",
    description: "Open-source Python CLI tool validating AI-generated code against 18 security patterns across 7+ languages in under 1 second.",
    category: "tooling",
    type: "monitor",
    metrics: [
      "Cut per-commit security-review time to under 1 second across 18 security patterns in 7+ languages",
      "Designed a global git pre-commit hook system with per-repo strict overrides and auto-generated LLM fix prompts",
      "Shipped companion VS Code extension (VibeGuard) upgrading scanning to full Python AST-based analysis",
      "Published on PyPI as an open-source security tool for AI-assisted development"
    ],
    stack: ["Python", "CLI", "Static Analysis", "PyPI", "VS Code Extension", "Git Hooks", "AST Parsing"],
    codeUrl: "https://github.com/JEN-chad/codesentry",
    demoUrl: "https://github.com/JEN-chad/codesentry"
  },
  {
    id: "supportdesk",
    title: "SupportDesk",
    subtitle: "Multi-Tenant Support Ticketing Platform",
    description: "Multi-tenant SaaS ticketing platform built on the MERN stack featuring query-level tenant data isolation and custom RBAC middleware.",
    category: "sde",
    type: "dossier",
    metrics: [
      "Engineered multi-tenant SaaS platform with query-level data isolation preventing cross-tenant leaks",
      "Built custom Express.js JWT authentication & RBAC middleware enforcing tenant verification across all API routes",
      "Designed MongoDB/Mongoose schemas & state-machine engine enforcing ticket lifecycle transitions",
      "Optimized client UI updates using TanStack Query caching"
    ],
    stack: ["React.js", "Node.js", "Express.js", "MongoDB", "Mongoose", "JWT", "RBAC", "TanStack Query"],
    codeUrl: "https://github.com/JEN-chad/SupportDesk",
    demoUrl: "https://github.com/JEN-chad/SupportDesk"
  },
  {
    id: "vault",
    title: "Crack The Vault",
    subtitle: "LLM Microservices Security Game",
    description: "Microservices system (FastAPI API Gateway, Policy Engine, Node.js/Drizzle) with prompt-injection defense layers backed by Neon serverless Postgres.",
    category: "ai",
    type: "sandbox",
    metrics: [
      "Architected 3-service microservices system (FastAPI Gateway, Policy Engine, Node.js DB Service) with Docker Compose",
      "Engineered prompt-injection defense layer validating LLM inputs via regex & rule-violation detection",
      "Playtested live across 60+ concurrent users on a self-hosted 3-machine cluster validating real concurrent load",
      "Backed by serverless Neon PostgreSQL & isolated prompt gateway proxies"
    ],
    stack: ["FastAPI", "Python", "Node.js", "Drizzle ORM", "Neon PostgreSQL", "Docker Compose"],
    codeUrl: "https://github.com/JEN-chad/Crack-The-Vault",
    demoUrl: "https://github.com/JEN-chad/Crack-The-Vault"
  },
  {
    id: "devflow",
    title: "DevFlow",
    subtitle: "GitHub Integrated Sprint Workspace",
    description: "SaaS project management platform merging Agile sprint boards with real-time GitHub webhook sync loops.",
    category: "sde",
    type: "dossier",
    metrics: [
      "Bi-directionally syncs commits, PRs, and issues directly to board tickets",
      "Multi-client room synchronization using Socket.io web sockets",
      "Calculates real-time sprint burndown velocity and lead times",
      "Fluid drag-and-drop kanban interface built for high-throughput teams"
    ],
    stack: ["MongoDB", "Express.js", "React.js", "Node.js", "Socket.io", "Tailwind CSS"],
    codeUrl: "https://github.com/JEN-chad/DevFlow",
    demoUrl: "https://github.com/JEN-chad/DevFlow"
  },
  {
    id: "oncoenv",
    title: "OncoEnv",
    subtitle: "Bioinformatics RL Agent Environment",
    description: "Procedural biological world state generator designed to train and benchmark autonomous LLM science agents.",
    category: "ai",
    type: "dossier",
    metrics: [
      "Simulates scRNA-seq count matrices & cell-gene regulatory networks",
      "Features 40+ simulated scientific tools (QC, clustering, marker discovery)",
      "Implements dense stepwise biological reward functions for RL loops",
      "Enables ultra-fast training loops built on NumPy & SciPy"
    ],
    stack: ["Python", "FastAPI", "Uvicorn", "Pydantic", "NumPy", "SciPy", "OpenEnv"],
    codeUrl: "https://github.com/JEN-chad/OncoEnv",
    demoUrl: "https://github.com/JEN-chad/OncoEnv"
  },
  {
    id: "collabboard",
    title: "CollabBoard",
    subtitle: "Real-Time Kanban Workspace",
    description: "Real-time task collaboration board engineered with optimistic client updates and version conflict resolution.",
    category: "sde",
    type: "dossier",
    metrics: [
      "Sub-millisecond collaborative board updates via WebSocket architecture",
      "Handles concurrent write collisions with server-side version checking",
      "Optimistic UI state updates on clients for zero perceived latency",
      "Auditable event log tracking user board modifications"
    ],
    stack: ["React.js", "Vite", "Tailwind CSS", "Socket.io", "Express.js", "MongoDB"],
    codeUrl: "https://github.com/JEN-chad/CollabBoard",
    demoUrl: "https://github.com/JEN-chad/CollabBoard"
  }
];
