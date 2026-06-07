"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface UserProgress {
  username: string;
  level: number;
  exp: number;
  rank: {
    title: string;
    currentTierProgress: number;
    tierTarget: number;
    color: string;
  };
}

interface GameCardMateri {
  id: string;
  slug: string;
  title: string;
  description: string;
  level: number;
  totalKidungs: number;
  masteredCount: number;
}

export default function GameDashboardClient() {
  const router = useRouter();
  const [user, setUser] = useState<UserProgress | null>(null);
  const [categories, setCategories] = useState<GameCardMateri[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        const res = await fetch('/api/game/dashboard');
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
          setCategories(data.categories);
        }
      } catch (err) {
        console.error("Failed to load game dashboard:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FDFBF9] flex items-center justify-center">
        <div className="text-xs md:text-sm font-black text-[#4E342E] uppercase tracking-widest animate-pulse">
          Loading Arena...
        </div>
      </div>
    );
  }

  const progressBarWidth = user 
    ? Math.round((user.rank.currentTierProgress / user.rank.tierTarget) * 100) 
    : 0;

  return (
    <div className="min-h-screen bg-[#FDFBF9] text-[#4E342E] p-4 md:p-8 lg:p-16">
      <div className="max-w-6xl mx-auto space-y-8 md:space-y-12">
        
        {user && (
          <header className="bg-[#F8F5F2] border-4 border-[#4E342E] rounded-[24px] md:rounded-[32px] p-6 md:p-8 shadow-[6px_6px_0px_0px_#4E342E] md:shadow-[8px_8px_0px_0px_#4E342E] flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="space-y-1 md:space-y-2 text-center md:text-left">
              <span className={`text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] block ${user.rank.color}`}>
                {user.rank.title}
              </span>
              <h1 className="text-3xl md:text-4xl font-black uppercase italic tracking-tighter text-[#4E342E]">
                {user.username}
              </h1>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-6 w-full md:w-auto">
              <div className="bg-[#4E342E] text-white px-8 sm:px-6 py-3 sm:py-4 rounded-2xl border-2 border-[#4E342E] text-center flex-shrink-0 shadow-md w-full sm:w-auto flex flex-row sm:flex-col items-center justify-center gap-2 sm:gap-0">
                <span className="block text-[10px] md:text-[9px] font-black uppercase tracking-widest opacity-70">Materi Lvl</span>
                <span className="text-2xl md:text-3xl font-black italic tracking-tighter">{user.level}</span>
              </div>
              
              <div className="space-y-1 flex-1 w-full md:w-64">
                <div className="flex justify-between text-[9px] md:text-[10px] font-black uppercase tracking-wider text-[#8D6E63]">
                  <span>Total Pengalaman</span>
                  <span>{user.exp} EXP</span>
                </div>
                <div className="w-full bg-white border-2 border-[#4E342E] h-4 md:h-5 rounded-full overflow-hidden p-0.5 relative">
                  <div 
                    className="bg-[#D4A017] h-full rounded-full border-r-2 border-[#4E342E] transition-all duration-500"
                    style={{ width: `${progressBarWidth}%` }}
                  />
                </div>
                <span className="text-[8px] md:text-[9px] font-bold text-[#8D6E63] block text-right">
                  {user.exp < 1500 
                    ? `${user.rank.currentTierProgress} / ${user.rank.tierTarget} menuju pangkat baru` 
                    : 'Pangkat Tertinggi Tercapai'}
                </span>
              </div>
            </div>
          </header>
        )}

        <div className="space-y-2 border-b-4 border-[#4E342E] pb-4 text-center md:text-left">
          <h2 className="text-2xl md:text-3xl font-black uppercase italic tracking-tight">Pilih Tingkatan Materi</h2>
          <p className="text-xs md:text-sm font-bold text-[#8D6E63]">Kuasai seluruh materi untuk membuka level selanjutnya.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
          {categories.map((materi) => {
            const isLocked = user ? user.level < materi.level : true;
            const percentageMastered = materi.totalKidungs > 0 
              ? Math.round((materi.masteredCount / materi.totalKidungs) * 100) 
              : 0;

            return (
              <div 
                key={materi.id}
                className={`relative group bg-white border-4 border-[#4E342E] rounded-[30px] md:rounded-[40px] p-6 md:p-8 flex flex-col justify-between overflow-hidden transition-all duration-300
                  ${isLocked 
                    ? 'bg-[#F2EFEA] opacity-60 cursor-not-allowed select-none shadow-[4px_4px_0px_0px_#4E342E]' 
                    : 'hover:-translate-y-1 hover:shadow-[12px_12px_0px_0px_#4E342E] shadow-[6px_6px_0px_0px_#4E342E] md:shadow-[8px_8px_0px_0px_#4E342E] cursor-pointer'
                  }`}
                onClick={() => {
                  if (!isLocked) {
                    router.push(`/game/arena/${materi.slug}`);
                  }
                }}
              >
                <div className="space-y-4">
                  <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-2 xl:gap-0">
                    <span className="bg-[#F8F5F2] border-2 border-[#4E342E] px-3 py-1 rounded-xl text-[9px] md:text-[10px] font-black uppercase tracking-wider">
                      Syarat: Level {materi.level}
                    </span>
                    {isLocked && (
                      <span className="bg-[#D32F2F] text-white px-3 py-1 rounded-xl text-[8px] md:text-[9px] font-black uppercase tracking-wider">
                        🔒 Terkunci
                      </span>
                    )}
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight group-hover:text-[#D4A017] transition-colors">
                      {materi.title}
                    </h3>
                    <p className="text-[11px] md:text-xs text-[#8D6E63] font-bold line-clamp-2 leading-relaxed">
                      {materi.description}
                    </p>
                  </div>
                </div>

                <div className="pt-6 md:pt-8 space-y-2">
                  <div className="flex flex-col sm:flex-row justify-between sm:items-end text-[9px] md:text-[10px] font-black uppercase tracking-widest text-[#8D6E63] gap-1 sm:gap-0">
                    <span>Progres Penguasaan</span>
                    <span className="text-xs md:text-sm font-black text-[#4E342E]">
                      {materi.masteredCount} / {materi.totalKidungs} Kidung
                    </span>
                  </div>
                  <div className="w-full bg-[#F8F5F2] border-2 border-[#4E342E] h-3 md:h-4 rounded-xl overflow-hidden p-0.5">
                    <div 
                      className={`h-full rounded-lg border-r border-[#4E342E] transition-all duration-300 ${percentageMastered === 100 ? 'bg-[#2E7D32]' : 'bg-[#D4A017]'}`}
                      style={{ width: `${percentageMastered}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}