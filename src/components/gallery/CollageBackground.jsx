// CollageBackground.jsx
import React, { useState, useEffect } from "react";
import "./CollageBackground.css";

// List of selected images for the collage — actual SISU Gulu school photos
const images = [
  "/SCOOBY-DOO%20INTERNATIONAL%20SCHOOL%20UGANDA%20-GULU/Events/CHARACTER%20DAY/20260619_071358.jpg",
  "/SCOOBY-DOO%20INTERNATIONAL%20SCHOOL%20UGANDA%20-GULU/Events/CHARACTER%20DAY/20260619_072548.jpg",
  "/SCOOBY-DOO%20INTERNATIONAL%20SCHOOL%20UGANDA%20-GULU/Events/CHARACTER%20DAY/20260619_074058.jpg",
  "/SCOOBY-DOO%20INTERNATIONAL%20SCHOOL%20UGANDA%20-GULU/Events/CHARACTER%20DAY/20260619_080307.jpg",
  "/SCOOBY-DOO%20INTERNATIONAL%20SCHOOL%20UGANDA%20-GULU/Events/CHARACTER%20DAY/20260619_080852.jpg",
  "/SCOOBY-DOO%20INTERNATIONAL%20SCHOOL%20UGANDA%20-GULU/Events/CHARACTER%20DAY/20260619_081041.jpg",
  "/SCOOBY-DOO%20INTERNATIONAL%20SCHOOL%20UGANDA%20-GULU/Events/CHARACTER%20DAY/20260619_084324.jpg",
  "/SCOOBY-DOO%20INTERNATIONAL%20SCHOOL%20UGANDA%20-GULU/Events/CHARACTER%20DAY/20260619_095324.jpg",
  "/SCOOBY-DOO%20INTERNATIONAL%20SCHOOL%20UGANDA%20-GULU/Programs/ACTIVITIES/AEROBICS/20260617_115317.jpg",
  "/SCOOBY-DOO%20INTERNATIONAL%20SCHOOL%20UGANDA%20-GULU/Programs/ACTIVITIES/AEROBICS/20260617_115449.jpg"
];


// Number of images to show in foreground
const FOREGROUND_COUNT = 3;

const CollageBackground = () => {
  const [foregroundIndexes, setForegroundIndexes] = useState([]);
  const [colorIndexes, setColorIndexes] = useState([]);

  // Initialize foreground indexes
  useEffect(() => {
    setForegroundIndexes(Array.from({ length: FOREGROUND_COUNT }, (_, i) => i));
    setColorIndexes([]);
  }, []);

  // Animate foreground images cycling and color transition
  useEffect(() => {
    const interval = setInterval(() => {
      setForegroundIndexes(prev => {
        // Pick random indexes for foreground
        let newIndexes = [];
        while (newIndexes.length < FOREGROUND_COUNT) {
          let idx = Math.floor(Math.random() * images.length);
          if (!newIndexes.includes(idx)) newIndexes.push(idx);
        }
        return newIndexes;
      });
      setColorIndexes(prev => {
        // Pick one random foreground image to transition to color
        if (foregroundIndexes.length > 0) {
          const idx = foregroundIndexes[Math.floor(Math.random() * foregroundIndexes.length)];
          return [idx];
        }
        return [];
      });
    }, 4000);
    return () => clearInterval(interval);
  }, [foregroundIndexes]);

  return (
    <div className="collage-bg">
      {images.map((src, i) => {
        const isForeground = foregroundIndexes.includes(i);
        const isColor = colorIndexes.includes(i);
        return (
          <img
            key={i}
            src={src}
            alt="collage"
            className={`collage-img${isForeground ? " collage-img-foreground" : " collage-img-background"}${isColor ? " collage-img-color" : ""}`}
            style={{
              zIndex: isForeground ? 2 : 1,
              filter: isColor
                ? "none"
                : "grayscale(1) contrast(1.1) brightness(0.95)",
              opacity: isForeground ? (isColor ? 1 : 0.95) : 0.5,
              transition: "all 2s cubic-bezier(.77,0,.18,1)",
              transform: isForeground
                ? "scale(1.1) translateY(-10px)"
                : "scale(1) translateY(0)"
            }}
          />
        );
      })}
    </div>
  );
};

export default CollageBackground;
