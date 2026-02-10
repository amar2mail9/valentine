import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Rose, Stars, Music, Sparkles, Quote } from "lucide-react";
import confetti from "canvas-confetti";

const RomanticValentine = () => {
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
  const [isAccepted, setIsAccepted] = useState(false);
  const [elements, setElements] = useState([]);

  // Romantic floating elements (Hearts and Roses)
  useEffect(() => {
    const interval = setInterval(() => {
      setElements((prev) => [
        ...prev.slice(-20),
        {
          id: Date.now(),
          left: Math.random() * 100,
          size: Math.random() * 20 + 20,
          type: Math.random() > 0.5 ? "heart" : "rose",
          duration: Math.random() * 5 + 3,
        },
      ]);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const moveButton = () => {
    const x = Math.random() * (window.innerWidth - 120);
    const y = Math.random() * (window.innerHeight - 60);
    setNoButtonPos({ x, y });
  };

  const handleYes = () => {
    setIsAccepted(true);
    // Extra Fancy Confetti
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const interval = setInterval(function () {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) return clearInterval(interval);
      const particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults,
        particleCount,
        origin: { x: Math.random(), y: Math.random() - 0.2 },
      });
    }, 250);
  };

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-br from-rose-100 via-pink-200 to-red-100 overflow-hidden flex items-center justify-center p-4">
      {/* Floating Background Animation */}
      <AnimatePresence>
        {elements.map((el) => (
          <motion.div
            key={el.id}
            initial={{ y: "110vh", opacity: 0, rotate: 0 }}
            animate={{ y: "-10vh", opacity: [0, 0.7, 0], rotate: 360 }}
            transition={{ duration: el.duration, ease: "easeInOut" }}
            className="absolute pointer-events-none text-rose-400/40"
            style={{ left: `${el.left}%` }}
          >
            {el.type === "heart" ? (
              <Heart size={el.size} fill="currentColor" />
            ) : (
              <Rose size={el.size} />
            )}
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Main Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 max-w-lg w-full bg-white/60 backdrop-blur-xl p-10 rounded-[40px] shadow-[0_20px_50px_rgba(255,182,193,0.5)] border border-white/80 text-center"
      >
        {!isAccepted ? (
          <div className="space-y-8">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <Heart
                className="mx-auto text-red-500"
                size={80}
                fill="#ef4444"
              />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-4xl md:text-5xl font-serif font-bold text-rose-800 leading-tight"
            >
              Every beat of my heart <br />
              <span className="text-red-600">is for you...</span>
            </motion.h1>

            <p className="text-rose-600 text-xl font-medium italic">
              "Do you love me?" 🌹
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mt-10">
              {/* YES BUTTON */}
              <button
                onClick={handleYes}
                className="group relative px-12 py-4 bg-gradient-to-r from-rose-500 to-red-600 text-white font-bold rounded-full text-2xl shadow-xl hover:shadow-rose-300 transform transition-all hover:scale-110 active:scale-95 overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Yes, I do! <Heart size={24} fill="white" />
                </span>
                <motion.div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform" />
              </button>

              {/* NO BUTTON (The Dodger) */}
              <motion.button
                onMouseEnter={moveButton}
                onClick={moveButton}
                animate={{
                  x: noButtonPos.x
                    ? noButtonPos.x - window.innerWidth / 2 + 150
                    : 0,
                  y: noButtonPos.y
                    ? noButtonPos.y - window.innerHeight / 2 + 150
                    : 0,
                }}
                className="px-8 py-3 bg-white/80 text-gray-500 font-semibold rounded-full text-lg border border-rose-200 hover:bg-rose-50"
                style={{
                  position: noButtonPos.x ? "fixed" : "relative",
                  zIndex: 50,
                }}
              >
                No
              </motion.button>
            </div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6 py-10"
          >
            <div className="flex justify-center gap-2 mb-4">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ y: [0, -10, 0] }}
                  transition={{ delay: i * 0.1, repeat: Infinity }}
                >
                  <Stars className="text-yellow-500" fill="#eab308" />
                </motion.div>
              ))}
            </div>

            <h1 className="text-6xl font-extrabold bg-gradient-to-r from-rose-600 to-red-600 bg-clip-text text-transparent">
              My Forever! ❤️
            </h1>

            <div className="p-6 bg-rose-50 rounded-2xl border-dashed border-2 border-rose-200">
              <Quote className="text-rose-300 mb-2" />
              <p className="text-2xl text-rose-700 font-serif italic">
                "You just made me the happiest person alive. Congrate, you are
                my GF now!"
              </p>
            </div>

            <motion.div
              animate={{ scale: [1, 1.2, 1], rotate: [0, 5, -5, 0] }}
              transition={{ repeat: Infinity, duration: 3 }}
              className="text-9xl mt-4"
            >
              💍
            </motion.div>
          </motion.div>
        )}
      </motion.div>

      {/* Decorative Music Icon (Static for vibe) */}
      <div className="absolute bottom-10 right-10 p-4 bg-white/30 backdrop-blur-md rounded-full text-rose-500 animate-pulse">
        <Music size={32} />
      </div>
    </div>
  );
};

export default RomanticValentine;
