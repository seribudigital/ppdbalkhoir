"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { tambahPendaftar, PendaftarData } from '@/lib/firebase/pendaftar';

// Input Field Component (Defined Outside to prevent re-renders)
interface InputFieldProps {
    label: string;
    name: string;
    value: string | number | undefined;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
    type?: string;
    placeholder?: string;
    required?: boolean;
    isTextArea?: boolean;
    options?: string[];
}

const InputField = ({ label, name, value, onChange, type = "text", placeholder, required = true, isTextArea = false, options = [] }: InputFieldProps) => {
    const inputId = name; // Use name as ID since it's unique in this form

    return (
        <div className="space-y-1">
            <label htmlFor={inputId} className="block text-emerald-800 font-semibold text-sm">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            {isTextArea ? (
                <textarea
                    id={inputId}
                    name={name}
                    value={value || ''}
                    onChange={onChange}
                    placeholder={placeholder}
                    className="w-full px-4 py-3 rounded-xl border border-emerald-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition bg-emerald-50/30 text-emerald-900"
                    rows={3}
                />
            ) : options.length > 0 ? (
                <div className="relative">
                    <select
                        id={inputId}
                        name={name}
                        value={value || ''}
                        onChange={onChange}
                        className="w-full px-4 py-3 rounded-xl border border-emerald-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition bg-emerald-50/30 appearance-none text-emerald-900 cursor-pointer"
                    >
                        <option value="">-- Pilih {label} --</option>
                        {options.map((opt: string) => (
                            <option key={opt} value={opt}>{opt}</option>
                        ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-emerald-600">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                    </div>
                </div>
            ) : (
                <input
                    id={inputId}
                    type={type}
                    name={name}
                    value={value || ''}
                    onChange={onChange}
                    placeholder={placeholder}
                    className="w-full px-4 py-3 rounded-xl border border-emerald-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition bg-emerald-50/30 text-emerald-900"
                />
            )}
        </div>
    );
};

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
        // Step 1
        tingkat_pendidikan: undefined,
        nama_lengkap: '',
        nisn: '',
        tempat_lahir: '',
        tanggal_lahir: '',
        jenis_kelamin: undefined,
        anak_ke: undefined,

        // Step 2
        asal_sekolah: '',
        alamat_sekolah_asal: '',
        kelas_sekolah_asal: '',

        // Step 3
        nomor_kk: '',
        nama_ayah: '',
        nik_ayah: '',
        pendidikan_ayah: 'SMA',
        pekerjaan_ayah: '',
        nomor_wa_ayah: '',
        nama_ibu: '',
        nik_ibu: '',
        pendidikan_ibu: 'SMA',
        pekerjaan_ibu: '',
        nomor_wa_ibu: '',

        // Step 4
        alamat_lengkap: '',
        kecamatan: '',
        kabupaten: '',
        provinsi: '',
    });

    if (!isMounted) return null;

    const nextStep = () => {
        if (validateStep(step)) {
            setStep((prev) => prev + 1);
            setError('');
        } else {
            setError('Mohon lengkapi data wajib (*).');
        }
    };
    const prevStep = () => {
        setStep((prev) => prev - 1);
        setError('');
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        // Numeric filters
        if (['anak_ke', 'nisn', 'nomor_kk', 'nik_ayah', 'nomor_wa_ayah', 'nik_ibu', 'nomor_wa_ibu'].includes(name)) {
            const numericValue = value.replace(/[^0-9]/g, '');
            setFormData(prev => ({ ...prev, [name]: numericValue }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const validateStep = (currentStep: number) => {
        const d = formData;
        if (currentStep === 1) {
            return d.tingkat_pendidikan && d.nama_lengkap && d.nisn && d.tempat_lahir && d.tanggal_lahir && d.jenis_kelamin && d.anak_ke;
        }
        if (currentStep === 2) {
            return d.asal_sekolah && d.alamat_sekolah_asal && d.kelas_sekolah_asal;
        }
        if (currentStep === 3) {
            const fatherOk = d.nama_ayah && d.nomor_wa_ayah;
            const motherOk = d.nama_ibu && d.nomor_wa_ibu;
            return d.nomor_kk && (fatherOk || motherOk);
        }
        if (currentStep === 4) {
            return d.alamat_lengkap && d.kecamatan && d.kabupaten && d.provinsi;
        }
        return true;
    };

    const handleSubmit = async () => {
        if (!validateStep(4)) {
            setError('Mohon lengkapi data alamat.');
            return;
        }

        setLoading(true);
        setError('');

        const payload: PendaftarData = {
            ...formData as PendaftarData,
            nama_orangtua: formData.nama_ayah || formData.nama_ibu || 'Orang Tua',
            nomor_wa_aktif: formData.nomor_wa_ayah || formData.nomor_wa_ibu || '',
            anak_ke: Number(formData.anak_ke),
        };

        try {
            const res = await tambahPendaftar(payload);
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
                    className="px-8 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition font-semibold"
                >
                    Kembali ke Beranda
                </button>
            </div>
        )
    }

    return (
        <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden border border-emerald-100 flex flex-col md:flex-row min-h-[600px]">
            {/* Sidebar / Progress for Desktop */}
            <div className="bg-emerald-800 text-white p-6 md:w-1/4 flex flex-col justify-between">
                <div>
                    <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                        <span>📝</span> Pendaftaran
                    </h3>
                    <div className="space-y-4">
                        {[1, 2, 3, 4].map((s) => (
                            <div key={s} className={`flex items-center gap-3 ${step === s ? 'opacity-100' : 'opacity-50'}`}>
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm border-2 ${step >= s ? 'bg-white text-emerald-800 border-white' : 'border-emerald-400 text-emerald-100'}`}>
                                    {s}
                                </div>
                                <span className="text-sm font-medium hidden md:block">
                                    {s === 1 && "Data Diri"}
                                    {s === 2 && "Sekolah Asal"}
                                    {s === 3 && "Wali Santri"}
                                    {s === 4 && "Alamat"}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="text-xs text-emerald-200/60 mt-8 hidden md:block">
                    *Isi data dengan benar dan lengkap.
                </div>
            </div>

            {/* Main Form Area */}
            <div className="flex-1 p-6 md:p-10 bg-white flex flex-col">
                <div className="flex-1">
                    <AnimatePresence mode="wait">
                        {step === 1 && (
                            <motion.div key="step1" variants={variants} initial="initial" animate="animate" exit="exit" className="space-y-6">
                                <h3 className="text-2xl font-bold text-emerald-800 border-b border-emerald-100 pb-2">Data Diri Calon Santri</h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="md:col-span-2 space-y-2">
                                        <label className="block text-emerald-800 font-semibold text-sm">Jenjang Pendidikan <span className="text-red-500">*</span></label>
                                        <div className="grid grid-cols-2 gap-4">
                                            <button
                                                onClick={() => setFormData({ ...formData, tingkat_pendidikan: 'MTs' })}
                                                className={`p-4 rounded-xl border-2 transition-all flex items-center justify-center gap-2 ${formData.tingkat_pendidikan === 'MTs' ? 'border-emerald-500 bg-emerald-50 text-emerald-700 font-bold shadow-sm' : 'border-slate-200 hover:border-emerald-300'}`}
                                            >
                                                <span>🕌</span> MTs
                                            </button>
                                            <button
                                                onClick={() => setFormData({ ...formData, tingkat_pendidikan: 'MA' })}
                                                className={`p-4 rounded-xl border-2 transition-all flex items-center justify-center gap-2 ${formData.tingkat_pendidikan === 'MA' ? 'border-cyan-500 bg-cyan-50 text-cyan-700 font-bold shadow-sm' : 'border-slate-200 hover:border-cyan-300'}`}
                                            >
                                                <span>🕋</span> MA
                                            </button>
                                        </div>
                                    </div>

                                    <InputField label="Nama Lengkap" name="nama_lengkap" value={formData.nama_lengkap} onChange={handleInputChange} placeholder="Sesuai Ijazah" />
                                    <InputField label="NISN" name="nisn" value={formData.nisn} onChange={handleInputChange} placeholder="Nomor Induk Siswa Nasional" />
                                    <InputField label="Tempat Lahir" name="tempat_lahir" value={formData.tempat_lahir} onChange={handleInputChange} placeholder="Kota Kelahiran" />
                                    <InputField label="Tanggal Lahir" name="tanggal_lahir" value={formData.tanggal_lahir} onChange={handleInputChange} type="date" />

                                    <InputField label="Jenis Kelamin" name="jenis_kelamin" value={formData.jenis_kelamin} onChange={handleInputChange} options={["Laki-laki", "Perempuan"]} />
                                    <InputField label="Anak ke-" name="anak_ke" value={formData.anak_ke} onChange={handleInputChange} type="number" placeholder="1" />
                                </div>
                            </motion.div>
                        )}

                        {step === 2 && (
                            <motion.div key="step2" variants={variants} initial="initial" animate="animate" exit="exit" className="space-y-6">
                                <h3 className="text-2xl font-bold text-emerald-800 border-b border-emerald-100 pb-2">Data Sekolah Asal</h3>
                                <div className="space-y-4">
                                    <InputField label="Nama Sekolah Asal" name="asal_sekolah" value={formData.asal_sekolah} onChange={handleInputChange} placeholder="Nama Sekolah / Madrasah Sebelumnya" />
                                    <InputField label="Alamat Sekolah" name="alamat_sekolah_asal" value={formData.alamat_sekolah_asal} onChange={handleInputChange} placeholder="Alamat lengkap sekolah..." isTextArea={true} />
                                    <InputField label="Kelas Terakhir" name="kelas_sekolah_asal" value={formData.kelas_sekolah_asal} onChange={handleInputChange} placeholder="Contoh: 6 SD / 9 SMP" />
                                </div>
                            </motion.div>
                        )}

                        {step === 3 && (
                            <motion.div key="step3" variants={variants} initial="initial" animate="animate" exit="exit" className="space-y-6 h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                                <h3 className="text-2xl font-bold text-emerald-800 border-b border-emerald-100 pb-2">Data Orang Tua / Wali</h3>

                                <InputField label="Nomor Kartu Keluarga (KK)" name="nomor_kk" value={formData.nomor_kk} onChange={handleInputChange} placeholder="16 digit nomor KK" />

                                {/* Data Ayah */}
                                <div className="bg-emerald-50/50 p-4 rounded-xl border border-emerald-100 space-y-4">
                                    <h4 className="font-bold text-emerald-700 flex items-center gap-2">👨 Data Ayah</h4>
                                    <InputField label="Nama Ayah" name="nama_ayah" value={formData.nama_ayah} onChange={handleInputChange} placeholder="Nama Lengkap Ayah" required={false} />
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <InputField label="NIK Ayah" name="nik_ayah" value={formData.nik_ayah} onChange={handleInputChange} placeholder="16 Digit NIK" required={false} />
                                        <InputField label="No. Handphone / WA" name="nomor_wa_ayah" value={formData.nomor_wa_ayah} onChange={handleInputChange} placeholder="08..." required={false} />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <InputField label="Pendidikan Terakhir" name="pendidikan_ayah" value={formData.pendidikan_ayah} onChange={handleInputChange} options={["SD", "SMP", "SMA", "D3", "S1", "S2", "S3", "Tidak Sekolah"]} required={false} />
                                        <InputField label="Pekerjaan" name="pekerjaan_ayah" value={formData.pekerjaan_ayah} onChange={handleInputChange} placeholder="Pekerjaan Ayah" required={false} />
                                    </div>
                                </div>

                                {/* Data Ibu */}
                                <div className="bg-cyan-50/50 p-4 rounded-xl border border-cyan-100 space-y-4">
                                    <h4 className="font-bold text-cyan-700 flex items-center gap-2">🧕 Data Ibu</h4>
                                    <InputField label="Nama Ibu" name="nama_ibu" value={formData.nama_ibu} onChange={handleInputChange} placeholder="Nama Lengkap Ibu" required={false} />
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <InputField label="NIK Ibu" name="nik_ibu" value={formData.nik_ibu} onChange={handleInputChange} placeholder="16 Digit NIK" required={false} />
                                        <InputField label="No. Handphone / WA" name="nomor_wa_ibu" value={formData.nomor_wa_ibu} onChange={handleInputChange} placeholder="08..." required={false} />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <InputField label="Pendidikan Terakhir" name="pendidikan_ibu" value={formData.pendidikan_ibu} onChange={handleInputChange} options={["SD", "SMP", "SMA", "D3", "S1", "S2", "S3", "Tidak Sekolah"]} required={false} />
                                        <InputField label="Pekerjaan" name="pekerjaan_ibu" value={formData.pekerjaan_ibu} onChange={handleInputChange} placeholder="Pekerjaan Ibu" required={false} />
                                    </div>
                                </div>
                                <p className="text-xs text-slate-500 italic">*Wajib mengisi setidaknya data salah satu orang tua (Ayah atau Ibu) yang mencantumkan Nomor WA aktif.</p>
                            </motion.div>
                        )}

                        {step === 4 && (
                            <motion.div key="step4" variants={variants} initial="initial" animate="animate" exit="exit" className="space-y-6">
                                <h3 className="text-2xl font-bold text-emerald-800 border-b border-emerald-100 pb-2">Alamat & Finalisasi</h3>
                                <div className="space-y-4">
                                    <InputField label="Alamat Lengkap Rumah" name="alamat_lengkap" value={formData.alamat_lengkap} onChange={handleInputChange} placeholder="Nama Jalan, RT/RW, Dusun..." isTextArea={true} />
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <InputField label="Kecamatan" name="kecamatan" value={formData.kecamatan} onChange={handleInputChange} placeholder="Kecamatan" />
                                        <InputField label="Kabupaten/Kota" name="kabupaten" value={formData.kabupaten} onChange={handleInputChange} placeholder="Kabupaten" />
                                        <InputField label="Provinsi" name="provinsi" value={formData.provinsi} onChange={handleInputChange} placeholder="Provinsi" />
                                    </div>

                                    <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-200 text-sm text-yellow-800 flex gap-3 items-start">
                                        <span className="text-xl">⚠️</span>
                                        <p>Mohon periksa kembali semua data sebelum dikirim. Data yang sudah dikirim akan masuk ke sistem antrian verifikasi panitia.</p>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Footer Controls */}
                <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
                    {error && <p className="text-red-500 text-sm font-medium animate-pulse absolute -top-8 left-6 md:static md:mb-0 md:mr-auto">{error}</p>}

                    <div className="flex gap-4 ml-auto w-full md:w-auto">
                        {step > 1 && (
                            <button
                                onClick={prevStep}
                                className="px-6 py-3 rounded-xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 transition w-full md:w-auto"
                            >
                                Sebelumnya
                            </button>
                        )}
                        {step < 4 ? (
                            <button
                                onClick={nextStep}
                                className="px-8 py-3 rounded-xl bg-emerald-600 text-white font-bold hover:bg-emerald-700 shadow-lg shadow-emerald-200 transition w-full md:w-auto flex items-center justify-center gap-2"
                            >
                                Selanjutnya <span>➜</span>
                            </button>
                        ) : (
                            <button
                                onClick={handleSubmit}
                                disabled={loading}
                                className="px-8 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-cyan-600 text-white font-bold hover:shadow-xl hover:scale-105 transition w-full md:w-auto flex items-center justify-center gap-2 disabled:opacity-70 disabled:scale-100"
                            >
                                {loading ? 'Memproses...' : 'Kirim Pendaftaran ✅'}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
