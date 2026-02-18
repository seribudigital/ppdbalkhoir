"use client";
import React from 'react';
import { motion } from 'framer-motion';

export default function KurikulumSection() {
    return (
        <section className="py-20 px-6 bg-transparent relative overflow-hidden">
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
    );
}
