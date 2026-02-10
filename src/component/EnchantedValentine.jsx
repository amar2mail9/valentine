import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles, Volume2, VolumeX } from "lucide-react";
import confetti from "canvas-confetti";

const EnchantedValentine = () => {
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
  const [yesScale, setYesScale] = useState(1);
  const [isAccepted, setIsAccepted] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [particles, setParticles] = useState([]);
  const audioRef = useRef(null);

  // 1. Generate Constant Rain of Roses and Hearts
  useEffect(() => {
    const interval = setInterval(() => {
      setParticles((prev) => [
        ...prev.slice(-40), // Keep max 40 particles for performance
        {
          id: Date.now(),
          left: Math.random() * 100,
          type: Math.random() > 0.4 ? "rose" : "heart",
          size: Math.random() * 25 + 15,
          duration: Math.random() * 5 + 5,
          delay: Math.random() * 2,
        },
      ]);
    }, 300);
    return () => clearInterval(interval);
  }, []);

  const toggleMusic = () => {
    if (isMusicPlaying) audioRef.current.pause();
    else audioRef.current.play().catch(() => {});
    setIsMusicPlaying(!isMusicPlaying);
  };

  const moveNoButton = () => {
    const x = (Math.random() - 0.5) * (window.innerWidth * 0.7);
    const y = (Math.random() - 0.5) * (window.innerHeight * 0.7);
    setNoButtonPos({ x, y });
    setYesScale((prev) => prev + 0.1); // Make YES bigger every time she tries to click NO
  };

  const handleYes = () => {
    setIsAccepted(true);
    // Infinite Heart Cannon
    const end = Date.now() + 15 * 1000;
    (function frame() {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ["#ff0000", "#ff69b4"],
        shapes: ["heart"],
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ["#ff0000", "#ff69b4"],
        shapes: ["heart"],
      });
      if (Date.now() < end) requestAnimationFrame(frame);
    })();
  };

  return (
    <div className="relative min-h-screen w-full bg-[#1e0204] flex items-center justify-center overflow-hidden font-serif select-none">
      <audio
        ref={audioRef}
        loop
        src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
      />

      {/* BACKGROUND PARTICLES: ROSES & HEARTS */}
      <AnimatePresence>
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ y: -100, x: `${p.left}vw`, opacity: 0, rotate: 0 }}
            animate={{ y: "110vh", opacity: [0, 1, 1, 0], rotate: 720 }}
            transition={{
              duration: p.duration,
              ease: "linear",
              delay: p.delay,
            }}
            className="absolute pointer-events-none z-0"
            style={{ fontSize: p.size }}
          >
            {p.type === "rose" ? "🌹" : "❤️"}
          </motion.div>
        ))}
      </AnimatePresence>

      {/* MUSIC CONTROL */}
      <button
        onClick={toggleMusic}
        className="fixed top-6 right-6 z-50 p-4 rounded-full bg-white/10 backdrop-blur-lg border border-red-500/30 text-red-500 shadow-[0_0_20px_rgba(255,0,0,0.3)]"
      >
        {isMusicPlaying ? <Volume2 className="animate-pulse" /> : <VolumeX />}
      </button>

      <AnimatePresence>
        {!isAccepted ? (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative z-10 w-full max-w-lg px-4"
          >
            {/* THE LUXURY BOX */}
            <div className="bg-gradient-to-b from-[#3a0509] to-[#1e0204] p-10 md:p-16 rounded-[60px] border-2 border-red-500/20 shadow-[0_0_100px_rgba(255,0,0,0.4)] text-center relative overflow-hidden">
              {/* Decorative Corner Roses */}
              <div className="absolute top-0 left-0 text-5xl opacity-40 rotate-[-45deg] translate-x-[-10px] translate-y-[-10px]">
                🌹
              </div>
              <div className="absolute bottom-0 right-0 text-5xl opacity-40 rotate-[135deg] translate-x-[10px] translate-y-[10px]">
                🌹
              </div>

              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 1 }}
                className="mb-6 inline-block"
              >
                <Heart
                  size={80}
                  fill="#ff0000"
                  className="text-red-600 drop-shadow-[0_0_30px_#ff0000]"
                />
              </motion.div>

              <h2 className="text-red-400 uppercase tracking-[0.4em] text-[10px] mb-4">
                Forever & Always
              </h2>

              <h1 className="text-5xl font-black text-white mb-10 leading-tight">
                Do you <span className="text-red-600 animate-pulse">love</span>{" "}
                me? <br /> 🌹❤️🌹
              </h1>

              <div className="flex flex-col gap-8 items-center justify-center min-h-[160px]">
                {/* YES BUTTON - IT GROWS! */}
                <motion.button
                  onClick={handleYes}
                  animate={{ scale: yesScale }}
                  whileHover={{ scale: yesScale + 0.1 }}
                  className="px-16 py-6 bg-red-600 text-white font-bold rounded-full text-3xl shadow-[0_15px_40px_rgba(255,0,0,0.5)] z-20 flex items-center gap-3 active:scale-95 transition-shadow"
                >
                  YES <Sparkles />
                </motion.button>

                {/* THE TELEPORTING NO BUTTON */}
                <motion.button
                  onMouseEnter={moveNoButton}
                  onClick={moveNoButton}
                  animate={{ x: noButtonPos.x, y: noButtonPos.y }}
                  transition={{ type: "spring", stiffness: 500, damping: 15 }}
                  className="px-8 py-3 bg-white/5 border border-white/10 text-white/30 rounded-xl text-lg hover:text-white transition-colors cursor-not-allowed"
                >
                  No Way 🥀
                </motion.button>
              </div>
            </div>
          </motion.div>
        ) : (
          /* SUCCESS CELEBRATION */
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="z-20 text-center"
          >
            <div className="relative inline-block mb-10">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                className="absolute inset-[-50px] border-4 border-dashed border-red-500/30 rounded-full"
              />
              <h1 className="text-8xl md:text-[160px] font-black text-white drop-shadow-[0_0_50px_#ff0000]">
                MINE!
              </h1>
            </div>

            <div className="bg-white/10 backdrop-blur-2xl p-12 rounded-[50px] border border-red-500/30 max-w-xl mx-4">
              <p className="text-4xl text-red-500 font-bold mb-4">
                Congrats! 💍
              </p>
              <p className="text-2xl text-gray-200 font-light italic leading-relaxed">
                "You are officially my GF now. I'll fill every day with roses
                just for you."
              </p>

              <div className="flex justify-center gap-10 mt-10">
                <span className="text-6xl animate-bounce">🌹</span>
                <span className="text-6xl animate-bounce delay-100">❤️</span>
                <span className="text-6xl animate-bounce delay-200">🌹</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* DARK OVERLAY FOR DEPTH */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black via-transparent to-black opacity-60" />
    </div>
  );
};

export default EnchantedValentine;
