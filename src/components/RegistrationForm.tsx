"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { tambahPendaftar, PendaftarData } from '@/lib/firebase/pendaftar';

export default function RegistrationForm() {
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');
    const [isMounted, setIsMounted] = useState(false);

    React.useEffect(() => {
        setIsMounted(true);
    }, []);

    const [formData, setFormData] = useState<Partial<PendaftarData>>({
        tingkat_pendidikan: undefined,
        nama_lengkap: '',
        asal_sekolah: '',
        nama_orangtua: '',
        nomor_wa_aktif: '',
    });

    if (!isMounted) return null;

    const nextStep = () => setStep((prev) => prev + 1);
    const prevStep = () => setStep((prev) => prev - 1);

    const handleLevelSelect = (level: "MTs" | "MA") => {
        setFormData({ ...formData, tingkat_pendidikan: level });
        nextStep();
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === 'nomor_wa_aktif') {
            const numericValue = value.replace(/[^0-9]/g, '');
            setFormData({ ...formData, [name]: numericValue });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async () => {
        if (!formData.nama_orangtua || !formData.nomor_wa_aktif) {
            setError('Mohon lengkapi semua data.');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const res = await tambahPendaftar(formData as PendaftarData);
            if (res.success) {
                setSubmitted(true);
            } else {
                setError('Gagal mengirim data. Silakan coba lagi.');
            }
        } catch (err) {
            setError('Terjadi kesalahan sistem.');
        } finally {
            setLoading(false);
        }
    };

    const variants = {
        initial: { opacity: 0, x: 20 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -20 },
    };

    if (submitted) {
        return (
            <div className="max-w-2xl mx-auto p-8 bg-white rounded-3xl shadow-xl text-center border-t-8 border-emerald-500">
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6"
                >
                    <svg className="w-12 h-12 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                </motion.div>
                <h2 className="text-3xl font-bold text-emerald-800 mb-4">Alhamdulillah!</h2>
                <p className="text-emerald-700/80 text-lg mb-8">
                    Data pendaftaran berhasil dikirim. Silakan tunggu informasi selanjutnya dari panitia melalui WhatsApp.
                </p>
                <button
                    onClick={() => window.location.reload()}
                    className="px-8 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition"
                >
                    Kembali ke Beranda
                </button>
            </div>
        )
    }

    return (
        <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden border border-emerald-100">
            {/* ProgressBar */}
            <div className="bg-emerald-50 p-6 border-b border-emerald-100">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-emerald-800">Formulir Pendaftaran</h3>
                    <span className="text-emerald-600 font-semibold">Langkah {step} dari 3</span>
                </div>
                <div className="w-full bg-emerald-200 h-2 rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500"
                        initial={{ width: 0 }}
                        animate={{ width: `${(step / 3) * 100}%` }}
                        transition={{ duration: 0.5 }}
                    />
                </div>
            </div>

            <div className="p-8 md:p-12 min-h-[400px]">
                <AnimatePresence mode="wait">
                    {step === 1 && (
                        <motion.div
                            key="step1"
                            variants={variants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full items-center"
                        >
                            <button
                                onClick={() => handleLevelSelect('MTs')}
                                className="group p-8 border-2 border-emerald-100 rounded-2xl hover:border-emerald-500 hover:bg-emerald-50 transition-all duration-300 h-64 flex flex-col items-center justify-center gap-4 hover:-translate-y-2 shadow-sm hover:shadow-lg"
                            >
                                <span className="text-6xl group-hover:scale-110 transition-transform">🕌</span>
                                <h4 className="text-2xl font-bold text-emerald-800">Tingkat MTs</h4>
                                <p className="text-emerald-600/70 text-sm">Madrasah Tsanawiyah</p>
                            </button>
                            <button
                                onClick={() => handleLevelSelect('MA')}
                                className="group p-8 border-2 border-cyan-100 rounded-2xl hover:border-cyan-500 hover:bg-cyan-50 transition-all duration-300 h-64 flex flex-col items-center justify-center gap-4 hover:-translate-y-2 shadow-sm hover:shadow-lg"
                            >
                                <span className="text-6xl group-hover:scale-110 transition-transform">🕋</span>
                                <h4 className="text-2xl font-bold text-cyan-800">Tingkat MA</h4>
                                <p className="text-cyan-600/70 text-sm">Madrasah Aliyah</p>
                            </button>
                        </motion.div>
                    )}

                    {step === 2 && (
                        <motion.div
                            key="step2"
                            variants={variants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            className="space-y-6"
                        >
                            <h3 className="text-2xl font-bold text-emerald-800 mb-6">Data Calon Siswa</h3>

                            <div className="space-y-2">
                                <label className="block text-emerald-700 font-semibold mb-1">Nama Lengkap</label>
                                <input
                                    type="text"
                                    name="nama_lengkap"
                                    value={formData.nama_lengkap}
                                    onChange={handleInputChange}
                                    placeholder="Contoh: Muhammad Fatih"
                                    className="w-full px-5 py-4 rounded-xl border border-emerald-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition bg-emerald-50/30"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="block text-emerald-700 font-semibold mb-1">Asal Sekolah</label>
                                <input
                                    type="text"
                                    name="asal_sekolah"
                                    value={formData.asal_sekolah}
                                    onChange={handleInputChange}
                                    placeholder="Contoh: SD Islam Al-Azhar"
                                    className="w-full px-5 py-4 rounded-xl border border-emerald-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition bg-emerald-50/30"
                                />
                            </div>

                            <div className="flex justify-between pt-6">
                                <button onClick={prevStep} className="px-6 py-3 text-emerald-600 font-semibold hover:bg-emerald-50 rounded-lg transition">Kembali</button>
                                <button
                                    onClick={nextStep}
                                    disabled={!formData.nama_lengkap || !formData.asal_sekolah}
                                    className="px-8 py-3 bg-emerald-600 text-white rounded-lg font-bold hover:bg-emerald-700 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-emerald-200"
                                >
                                    Lanjut
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {step === 3 && (
                        <motion.div
                            key="step3"
                            variants={variants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            className="space-y-6"
                        >
                            <h3 className="text-2xl font-bold text-emerald-800 mb-6">Data Wali & Kontak</h3>

                            <div className="space-y-2">
                                <label className="block text-emerald-700 font-semibold mb-1">Nama Orang Tua / Wali</label>
                                <input
                                    type="text"
                                    name="nama_orangtua"
                                    value={formData.nama_orangtua}
                                    onChange={handleInputChange}
                                    placeholder="Nama Lengkap Orang Tua"
                                    className="w-full px-5 py-4 rounded-xl border border-emerald-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition bg-emerald-50/30"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="block text-emerald-700 font-semibold mb-1">Nomor WhatsApp Aktif</label>
                                <input
                                    type="text"
                                    name="nomor_wa_aktif"
                                    value={formData.nomor_wa_aktif}
                                    onChange={handleInputChange}
                                    placeholder="Contoh: 08123456789"
                                    maxLength={15}
                                    className="w-full px-5 py-4 rounded-xl border border-emerald-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition bg-emerald-50/30"
                                />
                                <p className="text-xs text-emerald-600/70">*Hanya angka, pastikan nomor aktif.</p>
                            </div>

                            {error && <p className="text-red-500 text-sm bg-red-50 p-3 rounded-lg">{error}</p>}

                            <div className="flex justify-between pt-6">
                                <button onClick={prevStep} className="px-6 py-3 text-emerald-600 font-semibold hover:bg-emerald-50 rounded-lg transition">Kembali</button>
                                <button
                                    onClick={handleSubmit}
                                    disabled={loading}
                                    className="px-10 py-3 bg-cyan-600 text-white rounded-lg font-bold hover:bg-cyan-700 transition disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-cyan-200 flex items-center justify-center gap-2 min-w-[160px]"
                                >
                                    {loading ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                            Mengirim...
                                        </>
                                    ) : (
                                        'Kirim Pendaftaran'
                                    )}
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
