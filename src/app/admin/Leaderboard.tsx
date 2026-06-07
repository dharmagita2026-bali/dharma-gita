"use client";

import React from 'react';

interface Player {
  id: string;
  name: string | null;
  username: string;
  level: number;
  exp: number;
}

export default function Leaderboard({ players }: { players: Player[] }) {
  return (
    <div className="bg-white border-2 border-[#D7CCC8] rounded-[30px] md:rounded-[45px] shadow-sm overflow-hidden">
      <header className="bg-[#4E342E] p-6 md:p-8 text-center">
        <h3 className="text-white font-black uppercase italic tracking-tighter text-lg md:text-xl">
          Leaderboard Pengguna
        </h3>
        <p className="text-[#D4A017] text-[8px] md:text-[9px] font-black uppercase tracking-[0.2em] mt-1">
          Top 5 Berdasarkan Level & Exp
        </p>
      </header>

      <div className="p-4 md:p-6 space-y-3">
        {players.map((player, index) => {
          const isFirst = index === 0;
          
          return (
            <div 
              key={player.id}
              className={`flex items-center justify-between p-4 md:p-5 rounded-[20px] md:rounded-[25px] transition-all border-2 
                ${isFirst 
                  ? 'bg-[#FDFBF9] border-[#D4A017] shadow-md scale-[1.02]' 
                  : 'bg-white border-[#F5F5F5] hover:border-[#D7CCC8]'
                }`}
            >
              <div className="flex items-center gap-3 md:gap-4">
                <span className={`text-base md:text-lg font-black italic w-5 md:w-6 ${isFirst ? 'text-[#D4A017]' : 'text-[#D7CCC8]'}`}>
                  #{index + 1}
                </span>
                
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#F8F5F2] border border-[#D7CCC8] flex items-center justify-center text-xs md:text-sm shadow-inner shrink-0">
                  {isFirst ? '👑' : '👤'}
                </div>

                <div className="min-w-0">
                  <p className="text-[10px] md:text-[11px] font-black text-[#4E342E] uppercase truncate w-20 sm:w-24 md:w-32">
                    {player.name || player.username}
                  </p>
                  <p className="text-[7px] md:text-[8px] text-[#A1887F] font-bold uppercase tracking-tighter truncate">
                    @{player.username}
                  </p>
                </div>
              </div>

              <div className="text-right shrink-0">
                <p className={`text-base md:text-lg font-black italic tracking-tighter leading-none ${isFirst ? 'text-[#D4A017]' : 'text-[#4E342E]'}`}>
                  LVL {player.level}
                </p>
                <p className="text-[7px] md:text-[8px] font-black text-[#8D6E63] uppercase tracking-widest mt-1">
                  {player.exp} XP
                </p>
              </div>
            </div>
          );
        })}

        {players.length === 0 && (
          <div className="py-8 md:py-10 text-center opacity-40">
            <p className="text-[9px] md:text-[10px] font-black uppercase italic tracking-widest">No students found</p>
          </div>
        )}
      </div>
    </div>
  );
}