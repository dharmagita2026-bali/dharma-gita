"use client";

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { signOut } from "next-auth/react";

interface UserProps {
  user: {
    username: string;
    name?: string | null;
    image?: string | null;
    exp: number;
    level: number;
  };
}

const getPrestigeData = (totalExp: number) => {
  if (totalExp < 500) {
    return {
      title: "Pemain Pemula",
      currentTierProgress: totalExp,
      tierTarget: 500,
      color: "text-[#8D6E63]"
    };
  } else if (totalExp < 1500) {
    return {
      title: "Kesatria Kidung",
      currentTierProgress: totalExp - 500,
      tierTarget: 1000,
      color: "text-[#D4A017]"
    };
  } else {
    return {
      title: "Master Sekar Suci",
      currentTierProgress: 100,
      tierTarget: 100,
      color: "text-[#2E7D32]"
    };
  }
};

export default function ProfileClient({ user }: UserProps) {
  const [name, setName] = useState(user.name || "");
  const [previewUrl, setPreviewUrl] = useState<string | null>(user.image || null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isSavingPassword, setIsSavingPassword] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const prestige = getPrestigeData(user.exp);
  const progressPercentage = Math.round((prestige.currentTierProgress / prestige.tierTarget) * 100);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
      if (!allowedTypes.includes(file.type)) {
        alert("Gagal: Hanya format JPG, JPEG, dan PNG yang diperbolehkan!");
        if (fileInputRef.current) fileInputRef.current.value = ""; 
        return;
      }

      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSavePassword = async () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      alert("Semua kolom password harus diisi!");
      return;
    }
    if (newPassword.length < 8) {
      alert("Password baru minimal harus 8 karakter!");
      return;
    }
    if (newPassword !== confirmPassword) {
      alert("Konfirmasi password tidak cocok dengan password baru!");
      return;
    }

    setIsSavingPassword(true);

    try {
      const res = await fetch("/api/profile/password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ oldPassword, newPassword }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Password berhasil diperbarui!");
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        alert(data.error || "Gagal memperbarui password");
      }
    } catch (error) {
      console.error(error);
      alert("Terjadi kesalahan sistem saat menyimpan password.");
    } finally {
      setIsSavingPassword(false);
    }
  };

  const handleSaveProfile = async () => {
    setIsSaving(true);
    const formData = new FormData();
    formData.append("name", name);
    if (selectedFile) formData.append("file", selectedFile);

    try {
      const res = await fetch("/api/profile/update", { method: "POST", body: formData });
      if (res.ok) {
        alert("Profil diperbarui!");
        router.refresh();
      }
    } catch (error) {
      console.error(error);
    } finally { setIsSaving(false); }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF9] flex flex-col md:flex-row">
      <aside className="w-full md:w-72 border-b md:border-b-0 md:border-r border-[#D7CCC8] bg-white p-6 md:p-8 flex flex-col justify-between flex-shrink-0 gap-6 md:gap-0">
        <div className="space-y-6 md:space-y-10">
          
          <div className="flex flex-row md:flex-col items-center text-left md:text-center gap-4 md:gap-3">
            <div className="w-16 h-16 md:w-24 md:h-24 shrink-0 border-2 border-[#4E342E] bg-[#FDFBF9] rounded-2xl md:rounded-3xl flex items-center justify-center overflow-hidden shadow-sm">
              {previewUrl ? (
                <img src={previewUrl} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                <span className="text-3xl md:text-4xl">👤</span>
              )}
            </div>
            <div className="space-y-0.5 flex-1">
              <span className={`text-[9px] font-black uppercase tracking-wider block ${prestige.color}`}>
                {prestige.title}
              </span>
              <p className="font-black uppercase text-xs md:text-sm tracking-widest text-[#4E342E] italic">
                @{user.username}
              </p>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-[9px] md:text-[10px] font-black uppercase tracking-widest text-[#8D6E63]">
              <span>Materi Lvl {user.level}</span>
              <span>{user.exp} EXP</span>
            </div>
            <div className="w-full h-3 bg-[#F5F5F5] rounded-full overflow-hidden border border-[#D7CCC8] p-0.5">
              <div 
                className="h-full bg-linear-to-r from-[#F3D06D] to-[#D4A017] rounded-full transition-all duration-700" 
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
            <span className="text-[8px] font-bold text-[#8D6E63] block text-right">
              {user.exp < 1500 ? `${prestige.currentTierProgress} / ${prestige.tierTarget} ke pangkat baru` : 'Pangkat Maksimal'}
            </span>
          </div>

          <nav className="grid grid-cols-2 md:grid-cols-1 gap-3 md:gap-4 text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em]">
            <div 
              onClick={() => router.push('/game')}
              className="p-3 md:p-4 border-2 border-[#D7CCC8] text-[#4E342E] hover:bg-[#FDFBF9] rounded-xl md:rounded-2xl cursor-pointer text-center transition-all flex items-center justify-center"
            >
              Dashboard Arena
            </div>
            <div className="p-3 md:p-4 bg-[#4E342E] text-white rounded-xl md:rounded-2xl cursor-pointer text-center shadow-md transform italic flex items-center justify-center">
              Profil Saya
            </div>
          </nav>
        </div>

        <button 
          onClick={() => signOut({ callbackUrl: "/" })}
          className="w-full mt-4 md:mt-0 border-2 border-red-100 text-red-500 py-3.5 md:py-4 rounded-xl md:rounded-2xl text-[10px] font-black uppercase hover:bg-red-500 hover:text-white transition-all italic"
        >
          Logout
        </button>
      </aside>

      <main className="flex-1 p-6 md:p-10 lg:p-16 space-y-8 md:space-y-10 overflow-y-auto">
        <header className="border-b-2 border-[#D7CCC8] pb-4 md:pb-6 text-center md:text-left">
          <h1 className="text-3xl md:text-5xl font-black text-[#4E342E] uppercase italic tracking-tighter">Profil</h1>
          <p className="text-[10px] md:text-[11px] text-[#8D6E63] uppercase font-black tracking-widest mt-1 md:mt-2">
            Kelola identitas dan keamanan akun anda
          </p>
        </header>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 md:gap-10">
          
          <section className="bg-white rounded-[30px] md:rounded-[35px] border-2 border-[#D7CCC8] shadow-sm overflow-hidden">
            <div className="bg-[#F8F5F2] border-b-2 border-[#D7CCC8] px-6 md:px-8 py-3 md:py-4 text-[10px] md:text-[11px] font-black uppercase text-[#4E342E] italic text-center md:text-left">
              Informasi Dasar
            </div>
            <div className="p-6 md:p-10 space-y-6 md:space-y-8">
              <div className="aspect-video h-40 md:h-auto w-full border-2 border-[#F5F5F5] bg-[#FDFBF9] rounded-2xl flex items-center justify-center overflow-hidden">
                {previewUrl ? (
                  <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <div className="flex flex-col items-center gap-2 opacity-30">
                    <span className="text-3xl md:text-4xl">🖼️</span>
                    <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest">Belum ada foto</span>
                  </div>
                )}
              </div>

              <div className="space-y-2 md:space-y-3">
                <label className="text-[9px] md:text-[10px] font-black text-[#8D6E63] uppercase tracking-widest">Nama Lengkap</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border-2 border-[#F5F5F5] bg-[#FDFBF9] p-3 md:p-4 rounded-xl md:rounded-2xl text-xs md:text-sm font-bold text-[#4E342E] focus:border-[#D4A017] outline-none transition-all" 
                />
              </div>
              
              <div className="space-y-2 md:space-y-3">
                <label className="text-[9px] md:text-[10px] font-black text-[#8D6E63] uppercase tracking-widest">Ganti Foto</label>
                <div className="border-2 border-[#F5F5F5] p-2 md:p-3 rounded-xl md:rounded-2xl flex gap-2 md:gap-3 items-center bg-[#FDFBF9]">
                  <input 
                    type="file" 
                    ref={fileInputRef}
                    accept=".jpg,.jpeg,.png,image/jpeg,image/png"
                    onChange={handleFileChange}
                    className="text-[9px] md:text-[10px] flex-1 cursor-pointer font-bold text-[#A1887F] w-full" 
                  />
                  <button 
                    onClick={() => { setPreviewUrl(null); setSelectedFile(null); }}
                    className="p-2 hover:bg-red-50 rounded-xl text-red-400 transition-colors"
                  >
                    🗑️
                  </button>
                </div>
              </div>

              <button 
                onClick={handleSaveProfile}
                disabled={isSaving}
                className="w-full bg-linear-to-b from-[#F3D06D] to-[#D4A017] text-[#4E342E] py-3.5 md:py-4 rounded-full text-[10px] md:text-[11px] font-black uppercase shadow-xl hover:brightness-110 transition-all disabled:opacity-50 italic"
              >
                {isSaving ? "Menyimpan..." : "Update Profil"}
              </button>
            </div>
          </section>

          <section className="bg-white rounded-[30px] md:rounded-[35px] border-2 border-[#D7CCC8] shadow-sm overflow-hidden h-fit">
            <div className="bg-[#F8F5F2] border-b-2 border-[#D7CCC8] px-6 md:px-8 py-3 md:py-4 text-[10px] md:text-[11px] font-black uppercase text-[#4E342E] italic text-center md:text-left">
              Keamanan Akun
            </div>
            <div className="p-6 md:p-10 space-y-5 md:space-y-6">
              {[
                { label: "Password Lama", val: oldPassword, set: setOldPassword },
                { label: "Password Baru", val: newPassword, set: setNewPassword },
                { label: "Konfirmasi Password", val: confirmPassword, set: setConfirmPassword }
              ].map((field) => (
                <div key={field.label} className="space-y-2 md:space-y-3">
                  <label className="text-[9px] md:text-[10px] font-black text-[#8D6E63] uppercase tracking-widest">{field.label}</label>
                  <input 
                    type="password" 
                    value={field.val}
                    onChange={(e) => field.set(e.target.value)}
                    placeholder="••••••••" 
                    className="w-full border-2 border-[#F5F5F5] bg-[#FDFBF9] p-3 md:p-4 rounded-xl md:rounded-2xl text-xs md:text-sm outline-none focus:border-[#D4A017] transition-all" 
                  />
                </div>
              ))}
              <div className="flex justify-center md:justify-end pt-4">
                <button 
                  onClick={handleSavePassword}
                  disabled={isSavingPassword}
                  className="w-full md:w-auto bg-[#4E342E] text-white px-8 md:px-10 py-3.5 md:py-3 rounded-full text-[9px] md:text-[10px] font-black uppercase shadow-lg hover:brightness-110 transition-all active:scale-95 disabled:opacity-50"
                >
                  {isSavingPassword ? "Menyimpan..." : "Simpan Password"}
                </button>
              </div>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}