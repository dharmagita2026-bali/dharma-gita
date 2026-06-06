import Link from 'next/link';
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export default async function Navbar() {
  const session = await auth();
  let userData = null;

  if (session?.user?.name) {
    userData = await prisma.user.findUnique({
      where: { username: session.user.name },
      select: { level: true, exp: true, image: true }
    });
  }
  
  const navLinks = [
    { name: 'Beranda', href: '/' },
    { 
      name: 'Tentang', 
      href: '/tentang',
      subsections: [
        { name: 'Latar Belakang', id: 'latar-belakang' },
        { name: 'Manfaat', id: 'manfaat' },
        { name: 'Filosofi', id: 'filosofi' },
        { name: 'Lokasi Penelitian', id: 'lokasi-penelitian' },
        { name: 'Narasumber', id: 'narasumber' },
      ]
    },
    { 
      name: 'Fitur', 
      href: '/fitur', 
      subsections: [
        { name: 'Materi', id: 'materi' },
        { name: 'Game Interaktif', id: 'game' },
      ]
    },
    { name: 'Kontak', href: '#kontak' },
  ];

  return (
    <nav className="flex justify-between items-center px-12 bg-white sticky top-0 z-50 shadow-sm">
      <Link href="/" className="flex items-center gap-3">
        <img 
            src="/images/dharma-gita-logo-text.png" 
            alt="Dharma Gita Logo Text" 
            className="w-40 select-none pointer-events-none drop-shadow-md" 
        />
      </Link>

      <div className="flex items-center gap-10 text-[11px] py-5 font-black uppercase tracking-widest">
        {navLinks.map((link) => (
          <div key={link.name} className="relative group flex items-center gap-1 cursor-pointer">
            <Link 
              href={link.href} 
              className="text-[#8D6E63] group-hover:text-[#D4A017] transition-colors"
            >
              {link.name}
            </Link>

            {link.subsections && (
              <>
                <span className="text-[8px] text-[#A1887F] group-hover:text-[#D4A017] transition-transform group-hover:rotate-180">
                  ▼
                </span>

                <div className="absolute top-full -left-4 w-56 bg-white border-2 border-[#F5F5F5] hidden group-hover:block pt-2 shadow-2xl rounded-2xl overflow-hidden">
                  <div className="flex flex-col bg-white">
                    {link.subsections.map((sub) => (
                      <Link 
                        key={sub.id}
                        href={`${link.href}#${sub.id}`} 
                        className="px-6 py-4 text-[9px] text-[#4E342E] uppercase font-bold border-b border-[#F5F5F5] last:border-0 hover:bg-[#FFF9E6] hover:text-[#D4A017] transition-colors"
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        ))}

        {session ? (
          <Link href="/profile" className="flex items-center gap-4 group">
            <div className="flex flex-col items-end leading-none">
              <span className="text-[9px] font-black uppercase tracking-widest text-[#4E342E]">
                Level {userData?.level || 1}
              </span>
              <span className="text-[8px] text-[#A1887F] font-bold">
                {userData?.exp || 0} XP
              </span>
            </div>
            <div className="w-10 h-10 border-2 border-[#D4A017] justify-center rounded-full overflow-hidden shadow-sm flex items-center">
              {userData?.image ? (
                <img 
                  src={userData.image} 
                  alt="Profile" 
                  className="w-full h-full object-cover" 
                />
              ) : (
                <span className="text-xl opacity-80 group-hover:scale-110 transition-transform select-none">
                  👤
                </span>
              )}
            </div>
          </Link>
        ) : (
          <Link 
            href="/login" 
            className="bg-linear-to-b from-[#F3D06D] to-[#D4A017] text-[#5D4037] px-8 py-2 rounded-full font-black italic shadow-md hover:brightness-110 transition-all border border-[#B8860B]"
          >
            LOGIN
          </Link>
        )}
      </div>
    </nav>
  );
}