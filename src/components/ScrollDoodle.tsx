import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ScrollDoodleProps {
  path: string;
  width: number;
  height: number;
  viewBox: string;
  className?: string;
  color?: string;
  strokeWidth?: number;
  dashArray?: string;
  // Offset triggers for scroll animation: e.g., ["start end", "end center"]
  offset?: [string, string];
}

export default function ScrollDoodle({
  path,
  width,
  height,
  viewBox,
  className = "",
  color = "currentColor",
  strokeWidth = 2,
  dashArray = "",
  offset = ["start end", "end center"],
}: ScrollDoodleProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: offset,
  });

  // Clamp and smooth the path length drawing progress
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div
      ref={containerRef}
      className={`relative select-none pointer-events-none ${className}`}
    >
      <svg
        width={width}
        height={height}
        viewBox={viewBox}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full overflow-visible"
      >
        <motion.path
          d={path}
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={dashArray}
          style={{ pathLength }}
          transition={{ ease: "easeOut" }}
        />
      </svg>
    </div>
  );
}
