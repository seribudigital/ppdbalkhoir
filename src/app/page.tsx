"use client";
import React from 'react';
import { motion } from 'framer-motion';
import RegistrationForm from '@/components/RegistrationForm';

export default function Home() {
  const scrollToForm = () => {
    const element = document.getElementById('form-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 text-emerald-900 font-sans selection:bg-cyan-200 selection:text-emerald-900">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-emerald-700 via-emerald-600 to-teal-600 text-white">
        {/* Background Overlay for Depth */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-cyan-500/20 via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-5 mix-blend-overlay"></div>

        <div className="container mx-auto px-6 text-center z-10 pt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-block mb-4 px-6 py-2 rounded-full bg-emerald-800/30 border border-emerald-400/30 backdrop-blur-sm">
              <span className="text-emerald-100 tracking-wider text-sm font-semibold uppercase">Penerimaan Peserta Didik Baru</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 drop-shadow-lg leading-tight">
              SPMB 2026/2027 <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 to-teal-100 block md:inline">
                Al-Khoir Islamic School Bin Baz 5
              </span>
            </h1>

            <p className="text-xl md:text-2xl md:max-w-4xl mx-auto mb-10 text-emerald-50 leading-relaxed font-light">
              Membangun Generasi Qur'ani yang Berakhlak Mulia dan Berprestasi. <br />
              <span className="block mt-2 text-lg font-normal opacity-90">Tingkat MTs & MA (Islamic Center Bin Baz 5 Cab. Cikande)</span>
            </p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToForm}
              className="px-10 py-5 bg-cyan-600 text-white font-bold text-lg rounded-full shadow-[0_10px_20px_rgba(8,145,178,0.3)] hover:shadow-[0_15px_30px_rgba(8,145,178,0.4)] hover:bg-cyan-500 transition-all duration-300 ring-4 ring-cyan-400/20"
            >
              Daftar Sekarang
            </motion.button>
          </motion.div>
        </div>

        {/* Decorative Wave */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none rotate-180">
          <svg className="relative block w-[calc(100%+1.3px)] h-[80px] md:h-[150px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-slate-50"></path>
          </svg>
        </div>
      </section>

      {/* Section 1: Visi & Keunggulan */}
      <section className="py-20 px-6 bg-slate-50 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

        <div className="container mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-emerald-800 mb-4 tracking-tight">Visi & Keunggulan</h2>
            <div className="h-1.5 w-24 bg-gradient-to-r from-emerald-500 to-cyan-500 mx-auto rounded-full"></div>
            <p className="mt-4 text-emerald-600/80 max-w-2xl mx-auto text-lg">
              Mewujudkan pendidikan berkualitas dengan landasan iman dan taqwa.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Visi Card */}
            <motion.div
              whileHover={{ y: -10 }}
              className="bg-white rounded-3xl p-8 shadow-[0_10px_40px_rgba(0,0,0,0.05)] border border-slate-100 hover:shadow-[0_20px_60px_rgba(16,185,129,0.15)] transition-all duration-500 md:col-span-3 lg:col-span-1 flex flex-col"
            >
              <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center mb-6 text-3xl">👁️</div>
              <h3 className="text-2xl font-bold text-emerald-900 mb-4">Visi Kami</h3>
              <p className="text-emerald-700/80 leading-relaxed italic">
                "Menjadi Lembaga Pendidikan menengah berbasis pesantren yang bermanhaj salafush shalih dalam beraqidah, beribadah, berakhlak, dan bermuamalah secara ilmu dan amal."
              </p>
            </motion.div>

            {/* Target Unggulan Card */}
            <motion.div
              whileHover={{ y: -10 }}
              className="bg-gradient-to-br from-emerald-600 to-teal-700 rounded-3xl p-8 shadow-[0_15px_50px_rgba(16,185,129,0.3)] text-white md:col-span-3 lg:col-span-1 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110 duration-500"></div>

              <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mb-6 text-3xl backdrop-blur-sm">🎯</div>
              <h3 className="text-2xl font-bold mb-6">Target Unggulan</h3>
              <ul className="space-y-4">
                {[
                  "Hafal minimal 10 Juz Al-Qur'an",
                  "Hafal Hadits Arba'in",
                  "Menguasai dasar-dasar ilmu syar'i",
                  "Berbahasa Arab & Inggris",
                  "Memiliki akhlakul karimah"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="bg-emerald-400/30 rounded-full p-1 mt-0.5"><svg className="w-3 h-3 text-emerald-100" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg></span>
                    <span className="text-emerald-50 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Ekstrakurikuler Card */}
            <motion.div
              whileHover={{ y: -10 }}
              className="bg-white rounded-3xl p-8 shadow-[0_10px_40px_rgba(0,0,0,0.05)] border border-slate-100 hover:shadow-[0_20px_60px_rgba(6,182,212,0.15)] transition-all duration-500 md:col-span-3 lg:col-span-1"
            >
              <div className="w-14 h-14 bg-cyan-100 rounded-2xl flex items-center justify-center mb-6 text-3xl">⚽</div>
              <h3 className="text-2xl font-bold text-emerald-900 mb-6">Ekstrakurikuler</h3>
              <div className="flex flex-wrap gap-2">
                {[
                  "English Club", "Pramuka", "Futsal", "Voli",
                  "Badminton", "Ping Pong", "Desain Grafis",
                  "PMR", "Prakarya", "OSMA"
                ].map((ekskul, idx) => (
                  <span key={idx} className="px-3 py-1 bg-slate-50 text-emerald-700 text-sm font-semibold rounded-lg border border-slate-200 hover:border-cyan-300 hover:bg-cyan-50 transition-colors cursor-default">
                    {ekskul}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 2: Syarat Pendaftaran */}
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
                <li key={idx} className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-full bg-white border-2 border-emerald-100 text-emerald-600 font-bold flex items-center justify-center shadow-sm group-hover:border-emerald-500 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300">
                    {idx + 1}
                  </div>
                  <span className="text-lg text-slate-700 font-medium group-hover:text-emerald-900 transition-colors">{req}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Section 3: Rincian Biaya */}
      <section className="py-24 px-6 bg-slate-50 relative">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-emerald-800 mb-4">Rincian Biaya Pendidikan</h2>
            <p className="text-emerald-600/80 text-lg">Investasi terbaik untuk masa depan buah hati Anda.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* ASRAMA Card */}
            <div className="bg-white rounded-3xl shadow-[0_10px_40px_rgba(16,185,129,0.1)] border border-emerald-100 overflow-hidden transform hover:-translate-y-2 transition-transform duration-500 relative">
              <div className="bg-emerald-600 p-6 text-center text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-10"></div>
                <h3 className="text-2xl font-bold relative z-10">Program ASRAMA</h3>
                <p className="opacity-90 relative z-10">Boarding School</p>
              </div>
              <div className="p-8">
                <div className="mb-8">
                  <p className="text-sm text-slate-500 uppercase font-bold tracking-wider mb-2">Biaya Pendaftaran</p>
                  <p className="text-3xl font-bold text-slate-800">Rp 250.000</p>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                    <span className="text-slate-600">Total Putra</span>
                    <span className="font-bold text-emerald-700 text-lg">Rp 9.550.000</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                    <span className="text-slate-600">Total Putri</span>
                    <span className="font-bold text-emerald-700 text-lg">Rp 9.750.000</span>
                  </div>
                  <div className="bg-emerald-50 p-4 rounded-xl mt-4">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-emerald-900 font-bold">SPP Bulanan</span>
                      <span className="text-emerald-700 font-bold">Rp 1.000.000</span>
                    </div>
                    <p className="text-xs text-emerald-600 mt-1 flex items-center gap-1">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                      Include makan 3x, laundry, P3K
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* NON-ASRAMA Card */}
            <div className="bg-white rounded-3xl shadow-[0_10px_40px_rgba(6,182,212,0.1)] border border-cyan-100 overflow-hidden transform hover:-translate-y-2 transition-transform duration-500 relative">
              <div className="bg-cyan-600 p-6 text-center text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-10"></div>
                <h3 className="text-2xl font-bold relative z-10">Program NON-ASRAMA</h3>
                <p className="opacity-90 relative z-10">Full Day School</p>
              </div>
              <div className="p-8">
                <div className="mb-8">
                  <p className="text-sm text-slate-500 uppercase font-bold tracking-wider mb-2">Biaya Pendaftaran</p>
                  <p className="text-3xl font-bold text-slate-800">Rp 250.000</p>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                    <span className="text-slate-600">Total Putra</span>
                    <span className="font-bold text-cyan-700 text-lg">Rp 4.550.000</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                    <span className="text-slate-600">Total Putri</span>
                    <span className="font-bold text-cyan-700 text-lg">Rp 4.750.000</span>
                  </div>
                  <div className="bg-cyan-50 p-4 rounded-xl mt-4">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-cyan-900 font-bold">SPP Bulanan</span>
                      <span className="text-cyan-700 font-bold">Rp 200.000</span>
                    </div>
                    <p className="text-xs text-cyan-600 mt-1 flex items-center gap-1">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                      Biaya pendidikan reguler
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 text-center">
            <p className="text-slate-500 text-sm max-w-2xl mx-auto bg-white py-3 px-6 rounded-full inline-block shadow-sm border border-slate-200">
              <span className="font-bold text-emerald-600">*Catatan:</span> Biaya total di atas sudah meliputi Bangunan, Seragam, Buku/Tahun, Ekskul, dan Raport. <span className="text-emerald-600 font-semibold">Ada diskon khusus untuk alumni.</span>
            </p>
          </div>
        </div>
      </section>

      {/* Section 4: Jadwal & Layanan Informasi */}
      <section className="py-24 px-6 bg-gradient-to-b from-white to-emerald-50">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-stretch">

            {/* Jadwal Card */}
            <div className="bg-white p-8 md:p-10 rounded-3xl shadow-[0_10px_30px_rgba(0,0,0,0.05)] border border-slate-100 h-full flex flex-col">
              <h3 className="text-3xl font-bold text-emerald-800 mb-8 flex items-center gap-3">
                <span className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center text-2xl shadow-sm">🗓️</span>
                Jadwal Pendaftaran
              </h3>
              <div className="space-y-8 relative flex-grow">
                {/* Connecting Line */}
                <div className="absolute left-[27px] top-3 bottom-3 w-0.5 bg-slate-200"></div>

                {[
                  { title: "Pendaftaran", date: "01 Okt 2025 - 30 Jan 2026", desc: "Gelombang 1 dibuka secara online & offline" },
                  { title: "Tes Seleksi", date: "31 Jan 2026", desc: "Tes Akademik, BTQ, dan Wawancara" },
                  { title: "Pengumuman", date: "07 Feb 2026", desc: "Hasil seleksi diumumkan via Website/WA" },
                  { title: "Daftar Ulang", date: "14 Feb 2026", desc: "Penyelesaian administrasi siswa baru" },
                ].map((item, idx) => (
                  <div key={idx} className="relative pl-14 group">
                    <div className="absolute left-[19px] top-1.5 w-4 h-4 rounded-full bg-white border-4 border-emerald-400 shadow-sm z-10 group-hover:scale-125 group-hover:border-emerald-500 transition-all duration-300"></div>
                    <h4 className="text-xl font-bold text-slate-800 group-hover:text-emerald-700 transition-colors">{item.title}</h4>
                    <span className="text-emerald-600 font-bold text-sm bg-emerald-50 px-3 py-1 rounded-md inline-block my-1 border border-emerald-100">{item.date}</span>
                    <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Layanan Informasi Card */}
            <div className="bg-white p-8 md:p-10 rounded-3xl shadow-[0_10px_30px_rgba(0,0,0,0.05)] border border-slate-100 h-full flex flex-col">
              <h3 className="text-3xl font-bold text-emerald-800 mb-8 flex items-center gap-3">
                <span className="w-12 h-12 rounded-xl bg-cyan-100 text-cyan-600 flex items-center justify-center text-2xl shadow-sm">📞</span>
                Layanan Informasi
              </h3>

              <div className="flex-grow flex flex-col">
                <p className="text-slate-600 mb-8 text-lg leading-relaxed">
                  Tim panitia kami siap membantu Anda. Jangan ragu untuk menghubungi kami jika ada pertanyaan seputar pendaftaran.
                </p>

                <div className="space-y-8 mt-auto">
                  <div className="bg-emerald-50/50 p-6 rounded-2xl border border-emerald-100 hover:border-emerald-300 transition-colors duration-300">
                    <h4 className="font-bold text-emerald-900 border-b border-emerald-200 pb-3 mb-4 flex items-center gap-2">
                      <span className="text-xl">🕌</span> Unit MTs
                    </h4>
                    <div className="grid gap-4">
                      <WhatsAppButton number="6282310436764" label="Ust. Amir (0823-1043-6764)" color="emerald" />
                      <WhatsAppButton number="6281211599501" label="Ust. Suhendra (0812-1159-9501)" color="emerald" />
                    </div>
                  </div>

                  <div className="bg-cyan-50/50 p-6 rounded-2xl border border-cyan-100 hover:border-cyan-300 transition-colors duration-300">
                    <h4 className="font-bold text-cyan-900 border-b border-cyan-200 pb-3 mb-4 flex items-center gap-2">
                      <span className="text-xl">🕋</span> Unit MA
                    </h4>
                    <div className="grid gap-4">
                      <WhatsAppButton number="6282233498861" label="Ust. Darwin (0822-3349-8861)" color="cyan" />
                      <WhatsAppButton number="6289522999229" label="Ust. M. Kholil (0895-2299-9229)" color="cyan" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Form Section */}
      <div id="form-section" className="py-32 bg-slate-100 min-h-[600px] flex items-center justify-center relative">
        <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-5"></div>
        <div className="container mx-auto px-6 z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-emerald-800 mb-4">Formulir Pendaftaran</h2>
            <p className="text-emerald-600/80 text-lg">Silakan lengkapi data di bawah ini dengan benar.</p>
          </div>

          <RegistrationForm />
        </div>
      </div>

    </main>
  );
}

// Sub-components



function WhatsAppButton({ number, label, color = "emerald" }: { number: string, label: string, color?: "emerald" | "cyan" }) {
  const bgClass = color === "emerald" ? "bg-emerald-600 hover:bg-emerald-700 shadow-emerald-200" : "bg-cyan-600 hover:bg-cyan-700 shadow-cyan-200";

  return (
    <a
      href={`https://wa.me/${number}`}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex items-center justify-center gap-3 w-full py-4 ${bgClass} text-white rounded-xl transition-all duration-300 font-semibold shadow-lg hover:shadow-xl hover:-translate-y-1`}
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 16 16">
        <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z" />
      </svg>
      {label}
    </a>
  )
}

