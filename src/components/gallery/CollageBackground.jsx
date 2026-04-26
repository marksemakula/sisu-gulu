// CollageBackground.jsx
import React, { useState, useEffect } from "react";
import "./CollageBackground.css";

// List of selected images for the collage
const images = [
  "/15-09-2015-12-03-57_DSCN1414.jpg",
  "/26-08-2015-01-01-46_IMG_1441.jpg",
  "/26-08-2015-01-03-29_IMG_3691.jpg",
  "/26-08-2015-12-49-54__MG_8635.jpg",
  "/26-08-2015-12-54-03__MG_9650.jpg",
  "/73e7f5be-efe4-4779-a0dd-ec96e761e11c.jpg",
  "/annie-spratt-V-XM4kkWpng-unsplash.jpg",
  "/raissa-lara-lutolf-fasel-ivKWcUFJQtE-unsplash.jpg",
  "/bright-kwabena-kyere-rxB0L6nrP5M-unsplash.jpg",
  "/heather-suggitt-AjB5qK2rnbU-unsplash.jpg"
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
