import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// --- SVG Icons --- //
const SmileyFace = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" height="32" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="32">
    <circle cx="12" cy="12" r="10" />
    <path d="M8 14s1.5 2 4 2 4-2 4-2" />
    <line x1="9" x2="9.01" y1="9" y2="9" />
    <line x1="15" x2="15.01" y1="9" y2="9" />
  </svg>
);

const OvalHighlight = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 120 40" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" preserveAspectRatio="none">
    <motion.path 
      d="M10,20 C10,5 110,6 110,20 C110,34 10,35 15,18 C18,8 100,8 100,22" 
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      exit={{ pathLength: 0 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
    />
  </svg>
);

const SpikyFace = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M 12 20 C 12 35, 28 35, 28 20" />
    <path d="M 10 18 L 13 10 L 17 14 L 20 8 L 23 14 L 27 10 L 30 18" />
    <path d="M 12 20 C 10 20, 10 24, 12 24" />
    <path d="M 28 20 C 30 20, 30 24, 28 24" />
    <circle cx="16" cy="22" r="1.5" fill="currentColor" stroke="none" />
    <circle cx="24" cy="22" r="1.5" fill="currentColor" stroke="none" />
    <path d="M 18 26 C 19 28, 21 28, 22 26" />
  </svg>
);

const Sparkle = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2 L 14 10 L 22 12 L 14 14 L 12 22 L 10 14 L 2 12 L 10 10 Z" />
  </svg>
);

const CurlyLine = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 16 C 8 20, 16 16, 12 8 C 10 4, 8 8, 12 12" />
  </svg>
);

const Badge = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 60 70" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M 28 5 C 28 15, 27 20, 27 20" strokeWidth="4" />
    <path d="M 33 4 C 33 15, 33 19, 33 19" strokeWidth="4" />
    <path d="M 16 20 L 44 20 L 45 55 L 15 56 Z" />
    <path d="M 12 22 L 5 18 M 15 15 L 10 10 M 20 12 L 17 6" />
    <path d="M 22 38 C 22 50, 38 50, 38 38" />
    <path d="M 20 35 L 24 28 L 27 32 L 30 26 L 33 32 L 36 28 L 39 35" />
    <circle cx="26" cy="40" r="1.5" fill="currentColor" stroke="none" />
    <circle cx="34" cy="40" r="1.5" fill="currentColor" stroke="none" />
    <path d="M 29 44 C 30 46, 31 46, 32 44" />
    <path d="M 22 38 C 20 38, 20 42, 22 42" />
    <path d="M 38 38 C 40 38, 40 42, 38 42" />
  </svg>
);

const PixelCursor = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 3 L 6 20 L 10 16 L 14 23 L 17 21 L 13 14 L 19 14 Z" />
  </svg>
);

const LinkedInIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M 6 8 L 6 18 M 6 5 L 6 6" />
    <path d="M 12 18 L 12 11 C 12 8, 18 8, 18 11 L 18 18" />
  </svg>
);

const GithubIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.09.682-.22.682-.48v-1.69c-2.782.6-3.369-1.34-3.369-1.34-.454-1.16-1.11-1.47-1.11-1.47-.908-.62.069-.61.069-.61 1.003.07 1.531 1.03 1.531 1.03.892 1.53 2.341 1.09 2.91.83.092-.65.35-1.09.636-1.34-2.22-.25-4.555-1.11-4.555-4.94 0-1.09.39-1.98 1.029-2.68-.103-.25-.446-1.27.098-2.65 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0112 6.84c.85.004 1.705.11 2.504.34 1.909-1.29 2.747-1.02 2.747-1.02.546 1.38.203 2.4.1 2.65.64.7 1.028 1.59 1.028 2.68 0 3.84-2.339 4.69-4.566 4.94.359.31.678.92.678 1.85v2.74c0 .27.18.58.688.48C19.138 20.16 22 16.42 22 12c0-5.52-4.477-10-10-10z" />
  </svg>
);

interface HeaderProps {
  onNavigate?: (target: "about" | "work" | "connect") => void;
}

