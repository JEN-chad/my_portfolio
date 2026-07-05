import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function DoodleCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [hoverState, setHoverState] = useState<"default" | "clickable" | "text" | "draggable">("default");
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { stiffness: 400, damping: 28, mass: 0.6 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Check if device supports hover/fine pointer
    const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!hasFinePointer) return;

    setIsVisible(true);

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      // 1. Inputs, Textareas
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable
      ) {
        setHoverState("text");
        return;
      }

      // 2. Clickables
      const isClickable = 
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.closest('[role="button"]') ||
        target.classList.contains("cursor-pointer") ||
        target.closest(".cursor-pointer");
      
      if (isClickable) {
        setHoverState("clickable");
        return;
      }

      // 3. Draggables (sticky notes)
      const isDraggable = 
        target.closest("[draggable='true']") ||
        target.closest(".sticky-note") ||
        target.classList.contains("sticky-note");

      if (isDraggable) {
        setHoverState("draggable");
        return;
      }

      setHoverState("default");
    };

    const handleMouseLeaveWindow = () => {
      setIsVisible(false);
    };

    const handleMouseEnterWindow = () => {
      setIsVisible(true);
    };

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseleave", handleMouseLeaveWindow);
    document.addEventListener("mouseenter", handleMouseEnterWindow);

    // Add cursor-none stylesheet dynamically so it only applies when DoodleCursor is active
    const styleEl = document.createElement("style");
    styleEl.innerHTML = `
      @media (pointer: fine) {
        html, body, a, button, [role="button"], input, select, textarea, .sticky-note {
          cursor: none !important;
        }
      }
    `;
    document.head.appendChild(styleEl);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseLeaveWindow);
      document.removeEventListener("mouseenter", handleMouseEnterWindow);
      document.head.removeChild(styleEl);
    };
  }, [cursorX, cursorY]);

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[9999]"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
        translateX: "-50%",
        translateY: "-50%",
      }}
    >
      {/* Default State: Pencil drawing pencil tip/circle */}
      {hoverState === "default" && (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-notebook-border opacity-90">
          <circle cx="12" cy="12" r="6" stroke="currentColor" strokeWidth="2" strokeDasharray="3 3" />
          <circle cx="12" cy="12" r="1.5" fill="currentColor" />
        </svg>
      )}

      {/* Clickable Hover: Cute sketch highlight circle with Smiley inside */}
      {hoverState === "clickable" && (
        <motion.div
          initial={{ scale: 0.6, rotate: -20 }}
          animate={{ scale: 1.1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 500, damping: 20 }}
        >
          <svg width="38" height="38" viewBox="0 0 40 40" fill="none" className="text-notebook-border">
            {/* Hand-drawn circular oval doodle */}
            <path
              d="M20,5 C10,5 5,12 5,20 C5,28 12,35 20,35 C28,35 35,28 35,20 C35,12 28,5 20,5 M18,7 C29,5 37,13 36,22 C35,31 25,37 16,33 C9,30 4,20 8,11"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Tiny smiley eyes & smile */}
            <circle cx="15" cy="17" r="1.5" fill="currentColor" />
            <circle cx="25" cy="17" r="1.5" fill="currentColor" />
            <path d="M16,24 Q20,28 24,24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </motion.div>
      )}

      {/* Text input Hover: Hand-drawn pencil/bracket cursor */}
      {hoverState === "text" && (
        <motion.div
          initial={{ scaleY: 0.5, opacity: 0 }}
          animate={{ scaleY: 1, opacity: 1 }}
          className="h-6 w-1 flex items-center justify-center"
        >
          <svg width="6" height="24" viewBox="0 0 6 24" fill="none" className="text-notebook-border">
            <path d="M3,2 L3,22 M1,2 L5,2 M1,22 L5,22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </motion.div>
      )}

      {/* Draggable Hover: Open hand doodle / grabbing indicator */}
      {hoverState === "draggable" && (
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 400, damping: 15 }}
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="text-notebook-border opacity-95">
            {/* Hand-drawn style glove/hand */}
            <path
              d="M5,10 C5,8 6.5,8 6.5,10 L6.5,13 M6.5,8 C6.5,6.5 8,6.5 8,8 L8,13 M8,7 C8,5.5 9.5,5.5 9.5,7 L9.5,13 M9.5,8 C9.5,6.5 11,6.5 11,8 L11,13 M11,10 C11,9 12.5,9 12.5,10 L12.5,15 C12.5,17 11.5,19 9.5,20 C8,20.5 5,19 5,16 Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              transform="rotate(-15 12 12)"
            />
          </svg>
        </motion.div>
      )}
    </motion.div>
  );
}
