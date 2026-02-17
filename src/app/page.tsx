"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { db } from '@/lib/firebase/config';
import { doc, getDoc } from 'firebase/firestore';
import RegistrationForm from '@/components/RegistrationForm';

export default function Home() {
  const [activeTab, setActiveTab] = React.useState<'gelombang1' | 'gelombang2'>('gelombang1');
  const [schedule, setSchedule] = React.useState({
    gelombang1: {
      pendaftaran: "01 Okt 2025 - 30 Jan 2026",
      tes: "31 Jan 2026",
      pengumuman: "07 Feb 2026",
      daftarUlang: "14 Feb 2026"
    },
    gelombang2: {
      pendaftaran: "01 Feb 2026 - 30 Mar 2026",
      tes: "05 Apr 2026",
      pengumuman: "12 Apr 2026",
      daftarUlang: "19 Apr 2026"
    }
  });

  React.useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const docRef = doc(db, "settings", "jadwal");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setSchedule({
            gelombang1: {
              pendaftaran: data.gelombang1?.pendaftaran || data.tanggal_pendaftaran || "01 Okt 2025 - 30 Jan 2026",
              tes: data.gelombang1?.tes || data.tanggal_tes || "31 Jan 2026",
              pengumuman: data.gelombang1?.pengumuman || data.tanggal_pengumuman || "07 Feb 2026",
              daftarUlang: data.gelombang1?.daftar_ulang || data.tanggal_daftar_ulang || "14 Feb 2026"
            },
            gelombang2: {
              pendaftaran: data.gelombang2?.pendaftaran || "01 Feb 2026 - 30 Mar 2026",
              tes: data.gelombang2?.tes || "05 Apr 2026",
              pengumuman: data.gelombang2?.pengumuman || "12 Apr 2026",
              daftarUlang: data.gelombang2?.daftar_ulang || "19 Apr 2026"
            }
          });
        }
      } catch (error) {
        console.error("Error fetching schedule:", error);
      }
    };
    fetchSchedule();
  }, []);

  const scrollToForm = () => {
    const element = document.getElementById('form-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 text-emerald-900 font-sans selection:bg-cyan-200 selection:text-emerald-900">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden text-white">
        {/* Background Image */}
        <div className="absolute inset-0 bg-[url('https://hujtpnndfhnxddglztdn.supabase.co/storage/v1/object/public/seribudigital/gedung.jpeg')] bg-cover bg-center"></div>
        {/* Overlay for Readability */}
        <div className="absolute inset-0 bg-emerald-900/80 backdrop-blur-[2px]"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-transparent to-emerald-950/50"></div>

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

      {/* Hero Tagline Banner */}
      <div className="bg-emerald-900 text-white py-6 px-4 relative z-20 shadow-lg">
        <div className="container mx-auto text-center">
          <p className="text-sm md:text-lg font-bold tracking-widest uppercase flex flex-wrap justify-center gap-4 md:gap-8">
            <span>✨ Unggul Budi Pekerti</span>
            <span className="hidden md:inline text-emerald-500">|</span>
            <span>✨ Optimal Prestasi</span>
            <span className="hidden md:inline text-emerald-500">|</span>
            <span>✨ Bertauhid Sejak Dini</span>
            <span className="hidden md:inline text-emerald-500">|</span>
            <span>✨ Hidupkan Sunnah Nabi</span>
          </p>
        </div>
      </div>

      {/* Section: Latar Belakang */}
      <section className="py-20 px-6 bg-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-emerald-800 mb-8">Latar Belakang</h2>
          <div className="bg-slate-50 p-8 md:p-12 rounded-3xl border border-slate-100 shadow-sm">
            <p className="text-lg text-slate-700 leading-relaxed">
              "Sekolah Menengah Pertama Islam Terpadu Al-Khoir Islamic School Bin Baz 5 merupakan lembaga pendidikan yang memadukan model pendidikan ala pesantren salaf dengan kurikulum modern. Mengadopsi dari sistem pembelajaran yang diterapkan di Islamic Centre Bin Baz Yogyakarta, diharapkan Al Khoir Boarding School ini bisa melahirkan generasi robbani yang senantiasa berpegang pada ajaran-ajaran Al-Qur'an dan Sunnah Rasulullah Shallallahu 'alaihi wasallam."
            </p>
          </div>
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
                  "Memiliki aqidah yang shahihah & bertaqwa kepada Allah",
                  "Mampu membaca Al Qur'an dengan tartil dan hafal minimal 10 juz",
                  "Hafal hadits Arba'in Nawawiyah",
                  "Menguasai dasar-dasar ilmu syar'i",
                  "Memiliki akhlak mulia dan adab Islam",
                  "Memiliki kepedulian sosial dan lingkungan",
                  "Mahir berbahasa Arab lisan maupun tulisan",
                  "Memiliki kemandirian dan suka berdakwah"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="bg-emerald-400/30 rounded-full p-1 mt-0.5 min-w-[20px] h-[20px] flex items-center justify-center"><svg className="w-3 h-3 text-emerald-100" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg></span>
                    <span className="text-emerald-50 font-medium text-sm md:text-base">{item}</span>
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

      {/* Section: Kurikulum & Pengajar */}
      <section className="py-20 px-6 bg-emerald-50 relative overflow-hidden">
        <div className="container mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-emerald-800 mb-4">Kurikulum & Pengajar</h2>
            <div className="h-1.5 w-24 bg-gradient-to-r from-emerald-500 to-cyan-500 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1: Kurikulum Diniyyah */}
            <motion.div whileHover={{ y: -5 }} className="bg-white p-8 rounded-3xl shadow-sm border border-emerald-100 hover:shadow-md transition-all">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-6 text-2xl">📖</div>
              <h3 className="text-xl font-bold text-emerald-900 mb-4">Kurikulum Diniyyah</h3>
              <p className="text-slate-600 leading-relaxed">
                Pelajaran Tahfidz, Al-Qur'an, Akidah Akhlak, Adab Islam, Fikih, Hadits, Tarikh Islam, Manhaj, Muhadatsah, Nahwu, Shorof, Imla' wa Khot, Qiro'ah dan Tahsin.
              </p>
            </motion.div>

            {/* Card 2: Kurikulum Umum */}
            <motion.div whileHover={{ y: -5 }} className="bg-white p-8 rounded-3xl shadow-sm border border-emerald-100 hover:shadow-md transition-all">
              <div className="w-12 h-12 bg-cyan-100 rounded-xl flex items-center justify-center mb-6 text-2xl">📚</div>
              <h3 className="text-xl font-bold text-emerald-900 mb-4">Kurikulum Umum</h3>
              <p className="text-slate-600 leading-relaxed">
                Matematika, IPA, IPS, PKN, B. Indonesia, B. Inggris, Ilmu Komputer dan Pendidikan Pancasila.
              </p>
            </motion.div>

            {/* Card 3: Tenaga Pengajar */}
            <motion.div whileHover={{ y: -5 }} className="bg-white p-8 rounded-3xl shadow-sm border border-emerald-100 hover:shadow-md transition-all">
              <div className="w-12 h-12 bg-emerald-600 text-white rounded-xl flex items-center justify-center mb-6 text-2xl">👨‍🏫</div>
              <h3 className="text-xl font-bold text-emerald-900 mb-4">Tenaga Pengajar</h3>
              <p className="text-slate-600 leading-relaxed">
                Para Alumni Perguruan tinggi dalam negeri maupun luar negeri, Universitas Negeri maupun Swasta, Alumni Pondok Pesantren serta Tenaga Pengajar khusus Tahfidz Al-Qur'an.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section: Prestasi Kami */}
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

      {/* Section 3: Rincian Biaya (Table Version) */}
      <section className="py-24 px-6 bg-slate-50 relative">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-emerald-800 mb-4">Rincian Biaya Pendidikan</h2>
            <p className="text-emerald-600/80 text-lg">Investasi terbaik untuk masa depan buah hati Anda.</p>
            <div className="mt-6 inline-block bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-2 rounded-full font-bold shadow-lg transform hover:scale-105 transition-transform">
              🔥 Ada Diskon Khusus untuk Alumni!
            </div>
          </div>

          <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-emerald-100">
            <div className="overflow-x-auto">
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

            <div className="p-6 bg-slate-50 border-t border-slate-200">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-2 text-sm text-slate-600">
                  <p className="flex items-start gap-2"><span className="text-emerald-500 font-bold">*</span> SPP Asrama Include makan 3X sehari, Laundry, dan P3K</p>
                  <p className="flex items-start gap-2"><span className="text-emerald-500 font-bold">*</span> Perlengkapan Asrama meliputi Kasur Inoac, Dipan, dan Almari</p>
                  <p className="flex items-start gap-2"><span className="text-emerald-500 font-bold">*</span> Administrasi Perlengkapan, Bangunan, dan Seragam wajib ditunaikan di awal tahun</p>
                </div>

                <div className="space-y-4">
                  <div className="bg-emerald-100 p-4 rounded-xl border border-emerald-200">
                    <h4 className="font-bold text-emerald-800 mb-2">Total Biaya Asrama</h4>
                    <div className="flex justify-between text-sm md:text-base">
                      <span>Putra: <span className="font-bold">Rp 9.550.000,-</span></span>
                      <span>Putri: <span className="font-bold">Rp 9.750.000,-</span></span>
                    </div>
                  </div>
                  <div className="bg-cyan-100 p-4 rounded-xl border border-cyan-200">
                    <h4 className="font-bold text-cyan-800 mb-2">Total Non Asrama</h4>
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

      {/* Section 4: Galeri Kegiatan */}
      <section className="py-24 px-6 bg-white overflow-hidden">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-emerald-800 mb-4">Galeri Kegiatan</h2>
            <div className="h-1.5 w-24 bg-gradient-to-r from-emerald-500 to-cyan-500 mx-auto rounded-full"></div>
            <p className="mt-4 text-emerald-600/80 text-lg">Dokumentasi kegiatan santri dan fasilitas.</p>
          </div>

          <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
            {[
              "https://hujtpnndfhnxddglztdn.supabase.co/storage/v1/object/public/seribudigital/gal1.jpeg",
              "https://hujtpnndfhnxddglztdn.supabase.co/storage/v1/object/public/seribudigital/gal2.jpeg",
              "https://hujtpnndfhnxddglztdn.supabase.co/storage/v1/object/public/seribudigital/gal3.jpeg",
              "https://hujtpnndfhnxddglztdn.supabase.co/storage/v1/object/public/seribudigital/gal4.jpeg",
              "https://hujtpnndfhnxddglztdn.supabase.co/storage/v1/object/public/seribudigital/gal5.jpeg",
              "https://hujtpnndfhnxddglztdn.supabase.co/storage/v1/object/public/seribudigital/gal6.jpeg",
              "https://hujtpnndfhnxddglztdn.supabase.co/storage/v1/object/public/seribudigital/gal7.jpeg"
            ].map((src, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.02 }}
                className="break-inside-avoid rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
              >
                <img src={src} alt={`Galeri ${idx + 1}`} className="w-full h-auto object-cover" loading="lazy" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: Jadwal & Layanan Informasi */}
      <section className="py-24 px-6 bg-gradient-to-b from-white to-emerald-50">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-stretch">

            {/* Jadwal Card */}
            <div className="bg-white p-8 md:p-10 rounded-3xl shadow-[0_10px_30px_rgba(0,0,0,0.05)] border border-slate-100 h-full flex flex-col">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-3xl font-bold text-emerald-800 flex items-center gap-3">
                  <span className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center text-2xl shadow-sm">🗓️</span>
                  Jadwal
                </h3>
              </div>

              {/* Tabs */}
              <div className="flex p-1 bg-slate-100 rounded-xl mb-8 relative">
                <button
                  onClick={() => setActiveTab('gelombang1')}
                  className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all duration-300 ${activeTab === 'gelombang1'
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'text-slate-500 hover:text-emerald-600'
                    }`}
                >
                  Gelombang 1
                </button>
                <button
                  onClick={() => setActiveTab('gelombang2')}
                  className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all duration-300 ${activeTab === 'gelombang2'
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'text-slate-500 hover:text-emerald-600'
                    }`}
                >
                  Gelombang 2
                </button>
              </div>

              <div className="space-y-8 relative flex-grow">
                {/* Connecting Line */}
                <div className="absolute left-[27px] top-3 bottom-3 w-0.5 bg-slate-200"></div>

                {[
                  { title: "Pendaftaran", date: schedule[activeTab].pendaftaran, desc: "Dibuka secara online & offline" },
                  { title: "Tes Seleksi", date: schedule[activeTab].tes, desc: "Tes Akademik, BTQ, dan Wawancara" },
                  { title: "Pengumuman", date: schedule[activeTab].pengumuman, desc: "Hasil seleksi diumumkan via Website/WA" },
                  { title: "Daftar Ulang", date: schedule[activeTab].daftarUlang, desc: "Penyelesaian administrasi siswa baru" },
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
                    <h4 className="font-bold text-emerald-900 border-b border-emerald-200 pb-3 mb-4 flex items-center gap-3">
                      <img src="https://hujtpnndfhnxddglztdn.supabase.co/storage/v1/object/public/seribudigital/mts.webp" alt="MTs Logo" className="w-8 h-8 object-contain" />
                      Unit MTs
                    </h4>
                    <div className="grid gap-4">
                      <WhatsAppButton number="6282310436764" name="Ust. Amir" role="0823-1043-6764" color="emerald" />
                      <WhatsAppButton number="6281211599501" name="Ust. Suhendra" role="0812-1159-9501" color="emerald" />
                    </div>
                  </div>



                  <div className="bg-cyan-50/50 p-6 rounded-2xl border border-cyan-100 hover:border-cyan-300 transition-colors duration-300">
                    <h4 className="font-bold text-cyan-900 border-b border-cyan-200 pb-3 mb-4 flex items-center gap-3">
                      <img src="https://hujtpnndfhnxddglztdn.supabase.co/storage/v1/object/public/seribudigital/ma.webp" alt="MA Logo" className="w-8 h-8 object-contain" />
                      Unit MA
                    </h4>
                    <div className="grid gap-4">
                      <WhatsAppButton number="6282233498861" name="Ust. Darwin" role="0822-3349-8861" color="cyan" />
                      <WhatsAppButton number="6289522999229" name="Ust. M. Kholil" role="0895-2299-9229" color="cyan" />
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-emerald-100">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0 mt-1">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                      </div>
                      <div>
                        <h4 className="font-bold text-emerald-900">Lokasi Pendaftaran (Kampus AIS)</h4>
                        <p className="text-slate-600 text-sm mt-1 leading-relaxed">
                          Jl. Cikande Permai Blok T9 Cikande, Serang, Banten
                        </p>
                      </div>
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

      {/* Simple Footer */}
      <footer className="bg-slate-900 text-slate-500 py-8 text-center text-sm">
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

// Sub-components



function WhatsAppButton({ number, name, role, color = "emerald" }: { number: string, name: string, role: string, color?: "emerald" | "cyan" }) {
  const bgClass = color === "emerald" ? "bg-emerald-600 hover:bg-emerald-700 shadow-emerald-200" : "bg-cyan-600 hover:bg-cyan-700 shadow-cyan-200";

  return (
    <a
      href={`https://wa.me/${number}`}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex items-center gap-4 w-full p-4 ${bgClass} text-white rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 text-left`}
    >
      <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
          <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z" />
        </svg>
      </div>
      <div className="flex flex-col">
        <span className="font-bold text-lg leading-tight">{name}</span>
        <span className="text-sm opacity-90 font-medium">{role}</span>
      </div>
    </a>
  )
}

