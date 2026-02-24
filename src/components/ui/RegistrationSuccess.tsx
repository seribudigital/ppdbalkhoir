"use client";

import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Download, Printer } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface RegistrationSuccessProps {
    namaLengkap: string;
    jenjang: string;
    nisn: string;
    registrationId: string;
}

export default function RegistrationSuccess({
    namaLengkap,
    jenjang,
    nisn,
    registrationId
}: RegistrationSuccessProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [isDownloading, setIsDownloading] = useState(false);

    const handleDownloadPDF = async () => {
        if (!cardRef.current) return;
        setIsDownloading(true);

        try {
            // Tunda sebentar untuk memastikan font ter-render dengan baik
            await new Promise(resolve => setTimeout(resolve, 500));

            const canvas = await html2canvas(cardRef.current, {
                scale: 2, // Kualitas resolusi tinggi
                useCORS: true, // Izinkan gambar eksternal jika ada
                backgroundColor: '#ffffff' // Kartu berbayang harus direkam dengan warna putih pekat solid
            });

            const imgData = canvas.toDataURL('image/png');

            // Atur ukuran PDF (A4 Portrait)
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'mm',
                format: 'a4'
            });

            const pdfWidth = pdf.internal.pageSize.getWidth();
            // Estimasi dimensi dari kanvas ke mm (proporsional)
            const imgProps = pdf.getImageProperties(imgData);
            const margin = 20; // 2 cm padding margin di dalam kertas
            const pdfImageWidth = pdfWidth - (margin * 2);
            const pdfImageHeight = (imgProps.height * pdfImageWidth) / imgProps.width;

            pdf.addImage(imgData, 'PNG', margin, margin, pdfImageWidth, pdfImageHeight);

            const fileName = `Kartu_PPDB_${namaLengkap.replace(/\s+/g, '_')}.pdf`;
            pdf.save(fileName);
        } catch (error) {
            console.error('Gagal membangkitkan dokumen PDF:', error);
            alert('Maaf, ada kesalahan saat membuat PDF. Silakan coba lagi.');
        } finally {
            setIsDownloading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-4 md:p-8 flex flex-col items-center">
            {/* Pesan Sukses Utama */}
            <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="text-center mb-8"
            >
                <div className="w-20 h-20 md:w-24 md:h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-white shadow-xl">
                    <CheckCircle2 className="w-10 h-10 md:w-14 md:h-14 text-green-500" />
                </div>
                <h2 className="text-3xl font-extrabold text-emerald-800 mb-2">Alhamdulillah!</h2>
                <h3 className="text-xl font-bold text-emerald-700">Pendaftaran Berhasil</h3>
                <p className="text-emerald-700/80 mt-2">
                    Simpan kartu tanda peserta di bawah ini sebagai bukti resmi pendaftaran Anda.
                </p>
            </motion.div>

            {/* Kartu Peserta - Dibungkus border dan shadow menarik (The Vibe Code) */}
            <div className="bg-white p-4 rounded-3xl shadow-2xl shadow-emerald-900/10 border border-emerald-50 mb-8 w-full max-w-[500px]">

                {/* Area Tangkapan Canvas (KARTU) */}
                <div
                    ref={cardRef}
                    className="relative bg-emerald-800 rounded-2xl overflow-hidden border-4 border-emerald-900 shadow-inner"
                    style={{ minHeight: '320px' }} // Pastikan proporsi kartu memadai
                >
                    {/* Ornamen Latar (Pola Geometrik / Garis Islami Halus) */}
                    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-yellow-300 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-emerald-600 rounded-full blur-3xl opacity-50" />
                    <div className="absolute -top-24 -right-24 w-64 h-64 bg-yellow-600 rounded-full blur-3xl opacity-30" />

                    {/* Header Kartu */}
                    <div className="relative bg-emerald-900/80 backdrop-blur-sm px-6 py-4 border-b border-emerald-700/50 flex flex-col items-center">
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-2 shadow-lg shadow-black/20 text-emerald-800 font-bold font-serif italic text-sm">
                            AK
                        </div>
                        <h4 className="text-lg font-black text-yellow-400 tracking-wider">KARTU PESERTA PPDB</h4>
                        <p className="text-sm font-semibold text-emerald-100 uppercase tracking-widest">Pondok Pesantren Al-Khoir</p>
                    </div>

                    {/* Konten Kartu */}
                    <div className="relative px-6 py-6 pb-8 flex flex-col space-y-4">
                        <div className="flex justify-between items-start">
                            <div className="space-y-4">
                                <div>
                                    <p className="text-xs text-emerald-300/80 uppercase tracking-wide font-semibold mb-1">Nama Lengkap</p>
                                    <p className="text-lg font-bold text-white leading-tight uppercase relative inline-block">
                                        {namaLengkap || 'Nama Tidak Dicantumkan'}
                                        <span className="absolute -bottom-1 left-0 w-1/2 h-0.5 bg-yellow-500/50"></span>
                                    </p>
                                </div>
                                <div className="grid grid-cols-2 gap-6">
                                    <div>
                                        <p className="text-xs text-emerald-300/80 uppercase tracking-wide font-semibold mb-1">Jenjang</p>
                                        <p className="font-bold text-white bg-emerald-700/50 px-3 py-1 rounded-lg border border-emerald-600/50 inline-block shadow-sm">
                                            {jenjang || '-'}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-emerald-300/80 uppercase tracking-wide font-semibold mb-1">NISN</p>
                                        <p className="font-bold text-yellow-300 tracking-widest">{nisn || '-'}</p>
                                    </div>
                                </div>
                            </div>

                            {/* QR Code Container */}
                            <div className="bg-white p-2.5 rounded-xl shadow-lg border-2 border-yellow-400/80 flex-shrink-0 mt-2 transform rotate-1">
                                <QRCodeSVG
                                    value={registrationId}
                                    size={85}
                                    level="H"
                                    includeMargin={false}
                                    fgColor="#064e3b" // emerald-900
                                />
                                <p className="text-[10px] text-center font-bold text-emerald-800 mt-1 uppercase">Scan Me</p>
                            </div>
                        </div>

                        {/* Area ID Bawah */}
                        <div className="pt-4 border-t border-emerald-700/50 flex justify-between items-end">
                            <div>
                                <p className="text-[10px] text-emerald-400">ID Registrasi Server</p>
                                <p className="text-xs font-mono text-emerald-200">{registrationId}</p>
                            </div>
                            <div className="text-[10px] text-emerald-400 text-right">
                                Berlaku 2026/2027
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tombol Aksi */}
            <div className="flex flex-col md:flex-row gap-4 w-full max-w-[400px]">
                <button
                    onClick={handleDownloadPDF}
                    disabled={isDownloading}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white font-bold rounded-xl shadow-xl shadow-emerald-200 hover:scale-105 transition-all disabled:opacity-70 disabled:scale-100 disabled:cursor-wait"
                >
                    {isDownloading ? (
                        <>Sedang Menyiapkan... <Printer className="w-5 h-5 animate-pulse" /></>
                    ) : (
                        <>Unduh Kartu (PDF) <Download className="w-5 h-5" /></>
                    )}
                </button>
                <button
                    onClick={() => window.location.reload()}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-white text-emerald-800 font-bold border-2 border-emerald-200 rounded-xl hover:bg-emerald-50 transition-all"
                >
                    Kembali ke Beranda
                </button>
            </div>
        </div>
    );
}
