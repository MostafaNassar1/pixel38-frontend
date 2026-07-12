"use client";

import { useState } from "react";
import Image from "next/image";

const GALLERY_IMAGES = [
  "/gallery/kitchen-2.jpg",
  "/gallery/kitchen-3.png",
  "/gallery/kitchen-4.png",
  
];

export default function Gallery() {
  const [activeIndex, setActiveIndex] = useState(0);

  const goToPrevious = () => {
    setActiveIndex((prev) => (prev === 0 ? GALLERY_IMAGES.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setActiveIndex((prev) => (prev === GALLERY_IMAGES.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="px-4 md:px-8 mt-20">
      <h2 className="font-display text-3xl md:text-4xl font-bold uppercase tracking-wide text-foreground">
        Our Work
      </h2>

      <div className="mt-10 flex items-center gap-4 md:gap-8">
        <button
          onClick={goToPrevious}
          aria-label="Previous image"
          className="shrink-0 text-muted hover:text-foreground transition-colors"
        >
          <ArrowIcon direction="left" />
        </button>

        <div className="relative w-full h-64 md:h-105 rounded-3xl overflow-hidden">
          <Image
            src={GALLERY_IMAGES[activeIndex]}
            alt={`Our work example ${activeIndex + 1}`}
            fill
            className="object-cover"
          />
        </div>

        <button
          onClick={goToNext}
          aria-label="Next image"
          className="shrink-0 text-muted hover:text-foreground transition-colors"
        >
          <ArrowIcon direction="right" />
        </button>
      </div>

      <div className="mt-6 flex justify-center gap-2">
        {GALLERY_IMAGES.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            aria-label={`Go to image ${index + 1}`}
            className={`w-2.5 h-2.5 rounded-full transition-colors ${
              index === activeIndex ? "bg-accent-blue" : "border border-muted"
            }`}
          />
        ))}
      </div>
    </section>
  );
}

function ArrowIcon({ direction }: { direction: "left" | "right" }) {
  const path = direction === "left" ? "M15 4L7 12L15 20" : "M9 4L17 12L9 20";
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d={path} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}