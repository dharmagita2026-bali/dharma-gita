import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-[#D7CCC8] pt-12 md:pt-16 pb-8 bg-white">
      <div className="max-w-6xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 mb-12 md:mb-16">
        
        <div className="space-y-4 md:space-y-6 flex flex-col items-center md:items-start text-center md:text-left">
          <div className="mb-2 md:mb-3">
            <img 
              src="/images/dharma-gita-logo-text.png" 
              alt="Dharma Gita Logo Text" 
              className="w-32 md:w-40 select-none pointer-events-none drop-shadow-md" 
            />
          </div>
          <p className="text-xs text-[#8D6E63] font-medium leading-relaxed max-w-xs">
            Platform e-learning untuk melestarikan seni kidung Bali melalui teknologi yang mudah diakses semua kalangan.
          </p>
        </div>

        <div className="space-y-4 md:space-y-6 flex flex-col items-center md:items-start text-center md:text-left">
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

        <div id="kontak" className="space-y-4 md:space-y-6 flex flex-col items-center md:items-start text-center md:text-left">
          <h4 className="font-black uppercase text-xs tracking-[0.2em] text-[#4E342E]">
            Kontak & Bantuan
          </h4>
          <div className="text-xs space-y-4 text-[#8D6E63] font-bold tracking-wider flex flex-col items-center md:items-start">
            <p className="flex flex-col md:flex-row items-center md:items-start gap-2 md:gap-3 max-w-[250px] md:max-w-none">
               <span className="w-4 h-4 border-2 border-[#D4A017] rounded-full flex-shrink-0 mt-0.5 hidden md:block" />
               Banjar Dinas Galiukir Kaja, Kecamatan Pupuan, Kabupaten Tabanan.
            </p>
            <p className="flex items-center gap-2 md:gap-3">
               <span className="w-4 h-4 border-2 border-[#D4A017] rounded-full flex-shrink-0 hidden md:block" />
               dharmagita@gmail.com
            </p>
            <p className="flex items-center gap-2 md:gap-3">
               <span className="w-4 h-4 border-2 border-[#D4A017] rounded-full flex-shrink-0 hidden md:block" />
               0897 8864 189
            </p>
          </div>
        </div>
      </div>

      <div className="text-center pt-8 border-t border-[#F5F5F5] px-6">
        <p className="text-[9px] md:text-[10px] text-[#A1887F] font-black uppercase tracking-[0.2em] md:tracking-[0.3em]">
          © 2026 Dharma Gita. All rights reserved.
        </p>
      </div>
    </footer>
  );
}