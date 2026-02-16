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
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 to-teal-100">
                Al-Khoir Islamic School
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

      {/* Timeline Section */}
      <section className="py-28 px-6 bg-slate-50">
        <div className="container mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-emerald-800 mb-6">Jadwal Penerimaan</h2>
            <div className="w-32 h-2 bg-gradient-to-r from-emerald-500 to-cyan-500 mx-auto rounded-full"></div>
            <p className="mt-6 text-lg text-emerald-700/80 max-w-2xl mx-auto">
              Catat tanggal-tanggal penting berikut untuk mengikuti proses penerimaan peserta didik baru.
            </p>
          </div>

          <div className="relative max-w-5xl mx-auto">
            {/* Vertical Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-emerald-200/60 hidden md:block rounded-full"></div>

            <div className="space-y-20">
              <TimelineItem
                date="01 Okt 2025 - 30 Jan 2026"
                title="Pendaftaran Online"
                description="Pengisian formulir pendaftaran dan unggah berkas persyaratan secara daring melalui website ini."
                alignment="right"
                icon="📝"
              />
              <TimelineItem
                date="31 Jan 2026 (09.00 WIB)"
                title="Tes Seleksi"
                description="Pelaksanaan Interview calon siswa dan orang tua, Tes BTQ & Pengetahuan Umum, serta Pengukuran Seragam."
                alignment="left"
                icon="✍️"
              />
              <TimelineItem
                date="07 Feb 2026"
                title="Pengumuman Kelulusan"
                description="Pengumuman hasil seleksi penerimaan peserta didik baru dapat dilihat melalui website atau WhatsApp."
                alignment="right"
                icon="📢"
              />
              <TimelineItem
                date="14 Feb 2026"
                title="Registrasi Ulang"
                description="Penyelesaian administrasi keuangan dan pengambilan seragam bagi peserta yang dinyatakan diterima."
                alignment="left"
                icon="✅"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-28 px-6 bg-gradient-to-b from-emerald-50 to-white">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-emerald-800 mb-6">Hubungi Kami</h2>
          <p className="text-lg text-emerald-700/80 mb-16 max-w-2xl mx-auto">
            Jika ada pertanyaan mengenai pendaftaran, silakan hubungi panitia kami melalui WhatsApp.
          </p>

          <div className="flex flex-wrap justify-center gap-10">
            {/* Contact MTs */}
            <div className="bg-white p-10 rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.05)] w-full md:w-[400px] border-t-8 border-emerald-500 hover:-translate-y-2 transition-transform duration-300 group">
              <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-emerald-200 transition-colors">
                <span className="text-3xl">🕌</span>
              </div>
              <h3 className="text-2xl font-bold text-emerald-900 mb-4">Tingkat MTs</h3>
              <p className="text-emerald-700/70 mb-8">Informasi pendaftaran untuk Madrasah Tsanawiyah Al-Khoir.</p>
              <div className="space-y-4">
                <WhatsAppButton number="6282310436764" label="Admin 1 (0823-1043-6764)" color="emerald" />
                <WhatsAppButton number="6281211599501" label="Admin 2 (0812-1159-9501)" color="emerald" />
              </div>
            </div>

            {/* Contact MA */}
            <div className="bg-white p-10 rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.05)] w-full md:w-[400px] border-t-8 border-cyan-500 hover:-translate-y-2 transition-transform duration-300 group">
              <div className="w-16 h-16 bg-cyan-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-cyan-200 transition-colors">
                <span className="text-3xl">🕋</span>
              </div>
              <h3 className="text-2xl font-bold text-emerald-900 mb-4">Tingkat MA</h3>
              <p className="text-emerald-700/70 mb-8">Informasi pendaftaran untuk Madrasah Aliyah Al-Khoir.</p>
              <div className="space-y-4">
                <WhatsAppButton number="6282233498861" label="Admin 1 (0822-3349-8861)" color="cyan" />
                <WhatsAppButton number="6289522999229" label="Admin 2 (0895-2299-9229)" color="cyan" />
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

function TimelineItem({ date, title, description, alignment, icon }: { date: string, title: string, description: string, alignment: 'left' | 'right', icon: string }) {
  return (
    <div className={`flex flex-col md:flex-row items-center justify-between relative group`}>
      {/* Date for Desktop - Left Aligned Item */}
      <div className={`hidden md:block w-5/12 text-right pr-12 ${alignment === 'left' ? 'order-1' : 'order-3 text-left pl-12 pr-0'}`}>
        {alignment === 'left' ? (
          <div>
            <h3 className="text-2xl font-bold text-emerald-800 mb-2 group-hover:text-emerald-600 transition-colors">{title}</h3>
            <p className="text-emerald-700/80 leading-relaxed">{description}</p>
          </div>
        ) : (
          <span className="text-lg font-bold text-emerald-700 bg-emerald-100/80 px-6 py-2 rounded-full border border-emerald-200 inline-block shadow-sm transform transition-transform group-hover:scale-105">{date}</span>
        )}
      </div>

      {/* Center Node */}
      <div className="z-10 bg-white p-4 rounded-full border-4 border-emerald-200 shadow-lg order-2 group-hover:border-cyan-400 group-hover:scale-110 transition-all duration-300">
        <span className="text-3xl">{icon}</span>
      </div>

      {/* Date for Desktop - Right Aligned Item */}
      <div className={`hidden md:block w-5/12 text-left pl-12 ${alignment === 'left' ? 'order-3' : 'order-1 text-right pr-12 pl-0'}`}>
        {alignment === 'left' ? (
          <span className="text-lg font-bold text-emerald-700 bg-emerald-100/80 px-6 py-2 rounded-full border border-emerald-200 inline-block shadow-sm transform transition-transform group-hover:scale-105">{date}</span>
        ) : (
          <div>
            <h3 className="text-2xl font-bold text-emerald-800 mb-2 group-hover:text-emerald-600 transition-colors">{title}</h3>
            <p className="text-emerald-700/80 leading-relaxed">{description}</p>
          </div>
        )}
      </div>

      {/* Mobile View */}
      <div className="block md:hidden text-center mt-6 order-4 px-4">
        <span className="text-sm font-bold text-emerald-700 bg-emerald-100 px-4 py-1.5 rounded-full mb-3 inline-block border border-emerald-200">{date}</span>
        <h3 className="text-2xl font-bold text-emerald-800 mb-2">{title}</h3>
        <p className="text-emerald-700/80">{description}</p>
      </div>
    </div>
  );
}

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

