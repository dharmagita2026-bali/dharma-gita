import React from 'react';
import Link from 'next/link';
import LogoutButton from './LogOutButton';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[#FDFBF9]">
      <aside className="w-72 border-r border-[#D7CCC8] bg-white p-8 flex flex-col justify-between sticky top-0 h-screen">
        <div className="space-y-10">
          <div className="text-center space-y-4">
            <div className="w-20 h-20 border-2 border-[#4E342E] mx-auto bg-[#FDFBF9] rounded-3xl flex items-center justify-center text-3xl shadow-sm italic font-black">
              DG
            </div>
            <p className="font-black uppercase text-[10px] tracking-[0.2em] text-[#4E342E] italic">Admin Panel</p>
          </div>

          <nav className="space-y-3 text-[10px] font-black uppercase tracking-[0.2em]">
            <NavLink href="/admin" label="Dashboard" />
            <div className="pt-6 pb-2 px-4 text-[9px] font-black text-[#A1887F] uppercase tracking-[0.3em]">Pengelolaan</div>
            <NavLink href="/admin/users" label="Daftar Pengguna" />
            <NavLink href="/admin/materi" label="Daftar Materi" />
            <div className="pt-6 pb-2 px-4 text-[9px] font-black text-[#A1887F] uppercase tracking-[0.3em]">Keluar</div>
            <LogoutButton />
          </nav>
        </div>
      </aside>
      <main className="flex-1 p-16 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}

function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} className="block w-full p-4 rounded-2xl border-2 border-[#D7CCC8] text-[#4E342E] text-center transition-all hover:bg-[#4E342E] hover:text-white hover:shadow-lg active:scale-95 font-black uppercase tracking-widest">
      {label}
    </Link>
  );
}