import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function LofiWalkman() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRainOn, setIsRainOn] = useState(true);
  const [currentTrackName, setCurrentTrackName] = useState("lofi chords");

  const audioCtxRef = useRef<AudioContext | null>(null);
  const synthIntervalRef = useRef<number | null>(null);
  const rainSourceRef = useRef<AudioBufferSourceNode | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const rainGainRef = useRef<GainNode | null>(null);

  // Minor 7th chord progressions
  // Each chord is a list of frequencies (Hz)
  const progressions = [
    [164.81, 196.00, 246.94, 293.66], // Em7 (E3, G3, B3, D4)
    [220.00, 261.63, 329.63, 392.00], // Am7 (A3, C4, E4, G4)
    [146.83, 174.61, 220.00, 261.63], // Dm7 (D3, F3, A3, C4)
    [196.00, 246.94, 293.66, 369.99], // Gmaj7 (G3, B3, D4, F#4)
  ];

  let chordIndex = 0;

  // Initialize Audio Context and Nodes
  const initAudio = () => {
    if (audioCtxRef.current) return;

    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    const ctx = new AudioContextClass();
    audioCtxRef.current = ctx;

    // Master Lowpass filter for cozy lofi sound
    const lofiFilter = ctx.createBiquadFilter();
    lofiFilter.type = "lowpass";
    lofiFilter.frequency.setValueAtTime(700, ctx.currentTime);
    lofiFilter.Q.setValueAtTime(1.2, ctx.currentTime);

    // Master Gain Node
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.35, ctx.currentTime);
    masterGainRef.current = masterGain;

    // Connect nodes
    lofiFilter.connect(masterGain);
    masterGain.connect(ctx.destination);

    // Generate vinyl rain crackle white noise
    const bufferSize = ctx.sampleRate * 2; // 2 seconds of noise
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      // Simulate random crackling pops + soft noise
      const r = Math.random() * 2 - 1;
      const isPop = Math.random() < 0.0006;
      output[i] = r * 0.05 + (isPop ? r * 0.4 : 0);
    }

    const rainSource = ctx.createBufferSource();
    rainSource.buffer = noiseBuffer;
    rainSource.loop = true;

    // Filter rain to simulate crackle
    const rainFilter = ctx.createBiquadFilter();
    rainFilter.type = "highpass";
    rainFilter.frequency.setValueAtTime(1200, ctx.currentTime);

    const rainGain = ctx.createGain();
    rainGain.gain.setValueAtTime(isRainOn ? 0.15 : 0.0, ctx.currentTime);
    rainGainRef.current = rainGain;

    rainSource.connect(rainFilter);
    rainFilter.connect(rainGain);
    rainGain.connect(ctx.destination); // Bypass master lowpass filter

    rainSource.start();
    rainSourceRef.current = rainSource;
  };

  // Play a minor 7th chord with custom envelope
  const playChord = () => {
    const ctx = audioCtxRef.current;
    if (!ctx || ctx.state === "suspended") return;

    const freqs = progressions[chordIndex];
    chordIndex = (chordIndex + 1) % progressions.length;

    // Randomize track name feedback sometimes
    if (Math.random() < 0.2) {
      const vibes = ["lofi dreams", "late night code", "rainy terminal", "cozy vibes"];
      setCurrentTrackName(vibes[Math.floor(Math.random() * vibes.length)]);
    }

    // Spawn oscillators for each note in the chord
    const oscs: OscillatorNode[] = [];
    const chordGain = ctx.createGain();
    chordGain.gain.setValueAtTime(0, ctx.currentTime);

    // Filter
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(700, ctx.currentTime);

    freqs.forEach(freq => {
      const osc = ctx.createOscillator();
      osc.type = "triangle"; // Warm triangle waves
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      osc.connect(filter);
      oscs.push(osc);
    });

    filter.connect(chordGain);
    chordGain.connect(masterGainRef.current!);

    // Trigger ADSR Envelope
    const now = ctx.currentTime;
    chordGain.gain.cancelScheduledValues(now);
    chordGain.gain.linearRampToValueAtTime(0.3, now + 1.2); // Smooth Attack
    chordGain.gain.linearRampToValueAtTime(0.2, now + 2.5); // Decay
    chordGain.gain.setValueAtTime(0.2, now + 3.2); // Sustain
    chordGain.gain.exponentialRampToValueAtTime(0.0001, now + 4.2); // Release

    oscs.forEach(osc => {
      osc.start(now);
      osc.stop(now + 4.5);
    });
  };

  // Handle Play/Stop trigger
  const handlePlayToggle = async () => {
    try {
      initAudio();
      const ctx = audioCtxRef.current;
      if (!ctx) return;

      if (isPlaying) {
        // Pause
        ctx.suspend();
        setIsPlaying(false);
        if (synthIntervalRef.current) {
          window.clearInterval(synthIntervalRef.current);
          synthIntervalRef.current = null;
        }
      } else {
        // Resume/Start
        await ctx.resume();
        setIsPlaying(true);
        playChord(); // Play first chord immediately
        synthIntervalRef.current = window.setInterval(playChord, 4000);
      }
    } catch (err) {
      console.error("Audio trigger failed: ", err);
    }
  };

  // Toggle Rain crackle volume
  const handleRainToggle = () => {
    const nextRainState = !isRainOn;
    setIsRainOn(nextRainState);
    if (rainGainRef.current && audioCtxRef.current) {
      const targetGain = nextRainState ? 0.15 : 0.0;
      rainGainRef.current.gain.setTargetAtTime(targetGain, audioCtxRef.current.currentTime, 0.2);
    }
  };

  // Cleanup audio loops on unmount
  useEffect(() => {
    return () => {
      if (synthIntervalRef.current) {
        window.clearInterval(synthIntervalRef.current);
      }
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
      }
    };
  }, []);

  return (
    <div className="flex flex-col items-center bg-[#2d3748] border-4 border-slate-900 rounded-lg p-3 w-44 shadow-lg text-white font-mono select-none">
      
      {/* Tape Deck Window */}
      <div className="w-full h-12 bg-slate-950 rounded border-2 border-slate-700 relative flex items-center justify-around px-2 overflow-hidden mb-2">
        <div className="absolute inset-0 screen-glare pointer-events-none opacity-20" />
        
        {/* Left Spindle */}
        <div className="w-6 h-6 rounded-full border border-slate-500 bg-slate-800 flex items-center justify-center relative">
          <motion.div 
            className="w-0.5 h-4 bg-slate-400"
            animate={isPlaying ? { rotate: 360 } : {}}
            transition={{ repeat: Infinity, duration: 2.5, ease: "linear" }}
          />
        </div>

        {/* Status display */}
        <div className="text-[7.5px] text-[#4ade80] text-center w-12 truncate select-none leading-none">
          {isPlaying ? (
            <>
              <p className="animate-pulse">PLAYING</p>
              <p className="text-slate-400 mt-1 uppercase text-[6px]">{currentTrackName}</p>
            </>
          ) : (
            <p className="text-slate-500">STOPPED</p>
          )}
        </div>

        {/* Right Spindle */}
        <div className="w-6 h-6 rounded-full border border-slate-500 bg-slate-800 flex items-center justify-center relative">
          <motion.div 
            className="w-0.5 h-4 bg-slate-400"
            animate={isPlaying ? { rotate: 360 } : {}}
            transition={{ repeat: Infinity, duration: 2.5, ease: "linear" }}
          />
        </div>
      </div>

      <div className="text-[7px] text-slate-400 tracking-widest text-center uppercase mb-2">LOFI SYNTH UNIT</div>

      {/* Buttons */}
      <div className="grid grid-cols-2 gap-2 w-full">
        <button
          onClick={handlePlayToggle}
          className={`py-1 rounded text-[10px] font-bold shadow active:scale-95 cursor-pointer text-center ${
            isPlaying 
              ? "bg-red-600 hover:bg-red-500 text-white" 
              : "bg-emerald-600 hover:bg-emerald-500 text-white"
          }`}
        >
          {isPlaying ? "STOP ⏹" : "PLAY ▶"}
        </button>
        <button
          onClick={handleRainToggle}
          className={`py-1 rounded text-[10px] font-bold shadow active:scale-95 cursor-pointer text-center ${
            isRainOn 
              ? "bg-[#88c5f7] hover:bg-[#88c5f7]/80 text-slate-900" 
              : "bg-slate-700 hover:bg-slate-600 text-slate-400"
          }`}
        >
          RAIN {isRainOn ? "🌧️" : "🔇"}
        </button>
      </div>

    </div>
  );
}
