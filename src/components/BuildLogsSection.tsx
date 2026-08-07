import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import InteractiveTerminal from "./InteractiveTerminal";
import VaultSandbox from "./VaultSandbox";

import { projects } from "@/data/projects";


  const handleSelectProject = (id: string) => {
    setSelectedId(id);
    if (!viewedIds.includes(id)) {
      setViewedIds((prev) => [...prev, id]);
    }
  };

  const selectedProject = projects.find((p) => p.id === selectedId) || projects[0];

  return (
    <section id="work" className="bg-[#1e1a17] py-28 relative overflow-hidden">
      
      {/* Background doodles */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-15 overflow-hidden hidden md:block">
        <div className="absolute top-[10%] left-[8%] rotate-[12deg] text-cream-light font-mono text-2xl">&lt;/&gt;</div>
        <div className="absolute bottom-[15%] right-[5%] -rotate-[15deg] text-cream-light font-mono text-2xl">git commit -m "build"</div>
      </div>

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        
        {/* Header */}
        <motion.header {...fadeIn} className="text-center mb-20">
          <h1 className="text-5xl sm:text-6xl md:text-8xl font-serif font-bold text-cream-light mb-4 tracking-wide drop-shadow-lg">
            Build Logs
          </h1>
          <p className="text-xl sm:text-2xl md:text-3xl font-hand-kalam text-[#d35442] tracking-wider">
            7 actual projects, documented & live
          </p>
        </motion.header>

        {/* ================= DOUBLE PAGE BINDER CONTAINER ================= */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 relative">
          
          {/* ================= LEFT PAGE: Spiral Project Index ================= */}
          <div className="md:col-span-5 lg:col-span-4 relative">
            <motion.div
              {...fadeIn}
              className="bg-[#fcf9d6] border-l-[12px] border-notebook-border/80 rounded-r-2xl shadow-layered p-6 sm:p-8 relative paper-texture transition-transform duration-300 md:-rotate-1 h-full min-h-[500px]"
            >
              {/* Spiral Rings Overlay */}
              <div className="absolute left-[-16px] top-0 bottom-0 w-8 flex flex-col justify-around py-6 z-20 pointer-events-none select-none">
                {Array.from({ length: 14 }).map((_, i) => (
                  <div key={i} className="w-5 h-2.5 rounded-full bg-slate-700 border-b-2 border-slate-900 shadow-md" />
                ))}
              </div>

              {/* Red Legal Pad Margin Line */}
              <div className="absolute left-8 top-0 bottom-0 w-[1.5px] bg-[#d35442]/30" />

              {/* Title */}
              <h2 className="text-4xl font-marker text-[#d35442] mb-8 border-b-2 border-dashed border-[#d35442]/20 pb-3 pl-6 select-none">
                project index
              </h2>

              {/* Index List */}
              <ul className="space-y-3 font-hand-kalam text-xl pl-6">
                {projects.map((project, idx) => {
                  const isSelected = selectedId === project.id;
                  const isViewed = viewedIds.includes(project.id);
                  return (
                    <li
                      key={project.id}
                      className="relative p-2.5 rounded transition-all duration-200 cursor-pointer select-none z-10 flex items-center gap-3"
                      onMouseEnter={() => setHoveredId(project.id)}
                      onMouseLeave={() => setHoveredId(null)}
                      onClick={() => handleSelectProject(project.id)}
                    >
                      {/* Highlighter overlay on hover */}
                      <AnimatePresence>
                        {hoveredId === project.id && (
                          <motion.div
                            layoutId="highlighter"
                            className="absolute inset-0 bg-yellow-300/40 rounded-sm -z-10 transform -rotate-1 skew-x-3 pointer-events-none"
                            transition={{ type: "spring", stiffness: 250, damping: 20 }}
                          />
                        )}
                      </AnimatePresence>

                      {/* Custom checklist circles */}
                      <div className="w-6 h-6 rounded-full border-2 border-[#d35442] flex items-center justify-center bg-white/60 shrink-0 relative">
                        <AnimatePresence>
                          {isViewed && (
                            <motion.span
                              initial={{ scale: 0, rotate: -20 }}
                              animate={{ scale: 1.1, rotate: 0 }}
                              exit={{ scale: 0 }}
                              className="text-[#d35442] font-bold text-sm leading-none"
                            >
                              ✓
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* Project Link text */}
                      <span
                        className={`transition-colors duration-150 leading-none ${
                          isSelected ? "text-slate-900 font-bold border-b border-slate-900/60 pb-0.5" : "text-slate-700/80 hover:text-slate-900"
                        }`}
                      >
                        {idx + 1}. {project.title}
                      </span>
                    </li>
                  );
                })}
              </ul>

              {/* Lined Paper Lines overlay */}
              <div className="absolute inset-0 lined-paper-bg opacity-[0.04] pointer-events-none rounded-r-2xl" />
            </motion.div>
          </div>

          {/* ================= RIGHT PAGE: Active Desktop Workspace ================= */}
          <div className="md:col-span-7 lg:col-span-8 relative min-h-[580px]">
            
            {/* Desktop dossier view */}
            {!isMobile ? (
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedProject.id}
                  initial={{ opacity: 0, scale: 0.96, rotate: 2 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1, 
                    rotate: selectedProject.type === "monitor" ? 0 : 1,
                    transition: { type: "spring", stiffness: 200, damping: 18 } 
                  }}
                  exit={{ opacity: 0, scale: 0.96, rotate: -2, transition: { duration: 0.2 } }}
                  className="w-full relative z-10"
                >
                  
                  {/* MONITOR TYPE: codesentry CLI scan */}
                  {selectedProject.type === "monitor" && (
                    <div className="bg-monitor-bezel p-6 sm:p-8 rounded-2xl shadow-layered border-b-[10px] border-r-[10px] border-slate-600 relative overflow-hidden transition-all duration-300 w-full max-w-[620px] mx-auto">
                      <div className="bg-terminal-bg rounded-lg p-5 h-[390px] relative overflow-hidden border-4 border-slate-800 shadow-inner">
                        <div className="screen-glare absolute inset-0 z-10 pointer-events-none" />
                        <div className="relative z-20 flex flex-col h-full">
                          <InteractiveTerminal />
                        </div>
                      </div>
                      <div className="absolute bottom-[84px] right-8 w-10 h-1.5 bg-green-500 rounded-full shadow-[0_0_8px_#22c55e]" />
                      <div className="absolute top-1 right-8 font-mono text-[9px] text-slate-500 uppercase select-none">CRT MONITOR v1.0</div>
                      
                      {/* Tech Stack below the screen */}
                      <div className="mt-4 pt-3 border-t border-slate-500/30">
                        <p className="font-mono text-xs text-slate-200 font-bold mb-2 select-none">🛠 Tech Stack:</p>
                        <div className="flex flex-wrap gap-2">
                          {selectedProject.stack.map((tag) => (
                            <span key={tag} className="text-xs text-[#4ade80] bg-slate-800 px-2.5 py-1 rounded shadow-sm font-mono border border-slate-700 hover:scale-102 transition-transform">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* SANDBOX TYPE: Crack The Vault Prompt injection game */}
                  {selectedProject.type === "sandbox" && (
                    <div className="bg-[#f0e6d2] border-[10px] border-[#d35442]/80 rounded-2xl shadow-layered p-6 relative paper-texture w-full max-w-[620px] mx-auto">
                      <div className="tape absolute -top-4 -left-4 w-16 h-6 -rotate-45 z-20" />
                      <div className="tape absolute -bottom-4 right-12 w-20 h-6 rotate-12 z-20" />
                      
                      <h3 className="text-3xl font-marker text-[#d35442] mb-1">{selectedProject.title}</h3>
                      <p className="font-hand-kalam text-lg text-slate-600 mb-4">{selectedProject.subtitle}</p>

                      <div className="mb-4">
                        <VaultSandbox />
                      </div>

                      {/* Stack details */}
                      <div className="mt-5">
                        <p className="font-hand-kalam text-base text-slate-800 font-bold mb-2 select-none">🛠 Tech Stack:</p>
                        <div className="flex flex-wrap gap-2">
                          {selectedProject.stack.map((tag) => (
                            <span key={tag} className="text-xs text-slate-800 bg-[#e7d7c1] px-2.5 py-1.5 rounded shadow-sm font-hand-kalam border border-black/10 hover:scale-102 transition-transform">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* DOSSIER TYPE: Standard beautiful binder folder */}
                  {selectedProject.type === "dossier" && (
                    <div className="bg-[#fcfbe3] border-l-[16px] border-l-[#d35442] rounded-r-2xl shadow-layered p-8 relative paper-texture w-full max-w-[620px] mx-auto min-h-[500px]">
                      {/* Tape detailing */}
                      <div className="tape absolute -top-4 -left-4 w-16 h-6 -rotate-45 z-20" />
                      <div className="tape absolute -bottom-4 right-12 w-20 h-6 rotate-12 z-20" />
                      
                      {/* Document Clip */}
                      <div className="absolute -top-4 left-1/3 text-3xl z-30 select-none" style={{ filter: 'drop-shadow(1px 2px 2px rgba(0,0,0,0.15))' }}>📎</div>

                      {/* Header */}
                      <h3 className="text-4xl font-marker text-[#d35442] mb-1 select-none">{selectedProject.title}</h3>
                      <p className="font-hand-kalam text-xl text-slate-800 font-bold mb-4 border-b border-[#d35442]/20 pb-2">{selectedProject.subtitle}</p>
                      
                      <p className="font-hand-kalam text-lg text-slate-700/90 leading-relaxed mb-6 select-none">
                        {selectedProject.description}
                      </p>

                      {/* Business Impact Section */}
                      <div className="bg-white/50 border border-slate-300/40 rounded p-4 mb-6 shadow-inner">
                        <h4 className="font-hand-kalam text-base text-[#d35442] font-bold mb-2 flex items-center gap-1.5 select-none">
                          ⚡ Recruiter Quick-Scan (Impact):
                        </h4>
                        <ul className="font-hand-kalam text-base space-y-2 text-slate-800 select-none list-disc list-inside">
                          {selectedProject.metrics.map((metric, i) => (
                            <li key={i}>{metric}</li>
                          ))}
                        </ul>
                      </div>

                      {/* Stack details */}
                      <div className="mb-6">
                        <p className="font-hand-kalam text-base text-slate-800 font-bold mb-2 select-none">🛠 Tech Stack:</p>
                        <div className="flex flex-wrap gap-2">
                          {selectedProject.stack.map((tag) => (
                            <span key={tag} className="text-xs text-slate-800 bg-[#e2cfb6] px-2.5 py-1.5 rounded shadow-sm font-hand-kalam border border-black/10 hover:scale-102 transition-transform">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Links */}
                      <div className="flex gap-4 pt-2">
                        <a href={selectedProject.codeUrl} className="font-hand-kalam text-base border-2 border-dashed border-slate-800 hover:border-solid px-4 py-1.5 rounded hover:bg-slate-800 hover:text-white transition-all select-none">
                          GitHub Code 💻
                        </a>
                        <a href={selectedProject.demoUrl} className="font-hand-kalam text-base border-2 border-dashed border-[#d35442] hover:border-solid px-4 py-1.5 rounded hover:bg-[#d35442] hover:text-white transition-all select-none text-[#d35442]">
                          Live Demo 🔗
                        </a>
                      </div>
                    </div>
                  )}

                </motion.div>
              </AnimatePresence>
            ) : (
              /* Mobile view: accordion stack */
              <div className="space-y-4">
                {projects.map((project) => {
                  const isOpen = selectedId === project.id;
                  return (
                    <div
                      key={project.id}
                      className="bg-[#fcfbe3] rounded-lg shadow border border-slate-300 overflow-hidden"
                    >
                      {/* Mobile Accordion Header */}
                      <button
                        onClick={() => handleSelectProject(project.id)}
                        className={`w-full text-left p-4 font-hand-kalam text-lg font-bold flex justify-between items-center transition-colors cursor-pointer select-none ${
                          isOpen ? "bg-[#e7d7c1] text-[#9c3e2f]" : "bg-white text-slate-700 hover:bg-[#e7d7c1]/20"
                        }`}
                      >
                        <span>{project.title}</span>
                        <span>{isOpen ? "▲" : "▼"}</span>
                      </button>

                      {/* Mobile Accordion Content */}
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <div className="p-5 border-t border-slate-200 space-y-4 text-slate-800 font-hand-kalam">
                              <p className="text-slate-800 font-bold border-b pb-1.5 text-base">{project.subtitle}</p>
                              <p className="text-sm leading-relaxed text-slate-600">{project.description}</p>
                              
                              {/* RENDER INLINE ON MOBILE FOR INTERACTIVE TYPES */}
                              {project.type === "monitor" && (
                                <div className="bg-terminal-bg rounded-lg p-4 h-[350px] relative overflow-hidden border-2 border-slate-800 mt-2 select-text">
                                  <InteractiveTerminal />
                                </div>
                              )}

                              {project.type === "sandbox" && (
                                <div className="mt-2 select-text">
                                  <VaultSandbox />
                                </div>
                              )}

                              {project.type === "dossier" && (
                                <div className="bg-white/50 border rounded p-3 text-sm">
                                  <p className="font-bold text-xs text-[#d35442] mb-1.5 uppercase tracking-wide">Key Metrics & Impact:</p>
                                  <ul className="list-disc list-inside space-y-1.5 text-xs text-slate-700">
                                    {project.metrics.map((metric, i) => (
                                      <li key={i}>{metric}</li>
                                    ))}
                                  </ul>
                                </div>
                              )}

                              {/* Stack tags */}
                              <div>
                                <p className="text-xs font-bold text-slate-700 mb-1 select-none">Tech Stack:</p>
                                <div className="flex flex-wrap gap-1.5">
                                  {project.stack.map((tag) => (
                                    <span key={tag} className="text-xs text-slate-800 bg-[#e2cfb6] px-2 py-0.5 rounded shadow-sm border border-black/5">
                                      {tag}
                                    </span>
                                  ))}
                                </div>
                              </div>

                              {/* Mobile Links */}
                              <div className="flex gap-3 pt-2">
                                <a href={project.codeUrl} className="text-xs border border-slate-800 px-3 py-1.5 rounded hover:bg-slate-800 hover:text-white transition-all text-center flex-1">
                                  GitHub Code 💻
                                </a>
                                <a href={project.demoUrl} className="text-xs border border-[#d35442] px-3 py-1.5 rounded hover:bg-[#d35442] hover:text-white transition-all text-center text-[#d35442] flex-1">
                                  Live Demo 🔗
                                </a>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            )}

          </div>

        </div>

        {/* ALWAYS SHIPPING FOOTER */}
        <div className="flex items-center justify-center gap-4 mt-32 relative z-10 select-none">
          <p className="font-hand-kalam text-3xl text-cream-light relative">
            Always shipping.
          </p>
          <svg className="w-8 h-8 text-cream-light fill-current -rotate-12" viewBox="0 0 24 24">
            <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
          </svg>
        </div>

      </div>
    </section>
  );
};

export default BuildLogsSection;
