"use client";

import { signOut } from "next-auth/react";

export default function LogoutButton() {
  return (
    <button 
      onClick={() => signOut({ callbackUrl: "/" })}
      className="w-full border-2 border-red-100 text-red-500 py-4 rounded-2xl text-[10px] font-black uppercase hover:bg-red-500 hover:text-white transition-all italic tracking-widest shadow-sm active:scale-95 cursor-pointer"
    >
      Keluar
    </button>
  );
}