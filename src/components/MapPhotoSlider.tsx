"use client";

import React, { useState } from 'react';

export default function MapPhotosSlider() {
  const photos = [
    { src: "/images/galiukir1.png" },
    { src: "/images/galiukir2.png" },
    { src: "/images/galiukir3.png" }
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = (e: React.MouseEvent) => {
    e.preventDefault();
    setActiveIndex((prev) => (prev === 0 ? photos.length - 1 : prev - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    setActiveIndex((prev) => (prev === photos.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative flex items-center justify-center w-[300px] sm:w-[380px] md:w-[420px] select-none mx-auto">
      
      {/* Main Panoramic Card */}
      <div className="w-full h-28 sm:h-32 bg-[#4E342E] rounded-2xl md:rounded-[24px] overflow-hidden relative border-4 border-[#4E342E] shadow-xl group/slider">
        
        {/* Floating Left Arrow INSIDE the box */}
        <button 
          onClick={handlePrev}
          className="absolute left-3 top-1/2 -translate-y-1/2 z-30 w-8 h-8 border-2 border-[#4E342E] bg-white hover:bg-[#FFF9E6] text-[#4E342E] rounded-full flex items-center justify-center font-black text-sm transition-all shadow-md active:scale-90 opacity-90 hover:opacity-100"
        >
          ←
        </button>

        {/* Background Image */}
        <img 
          src={photos[activeIndex].src} 
          alt="Lokasi Penelitian Dharma Gita" 
          className="w-full h-full object-cover transition-transform duration-500 group-hover/slider:scale-105" 
        />
        
        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-black/10 transition-opacity group-hover/slider:opacity-90" />
        
        {/* Text Layer: Aligned Bottom Center with Static Text */}
        <div className="absolute inset-x-0 bottom-0 flex flex-col items-center justify-end px-14 pb-3 pt-8 text-center z-10">
          <p className="text-[10px] sm:text-xs font-black text-white uppercase tracking-wider drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] line-clamp-1">
            Desa Galiukir, Pupuan, Tabanan
          </p>
          <span className="text-[8px] font-bold uppercase text-[#F3D06D] tracking-widest mt-0.5 drop-shadow-sm">
            {activeIndex + 1} / {photos.length}
          </span>
        </div>

        {/* Floating Right Arrow INSIDE the box */}
        <button 
          onClick={handleNext}
          className="absolute right-3 top-1/2 -translate-y-1/2 z-30 w-8 h-8 border-2 border-[#4E342E] bg-white hover:bg-[#FFF9E6] text-[#4E342E] rounded-full flex items-center justify-center font-black text-sm transition-all shadow-md active:scale-90 opacity-90 hover:opacity-100"
        >
          →
        </button>
      </div>

      {/* Upward Pointing Anchor Triangle Hook */}
      <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-4 h-4 bg-[#4E342E] transform rotate-45 z-0" />
    </div>
  );
}