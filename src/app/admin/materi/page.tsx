import { prisma } from "@/lib/prisma";
import MateriClient from "./MateriClient";

export default async function AdminMateriPage() {
  const materiFromDb = await prisma.materi.findMany({
    include: { kidungs: true },
    orderBy: { createdAt: 'asc' },
  });

  const formattedMateri = materiFromDb.map((materi) => ({
    ...materi,
    imageUrls: (materi.imageUrls as string[]) || [], 
  }));

  return (
    <>
      <header className="border-b-2 border-[#D7CCC8] pb-6 mb-8 md:mb-12 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h1 className="text-3xl sm:text-5xl font-black text-[#4E342E] uppercase italic tracking-tighter">
            Materi & Kidung
          </h1>
          <p className="text-[11px] text-[#8D6E63] font-black uppercase tracking-widest mt-2">
            Pengelolaan Materi dan Kidung
          </p>
        </div>
      </header>
      
      <MateriClient materiList={formattedMateri} />
    </>
  );
}