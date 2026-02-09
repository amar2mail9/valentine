import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Volume2, VolumeX, Sparkles, Music, Mic2 } from "lucide-react";
import confetti from "canvas-confetti";

const LuxuryValentine = () => {
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
  const [isAccepted, setIsAccepted] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const audioRef = useRef(null);

  // Play music after first interaction (browser policy)
  const toggleMusic = () => {
    if (isMusicPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current
        .play()
        .catch((e) => console.log("Music ready after click!"));
    }
    setIsMusicPlaying(!isMusicPlaying);
  };

  const moveButton = () => {
    // Moves within the viewport with a slight padding
    const x = (Math.random() - 0.5) * (window.innerWidth - 200);
    const y = (Math.random() - 0.5) * (window.innerHeight - 200);
    setNoButtonPos({ x, y });
  };

  const handleYes = () => {
    setIsAccepted(true);
    const end = Date.now() + 10 * 1000;
    const colors = ["#ff0055", "#ffb3c1", "#ffffff", "#ffd700"];

    (function frame() {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors,
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors,
      });
      if (Date.now() < end) requestAnimationFrame(frame);
    })();
  };

  return (
    <div className="relative min-h-screen w-full bg-[#0a0506] flex items-center justify-center overflow-hidden font-serif selection:bg-rose-500/30">
      {/* Background Music (Use a direct link to a romantic MP3) */}
      <audio
        ref={audioRef}
        loop
        src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" // Replace with your romantic MP3 link
      />

      {/* Luxury Background Animation */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-rose-900/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-red-900/20 rounded-full blur-[120px] animate-pulse delay-700" />
      </div>

      {/* Music Toggle UI */}
      <button
        onClick={toggleMusic}
        className="fixed top-6 right-6 z-50 p-4 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-white hover:bg-rose-500/20 transition-all"
      >
        {isMusicPlaying ? <Volume2 className="animate-bounce" /> : <VolumeX />}
      </button>

      <AnimatePresence>
        {!isAccepted ? (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative z-10 w-full max-w-lg p-[2px] rounded-[40px] bg-gradient-to-br from-rose-500 via-transparent to-red-600 shadow-2xl"
          >
            <div className="bg-[#12080a]/90 backdrop-blur-3xl p-12 rounded-[38px] text-center">
              <motion.div
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="mb-8 relative inline-block"
              >
                <div className="absolute inset-0 bg-rose-500 blur-3xl opacity-30 animate-pulse" />
                <Heart
                  size={100}
                  fill="url(#grad1)"
                  className="relative z-10"
                />
                <svg width="0" height="0">
                  <linearGradient
                    id="grad1"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop
                      offset="0%"
                      style={{ stopColor: "#ff0055", stopOpacity: 1 }}
                    />
                    <stop
                      offset="100%"
                      style={{ stopColor: "#8b0000", stopOpacity: 1 }}
                    />
                  </linearGradient>
                </svg>
              </motion.div>

              <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400 mb-4">
                Do you love me?
              </h1>
              <p className="text-rose-400/80 tracking-[0.2em] uppercase text-xs mb-12">
                Every second is a lifetime without you
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-12 min-h-[100px]">
                {/* THE YES BUTTON */}
                <motion.button
                  onClick={handleYes}
                  whileHover={{ scale: 1.05, boxShadow: "0 0 30px #ff0055" }}
                  className="px-16 py-5 bg-gradient-to-r from-rose-600 to-red-700 text-white font-bold rounded-2xl text-2xl shadow-xl flex items-center gap-3"
                >
                  YES <Sparkles size={20} />
                </motion.button>

                {/* THE IMPOSSIBLE NO BUTTON */}
                <motion.button
                  onMouseEnter={moveButton}
                  onClick={moveButton}
                  animate={{ x: noButtonPos.x, y: noButtonPos.y }}
                  transition={{ type: "spring", stiffness: 600, damping: 20 }}
                  className="px-10 py-4 bg-white/5 border border-white/10 text-white/40 font-semibold rounded-2xl text-xl hover:text-white hover:border-white/30 transition-colors"
                >
                  No 🥀
                </motion.button>
              </div>
            </div>
          </motion.div>
        ) : (
          /* SUCCESS SCREEN */
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="z-20 text-center space-y-8"
          >
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-red-600 blur-[100px] opacity-40 animate-pulse" />
              <h1 className="text-8xl md:text-9xl font-black text-white drop-shadow-2xl">
                MINE! ❤️
              </h1>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="bg-white/5 p-8 rounded-3xl border border-white/10 backdrop-blur-md"
            >
              <p className="text-3xl text-rose-300 font-light italic">
                "Congrate, you are officially my GF now!"
              </p>
              <div className="flex justify-center gap-6 mt-6">
                <Music className="text-rose-500 animate-spin-slow" />
                <Sparkles className="text-yellow-400 animate-pulse" />
                <Heart className="text-red-500 animate-bounce" />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Decorative Overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dust.png')] opacity-20" />
    </div>
  );
};

export default LuxuryValentine;
