import { motion } from "framer-motion";
import { useState } from "react";
import heroImage from "@/assets/hero-illustration.png";

const HeroSection = () => {
  const [isSpread, setIsSpread] = useState(false);

  return (
    <section id="about" className="w-full px-4 mt-8 relative min-h-screen flex justify-center pb-20">
      
      {/* Background Doodles (Absolute to the section, staying outside the max-w-4xl card) */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden hidden md:block">
        
        {/* TOP LEFT CORNER (Busy) */}
        
        {/* Code Brackets </> */}
        <div className="absolute top-[12%] left-[4%] xl:left-[8%] text-cream-light/80 rotate-[14deg] float-slow-1">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="8 6 2 12 8 18"></polyline>
            <polyline points="16 18 22 12 16 6"></polyline>
            <line x1="14" y1="4" x2="10" y2="20"></line>
          </svg>
        </div>
        
        {/* Sparkles */}
        <div className="absolute top-[8%] left-[16%] xl:left-[18%] text-cream-light/60 -rotate-[10deg] float-slow-3">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 3v18M3 12h18M7.5 7.5l9 9M16.5 7.5l-9 9" />
          </svg>
        </div>

        {/* MID LEFT */}
        
        {/* Curly Braces { } */}
        <div className="absolute top-[45%] left-[6%] xl:left-[12%] text-cream-light/70 -rotate-[8deg] float-slow-2">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 4 C 6 4, 6 10, 3 12 C 6 14, 6 20, 9 20" />
            <path d="M15 4 C 18 4, 18 10, 21 12 C 18 14, 18 20, 15 20" />
          </svg>
        </div>
        
        {/* Small Arrow */}
        <div className="absolute top-[52%] left-[3%] xl:left-[8%] text-cream-light/60 rotate-[45deg]">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </div>

        {/* BOTTOM LEFT CORNER */}
        
        {/* Git Branch */}
        <div className="absolute bottom-[10%] left-[8%] xl:left-[14%] text-cream-light/80 rotate-[25deg] float-slow-3">
          <svg width="35" height="35" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="6" y1="3" x2="6" y2="15"></line>
            <circle cx="18" cy="6" r="3"></circle>
            <circle cx="6" cy="18" r="3"></circle>
            <path d="M18 9a9 9 0 0 1-9 9"></path>
          </svg>
        </div>

        {/* TOP RIGHT CORNER (Busy) */}
        
        {/* Rocket */}
        <div className="absolute top-[5%] right-[22%] xl:right-[15%] text-cream-light/80 rotate-[42deg] float-slow-2">
          <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"></path>
            <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"></path>
            <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"></path>
            <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"></path>
          </svg>
        </div>

        {/* Terminal Prompt >_ */}
        <div className="absolute top-[22%] right-[5%] xl:right-[8%] text-cream-light/70 -rotate-[15deg] float-slow-1">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="4 17 10 11 4 5"></polyline>
            <line x1="12" y1="19" x2="20" y2="19"></line>
          </svg>
        </div>

        {/* Small Arrow */}
        <div className="absolute top-[16%] right-[14%] xl:right-[18%] text-cream-light/60 -rotate-[110deg]">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </div>

        {/* MID RIGHT */}
        
        {/* Light Bulb (Idea) */}
        <div className="absolute top-[60%] right-[7%] xl:right-[12%] text-cream-light/70 rotate-[10deg] float-slow-2">
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18h6"></path>
            <path d="M10 22h4"></path>
            <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A6 6 0 1 0 7.5 11.5c.76.76 1.23 1.52 1.41 2.5"></path>
          </svg>
        </div>

        {/* Sparkles */}
        <div className="absolute top-[66%] right-[15%] xl:right-[18%] text-cream-light/60 rotate-[20deg] float-slow-3">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 3v18M3 12h18M7.5 7.5l9 9M16.5 7.5l-9 9" />
          </svg>
        </div>
        
        {/* BOTTOM RIGHT CORNER (Left Intentionally Sparse) */}
        {/* Keeping empty for organic feel per instructions! */}
        
      </div>

      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-[850px] lg:max-w-4xl w-full mx-auto bg-notebook-bg border-[10px] border-notebook-border rounded-[24px] overflow-hidden shadow-2xl flex flex-col relative z-10"
      >
        {/* Top Section - Hero */}
        <section className="notebook-grid-bg paper-texture paper-aging-vignette p-8 sm:p-10 md:p-14 flex flex-col sm:flex-row items-center justify-between relative border-b-[4px] border-dashed border-notebook-border/40">
          <div className="absolute inset-0 pointer-events-none opacity-50" style={{ filter: 'url(#grainyPaper)', zIndex: 1 }} />

          {/* SVG Filter */}
          <svg style={{ position: 'absolute', width: 0, height: 0 }}>
            <filter id="grainyPaper">
              <feTurbulence baseFrequency="0.65" numOctaves={3} stitchTiles="stitch" type="fractalNoise" />
              <feColorMatrix type="saturate" values="0" />
              <feComponentTransfer>
                <feFuncA slope="0.05" type="linear" />
              </feComponentTransfer>
            </filter>
          </svg>

          {/* Left: Text */}
          <div className="w-full sm:w-3/5 space-y-4 z-10 relative lg:pl-12 xl:pl-20">
            <div>
              <h2 className="text-[36px] sm:text-[40px] text-notebook-border m-0 leading-none">Jenish J</h2>
              <p className="uppercase tracking-widest text-sm font-bold text-accent-foreground/70 mt-2">AI Developer • Student</p>
            </div>
            <h1 className="font-bold text-[44px] sm:text-[56px] leading-[1.1] text-notebook-border max-w-[450px]">
              I build AI tools<br />that make<br />work easier
            </h1>
            <p className="uppercase tracking-widest text-sm font-semibold text-notebook-border">
              Chennai · GMT +5:30
            </p>
          </div>

          {/* Right: Illustration */}
          <div className="w-full sm:w-2/5 mt-8 sm:mt-0 flex justify-center sm:justify-end z-10 relative">
            <img
              alt="Illustration of person with laptop and plants"
              className="max-w-[220px] sm:max-w-[320px] w-full h-auto object-contain mix-blend-multiply opacity-90"
              src={heroImage}
            />
          </div>
        </section>

        {/* Bottom Section - Beliefs */}
        <section className="bg-notebook-bg p-8 sm:p-10 md:p-14 relative min-h-[300px] sm:min-h-[420px] shadow-[0_-5px_10px_rgba(0,0,0,0.05)]">
          <h3 className="text-notebook-border uppercase tracking-widest text-[16px] font-bold text-center mb-[20px] relative z-10 flex flex-col items-center">
            3 things I strongly believe in
          </h3>

          <motion.div 
            className="relative w-full min-h-[300px] flex flex-col sm:block items-center gap-6 sm:gap-0 group"
            onViewportEnter={() => setIsSpread(true)}
            onViewportLeave={() => setIsSpread(false)}
            viewport={{ amount: 0.4, once: false }}
          >
            {/* Note 1: Lined paper */}
            <div className={`sm:absolute w-48 h-48 lined-paper-bg shadow-lg border border-gray-200 p-4 flex items-center justify-center transform hover:scale-105 hover:!z-50 z-[1] paper-texture rough-edge-1 realistic-shadow ease-[cubic-bezier(0.25,1,0.5,1.2)] transition-all duration-700 ${
              isSpread 
                ? "sm:left-[10%] sm:top-[20px] sm:-rotate-[8deg]" 
                : "sm:left-[calc(50%-6rem)] sm:top-[50px] sm:-rotate-[14deg]"
            }`}>
              <p className="text-[28px] sm:text-[32px] text-card-foreground text-center leading-tight pt-2 relative z-[2]">
                Clarity over<br />complexity.
              </p>
            </div>

            {/* Note 2: Grid paper */}
            <div className={`sm:absolute w-52 h-40 fine-grid-bg shadow-lg border border-gray-300 p-5 flex items-center justify-center transform hover:scale-105 hover:!z-50 z-[2] paper-texture rough-edge-2 realistic-shadow ease-[cubic-bezier(0.25,1,0.5,1.2)] transition-all duration-700 delay-75 ${
              isSpread 
                ? "sm:right-[10%] sm:top-[30px] sm:rotate-[5deg]" 
                : "sm:right-[calc(50%-6.5rem)] sm:top-[60px] sm:-rotate-[3deg]"
            }`}>
              <p className="text-[22px] sm:text-[24px] text-card-foreground text-center leading-snug relative z-[2]">
                Software should<br />make work<br />easier.
              </p>
            </div>

            {/* Note 3: Colored paper */}
            <div className={`sm:absolute w-56 h-36 bg-note-tan shadow-lg border border-note-tan p-4 flex flex-col items-center justify-center transform hover:scale-105 hover:!z-50 z-[3] paper-texture rough-edge-3 realistic-shadow ease-[cubic-bezier(0.25,1,0.5,1.2)] transition-all duration-700 delay-150 ${
              isSpread 
                ? "sm:left-[35%] sm:top-[120px] sm:-rotate-[2deg]" 
                : "sm:left-[calc(50%-7rem)] sm:top-[70px] sm:rotate-[7deg]"
            }`}>
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 text-2xl" style={{ zIndex: 10, filter: 'drop-shadow(1px 1px 1px rgba(0,0,0,0.2))' }}>📎</div>
              <p className="italic text-[24px] sm:text-[28px] text-card-foreground text-center mt-2 relative z-[2] leading-[1.1]">
                Learn.<br />Build.<br />Repeat.
              </p>
            </div>
          </motion.div>
        </section>
      </motion.article>
    </section>
  );
};

export default HeroSection;
