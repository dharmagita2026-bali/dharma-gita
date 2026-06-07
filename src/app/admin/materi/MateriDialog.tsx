"use client";

import React, { useState, useEffect, useRef } from 'react';

interface MateriDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  initialData?: { 
    id: string; title: string; slug: string; description: string; level: number;
    infoText1?: string | null; infoText2?: string | null;
    imageUrls?: string[]; 
  } | null;
}

export default function MateriDialog({ isOpen, onClose, onSubmit, initialData }: MateriDialogProps) {
  const [formData, setFormData] = useState({
    title: '', slug: '', description: '', level: 1, infoText1: '', infoText2: ''
  });
  
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [newFiles, setNewFiles] = useState<File[]>([]);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setFormData({ 
          title: initialData.title, 
          slug: initialData.slug, 
          description: initialData.description,
          level: initialData.level ?? 1,
          infoText1: initialData.infoText1 || '',
          infoText2: initialData.infoText2 || ''
        });
        setExistingImages(initialData.imageUrls || []);
        setNewFiles([]);
      } else {
        setFormData({ title: '', slug: '', description: '', level: 1, infoText1: '', infoText2: '' });
        setExistingImages([]);
        setNewFiles([]);
      }
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setNewFiles(prev => [...prev, ...Array.from(e.target.files!)]);
    }
  };

  const removeExisting = (index: number) => {
    setExistingImages(prev => prev.filter((_, i) => i !== index));
  };

  const removeNewFile = (index: number) => {
    setNewFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    setLoading(true);
    
    const data = new FormData();
    data.append("title", formData.title);
    data.append("slug", formData.slug);
    data.append("description", formData.description);
    data.append("level", formData.level.toString());
    data.append("infoText1", formData.infoText1);
    data.append("infoText2", formData.infoText2);
    
    data.append("existingImages", JSON.stringify(existingImages));
    
    newFiles.forEach((file) => data.append("imageUrls", file));

    const method = initialData ? 'PATCH' : 'POST';
    const url = initialData ? `/api/admin/materi/${initialData.id}` : '/api/admin/materi';
    
    try {
      const res = await fetch(url, { method, body: data });
      if (res.ok) {
        onSubmit();
        onClose();
      } else {
        alert("Gagal memproses materi.");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div className="absolute inset-0 bg-[#4E342E]/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white w-full max-w-lg rounded-[28px] sm:rounded-[40px] border-2 border-[#D7CCC8] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200 flex flex-col max-h-[92vh] sm:max-h-[90vh]">
        
        <header className="bg-[#F8F5F2] p-6 sm:p-8 border-b-2 border-[#D7CCC8] flex-shrink-0">
          <h2 className="text-xl sm:text-2xl font-black text-[#4E342E] uppercase italic tracking-tighter">
            {initialData ? 'Edit Materi' : '+ Tambah Materi Baru'}
          </h2>
        </header>

        <div className="p-6 sm:p-10 space-y-4 sm:space-y-6 overflow-y-auto flex-1">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-[#8D6E63] uppercase tracking-[0.2em]">Judul Materi</label>
            <input 
              type="text" 
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full bg-[#FDFBF9] border-2 border-[#F5F5F5] rounded-2xl p-4 text-sm font-bold text-[#4E342E] outline-none focus:border-[#D4A017] transition-all"
            />
          </div>

          <div className="flex flex-wrap gap-3 sm:gap-4">
            {existingImages.map((src, i) => (
              <div key={`existing-${i}`} className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl overflow-hidden border-2 border-[#D7CCC8]">
                <img src={src} alt="existing" className="w-full h-full object-cover" />
                <button type="button" onClick={() => removeExisting(i)} className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-4 h-4 text-[10px] flex items-center justify-center">×</button>
              </div>
            ))}
            {newFiles.map((file, i) => (
              <div key={`new-${i}`} className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl overflow-hidden border-2 border-green-500">
                <img src={URL.createObjectURL(file)} alt="new" className="w-full h-full object-cover" />
                <button type="button" onClick={() => removeNewFile(i)} className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-4 h-4 text-[10px] flex items-center justify-center">×</button>
              </div>
            ))}
            <button type="button" onClick={() => fileInputRef.current?.click()} className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl border-2 border-dashed border-[#D7CCC8] flex items-center justify-center text-lg">+</button>
            <input type="file" ref={fileInputRef} onChange={handleFileChange} multiple accept="image/*" className="hidden" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-[#8D6E63] uppercase tracking-[0.2em]">Slug (Cth: sekar-rare)</label>
              <input value={formData.slug} onChange={(e) => setFormData({...formData, slug: e.target.value})} className="w-full bg-[#FDFBF9] border-2 border-[#F5F5F5] rounded-2xl p-4 text-sm font-bold text-[#4E342E] outline-none focus:border-[#D4A017] transition-all" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-[#8D6E63] uppercase tracking-[0.2em]">Level</label>
              <input 
                type="number" 
                value={formData.level} 
                onChange={(e) => setFormData({ 
                  ...formData, 
                  level: e.target.value === '' ? 1 : parseInt(e.target.value, 10) 
                })} 
                className="w-full bg-[#FDFBF9] border-2 border-[#F5F5F5] rounded-2xl p-4 text-sm font-bold text-[#4E342E] outline-none focus:border-[#D4A017] transition-all" 
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-[#8D6E63] uppercase tracking-[0.2em]">Deskripsi Ringkas</label>
            <textarea value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="w-full bg-[#FDFBF9] border-2 border-[#F5F5F5] rounded-2xl p-4 text-sm font-bold text-[#4E342E] h-20 outline-none focus:border-[#D4A017] transition-all resize-none" />
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-[#8D6E63] uppercase tracking-[0.2em]">Info 1</label>
              <textarea value={formData.infoText1} onChange={(e) => setFormData({...formData, infoText1: e.target.value})} className="w-full bg-[#FDFBF9] border-2 border-[#F5F5F5] rounded-2xl p-4 text-xs font-bold text-[#4E342E] h-20 outline-none focus:border-[#D4A017] transition-all resize-none" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-[#8D6E63] uppercase tracking-[0.2em]">Info 2</label>
              <textarea value={formData.infoText2} onChange={(e) => setFormData({...formData, infoText2: e.target.value})} className="w-full bg-[#FDFBF9] border-2 border-[#F5F5F5] rounded-2xl p-4 text-xs font-bold text-[#4E342E] h-20 outline-none focus:border-[#D4A017] transition-all resize-none" />
            </div>
          </div>
        </div>

        <footer className="p-6 sm:p-8 bg-[#F8F5F2] border-t-2 border-[#D7CCC8] flex gap-3 sm:gap-4 flex-shrink-0">
          <button type="button" onClick={onClose} className="flex-1 p-3.5 sm:p-4 rounded-full text-[10px] font-black uppercase text-[#8D6E63] border-2 border-[#D7CCC8] hover:bg-white transition-all">
            Batal
          </button>
          <button type="button" onClick={handleSave} disabled={loading || !formData.title || !formData.slug} className="flex-1 p-3.5 sm:p-4 rounded-full text-[10px] font-black uppercase bg-[#4E342E] text-white shadow-xl hover:brightness-125 transition-all disabled:opacity-50">
            {loading ? 'Menyimpan...' : 'Simpan Materi'}
          </button>
        </footer>
      </div>
    </div>
  );
}