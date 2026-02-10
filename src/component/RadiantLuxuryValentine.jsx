import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  Sparkles,
  Volume2,
  VolumeX,
  Crown,
  Star,
  Quote,
  Zap,
} from "lucide-react";
import confetti from "canvas-confetti";

const RadiantLuxuryValentine = () => {
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
  const [isAccepted, setIsAccepted] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const audioRef = useRef(null);

  // Track mouse for the spotlight lighting effect
  useEffect(() => {
    const handleMove = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  const moveNoButton = () => {
    const x = (Math.random() - 0.5) * (window.innerWidth * 0.6);
    const y = (Math.random() - 0.5) * (window.innerHeight * 0.6);
    setNoButtonPos({ x, y });
  };

  const handleYes = () => {
    setIsAccepted(true);
    const end = Date.now() + 10 * 1000;
    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ["#d4af37", "#ff0000"],
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ["#d4af37", "#ff0000"],
      });
      if (Date.now() < end) requestAnimationFrame(frame);
    })();
  };

  return (
    <div className="relative min-h-screen w-full bg-[#050505] flex items-center justify-center overflow-hidden font-serif">
      {/* 1. SPOTLIGHT LIGHTING EFFECT */}
      <div
        className="absolute inset-0 pointer-events-none z-10 opacity-50"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(212,175,55,0.15), transparent 80%)`,
        }}
      />

      {/* 2. BACKGROUND BOKEH LIGHTS */}
      <div className="absolute inset-0 z-0">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -100, 0],
              opacity: [0.1, 0.4, 0.1],
              scale: [1, 1.5, 1],
            }}
            transition={{ duration: 5 + Math.random() * 5, repeat: Infinity }}
            className="absolute rounded-full blur-[80px]"
            style={{
              width: Math.random() * 300 + 100 + "px",
              height: Math.random() * 300 + 100 + "px",
              left: Math.random() * 100 + "%",
              top: Math.random() * 100 + "%",
              backgroundColor: i % 2 === 0 ? "#9b1c1c" : "#d4af37",
            }}
          />
        ))}
      </div>

      <audio
        ref={audioRef}
        loop
        src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
      />

      {/* MUSIC CONTROL */}
      <button
        onClick={() => {
          if (isMusicPlaying) audioRef.current.pause();
          else audioRef.current.play();
          setIsMusicPlaying(!isMusicPlaying);
        }}
        className="fixed top-8 right-8 z-50 p-4 rounded-full border border-gold-500/30 bg-black/80 text-[#d4af37] shadow-[0_0_15px_rgba(212,175,55,0.5)]"
      >
        {isMusicPlaying ? <Volume2 className="animate-pulse" /> : <VolumeX />}
      </button>

      <AnimatePresence>
        {!isAccepted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative z-20 w-full max-w-xl p-[2px] rounded-[50px] overflow-hidden"
          >
            {/* 3. ANIMATED LIGHT BORDER */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="absolute inset-[-100%] bg-[conic-gradient(from_0deg,transparent,transparent,#d4af37,transparent,transparent)]"
            />

            <div className="relative bg-[#0a0a0a] p-12 md:p-16 rounded-[48px] text-center">
              <motion.div
                animate={{
                  filter: [
                    "drop-shadow(0 0 10px #9b1c1c)",
                    "drop-shadow(0 0 25px #ff0000)",
                    "drop-shadow(0 0 10px #9b1c1c)",
                  ],
                }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="mb-8 inline-block"
              >
                <Heart size={80} fill="#9b1c1c" className="text-[#9b1c1c]" />
              </motion.div>

              <h2 className="text-[#d4af37] text-xs tracking-[0.5em] uppercase mb-6 flex items-center justify-center gap-2">
                <Zap size={14} /> The Royal Proposal <Zap size={14} />
              </h2>

              <h1 className="text-5xl md:text-6xl font-black text-white mb-12">
                Do you{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-yellow-500 to-yellow-200 animate-shimmer">
                  love me?
                </span>
              </h1>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-10">
                {/* RADIANT YES BUTTON */}
                <motion.button
                  onClick={handleYes}
                  whileHover={{ scale: 1.1, boxShadow: "0 0 50px #d4af37" }}
                  className="px-14 py-5 bg-[#d4af37] text-black font-black rounded-2xl text-2xl shadow-[0_0_20px_rgba(212,175,55,0.6)] flex items-center gap-2"
                >
                  YES, ALWAYS ✨
                </motion.button>

                {/* GHOST NO BUTTON */}
                <motion.button
                  onMouseEnter={moveNoButton}
                  onClick={moveNoButton}
                  animate={{ x: noButtonPos.x, y: noButtonPos.y }}
                  className="px-8 py-3 bg-white/5 border border-white/10 text-white/40 rounded-2xl text-xl hover:text-white"
                >
                  No 🥀
                </motion.button>
              </div>

              <p className="mt-12 text-[#d4af37]/40 text-[10px] tracking-widest italic uppercase">
                "Our love is written in the stars"
              </p>
            </div>
          </motion.div>
        ) : (
          /* SUCCESS SCREEN WITH LIGHT EXPLOSION */
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="z-30 text-center"
          >
            <div className="absolute inset-0 bg-[#d4af37]/10 animate-pulse pointer-events-none" />
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="mb-8"
            >
              <Crown
                size={120}
                className="mx-auto text-[#d4af37] drop-shadow-[0_0_50px_#d4af37]"
              />
            </motion.div>
            <h1 className="text-8xl md:text-[140px] font-black text-white leading-none mb-6">
              MINE. <span className="text-[#d4af37]">💍</span>
            </h1>
            <div className="bg-white/5 backdrop-blur-3xl p-10 rounded-[40px] border border-[#d4af37]/30 max-w-lg mx-4">
              <p className="text-3xl text-[#d4af37] font-bold mb-4">
                It's Official! ❤️👸
              </p>
              <p className="text-gray-300 italic">
                "Congrate, you are my GF now. Let's shine together forever."
              </p>
              <div className="flex justify-center gap-6 mt-8">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="text-[#d4af37] animate-pulse"
                    style={{ animationDelay: `${i * 0.2}s` }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        @keyframes shimmer {
          0% {
            background-position: -200% center;
          }
          100% {
            background-position: 200% center;
          }
        }
        .animate-shimmer {
          background-size: 200% auto;
          animation: shimmer 3s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default RadiantLuxuryValentine;
