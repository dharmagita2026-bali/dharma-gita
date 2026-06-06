import React from 'react';

export default function TentangPage() {
  return (
    <div className="bg-white font-sans scroll-mt-[100px] min-h-screen text-[#4E342E]">
      
      <section id="latar-belakang" className="border-b-2 border-[#D7CCC8]">
        <div className="max-w-6xl mx-auto px-12 py-24">
          <div className="inline-block bg-[#F8F5F2] border-2 border-[#D7CCC8] rounded-full px-6 py-1.5 text-[10px] font-black uppercase tracking-widest text-[#8D6E63] mb-6">
            Tentang
          </div>
          <h1 className="text-5xl font-black uppercase tracking-tighter italic text-[#4E342E] mb-12">
            Latar Belakang
          </h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 border-t-2 border-[#F5F5F5] pt-12">
            <div className="aspect-square bg-[#FDFBF9] border-4 border-[#D7CCC8] rounded-[45px] relative flex items-center justify-center overflow-hidden shadow-sm group">
              <img 
                src="images/latar-belakang1.jpeg"
                alt="Latar Belakang" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
              />
            </div>

            <div className="space-y-8">
              <h2 className="text-3xl font-black uppercase tracking-tight italic text-[#4E342E]">Kidung</h2>
              <p className="text-sm leading-relaxed text-[#8D6E63] font-medium text-justify">
                Kidung adalah seni vokal sakral yang telah menjadi bagian dari kehidupan spiritual masyarakat Bali selama berabad-abad. Dilantunkan dalam bahasa Kawi dan Bali kuno, setiap kidung membawa makna doa dan rasa syukur yang mendalam. Di tengah arus modernisasi, tradisi ini perlahan kehilangan penerusnya. Dharma Gita hadir untuk memastikan kidung tetap hidup — tidak hanya dikenang, tapi benar-benar dipelajari dan diteruskan.
              </p>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="aspect-video bg-[#FDFBF9] border-2 border-[#D7CCC8] rounded-[25px] relative flex items-center justify-center overflow-hidden shadow-sm group">
                  <img 
                    src="images/latar-belakang2.jpeg"
                    alt="Latar Belakang" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                </div>
                <div className="aspect-video bg-[#FDFBF9] border-2 border-[#D7CCC8] rounded-[25px] relative flex items-center justify-center overflow-hidden shadow-sm group">
                  <img 
                    src="images/latar-belakang3.jpeg"
                    alt="Latar Belakang" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="manfaat" className="py-24 border-b-2 border-[#D7CCC8] bg-[#F8F5F2]">
        <div className="max-w-6xl mx-auto px-12">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <h2 className="text-4xl font-black uppercase tracking-tighter italic text-[#4E342E] mb-4">
              Manfaat
            </h2>
            <p className="text-sm text-[#8D6E63] font-medium leading-relaxed">
              Mempelajari kidung memberi lebih dari sekadar kemampuan bernyanyi, ada nilai yang jauh lebih dalam di setiap lantunannya.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
            <div className="bg-white border-2 border-[#D7CCC8] rounded-[35px] p-8 hover:border-[#D4A017] hover:shadow-md transition-all shadow-sm space-y-3">
              <h3 className="text-xl text-center font-black uppercase italic tracking-tight text-[#4E342E]">
                Budaya
              </h3>
              <p className="text-xs font-medium text-[#8D6E63] leading-relaxed">
                Turut menjaga kelangsungan tradisi lisan Bali agar tetap dikenal dan dicintai lintas generasi.
              </p>
            </div>

            <div className="bg-white border-2 border-[#D7CCC8] rounded-[35px] p-8 hover:border-[#D4A017] hover:shadow-md transition-all shadow-sm space-y-3">
              <h3 className="text-xl text-center font-black uppercase italic tracking-tight text-[#4E342E]">
                Identitas
              </h3>
              <p className="text-xs font-medium text-[#8D6E63] leading-relaxed">
                Mengenal budaya sendiri lebih dalam memperkuat rasa bangga sebagai bagian dari masyarakat adat Bali.
              </p>
            </div>

            <div className="bg-white border-2 border-[#D7CCC8] rounded-[35px] p-8 hover:border-[#D4A017] hover:shadow-md transition-all shadow-sm space-y-3">
              <h3 className="text-xl text-center font-black uppercase italic tracking-tight text-[#4E342E]">
                Spiritual
              </h3>
              <p className="text-xs font-medium text-[#8D6E63] leading-relaxed">
                Melantunkan kidung adalah bentuk meditasi aktif yang menenangkan sekaligus mendekatkan diri kepada Tuhan.
              </p>
            </div>

          </div>
          
          <p className="text-[11px] text-[#A1887F] font-bold uppercase tracking-wider leading-relaxed text-justify max-w-4xl mx-auto bg-white border border-[#EFEBE9] p-8 rounded-[25px]">
            Di luar pelestarian budaya, belajar kidung melatih konsentrasi, kepekaan musikal, dan pengenalan bahasa Kawi secara alami. Di banyak desa adat, kidung dilantunkan bersama — dan di situlah kekuatannya: orang-orang dari berbagai usia dan latar belakang duduk bersama, bernyanyi dalam satu suara, dan merasa benar-benar terhubung satu sama lain.
          </p>
        </div>
      </section>

      <section id="filosofi" className="py-24 border-b-2 border-[#D7CCC8]">
        <div className="max-w-4xl mx-auto px-12 text-center space-y-12">
          <h2 className="text-4xl font-black uppercase tracking-tighter italic text-[#4E342E]">
            Filosofi &ldquo;Dharma Gita&rdquo;
          </h2>
          
          <div className="w-48 h-48 bg-[#F8F5F2] border-4 border-[#D7CCC8] rounded-[45px] mx-auto flex flex-col items-center justify-center shadow-sm group hover:rotate-2 transition-transform">
            <img src="/images/dharma-gita-logo.png" alt="Music Logo" className="object-contain" />
          </div>

          <p className="text-sm leading-relaxed text-[#8D6E63] font-medium italic max-w-2xl mx-auto">
            &ldquo;Secara etimologi, istilah Dharma Gita berasal dari bahasa Sanskerta, yang terdiri dari dua kata, yaitu &rdquo;Dharma&rdquo; yang berarti kebenaran, agama, atau kewajiban suci, dan &rdquo;Gita&rdquo; yang berarti nyanyian atau lagu. Dengan demikian, Dharma Gita dapat didefinisikan sebagai nyanyian suci keagamaan yang melantunkan nilai-nilai kebenaran (Weda) dan digunakan sebagai pengiring dalam pelaksanaan upacara Yadnya umat Hindu&rdquo;
          </p>
        </div>
      </section>

      <section id="lokasi-penelitian" className="py-24 border-b-2 border-[#D7CCC8] bg-[#F8F5F2]">
        <div className="max-w-6xl mx-auto px-12">
          <h2 className="text-4xl font-black uppercase tracking-tighter text-center italic text-[#4E342E] mb-12">
            Lokasi Penelitian
          </h2>
          
          <div className="bg-white border-2 border-[#D7CCC8] rounded-[45px] p-2 shadow-sm max-w-4xl mx-auto">
            <div className="border border-[#F5F5F5] rounded-[38px] p-8 space-y-8">
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b-2 border-[#F5F5F5] pb-6">
                <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase tracking-widest text-[#A1887F]">Koordinat Lokasi</p>
                  <p className="text-xs font-mono font-bold text-[#4E342E]">-8.504811, 115.551592</p>
                </div>
                
                <a 
                  href="https://maps.google.com/?q=-8.504811,115.551592" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-linear-to-b from-[#F3D06D] to-[#D4A017] text-[#5D4037] px-8 py-3 rounded-full font-black text-xs uppercase tracking-wider shadow-md hover:brightness-110 transition-all self-start sm:self-auto inline-block text-center"
                >
                  Mulai Navigasi
                </a>
              </div>

              <div className="aspect-[21/9] bg-[#FDFBF9] border-2 border-[#EFEBE9] relative rounded-[35px_100px_45px_120px] overflow-hidden shadow-inner">
                <iframe
                  src="https://maps.google.com/maps?q=-8.504811,115.551592&t=&z=15&ie=UTF8&iwloc=&output=embed&g=0"
                  className="w-full h-full border-0 absolute inset-0"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
          
          <p className="text-sm text-[#8D6E63] font-medium leading-relaxed text-center mt-12 max-w-3xl mx-auto">
            Penelitian ini dilaksanakan di Banjar Dinas Galiukir Kaja, Desa Kebon Padangan, Kecamatan Pupuan, Kabupaten Tabanan — lokasi di mana tradisi Dharma Gita masih aktif dipraktikkan oleh komunitas adat setempat. Di sinilah observasi, wawancara, dan perekaman audio Tembang Kidung dilakukan secara langsung bersama anggota Sekha Shanti Widya Dharma Stiti.
          </p>
        </div>
      </section>

      <section id="narasumber" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-12 text-center">
          <h2 className="text-4xl font-black uppercase tracking-tighter italic text-[#4E342E] mb-16">
            Narasumber
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 max-w-3xl mx-auto mb-16">
            {[
              { 
                name: "Bapak I Nyoman Nuarsa", 
                role: "Anggota Aktif, Sekha Shanti Widya Dharma Stiti", 
                img: "/images/narasumber1.png" 
              },
              { 
                name: "Ibu Ni Ketut Runingsih", 
                role: "Ketua Sekha Shanti Widya Dharma Stiti, Desa Adat Galiukir", 
                img: "/images/narasumber2.png" 
              }
            ].map((narasumber, idx) => (
              <div key={idx} className="space-y-5 group flex flex-col items-center">
                
                <div className="w-full max-w-[280px] aspect-square bg-[#4E342E] border-4 border-[#D7CCC8] rounded-[45px] relative overflow-hidden shadow-xl group-hover:border-[#D4A017] transition-all duration-300 hover:-translate-y-1">
                  <img 
                    src={narasumber.img} 
                    alt={narasumber.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-[#4E342E]/40 to-transparent pointer-events-none" />
                </div>

                <div className="text-center">
                  <p className="text-sm font-black uppercase text-[#4E342E] tracking-wider transition-colors group-hover:text-[#D4A017]">
                    {narasumber.name}
                  </p>
                  <p className="text-[10px] font-black text-[#A1887F] uppercase tracking-widest mt-1">
                    ({narasumber.role})
                  </p>
                </div>

              </div>
            ))}
          </div>

          <p className="text-sm leading-relaxed text-[#8D6E63] font-medium text-justify max-w-4xl mx-auto border-t-2 border-[#F8F5F2] pt-8">
            Materi dalam platform ini digali melalui wawancara mendalam dan sesi perekaman langsung bersama Bapak I Nyoman Nuarsa, yang memberikan panduan teknik vokal dan klasifikasi fungsi kidung dalam berbagai upacara Yadnya. Seluruh terjemahan teks (artos) kemudian diverifikasi oleh Ibu Ni Ketut Runingsih selaku Ketua Sekha, guna memastikan ketepatan makna teologis sesuai konteks upacara agama Hindu.
          </p>
        </div>
      </section>
      
    </div>
  );
}