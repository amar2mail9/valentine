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

const LuxuryValentineMasterpiece = () => {
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
  const [isAccepted, setIsAccepted] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [currentQuote, setCurrentQuote] = useState(0);
  const audioRef = useRef(null);

  const quotes = [
    "In a world full of trends, you are a classic. ✨",
    "You are the gold in my life. 🏆",
    "Every heartbeat of mine belongs to you. ❤️",
    "Luxury is being with you. 🥂",
    "You are my forever and always. 💍",
  ];

  useEffect(() => {
    const qInterval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length);
    }, 4000);
    return () => clearInterval(qInterval);
  }, []);

  const moveNoButton = () => {
    const x = (Math.random() - 0.5) * (window.innerWidth * 0.6);
    const y = (Math.random() - 0.5) * (window.innerHeight * 0.6);
    setNoButtonPos({ x, y });
  };

  const handleYes = () => {
    setIsAccepted(true);
    const end = Date.now() + 10 * 1000;
    const colors = ["#d4af37", "#ff0000", "#ffffff"];

    (function frame() {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors,
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors,
      });
      if (Date.now() < end) requestAnimationFrame(frame);
    })();
  };

  const toggleMusic = () => {
    if (isMusicPlaying) audioRef.current.pause();
    else audioRef.current.play().catch(() => {});
    setIsMusicPlaying(!isMusicPlaying);
  };

  return (
    <div className="relative min-h-screen w-full bg-[#0a0a0a] flex items-center justify-center overflow-hidden font-serif selection:bg-gold-500/30">
      <audio
        ref={audioRef}
        loop
        src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
      />

      {/* LUXURY BACKGROUND PARTICLES */}
      <div className="absolute inset-0 z-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: -100, x: `${Math.random() * 100}vw`, opacity: 0 }}
            animate={{ y: "110vh", opacity: [0, 0.5, 0], rotate: 360 }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute pointer-events-none"
            style={{ color: i % 2 === 0 ? "#d4af37" : "#9b1c1c" }}
          >
            {i % 3 === 0 ? (
              <Star size={14} fill="currentColor" />
            ) : i % 3 === 1 ? (
              "🌹"
            ) : (
              "❤️"
            )}
          </motion.div>
        ))}
      </div>

      {/* MUSIC TOGGLE */}
      <button
        onClick={toggleMusic}
        className="fixed top-8 right-8 z-50 p-4 rounded-full border border-[#d4af37]/30 bg-black/50 backdrop-blur-xl text-[#d4af37]"
      >
        {isMusicPlaying ? <Volume2 className="animate-pulse" /> : <VolumeX />}
      </button>

      <AnimatePresence mode="wait">
        {!isAccepted ? (
          <motion.div
            key="ask"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, filter: "blur(20px)" }}
            className="relative z-10 w-full max-w-2xl px-6"
          >
            {/* LUXURY CARD */}
            <div className="bg-[#111111] p-12 md:p-20 rounded-[40px] border border-[#d4af37]/20 shadow-[0_0_80px_rgba(212,175,55,0.15)] text-center relative">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="mb-8"
              >
                <div className="relative inline-block">
                  <Crown
                    size={60}
                    className="text-[#d4af37] absolute -top-12 left-1/2 -translate-x-1/2 drop-shadow-[0_0_15px_#d4af37]"
                  />
                  <Heart
                    size={100}
                    fill="#9b1c1c"
                    className="text-[#9b1c1c] drop-shadow-[0_0_30px_#9b1c1c]"
                  />
                </div>
              </motion.div>

              {/* DYNAMIC QUOTE */}
              <AnimatePresence mode="wait">
                <motion.p
                  key={currentQuote}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-[#d4af37] text-xs tracking-[0.4em] uppercase mb-10 h-6 italic"
                >
                  {quotes[currentQuote]}
                </motion.p>
              </AnimatePresence>

              <h1 className="text-5xl md:text-7xl font-black text-white mb-16 tracking-tighter">
                Do you{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] to-[#f9e29b]">
                  love me?
                </span>{" "}
                💍
              </h1>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-12 min-h-[120px]">
                {/* YES BUTTON - GOLD & GLOW */}
                <motion.button
                  onClick={handleYes}
                  whileHover={{
                    scale: 1.1,
                    boxShadow: "0 0 40px rgba(212,175,55,0.4)",
                  }}
                  className="px-16 py-5 bg-gradient-to-r from-[#d4af37] to-[#a68a2d] text-black font-black rounded-full text-2xl shadow-xl flex items-center gap-3 active:scale-95"
                >
                  YES, ALWAYS 🌹
                </motion.button>

                {/* NO BUTTON - THE LUXURY DODGE */}
                <motion.button
                  onMouseEnter={moveNoButton}
                  onClick={moveNoButton}
                  animate={{ x: noButtonPos.x, y: noButtonPos.y }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  className="px-10 py-4 bg-transparent border border-[#d4af37]/20 text-[#d4af37]/40 font-bold rounded-full text-xl hover:text-[#d4af37] transition-all"
                >
                  No 🥀
                </motion.button>
              </div>

              <div className="mt-16 flex justify-center gap-4 text-2xl">
                <span>🥂</span>
                <span>🤴</span>
                <span>👸</span>
                <span>💍</span>
              </div>
            </div>
          </motion.div>
        ) : (
          /* SUCCESS SCREEN - THE ROYAL ANNOUNCEMENT */
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="z-20 text-center space-y-12"
          >
            <div className="relative inline-block">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute inset-[-40px] border-2 border-dashed border-[#d4af37]/30 rounded-full"
              />
              <h1 className="text-8xl md:text-[150px] font-black text-white drop-shadow-[0_0_50px_rgba(212,175,55,0.5)] leading-none">
                MINE! ❤️
              </h1>
            </div>

            <div className="bg-[#111111]/80 backdrop-blur-2xl p-12 rounded-[50px] border border-[#d4af37]/30 max-w-xl mx-4">
              <Quote
                size={40}
                className="text-[#d4af37] mb-6 mx-auto opacity-50"
              />
              <p className="text-3xl text-[#d4af37] font-bold mb-4">
                Congrate! 💍👸
              </p>
              <p className="text-xl text-gray-300 font-light italic leading-relaxed">
                "You are officially my GF now. This is the beginning of our
                golden era together. I promise to love you with all my heart."
              </p>

              <div className="flex justify-center gap-8 mt-10">
                <motion.span
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="text-5xl"
                >
                  🥂
                </motion.span>
                <motion.span
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5, delay: 0.2 }}
                  className="text-5xl"
                >
                  🌹
                </motion.span>
                <motion.span
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5, delay: 0.4 }}
                  className="text-5xl"
                >
                  💝
                </motion.span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* LUXURY GRAIN OVERLAY */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
    </div>
  );
};

export default LuxuryValentineMasterpiece;