const Header = ({ onNavigate }: HeaderProps) => {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [isBlinking, setIsBlinking] = useState(false);

  const handleAboutClick = (e: React.MouseEvent) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate("about");
    }
  };

  const handleWorkClick = (e: React.MouseEvent) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate("work");
    }
  };

  const handleConnectClick = (e: React.MouseEvent) => {
    setIsBlinking(true);
    setTimeout(() => setIsBlinking(false), 800);
    if (onNavigate) {
      e.preventDefault();
      onNavigate("connect");
    }
  };

  return (
    <header className="w-full max-w-5xl mx-auto px-6 py-8 flex items-center justify-center relative z-40">
      <nav className="w-full flex justify-center">
        <ul className="flex flex-wrap justify-center gap-6 sm:gap-10 md:gap-16 text-cream-light text-xl sm:text-2xl md:text-[32px] font-handwritten tracking-wide items-center">
          
          {/* SMILEY FACE */}
          <li className="flex items-center">
            <motion.div
              animate={isBlinking ? { opacity: [1, 0, 1, 0, 1] } : { opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <SmileyFace className="w-8 h-8 opacity-80" />
            </motion.div>
          </li>

          {/* ABOUT LINK */}
          <li 
            className="relative"
            onMouseEnter={() => setHoveredLink("about")}
            onMouseLeave={() => setHoveredLink(null)}
          >
            <a 
              className="relative z-10 hover:text-white transition-colors block px-2 py-1 cursor-pointer" 
              href="#about"
              onClick={handleAboutClick}
            >
              about
            </a>
            <AnimatePresence>
              {hoveredLink === "about" && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="absolute inset-0 z-0 pointer-events-none"
                >
                  <OvalHighlight className="absolute -left-2 -top-1 w-[120%] h-[120%] text-cream-light opacity-80" />
                  
                  <motion.span 
                    initial={{ y: -5, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[#d35442] text-xl whitespace-nowrap"
                  >
                    view bio
                  </motion.span>
                  
                  {/* Top Doodles */}
                  <motion.div 
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: -60, opacity: 1 }}
                    exit={{ y: 0, opacity: 0 }}
                    className="absolute left-1/2 -top-2 -translate-x-1/2"
                  >
                    <SpikyFace className="w-12 h-12 text-cream-light" />
                  </motion.div>

                  <motion.div 
                    initial={{ scale: 0, rotate: -45 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0, rotate: -45 }}
                    className="absolute -left-8 -top-[45px]"
                  >
                    <Sparkle className="w-6 h-6 text-cream-light" />
                  </motion.div>

                  <motion.div 
                    initial={{ scale: 0, rotate: 45 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0, rotate: 45 }}
                    className="absolute -right-6 -top-[55px]"
                  >
                    <CurlyLine className="w-8 h-8 text-cream-light" />
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </li>

          {/* WORK LINK */}
          <li 
            className="relative"
            onMouseEnter={() => setHoveredLink("work")}
            onMouseLeave={() => setHoveredLink(null)}
          >
            <a 
              className="relative z-10 hover:text-white transition-colors block px-2 py-1 cursor-pointer" 
              href="#work"
              onClick={handleWorkClick}
            >
              work
            </a>
            <AnimatePresence>
              {hoveredLink === "work" && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="absolute inset-0 z-0 pointer-events-none"
                >
                  <OvalHighlight className="absolute -left-2 -top-1 w-[120%] h-[120%] text-cream-light opacity-80" />
                  
                  <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: -70, opacity: 1 }}
                    exit={{ y: 20, opacity: 0 }}
                    className="absolute left-1/2 -translate-x-1/2 -top-2"
                  >
                    <Badge className="w-14 h-16 text-cream-light" />
                  </motion.div>

                  <motion.div 
                    initial={{ x: -10, y: 10, opacity: 0 }}
                    animate={{ x: 25, y: -40, opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: 0.1 }}
                    className="absolute right-0 top-0"
                  >
                    <PixelCursor className="w-6 h-6 text-cream-light rotate-[-15deg]" />
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </li>

          {/* CONNECT LINK */}
          <li 
            className="relative"
            onMouseEnter={() => setHoveredLink("Connect")}
            onMouseLeave={() => setHoveredLink(null)}
          >
            <a 
              className="relative z-10 hover:text-white transition-colors block px-2 py-1 cursor-pointer" 
              href="#connect"
              onClick={handleConnectClick}
            >
              Connect
            </a>
            <AnimatePresence>
              {hoveredLink === "Connect" && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="absolute inset-0 z-0 pointer-events-none"
                >
                  <OvalHighlight className="absolute -left-1 -top-1 w-[110%] h-[120%] text-cream-light opacity-80" />
                  
                  {/* Social Icons floating up */}
                  <motion.div 
                    initial={{ y: 0, x: 0, opacity: 0, rotate: -20 }}
                    animate={{ y: -45, x: -30, opacity: 1, rotate: -10 }}
                    exit={{ y: 0, opacity: 0 }}
                    className="absolute left-1/2 top-0 pointer-events-auto"
                  >
                    <a href="https://github.com/JEN-chad" target="_blank" rel="noreferrer" className="block p-1 hover:text-white transition-colors">
                      <GithubIcon className="w-8 h-8 text-cream-light hover:scale-110 transition-transform" />
                    </a>
                  </motion.div>

                  <motion.div 
                    initial={{ y: 10, x: 0, opacity: 0, rotate: 20 }}
                    animate={{ y: -45, x: 10, opacity: 1, rotate: 10 }}
                    exit={{ y: 10, opacity: 0 }}
                    transition={{ delay: 0.05 }}
                    className="absolute left-1/2 top-0 pointer-events-auto"
                  >
                    <a href="https://www.linkedin.com/in/jenishj-dev/" target="_blank" rel="noreferrer" className="block p-1 hover:text-white transition-colors">
                      <LinkedInIcon className="w-8 h-8 text-cream-light hover:scale-110 transition-transform" />
                    </a>
                  </motion.div>

                </motion.div>
              )}
            </AnimatePresence>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
