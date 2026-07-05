import { useRef, useEffect, useState, useCallback } from "react";
import { motion, useAnimate, useMotionValue, useTransform, AnimatePresence } from "framer-motion";

interface FloatingKeyProps {
  lockRef: React.RefObject<HTMLDivElement>;
  onUnlockComplete: () => void;
  bookShakeControls: { shake: () => void };
  bookLocked: boolean;
}

// ─── Spark Particle ───────────────────────────────────────────────────────────
function Spark({ x, y, angle, delay }: { x: number; y: number; angle: number; delay: number }) {
  return (
    <motion.div
      className="absolute w-1.5 h-1.5 rounded-full pointer-events-none"
      style={{
        left: x,
        top: y,
        background: "radial-gradient(circle, #ffe066 0%, #ff9c00 60%, transparent 100%)",
        boxShadow: "0 0 6px #ffe066",
        zIndex: 9999,
      }}
      initial={{ opacity: 0, scale: 0.3, x: 0, y: 0 }}
      animate={{
        opacity: [0, 1, 1, 0],
        scale: [0.3, 1.2, 0.8, 0],
        x: Math.cos(angle) * 36,
        y: Math.sin(angle) * 36,
      }}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
    />
  );
}

// ─── Floating ambient sparks around key ────────────────────────────────────
function AmbientSparks() {
  const sparks = Array.from({ length: 6 }, (_, i) => ({
    id: i,
    angle: (i / 6) * Math.PI * 2,
    radius: 28 + (i % 2) * 10,
    delay: i * 0.3,
    duration: 2 + i * 0.4,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none">
      {sparks.map((s) => (
        <motion.div
          key={s.id}
          className="absolute w-1 h-1 rounded-full"
          style={{
            left: "50%",
            top: "50%",
            background: "#ffe066",
            boxShadow: "0 0 4px #fbbf24, 0 0 8px #fbbf24",
          }}
          animate={{
            x: [
              Math.cos(s.angle) * s.radius,
              Math.cos(s.angle + 0.5) * (s.radius + 6),
              Math.cos(s.angle) * s.radius,
            ],
            y: [
              Math.sin(s.angle) * s.radius,
              Math.sin(s.angle + 0.5) * (s.radius + 6),
              Math.sin(s.angle) * s.radius,
            ],
            opacity: [0.3, 0.9, 0.3],
            scale: [0.6, 1.2, 0.6],
          }}
          transition={{
            duration: s.duration,
            repeat: Infinity,
            delay: s.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

// ─── Burst sparks on unlock ───────────────────────────────────────────────
function UnlockBurst({ active }: { active: boolean }) {
  if (!active) return null;
  const angles = Array.from({ length: 12 }, (_, i) => (i / 12) * Math.PI * 2);
  return (
    <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 9999 }}>
      {angles.map((angle, i) => (
        <Spark key={i} x={20} y={20} angle={angle} delay={i * 0.04} />
      ))}
    </div>
  );
}

// ─── Vintage Key SVG ─────────────────────────────────────────────────────────
function VintageKeySVG({ glowing }: { glowing: boolean }) {
  return (
    <svg
      viewBox="0 0 80 160"
      xmlns="http://www.w3.org/2000/svg"
      style={{ overflow: "visible" }}
    >
      <defs>
        {/* Key glow filter */}
        <filter id="key-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation={glowing ? "4" : "2"} result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        {/* Gold gradient for key body */}
        <linearGradient id="gold-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f9e07a" />
          <stop offset="35%" stopColor="#d4a01a" />
          <stop offset="65%" stopColor="#f6d365" />
          <stop offset="100%" stopColor="#b8860b" />
        </linearGradient>
        {/* Darker gold for depth */}
        <linearGradient id="gold-dark" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#c8960c" />
          <stop offset="100%" stopColor="#8B6310" />
        </linearGradient>
        {/* Glow radial */}
        <radialGradient id="key-halo" cx="50%" cy="30%" r="50%">
          <stop offset="0%" stopColor="#ffe066" stopOpacity={glowing ? "0.5" : "0.15"} />
          <stop offset="100%" stopColor="#ffe066" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Halo glow behind key */}
      <ellipse cx="40" cy="40" rx="36" ry="36" fill="url(#key-halo)" />

      {/* Ornate bow ring - outer */}
      <circle cx="40" cy="38" r="26" fill="none" stroke="url(#gold-grad)" strokeWidth="5" filter="url(#key-glow)" />
      {/* Bow ring - inner accent */}
      <circle cx="40" cy="38" r="18" fill="none" stroke="url(#gold-dark)" strokeWidth="2" opacity="0.7" />
      {/* Bow center hole */}
      <circle cx="40" cy="38" r="10" fill="#1a1410" stroke="url(#gold-dark)" strokeWidth="1.5" />

      {/* Ornate cross detail inside bow */}
      <line x1="40" y1="28" x2="40" y2="48" stroke="url(#gold-grad)" strokeWidth="1.5" opacity="0.6" />
      <line x1="30" y1="38" x2="50" y2="38" stroke="url(#gold-grad)" strokeWidth="1.5" opacity="0.6" />

      {/* Small decorative dots on bow */}
      <circle cx="40" cy="14" r="2.5" fill="url(#gold-grad)" />
      <circle cx="14" cy="38" r="2.5" fill="url(#gold-grad)" />
      <circle cx="66" cy="38" r="2.5" fill="url(#gold-grad)" />

      {/* Key shank (shaft) */}
      <rect x="37" y="64" width="6" height="68" rx="3" fill="url(#gold-grad)" filter="url(#key-glow)" />
      {/* Shank depth edge */}
      <rect x="37" y="64" width="2" height="68" rx="1" fill="url(#gold-dark)" opacity="0.5" />

      {/* Key teeth / wards - right side */}
      <rect x="43" y="90" width="12" height="5" rx="1.5" fill="url(#gold-grad)" />
      <rect x="43" y="105" width="8" height="5" rx="1.5" fill="url(#gold-grad)" />
      <rect x="43" y="118" width="11" height="5" rx="1.5" fill="url(#gold-grad)" />
      <rect x="43" y="131" width="6" height="5" rx="1.5" fill="url(#gold-grad)" />

      {/* Key tip */}
      <rect x="36" y="130" width="8" height="6" rx="2" fill="url(#gold-grad)" />
      <rect x="37" y="134" width="6" height="4" rx="1.5" fill="url(#gold-dark)" opacity="0.4" />
    </svg>
  );
}

// ─── Main FloatingKey Component ───────────────────────────────────────────────
export default function FloatingKey({ lockRef, onUnlockComplete, bookShakeControls, bookLocked }: FloatingKeyProps) {
  const keyRef = useRef<HTMLDivElement>(null);
  const [scope, animate] = useAnimate();
  const [phase, setPhase] = useState<"idle" | "traveling" | "inserting" | "done">("idle");
  const [burstActive, setBurstActive] = useState(false);
  const [hint, setHint] = useState(false);

  // Show hint tooltip after 3 seconds on desktop
  useEffect(() => {
    if (!bookLocked) return;
    const t = setTimeout(() => setHint(true), 3000);
    return () => clearTimeout(t);
  }, [bookLocked]);

  const handleKeyClick = useCallback(async () => {
    if (phase !== "idle" || !bookLocked) return;
    setHint(false);
    setPhase("traveling");

    // 1. Disable scroll
    document.body.style.overflow = "hidden";

    // 2. Get positions for key → lock travel
    const keyEl = scope.current as HTMLDivElement;
    const lockEl = lockRef.current;

    if (!keyEl || !lockEl) {
      document.body.style.overflow = "";
      return;
    }

    const keyRect = keyEl.getBoundingClientRect();
    const lockRect = lockEl.getBoundingClientRect();

    // Vector from key center to lock center
    const dx = lockRect.left + lockRect.width / 2 - (keyRect.left + keyRect.width / 2);
    const dy = lockRect.top + lockRect.height / 2 - (keyRect.top + keyRect.height / 2);

    // 3. Cinematic travel: arc with curve, rotation, scale
    await animate(scope.current, {
      x: [0, dx * 0.3, dx * 0.7, dx],
      y: [0, dy * 0.2 - 60, dy * 0.7 - 20, dy],
      rotate: [0, -25, -80, -90],
      scale: [1, 1.15, 0.85, 0.7],
    }, {
      duration: 1.1,
      ease: [0.25, 0.1, 0.25, 1],
    });

    // 4. Key insertion wobble
    setPhase("inserting");
    await animate(scope.current, {
      rotate: [-90, -60, -90, -30, -90],
      scale: [0.7, 0.65, 0.7, 0.65, 0.6],
    }, {
      duration: 0.65,
      ease: "easeInOut",
    });

    // 5. Unlock burst
    setBurstActive(true);

    // 6. Key fades out
    await animate(scope.current, {
      scale: [0.6, 0.2, 0],
      opacity: [1, 0.6, 0],
    }, { duration: 0.4, ease: "easeIn" });

    setPhase("done");
    document.body.style.overflow = "";

    // Small delay then open book
    setTimeout(() => {
      setBurstActive(false);
      onUnlockComplete();
    }, 300);
  }, [phase, bookLocked, animate, scope, lockRef, onUnlockComplete]);

  if (phase === "done") return null;

  return (
    <motion.div
      ref={scope}
      className="absolute z-[100] cursor-pointer select-none"
      style={{
        right: "calc(50% - 420px)",
        top: "50%",
        translateY: "-50%",
        width: 40,
        height: 80,
      }}
      onClick={handleKeyClick}
      title="Click the key to unlock the logbook"
    >
      {/* Ambient glow ring */}
      <motion.div
        className="absolute inset-[-8px] rounded-full pointer-events-none"
        animate={{
          boxShadow: [
            "0 0 18px 6px rgba(255,224,102,0.12)",
            "0 0 32px 14px rgba(255,224,102,0.28)",
            "0 0 18px 6px rgba(255,224,102,0.12)",
          ],
        }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Float + rotate idle animation */}
      <motion.div
        animate={phase === "idle" ? {
          y: [0, -10, 0, -6, 0],
          rotate: [-4, 4, -4],
        } : {}}
        transition={{
          duration: 3.6,
          repeat: phase === "idle" ? Infinity : 0,
          ease: "easeInOut",
        }}
        className="relative w-full h-full"
      >
        <VintageKeySVG glowing={phase === "idle"} />
        <AmbientSparks />
        <UnlockBurst active={burstActive} />
      </motion.div>

      {/* Tooltip hint */}
      <AnimatePresence>
        {hint && phase === "idle" && (
          <motion.div
            initial={{ opacity: 0, y: 4, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.9 }}
            className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap font-hand-kalam text-[10px] text-amber-300/90 bg-black/50 rounded-full px-2 py-0.5 pointer-events-none backdrop-blur-sm border border-amber-400/20"
            style={{ textShadow: "0 0 8px #fbbf24" }}
          >
            unlock ✦
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
