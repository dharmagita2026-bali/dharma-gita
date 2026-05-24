import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";

export default async function KidungPlayerPage({ 
  params 
}: { 
  params: Promise<{ slug: string; kidungId: string }> 
}) {
  const { slug, kidungId } = await params;

  const kidung = await prisma.kidung.findUnique({
    where: { id: kidungId },
  });

  if (!kidung) return notFound();

  return (
    <main className="min-h-screen bg-white text-[#4E342E] p-8 pt-24 font-sans">
      <div className="max-w-4xl mx-auto space-y-12">
        <div>
          <Link 
            href={`/materi/${slug}`}
            className="inline-block bg-white text-[#4E342E] border-2 border-[#4E342E] px-6 py-2.5 rounded-full font-black text-[10px] uppercase tracking-widest hover:bg-[#4E342E] hover:text-white transition-all shadow-xs italic"
          >
            ← Kembali ke {slug.replace('-', ' ')}
          </Link>
        </div>

        <div className="border-b-4 border-[#D7CCC8] pb-8">
          <h1 className="text-5xl font-black uppercase tracking-tighter italic text-[#4E342E] leading-tight">
            {kidung.title}
          </h1>
          <p className="text-[10px] text-[#A1887F] mt-3 uppercase font-black tracking-widest bg-[#F8F5F2] inline-block px-4 py-1 rounded-full border border-[#EFEBE9]">
            Dharma Gita / {slug.replace('-', ' ')}
          </p>
        </div>

        <div className="border-4 border-[#D7CCC8] p-8 bg-[#F8F5F2] rounded-[45px] shadow-sm relative overflow-hidden group focus-within:border-[#D4A017] transition-colors">
          <div className="absolute top-[-20px] right-[-10px] text-8xl text-[#4E342E]/5 font-black select-none pointer-events-none italic">
            🔊
          </div>
          <p className="text-[10px] font-black uppercase mb-4 tracking-widest text-[#8D6E63]">Audio Player</p>
          <audio controls className="w-full h-12 accent-[#4E342E] rounded-full">
            <source src={kidung.audioUrl} type="audio/mpeg" />
            Browser anda tidak mendukung berkas audio ini.
          </audio>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          
          <div className="space-y-6">
            <h2 className="text-xl font-black uppercase border-b-2 border-[#F5F5F5] pb-3 italic text-[#4E342E]">
              Lirik Kidung
            </h2>
            <div className="text-sm leading-relaxed whitespace-pre-wrap font-serif bg-[#FDFBF9] p-8 border-l-4 border-[#D4A017] rounded-r-[30px] border-y border-r border-[#D7CCC8]/60 text-[#5D4037] shadow-xs">
              {kidung.lyrics}
            </div>
          </div>

          <div className="space-y-6 flex flex-col justify-between">
            <div className="space-y-6">
              <h2 className="text-xl font-black uppercase border-b-2 border-[#F5F5F5] pb-3 italic text-[#4E342E]">
                Deskripsi
              </h2>
              <p className="text-sm text-[#8D6E63] font-medium leading-relaxed text-justify">
                {kidung.description}
              </p>
            </div>
            
            <div className="pt-6">
              <Link href={`/game/${kidung.id}`} className="block w-full">
                <button className="w-full bg-linear-to-b from-[#F3D06D] to-[#D4A017] text-[#5D4037] text-center py-4 rounded-full font-black text-xs uppercase tracking-widest shadow-lg hover:brightness-110 transition-all italic pt-4.5">
                  Mulai Tebak Kidung (+20 XP) 🎮
                </button>
              </Link>
            </div>
          </div>

        </div>

      </div>
    </main>
  );
}