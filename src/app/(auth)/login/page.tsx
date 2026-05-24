"use client";

import Link from 'next/link';
import React, { useState } from 'react';
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); 
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await signIn("credentials", {
      username,
      password,
      redirect: false, 
    });

    if (result?.error) {
      setError("Login Gagal: Username atau password salah.");
      setLoading(false);
    } else {
      router.push("/profile");
      router.refresh(); 
    }
  };

  return (
    <div className="w-full max-w-md bg-white border-4 border-[#D7CCC8] rounded-[45px] p-10 space-y-10 shadow-sm text-[#4E342E] font-sans">
      
      <div className="flex flex-col items-center justify-center gap-2">
        <div className="w-20 h-20 bg-[#F8F5F2] border-2 border-[#D7CCC8] rounded-[25px] flex items-center justify-center shadow-sm">
          <img src="/images/logo-music.png" alt="Music Logo" className="w-12 h-12 object-contain" />
        </div>
        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#A1887F] italic mt-2">Dharma Gita</span>
      </div>

      <div className="text-center space-y-3">
        <h1 className="text-3xl font-black uppercase tracking-tighter italic text-[#4E342E]">Login</h1>
        <p className="text-xs text-[#8D6E63] font-medium leading-relaxed max-w-[300px] mx-auto">
          Masuk untuk melanjutkan perjalanan belajar kidung Bali Anda.
        </p>
      </div>

      <form onSubmit={handleLogin} className="space-y-5">
        {error && (
          <p className="text-[#D32F2F] text-[10px] uppercase font-black text-center border-2 border-[#EF9A9A] bg-[#FFEBEE] p-3 rounded-2xl tracking-wide">
            {error}
          </p>
        )}

        <div className="relative border-2 border-[#D7CCC8] rounded-2xl overflow-hidden group focus-within:border-[#D4A017] transition-colors bg-[#FDFBF9]">
          <div className="absolute left-0 top-0 bottom-0 w-12 border-r border-[#EFEBE9] flex items-center justify-center text-sm opacity-70">
            👤 
          </div>
          <input 
            required
            type="text" 
            placeholder="Username" 
            className="w-full p-4 pl-16 text-sm font-bold placeholder-[#A1887F]/60 text-[#4E342E] outline-none bg-transparent"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="relative border-2 border-[#D7CCC8] rounded-2xl overflow-hidden group focus-within:border-[#D4A017] transition-colors bg-[#FDFBF9]">
          <div className="absolute left-0 top-0 bottom-0 w-12 border-r border-[#EFEBE9] flex items-center justify-center text-sm opacity-70">
            🔒 
          </div>
          <input 
            required
            type={showPassword ? "text" : "password"} 
            placeholder="Password" 
            className="w-full p-4 pl-16 pr-12 text-sm font-bold placeholder-[#A1887F]/60 text-[#4E342E] outline-none bg-transparent"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-[#A1887F] opacity-60 text-sm select-none hover:opacity-100 transition-opacity focus:outline-none"
          >
            {showPassword ? "🙈" : "👁️"}
          </button>
        </div>

        <button 
          disabled={loading}
          type="submit" 
          className="w-full bg-linear-to-b from-[#F3D06D] to-[#D4A017] text-[#5D4037] font-black py-4 rounded-full shadow-lg hover:brightness-110 transition-all uppercase text-xs tracking-widest italic pt-4.5"
        >
          {loading ? "Sabar..." : "Mulai Masuk →"}
        </button>
      </form>

      <div className="text-center pt-2 border-t-2 border-[#F5F5F5]">
        <p className="text-[10px] text-[#A1887F] font-bold uppercase tracking-wider">
          Belum punya akun? <Link href="/register" className="font-black text-[#D4A017] underline hover:text-[#4E342E] transition-colors">Daftar disini</Link>
        </p>
      </div>
    </div>
  );
}