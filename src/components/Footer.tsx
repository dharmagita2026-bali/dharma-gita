import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-[#D7CCC8] pt-16 pb-8 bg-white">
      <div className="max-w-6xl mx-auto px-12 grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
        
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <img src="/images/logo-music.png" alt="Logo" className="w-12 h-12 object-contain" />
            <span className="font-black text-2xl uppercase tracking-tighter text-[#4E342E] italic">
              Dharma Gita
            </span>
          </div>
          <p className="text-[11px] text-[#8D6E63] font-medium leading-relaxed max-w-xs uppercase">
            Platform e-learning untuk melestarikan seni kidung Bali melalui teknologi yang mudah diakses semua kalangan.
          </p>
          <div className="flex gap-4">
            <div className="w-8 h-8 border-2 border-[#D7CCC8] rounded-full flex items-center justify-center text-[10px] text-[#4E342E] font-bold hover:bg-[#D4A017] hover:border-[#D4A017] hover:text-white transition-all cursor-pointer">
              IG
            </div>
            <div className="w-8 h-8 border-2 border-[#D7CCC8] rounded-full flex items-center justify-center text-[10px] text-[#4E342E] font-bold hover:bg-[#D4A017] hover:border-[#D4A017] hover:text-white transition-all cursor-pointer">
              YT
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h4 className="font-black uppercase text-xs tracking-[0.2em] text-[#4E342E]">
            Jelajahi
          </h4>
          <ul className="text-[11px] space-y-3 text-[#8D6E63] font-bold uppercase tracking-wider">
            <li>
              <Link href="/" className="hover:text-[#D4A017] transition-colors">
                Beranda
              </Link>
            </li>
            <li>
              <Link href="/tentang" className="hover:text-[#D4A017] transition-colors">
                Tentang
              </Link>
            </li>
            <li>
              <Link href="/fitur" className="hover:text-[#D4A017] transition-colors">
                Fitur
              </Link>
            </li>
            <li>
              <a href="#kontak" className="hover:text-[#D4A017] transition-colors">
                Kontak
              </a>
            </li>
          </ul>
        </div>

        <div id="kontak" className="space-y-6">
          <h4 className="font-black uppercase text-xs tracking-[0.2em] text-[#4E342E]">
            Kontak & Bantuan
          </h4>
          <div className="text-[11px] space-y-4 text-[#8D6E63] font-bold uppercase tracking-wider">
            <p className="flex items-start gap-3">
               <span className="w-4 h-4 border-2 border-[#D4A017] rounded-full flex-shrink-0 mt-0.5" />
               Banjar Dinas Galiukir Kaja, Kecamatan Pupuan, Kabupaten Tabanan.
            </p>
            <p className="flex items-center gap-3">
               <span className="w-4 h-4 border-2 border-[#D4A017] rounded-full flex-shrink-0" />
               dharmagita@gmail.com
            </p>
            <p className="flex items-center gap-3">
               <span className="w-4 h-4 border-2 border-[#D4A017] rounded-full flex-shrink-0" />
               (08134) 41999
            </p>
          </div>
        </div>
      </div>

      <div className="text-center pt-8 border-t border-[#F5F5F5]">
        <p className="text-[9px] text-[#A1887F] font-black uppercase tracking-[0.3em]">
          © 2026 Dharma Gita. All rights reserved.
        </p>
      </div>
    </footer>
  );
}