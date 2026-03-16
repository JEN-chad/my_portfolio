import { motion, useMotionValue, useMotionTemplate } from "framer-motion";
import { MouseEvent, useState } from "react";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

const BuildLogsSection = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [hoveredCommit, setHoveredCommit] = useState<string | null>(null);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <section 
      id="work" 
      className="bg-circuit-pattern relative py-20 pb-40 group"
      onMouseMove={handleMouseMove}
    >
      {/* Interactive subtle grid brighten effect */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              400px circle at ${mouseX}px ${mouseY}px,
              rgba(255,255,255,0.04),
              transparent 80%
            )
          `,
        }}
      />
      {/* Decorative side elements - hidden on mobile */}
      <div className="absolute left-4 top-1/4 opacity-50 flex-col gap-12 pointer-events-none hidden lg:flex">
        <div className="text-foreground border-2 border-foreground rounded px-2 py-1 font-mono text-sm">
          <span className="mr-1">o o o</span><br />
          &gt;_
        </div>
      </div>
      <div className="absolute right-8 top-1/3 opacity-50 flex-col gap-16 pointer-events-none hidden lg:flex">
        <div className="text-foreground text-3xl font-mono border border-foreground p-2 rounded-md">
          &lt;/&gt;
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10 max-w-6xl">
        {/* Header */}
        <motion.header {...fadeIn} className="text-center mb-16 relative">
          <h1 className="text-5xl sm:text-6xl md:text-8xl font-serif font-bold text-cream-light mb-2 tracking-wide drop-shadow-lg">
            Build Logs
          </h1>
          <p className="text-xl sm:text-2xl md:text-3xl font-hand-kalam text-cream-light/90 tracking-wider">
            things ive built while exploring code
          </p>
        </motion.header>

        {/* Cards - stacked on mobile, absolute on desktop */}
        <div className="relative min-h-[1200px] md:min-h-[1100px] lg:h-[1300px] w-full max-w-5xl mx-auto mt-12 flex flex-col gap-10 md:block">
          
          {/* Background Git Timeline - hidden on mobile */}
          <div className="absolute top-[45%] left-0 w-full z-0 hidden md:block opacity-60 pointer-events-none">
            <div className="w-full h-[1px] bg-slate-400/50 relative">
              {[
                { id: 'fullstack', left: '8%' },
                { id: 'recruiter', left: '20%' },
                { id: 'resume', left: '40%' },
                { id: 'web3', left: '55%' },
                { id: '2am', left: '62%' },
                { id: 'cli', left: '68%' },
                { id: 'n8n', left: '85%' },
              ].map(commit => (
                <motion.div
                  key={commit.id}
                  initial={false}
                  animate={{
                    scale: hoveredCommit === commit.id ? 2.5 : 1,
                    backgroundColor: hoveredCommit === commit.id ? '#10b981' : '#94a3b8',
                    boxShadow: hoveredCommit === commit.id ? '0 0 10px rgba(16, 185, 129, 0.4)' : 'none'
                  }}
                  className="absolute top-1/2 -translate-y-1/2 w-[6px] h-[6px] rounded-full"
                  style={{ left: commit.left }}
                />
              ))}
            </div>
          </div>
          
          {/* FEATURED: AI Recruiter */}
          <motion.div
            {...fadeIn}
            transition={{ delay: 0.1 }}
            whileHover={{ y: -8, boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)", rotate: -1.5, zIndex: 50 }}
            className="md:absolute md:left-10 md:top-10 w-full max-w-[450px] mx-auto md:mx-0 md:-rotate-3 z-10 transition-colors duration-300 float-slow-1"
            onMouseEnter={() => setHoveredCommit('recruiter')}
            onMouseLeave={() => setHoveredCommit(null)}
          >
            <div className="bg-paper-bg p-6 rounded-sm shadow-layered border border-gray-300 relative">
              <div className="tape absolute -top-4 -left-4 w-16 h-6 -rotate-45 z-20" />
              <div className="tape absolute -bottom-4 right-10 w-20 h-6 rotate-12 z-20" />
              <h2 className="text-2xl font-mono text-card-foreground font-bold mb-4">AI Recruiter</h2>
              <div className="bg-terminal-bg rounded p-4 font-mono text-sm leading-relaxed mb-4 shadow-inner">
                <p><span className="text-terminal-green">bash-shell:~$</span> <span className="text-cream-light">python ai_recruiter.py</span></p>
                <br />
                <p className="text-muted-foreground">Stack:</p>
                <p className="text-cream-light pl-2 border-l-2 border-muted-foreground/30 mt-1">Python • TensorFlow • NLP • Flask</p>
                <br />
                <p className="text-muted-foreground">Live:</p>
                <a href="#" className="text-terminal-green hover:underline flex items-center mt-1">
                  View Project <span className="ml-1">&rarr;</span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* FEATURED: Retro Monitor n8n */}
          <motion.div
            {...fadeIn}
            transition={{ delay: 0.2 }}
            whileHover={{ y: -8, boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)", rotate: 1, zIndex: 50 }}
            className="md:absolute md:right-10 md:top-0 w-full max-w-[480px] mx-auto md:mx-0 md:rotate-2 z-20 transition-colors duration-300 float-slow-2"
            onMouseEnter={() => setHoveredCommit('n8n')}
            onMouseLeave={() => setHoveredCommit(null)}
          >
            <div className="bg-monitor-bezel p-6 rounded-xl retro-monitor-shadow relative border-b-8 border-r-8 border-gray-500">
              <div className="bg-terminal-bg rounded-lg p-5 h-[340px] relative overflow-hidden border-4 border-gray-800 shadow-inner">
                <div className="screen-glare absolute inset-0 z-10 pointer-events-none" />
                <div className="font-mono text-sm relative z-20 flex flex-col h-full">
                  <div className="flex-1 space-y-4">
                    <p className="text-terminal-green font-bold text-lg mb-4 border-b border-terminal-green/30 pb-2">
                      Project: n8n Automation Lab
                    </p>
                    <p>
                      <span className="text-terminal-green">const</span> <span className="text-cream-light">n8n = require(</span><span className="text-green-300">"n8n-core"</span><span className="text-cream-light">)</span>
                    </p>
                    <div className="mt-4">
                      <p className="text-muted-foreground">Stack:</p>
                      <p className="text-cream-light mt-1">n8n • Node.js • PostgreSQL • Webhooks</p>
                    </div>
                  </div>
                  <div className="mt-auto">
                    <p className="text-muted-foreground">Live:</p>
                    <a href="#" className="text-terminal-green hover:underline flex items-center mt-1 text-base">
                      Open Project <span className="ml-1">&rarr;</span>
                    </a>
                  </div>
                </div>
              </div>
              <div className="absolute bottom-2 right-6 w-8 h-1 bg-green-500 rounded-full shadow-[0_0_5px_#22c55e]" />
            </div>
          </motion.div>

          {/* Top Right Note: most ideas start at 2am */}
          <motion.div
            initial={{ opacity: 0, y: 20, rotate: 2 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            whileHover={{ y: -8, boxShadow: "0 25px 50px -12px rgba(0,0,0,0.3)", rotate: 1, zIndex: 50 }}
            className="md:absolute md:left-[62%] md:top-[500px] w-full max-w-[200px] mx-auto md:mx-0 z-40 transition-colors duration-300 float-slow-3"
            onMouseEnter={() => setHoveredCommit('2am')}
            onMouseLeave={() => setHoveredCommit(null)}
          >
            <div className="bg-note-yellow p-6 shadow-layered relative rounded-sm">
              <p className="font-hand-kalam text-slate-800 text-xl leading-snug text-center">
                most ideas<br />start at 2am
              </p>
              <div className="absolute bottom-0 right-0 w-8 h-8 bg-gradient-to-tl from-white/40 to-transparent rounded-tl-xl shadow-[-1px_-1px_3px_rgba(0,0,0,0.05)]" />
            </div>
          </motion.div>

          {/* Top Right Note: Web3 dApp */}
          <motion.div
            initial={{ opacity: 0, y: 20, rotate: -1 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.35 }}
            whileHover={{ y: -8, boxShadow: "0 25px 50px -12px rgba(0,0,0,0.3)", rotate: -0.5, zIndex: 50 }}
            className="md:absolute md:left-[55%] md:top-[580px] w-full max-w-[280px] mx-auto md:mx-0 z-30 transition-colors duration-300 float-slow-1"
            onMouseEnter={() => setHoveredCommit('web3')}
            onMouseLeave={() => setHoveredCommit(null)}
          >
            <div className="bg-note-tan p-5 shadow-layered relative rounded-sm">
              <p className="font-mono text-slate-800 text-sm font-medium">
                Web3 dApp, Solidity,<br />
                Ethers.js, Next.js
              </p>
              <div className="absolute bottom-0 right-0 w-8 h-8 bg-gradient-to-tl from-white/40 to-transparent rounded-tl-xl shadow-[-1px_-1px_3px_rgba(0,0,0,0.05)]" />
            </div>
          </motion.div>

          {/* PROJECT: Full Stack Experiments */}
          <motion.div
            initial={{ opacity: 0, y: 20, rotate: -2 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            whileHover={{ y: -8, boxShadow: "0 25px 50px -12px rgba(0,0,0,0.3)", rotate: -1, zIndex: 60 }}
            className="md:absolute md:left-[5%] md:top-[850px] lg:left-[8%] lg:top-[820px] w-full max-w-[340px] mx-auto md:mx-0 z-30 transition-colors duration-300 float-slow-2"
            onMouseEnter={() => setHoveredCommit('fullstack')}
            onMouseLeave={() => setHoveredCommit(null)}
          >
            <div className="bg-cream-light p-6 shadow-layered relative rounded-sm group">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 z-20 bg-white/50 backdrop-blur-sm shadow-[0_1px_3px_rgba(0,0,0,0.1)] rounded-sm" />
              <h3 className="text-2xl font-bold font-hand-kalam text-slate-800 mb-2">
                Full Stack Experiments
              </h3>
              <hr className="border-t border-slate-400/50 mb-3" />
              <div className="font-mono text-sm space-y-3">
                <div>
                  <p className="text-red-500 font-bold mb-1">Stack:</p>
                  <p className="text-slate-800 font-medium">MERN • Tailwind • Docker • <br />GraphQL</p>
                </div>
                <div className="pt-2 pb-1">
                  <a href="#" className="inline-flex items-center text-blue-600 font-bold hover:text-blue-800 transition-colors">
                    Live <span className="ml-1 text-base leading-none">&rarr;</span>
                  </a>
                </div>
              </div>
              <div className="absolute bottom-0 right-0 w-8 h-8 bg-gradient-to-tl from-white/60 to-transparent rounded-tl-xl shadow-[-1px_-1px_3px_rgba(0,0,0,0.05)]" />
            </div>
          </motion.div>

          {/* PROJECT: AI Resume Parser */}
          <motion.div
            initial={{ opacity: 0, y: 20, rotate: 1 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.45 }}
            whileHover={{ y: -8, boxShadow: "0 25px 50px -12px rgba(0,0,0,0.3)", rotate: 0.5, zIndex: 60 }}
            className="md:absolute md:left-[38%] md:top-[900px] lg:left-[40%] lg:top-[880px] w-full max-w-[320px] mx-auto md:mx-0 z-20 transition-colors duration-300 float-slow-3"
            onMouseEnter={() => setHoveredCommit('resume')}
            onMouseLeave={() => setHoveredCommit(null)}
          >
            <div className="bg-note-yellow p-6 shadow-layered relative rounded-sm group">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 z-20 bg-white/50 backdrop-blur-sm shadow-[0_1px_3px_rgba(0,0,0,0.1)] rounded-sm" />
              <h3 className="text-2xl font-bold font-hand-kalam text-slate-800 mb-2">
                AI Resume Parser
              </h3>
              <hr className="border-t border-slate-400/50 mb-3" />
              <div className="font-mono text-sm space-y-3">
                <div>
                  <p className="text-red-500 font-bold mb-1">Stack:</p>
                  <p className="text-slate-800 font-medium">Python • FastAPI • OpenAI</p>
                </div>
                <div className="pt-2 pb-1">
                  <a href="#" className="inline-flex items-center text-blue-600 font-bold hover:text-blue-800 transition-colors">
                    Live <span className="ml-1 text-base leading-none">&rarr;</span>
                  </a>
                </div>
              </div>
              <div className="absolute bottom-0 right-0 w-8 h-8 bg-gradient-to-tl from-white/60 to-transparent rounded-tl-xl shadow-[-1px_-1px_3px_rgba(0,0,0,0.05)]" />
            </div>
          </motion.div>

          {/* PROJECT: Developer CLI Tool */}
          <motion.div
            initial={{ opacity: 0, y: 20, rotate: -2 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            whileHover={{ y: -8, boxShadow: "0 25px 50px -12px rgba(0,0,0,0.3)", rotate: -1, zIndex: 60 }}
            className="md:absolute md:left-[66%] md:top-[800px] lg:left-[68%] lg:top-[780px] w-full max-w-[300px] mx-auto md:mx-0 z-40 transition-colors duration-300 float-slow-1"
            onMouseEnter={() => setHoveredCommit('cli')}
            onMouseLeave={() => setHoveredCommit(null)}
          >
            <div className="bg-note-tan p-6 shadow-layered relative rounded-sm group">
              <div className="absolute -top-3 left-[40%] -translate-x-1/2 w-16 h-6 z-20 bg-white/50 backdrop-blur-sm shadow-[0_1px_3px_rgba(0,0,0,0.1)] rounded-sm" />
              <h3 className="text-2xl font-bold font-hand-kalam text-slate-800 mb-2">
                Developer CLI Tool
              </h3>
              <hr className="border-t border-slate-400/50 mb-3" />
              <div className="font-mono text-sm space-y-3">
                <div>
                  <p className="text-red-500 font-bold mb-1">Stack:</p>
                  <p className="text-slate-800 font-medium">Node.js • TypeScript</p>
                </div>
                <div className="pt-2 pb-1">
                  <a href="#" className="inline-flex items-center text-blue-600 font-bold hover:text-blue-800 transition-colors">
                    Live <span className="ml-1 text-base leading-none">&rarr;</span>
                  </a>
                </div>
              </div>
              <div className="absolute bottom-0 right-0 w-8 h-8 bg-gradient-to-tl from-white/50 to-transparent rounded-tl-xl shadow-[-1px_-1px_3px_rgba(0,0,0,0.05)]" />
            </div>
          </motion.div>

        </div>

        {/* Developer Workflow Sketch */}
        <div className="flex justify-center mt-32 -mb-12 relative w-full px-4 select-none z-10">
          <div className="bg-note-tan text-slate-800 px-8 py-3 shadow-md -rotate-2 relative flex flex-wrap items-center justify-center gap-4 sm:gap-5 md:gap-6 font-hand-kalam text-lg md:text-xl">
            {/* Small Tape */}
            <div className="absolute -top-[10px] left-1/2 -translate-x-1/2 w-[50px] h-[20px] bg-white/40 shadow-sm mix-blend-overlay rotate-[3deg]" />
            
            {/* Idea */}
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-slate-800 mt-0.5 opacity-80" />
              <span>idea</span>
              <svg className="w-6 h-6 ml-1 opacity-60 text-slate-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 13 Q 12 10, 19 13" />
                <path d="M15 9 L 19 13 L 13 16" />
              </svg>
            </div>
            
            {/* Design */}
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-slate-800 mt-0.5 opacity-80" />
              <span>design</span>
              <svg className="w-6 h-6 ml-1 opacity-60 text-slate-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 11 C 9 14, 15 11, 20 12" />
                <path d="M15 8 L 20 12 L 16 16" />
              </svg>
            </div>

            {/* Build */}
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-slate-800 mt-0.5 opacity-80" />
              <span>build</span>
              <svg className="w-6 h-6 ml-1 opacity-60 text-slate-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 12 Q 12 14, 19 11" />
                <path d="M14 7 L 19 11 L 15 15" />
              </svg>
            </div>

            {/* Automate */}
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-slate-800 mt-0.5 opacity-80" />
              <span>automate</span>
              <svg className="w-6 h-6 ml-1 opacity-60 text-slate-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 13 C 10 10, 15 13, 20 11" />
                <path d="M16 6 L 20 11 L 14 14" />
              </svg>
            </div>

            {/* Deploy */}
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-slate-800 mt-0.5 opacity-80" />
              <span>deploy</span>
            </div>
            
            {/* Hand-drawn Down Arrow connecting to bottom text */}
            <svg className="absolute -bottom-24 left-[55%] -translate-x-1/2 w-16 h-28 text-cream-light opacity-90 pointer-events-none -rotate-3 z-0" viewBox="0 0 50 100" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M 25 5 Q 35 50, 20 95" />
              <path d="M 12 85 L 20 95 L 28 85" strokeDasharray="0" />
            </svg>

          </div>
        </div>

        {/* Always shipping footer */}
        <div className="flex items-center justify-center gap-4 mt-32 relative z-10">
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
