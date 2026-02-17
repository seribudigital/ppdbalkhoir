import React from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';

// Import Client Components
import HeroSection from '@/components/home/HeroSection';
import Navbar from '@/components/layout/Navbar';
import VisimisiSection from '@/components/home/VisimisiSection';
import KurikulumSection from '@/components/home/KurikulumSection';

// Lazy Load Heavy Components
// Lazy Load Heavy Components
const GallerySection = dynamic(() => import('@/components/home/GallerySection'), {
  loading: () => <div className="min-h-[800px] flex items-center justify-center bg-slate-50 text-slate-400">Loading Gallery...</div>
});
const ScheduleSection = dynamic(() => import('@/components/home/ScheduleSection'), {
  loading: () => <div className="min-h-[600px] flex items-center justify-center bg-slate-50 text-slate-400">Loading Schedule...</div>
});
const RegistrationForm = dynamic(() => import('@/components/RegistrationForm'), {
  loading: () => <div className="min-h-[800px] flex items-center justify-center bg-slate-100 text-slate-400 rounded-3xl">Loading Form...</div>
});
const LocationSection = dynamic(() => import('@/components/home/LocationSection'), {
  loading: () => <div className="min-h-[400px] flex items-center justify-center bg-slate-50 text-slate-400">Loading Map...</div>
});

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 text-emerald-900 font-sans selection:bg-cyan-200 selection:text-emerald-900">

      <Navbar />
      <HeroSection />

      {/* Hero Tagline Banner - Static (Server Side) */}
      {/* Hero Tagline Banner - Static (Server Side) */}
      <div className="bg-emerald-900 text-white py-4 md:py-6 px-0 md:px-4 relative z-20 shadow-lg overflow-hidden">
        <div className="container mx-auto text-center hidden md:block">
          <p className="text-lg font-bold tracking-widest uppercase flex flex-wrap justify-center gap-8">
            <span>✨ Unggul Budi Pekerti</span>
            <span className="text-emerald-500">|</span>
            <span>✨ Optimal Prestasi</span>
            <span className="text-emerald-500">|</span>
            <span>✨ Bertauhid Sejak Dini</span>
            <span className="text-emerald-500">|</span>
            <span>✨ Hidupkan Sunnah Nabi</span>
          </p>
        </div>
        {/* Mobile Marquee */}
        <div className="md:hidden overflow-hidden whitespace-nowrap">
          <p className="text-sm font-bold tracking-widest uppercase animate-marquee">
            <span className="mx-4">✨ Unggul Budi Pekerti</span>
            <span className="mx-4">✨ Optimal Prestasi</span>
            <span className="mx-4">✨ Bertauhid Sejak Dini</span>
            <span className="mx-4">✨ Hidupkan Sunnah Nabi</span>
          </p>
        </div>
      </div>

      {/* Section: Latar Belakang - Static (Server Side) */}
      <section id="latar-belakang" className="py-20 px-6 bg-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-emerald-800 mb-8">Latar Belakang</h2>
          <div className="bg-slate-50 p-8 md:p-12 rounded-3xl border border-slate-100 shadow-sm">
            <p className="text-lg text-slate-700 leading-relaxed">
              &quot;Madrasah Tsanawiyah dan Madrasah Aliyah Al-Khoir Islamic School Bin Baz 5 merupakan lembaga pendidikan yang memadukan model pendidikan ala pesantren salaf dengan kurikulum modern. Mengadopsi dari sistem pembelajaran yang diterapkan di Islamic Centre Bin Baz Yogyakarta, diharapkan Al Khoir Boarding School ini bisa melahirkan generasi robbani yang senantiasa berpegang pada ajaran-ajaran Al-Qur&apos;an dan Sunnah Rasulullah Shallallahu &apos;alaihi wasallam.&quot;
            </p>
          </div>
        </div>
      </section>

      <VisimisiSection />

      <div id="kurikulum">
        <KurikulumSection />
      </div>

      {/* Section: Prestasi Kami - Static (Server Side, unless interactive) */}
      <section className="py-20 px-6 bg-white">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-emerald-800 mb-4">Prestasi Kami</h2>
            <div className="h-1.5 w-24 bg-gradient-to-r from-emerald-500 to-cyan-500 mx-auto rounded-full"></div>
            <p className="mt-4 text-emerald-600/80 text-lg">Bukti nyata kualitas pendidikan kami.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              "Juara 1 Pidato Bahasa Indonesia Tingkat Kabupaten",
              "Juara 2 Musabaqoh Hifdzil Mutun",
              "Juara 1 Pingpong KSM",
              "Finalis Hifdzul Mutun Tingkat Provinsi",
              "Juara 1 Tahfidz Tingkat Provinsi",
              "Juara 2 Olimpiade Cipta Puisi Tingkat Nasional"
            ].map((prestasi, idx) => (
              <div key={idx} className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-emerald-200 transition-colors">
                <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center text-xl shadow-sm flex-shrink-0">🏆</div>
                <span className="text-slate-700 font-medium">{prestasi}</span>
              </div>
            ))}
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-emerald-200 transition-colors">
              <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-xl shadow-sm flex-shrink-0">✨</div>
              <span className="text-slate-700 font-medium italic">Dan masih banyak lagi...</span>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Syarat Pendaftaran - Static (Server Side) */}
      <section className="py-20 px-6 bg-white">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-emerald-800 mb-4">Syarat Pendaftaran</h2>
            <div className="h-1.5 w-20 bg-emerald-200 mx-auto rounded-full"></div>
          </div>

          <div className="bg-slate-50 rounded-3xl p-8 md:p-12 border border-slate-100 shadow-sm relative overflow-hidden">
            <div className="absolute right-0 top-0 opacity-5 pointer-events-none transform translate-x-1/4 -translate-y-1/4">
              <svg width="400" height="400" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <path fill="#10B981" d="M44.7,-76.4C58.9,-69.2,71.8,-59.1,81.6,-46.6C91.4,-34.1,98.1,-19.2,95.8,-4.9C93.5,9.4,82.2,23.1,70.8,34.5C59.4,45.9,47.9,55,35.4,63.4C22.9,71.8,9.4,79.5,-3.3,85.2C-16,90.9,-27.9,94.6,-39,90.6C-50.1,86.6,-60.4,74.9,-69,61.9C-77.6,48.9,-84.5,34.6,-86.3,19.9C-88.1,5.2,-84.8,-9.9,-77.4,-23.4C-70,-36.9,-58.5,-48.8,-46.3,-56.9C-34.1,-65,-21.2,-69.3,-7.6,-56.2L6,10.4Z" transform="translate(100 100)" />
              </svg>
            </div>

            <ul className="space-y-6 relative z-10">
              {[
                "Legalisir Ijazah SD/MI/SMP/MTs (2 Lembar)",
                "Fotokopi Kartu Keluarga (2 Lembar)",
                "Fotokopi Akta Kelahiran (2 Lembar)",
                "Foto 2x3 & 3x4 Berwarna (Masing-masing 4 Lembar)",
                "SKL (Diserahkan setelah dinyatakan lulus)"
              ].map((req, idx) => (
                <li key={idx} className="flex items-start gap-4 group">
                  <div className="w-10 h-10 rounded-full bg-white border-2 border-emerald-100 text-emerald-600 font-bold flex items-center justify-center shadow-sm group-hover:border-emerald-500 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300 flex-shrink-0 mt-1">
                    {idx + 1}
                  </div>
                  <span className="text-lg text-slate-700 font-medium group-hover:text-emerald-900 transition-colors">{req}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Section 3: Rincian Biaya - Static (Server Side) */}
      <section id="biaya" className="py-24 px-6 bg-slate-50 relative">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-emerald-800 mb-4">Rincian Biaya Pendidikan</h2>
            <p className="text-emerald-600/80 text-lg">Investasi terbaik untuk masa depan buah hati Anda.</p>
            <div className="mt-6 inline-block bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-2 rounded-full font-bold shadow-lg transform hover:scale-105 transition-transform">
              🔥 Ada Diskon Khusus untuk Alumni!
            </div>
          </div>

          <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-emerald-100">
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-emerald-600 text-white">
                    <th className="p-5 font-bold text-lg border-b border-emerald-500 sticky left-0 z-10 bg-emerald-600">URAIAN BIAYA</th>
                    <th className="p-5 font-bold text-lg border-b border-emerald-500 text-center">ASRAMA</th>
                    <th className="p-5 font-bold text-lg border-b border-emerald-500 text-center">NON ASRAMA</th>
                  </tr>
                </thead>
                <tbody className="text-slate-700">
                  <tr className="hover:bg-emerald-50/50 transition-colors border-b border-slate-100">
                    <td className="p-5 font-medium sticky left-0 z-10 bg-white">Pendaftaran</td>
                    <td className="p-5 text-center font-bold text-emerald-700">Rp 250.000</td>
                    <td className="p-5 text-center font-bold text-emerald-700">Rp 250.000</td>
                  </tr>
                  <tr className="hover:bg-emerald-50/50 transition-colors border-b border-slate-100 bg-slate-50/50">
                    <td className="p-5 font-medium sticky left-0 z-10 bg-slate-50">Perlengkapan</td>
                    <td className="p-5 text-center font-bold text-emerald-700">Rp 2.700.000</td>
                    <td className="p-5 text-center text-slate-400">-</td>
                  </tr>
                  <tr className="hover:bg-emerald-50/50 transition-colors border-b border-slate-100">
                    <td className="p-5 font-medium sticky left-0 z-10 bg-white">SPP Bulanan</td>
                    <td className="p-5 text-center font-bold text-emerald-700">Rp 1.000.000</td>
                    <td className="p-5 text-center font-bold text-emerald-700">Rp 200.000</td>
                  </tr>
                  <tr className="hover:bg-emerald-50/50 transition-colors border-b border-slate-100 bg-slate-50/50">
                    <td className="p-5 font-medium sticky left-0 z-10 bg-slate-50">Bangunan</td>
                    <td className="p-5 text-center font-bold text-emerald-700">Rp 3.000.000</td>
                    <td className="p-5 text-center font-bold text-emerald-700">Rp 1.500.000</td>
                  </tr>
                  <tr className="hover:bg-emerald-50/50 transition-colors border-b border-slate-100">
                    <td className="p-5 font-medium sticky left-0 z-10 bg-white">Seragam Putra</td>
                    <td className="p-5 text-center font-bold text-emerald-700">Rp 1.500.000</td>
                    <td className="p-5 text-center font-bold text-emerald-700">Rp 1.500.000</td>
                  </tr>
                  <tr className="hover:bg-emerald-50/50 transition-colors border-b border-slate-100 bg-slate-50/50">
                    <td className="p-5 font-medium sticky left-0 z-10 bg-slate-50">Seragam Putri</td>
                    <td className="p-5 text-center font-bold text-emerald-700">Rp 1.700.000</td>
                    <td className="p-5 text-center font-bold text-emerald-700">Rp 1.700.000</td>
                  </tr>
                  <tr className="hover:bg-emerald-50/50 transition-colors border-b border-slate-100">
                    <td className="p-5 font-medium sticky left-0 z-10 bg-white">Buku/Tahun</td>
                    <td className="p-5 text-center font-bold text-emerald-700">Rp 800.000</td>
                    <td className="p-5 text-center font-bold text-emerald-700">Rp 800.000</td>
                  </tr>
                  <tr className="hover:bg-emerald-50/50 transition-colors border-b border-slate-100 bg-slate-50/50">
                    <td className="p-5 font-medium sticky left-0 z-10 bg-slate-50">Ekskul+OSIS/Tahun</td>
                    <td className="p-5 text-center font-bold text-emerald-700">Rp 200.000</td>
                    <td className="p-5 text-center font-bold text-emerald-700">Rp 200.000</td>
                  </tr>
                  <tr className="hover:bg-emerald-50/50 transition-colors border-b border-slate-100">
                    <td className="p-5 font-medium sticky left-0 z-10 bg-white">Buku Raport</td>
                    <td className="p-5 text-center font-bold text-emerald-700">Rp 100.000</td>
                    <td className="p-5 text-center font-bold text-emerald-700">Rp 100.000</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden space-y-4 p-4 bg-slate-50">
              {[
                { name: "Pendaftaran", asrama: "Rp 250.000", non: "Rp 250.000" },
                { name: "Perlengkapan", asrama: "Rp 2.700.000", non: "-" },
                { name: "SPP Bulanan", asrama: "Rp 1.000.000", non: "Rp 200.000" },
                { name: "Bangunan", asrama: "Rp 3.000.000", non: "Rp 1.500.000" },
                { name: "Seragam Putra", asrama: "Rp 1.500.000", non: "Rp 1.500.000" },
                { name: "Seragam Putri", asrama: "Rp 1.700.000", non: "Rp 1.700.000" },
                { name: "Buku/Tahun", asrama: "Rp 800.000", non: "Rp 800.000" },
                { name: "Ekskul+OSIS/Tahun", asrama: "Rp 200.000", non: "Rp 200.000" },
                { name: "Buku Raport", asrama: "Rp 100.000", non: "Rp 100.000" },
              ].map((item, idx) => (
                <div key={idx} className="bg-white p-4 rounded-xl shadow-sm border border-emerald-100">
                  <h3 className="font-bold text-emerald-800 text-lg mb-2 border-b border-emerald-50 pb-2">{item.name}</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-emerald-500 uppercase font-bold">Asrama</p>
                      <p className="font-bold text-slate-700">{item.asrama}</p>
                    </div>
                    <div>
                      <p className="text-xs text-cyan-500 uppercase font-bold">Non Asrama</p>
                      <p className="font-bold text-slate-700">{item.non}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-6 bg-slate-50 border-t border-slate-200">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-2 text-sm text-slate-600">
                  <p className="flex items-start gap-2"><span className="text-emerald-500 font-bold">*</span> SPP Asrama Include makan 3X sehari, Laundry, dan P3K</p>
                  <p className="flex items-start gap-2"><span className="text-emerald-500 font-bold">*</span> Perlengkapan Asrama meliputi Kasur Inoac, Dipan, dan Almari</p>
                  <p className="flex items-start gap-2"><span className="text-emerald-500 font-bold">*</span> Administrasi Perlengkapan, Bangunan, dan Seragam wajib ditunaikan di awal tahun</p>
                </div>

                <div className="space-y-4">
                  <div className="bg-emerald-100 p-4 rounded-xl border border-emerald-200">
                    <h3 className="font-bold text-emerald-800 mb-2">Total Biaya Asrama</h3>
                    <div className="flex justify-between text-sm md:text-base">
                      <span>Putra: <span className="font-bold">Rp 9.550.000,-</span></span>
                      <span>Putri: <span className="font-bold">Rp 9.750.000,-</span></span>
                    </div>
                  </div>
                  <div className="bg-cyan-100 p-4 rounded-xl border border-cyan-200">
                    <h3 className="font-bold text-cyan-800 mb-2">Total Non Asrama</h3>
                    <div className="flex justify-between text-sm md:text-base">
                      <span>Putra: <span className="font-bold">Rp 4.550.000,-</span></span>
                      <span>Putri: <span className="font-bold">Rp 4.750.000,-</span></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <GallerySection />

      <ScheduleSection />

      {/* Form Section - RegistrationForm handles its own state (Client Component) */}
      <div id="daftar" className="py-32 bg-slate-100 min-h-[600px] flex items-center justify-center relative">
        <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-5"></div>
        <div className="container mx-auto px-6 z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-emerald-800 mb-4">Formulir Pendaftaran</h2>
            <p className="text-emerald-600/80 text-lg">Silakan lengkapi data di bawah ini dengan benar.</p>
          </div>

          <RegistrationForm />
        </div>
      </div>

      <LocationSection />

      {/* Simple Footer - Static (Server Side) */}
      <footer id="kontak" className="bg-slate-900 text-slate-500 py-8 text-center text-sm">
        <div className="container mx-auto px-6">
          <p className="mb-4">&copy; {new Date().getFullYear()} Al-Khoir Islamic School Bin Baz 5. All rights reserved.</p>
          <Link href="/admin" className="text-slate-700 hover:text-slate-400 transition-colors text-xs">
            Login Admin
          </Link>
        </div>
      </footer>
    </main >
  );
}
