import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Rose, Sparkles, UtensilsCrossed as RoseIcon } from 'lucide-react';
import confetti from 'canvas-confetti';

const FinalValentine = () => {
  const [noButtonPos, setNoButtonPos] = useState({ top: '60%', left: '60%' });
  const [isAccepted, setIsAccepted] = useState(false);
  const [petals, setPetals] = useState([]);

  // Falling Rose Petals Effect
  useEffect(() => {
    const interval = setInterval(() => {
      setPetals((prev) => [
        ...prev.slice(-25),
        { 
          id: Date.now(), 
          left: Math.random() * 100, 
          rotation: Math.random() * 360,
          size: Math.random() * 15 + 15 
        }
      ]);
    }, 400);
    return () => clearInterval(interval);
  }, []);

  const teleportButton = () => {
    const randomTop = Math.floor(Math.random() * 80 + 10) + '%';
    const randomLeft = Math.floor(Math.random() * 80 + 10) + '%';
    setNoButtonPos({ top: randomTop, left: randomLeft });
  };

  const handleYes = () => {
    setIsAccepted(true);
    const end = Date.now() + 3 * 1000;
    const colors = ['#ff0000', '#ff69b4', '#ffffff'];

    (function frame() {
      confetti({ particleCount: 3, angle: 60, spread: 55, origin: { x: 0 }, colors });
      confetti({ particleCount: 3, angle: 120, spread: 55, origin: { x: 1 }, colors });
      if (Date.now() < end) requestAnimationFrame(frame);
    }());
  };

  return (
    <div className="relative min-h-screen w-full bg-[#fff0f3] overflow-hidden flex items-center justify-center">
      
      {/* Falling Petals Background */}
      {petals.map((p) => (
        <motion.div
          key={p.id}
          initial={{ y: -50, opacity: 0, rotate: 0 }}
          animate={{ y: '110vh', opacity: [0, 1, 0], rotate: p.rotation + 360 }}
          transition={{ duration: 6, ease: "linear" }}
          className="absolute pointer-events-none text-red-400/30"
          style={{ left: `${p.left}%` }}
        >
          <div style={{ fontSize: p.size }}>🌹</div>
        </motion.div>
      ))}

      {/* Main UI Card */}
      <AnimatePresence>
        {!isAccepted ? (
          <motion.div 
            exit={{ scale: 0, opacity: 0 }}
            className="z-10 text-center p-10 bg-white/70 backdrop-blur-2xl rounded-[50px] shadow-[0_0_100px_rgba(255,105,180,0.3)] border-4 border-pink-100 max-w-sm w-full mx-4"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="mb-6 inline-block"
            >
              <Heart size={100} fill="#ff4d6d" className="text-red-500 drop-shadow-[0_0_15px_rgba(255,77,109,0.5)]" />
            </motion.div>

            <h2 className="text-3xl font-bold text-rose-700 mb-2">My Dearest...</h2>
            <h1 className="text-5xl font-extrabold text-red-600 mb-8 drop-shadow-sm leading-tight">
              Do you <br/> love me? 💍
            </h1>

            <div className="flex flex-col items-center gap-4">
              {/* YES BUTTON - Stable and Glowing */}
              <button
                onClick={handleYes}
                className="w-full py-5 bg-gradient-to-r from-red-500 to-pink-600 text-white font-black rounded-2xl text-3xl shadow-[0_10px_30px_rgba(255,77,109,0.4)] hover:scale-105 transition-transform active:scale-95 flex items-center justify-center gap-3 border-b-8 border-red-800"
              >
                YES! <Sparkles />
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ scale: 0 }} 
            animate={{ scale: 1 }}
            className="z-20 text-center p-12 bg-white/80 rounded-[60px] shadow-2xl border-8 border-red-400"
          >
            <h1 className="text-7xl mb-6">🥂</h1>
            <h2 className="text-6xl font-black text-red-600 animate-bounce">CONGRATS!</h2>
            <p className="text-3xl text-rose-500 font-bold mt-4">You are now my official GF! ❤️</p>
            <p className="mt-6 text-gray-400 italic">I promise to love you forever...</p>
            
            <div className="mt-8 flex justify-center gap-4 text-4xl">
              <span>🌹</span><span>❤️</span><span>🌹</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* THE IMPOSSIBLE NO BUTTON */}
      {!isAccepted && (
        <motion.button
          onMouseEnter={teleportButton}
          onClick={teleportButton}
          animate={{ top: noButtonPos.top, left: noButtonPos.left }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="fixed px-8 py-3 bg-gray-200 text-gray-600 font-bold rounded-xl text-xl border-2 border-gray-300 shadow-lg cursor-not-allowed z-50 whitespace-nowrap"
        >
          No is not acceptable 🙅‍♂️
        </motion.button>
      )}

      {/* Decorative Corner Elements */}
      <div className="absolute -bottom-10 -left-10 opacity-20 rotate-45">
        <Heart size={300} fill="#ff4d6d" />
      </div>
    </div>
  );
};

export default FinalValentine;