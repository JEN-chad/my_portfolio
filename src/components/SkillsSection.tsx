import { useRef, useState, useEffect } from "react";
import { motion, Variants, useAnimation, AnimatePresence } from "framer-motion";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

// Reusable micro-interaction hover variants for paper cards
const getPaperHover = (initialRotation: number): Variants => ({
  hover: {
    y: -8,
    rotate: initialRotation > 0 ? initialRotation - 1 : initialRotation < 0 ? initialRotation + 1 : 0,
    boxShadow: "0 25px 50px -12px rgba(0,0,0,0.35)",
    transition: { type: "spring", stiffness: 300, damping: 20 }
  }
});

const tapeHover: Variants = {
  hover: { rotate: -2, y: -2 }
};

const SkillsSection = () => {
  const constraintsRef = useRef<HTMLDivElement>(null);
  
  // Animation controllers for reset physics
  const langControls = useAnimation();
  const frontendControls = useAnimation();
  const toolsControls = useAnimation();
  const backendControls = useAnimation();
  const toolsLikeControls = useAnimation();
  const exploreControls = useAnimation();
  const exp1Controls = useAnimation();
  const exp2Controls = useAnimation();
  const exp3Controls = useAnimation();

  const [isTidied, setIsTidied] = useState(true);

  // Initialize rotations on mount
  useEffect(() => {
    langControls.set({ rotate: -2 });
    frontendControls.set({ rotate: 2 });
    toolsControls.set({ rotate: -1 });
    backendControls.set({ rotate: 2 });
    toolsLikeControls.set({ rotate: -3 });
    exploreControls.set({ rotate: 2 });
    exp1Controls.set({ rotate: -1 });
    exp2Controls.set({ rotate: 1 });
    exp3Controls.set({ rotate: -2 });
  }, [langControls, frontendControls, toolsControls, backendControls, toolsLikeControls, exploreControls, exp1Controls, exp2Controls, exp3Controls]);

  const handleDragStart = () => {
    setIsTidied(false);
  };

  const tidyDesk = () => {
    setIsTidied(true);
    const springTransition = { type: "spring", stiffness: 200, damping: 18 };
    langControls.start({ x: 0, y: 0, rotate: -2, transition: springTransition });
    frontendControls.start({ x: 0, y: 0, rotate: 2, transition: springTransition });
    toolsControls.start({ x: 0, y: 0, rotate: -1, transition: springTransition });
    backendControls.start({ x: 0, y: 0, rotate: 2, transition: springTransition });
    toolsLikeControls.start({ x: 0, y: 0, rotate: -3, transition: springTransition });
    exploreControls.start({ x: 0, y: 0, rotate: 2, transition: springTransition });
    exp1Controls.start({ x: 0, y: 0, rotate: -1, transition: springTransition });
    exp2Controls.start({ x: 0, y: 0, rotate: 1, transition: springTransition });
    exp3Controls.start({ x: 0, y: 0, rotate: -2, transition: springTransition });
  };

  return (
    <section 
      ref={constraintsRef} 
      className="max-w-6xl mx-auto px-4 sm:px-8 py-24 font-architects overflow-hidden relative"
    >
      
      {/* Section Heading with Tidy Button */}
      <motion.div {...fadeIn} className="relative z-30 w-full mb-16 flex flex-col items-center justify-center gap-4">
        <h2 className="text-5xl md:text-6xl text-center text-foreground font-architects">things i use</h2>
        
        <AnimatePresence>
          {!isTidied && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -10 }}
              onClick={tidyDesk}
              className="font-hand-kalam text-lg text-notebook-border border-2 border-dashed border-notebook-border/60 bg-[#e7d7c1] px-5 py-2 rounded-full hover:bg-notebook-border hover:text-cream-light hover:border-solid transition-all shadow-md select-none cursor-pointer z-40"
            >
              tidy desk 🧹
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>

      {/* ===== ROW 1: The Three Top Sticky Notes ===== */}
      <div className="flex flex-col md:flex-row justify-center items-center md:items-start gap-12 md:gap-8 lg:gap-16 relative z-10 w-full mb-32">
        
        {/* Background Doodles for Row 1 */}
        <div className="absolute inset-0 pointer-events-none z-0 hidden md:block">
           {/* Curly Brace between Languages and Frontend */}
           <div className="absolute left-[29%] top-[30%] text-6xl opacity-40 text-muted-foreground font-sans">{"}"}</div>
           
           {/* Dotted Arch between Frontend and Tools */}
           <svg className="absolute left-[62%] top-[40%] text-muted-foreground/50 w-24 h-24" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.5" strokeDasharray="6 6">
              <path d="M 0 50 Q 50 20, 100 80" />
           </svg>
        </div>

        {/* Note 1: Languages */}
        <div className="float-slow-1">
          <motion.div 
            {...fadeIn} transition={{ delay: 0.1 }}
            drag
            dragConstraints={constraintsRef}
            dragElastic={0.15}
            onDragStart={handleDragStart}
            animate={langControls}
            whileDrag={{ scale: 1.08, rotate: 0, zIndex: 100, boxShadow: "0 30px 60px rgba(0,0,0,0.4)" }}
            whileHover="hover"
            variants={getPaperHover(-2)}
            className="sticky-note bg-[#fbf5be] text-card-foreground w-64 shadow-md cursor-grab active:cursor-grabbing origin-bottom relative z-10"
          >
            <motion.div variants={tapeHover} className="tape absolute -top-[10px] left-1/2 -translate-x-1/2 w-[80px] h-[30px]" />
            <h3 className="text-3xl font-bold mb-4 border-b border-black/10 pb-2 select-none">languages</h3>
            <ul className="font-notes text-2xl space-y-3 select-none">
              <li>Javascript</li>
              <li>Python</li>
              <li>Java</li>
              <li>SQL</li>
              <li>Typescript</li>
            </ul>
          </motion.div>
        </div>

        {/* Note 2: Frontend */}
        <div className="float-slow-2">
          <motion.div 
            {...fadeIn} transition={{ delay: 0.2 }}
            drag
            dragConstraints={constraintsRef}
            dragElastic={0.15}
            onDragStart={handleDragStart}
            animate={frontendControls}
            whileDrag={{ scale: 1.08, rotate: 0, zIndex: 100, boxShadow: "0 30px 60px rgba(0,0,0,0.4)" }}
            whileHover="hover"
            variants={getPaperHover(2)}
            className="sticky-note bg-[#88c5f7] text-card-foreground w-64 shadow-md cursor-grab active:cursor-grabbing origin-bottom relative z-10"
          >
            <motion.div variants={tapeHover} className="tape absolute -top-[10px] left-1/2 -translate-x-1/2 w-[80px] h-[30px] opacity-80" />
            <div className="absolute inset-0 opacity-10 pointer-events-none bg-radial-dots" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 0)', backgroundSize: '10px 10px' }} />
            <h3 className="text-3xl font-bold mb-4 relative border-b border-black/10 pb-2 select-none">frontend</h3>
            <ul className="font-notes text-2xl space-y-3 relative select-none">
              <li>React</li>
              <li>Nextjs</li>
              <li>Tailwind</li>
              <li>Expo</li>
            </ul>
          </motion.div>
        </div>

        {/* Note 3: Tools */}
        <div className="float-slow-3">
          <motion.div 
            {...fadeIn} transition={{ delay: 0.3 }}
            drag
            dragConstraints={constraintsRef}
            dragElastic={0.15}
            onDragStart={handleDragStart}
            animate={toolsControls}
            whileDrag={{ scale: 1.08, rotate: 0, zIndex: 100, boxShadow: "0 30px 60px rgba(0,0,0,0.4)" }}
            whileHover="hover"
            variants={getPaperHover(-1)}
            className="sticky-note bg-[#fbc67b] text-card-foreground w-64 shadow-md cursor-grab active:cursor-grabbing origin-bottom relative z-10"
          >
            <motion.div variants={tapeHover} className="tape absolute -top-[10px] left-1/2 -translate-x-1/2 w-[80px] h-[30px] opacity-70" />
            <h3 className="text-3xl font-bold mb-4 border-b border-black/10 pb-2 select-none">tools</h3>
            <ul className="font-notes text-2xl space-y-3 select-none">
              <li>git & github</li>
              <li>docker</li>
              <li>gcp & oci</li>
              <li>postman</li>
            </ul>
          </motion.div>
        </div>
      </div>

      {/* ===== ROW 2: The Overlapping Desk Pile ===== */}
      <div className="flex flex-col md:flex-row justify-center items-center relative w-full max-w-5xl mx-auto gap-12 md:gap-20 lg:gap-32 mt-20">
        
        {/* Left Side: Tools I Like + Attached "Currently Exploring" Sticky */}
        <div className="relative z-20">
          
          {/* Card 1: Tools I Like (Graph) */}
          <div className="float-slow-2">
            <motion.div 
              {...fadeIn} transition={{ delay: 0.4 }}
              drag
              dragConstraints={constraintsRef}
              dragElastic={0.15}
              onDragStart={handleDragStart}
              animate={toolsLikeControls}
              whileDrag={{ scale: 1.08, rotate: 0, zIndex: 100, boxShadow: "0 30px 60px rgba(0,0,0,0.4)" }}
              whileHover="hover"
              variants={getPaperHover(-3)}
              className="bg-white text-card-foreground p-8 rounded-sm shadow-xl w-80 md:w-96 text-center font-architects cursor-grab active:cursor-grabbing relative"
            >
              <h3 className="text-3xl font-bold select-none">tools i like</h3>
              
              {/* Eye-shaped Graph Diagram */}
              <div className="relative w-full h-40 mt-6 flex justify-center items-center overflow-visible">
                <svg className="w-full h-full overflow-visible pointer-events-none" viewBox="0 0 200 100">
                  {/* Main straight line */}
                  <line stroke="#333" strokeWidth="2.5" x1="10" x2="180" y1="50" y2="50" />
                  {/* Arrowhead */}
                  <path d="M 175 45 L 185 50 L 175 55 Z" fill="#333" />
                  
                  {/* Top curve */}
                  <path d="M 40 50 Q 100 -10, 160 50" fill="none" stroke="#333" strokeWidth="2.5" />
                  {/* Bottom curve */}
                  <path d="M 40 50 Q 100 110, 160 50" fill="none" stroke="#333" strokeWidth="2.5" />

                  {/* Dots */}
                  <circle cx="20" cy="50" r="4.5" fill="#4ea8de" />
                  <circle cx="100" cy="20" r="4.5" fill="#a259ff" />
                  <circle cx="140" cy="25" r="4.5" fill="#a259ff" />
                  <circle cx="80" cy="50" r="4.5" fill="#ff6b6b" />
                  <circle cx="120" cy="50" r="4.5" fill="#ff6b6b" />
                  <circle cx="90" cy="80" r="4.5" fill="#ffb703" />
                  <circle cx="130" cy="80" r="4.5" fill="#ffb703" />
                  <circle cx="170" cy="50" r="4.5" fill="#4ade80" />
                </svg>
              </div>
            </motion.div>
          </div>

          {/* Small Attached Sticky Note: Currently Exploring */}
          <div className="absolute -right-4 md:-right-16 lg:-right-32 lg:-mt-4 -top-8 z-30 float-slow-1">
            <motion.div 
              {...fadeIn} transition={{ delay: 0.5 }}
              drag
              dragConstraints={constraintsRef}
              dragElastic={0.15}
              onDragStart={handleDragStart}
              animate={exploreControls}
              whileDrag={{ scale: 1.08, rotate: 0, zIndex: 100, boxShadow: "0 30px 60px rgba(0,0,0,0.4)" }}
              whileHover="hover"
              variants={getPaperHover(2)}
              className="bg-[#fced88] text-card-foreground p-5 shadow-lg w-48 cursor-grab active:cursor-grabbing relative"
            >
              <motion.div variants={tapeHover} className="tape absolute -top-[10px] left-1/2 -translate-x-1/2 w-[55px] h-[22px] opacity-80" />
              <p className="text-sm mb-1 text-gray-700 font-sans select-none">currently exploring:</p>
              <h3 className="text-xl font-bold font-notes leading-tight text-gray-900 select-none">AI agents<br/>automation</h3>
            </motion.div>
          </div>
        </div>

        {/* Right Side: Backend (pinned folder paper) */}
        <div className="relative z-10 md:mt-12 float-slow-3">
          <motion.div 
             {...fadeIn} transition={{ delay: 0.6 }} 
             drag
             dragConstraints={constraintsRef}
             dragElastic={0.15}
             onDragStart={handleDragStart}
             animate={backendControls}
             whileDrag={{ scale: 1.08, rotate: 0, zIndex: 100, boxShadow: "0 30px 60px rgba(0,0,0,0.4)" }}
             whileHover="hover"
             variants={getPaperHover(2)}
             className="relative cursor-grab active:cursor-grabbing"
          >
            <div className="bg-[#f5f1e1] text-card-foreground p-10 shadow-2xl w-72 md:w-80 relative overflow-hidden">
              <div className="absolute inset-0 opacity-20 pointer-events-none bg-gradient-to-br from-white via-transparent to-black mix-blend-overlay" />
              
              {/* Red Push Pin */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-red-600 shadow-sm border border-red-800 z-10 flex items-center justify-center">
                 <div className="w-1.5 h-1.5 bg-white/40 rounded-full absolute top-0.5 left-0.5" />
              </div>

              <h3 className="text-3xl font-bold mb-6 mt-4 border-b border-black/10 pb-3 select-none">backend</h3>
              <ul className="font-notes text-2xl space-y-4 select-none">
                <li>Node.Js</li>
                <li>Express</li>
                <li>PostgreSql</li>
                <li>Mongodb</li>
              </ul>
            </div>
          </motion.div>
        </div>

      </div>

      {/* Places I've Worked */}
      <motion.div {...fadeIn} className="mt-32">
        <h2 className="text-4xl text-center mb-16 text-foreground select-none">places i've worked & what i learned</h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
        {/* Experience Card 1 */}
        <div className="float-slow-2">
          <motion.div 
            {...fadeIn} transition={{ delay: 0.1 }} 
            drag
            dragConstraints={constraintsRef}
            dragElastic={0.15}
            onDragStart={handleDragStart}
            animate={exp1Controls}
            whileDrag={{ scale: 1.08, rotate: 0, zIndex: 100, boxShadow: "0 30px 60px rgba(0,0,0,0.4)" }}
            whileHover={{ y: -8, rotate: -0.5, boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)" }}
            className="bg-white text-card-foreground p-6 rounded-xl shadow-lg relative cursor-grab active:cursor-grabbing"
          >
            <div className="thumbtack" />
            <div className="flex items-center gap-4 mb-4 select-none">
              <div className="w-10 h-10 flex items-center justify-center text-3xl font-bold italic text-blue-600">A</div>
              <div>
                <h4 className="font-bold text-lg leading-tight">Internship Role</h4>
                <p className="text-xs text-gray-500 font-sans">2021-08-23 - 2023-08-26</p>
              </div>
            </div>
            <ul className="list-disc list-inside space-y-2 text-sm font-sans text-gray-700 select-none">
              <li>Building features in the processors</li>
              <li>API in prototyping and API</li>
              <li>Agile development workflows</li>
            </ul>
          </motion.div>
        </div>

        {/* Experience Card 2 */}
        <div className="float-slow-1">
          <motion.div 
            {...fadeIn} transition={{ delay: 0.2 }} 
            drag
            dragConstraints={constraintsRef}
            dragElastic={0.15}
            onDragStart={handleDragStart}
            animate={exp2Controls}
            whileDrag={{ scale: 1.08, rotate: 0, zIndex: 100, boxShadow: "0 30px 60px rgba(0,0,0,0.4)" }}
            whileHover={{ y: -8, rotate: 0.5, boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)" }}
            className="bg-white text-card-foreground p-6 rounded-xl shadow-lg relative cursor-grab active:cursor-grabbing"
          >
            <div className="thumbtack" />
            <div className="flex items-center gap-4 mb-4 select-none">
              <div className="w-10 h-10 bg-purple-600 text-white rounded flex items-center justify-center text-xl font-bold font-sans">B</div>
              <div>
                <h4 className="font-bold text-lg leading-tight">Software Engineer Intern</h4>
                <p className="text-xs text-gray-500 font-sans">2023-08-17 - 2023-05-03</p>
              </div>
            </div>
            <ul className="list-disc list-inside space-y-2 text-sm font-sans text-gray-700 select-none">
              <li>Frontend in learning content</li>
              <li>Unit tests in development</li>
              <li>Cloud infrastructure</li>
            </ul>
          </motion.div>
        </div>

        {/* Experience Card 3 (Torn Note) */}
        <div className="float-slow-3">
          <motion.div 
            {...fadeIn} transition={{ delay: 0.3 }} 
            drag
            dragConstraints={constraintsRef}
            dragElastic={0.15}
            onDragStart={handleDragStart}
            animate={exp3Controls}
            whileDrag={{ scale: 1.08, rotate: 0, zIndex: 100, boxShadow: "0 30px 60px rgba(0,0,0,0.4)" }}
            whileHover={{ y: -8, rotate: -1, boxShadow: "0 25px 50px -12px rgba(0,0,0,0.3)" }}
            className="relative pt-4 cursor-grab active:cursor-grabbing"
          >
            <div className="torn-paper text-card-foreground p-8 shadow-xl min-h-[200px] flex items-center justify-center relative">
              <div className="thumbtack" />
              <div className="absolute -top-2 -left-4 w-12 h-6 bg-white/40 rotate-[-45deg] mix-blend-overlay" />
              <div className="absolute -top-2 -right-4 w-12 h-6 bg-white/40 rotate-[45deg] mix-blend-overlay" />
              <p className="text-2xl text-center font-notes leading-relaxed relative z-10 text-gray-800 select-none">
                learned that<br />
                debugging is<br />
                basically<br />
                detective work
              </p>
            </div>
          </motion.div>
        </div>
      </div>

    </section>
  );
};

export default SkillsSection;
