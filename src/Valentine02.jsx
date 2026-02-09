import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

const UltimateValentine = () => {
  const [noButtonPos, setNoButtonPos] = useState({ top: '65%', left: '55%' });
  const [isAccepted, setIsAccepted] = useState(false);
  const [decorations, setDecorations] = useState([]);

  // Falling Roses & Hearts Effect
  useEffect(() => {
    const interval = setInterval(() => {
      setDecorations((prev) => [
        ...prev.slice(-20),
        { 
          id: Date.now(), 
          left: Math.random() * 100, 
          emoji: Math.random() > 0.5 ? '🌹' : '❤️',
          size: Math.random() * 20 + 20,
          duration: Math.random() * 4 + 3 
        }
      ]);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  // Function to move the NO button to a random spot on the screen
  const moveNoButton = () => {
    const randomTop = Math.floor(Math.random() * 80 + 10) + '%';
    const randomLeft = Math.floor(Math.random() * 80 + 10) + '%';
    setNoButtonPos({ top: randomTop, left: randomLeft });
  };

  const handleYes = () => {
    setIsAccepted(true);
    // Big Confetti Blast
    const end = Date.now() + 5 * 1000;
    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#ff0000', '#ff69b4']
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#ff0000', '#ff69b4']
      });
      if (Date.now() < end) requestAnimationFrame(frame);
    };
    frame();
  };

  return (
    <div className="relative min-h-screen w-full bg-[#fff5f7] flex items-center justify-center overflow-hidden font-sans">
      
      {/* Falling Decorations */}
      <AnimatePresence>
        {decorations.map((d) => (
          <motion.div
            key={d.id}
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: '110vh', opacity: [0, 1, 0], rotate: 360 }}
            transition={{ duration: d.duration, ease: "linear" }}
            className="absolute pointer-events-none select-none"
            style={{ left: `${d.left}%`, fontSize: d.size }}
          >
            {d.emoji}
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Main Love Card */}
      {!isAccepted ? (
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="z-10 p-12 bg-white/80 backdrop-blur-lg rounded-[40px] shadow-[0_20px_50px_rgba(255,105,180,0.4)] border-2 border-pink-200 text-center max-w-md w-full mx-4"
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="text-7xl mb-6 inline-block"
          >
            💖
          </motion.div>

          <h1 className="text-4xl md:text-5xl font-black text-rose-600 mb-4 drop-shadow-sm">
            Do you love me? 🥺👉👈
          </h1>
          
          <p className="text-rose-400 font-medium mb-10 italic">
            "You're the missing piece to my heart..."
          </p>

          <div className="flex justify-center items-center gap-8 min-h-[150px]">
            {/* THE YES BUTTON */}
            <button
              onClick={handleYes}
              className="px-10 py-4 bg-gradient-to-r from-red-500 to-pink-600 text-white font-bold rounded-full text-2xl shadow-xl hover:shadow-red-300 transform transition-all hover:scale-110 active:scale-95 flex items-center gap-2"
            >
              YES! <Heart fill="white" size={24} />
            </button>

            {/* THE IMPOSSIBLE NO BUTTON */}
            <motion.button
              onMouseEnter={moveNoButton}
              onClick={moveNoButton}
              animate={{ 
                position: 'fixed',
                top: noButtonPos.top, 
                left: noButtonPos.left 
              }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="px-8 py-3 bg-gray-100 text-gray-400 font-bold rounded-full text-xl border-2 border-gray-200 shadow-sm whitespace-nowrap z-50"
            >
              No ❌
            </motion.button>
          </div>
        </motion.div>
      ) : (
        /* Success Screen */
        <motion.div 
          initial={{ scale: 0 }} 
          animate={{ scale: 1.1 }}
          className="z-20 text-center p-12 bg-white rounded-[60px] shadow-2xl border-8 border-pink-400 max-w-lg mx-4"
        >
          <div className="flex justify-center gap-4 mb-4">
             <Sparkles className="text-yellow-400 animate-pulse" size={40} />
             <h1 className="text-7xl font-black bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
               YAYYY!
             </h1>
             <Sparkles className="text-yellow-400 animate-pulse" size={40} />
          </div>
          
          <p className="text-3xl text-rose-500 font-bold">
            Congrate! You are my GF now! ❤️
          </p>
          
          <motion.div 
            animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.2, 1] }} 
            transition={{ repeat: Infinity, duration: 2 }}
            className="text-9xl my-8"
          >
            👰‍♀️🤴
          </motion.div>
          
          <p className="text-gray-400 italic">"Our forever starts today..."</p>
        </motion.div>
      )}

      {/* Decorative Bottom Roses */}
      <div className="absolute bottom-0 w-full flex justify-between px-10 opacity-40">
        <span className="text-8xl">🌹</span>
        <span className="text-8xl">🌹</span>
      </div>
    </div>
  );
};

export default UltimateValentine;