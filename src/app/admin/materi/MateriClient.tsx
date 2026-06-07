"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import MateriDialog from './MateriDialog';
import KidungDialog from './KidungDialog';

interface Kidung {
  id: string; title: string; description: string; lyrics: string; audioUrl: string; materiId: string;
}

interface MateriWithKidungs {
  id: string; 
  slug: string; 
  title: string; 
  description: string; 
  level: number;              
  infoText1?: string | null;  
  infoText2?: string | null;  
  imageUrls?: string[];       
  kidungs: Kidung[];
}

export default function MateriClient({ materiList }: { materiList: MateriWithKidungs[] }) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingMateri, setEditingMateri] = useState<MateriWithKidungs | null>(null);
  
  const [kidungDialogOpen, setKidungDialogOpen] = useState(false);
  const [activeMateriId, setActiveMateriId] = useState<string>("");
  const [editingKidung, setEditingKidung] = useState<Kidung | null>(null);
  
  const router = useRouter();

  const openAdd = () => {
    setEditingMateri(null);
    setDialogOpen(true);
  };

  const openEdit = (materi: MateriWithKidungs) => {
    setEditingMateri(materi);
    setDialogOpen(true);
  };

  const handleDeleteMateri = async (id: string, title: string) => {
    if (confirm(`Hapus materi "${title}"? Semua kidung di dalamnya juga akan terhapus.`)) {
      try {
        const res = await fetch(`/api/admin/materi/${id}`, { method: 'DELETE' });
        if (res.ok) router.refresh();
        else alert("Gagal menghapus materi.");
      } catch (err) {
        console.error(err);
      }
    }
  };

  const openAddKidung = (materiId: string) => {
    setActiveMateriId(materiId);
    setEditingKidung(null);
    setKidungDialogOpen(true);
  };

  const openEditKidung = (materiId: string, kidung: Kidung) => {
    setActiveMateriId(materiId);
    setEditingKidung(kidung);
    setKidungDialogOpen(true);
  };

  const handleDeleteKidung = async (id: string, title: string) => {
    if (confirm(`Hapus kidung "${title}"? Tindakan ini permanen.`)) {
      try {
        const res = await fetch(`/api/admin/kidung/${id}`, { method: 'DELETE' });
        if (res.ok) router.refresh();
        else alert("Gagal menghapus kidung.");
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="space-y-8 md:space-y-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <p className="text-[10px] font-black uppercase text-[#A1887F] tracking-[0.3em] italic">
          Total {materiList.length} Kategori Materi
        </p>
        <button 
          onClick={openAdd}
          className="w-full sm:w-auto bg-[#4E342E] text-white px-8 py-4 rounded-full text-[10px] font-black uppercase shadow-xl hover:brightness-125 transition-all active:scale-95 text-center"
        >
          + Tambah Materi
        </button>
      </div>

      <div className="space-y-8 md:space-y-10">
        {materiList.map((materi) => (
          <div key={materi.id} className="bg-white border-2 border-[#D7CCC8] rounded-[24px] sm:rounded-[35px] shadow-sm overflow-hidden">
            <div className="bg-[#F8F5F2] px-6 py-6 md:px-10 md:py-8 border-b-2 border-[#D7CCC8] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h3 className="font-black text-[#4E342E] text-xl sm:text-2xl uppercase italic tracking-tighter">{materi.title}</h3>
                <p className="text-[10px] text-[#A1887F] font-black italic mt-1 uppercase tracking-widest">Path: /{materi.slug}</p>
              </div>
              <div className="flex gap-4 sm:gap-6 items-center w-full sm:w-auto justify-end border-t sm:border-t-0 pt-3 sm:pt-0 border-[#D7CCC8]/40">
                <button 
                  onClick={() => openEdit(materi)}
                  className="text-[10px] font-black uppercase text-[#D4A017] underline decoration-2 underline-offset-4 hover:text-[#4E342E] transition-colors italic"
                >
                  Edit Materi
                </button>
                <button 
                  onClick={() => handleDeleteMateri(materi.id, materi.title)}
                  className="text-[10px] font-black uppercase text-red-400 underline decoration-2 underline-offset-4 hover:text-red-600 transition-colors italic"
                >
                  Hapus
                </button>
              </div>
            </div>

            <div className="p-6 md:p-10 space-y-4">
              {materi.kidungs.length > 0 ? (
                materi.kidungs.map((k) => (
                  <div key={k.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 md:p-6 border-2 border-[#F5F5F5] rounded-2xl sm:rounded-3xl bg-[#FDFBF9] hover:border-[#D7CCC8] transition-all group gap-4">
                    <div className="flex items-center gap-4 sm:gap-6">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white border-2 border-[#D7CCC8] rounded-xl sm:rounded-2xl flex items-center justify-center text-lg sm:text-xl shadow-sm group-hover:rotate-3 transition-transform flex-shrink-0">
                        🎵
                      </div>
                      <div>
                        <p className="font-black text-[#4E342E] text-xs sm:text-sm uppercase italic">{k.title}</p>
                        <p className="text-[9px] text-[#A1887F] font-black uppercase tracking-widest">Bagian dari {materi.title}</p>
                      </div>
                    </div>
                    <div className="flex gap-6 text-[10px] font-black uppercase italic w-full sm:w-auto justify-end border-t sm:border-t-0 pt-2 sm:pt-0 border-[#F5F5F5]">
                      <button 
                        onClick={() => openEditKidung(materi.id, k)} 
                        className="text-[#D4A017] hover:underline decoration-2 underline-offset-4"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDeleteKidung(k.id, k.title)} 
                        className="text-red-400 hover:underline decoration-2 underline-offset-4"
                      >
                        Hapus
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-8 md:py-10 text-center border-2 border-dashed border-[#D7CCC8] rounded-2xl sm:rounded-3xl bg-[#FDFBF9]">
                   <p className="text-[10px] font-black uppercase text-[#A1887F] tracking-[0.2em] italic px-4">Belum ada kidung dalam kategori ini.</p>
                </div>
              )}
              
              <button 
                onClick={() => openAddKidung(materi.id)}
                className="w-full mt-4 bg-[#FDFBF9] border-2 border-[#D7CCC8] py-4 sm:py-5 px-4 rounded-2xl sm:rounded-3xl text-[10px] font-black uppercase text-[#4E342E] hover:bg-[#4E342E] hover:text-white transition-all shadow-sm flex items-center justify-center gap-2 italic tracking-widest break-words text-center"
              >
                + Tambah Kidung Ke {materi.title}
              </button>
            </div>
          </div>
        ))}
      </div>

      <MateriDialog 
        isOpen={dialogOpen} 
        onClose={() => setDialogOpen(false)} 
        onSubmit={() => router.refresh()} 
        initialData={editingMateri} 
      />

      <KidungDialog 
        isOpen={kidungDialogOpen}
        onClose={() => setKidungDialogOpen(false)}
        onSubmit={() => router.refresh()}
        materiId={activeMateriId}
        initialData={editingKidung}
      />
    </div>
  );
}