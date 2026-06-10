"use client";

import React, { useEffect, useState } from "react";

export default function ReadingProgressBar({ accentColor = "#3b82f6" }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const scrolled = (window.scrollY / totalHeight) * 100;
        setProgress(scrolled);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-1 w-full bg-white/5 pointer-events-none">
      <div
        className="h-full transition-all duration-75 ease-out"
        style={{
          width: `${progress}%`,
          backgroundColor: accentColor,
          boxShadow: `0 0 10px ${accentColor}`,
        }}
      />
    </div>
  );
}
