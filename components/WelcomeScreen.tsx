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
      timer = setTimeout(
        () => setCurrentText(message.slice(0, currentText.length + 1)),
        90
      );
    } else if (isDeleting && currentText.length > 0) {
      timer = setTimeout(
        () => setCurrentText(message.slice(0, currentText.length - 1)),
        45
      );
    } else if (!isDeleting && currentText.length === message.length) {
      if (messageIndex === messages.length - 1) {
        timer = setTimeout(onFinish, 1800);
      } else {
        timer = setTimeout(() => setIsDeleting(true), 1200);
      }
    } else if (isDeleting && currentText.length === 0) {
      setIsDeleting(false);
      setMessageIndex((i) => i + 1);
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, messageIndex]);

  return (
    <motion.div
      className="flex flex-col items-center justify-center h-screen w-full text-white text-center relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Smooth animated gradient background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-emerald-500 via-teal-400 to-green-700 animate-gradient bg-[length:400%_400%]"
        style={{ zIndex: -1 }}
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Welcome title */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
        className="text-5xl sm:text-6xl font-extrabold mb-6 tracking-wide drop-shadow-lg"
        style={{
          fontFamily: "Poppins, sans-serif",
        }}
      >
        Welcome onboard
      </motion.h1>

      {/* Typing text */}
      <motion.h2
        className="text-2xl sm:text-3xl font-medium text-white/90 leading-relaxed"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        style={{
          fontFamily: "Inter, sans-serif",
        }}
      >
        {currentText}
        <span className="animate-pulse text-white/60">|</span>
      </motion.h2>
    </motion.div>
  );
}
