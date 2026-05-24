"use client";

import React, { useState, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';

interface Kidung {
  id: string;
  title: string;
  description: string;
  lyrics: string;
  audioUrl: string;
  materiId: string;
}

interface MateriWithKidungs {
  id: string;
  slug: string;
  title: string;
  description: string;
  kidungs: Kidung[];
}

interface User {
  id: string;
  username: string;
  name: string | null;
  role: string;
  level: number;
  exp: number;
  createdAt: Date;
}

interface AdminClientProps {
  users: User[]; 
  materiList: MateriWithKidungs[]; 
}

export default function AdminClient({ users, materiList }: AdminClientProps) {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'pengguna' | 'materi'>('dashboard');
  const [isUploading, setIsUploading] = useState(false);
  const router = useRouter();

  const handleAddKidung = async (materiId: string) => {
    const title = prompt("Masukkan Judul Kidung:");
    if (!title) return;

    const lyrics = prompt("Masukkan Lirik Kidung:");
    
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'audio/*';
    
    fileInput.onchange = async (e: Event) => {
      const target = e.target as HTMLInputElement;
      const file = target.files?.[0];
      if (!file) return;

      setIsUploading(true);
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", `Materi untuk ${title}`);
      formData.append("lyrics", lyrics || "");
      formData.append("materiId", materiId);
      formData.append("audio", file);

      try {
        const res = await fetch("/api/admin/kidung", {
          method: "POST",
          body: formData,
        });

        if (res.ok) {
          alert("Kidung Berhasil Diunggah ke Cloudinary!");
          router.refresh();
        } else {
          const err = await res.json();
          alert(`Gagal: ${err.error}`);
        }
      } catch (error) {
        console.error(error);
        alert("Terjadi kesalahan saat upload.");
      } finally {
        setIsUploading(false);
      }
    };
    
    fileInput.click();
  };

  return (
    <div className="flex min-h-screen bg-[#FDFBF9]">
      {/* SIDEBAR */}
      <aside className="w-72 border-r border-[#D7CCC8] bg-white p-8 flex flex-col justify-between sticky top-0 h-screen">
        <div className="space-y-10">
          <div className="text-center space-y-4">
            <div className="w-20 h-20 border-2 border-[#4E342E] mx-auto bg-[#FDFBF9] rounded-3xl flex items-center justify-center text-3xl shadow-sm italic font-black">
              DG
            </div>
            <p className="font-black uppercase text-[10px] tracking-[0.2em] text-[#4E342E] italic">Admin Panel</p>
          </div>

          <nav className="space-y-3 text-[10px] font-black uppercase tracking-[0.2em]">
            <button 
              onClick={() => setActiveTab('dashboard')}
              className={`w-full p-4 rounded-2xl text-center transition-all ${activeTab === 'dashboard' ? 'bg-[#4E342E] text-white shadow-lg' : 'border-2 border-[#D7CCC8] text-[#4E342E]'}`}
            >
              Dashboard
            </button>
            <div className="pt-6 pb-2 px-4 text-[9px] font-black text-[#A1887F] uppercase tracking-[0.3em]">Pengelolaan</div>
            <button 
              onClick={() => setActiveTab('pengguna')}
              className={`w-full p-4 rounded-2xl text-center transition-all ${activeTab === 'pengguna' ? 'bg-[#D4A017] text-white shadow-lg' : 'border-2 border-[#D7CCC8] text-[#4E342E]'}`}
            >
              Daftar Pengguna
            </button>
            <button 
              onClick={() => setActiveTab('materi')}
              className={`w-full p-4 rounded-2xl text-center transition-all ${activeTab === 'materi' ? 'bg-[#D4A017] text-white shadow-lg' : 'border-2 border-[#D7CCC8] text-[#4E342E]'}`}
            >
              Daftar Materi
            </button>
          </nav>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-16 overflow-y-auto">
        <header className="border-b-2 border-[#D7CCC8] pb-6 mb-12">
          <h1 className="text-5xl font-black text-[#4E342E] uppercase italic tracking-tighter">
            {activeTab === 'dashboard' ? 'Overview' : activeTab === 'pengguna' ? 'Daftar Pengguna' : 'Materi & Kidung'}
          </h1>
          <p className="text-[11px] text-[#8D6E63] font-black uppercase tracking-widest mt-2">Dharma Gita Management</p>
        </header>

        {activeTab === 'dashboard' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <StatCard label="Total Siswa" value={users.length} icon="👥" />
            <StatCard label="Total Materi" value={materiList.length} icon="📖" />
            <StatCard label="Total Kidung" value={materiList.reduce((acc, m) => acc + m.kidungs.length, 0)} icon="🎶" />
          </div>
        )}

        {activeTab === 'pengguna' && (
          <div className="bg-white border-2 border-[#D7CCC8] rounded-[35px] overflow-hidden shadow-sm">
            <table className="w-full text-left">
              <thead className="bg-[#F8F5F2] border-b-2 border-[#D7CCC8]">
                <tr className="text-[10px] font-black uppercase text-[#4E342E] italic tracking-widest">
                  <th className="px-10 py-6">User</th>
                  <th className="px-10 py-6">Role</th>
                  <th className="px-10 py-6">Progress</th>
                  <th className="px-10 py-6 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="text-xs font-bold text-[#8D6E63] uppercase">
                {users.map((u) => (
                  <tr key={u.id} className="border-b border-[#F5F5F5] hover:bg-[#FDFBF9]">
                    <td className="px-10 py-6">
                      <p className="text-[#4E342E] font-black">{u.name || 'Anonymous'}</p>
                      <p className="text-[9px] opacity-60">@{u.username}</p>
                    </td>
                    <td className="px-10 py-6">
                      <span className={`px-3 py-1 rounded-full text-[9px] font-black ${u.role === 'admin' ? 'bg-[#4E342E] text-[#D4A017]' : 'bg-[#D7CCC8] text-white'}`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="px-10 py-6 italic text-[#4E342E]">LVL {u.level} — {u.exp} XP</td>
                    <td className="px-10 py-6 text-right italic underline cursor-pointer">Manage</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'materi' && (
          <div className="space-y-10">
            {materiList.map((materi) => (
              <div key={materi.id} className="bg-white border-2 border-[#D7CCC8] rounded-[35px] shadow-sm overflow-hidden">
                <div className="bg-[#F8F5F2] px-10 py-6 border-b-2 border-[#D7CCC8] flex justify-between items-center">
                  <div>
                    <h3 className="font-black text-[#4E342E] text-lg uppercase italic">{materi.title}</h3>
                    <p className="text-[9px] text-[#A1887F] font-black uppercase tracking-tighter italic">Slug: {materi.slug}</p>
                  </div>
                  <button 
                    disabled={isUploading}
                    onClick={() => handleAddKidung(materi.id)}
                    className="bg-[#D4A017] text-white px-6 py-2 rounded-full text-[9px] font-black uppercase shadow-md hover:scale-105 transition-all disabled:opacity-50"
                  >
                    {isUploading ? "Uploading..." : "+ Tambah Kidung"}
                  </button>
                </div>
                <div className="p-10 space-y-4">
                  {materi.kidungs.length > 0 ? (
                    materi.kidungs.map((k) => (
                      <div key={k.id} className="flex items-center justify-between p-6 border-2 border-[#F5F5F5] rounded-3xl bg-[#FDFBF9]">
                        <div className="flex items-center gap-6">
                          <span className="text-xl">🎵</span>
                          <div>
                            <p className="font-black text-[#4E342E] text-sm uppercase italic">{k.title}</p>
                            <p className="text-[9px] text-[#A1887F] font-black">Audio: Cloudinary Managed</p>
                          </div>
                        </div>
                        <div className="flex gap-4 italic text-[10px] font-black uppercase">
                          <button className="text-[#D4A017] hover:underline">Edit</button>
                          <button className="text-red-400 hover:underline">Hapus</button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-center text-[#A1887F] text-[10px] uppercase font-bold py-4">Belum ada kidung.</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

function StatCard({ label, value, icon }: { label: string; value: number; icon: string }) {
  return (
    <div className="bg-white border-2 border-[#D7CCC8] p-12 rounded-[40px] shadow-sm">
      <div className="flex items-center gap-4 mb-6 opacity-40">
        <span className="text-3xl">{icon}</span>
        <p className="text-[10px] font-black text-[#A1887F] uppercase tracking-[0.2em]">{label}</p>
      </div>
      <p className="text-5xl font-black text-[#4E342E] italic tracking-tighter">{value}</p>
    </div>
  );
}