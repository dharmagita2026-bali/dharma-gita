"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface UserData {
  level: number;
  exp: number;
  image: string | null;
}

interface NavbarClientProps {
  userData: UserData | null;
  isAuthenticated: boolean;
}

export default function NavbarClient({ userData, isAuthenticated }: NavbarClientProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: 'Beranda', href: '/' },
    { 
      name: 'Tentang', 
      href: '/tentang',
      subsections: [
        { name: 'Latar Belakang', id: 'latar-belakang' },
        { name: 'Manfaat', id: 'manfaat' },
        { name: 'Filosofi', id: 'filosofi' },
        { name: 'Lokasi Penelitian', id: 'lokasi-penelitian' },
        { name: 'Narasumber', id: 'narasumber' },
      ]
    },
    { 
      name: 'Fitur', 
      href: '/fitur', 
      subsections: [
        { name: 'Materi', id: 'materi' },
        { name: 'Game Interaktif', id: 'game' },
      ]
    },
    { name: 'Kontak', href: '#kontak' },
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-[#D7CCC8] px-6 py-2 md:px-12 flex justify-between items-center select-none">
      <Link href="/">
        <img 
          src="/images/dharma-gita-logo-text.png" 
          alt="Dharma Gita Logo" 
          className="w-28 md:w-36 drop-shadow-sm" 
        />
      </Link>

      <div className="hidden lg:flex items-center gap-8 ml-auto">
        {navLinks.map((link) => (
          <div key={link.name} className="relative group py-2">
            <Link 
              href={link.href}
              className={`text-xs font-black uppercase tracking-widest transition-colors ${
                isActive(link.href) ? 'text-[#D4A017]' : 'text-[#4E342E] hover:text-[#D4A017]'
              }`}
            >
              {link.name}
            </Link>
            
            {link.subsections && (
              <div className="absolute top-full left-0 mt-2 w-52 bg-white border border-[#D7CCC8] rounded-2xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 p-2 space-y-1">
                {link.subsections.map((sub) => (
                  <Link
                    key={sub.id}
                    href={`${link.href}#${sub.id}`}
                    className="block px-4 py-2 text-[10px] font-bold text-[#8D6E63] hover:text-[#4E342E] hover:bg-[#F8F5F2] rounded-xl uppercase tracking-wider transition-all"
                  >
                    {sub.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="hidden lg:flex items-center ml-8">
        {isAuthenticated ? (
          <Link href="/profile" className="flex items-center gap-3 bg-[#F8F5F2] border border-[#D7CCC8] pl-3 pr-5 py-1.5 rounded-full hover:bg-[#FDFBF9] transition-colors">
            <div className="w-8 h-8 border-2 border-[#D4A017] rounded-full overflow-hidden flex items-center justify-center bg-white flex-shrink-0">
              {userData?.image ? (
                <img src={userData.image} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <span className="text-sm">👤</span>
              )}
            </div>
            <div className="flex flex-col leading-none text-left">
              <span className="text-[9px] font-black uppercase tracking-widest text-[#4E342E]">Level {userData?.level || 1}</span>
              <span className="text-[8px] text-[#A1887F] font-bold">{userData?.exp || 0} XP</span>
            </div>
          </Link>
        ) : (
          <Link 
            href="/login" 
            className="bg-gradient-to-b from-[#F3D06D] to-[#D4A017] text-[#5D4037] px-6 py-2.5 rounded-full font-black italic shadow-sm active:scale-95 transition-transform border border-[#B8860B] uppercase tracking-widest text-[10px]"
          >
            Masuk
          </Link>
        )}
      </div>

      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden z-50 p-2 text-[#4E342E] focus:outline-none"
      >
        <div className="w-6 h-5 relative flex flex-col justify-between">
          <span className={`w-full h-0.5 bg-[#4E342E] rounded transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`w-full h-0.5 bg-[#4E342E] rounded transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`} />
          <span className={`w-full h-0.5 bg-[#4E342E] rounded transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </div>
      </button>

      <div className={`fixed inset-0 bg-[#4E342E]/40 backdrop-blur-sm z-40 transition-opacity duration-300 lg:hidden ${
        isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`} onClick={() => setIsOpen(false)} />

      <div className={`fixed top-0 right-0 h-screen w-72 bg-white border-l-2 border-[#D7CCC8] z-40 shadow-2xl transition-transform duration-300 ease-in-out transform lg:hidden flex flex-col pt-24 px-6 pb-8 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="flex-grow overflow-y-auto space-y-6 pr-2">
          {navLinks.map((link) => (
            <div key={link.name} className="space-y-2">
              <Link 
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`block text-sm font-black uppercase tracking-widest transition-colors ${
                  isActive(link.href) ? 'text-[#D4A017]' : 'text-[#4E342E]'
                }`}
              >
                {link.name}
              </Link>
              
              {link.subsections && (
                <div className="pl-4 border-l-2 border-[#F5F5F5] space-y-2">
                  {link.subsections.map((sub) => (
                    <Link
                      key={sub.id}
                      href={`${link.href}#${sub.id}`}
                      onClick={() => setIsOpen(false)}
                      className="block text-[11px] font-bold text-[#8D6E63] hover:text-[#4E342E] uppercase tracking-wider transition-colors"
                    >
                      {sub.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="pt-6 border-t border-[#F5F5F5]">
          {isAuthenticated ? (
            <Link href="/profile" onClick={() => setIsOpen(false)} className="flex items-center gap-4 bg-[#F8F5F2] p-4 rounded-2xl w-full">
              <div className="w-10 h-10 border-2 border-[#D4A017] rounded-full overflow-hidden flex items-center justify-center bg-white flex-shrink-0">
                {userData?.image ? (
                  <img src={userData.image} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-xl">👤</span>
                )}
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-[10px] font-black uppercase tracking-widest text-[#4E342E]">Level {userData?.level || 1}</span>
                <span className="text-[9px] text-[#A1887F] font-bold mt-1">{userData?.exp || 0} XP</span>
              </div>
            </Link>
          ) : (
            <Link 
              href="/login" 
              onClick={() => setIsOpen(false)}
              className="w-full block text-center bg-gradient-to-b from-[#F3D06D] to-[#D4A017] text-[#5D4037] px-8 py-4 rounded-full font-black italic shadow-md active:scale-95 transition-transform border border-[#B8860B] uppercase tracking-widest text-xs"
            >
              Masuk
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}