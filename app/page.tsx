"use client";

import { useState, useEffect } from "react";
import WelcomeScreen from "@/components/WelcomeScreen";
import Link from "next/link";
import { motion } from "framer-motion";

// 👇 this variable will persist while navigating (not on reload)
let hasSeenHome = false;

export default function Home() {
  const [showHome, setShowHome] = useState(hasSeenHome);

  useEffect(() => {
    if (showHome) hasSeenHome = true;
  }, [showHome]);

  return (
    <>
      {!showHome && (
        <div className="fullscreen-welcome">
          <WelcomeScreen onFinish={() => setShowHome(true)} />
        </div>
      )}

      {showHome && (
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="flex flex-col items-center justify-center p-6"
        >
          <h2 className="text-2xl font-semibold mb-4 text-green-800">
            What are you looking for?
          </h2>

          <div className="w-full max-w-sm flex flex-col gap-4">
            <Link
              href="/listings/find_hostel"
              className="block text-center bg-green-600 text-white py-3 rounded-xl"
            >
              🏠 View Available Hostels
            </Link>

            <Link
              href="/listings/find_roommate"
              className="block text-center bg-green-500 text-white py-3 rounded-xl"
            >
              👯 Find a Roommate
            </Link>
            <hr />

            <p className="text-center text-gray-700 mt-2 font-medium">
              Are you a House Agent / Landlord?
            </p>

            <Link
              href="/post/post-apartment"
              className="block text-center border border-green-500 text-green-700 py-3 rounded-xl"
            >
              ➕ Post an Apartment
            </Link>

            <Link
              href="/listings/hostel_requests"
              className="block text-center border border-green-500 text-green-700 py-3 rounded-xl"
            >
              📋 View Students’ Hostel Requests
            </Link>
          </div>
        </motion.main>
      )}
    </>
  );
}
