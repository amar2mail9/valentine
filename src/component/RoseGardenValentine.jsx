import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles, Volume2, VolumeX, Quote } from "lucide-react";
import confetti from "canvas-confetti";

const RoseGardenValentine = () => {
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
  const [isAccepted, setIsAccepted] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [roses, setRoses] = useState([]);
  const audioRef = useRef(null);

  // Generate continuous rain of Roses and Hearts
  useEffect(() => {
    const interval = setInterval(() => {
      setRoses((prev) => [
        ...prev.slice(-35), // Limit to 35 for performance
        {
          id: Date.now(),
          left: Math.random() * 100,
          type: Math.random() > 0.4 ? "🌹" : "💖",
          size: Math.random() * 40 + 20,
          duration: Math.random() * 6 + 4,
          delay: Math.random() * 2,
          blur: Math.random() > 0.8 ? "blur(4px)" : "none", // Some roses are out of focus
        },
      ]);
    }, 400);
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
    <div className="relative min-h-screen w-full bg-[#0d0103] flex items-center justify-center overflow-hidden font-serif">
      {/* 1. BACKGROUND MUSIC */}
      <audio
        ref={audioRef}
        loop
        src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
      />

      {/* 2. REALISTIC ROSE BLIZZARD LAYER */}
      <AnimatePresence>
        {roses.map((r) => (
          <motion.div
            key={r.id}
            initial={{ y: -100, x: `${r.left}vw`, opacity: 0, rotate: 0 }}
            animate={{ y: "110vh", opacity: [0, 1, 1, 0], rotate: 360 }}
            transition={{
              duration: r.duration,
              ease: "linear",
              delay: r.delay,
            }}
            className="absolute pointer-events-none z-0 select-none"
            style={{ fontSize: r.size, filter: r.blur }}
          >
            <div className="drop-shadow-[0_0_10px_rgba(255,0,85,0.4)]">
              {r.type}
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* 3. MOUSE SPOTLIGHT (Romantic Pink) */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background: `radial-gradient(700px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255,0,85,0.12), transparent 85%)`,
        }}
      />

      {/* 4. MUSIC CONTROL UI */}
      <button
        onClick={() => {
          if (isMusicPlaying) audioRef.current.pause();
          else audioRef.current.play();
          setIsMusicPlaying(!isMusicPlaying);
        }}
        className="fixed top-8 right-8 z-50 p-4 rounded-full border border-pink-500/30 bg-black/50 text-pink-500 shadow-[0_0_20px_rgba(255,0,85,0.4)] backdrop-blur-xl hover:scale-110 transition-transform"
      >
        {isMusicPlaying ? <Volume2 className="animate-pulse" /> : <VolumeX />}
      </button>

      <AnimatePresence mode="wait">
        {!isAccepted ? (
          <motion.div
            key="proposal"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.2, filter: "blur(20px)" }}
            className="relative z-20 w-full max-w-lg p-[3px] rounded-[60px] bg-gradient-to-b from-pink-600 via-transparent to-rose-900"
          >
            {/* LUXURY MAIN CARD */}
            <div className="relative bg-[#1a0105]/95 backdrop-blur-3xl p-10 md:p-16 rounded-[58px] text-center border border-white/5">
              {/* Corner Rose Decorations */}
              <div className="absolute top-[-20px] left-[-20px] text-7xl opacity-50 select-none">
                🌹
              </div>
              <div className="absolute bottom-[-20px] right-[-20px] text-7xl opacity-50 select-none">
                🌹
              </div>

              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  filter: [
                    "drop-shadow(0 0 10px #ff0055)",
                    "drop-shadow(0 0 30px #ff0055)",
                    "drop-shadow(0 0 10px #ff0055)",
                  ],
                }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="mb-8 inline-block"
              >
                <Heart size={90} fill="#ff0055" className="text-pink-600" />
              </motion.div>

              <h2 className="text-pink-400 text-[10px] tracking-[0.6em] uppercase mb-4 opacity-80">
                My Magical Love
              </h2>

              <h1 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter leading-tight">
                Do you{" "}
                <span className="text-pink-600 underline decoration-wavy">
                  love
                </span>{" "}
                me?
              </h1>

              <div className="bg-pink-500/5 p-6 rounded-3xl border border-pink-500/10 mb-10 relative">
                <Quote
                  size={20}
                  className="text-pink-500/30 absolute top-[-10px] left-[-10px]"
                />
                <p className="text-pink-200/60 italic text-sm md:text-md px-4 leading-relaxed">
                  “Every star far of the sky whispers your name. You are my only
                  desire.”
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-12 min-h-[120px]">
                {/* YES BUTTON */}
                <motion.button
                  onClick={handleYes}
                  whileHover={{ scale: 1.15, boxShadow: "0 0 50px #ff0055" }}
                  whileTap={{ scale: 0.95 }}
                  className="px-16 py-6 bg-gradient-to-r from-pink-600 to-rose-700 text-white font-bold rounded-2xl text-3xl shadow-2xl flex items-center gap-3"
                >
                  YES ❤️
                </motion.button>

                {/* THE "NO" BUTTON (DOESN'T WANT TO BE CLICKED) */}
                <motion.button
                  onMouseEnter={moveNoButton}
                  onClick={moveNoButton}
                  animate={{ x: noButtonPos.x, y: noButtonPos.y }}
                  transition={{ type: "spring", stiffness: 600, damping: 20 }}
                  className="px-10 py-4 bg-white/5 border border-white/10 text-white/30 rounded-2xl text-xl hover:text-white"
                >
                  No 🥀
                </motion.button>
              </div>
            </div>
          </motion.div>
        ) : (
          /* SUCCESS SCREEN */
          <motion.div
            key="accepted"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="z-30 text-center px-4"
          >
            <div className="relative inline-block mb-10">
              <div className="absolute inset-0 bg-pink-600 blur-[150px] opacity-30 animate-pulse" />
              <h1 className="text-8xl md:text-[180px] font-black text-white leading-none drop-shadow-[0_0_80px_#ff0055]">
                MINE. <span className="text-pink-500">💍</span>
              </h1>
            </div>

            <div className="bg-white/5 backdrop-blur-3xl p-12 rounded-[60px] border border-pink-500/30 max-w-2xl mx-auto shadow-2xl">
              <Sparkles className="mx-auto text-pink-500 mb-6" size={50} />
              <h2 className="text-4xl text-pink-400 font-bold mb-6 italic underline decoration-pink-800">
                Congrats! My GF ❤️
              </h2>
              <p className="text-2xl text-gray-200 font-light italic leading-relaxed px-6">
                "Today marks the beginning of our forever. I promise to cherish
                every second with you."
              </p>
              <div className="flex justify-center gap-10 mt-12 text-5xl">
                <motion.span
                  animate={{ y: [0, -20, 0] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  🌹
                </motion.span>
                <motion.span
                  animate={{ y: [0, -20, 0] }}
                  transition={{ repeat: Infinity, duration: 2, delay: 0.3 }}
                >
                  💝
                </motion.span>
                <motion.span
                  animate={{ y: [0, -20, 0] }}
                  transition={{ repeat: Infinity, duration: 2, delay: 0.6 }}
                >
                  💍
                </motion.span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* LUXURY OVERLAY TEXTURE */}
      <div className="pointer-events-none absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dust.png')] opacity-20 mix-blend-overlay" />
    </div>
  );
};

export default RoseGardenValentine;
