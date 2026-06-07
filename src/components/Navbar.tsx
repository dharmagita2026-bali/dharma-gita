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
    <nav className="flex justify-between items-center px-6 md:px-12 bg-white sticky top-0 z-50 shadow-sm min-h-[70px] md:min-h-[80px]">
      <Link href="/" className="flex items-center gap-3 z-20">
        <img 
            src="/images/dharma-gita-logo-text.png" 
            alt="Dharma Gita Logo Text" 
            className="w-32 md:w-40 select-none pointer-events-none drop-shadow-md" 
        />
      </Link>

      <input type="checkbox" id="mobile-menu-toggle" className="peer hidden" />
      <label htmlFor="mobile-menu-toggle" className="md:hidden z-20 cursor-pointer p-2 text-[#4E342E]">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </label>

      <div className="hidden md:flex items-center gap-10 text-[11px] py-5 font-black uppercase tracking-widest">
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
                <img src={userData.image} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <span className="text-xl opacity-80 group-hover:scale-110 transition-transform select-none">👤</span>
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

      <div className="peer-checked:flex hidden absolute top-[70px] left-0 w-full bg-white flex-col border-b-4 border-[#D7CCC8] shadow-2xl md:hidden z-10 px-6 py-8 gap-6 max-h-[85vh] overflow-y-auto">
        {navLinks.map((link) => (
          <div key={`mobile-${link.name}`} className="flex flex-col gap-3">
            <Link href={link.href} className="text-[#4E342E] font-black uppercase tracking-widest text-sm border-b border-[#F5F5F5] pb-2">
              <label htmlFor="mobile-menu-toggle" className="w-full block cursor-pointer">
                {link.name}
              </label>
            </Link>
            {link.subsections && (
              <div className="flex flex-col gap-3 pl-4">
                {link.subsections.map((sub) => (
                  <Link 
                    key={`mobile-${sub.id}`}
                    href={`${link.href}#${sub.id}`} 
                    className="text-[#8D6E63] text-[10px] uppercase font-bold"
                  >
                    <label htmlFor="mobile-menu-toggle" className="w-full block cursor-pointer">
                      • {sub.name}
                    </label>
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}

        <div className="mt-4 pt-6 border-t-2 border-[#F5F5F5] flex justify-center">
          {session ? (
            <Link href="/profile" className="flex items-center gap-4 bg-[#F8F5F2] px-6 py-3 rounded-full border border-[#D7CCC8] w-full justify-center">
              <label htmlFor="mobile-menu-toggle" className="flex items-center gap-4 w-full cursor-pointer justify-center">
                <div className="w-10 h-10 border-2 border-[#D4A017] justify-center rounded-full overflow-hidden shadow-sm flex items-center bg-white">
                  {userData?.image ? (
                    <img src={userData.image} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-xl select-none">👤</span>
                  )}
                </div>
                <div className="flex flex-col leading-none">
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#4E342E]">
                    Level {userData?.level || 1}
                  </span>
                  <span className="text-[9px] text-[#A1887F] font-bold">
                    {userData?.exp || 0} XP
                  </span>
                </div>
              </label>
            </Link>
          ) : (
            <Link 
              href="/login" 
              className="w-full text-center bg-linear-to-b from-[#F3D06D] to-[#D4A017] text-[#5D4037] px-8 py-3.5 rounded-full font-black italic shadow-md active:scale-95 transition-transform border border-[#B8860B] uppercase tracking-widest text-xs"
            >
              <label htmlFor="mobile-menu-toggle" className="w-full block cursor-pointer">
                LOGIN / DAFTAR
              </label>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}