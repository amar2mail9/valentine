import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  Sparkles,
  Volume2,
  VolumeX,
  Ghost,
  Star,
  Rose,
} from "lucide-react";
import confetti from "canvas-confetti";

const MasterpieceValentine = () => {
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
  const [isAccepted, setIsAccepted] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const audioRef = useRef(null);

  // Background Music Toggle
  const toggleMusic = () => {
    if (isMusicPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current
        .play()
        .catch(() => console.log("User interaction needed"));
    }
    setIsMusicPlaying(!isMusicPlaying);
  };

  const moveNoButton = () => {
    const x = (Math.random() - 0.5) * (window.innerWidth * 0.7);
    const y = (Math.random() - 0.5) * (window.innerHeight * 0.7);
    setNoButtonPos({ x, y });
  };

  const handleYes = () => {
    setIsAccepted(true);
    const scalar = 2;
    const heart = confetti.shapeFromPath({
      path: "M167 430c-75-60-167-156-167-243 0-82 65-147 147-147 45 0 85 22 110 57 25-35 65-57 110-57 82 0 147 65 147 147 0 87-92 183-167 243l-90 70-90-70z",
    });

    confetti({
      shapes: [heart],
      particleCount: 150,
      spread: 160,
      scalar,
      colors: ["#ff0000", "#ff69b4", "#ffffff"],
    });
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden font-sans bg-[#0f0205]">
      {/* Background Music */}
      <audio
        ref={audioRef}
        loop
        src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
      />

      {/* Dynamic Mesh Gradient Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-rose-900/40 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[70%] h-[70%] bg-pink-900/30 rounded-full blur-[120px] animate-pulse delay-1000" />
      </div>

      {/* Floating Particles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ y: "110vh", x: Math.random() * 100 + "vw" }}
          animate={{ y: "-10vh" }}
          transition={{
            duration: 5 + Math.random() * 5,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute text-rose-500/20 pointer-events-none"
        >
          <Heart size={Math.random() * 30 + 10} fill="currentColor" />
        </motion.div>
      ))}

      {/* UI Elements */}
      <button
        onClick={toggleMusic}
        className="fixed top-8 right-8 z-50 p-4 bg-white/5 backdrop-blur-2xl rounded-2xl border border-white/10 text-white hover:bg-white/20 transition-all shadow-xl"
      >
        {isMusicPlaying ? (
          <Volume2 size={24} className="animate-pulse" />
        ) : (
          <VolumeX size={24} />
        )}
      </button>

      <AnimatePresence>
        {!isAccepted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.2, filter: "blur(20px)" }}
            className="relative z-10 w-full max-w-xl px-6"
          >
            {/* The Luxury Card */}
            <div className="relative group overflow-hidden bg-white/5 backdrop-blur-3xl p-12 rounded-[50px] border border-white/10 shadow-[0_30px_100px_rgba(0,0,0,0.5)] text-center">
              {/* Card Inner Glow */}
              <div className="absolute -top-24 -left-24 w-48 h-48 bg-rose-500/20 blur-3xl group-hover:bg-rose-500/40 transition-all duration-700" />

              <motion.div
                animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="mb-8"
              >
                <div className="relative inline-block">
                  <Heart
                    size={100}
                    fill="url(#grad)"
                    className="drop-shadow-[0_0_25px_rgba(255,20,147,0.6)]"
                  />
                  <svg width="0" height="0">
                    <linearGradient
                      id="grad"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#ff1493" />
                      <stop offset="100%" stopColor="#8b0000" />
                    </linearGradient>
                  </svg>
                  <Sparkles
                    className="absolute -top-4 -right-4 text-yellow-400 animate-spin-slow"
                    size={32}
                  />
                </div>
              </motion.div>

              <h2 className="text-rose-400 font-medium tracking-[0.3em] uppercase text-xs mb-4">
                You are my today & all of my tomorrows
              </h2>
              <h1 className="text-5xl md:text-7xl font-black text-white mb-12 tracking-tighter leading-tight">
                Do you{" "}
                <span className="bg-gradient-to-r from-rose-400 to-red-600 bg-clip-text text-transparent">
                  love me?
                </span>
              </h1>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-10">
                {/* YES BUTTON */}
                <motion.button
                  onClick={handleYes}
                  whileHover={{
                    scale: 1.1,
                    boxShadow: "0 0 50px rgba(255, 20, 147, 0.5)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="px-16 py-6 bg-gradient-to-r from-rose-600 to-red-700 text-white font-bold rounded-3xl text-3xl shadow-2xl flex items-center gap-4 relative group overflow-hidden"
                >
                  <span className="relative z-10">YES! ❤️</span>
                  <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500" />
                </motion.button>

                {/* THE GHOST NO BUTTON */}
                <motion.button
                  onMouseEnter={moveNoButton}
                  onClick={moveNoButton}
                  animate={{ x: noButtonPos.x, y: noButtonPos.y }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  className="px-10 py-4 bg-white/5 border border-white/10 text-white/30 font-bold rounded-2xl text-xl hover:bg-white/10 hover:text-white/60 transition-all backdrop-blur-md"
                >
                  No Way <Ghost size={20} className="inline ml-2" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        ) : (
          /* CELEBRATION SCREEN */
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="z-20 text-center max-w-2xl px-4"
          >
            <div className="relative mb-12">
              <div className="absolute inset-0 bg-red-600 blur-[120px] opacity-40 animate-pulse" />
              <motion.h1
                animate={{ y: [0, -20, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="text-8xl md:text-[150px] font-black text-white drop-shadow-[0_10px_30px_rgba(255,0,0,0.5)]"
              >
                YAYYY!
              </motion.h1>
            </div>

            <div className="bg-white/10 p-10 rounded-[40px] border border-white/20 backdrop-blur-2xl shadow-2xl">
              <p className="text-4xl text-rose-300 font-bold mb-4">
                Congrate! 💍
              </p>
              <p className="text-2xl text-gray-300 font-light italic">
                "You just made me the luckiest person in the world. You are my
                GF now! ❤️"
              </p>

              <div className="flex justify-center gap-8 mt-10">
                <Rose size={40} className="text-red-500 animate-bounce" />
                <Star size={40} className="text-yellow-400 animate-pulse" />
                <Heart
                  size={40}
                  className="text-rose-500 animate-bounce delay-100"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Luxury Dust Overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dust.png')] opacity-10 mix-blend-overlay" />
    </div>
  );
};

export default MasterpieceValentine;
