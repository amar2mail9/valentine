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
} from "lucide-react";
import confetti from "canvas-confetti";

const MagicalLoveValentine = () => {
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
  const [isAccepted, setIsAccepted] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState([]);
  const audioRef = useRef(null);

  // Particle System for Roses and Hearts
  useEffect(() => {
    const interval = setInterval(() => {
      setParticles((prev) => [
        ...prev.slice(-30),
        {
          id: Date.now(),
          left: Math.random() * 100,
          type: Math.random() > 0.5 ? "🌹" : "💖",
          size: Math.random() * 20 + 20,
          duration: Math.random() * 5 + 5,
        },
      ]);
    }, 600);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleMove = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  const moveNoButton = () => {
    const x = (Math.random() - 0.5) * (window.innerWidth * 0.5);
    const y = (Math.random() - 0.5) * (window.innerHeight * 0.5);
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
        colors: ["#ff0055", "#ffb3c1"],
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ["#ff0055", "#ffb3c1"],
      });
      if (Date.now() < end) requestAnimationFrame(frame);
    })();
  };

  return (
    <div className="relative min-h-screen w-full bg-[#1a0208] flex items-center justify-center overflow-hidden font-serif selection:bg-pink-500/30">
      {/* 1. ROMANTIC AMBIENT LIGHTING */}
      <div
        className="absolute inset-0 pointer-events-none z-10 opacity-60"
        style={{
          background: `radial-gradient(800px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255,20,147,0.15), transparent 80%)`,
        }}
      />

      {/* 2. FLOATING ROSES & HEARTS */}
      <AnimatePresence>
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ y: "110vh", x: `${p.left}vw`, opacity: 0, rotate: 0 }}
            animate={{ y: "-10vh", opacity: [0, 1, 1, 0], rotate: 360 }}
            transition={{ duration: p.duration, ease: "linear" }}
            className="absolute pointer-events-none z-0"
            style={{ fontSize: p.size }}
          >
            {p.type}
          </motion.div>
        ))}
      </AnimatePresence>

      <audio
        ref={audioRef}
        loop
        src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
      />

      {/* MUSIC CONTROL */}
      <div className="fixed top-8 right-8 z-50 flex gap-4">
        <button
          onClick={() => {
            if (isMusicPlaying) audioRef.current.pause();
            else audioRef.current.play();
            setIsMusicPlaying(!isMusicPlaying);
          }}
          className="p-4 rounded-full border border-pink-500/30 bg-black/40 text-pink-500 shadow-[0_0_20px_rgba(255,20,147,0.4)] backdrop-blur-md"
        >
          {isMusicPlaying ? <Volume2 className="animate-pulse" /> : <VolumeX />}
        </button>
      </div>

      <AnimatePresence mode="wait">
        {!isAccepted ? (
          <motion.div
            key="question"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, filter: "blur(20px)" }}
            className="relative z-20 w-full max-w-lg p-[3px] rounded-[60px] bg-gradient-to-b from-pink-500 via-transparent to-pink-600 shadow-[0_0_50px_rgba(255,20,147,0.3)]"
          >
            <div className="relative bg-[#120106]/95 backdrop-blur-3xl p-10 md:p-16 rounded-[58px] text-center overflow-hidden">
              {/* Decorative Corner Roses from Image */}
              <div className="absolute top-[-10px] left-[-10px] text-6xl opacity-30 blur-[2px]">
                🌹
              </div>
              <div className="absolute bottom-[-10px] right-[-10px] text-6xl opacity-30 blur-[2px]">
                🌹
              </div>

              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  filter: [
                    "drop-shadow(0 0 5px #ff0055)",
                    "drop-shadow(0 0 20px #ff0055)",
                    "drop-shadow(0 0 5px #ff0055)",
                  ],
                }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="mb-8 inline-block p-4 bg-pink-500/10 rounded-3xl border border-pink-500/20"
              >
                <Heart size={80} fill="#ff0055" className="text-[#ff0055]" />
              </motion.div>

              <h2 className="text-pink-400 text-[10px] tracking-[0.5em] uppercase mb-4 opacity-70">
                My Magical Love
              </h2>

              <h1 className="text-5xl md:text-6xl font-black text-white mb-8 leading-tight">
                Do you{" "}
                <span className="text-pink-500 drop-shadow-[0_0_10px_#ff0055]">
                  love
                </span>{" "}
                me?
              </h1>

              <p className="text-pink-200/50 italic text-sm mb-12 px-4 leading-relaxed">
                “Every star in the sky whispers your name.”
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-10 min-h-[120px]">
                {/* YES BUTTON */}
                <motion.button
                  onClick={handleYes}
                  whileHover={{ scale: 1.1, boxShadow: "0 0 40px #ff0055" }}
                  className="px-14 py-5 bg-gradient-to-r from-pink-500 to-rose-600 text-white font-black rounded-2xl text-2xl shadow-xl flex items-center gap-2"
                >
                  YES <Sparkles size={20} />
                </motion.button>

                {/* NO BUTTON */}
                <motion.button
                  onMouseEnter={moveNoButton}
                  onClick={moveNoButton}
                  animate={{ x: noButtonPos.x, y: noButtonPos.y }}
                  transition={{ type: "spring", stiffness: 500, damping: 15 }}
                  className="px-8 py-3 bg-white/5 border border-white/10 text-white/40 rounded-2xl text-xl hover:text-white"
                >
                  No 🥀
                </motion.button>
              </div>
            </div>
          </motion.div>
        ) : (
          /* SUCCESS SCREEN */
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="z-30 text-center px-4"
          >
            <div className="relative inline-block mb-10">
              <div className="absolute inset-0 bg-pink-600 blur-[120px] opacity-40 animate-pulse" />
              <h1 className="text-8xl md:text-[140px] font-black text-white leading-none drop-shadow-[0_0_50px_#ff0055]">
                MINE. <span className="text-pink-500">💍</span>
              </h1>
            </div>

            <div className="bg-white/5 backdrop-blur-3xl p-10 rounded-[50px] border border-pink-500/30 max-w-xl mx-auto shadow-2xl">
              <Crown className="mx-auto text-pink-500 mb-6" size={60} />
              <p className="text-3xl text-pink-400 font-bold mb-4">
                Official GF! ❤️🤴
              </p>
              <p className="text-gray-300 italic text-lg leading-relaxed">
                "You just made me the luckiest person in the world. Let's write
                our own fairy tale together."
              </p>
              <div className="flex justify-center gap-8 mt-10 text-4xl">
                <motion.span
                  animate={{ y: [0, -15, 0] }}
                  transition={{ repeat: Infinity, duration: 1 }}
                >
                  🌹
                </motion.span>
                <motion.span
                  animate={{ y: [0, -15, 0] }}
                  transition={{ repeat: Infinity, duration: 1, delay: 0.2 }}
                >
                  💖
                </motion.span>
                <motion.span
                  animate={{ y: [0, -15, 0] }}
                  transition={{ repeat: Infinity, duration: 1, delay: 0.4 }}
                >
                  💍
                </motion.span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        @keyframes rose-float {
          0% {
            transform: translateY(0) rotate(0);
          }
          100% {
            transform: translateY(-100vh) rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default MagicalLoveValentine;
