import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { auth } from "@/auth";
import Link from 'next/link';

export default async function MateriDetailPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params;

  const session = await auth();
  
  const [user, materi] = await Promise.all([
    session?.user?.name 
      ? prisma.user.findUnique({ where: { username: session.user.name } })
      : null,
    prisma.materi.findUnique({
      where: { slug },
      include: { kidungs: true }
    })
  ]);

  if (!materi) return notFound();

  const isLoggedIn = !!user;
  const currentUserLevel = user?.level ?? 1; 
  const isGameUnlocked = isLoggedIn && (currentUserLevel >= materi.level);

  const rawImages = (materi.imageUrls as string[]) || [];
  
  const displayImages = rawImages.length > 0 ? rawImages : [null];

  const isThree = displayImages.length === 3;
  const isFour = displayImages.length === 4;

  let gridClass = "grid gap-4 ";
  if (displayImages.length === 1) {
    gridClass += "grid-cols-1 max-w-4xl mx-auto";
  } else if (displayImages.length === 2) {
    gridClass += "grid-cols-1 md:grid-cols-2";
  } else if (isThree) {
    gridClass += "grid-cols-1 md:grid-cols-2";
  } else if (isFour) {
    gridClass += "grid-cols-2";
  } else {
    gridClass += "grid-cols-1 md:grid-cols-2 lg:grid-cols-4";
  }

  return (
    <div className="bg-white text-[#4E342E] min-h-screen pb-20 font-sans">
      <div className="max-w-6xl mx-auto px-6 md:px-8 py-16 text-center space-y-12">
        
        <div className="space-y-4 flex flex-col items-center">
          <div className="flex gap-2.5">
            <span className="border-2 border-[#D7CCC8] bg-[#F8F5F2] rounded-full px-5 py-1.5 text-[10px] uppercase font-black tracking-widest text-[#A1887F]">
              Materi Pembelajaran
            </span>
            <span className="border-2 border-[#D4A017]/40 bg-[#FDFBF9] rounded-full px-5 py-1.5 text-[10px] uppercase font-black tracking-widest text-[#D4A017]">
              ⭐ Level {materi.level}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter italic text-[#4E342E] pt-2">
            {materi.title}
          </h1>
        </div>

        <div className={gridClass}>
          {displayImages.map((imgSrc, idx) => (
            <div 
              key={`materi-img-${idx}`} 
              className={`border-4 border-[#D7CCC8] rounded-[45px] relative bg-[#F8F5F2] flex items-center justify-center overflow-hidden shadow-sm group hover:border-[#D4A017] transition-colors duration-300
                ${isThree && idx === 0 ? "md:row-span-2 aspect-video md:aspect-[auto]" : "aspect-video"}
              `}
            >
              {imgSrc ? (
                <img src={imgSrc} alt={`Materi Visual ${idx + 1}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              ) : (
                <>
                  <svg className="absolute inset-0 w-full h-full text-[#EFEBE9]" preserveAspectRatio="none">
                    <line x1="0" y1="0" x2="100%" y2="100%" stroke="currentColor" strokeWidth="2" />
                    <line x1="100%" y1="0" x2="0" y2="100%" stroke="currentColor" strokeWidth="2" />
                  </svg>
                  <span className="relative text-4xl opacity-20 group-hover:scale-110 transition-transform duration-300">
                    📖
                  </span>
                </>
              )}
            </div>
          ))}
        </div>
      
        <p className="text-sm text-[#8D6E63] font-medium leading-relaxed text-justify max-w-4xl mx-auto border-t-2 border-[#F5F5F5] pt-12 whitespace-pre-wrap">
          {materi.description}
        </p>

        {(materi.infoText1 || materi.infoText2) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto pt-4">
            {materi.infoText1 && (
              <div className="border-4 border-[#4E342E] p-8 text-left bg-white shadow-xl relative group">
                <h3 className="text-2xl font-black uppercase tracking-tight text-[#4E342E] mb-6 border-b-2 border-[#F5F5F5] pb-4">
                  Catatan Informasi
                </h3>
                <div className="text-xs text-[#8D6E63] font-medium leading-relaxed whitespace-pre-wrap">
                  {materi.infoText1}
                </div>
              </div>
            )}
            
            {materi.infoText2 && (
              <div className="border-4 border-[#4E342E] p-8 text-left bg-white shadow-xl relative group">
                <h3 className="text-2xl font-black uppercase tracking-tight text-[#4E342E] mb-6 border-b-2 border-[#F5F5F5] pb-4">
                  Catatan Informasi
                </h3>
                <div className="text-xs text-[#8D6E63] font-medium leading-relaxed whitespace-pre-wrap">
                  {materi.infoText2}
                </div>
              </div>
            )}
          </div>
        )}

        <div className="max-w-4xl mx-auto pt-6">
          {!isLoggedIn ? (
            <div className="border-4 border-[#4E342E] p-8 bg-[#FDFBF9] rounded-[45px] shadow-[6px_6px_0px_0px_#4E342E] flex flex-col md:flex-row items-center justify-between gap-6 text-left relative overflow-hidden">
              <div className="space-y-1 z-10">
                <span className="text-[10px] font-black uppercase tracking-widest text-[#4E342E] bg-[#4E342E]/5 px-3 py-1 rounded-full border border-[#4E342E]/20">
                  👋 Akses Terbatas
                </span>
                <h3 className="text-2xl font-black uppercase italic tracking-tight text-[#4E342E] pt-2">Ingin Menguji Kemampuan?</h3>
                <p className="text-xs text-[#8D6E63] max-w-md font-medium">Silakan masuk ke akun Anda terlebih dahulu untuk memainkan game evaluasi dan menyimpan rekor skor XP Anda.</p>
              </div>
              <Link href="/login" className="w-full md:w-auto z-10">
                <button className="w-full bg-[#4E342E] text-white px-10 py-4 rounded-full font-black text-xs uppercase tracking-widest shadow-md hover:brightness-125 transition-all italic pt-4.5 whitespace-nowrap">
                  Masuk / Registrasi Akun →
                </button>
              </Link>
            </div>
          ) : isGameUnlocked ? (
            <div className="border-4 border-[#D4A017] p-8 bg-linear-to-b from-[#FDFBF9] to-[#F8F5F2] rounded-[45px] shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 text-left relative overflow-hidden">
              <div className="space-y-1 z-10">
                <span className="text-[10px] font-black uppercase tracking-widest text-[#D4A017] bg-[#D4A017]/10 px-3 py-1 rounded-full border border-[#D4A017]/20">
                  🎮 Game Tersedia
                </span>
                <h3 className="text-2xl font-black uppercase italic tracking-tight text-[#4E342E] pt-2">Evaluasi Kidung Bali</h3>
                <p className="text-xs text-[#8D6E63] max-w-md font-medium">Uji pemahaman Anda mengenai lirik dan ketukan gita ini untuk mendapatkan bonus XP ekstra!</p>
              </div>
              <Link href={`/game/arena/${materi.slug}`} className="w-full md:w-auto z-10">
                <button className="w-full bg-linear-to-b from-[#F3D06D] to-[#D4A017] text-[#5D4037] px-10 py-4 rounded-full font-black text-xs uppercase tracking-widest shadow-md hover:brightness-110 hover:scale-[1.02] transition-all italic pt-4.5 whitespace-nowrap">
                  Mulai Bermain (+50 XP) 🎮
                </button>
              </Link>
            </div>
          ) : (
            <div className="border-4 border-[#D7CCC8]/70 p-8 bg-[#F5F5F5] rounded-[45px] flex flex-col md:flex-row items-center justify-between gap-6 text-left relative overflow-hidden opacity-75">
              <div className="space-y-1">
                <span className="text-[10px] font-black uppercase tracking-widest text-[#A1887F] bg-[#EFEBE9] px-3 py-1 rounded-full border border-[#D7CCC8]">
                  🔒 Fitur Terkunci
                </span>
                <h3 className="text-2xl font-black uppercase italic tracking-tight text-[#78909C] pt-2">Evaluasi Kidung Bali</h3>
                <p className="text-xs text-[#90A4AE] max-w-md font-medium">
                  Game evaluasi ini belum dapat diakses. Anda membutuhkan tingkat akun minimal <strong className="text-[#4E342E]">Level {materi.level}</strong> untuk membuka tantangan ini.
                </p>
              </div>
              <button disabled className="w-full md:w-auto bg-[#CCCCCC] text-[#777777] px-10 py-4 rounded-full font-black text-xs uppercase tracking-widest cursor-not-allowed italic pt-4.5 flex items-center justify-center gap-2 whitespace-nowrap">
                🔒 Butuh Level {materi.level}
              </button>
            </div>
          )}
        </div>

        <div className="space-y-10 pt-8">
          <h2 className="text-4xl font-black uppercase tracking-tight italic text-[#4E342E]">Daftar Kidung</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            {materi.kidungs.map((kidung) => (
              <Link
                key={kidung.id} 
                href={`/materi/${slug}/${kidung.id}`} 
                className="group relative block w-full"
              >
                <div className="bg-white border-4 border-[#D7CCC8] rounded-[45px] p-8 space-y-6 shadow-sm hover:border-[#D4A017] transition-all duration-300 h-full flex flex-col justify-between group-hover:-translate-y-1">
                  
                  <div className="space-y-4">
                    <h3 className="font-black uppercase text-xl text-[#4E342E] italic border-b-2 border-[#F5F5F5] pb-4 group-hover:text-[#D4A017] transition-colors">
                      {kidung.title}
                    </h3>
                    <p className="text-xs text-[#8D6E63] font-medium leading-relaxed line-clamp-3">
                      {kidung.description}
                    </p>
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t border-[#F5F5F5]">
                    <span className="text-[9px] font-black uppercase tracking-widest text-[#A1887F] bg-[#F8F5F2] px-3 py-1 rounded-full border border-[#EFEBE9]">
                      ✨ Tersedia: Audio & Lirik
                    </span>
                    <span className="text-xl text-[#D4A017] font-bold transform group-hover:translate-x-1 transition-transform">
                      →
                    </span>
                  </div>

                </div>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}