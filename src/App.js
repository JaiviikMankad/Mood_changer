import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./App.css";

const moodData = {
  happy: {
    message: "That’s my favorite mood on you 😄",
    bg: "linear-gradient(135deg, #f9d423, #ff4e50)",
    emoji: "😊",
  },
  sad: {
    message: "Even rainy days make rainbows 🌈",
    bg: "linear-gradient(135deg, #74ABE2, #5563DE)",
    emoji: "😢",
  },
  tired: {
    message: "You deserve a break and a cozy nap 😴",
    bg: "linear-gradient(135deg, #a18cd1, #fbc2eb)",
    emoji: "😴",
  },
  excited: {
    message: "That sparkle suits you perfectly ✨",
    bg: "linear-gradient(135deg, #f093fb, #f5576c)",
    emoji: "🤩",
  },
  calm: {
    message: "Peace looks beautiful on you 🌿",
    bg: "linear-gradient(135deg, #96fbc4, #f9f586)",
    emoji: "🪷",
  },
};

const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbxENV_Mcka1Ce45FE1q9Xg1DRIYQ1DPSGAP3shO3dIXyzXy0VuYpBa0ws6VqMJm6LPOaw/exec"; // from Google Apps Script

function logMood(mood) {
  const payload = {
    mood,
    fromName: "MoodMatcher",
    userAgent: navigator.userAgent,
  };

  fetch(WEB_APP_URL, {
    method: "POST",
    mode: "no-cors", // ✅ bypass CORS safely
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  }).catch((err) => console.warn("⚠️ Logging failed:", err));
}

function App() {
  const [selectedMood, setSelectedMood] = useState(null);

  return (
    <div
      className="app"
      style={{
        background: selectedMood ? moodData[selectedMood].bg : "#f0f0f0",
        transition: "background 0.6s ease-in-out",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h1 className="title">Mood Matcher 💖</h1>

      <div className="buttons">
        {Object.keys(moodData).map((mood) => (
          <button
            key={mood}
            onClick={() => {setSelectedMood(mood); logMood(mood);}}
            className="mood-btn"
          >
            {moodData[mood].emoji} {mood.charAt(0).toUpperCase() + mood.slice(1)}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {selectedMood && (
          <motion.div
            key={selectedMood}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5 }}
            className="message-box"
          >
            <p className="emoji-large">{moodData[selectedMood].emoji}</p>
            <h2>{moodData[selectedMood].message}</h2>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
