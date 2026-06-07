"use client";

import React, { useState, useEffect } from 'react';

export interface User {
  id: string;
  username: string;
  name: string | null;
  role: string;
  level: number;
  exp: number;
  createdAt: Date;
}

interface UserDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  user: User | null;
}

export default function UserDialog({ isOpen, onClose, onSubmit, user }: UserDialogProps) {
  const [formData, setFormData] = useState({ 
    role: 'user', 
    level: 1, 
    exp: 0 
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({ 
        role: user.role, 
        level: user.level, 
        exp: user.exp 
      });
    }
  }, [user, isOpen]);

  if (!isOpen || !user) return null;

  const url = `/api/admin/users/${user.id}`;

  const handleSave = async () => {
    setLoading(true);
    try {
      const res = await fetch(url, {
        method: 'PATCH',
        body: JSON.stringify({ 
          id: user.id, 
          ...formData 
        }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (res.ok) {
        onSubmit();
        onClose();
      }
    } catch (error) {
      console.error("Update failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div className="absolute inset-0 bg-[#4E342E]/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white w-full max-w-md rounded-[28px] sm:rounded-[40px] border-2 border-[#D7CCC8] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <header className="bg-[#F8F5F2] p-6 sm:p-8 border-b-2 border-[#D7CCC8] text-center">
          <p className="text-[9px] font-black text-[#D4A017] uppercase tracking-[0.3em] mb-1 sm:mb-2">Management</p>
          <h2 className="text-xl sm:text-2xl font-black text-[#4E342E] uppercase italic tracking-tighter truncate px-4">
            {user.name || user.username}
          </h2>
        </header>

        <div className="p-6 sm:p-10 space-y-4 sm:space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-[#8D6E63] uppercase tracking-[0.2em]">Access Role</label>
            <div className="relative">
              <select 
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="w-full bg-[#FDFBF9] border-2 border-[#F5F5F5] rounded-2xl p-4 text-sm font-bold text-[#4E342E] outline-none focus:border-[#D4A017] appearance-none transition-all"
              >
                <option value="user">USER</option>
                <option value="admin">ADMINISTRATOR</option>
              </select>
              <div className="absolute right-4 sm:right-5 top-1/2 -translate-y-1/2 pointer-events-none opacity-30 text-[#4E342E]">
                ▼
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-[#8D6E63] uppercase tracking-[0.2em]">User Level</label>
              <input 
                type="number" 
                value={formData.level}
                onChange={(e) => setFormData({ ...formData, level: parseInt(e.target.value) || 0 })}
                className="w-full bg-[#FDFBF9] border-2 border-[#F5F5F5] rounded-2xl p-4 text-sm font-bold text-[#4E342E] outline-none focus:border-[#D4A017] transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-[#8D6E63] uppercase tracking-[0.2em]">User EXP</label>
              <input 
                type="number" 
                value={formData.exp}
                onChange={(e) => setFormData({ ...formData, exp: parseInt(e.target.value) || 0 })}
                className="w-full bg-[#FDFBF9] border-2 border-[#F5F5F5] rounded-2xl p-4 text-sm font-bold text-[#4E342E] outline-none focus:border-[#D4A017] transition-all"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2 sm:gap-3 pt-2 sm:pt-4">
            <button 
              onClick={handleSave} 
              disabled={loading}
              className="w-full p-4 sm:p-5 rounded-full text-[10px] font-black uppercase bg-[#4E342E] text-white shadow-xl hover:brightness-125 transition-all disabled:opacity-50"
            >
              {loading ? 'Updating...' : 'Update Member Data'}
            </button>
            <button onClick={onClose} className="w-full p-3 sm:p-4 text-[9px] font-black uppercase text-[#8D6E63] opacity-60 hover:opacity-100 transition-all">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}