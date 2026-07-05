import { motion, Variants } from "framer-motion";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

// Reusable micro-interaction hover variants for paper cards
// Dynamically reduces rotation to make it slightly straighter
const getPaperHover = (initialRotation: number): Variants => ({
  hover: {
    y: -8,
    rotate: initialRotation > 0 ? initialRotation - 1 : initialRotation < 0 ? initialRotation + 1 : 0,
    boxShadow: "0 25px 50px -12px rgba(0,0,0,0.3)",
    transition: { type: "spring", stiffness: 300, damping: 20 }
  }
});
const tapeHover: Variants = {
  hover: { rotate: -2, y: -2 }
};

const SkillsSection = () => {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-8 py-24 font-architects overflow-hidden">
      
      {/* Section Heading */}
      <motion.div {...fadeIn} className="relative z-10 w-full mb-16">
        <h2 className="text-5xl md:text-6xl text-center text-foreground font-architects">things i use</h2>
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
        <motion.div 
          {...fadeIn} transition={{ delay: 0.1 }}
          whileHover="hover"
          variants={getPaperHover(-2)}
          className="sticky-note bg-[#fbf5be] text-card-foreground -rotate-2 w-64 shadow-md cursor-default origin-bottom relative z-10 float-slow-1"
        >
          <motion.div variants={tapeHover} className="tape absolute -top-[10px] left-1/2 -translate-x-1/2 w-[80px] h-[30px]" />
          <h3 className="text-3xl font-bold mb-4 border-b border-black/10 pb-2">languages</h3>
          <ul className="font-notes text-2xl space-y-3">
            <li>Javascript</li>
            <li>Typescript</li>
            <li>Python</li>
            <li>Html</li>
            <li>Css</li>
          </ul>
        </motion.div>

        {/* Note 2: Frontend */}
        <motion.div 
          {...fadeIn} transition={{ delay: 0.2 }}
          whileHover="hover"
          variants={getPaperHover(2)}
          className="sticky-note bg-[#88c5f7] text-card-foreground rotate-2 w-64 shadow-md cursor-default origin-bottom relative z-10 float-slow-2"
        >
          <motion.div variants={tapeHover} className="tape absolute -top-[10px] left-1/2 -translate-x-1/2 w-[80px] h-[30px] opacity-80" />
          <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 0)', backgroundSize: '10px 10px' }} />
          <h3 className="text-3xl font-bold mb-4 relative border-b border-black/10 pb-2">frontend</h3>
          <ul className="font-notes text-2xl space-y-3 relative">
            <li>React</li>
            <li>Nextjs</li>
            <li>Vue</li>
            <li>Tailwind</li>
          </ul>
        </motion.div>

        {/* Note 3: Tools */}
        <motion.div 
          {...fadeIn} transition={{ delay: 0.3 }}
          whileHover="hover"
          variants={getPaperHover(-1)}
          className="sticky-note bg-[#fbc67b] text-card-foreground -rotate-1 w-64 shadow-md cursor-default origin-bottom relative z-10 float-slow-3"
        >
          <motion.div variants={tapeHover} className="tape absolute -top-[10px] left-1/2 -translate-x-1/2 w-[80px] h-[30px] opacity-70" />
          <h3 className="text-3xl font-bold mb-4 border-b border-black/10 pb-2">tools</h3>
          <ul className="font-notes text-2xl space-y-3">
            <li>git</li>
            <li>docker</li>
            <li>figma</li>
            <li>vscode</li>
          </ul>
        </motion.div>
      </div>

      {/* ===== ROW 2: The Overlapping Desk Pile ===== */}
      <div className="flex flex-col md:flex-row justify-center items-center relative w-full max-w-5xl mx-auto gap-12 md:gap-20 lg:gap-32 mt-20">
        
        {/* Left Side: Tools I Like + Attached "Currently Exploring" Sticky */}
        <div className="relative z-20">
          
          {/* Card 1: Tools I Like (Graph) */}
          <motion.div 
            {...fadeIn} transition={{ delay: 0.4 }}
            whileHover="hover"
            variants={getPaperHover(-3)}
            className="bg-white text-card-foreground p-8 rounded-sm shadow-xl w-80 md:w-96 text-center font-architects rotate-[-3deg] cursor-default relative float-slow-2"
          >
            <h3 className="text-3xl font-bold">tools i like</h3>
            
            {/* Eye-shaped Graph Diagram */}
            <div className="relative w-full h-40 mt-6 flex justify-center items-center overflow-visible">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 200 100">
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

          {/* Small Attached Sticky Note: Currently Exploring */}
          <motion.div 
            {...fadeIn} transition={{ delay: 0.5 }}
            whileHover="hover"
            variants={getPaperHover(2)}
            className="absolute -right-4 md:-right-16 lg:-right-32 lg:-mt-4 -top-8 bg-[#fced88] text-card-foreground p-5 shadow-lg rotate-2 w-48 cursor-default z-30 float-slow-1"
          >
            <motion.div variants={tapeHover} className="tape absolute -top-[10px] left-1/2 -translate-x-1/2 w-[55px] h-[22px] opacity-80" />
            <p className="text-sm mb-1 text-gray-700 font-sans">currently exploring:</p>
            <h3 className="text-xl font-bold font-notes leading-tight text-gray-900">AI agents<br/>automation</h3>
          </motion.div>
        </div>

        {/* Right Side: Backend (pinned folder paper) */}
        <div className="relative z-10 md:mt-12">
          <motion.div 
             {...fadeIn} transition={{ delay: 0.6 }} 
             whileHover="hover"
             variants={getPaperHover(2)}
             className="relative cursor-default float-slow-3"
          >
            <div className="bg-[#f5f1e1] text-card-foreground p-10 shadow-2xl rotate-2 w-72 md:w-80 relative overflow-hidden transition-shadow duration-300">
              <div className="absolute inset-0 opacity-20 pointer-events-none bg-gradient-to-br from-white via-transparent to-black mix-blend-overlay" />
              
              {/* Red Push Pin */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-red-600 shadow-sm border border-red-800 z-10 flex items-center justify-center">
                 <div className="w-1.5 h-1.5 bg-white/40 rounded-full absolute top-0.5 left-0.5" />
              </div>

              <h3 className="text-3xl font-bold mb-6 mt-4 border-b border-black/10 pb-3">backend</h3>
              <ul className="font-notes text-2xl space-y-4">
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
        <h2 className="text-4xl text-center mb-16 text-foreground">places i've worked & what i learned</h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Experience Card 1 */}
        <motion.div 
          {...fadeIn} transition={{ delay: 0.1 }} 
          whileHover={{ y: -8, rotate: -0.5, boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)" }}
          className="bg-white text-card-foreground p-6 rounded-xl shadow-lg relative -rotate-1 cursor-default transition-colors duration-300 float-slow-2"
        >
          <div className="thumbtack" />
          <div className="flex items-center gap-4 mb-4">
            <div className="w-10 h-10 flex items-center justify-center text-3xl font-bold italic text-blue-600">A</div>
            <div>
              <h4 className="font-bold text-lg leading-tight">Internship Role</h4>
              <p className="text-xs text-gray-500 font-sans">2021-08-23 - 2023-08-26</p>
            </div>
          </div>
          <ul className="list-disc list-inside space-y-2 text-sm font-sans text-gray-700">
            <li>Building features in the processors</li>
            <li>API in prototyping and API</li>
            <li>Agile development workflows</li>
          </ul>
        </motion.div>

        {/* Experience Card 2 */}
        <motion.div 
          {...fadeIn} transition={{ delay: 0.2 }} 
          whileHover={{ y: -8, rotate: 0.5, boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)" }}
          className="bg-white text-card-foreground p-6 rounded-xl shadow-lg relative rotate-1 cursor-default transition-colors duration-300 float-slow-1"
        >
          <div className="thumbtack" />
          <div className="flex items-center gap-4 mb-4">
            <div className="w-10 h-10 bg-purple-600 text-white rounded flex items-center justify-center text-xl font-bold font-sans">B</div>
            <div>
              <h4 className="font-bold text-lg leading-tight">Software Engineer Intern</h4>
              <p className="text-xs text-gray-500 font-sans">2023-08-17 - 2023-05-03</p>
            </div>
          </div>
          <ul className="list-disc list-inside space-y-2 text-sm font-sans text-gray-700">
            <li>Frontend in learning content</li>
            <li>Unit tests in development</li>
            <li>Cloud infrastructure</li>
          </ul>
        </motion.div>

        {/* Experience Card 3 (Torn Note) */}
        <motion.div 
          {...fadeIn} transition={{ delay: 0.3 }} 
          whileHover={{ y: -8, rotate: -1, boxShadow: "0 25px 50px -12px rgba(0,0,0,0.3)" }}
          className="relative pt-4 cursor-default transition-colors duration-300 z-10 float-slow-3"
        >
          <div className="torn-paper text-card-foreground p-8 shadow-xl -rotate-2 min-h-[200px] flex items-center justify-center relative">
            <div className="thumbtack" />
            <div className="absolute -top-2 -left-4 w-12 h-6 bg-white/40 rotate-[-45deg] mix-blend-overlay" />
            <div className="absolute -top-2 -right-4 w-12 h-6 bg-white/40 rotate-[45deg] mix-blend-overlay" />
            <p className="text-2xl text-center font-notes leading-relaxed relative z-10 text-gray-800">
              learned that<br />
              debugging is<br />
              basically<br />
              detective work
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;
