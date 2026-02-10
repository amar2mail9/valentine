import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles, Volume2, VolumeX, Quote, Info } from "lucide-react";
import confetti from "canvas-confetti";
import emailjs from "@emailjs/browser";

const UltimateValentineWithTracking01 = () => {
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
  const [isAccepted, setIsAccepted] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [roses, setRoses] = useState([]);
  const audioRef = useRef(null);

  // 1. Particle System (Roses & Hearts)
  useEffect(() => {
    const interval = setInterval(() => {
      setRoses((prev) => [
        ...prev.slice(-30),
        {
          id: Date.now(),
          left: Math.random() * 100,
          type: Math.random() > 0.4 ? "🌹" : "💖",
          size: Math.random() * 30 + 20,
          duration: Math.random() * 6 + 4,
          blur: Math.random() > 0.8 ? "blur(3px)" : "none",
        },
      ]);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  // 2. Mouse Spotlight Tracking
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

  const handleYes = async () => {
    setIsAccepted(true);

    // Confetti Effect
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

    // --- TRACKING & EMAIL LOGIC ---
    const deviceInfo = {
      browser: navigator.userAgent,
      platform: navigator.platform,
      screen: `${window.screen.width}x${window.screen.height}`,
      time: new Date().toLocaleString(),
    };

    const templateParams = {
      to_name: "Amar Kumar",
      from_name: "Valentine Website",
      message: `Someone clicked YES! ❤️
      Device: ${deviceInfo.platform}
      Browser: ${deviceInfo.browser}
      Resolution: ${deviceInfo.screen}
      Time: ${deviceInfo.time}`,
    };

    // Replace these with YOUR actual EmailJS IDs
    emailjs
      .send(
        "service_a2ll74o",
        "template_nz3e9jp",
        templateParams,
        "lxUfAecwZ_It3aGzn",
      )
      .then(() => {
        console.log("Success! Amar, notification sent.");
      })
      .catch((err) => {
        console.error("Email failed:", err);
      });
  };

  return (
    <div className="relative min-h-screen w-full bg-[#0d0103] flex items-center justify-center overflow-hidden font-serif">
      <audio
        ref={audioRef}
        loop
        src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
      />

      {/* BACKGROUND PARTICLES */}
      <AnimatePresence>
        {roses.map((r) => (
          <motion.div
            key={r.id}
            initial={{ y: -100, x: `${r.left}vw`, opacity: 0, rotate: 0 }}
            animate={{ y: "110vh", opacity: [0, 1, 1, 0], rotate: 360 }}
            transition={{ duration: r.duration, ease: "linear" }}
            className="absolute pointer-events-none z-0"
            style={{ fontSize: r.size, filter: r.blur }}
          >
            {r.type}
          </motion.div>
        ))}
      </AnimatePresence>

      {/* AMBIENT SPOTLIGHT */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background: `radial-gradient(700px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255,0,85,0.12), transparent 85%)`,
        }}
      />

      {/* MUSIC TOGGLE */}
      <button
        onClick={() => {
          isMusicPlaying ? audioRef.current.pause() : audioRef.current.play();
          setIsMusicPlaying(!isMusicPlaying);
        }}
        className="fixed top-8 right-8 z-50 p-4 rounded-full border border-pink-500/30 bg-black/50 text-pink-500 shadow-[0_0_20px_rgba(255,0,85,0.4)] backdrop-blur-xl"
      >
        {isMusicPlaying ? <Volume2 className="animate-pulse" /> : <VolumeX />}
      </button>

      <AnimatePresence mode="wait">
        {!isAccepted ? (
          <motion.div
            key="p"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative z-20 w-full max-w-lg p-[3px] rounded-[60px] bg-gradient-to-b from-pink-600 via-transparent to-rose-900"
          >
            <div className="bg-[#1a0105]/95 backdrop-blur-3xl p-10 md:p-16 rounded-[58px] text-center border border-white/5 relative">
              <div className="absolute top-[-20px] left-[-20px] text-7xl opacity-40">
                🌹
              </div>
              <div className="absolute bottom-[-20px] right-[-20px] text-7xl opacity-40">
                🌹
              </div>

              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="mb-8"
              >
                <Heart
                  size={90}
                  fill="#ff0055"
                  className="mx-auto text-pink-600 drop-shadow-[0_0_20px_#ff0055]"
                />
              </motion.div>

              <h1 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter">
                Do you <span className="text-pink-600">love</span> me?
              </h1>

              <div className="bg-pink-500/5 p-6 rounded-3xl border border-pink-500/10 mb-10">
                <p className="text-pink-200/60 italic text-sm leading-relaxed">
                  “Every star far of the sky whispers your name.”
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-12 min-h-[120px]">
                <motion.button
                  onClick={handleYes}
                  whileHover={{ scale: 1.1, boxShadow: "0 0 50px #ff0055" }}
                  className="px-16 py-6 bg-gradient-to-r from-pink-600 to-rose-700 text-white font-bold rounded-2xl text-3xl shadow-2xl"
                >
                  YES ❤️
                </motion.button>

                <motion.button
                  onMouseEnter={moveNoButton}
                  onClick={moveNoButton}
                  animate={{ x: noButtonPos.x, y: noButtonPos.y }}
                  className="px-10 py-4 bg-white/5 border border-white/10 text-white/30 rounded-2xl text-xl hover:text-white"
                >
                  No 🥀
                </motion.button>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="a"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="z-30 text-center px-4"
          >
            <h1 className="text-8xl md:text-[180px] font-black text-white drop-shadow-[0_0_80px_#ff0055]">
              MINE. 💍
            </h1>
            <div className="bg-white/5 backdrop-blur-3xl p-12 rounded-[60px] border border-pink-500/30 max-w-2xl mx-auto shadow-2xl">
              <h2 className="text-4xl text-pink-400 font-bold mb-6">
                Congrats! My GF ❤️
              </h2>
              <p className="text-xl text-gray-200 font-light italic">
                "Today marks the beginning of our forever."
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UltimateValentineWithTracking01;
