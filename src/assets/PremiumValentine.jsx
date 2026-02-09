import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { Heart, Sparkles, Star, PartyPopper } from 'lucide-react';
import confetti from 'canvas-confetti';

const PremiumValentine = () => {
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
  const [isAccepted, setIsAccepted] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  // Parallax Background Effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const moveButton = () => {
    // Buttons jumps within a safe visible range
    const x = (Math.random() - 0.5) * 400; 
    const y = (Math.random() - 0.5) * 400;
    setNoButtonPos({ x, y });
  };

  const handleYes = () => {
    setIsAccepted(true);
    const duration = 10 * 1000;
    const animationEnd = Date.now() + duration;
    
    const randomInRange = (min, max) => Math.random() * (max - min) + min;

    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) return clearInterval(interval);

      const particleCount = 50 * (timeLeft / duration);
      confetti({
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ['#ff0000', '#ff69b4', '#ffd700']
      });
      confetti({
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ['#ff0000', '#ff69b4', '#ffd700']
      });
    }, 250);
  };

  return (
    <div 
      ref={containerRef}
      className="relative min-h-screen w-full bg-[#1a0b0d] flex items-center justify-center overflow-hidden cursor-crosshair px-4"
    >
      {/* Animated Glowing Background Layer */}
      <div 
        className="absolute inset-0 opacity-40"
        style={{
          background: `radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px, rgba(255, 20, 147, 0.3) 0%, transparent 40%)`
        }}
      />

      {/* Floating 3D Roses (Particles) */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ y: -100, x: Math.random() * window.innerWidth, rotate: 0 }}
          animate={{ 
            y: window.innerHeight + 100,
            x: `calc(${Math.random() * 100}vw + ${Math.sin(i) * 50}px)`,
            rotate: 360 
          }}
          transition={{ duration: 10 + Math.random() * 10, repeat: Infinity, ease: "linear" }}
          className="absolute text-3xl select-none pointer-events-none"
        >
          {i % 2 === 0 ? '🌹' : '💖'}
        </motion.div>
      ))}

      {/* Main Container */}
      <AnimatePresence>
        {!isAccepted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotateY: 20 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            exit={{ opacity: 0, scale: 1.5, filter: "blur(20px)" }}
            className="relative z-10 w-full max-w-lg"
          >
            {/* Glassmorphism Card */}
            <div className="bg-white/10 backdrop-blur-2xl p-12 rounded-[60px] border border-white/20 shadow-[0_0_80px_rgba(255,50,100,0.3)] text-center">
              
              <motion.div
                animate={{ scale: [1, 1.2, 1], rotate: [0, 5, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="mb-8"
              >
                <div className="relative inline-block">
                  <Heart size={120} fill="#ff1493" className="text-rose-500 drop-shadow-[0_0_20px_#ff1493]" />
                  <Sparkles className="absolute -top-4 -right-4 text-yellow-300 animate-pulse" />
                </div>
              </motion.div>

              <h1 className="text-5xl md:text-6xl font-black text-white mb-6 tracking-tight">
                Do you <span className="text-rose-500 underline decoration-wavy">love</span> me?
              </h1>

              <div className="relative mt-12 flex flex-col sm:flex-row items-center justify-center gap-10">
                {/* YES BUTTON - The Shining Choice */}
                <motion.button
                  onClick={handleYes}
                  whileHover={{ scale: 1.1, boxShadow: "0 0 40px rgba(255, 20, 147, 0.8)" }}
                  whileTap={{ scale: 0.9 }}
                  className="px-14 py-5 bg-gradient-to-r from-rose-600 to-pink-500 text-white font-black rounded-full text-3xl shadow-2xl flex items-center gap-3 relative overflow-hidden group"
                >
                  <span className="relative z-10">YES! ❤️</span>
                  <div className="absolute inset-0 bg-white/20 -skew-x-12 translate-x-full group-hover:translate-x-[-100%] transition-transform duration-700" />
                </motion.button>

                {/* THE MOVING NO BUTTON */}
                <motion.button
                  onMouseEnter={moveButton}
                  onClick={moveButton}
                  animate={{ x: noButtonPos.x, y: noButtonPos.y }}
                  transition={{ type: "spring", stiffness: 500, damping: 15 }}
                  className="px-8 py-3 bg-white/5 backdrop-blur-md text-white/50 font-bold rounded-full text-xl border border-white/10 hover:border-rose-500 hover:text-rose-400 transition-colors"
                >
                  No Way 🙅‍♂️
                </motion.button>
              </div>
            </div>
          </motion.div>
        ) : (
          /* WINNER SCREEN */
          <motion.div
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            className="z-20 text-center bg-white/95 p-16 rounded-[80px] shadow-[0_0_100px_#ff1493] max-w-2xl mx-4"
          >
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="text-9xl mb-8"
            >
              👑
            </motion.div>
            <h1 className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-br from-rose-600 to-pink-800 mb-6">
              IT'S OFFICIAL!
            </h1>
            <div className="space-y-4">
              <p className="text-4xl text-rose-500 font-bold">You are my GF now! ❤️</p>
              <p className="text-xl text-gray-500 italic">"I will treasure you until the stars go out."</p>
            </div>

            <div className="mt-12 flex justify-center gap-6">
              <Star className="text-yellow-400 fill-yellow-400" />
              <PartyPopper className="text-rose-500" />
              <Star className="text-yellow-400 fill-yellow-400" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Floating Quote */}
      {!isAccepted && (
        <motion.div 
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ repeat: Infinity, duration: 4 }}
          className="absolute bottom-10 text-white/30 text-lg italic tracking-widest"
        >
          - ONLY YES IS ACCEPTED -
        </motion.div>
      )}
    </div>
  );
};

export default PremiumValentine;