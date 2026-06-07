import React from 'react';

export default function TentangPage() {
  return (
    <div className="bg-white font-sans scroll-mt-[100px] min-h-screen text-[#4E342E]">
      
      <section id="latar-belakang" className="border-b-2 border-[#D7CCC8]">
        <div className="max-w-6xl mx-auto px-6 md:px-12 py-16 md:py-24">
          <div className="inline-block bg-[#F8F5F2] border-2 border-[#D7CCC8] rounded-full px-6 py-1.5 text-[10px] font-black uppercase tracking-widest text-[#8D6E63] mb-4 md:mb-6">
            Tentang
          </div>
          <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tighter italic text-[#4E342E] mb-8 md:mb-12">
            Latar Belakang
          </h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 border-t-2 border-[#F5F5F5] pt-8 md:pt-12">
            <div className="aspect-square bg-[#FDFBF9] border-4 border-[#D7CCC8] rounded-[35px] md:rounded-[45px] relative flex items-center justify-center overflow-hidden shadow-sm group">
              <img 
                src="images/latar-belakang3.jpeg"
                alt="Latar Belakang" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
              />
            </div>

            <div className="space-y-6 md:space-y-8">
              <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight italic text-[#4E342E]">Kidung</h2>
              <p className="text-xs md:text-sm leading-relaxed text-[#8D6E63] font-medium text-justify">
                Kidung adalah seni vokal sakral yang telah menjadi bagian dari kehidupan spiritual masyarakat Bali selama berabad-abad. Dilantunkan dalam bahasa Kawi dan Bali kuno, setiap kidung membawa makna doa dan rasa syukur yang mendalam. Di tengah arus modernisasi, tradisi ini perlahan kehilangan penerusnya. Dharma Gita hadir untuk memastikan kidung tetap hidup — tidak hanya dikenang, tapi benar-benar dipelajari dan diteruskan.
              </p>
              
              <div className="grid grid-cols-2 gap-4 md:gap-6">
                <div className="aspect-video bg-[#FDFBF9] border-2 border-[#D7CCC8] rounded-[15px] md:rounded-[25px] relative flex items-center justify-center overflow-hidden shadow-sm group">
                  <img 
                    src="images/latar-belakang2.jpeg"
                    alt="Latar Belakang" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                </div>
                <div className="aspect-video bg-[#FDFBF9] border-2 border-[#D7CCC8] rounded-[15px] md:rounded-[25px] relative flex items-center justify-center overflow-hidden shadow-sm group">
                  <img 
                    src="images/latar-belakang1.jpeg"
                    alt="Latar Belakang" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="manfaat" className="py-16 md:py-24 border-b-2 border-[#D7CCC8] bg-[#F8F5F2]">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="text-center mb-12 md:mb-16 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter italic text-[#4E342E] mb-4">
              Manfaat
            </h2>
            <p className="text-xs md:text-sm text-[#8D6E63] font-medium leading-relaxed">
              Mempelajari kidung memberi lebih dari sekadar kemampuan bernyanyi, ada nilai yang jauh lebih dalam di setiap lantunannya.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10 mb-10 md:mb-12">
            <div className="bg-white border-2 border-[#D7CCC8] rounded-[30px] md:rounded-[35px] p-6 md:p-8 hover:border-[#D4A017] hover:shadow-md transition-all shadow-sm space-y-3">
              <h3 className="text-lg md:text-xl text-center font-black uppercase italic tracking-tight text-[#4E342E]">
                Budaya
              </h3>
              <p className="text-[11px] md:text-xs font-medium text-[#8D6E63] leading-relaxed text-center">
                Turut menjaga kelangsungan tradisi lisan Bali agar tetap dikenal dan dicintai lintas generasi.
              </p>
            </div>

            <div className="bg-white border-2 border-[#D7CCC8] rounded-[30px] md:rounded-[35px] p-6 md:p-8 hover:border-[#D4A017] hover:shadow-md transition-all shadow-sm space-y-3">
              <h3 className="text-lg md:text-xl text-center font-black uppercase italic tracking-tight text-[#4E342E]">
                Identitas
              </h3>
              <p className="text-[11px] md:text-xs font-medium text-[#8D6E63] leading-relaxed text-center">
                Mengenal budaya sendiri lebih dalam memperkuat rasa bangga sebagai bagian dari masyarakat adat Bali.
              </p>
            </div>

            <div className="bg-white border-2 border-[#D7CCC8] rounded-[30px] md:rounded-[35px] p-6 md:p-8 hover:border-[#D4A017] hover:shadow-md transition-all shadow-sm space-y-3">
              <h3 className="text-lg md:text-xl text-center font-black uppercase italic tracking-tight text-[#4E342E]">
                Spiritual
              </h3>
              <p className="text-[11px] md:text-xs font-medium text-[#8D6E63] leading-relaxed text-center">
                Melantunkan kidung adalah bentuk meditasi aktif yang menenangkan sekaligus mendekatkan diri kepada Tuhan.
              </p>
            </div>

          </div>
          
          <p className="text-[10px] md:text-[11px] text-[#A1887F] font-bold uppercase tracking-wider leading-relaxed text-justify max-w-4xl mx-auto bg-white border border-[#EFEBE9] p-6 md:p-8 rounded-[20px] md:rounded-[25px]">
            Di luar pelestarian budaya, belajar kidung melatih konsentrasi, kepekaan musikal, dan pengenalan bahasa Kawi secara alami. Di banyak desa adat, kidung dilantunkan bersama — dan di situlah kekuatannya: orang-orang dari berbagai usia dan latar belakang duduk bersama, bernyanyi dalam satu suara, dan merasa benar-benar terhubung satu sama lain.
          </p>
        </div>
      </section>

      <section id="filosofi" className="py-16 md:py-24 border-b-2 border-[#D7CCC8]">
        <div className="max-w-4xl mx-auto px-6 md:px-12 text-center space-y-8 md:space-y-12">
          <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter italic text-[#4E342E]">
            Filosofi &ldquo;Dharma Gita&rdquo;
          </h2>
          
          <div className="w-32 h-32 md:w-48 md:h-48 bg-[#F8F5F2] border-4 border-[#D7CCC8] rounded-[30px] md:rounded-[45px] mx-auto flex flex-col items-center justify-center shadow-sm group hover:rotate-2 transition-transform p-4 md:p-0">
            <img src="/images/dharma-gita-logo.png" alt="Music Logo" className="object-contain w-full h-full" />
          </div>

          <p className="text-xs md:text-sm leading-relaxed text-[#8D6E63] font-medium italic max-w-2xl mx-auto">
            &ldquo;Secara etimologi, istilah Dharma Gita berasal dari bahasa Sanskerta, yang terdiri dari dua kata, yaitu &rdquo;Dharma&rdquo; yang berarti kebenaran, agama, atau kewajiban suci, dan &rdquo;Gita&rdquo; yang berarti nyanyian atau lagu. Dengan demikian, Dharma Gita dapat didefinisikan sebagai nyanyian suci keagamaan yang melantunkan nilai-nilai kebenaran (Weda) dan digunakan sebagai pengiring dalam pelaksanaan upacara Yadnya umat Hindu&rdquo;
          </p>
        </div>
      </section>

      <section id="lokasi-penelitian" className="py-16 md:py-24 border-b-2 border-[#D7CCC8] bg-[#F8F5F2]">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-center italic text-[#4E342E] mb-8 md:mb-12">
            Lokasi Penelitian
          </h2>
          
          <div className="bg-white border-2 border-[#D7CCC8] rounded-[30px] md:rounded-[45px] p-2 shadow-sm max-w-4xl mx-auto">
            <div className="border border-[#F5F5F5] rounded-[25px] md:rounded-[38px] p-6 md:p-8 space-y-6 md:space-y-8">
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b-2 border-[#F5F5F5] pb-6">
                <div className="space-y-1 text-center sm:text-left">
                  <p className="text-[10px] font-black uppercase tracking-widest text-[#A1887F]">Koordinat Lokasi</p>
                  <p className="text-xs font-mono font-bold text-[#4E342E]">-8.504811, 115.551592</p>
                </div>
                
                <a 
                  href="https://maps.google.com/?q=-8.504811,115.551592" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto bg-linear-to-b from-[#F3D06D] to-[#D4A017] text-[#5D4037] px-8 py-3.5 sm:py-3 rounded-full font-black text-xs uppercase tracking-wider shadow-md hover:brightness-110 active:scale-95 transition-all text-center inline-block"
                >
                  Mulai Navigasi
                </a>
              </div>

              <div className="aspect-square sm:aspect-video md:aspect-[21/9] bg-[#FDFBF9] border-2 border-[#EFEBE9] relative rounded-[20px] md:rounded-[35px_100px_45px_120px] overflow-hidden shadow-inner">
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
          
          <p className="text-xs md:text-sm text-[#8D6E63] font-medium leading-relaxed text-center mt-8 md:mt-12 max-w-3xl mx-auto">
            Penelitian ini dilaksanakan di Banjar Dinas Galiukir Kaja, Desa Kebon Padangan, Kecamatan Pupuan, Kabupaten Tabanan — lokasi di mana tradisi Dharma Gita masih aktif dipraktikkan oleh komunitas adat setempat. Di sinilah observasi, wawancara, dan perekaman audio Tembang Kidung dilakukan secara langsung bersama anggota Sekha Shanti Widya Dharma Stiti.
          </p>
        </div>
      </section>

      <section id="narasumber" className="py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6 md:px-12 text-center">
          <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter italic text-[#4E342E] mb-12 md:mb-16">
            Narasumber
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 md:gap-12 max-w-3xl mx-auto mb-12 md:mb-16">
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
              <div key={idx} className="space-y-4 md:space-y-5 group flex flex-col items-center">
                
                <div className="w-full max-w-[240px] md:max-w-[280px] aspect-square bg-[#4E342E] border-4 border-[#D7CCC8] rounded-[35px] md:rounded-[45px] relative overflow-hidden shadow-xl group-hover:border-[#D4A017] transition-all duration-300 hover:-translate-y-1">
                  <img 
                    src={narasumber.img} 
                    alt={narasumber.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-[#4E342E]/40 to-transparent pointer-events-none" />
                </div>

                <div className="text-center px-2">
                  <p className="text-xs md:text-sm font-black uppercase text-[#4E342E] tracking-wider transition-colors group-hover:text-[#D4A017]">
                    {narasumber.name}
                  </p>
                  <p className="text-[9px] md:text-[10px] font-black text-[#A1887F] uppercase tracking-widest mt-1">
                    ({narasumber.role})
                  </p>
                </div>

              </div>
            ))}
          </div>

          <p className="text-xs md:text-sm leading-relaxed text-[#8D6E63] font-medium text-justify max-w-4xl mx-auto border-t-2 border-[#F8F5F2] pt-8">
            Materi dalam platform ini digali melalui wawancara mendalam dan sesi perekaman langsung bersama Bapak I Nyoman Nuarsa, yang memberikan panduan teknik vokal dan klasifikasi fungsi kidung dalam berbagai upacara Yadnya. Seluruh terjemahan teks (artos) kemudian diverifikasi oleh Ibu Ni Ketut Runingsih selaku Ketua Sekha, guna memastikan ketepatan makna teologis sesuai konteks upacara agama Hindu.
          </p>
        </div>
      </section>
      
    </div>
  );
}