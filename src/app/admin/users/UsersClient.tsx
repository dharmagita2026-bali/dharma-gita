"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import UserDialog, { User } from './UsersDialog';

export default function UsersClient({ users }: { users: User[] }) {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const router = useRouter();

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setIsDialogOpen(true);
  };

  const handleDeleteUser = async (id: string, name: string) => {
    if (confirm(`Hapus user "${name}"? Data progress dan akun akan hilang permanen.`)) {
      try {
        const res = await fetch(`/api/admin/users/${id}`, { method: 'DELETE' });
        if (res.ok) {
          router.refresh();
        }
      } catch (err) {
        console.error("Gagal menghapus user:", err);
      }
    }
  };

  return (
    <>
      <div className="bg-white border-2 border-[#D7CCC8] rounded-[35px] overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-[#F8F5F2] border-b-2 border-[#D7CCC8]">
            <tr className="text-[10px] font-black uppercase text-[#4E342E] italic tracking-widest">
              <th className="px-10 py-6">Identity</th>
              <th className="px-10 py-6">Role</th>
              <th className="px-10 py-6">Progress Status</th>
              <th className="px-10 py-6">Joined</th>
              <th className="px-10 py-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="text-xs font-bold text-[#8D6E63] uppercase">
            {users.map((u) => (
              <tr key={u.id} className="border-b border-[#F5F5F5] hover:bg-[#FDFBF9] transition-colors group">
                {/* Identity Column */}
                <td className="px-10 py-6">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-[#FDFBF9] border border-[#D7CCC8] rounded-xl flex items-center justify-center text-lg shadow-sm group-hover:rotate-3 transition-transform">
                      👤
                    </div>
                    <div>
                      <p className="text-[#4E342E] font-black">{u.name || 'Anonymous'}</p>
                      <p className="text-[9px] opacity-60 tracking-wider">@{u.username}</p>
                    </div>
                  </div>
                </td>

                {/* Role Column */}
                <td className="px-10 py-6">
                  <span className={`px-4 py-1.5 rounded-full text-[9px] font-black tracking-tighter ${
                    u.role === 'admin' 
                      ? 'bg-[#4E342E] text-[#D4A017]' 
                      : 'bg-[#D7CCC8] text-white'
                  }`}>
                    {u.role.toUpperCase()}
                  </span>
                </td>

                {/* Progress Column */}
                <td className="px-10 py-6">
                  <div className="space-y-1">
                    <p className="text-[#4E342E] italic tracking-tighter">Level {u.level}</p>
                    <p className="text-[9px] opacity-50 tracking-widest">{u.exp} XP Gained</p>
                  </div>
                </td>

                {/* Joined Date Column */}
                <td className="px-10 py-6 text-[9px] opacity-50">
                  {new Date(u.createdAt).toLocaleDateString('id-ID', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}
                </td>

                {/* Actions Column */}
                <td className="px-10 py-6 text-right space-x-6">
                  <button 
                    onClick={() => handleEditUser(u)}
                    className="text-[#D4A017] hover:text-[#4E342E] transition-colors text-[10px] font-black uppercase italic underline decoration-2 underline-offset-4"
                  >
                    Manage
                  </button>
                  <button 
                    onClick={() => handleDeleteUser(u.id, u.name || u.username)}
                    className="text-red-400 hover:text-red-600 transition-colors text-[10px] font-black uppercase italic opacity-40 hover:opacity-100"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {users.length === 0 && (
          <div className="p-20 text-center">
            <p className="text-[10px] font-black uppercase text-[#A1887F] italic tracking-[0.3em]">
              Tidak ada pengguna ditemukan dalam database
            </p>
          </div>
        )}
      </div>

      {/* The Global User Management Dialog */}
      <UserDialog 
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSubmit={() => router.refresh()}
        user={selectedUser}
      />
    </>
  );
}