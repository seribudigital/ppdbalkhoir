"use client";
import React from 'react';
import { motion } from 'framer-motion';

export default function VisimisiSection() {
    return (
        <section className="py-20 px-6 bg-transparent relative overflow-hidden">
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
    );
}
