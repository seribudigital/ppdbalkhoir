"use client";
import React from 'react';
import { db } from '@/lib/firebase/config';
import { doc, getDoc } from 'firebase/firestore';
import WhatsAppButton from '../WhatsAppButton';

export default function ScheduleSection() {
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

    return (
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
    );
}
