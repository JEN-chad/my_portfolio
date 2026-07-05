import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const FooterSection = () => {
  const [checkedItems, setCheckedItems] = useState<number[]>([]);
  
  const toggleCheck = (index: number) => {
    setCheckedItems(prev => 
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  const checklist = [
    "Building useful AI products",
    "Solving meaningful problems",
    "Collaborating with curious builders"
  ];
  
  const allChecked = checkedItems.length === checklist.length;

  return (
    <footer id="connect" className="relative py-24 md:py-32 overflow-hidden flex flex-col items-center justify-center">
      
      {/* Background doodles - Line Circles */}
      <div className="absolute top-[30%] left-[5%] md:left-[10%] opacity-20 hidden lg:block z-0 text-white">
        <svg width="50" height="180" viewBox="0 0 100 250" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="50" cy="20" r="8" />
          <path d="M50 28 Q 80 80, 40 120 T 50 200" />
          <circle cx="30" cy="120" r="5" />
          <circle cx="40" cy="210" r="10" />
        </svg>
      </div>

      {/* Main Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-[#e7d7c1] rounded-sm p-6 md:p-8 w-[90%] max-w-xl lg:max-w-2xl relative shadow-layered z-10 transition-colors duration-300 float-slow-2 paper-texture"
        whileHover={{ y: -8, boxShadow: "0 25px 50px -12px rgba(0,0,0,0.35)", rotate: 0 }}
      >
        {/* Devil doodle absolute positioned on top right of the card, partially hanging out */}
        <div className="absolute -top-12 -right-12 opacity-30 z-[-1] pointer-events-none hidden md:block">
            <svg width="90" height="90" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-white">
              <path d="M30 30 C 20 10, 10 20, 15 40" />
              <path d="M70 30 C 80 10, 90 20, 85 40" />
              <circle cx="50" cy="55" r="30" />
              <circle cx="40" cy="45" r="3" fill="currentColor" />
              <circle cx="60" cy="45" r="3" fill="currentColor" />
              <path d="M40 65 Q 50 75, 60 65" />
            </svg>
        </div>

        <div className="flex flex-col md:flex-row gap-8 h-full">
          {/* Left Column */}
          <div className="flex-1 flex flex-col justify-center">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-hand-kalam text-[#d35442] font-bold mb-3 drop-shadow-sm">
              What I look for
            </h2>
            <div className="h-0.5 bg-[#d35442]/30 w-full mb-6 rounded-full"></div>
            
            <ul className="space-y-4 mb-4">
              {checklist.map((text, i) => {
                const isChecked = checkedItems.includes(i);
                return (
                  <li 
                    key={i} 
                    onClick={() => toggleCheck(i)}
                    className={`group flex items-center gap-3 p-2 -ml-2 rounded-md transition-all duration-150 cursor-pointer ${isChecked ? "bg-[#ff5a46]/5" : "hover:bg-[#ff5a46]/5"}`}
                  >
                    <div className="w-5 h-5 rounded-sm border-2 border-[#d35442] flex-shrink-0 relative overflow-hidden flex items-center justify-center bg-white/50 transition-colors">
                      <svg viewBox="0 0 24 24" className={`w-6 h-6 absolute text-[#d35442] -top-1 -right-1 stroke-current fill-none stroke-[3] stroke-linecap-round stroke-linejoin-round transition-all duration-300 ${isChecked ? "draw-tick opacity-100" : "opacity-0 scale-50"}`}>
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                    <span className={`font-hand-kalam text-xl md:text-2xl italic leading-tight transition-colors duration-150 ${isChecked ? "text-[#b83b2a] font-bold" : "text-[#d35442] group-hover:text-[#b83b2a]"}`}>
                      {text}
                    </span>
                  </li>
                );
              })}
            </ul>



            <motion.a 
              href={allChecked ? "mailto:hello@jackie.design" : undefined}
              animate={allChecked ? { scale: [1, 1.05, 1], rotate: [0, -2, 0] } : {}}
              transition={{ duration: 0.4 }}
              whileHover={allChecked ? { scale: 1.05, rotate: -2 } : {}}
              whileTap={allChecked ? { scale: 0.95 } : {}}
              className={`px-6 py-2 border-2 font-hand-kalam text-xl md:text-2xl w-fit flex items-center justify-center rounded-sm transition-all duration-300 ${
                allChecked 
                  ? "border-[#d35442]/80 text-[#d35442] cursor-pointer hover:bg-[#d35442]/5 shadow-sm" 
                  : "border-[#d35442]/30 text-[#d35442]/40 cursor-not-allowed grayscale-[50%]"
              }`}
            >
              let's chat!
            </motion.a>

            {/* Progress Indicator */}
            <div className="h-8 mt-4 flex items-center">
              <AnimatePresence mode="wait">
                <motion.p
                  key={checkedItems.length}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.2 }}
                  className={`font-hand-kalam text-lg ${allChecked ? "text-[#d35442] font-bold flex items-center gap-2" : "text-[#d35442]/70"}`}
                >
                  {allChecked ? (
                    <>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                      </svg>
                      looks like we're aligned.
                    </>
                  ) : (
                    `${checkedItems.length} / 3 matched`
                  )}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>

          {/* Right Column: Hand-drawn Illustration */}
          <div className="flex-1 flex items-center justify-end pr-4 md:pr-12 relative min-h-[250px] md:min-h-[300px] w-full mt-8 md:mt-0">
            {/* Soft background blob to root the illustration */}
            <div className="absolute inset-0 bg-[#d35442]/5 rounded-full blur-2xl transform scale-75 translate-x-4" />
            
            <svg viewBox="0 0 350 250" className="w-full h-full max-w-[320px] text-[#d35442] opacity-90 drop-shadow-sm float-slow-2" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <g className="translate-y-6">
                
                {/* Desk Line */}
                <path d="M40 190 Q 180 195, 340 190" strokeWidth="1.5" className="opacity-50" />
                
                {/* Flowing Ideas (Dashed Line entering left side) */}
                <path d="M10 80 C 40 80, 50 140, 90 150" strokeWidth="1.5" className="opacity-60" strokeDasharray="6 6" />
                <polyline points="75 160 90 150 80 135" strokeWidth="1.5" className="opacity-60" strokeLinecap="round" strokeLinejoin="round" />
                
                {/* Sparkles / Ideas */}
                <path d="M30 40 L 35 45 L 30 50 L 25 45 Z" fill="currentColor" className="opacity-50" />
                <path d="M60 10 L 63 17 L 70 20 L 63 23 L 60 30 L 57 23 L 50 20 L 57 17 Z" fill="currentColor" className="opacity-70" />
                
                {/* Laptop Base */}
                <path d="M80 170 L 240 170 L 260 185 L 60 185 Z" fill="currentColor" className="animate-screen-glow" />
                
                {/* Laptop Screen */}
                <path d="M95 170 L 105 70 Q 106 60, 115 60 L 215 60 Q 225 60, 225 70 L 230 170" />
                
                {/* Screen Inner Bezel */}
                <path d="M105 160 L 113 72 C 114 67, 118 66, 122 66 L 208 66 C 212 66, 216 67, 217 72 L 222 160" strokeWidth="1.5" />
                
                {/* Terminal Window inside Screen */}
                <path d="M115 80 Q 115 75, 120 75 L 210 75 Q 215 75, 215 80 L 215 150 Q 215 155, 210 155 L 120 155 Q 115 155, 115 150 Z" strokeWidth="1.2" className="opacity-30" />
                <path d="M115 90 L 215 90" strokeWidth="1.2" className="opacity-30" />
                {/* Terminal dots */}
                <circle cx="125" cy="82.5" r="1.5" fill="currentColor" className="opacity-40" />
                <circle cx="132" cy="82.5" r="1.5" fill="currentColor" className="opacity-40" />
                <circle cx="139" cy="82.5" r="1.5" fill="currentColor" className="opacity-40" />
                
                {/* Code lines on screen */}
                <text x="122" y="110" fontFamily="monospace" fontSize="9" fill="currentColor" stroke="none" className="opacity-80">
                  <tspan fontWeight="bold" opacity="0.6">&gt; </tspan>
                  <tspan>const build = () =&gt;</tspan>
                </text>
                <text x="135" y="125" fontFamily="monospace" fontSize="9" fill="currentColor" stroke="none" className="opacity-80">
                  ship();
                </text>
                
                <path d="M135 130 H 160 M 135 140 H 150" strokeWidth="1" className="opacity-40" />

                {/* Keyboard Lines */}
                <path d="M90 175 L 230 175 M 85 180 L 235 180" strokeWidth="1" className="opacity-50" />
                
                {/* Coffee Cup */}
                <path d="M265 185 L 270 155 C 270 150, 280 150, 285 150 C 295 150, 295 155, 295 155 L 290 185" fill="currentColor" fillOpacity="0.05" />
                <path d="M267 155 C 267 155, 275 152, 285 150 C 292 148, 292 155, 292 155" strokeWidth="1.5" />
                {/* Coffee Steam */}
                <g className="animate-steam-rise">
                  <path d="M275 145 Q 280 135, 275 125 M 282 142 Q 287 132, 282 122" strokeWidth="1.5" className="opacity-50" />
                </g>
                
                {/* Git Branch Doodle above screen */}
                <g className="translate-x-[150px] -translate-y-[-10px] opacity-70 scale-75 rotate-[15deg]">
                    <line x1="6" y1="3" x2="6" y2="15"></line>
                    <circle cx="18" cy="6" r="3"></circle>
                    <circle cx="6" cy="18" r="3"></circle>
                    <path d="M18 9a9 9 0 0 1-9 9"></path>
                </g>

                {/* Rocket launching from screen */}
                <g className="translate-x-[240px] translate-y-[20px] opacity-80 scale-75 rotate-[10deg]">
                  <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"></path>
                  <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"></path>
                  <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"></path>
                  <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"></path>
                  {/* Rocket trail */}
                  <path d="M-10 30 Q 8 20, 10 16" strokeDasharray="3 3" className="opacity-50" strokeWidth="1.5" />
                </g>
                
                {/* Sparkles / Ideas */}
                <g className="animate-pulse-slow">
                  <path d="M30 40 L 35 45 L 30 50 L 25 45 Z" fill="currentColor" className="opacity-50" />
                  <path d="M60 10 L 63 17 L 70 20 L 63 23 L 60 30 L 57 23 L 50 20 L 57 17 Z" fill="currentColor" className="opacity-70" />
                  <path d="M300 20 L 302 24 L 306 26 L 302 28 L 300 32 L 298 28 L 294 26 L 298 24 Z" fill="currentColor" className="opacity-70" />
                </g>
                
                {/* Code Arrow near laptop top-left */}
                <polyline points="95 45 105 45 105 55" strokeWidth="1.5" className="opacity-60" strokeLinecap="round" strokeLinejoin="round" />
                <line x1="85" y1="55" x2="105" y2="45" strokeWidth="1.5" className="opacity-60" />

              </g>
            </svg>
          </div>
        </div>
      </motion.div>

      {/* Post-card elements */}
      <div className="mt-20 flex flex-col items-center gap-10 relative z-10 w-full">
        {/* Retro Monitor */}
        <div className="opacity-40 text-white">
          <svg width="70" height="70" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="20" y="20" width="60" height="45" rx="5" />
            <rect x="25" y="25" width="50" height="35" rx="2" />
            <path d="M40 65 L 40 75 M 60 65 L 60 75" />
            <rect x="30" y="75" width="40" height="3" />
            {/* Inner screen smiley */}
            <circle cx="50" cy="42" r="10" />
            <circle cx="46" cy="38" r="1.5" fill="currentColor"/>
            <circle cx="54" cy="38" r="1.5" fill="currentColor"/>
            <path d="M46 46 Q 50 50, 54 46" strokeWidth="1.5"/>
          </svg>
        </div>

        {/* Signature */}
        <div className="relative mt-16 md:mt-20 mb-6 flex flex-col items-center text-center">
          <p className="text-white/70 font-hand-kalam text-xl md:text-2xl mb-6 md:mb-8 italic px-4 py-4">late night builds &amp; curious ideas ☕</p>
          <div className="relative">
            <h2 className="text-5xl  md:text-6xl lg:text-7xl font-hand-kalam text-[#d35442] font-bold tracking-wide relative z-10">
              Jenish<span className="text-[#a53b2b]">.</span>
            </h2>
            
            {/* Smiley Dialogue Bubble Doodle - absolute placed near signature */}
            <div className="absolute -top-10 -right-16 md:-right-24 opacity-30 text-white pointer-events-none">
              <svg width="70" height="70" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M50 20 C 20 20, 10 40, 10 60 C 10 80, 40 80, 45 80 L 40 95 L 60 80 C 80 81, 90 80, 90 60 C 90 40, 80 20, 50 20 Z" />
                <circle cx="35" cy="45" r="4" fill="currentColor" />
                <circle cx="65" cy="45" r="4" fill="currentColor" />
                <path d="M40 60 Q 50 70, 60 60" />
              </svg>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <p className="text-xs text-muted-foreground font-mono mt-4 border-t border-white/10 pt-6 w-full max-w-lg text-center">
          © 2026 Jenish. Always shipping.
        </p>
      </div>
    </footer>
  );
};

export default FooterSection;
