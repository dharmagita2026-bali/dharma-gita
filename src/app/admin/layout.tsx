"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import LogoutButton from './LogOutButton';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#FDFBF9]">
      <aside className="w-full md:w-72 border-b md:border-b-0 md:border-r border-[#D7CCC8] bg-white p-3 md:p-8 flex flex-col justify-between md:sticky md:top-0 md:h-screen z-20">
        <div className="md:space-y-10">
          
          <div className="hidden md:flex flex-col items-center space-y-4 text-center justify-center">
            <div className="w-20 h-20 border-2 border-[#4E342E] mx-auto bg-[#FDFBF9] rounded-3xl flex items-center justify-center text-3xl shadow-sm italic font-black shrink-0">
              <img src="/images/dharma-gita-logo.png" alt="Music Logo" className="object-contain w-auto" />
            </div>
            <p className="font-black uppercase text-[10px] tracking-[0.2em] text-[#4E342E] italic">Admin Panel</p>
          </div>

          <nav className="flex flex-row md:flex-col gap-2 md:gap-0 md:space-y-3 text-[10px] font-black uppercase tracking-[0.2em] overflow-x-auto items-center md:items-stretch">
            <NavLink href="/admin" label="Dashboard" />
            
            <div className="hidden md:block pt-6 pb-2 px-4 text-[9px] font-black text-[#A1887F] uppercase tracking-[0.3em]">
              Pengelolaan
            </div>
            
            <NavLink href="/admin/users" label="Daftar Pengguna" />
            <NavLink href="/admin/materi" label="Daftar Materi" />
            
            <div className="hidden md:block pt-6 pb-2 px-4 text-[9px] font-black text-[#A1887F] uppercase tracking-[0.3em]">
              Keluar
            </div>
            
            <div className="shrink-0 md:w-full">
              <LogoutButton />
            </div>
          </nav>
        </div>
      </aside>
      <main className="flex-1 p-4 md:p-8 lg:p-16 overflow-y-auto w-full">
        {children}
      </main>
    </div>
  );
}

function NavLink({ href, label }: { href: string; label: string }) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link 
      href={href} 
      className={`block w-fit md:w-full shrink-0 px-6 py-3 md:p-4 rounded-xl md:rounded-2xl transition-all active:scale-95 font-black uppercase tracking-widest whitespace-nowrap border-2
        ${isActive 
          ? 'bg-[#4E342E] text-white border-[#4E342E] shadow-lg' 
          : 'bg-white border-[#D7CCC8] text-[#4E342E] hover:border-[#4E342E] hover:bg-[#FDFBF9]'
        }
      `}
    >
      {label}
    </Link>
  );
}