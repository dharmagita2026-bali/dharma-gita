import { prisma } from "@/lib/prisma";
import Link from 'next/link';
import MapPhotosSlider from "@/components/MapPhotoSlider";

export default async function HomePage() {
  return (
    <div className="min-h-screen bg-white font-sans scroll-mt-[100px]">
      <main className="max-w-full mx-auto">
        
        <section className="relative grid grid-cols-1 lg:grid-cols-12 min-h-[600px] bg-linear-to-b from-[#4E342E] to-[#8D6E63] pl-12 pr-0 overflow-hidden items-center">
          <div className="py-12 lg:py-16 flex flex-col justify-center items-center lg:items-start z-10 max-w-xl mx-auto lg:mx-0 w-full lg:col-span-5 lg:ml-16">            
            <div className="w-full max-w-[360px] md:max-w-[420px] lg:max-w-[460px] mb-2 flex justify-center lg:justify-start transform lg:-translate-y-4">
              <img 
                src="/images/dharma-gita-hero-title.png" 
                alt="Dharma Gita Main Title" 
                className="w-full h-auto object-contain select-none pointer-events-none drop-shadow-md" 
              />
            </div>
            
            <div className="flex gap-4 mt-4 w-full justify-center lg:justify-start">
              <Link href="/fitur">
                <button className="bg-linear-to-b from-[#F3D06D] to-[#D4A017] text-[#5D4037] px-8 py-3.5 rounded-full font-black text-sm shadow-xl hover:brightness-110 hover:scale-[1.02] transition-all uppercase tracking-wider italic pt-4">
                  Mulai Belajar
                </button>
              </Link>
              <Link href="/tentang">
                <button className="bg-linear-to-b from-[#F3D06D] to-[#D4A017] text-[#5D4037] px-8 py-3.5 rounded-full font-black text-sm shadow-xl hover:brightness-110 hover:scale-[1.02] transition-all uppercase tracking-wider italic pt-4">
                  Tentang Kidung
                </button>
              </Link>
            </div>
          </div>

          <div className="relative w-full h-full min-h-[400px] lg:min-h-0 flex items-end justify-end lg:col-span-7 self-end">
            <img 
              src="/images/dharma-gita-hero-character-landing.png" 
              alt="Bali Character Illustration" 
              className="w-full max-w-[480px] md:max-w-[560px] lg:max-w-[680px] object-contain object-right-bottom transform translate-y-1 lg:translate-y-4 select-none pointer-events-none"
            />
          </div>
        </section>

        <section className="py-24 px-6 md:px-12 font-sans">
          <div className="flex flex-col md:flex-row justify-between items-start mb-16 gap-8 max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-black text-[#4E342E] max-w-md leading-tight uppercase italic">
              Belajar Kidung Bali Tanpa Batasan
            </h2>
            <p className="text-sm max-w-xs text-[#8D6E63] font-medium leading-relaxed">
              Kami menggabungkan pengetahuan tradisional dengan pendekatan digital agar siapapun bisa belajar dengan mudah.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto px-4 md:px-0">
            {[
              { title: "Latar Belakang", img: "/images/landing-latar-belakang.png", link: "/tentang#latar-belakang", desc: "Kidung Bali adalah warisan spiritual yang telah mengakar selama berabad-abad dan perlu dilestarikan bagi generasi mendatang." },
              { title: "Manfaat", img: "/images/landing-manfaat.png", link: "/tentang#manfaat", desc: "Akses materi lengkap dengan panduan audio dan teks yang bersumber langsung dari praktisi kidung terpercaya di Tabanan." },
              { title: "Filosofi", img: "/images/landing-filosofi.png", link: "/tentang#filosofi", desc: "Budaya harus hidup melalui pemahaman. Setiap materi dirancang untuk menyentuh makna mendalam di balik setiap kidung." }
            ].map((feature) => (
              <div key={feature.title} className="group relative w-full">
                <Link href={feature.link}>
                  <div className="bg-[#4E342E] rounded-[45px] p-1 shadow-2xl overflow-hidden aspect-[3/4] relative border-4 border-[#D7CCC8] transform transition-all duration-300 hover:-translate-y-1">
                    <img 
                      src={feature.img} 
                      alt={feature.title} 
                      className="w-full h-full object-cover rounded-[40px] group-hover:scale-105 transition-transform duration-500" 
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-[#4E342E] via-transparent to-transparent opacity-80" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
                      <h3 className="text-xl font-black text-white mb-2 uppercase italic tracking-tight">{feature.title}</h3>
                      <p className="text-[9px] text-white/90 leading-tight font-medium uppercase tracking-wider line-clamp-2">
                        {feature.desc}
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </section>

        <section className="border-t border-[#D7CCC8]">
          <div className="py-16 md:py-24 bg-linear-to-b from-[#FDFBF9] to-[#F8F5F2] px-6">
            <div className="text-center max-w-2xl mx-auto flex flex-col items-center">
              <h2 className="text-3xl md:text-4xl font-black text-[#4E342E] uppercase tracking-tighter italic">Materi</h2>
              <p className="text-xs md:text-sm text-[#8D6E63] leading-relaxed font-medium">
                Materi tersusun secara sistematis dari tingkat dasar hingga mahir, dilengkapi audio, notasi, dan sesi latihan langsung.
              </p>
            </div>
          </div>

          <div className="relative pt-12 md:pt-16 pb-20 md:pb-24 bg-[#4E342E]/5 overflow-hidden">
            <div className="absolute inset-x-0 bottom-0 top-0 opacity-20 pointer-events-none select-none">
              <img 
                src="/images/mountain-asset.png" 
                alt="Balinese Mountains Background" 
                className="w-full h-full object-cover object-bottom"
              />
            </div>

            <div className="relative max-w-4xl mx-auto flex items-center justify-center z-10 h-full">
              <img 
                src="/images/dharma-gita-books-materi.png" 
                alt="Four Books" 
                className="w-full h-auto max-w-[320px] md:max-w-[420px] object-contain drop-shadow-2xl"
              />
            </div>

            <div className="text-center relative mt-8 md:mt-12 z-20">
              <Link href="/fitur#materi">
                <button className="bg-linear-to-b from-[#F3D06D] to-[#D4A017] text-[#5D4037] px-8 md:px-12 py-3 md:py-4 rounded-full font-black text-xs md:text-sm uppercase tracking-widest shadow-lg hover:brightness-110 hover:scale-[1.02] transition-all italic pt-4">
                  Menuju Materi →
                </button>
              </Link>
            </div>
          </div>
        </section>

        <section className="py-24 bg-white border-t border-[#D7CCC8] px-6 flex flex-col items-center justify-center text-center">
          <div className="max-w-4xl w-full flex flex-col items-center">
            
            <h2 className="text-4xl font-black text-[#4E342E] uppercase tracking-tight italic">
              Sumber Data & Lokasi Penelitian
            </h2>

            <div className="relative w-full max-w-2xl aspect-[4/3] flex items-center justify-center">
              <img 
                src="/images/bali.png" 
                alt="Pulau bali"
                className="w-full h-full object-contain select-none pointer-events-none"
              />

              <div className="absolute top-[42%] left-[48%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-20">
                
                <div className="w-6 h-6 border-4 border-[#4E342E] rounded-full bg-[#D4A017] shadow-md animate-pulse" />
                
                <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2">
                  <MapPhotosSlider />
                </div>
              </div>
            </div>

            <p className="text-sm max-w-2xl text-[#8D6E63] font-medium leading-relaxed mb-10">
              Dikembangkan berdasarkan hasil observasi dan wawancara langsung di Desa Adat Galiukir, Pupuan, Tabanan, bersama praktisi Dharma Gita, sehingga materi yang disajikan memiliki keakuratan dan relevansi dengan praktik budaya yang sebenarnya.
            </p>

            <Link href="/tentang#narasumber">
              <button className="bg-linear-to-b from-[#F3D06D] to-[#D4A017] text-[#5D4037] px-10 py-4 rounded-full font-black text-xs uppercase tracking-widest shadow-lg hover:brightness-110 transition-all italic mt-4">
                Profil Narasumber  →
              </button>
            </Link>

          </div>
        </section>

      </main>
    </div>
  );
}