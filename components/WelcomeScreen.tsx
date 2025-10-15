"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function WelcomeScreen({ onFinish }: { onFinish: () => void }) {
  const messages = [
    "We have been waiting for you...",
    "Your solution is ready!",
  ];

  const [currentText, setCurrentText] = useState("");
  const [messageIndex, setMessageIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const message = messages[messageIndex];
    let timer: any;

    if (!isDeleting && currentText.length < message.length) {
      // ✨ Faster typing
      timer = setTimeout(
        () => setCurrentText(message.slice(0, currentText.length + 1)),
        60
      );
    } else if (isDeleting && currentText.length > 0) {
      // ⚡ Faster deleting
      timer = setTimeout(
        () => setCurrentText(message.slice(0, currentText.length - 1)),
        30
      );
    } else if (!isDeleting && currentText.length === message.length) {
      if (messageIndex === messages.length - 1) {
        timer = setTimeout(onFinish, 1200);
      } else {
        timer = setTimeout(() => setIsDeleting(true), 800);
      }
    } else if (isDeleting && currentText.length === 0) {
      setIsDeleting(false);
      setMessageIndex((i) => i + 1);
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, messageIndex]);

  return (
    <motion.div
      className="flex flex-col items-center justify-center h-screen w-full text-gray-800 text-center relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* 🌤 Light animated gradient background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-green-100 via-emerald-50 to-green-200 animate-gradient bg-[length:400%_400%]"
        style={{ zIndex: -1 }}
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* 🪄 Welcome title */}
      <motion.h1
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
        className="text-5xl sm:text-6xl font-extrabold mb-6 tracking-wide text-emerald-700 drop-shadow-sm"
        style={{
          fontFamily: "Poppins, sans-serif",
        }}
      >
        Welcome onboard
      </motion.h1>

      {/* 💬 Typing text */}
      <motion.h2
        className="text-2xl sm:text-3xl font-medium text-emerald-800 leading-relaxed"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        style={{
          fontFamily: "Inter, sans-serif",
        }}
      >
        {currentText}
        <span className="animate-pulse text-emerald-500">|</span>
      </motion.h2>
    </motion.div>
  );
}
