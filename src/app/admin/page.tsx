import { prisma } from "@/lib/prisma";
import Leaderboard from "./Leaderboard";
import StatsGrid from "./StatsGrid";

export default async function AdminDashboard() {
  const [userCount, materiCount, kidungCount, adminCount, topUsers] = await Promise.all([
    prisma.user.count(),
    prisma.materi.count(),
    prisma.kidung.count(),
    prisma.user.count({ where: { role: 'admin' } }),
    prisma.user.findMany({
      where: { role: 'user' },
      orderBy: [
        { level: 'desc' },
        { exp: 'desc' }
      ],
      take: 5,
    })
  ]);

  return (
    <div className="space-y-12">
      <header className="border-b-2 border-[#D7CCC8] pb-6">
        <h1 className="text-5xl font-black text-[#4E342E] uppercase italic tracking-tighter">Overview</h1>
        <p className="text-[11px] text-[#8D6E63] font-black uppercase tracking-widest mt-2">Statistik Umum</p>
      </header>

      <StatsGrid stats={{ 
        userCount, 
        materiCount, 
        kidungCount, 
        adminCount 
      }} />

      <div className="lg:col-span-1">
        <Leaderboard players={topUsers} />
      </div>
    </div>
  );
}