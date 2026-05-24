"use client";

import React, { useState, useEffect, ChangeEvent } from 'react';

interface KidungDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  materiId: string;
  initialData?: { 
    id: string; 
    title: string; 
    description: string; 
    lyrics: string; 
    audioUrl: string 
  } | null;
}

export default function KidungDialog({ isOpen, onClose, onSubmit, materiId, initialData }: KidungDialogProps) {
  const [formData, setFormData] = useState({ title: '', lyrics: '', description: '' });
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData({ 
        title: initialData.title, 
        lyrics: initialData.lyrics, 
        description: initialData.description 
      });
    } else {
      setFormData({ title: '', lyrics: '', description: '' });
    }
    setFile(null); 
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setFile(e.target.files[0]);
  };

  const handleSave = async () => {
    setLoading(true);
    const data = new FormData();
    data.append("title", formData.title);
    data.append("lyrics", formData.lyrics);
    data.append("description", formData.description);
    data.append("materiId", materiId);
    
    if (file) data.append("audio", file);

    try {
      const url = initialData 
        ? `/api/admin/kidung/${initialData.id}` 
        : `/api/admin/kidung`;
      
      const method = initialData ? "PATCH" : "POST";

      const res = await fetch(url, {
        method: method,
        body: data,
      });

      if (res.ok) {
        onSubmit();
        onClose();
      } else {
        const errorData = await res.json();
        alert(errorData.error || "Gagal memproses data.");
      }
    } catch (err) {
      console.error("Save Error:", err);
      alert("Terjadi kesalahan koneksi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-[#4E342E]/60 backdrop-blur-md" onClick={onClose} />
      <div className="relative bg-white w-full max-w-2xl rounded-[40px] border-2 border-[#D7CCC8] shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in duration-200">
        
        <header className="bg-[#F8F5F2] p-8 border-b-2 border-[#D7CCC8] flex-shrink-0">
          <h2 className="text-2xl font-black text-[#4E342E] uppercase italic tracking-tighter">
            {initialData ? 'Edit Kidung' : '+ Tambah Kidung Baru'}
          </h2>
        </header>

        <div className="p-10 space-y-6 overflow-y-auto flex-1">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-[#8D6E63] uppercase tracking-[0.2em]">Judul Kidung</label>
            <input 
              type="text" 
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full bg-[#FDFBF9] border-2 border-[#F5F5F5] rounded-2xl p-4 text-sm font-bold text-[#4E342E] outline-none focus:border-[#D4A017] transition-all"
              placeholder="Contoh: Juru Pencar"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-[#8D6E63] uppercase tracking-[0.2em]">
              File Audio {initialData && "(Kosongkan jika tidak ingin mengubah)"}
            </label>
            <div className="relative">
              <input 
                type="file" 
                accept="audio/*"
                onChange={handleFileChange}
                className="hidden" 
                id="kidung-audio-upload"
              />
              <label 
                htmlFor="kidung-audio-upload"
                className="flex items-center justify-between w-full bg-[#FDFBF9] border-2 border-dashed border-[#D7CCC8] rounded-2xl p-4 cursor-pointer hover:bg-white transition-all"
              >
                <span className="text-xs font-bold text-[#A1887F] truncate pr-4">
                  {file ? file.name : (initialData ? "Audio tersimpan (klik untuk ganti)" : "Pilih file audio (mp3, wav, ogg)")}
                </span>
                <span className="bg-[#4E342E] text-white px-4 py-2 rounded-xl text-[9px] font-black uppercase flex-shrink-0">Browse</span>
              </label>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-[#8D6E63] uppercase tracking-[0.2em]">Deskripsi / Kegunaan Kidung</label>
            <textarea 
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full bg-[#FDFBF9] border-2 border-[#F5F5F5] rounded-2xl p-4 text-sm font-bold text-[#4E342E] h-24 outline-none focus:border-[#D4A017] transition-all resize-none"
              placeholder="Tuliskan konteks ritual, fungsi penggunaan, atau arti filosofis..."
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-[#8D6E63] uppercase tracking-[0.2em]">Lirik Kidung</label>
            <textarea 
              value={formData.lyrics}
              onChange={(e) => setFormData({ ...formData, lyrics: e.target.value })}
              className="w-full bg-[#FDFBF9] border-2 border-[#F5F5F5] rounded-2xl p-4 text-sm font-bold text-[#4E342E] h-48 outline-none focus:border-[#D4A017] transition-all resize-none"
              placeholder="Tuliskan bait bait lirik di sini..."
            />
          </div>
        </div>

        <footer className="p-8 bg-[#F8F5F2] border-t-2 border-[#D7CCC8] flex gap-4 flex-shrink-0">
          <button onClick={onClose} className="flex-1 p-4 rounded-full text-[10px] font-black uppercase text-[#8D6E63] border-2 border-[#D7CCC8] hover:bg-white transition-all">
            Batal
          </button>
          <button 
            onClick={handleSave} 
            disabled={loading || (!initialData && !file) || !formData.title || !formData.description || !formData.lyrics}
            className="flex-1 p-4 rounded-full text-[10px] font-black uppercase bg-[#D4A017] text-white shadow-xl hover:brightness-110 transition-all disabled:opacity-50 disabled:grayscale"
          >
            {loading ? 'Sedang Memproses...' : 'Simpan Kidung'}
          </button>
        </footer>
      </div>
    </div>
  );
}