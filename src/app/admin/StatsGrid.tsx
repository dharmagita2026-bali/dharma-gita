"use client";

import React from 'react';

interface StatsProps {
  stats: {
    userCount: number;
    materiCount: number;
    kidungCount: number;
    adminCount: number;
  }
}

export default function StatsGrid({ stats }: StatsProps) {
  const cards = [
    { label: "Total Pengguna", value: stats.userCount, icon: "👥", sub: `${stats.adminCount} Akses Admin` },
    { label: "Total Materi", value: stats.materiCount, icon: "📖", sub: "Kategori Pembelajaran" },
    { label: "Total Kidung", value: stats.kidungCount, icon: "🎶", sub: "Audio Pembelajaran" },
    { label: "Server Status", value: "99%", icon: "⚡", sub: "Sistem Optimal", color: "text-green-600" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
      {cards.map((card, idx) => (
        <div 
          key={idx} 
          className="bg-white border-2 border-[#D7CCC8] p-10 rounded-[40px] shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-default group"
        >
          <div className="flex justify-between items-start mb-6">
            <span className="text-3xl grayscale group-hover:grayscale-0 transition-all duration-500">
              {card.icon}
            </span>
          </div>
          <h3 className="text-[9px] font-black uppercase text-[#A1887F] tracking-[0.2em] mb-1">
            {card.label}
          </h3>
          <p className={`text-6xl font-black italic tracking-tighter leading-none ${card.color || 'text-[#4E342E]'}`}>
            {card.value}
          </p>
          <p className="text-[8px] font-bold text-[#D7CCC8] uppercase mt-4 tracking-widest">
            {card.sub}
          </p>
        </div>
      ))}
    </div>
  );
}