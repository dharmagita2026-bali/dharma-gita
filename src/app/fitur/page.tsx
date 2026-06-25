import { prisma } from "@/lib/prisma";
import Link from 'next/link';
import Image from 'next/image';

const COVER_IMAGES: Record<string, string> = {
  'sekar-rare': '/images/materi-cover-sekar-rare.jpeg',
  'sekar-alit': '/images/materi-cover-sekar-alit.jpeg',
  'sekar-madya': '/images/materi-cover-sekar-madya.jpeg',
  'sekar-agung': '/images/materi-cover-sekar-agung.jpeg',
};

export default async function FiturPage() {
  const materiList = await prisma.materi.findMany({
    take: 4,
    select: {
      id: true,
      title: true,
      slug: true,
      description: true,
    },
    orderBy: {
      createdAt: 'asc'
    }
  });

  return (
    <div className="min-h-screen bg-white font-sans scroll-mt-[100px]">
      <main className="max-w-full mx-auto">
        
        <section className="relative bg-linear-to-b from-[#4E342E] to-[#8D6E63] px-6 md:px-12 py-16 md:py-20 overflow-hidden text-center lg:text-left flex flex-col items-center lg:items-start">
          <div className="z-10">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#F3D06D] mb-4">Eksplorasi Budaya</p>
            <h1 className="text-5xl md:text-7xl font-black text-white drop-shadow-lg uppercase italic leading-[0.9] mb-6">
              Fitur & <br/>Materi
            </h1>
            <p className="text-xs md:text-sm max-w-xl text-white/80 font-medium leading-relaxed">
              Pelajari Tembang Kidung Bali secara terstruktur dari empat klasifikasi utama — Sekar Rare, Sekar Alit, Sekar Madya, hingga Sekar Agung. Setiap materi dilengkapi teks lirik, terjemahan makna (artos), audio contoh lantunan, serta penjelasan fungsi penggunaannya dalam upacara Yadnya.
            </p>
          </div>
        </section>

        <section id="materi" className="py-16 md:py-24 bg-[#F8F5F2] border-t border-[#D7CCC8] px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12 md:mb-16 gap-6 md:gap-8 max-w-7xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-black text-[#4E342E] uppercase italic leading-tight text-center md:text-left">
              Materi Terkini
            </h2>
            <p className="text-xs md:text-sm max-w-xs text-[#8D6E63] font-medium leading-relaxed text-center md:text-right">
              Pilih kategori Kidung di bawah ini untuk memulai sesi pembelajaran interaktif Anda.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 justify-center max-w-7xl mx-auto">
            {materiList.map((materi) => {
              const coverImage = COVER_IMAGES[materi.slug];

              return (
                <Link key={materi.id} href={`/materi/${materi.slug}`} className="group relative w-full flex justify-center max-w-[320px] sm:max-w-none mx-auto">
                  <div className="bg-[#4E342E] rounded-[35px] md:rounded-[45px] p-1 shadow-xl overflow-hidden aspect-[3/4] w-full relative border-4 border-[#D7CCC8] transition-transform hover:-translate-y-2">
                    
                    <div className="w-full h-full bg-[#5D4037] rounded-[30px] md:rounded-[40px] flex items-center justify-center overflow-hidden relative">
                      {coverImage ? (
                        <Image 
                          src={coverImage} 
                          alt={`Cover for ${materi.title}`}
                          fill
                          className="object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-300"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                        />
                      ) : (
                        <span className="text-5xl md:text-6xl grayscale opacity-20 group-hover:opacity-40 transition-opacity">📖</span>
                      )}
                    </div>
                    
                    <div className="absolute inset-0 bg-linear-to-t from-[#4E342E] via-[#4E342E]/40 to-transparent opacity-90" />
                    
                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-center">
                      <h3 className="text-lg md:text-xl font-black text-white mb-2 uppercase italic">
                        {materi.title}
                      </h3>
                      <p className="text-[10px] text-white/80 leading-tight font-medium tracking-widest line-clamp-3">
                        {materi.description || ""}
                      </p>
                      <div className="mt-4 pt-2 border-t border-white/10">
                        <span className="text-[10px] font-black text-[#F3D06D] uppercase tracking-widest group-hover:underline">Pelajari →</span>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}

            {materiList.length === 0 && (
              <div className="col-span-full py-20 text-center border-2 border-dashed border-[#D7CCC8] rounded-[35px] md:rounded-[45px]">
                <p className="text-[#8D6E63] font-black uppercase italic tracking-widest text-xs md:text-sm">Belum ada data materi.</p>
              </div>
            )}
          </div>
        </section>

        <section id="game" className="py-16 md:py-24 px-6 md:px-12 max-w-6xl mx-auto">
          <div className="text-center mb-10 md:mb-12">
            <h2 className="text-4xl md:text-5xl font-black text-[#4E342E] uppercase italic mb-4">Game Interaktif</h2>
            <p className="text-xs md:text-sm max-w-lg mx-auto text-[#8D6E63] font-medium leading-relaxed">
              Uji pemahamanmu tentang Tembang Kidung melalui kuis interaktif yang dirancang untuk membuat belajar terasa menyenangkan. Setiap jawaban benar memberikan Poin Pengalaman (XP) yang akan menaikkan levelmu.
            </p>
          </div>

          <div className="aspect-square sm:aspect-video w-full bg-[#F8F5F2] rounded-[35px] md:rounded-[45px] p-2 shadow-2xl relative border-4 border-[#D7CCC8] overflow-hidden group flex items-center justify-center">
            <div className="border border-[#EFEBE9] rounded-[30px] md:rounded-[38px] w-full h-full flex flex-col items-center justify-center p-6 md:p-8 bg-white relative overflow-hidden">
              
              <div className="absolute -top-6 md:-top-10 -left-6 md:-left-10 text-[8rem] md:text-[12rem] text-[#F8F5F2] font-black select-none pointer-events-none italic leading-none">?</div>
              <div className="absolute -bottom-10 md:-bottom-16 -right-6 md:-right-10 text-[8rem] md:text-[12rem] text-[#F8F5F2] font-black select-none pointer-events-none italic leading-none">🎮</div>

              <div className="relative z-10 flex flex-col items-center text-center max-w-md space-y-6">
                <div className="w-20 h-20 md:w-24 md:h-24 bg-[#4E342E] border-4 border-[#D7CCC8] rounded-[24px] md:rounded-[30px] flex items-center justify-center text-3xl md:text-4xl shadow-md group-hover:scale-105 transition-transform duration-300">
                  🎵
                </div>
                <div className="space-y-2">
                  <span className="text-[9px] font-black uppercase tracking-widest text-[#D4A017] bg-[#FFF9E6] px-4 py-1 rounded-full border border-[#F3D06D]">
                    Mini Game Interaktif
                  </span>
                  <h3 className="text-xl md:text-2xl font-black uppercase text-[#4E342E] italic pt-1">Siap Memulai Tantangan?</h3>
                </div>
                <Link href="/game">
                  <button className="bg-linear-to-b from-[#F3D06D] to-[#D4A017] text-[#5D4037] px-8 md:px-10 py-3.5 md:py-4 rounded-full font-black text-[10px] md:text-xs uppercase tracking-widest shadow-lg hover:brightness-110 transition-all italic">
                    Main Sekarang →
                  </button>
                </Link>
              </div>

            </div>
          </div>
        </section>

      </main>
    </div>
  );
}