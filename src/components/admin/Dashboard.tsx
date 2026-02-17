"use client";
import React, { useEffect, useState } from 'react';
import type { User } from 'firebase/auth';
import { logout } from '@/lib/firebase/auth';
import { ambilSemuaPendaftar, PendaftarData, updatePendaftar } from '@/lib/firebase/pendaftar';
import * as XLSX from 'xlsx';
import Sidebar from './Sidebar';
import { motion, AnimatePresence } from 'framer-motion';

interface DashboardProps {
    user: User;
}

export default function Dashboard({ user }: DashboardProps) {
    const [data, setData] = useState<PendaftarData[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<'Semua' | 'MTs' | 'MA'>('Semua');
    const [selectedStudent, setSelectedStudent] = useState<PendaftarData | null>(null);

    const fetchData = async () => {
        setLoading(true);
        const result = await ambilSemuaPendaftar();
        setData(result as unknown as PendaftarData[]);
        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleExport = () => {
        const worksheet = XLSX.utils.json_to_sheet(filteredData.map((item, index) => ({
            'No': index + 1,
            'Nama Lengkap': item.nama_lengkap || '-',
            'Program': item.tingkat_pendidikan || '-',
            'NISN': item.nisn || '-',
            'Tempat Lahir': item.tempat_lahir || '-',
            'Tanggal Lahir': item.tanggal_lahir || '-',
            'Jenis Kelamin': item.jenis_kelamin || '-',
            'Anak Ke-': item.anak_ke || '-',
            'Asal Sekolah': item.asal_sekolah || '-',
            'Alamat Asal Sekolah': item.alamat_sekolah_asal || '-',
            'Kelas Asal Sekolah': item.kelas_sekolah_asal || '-',
            'Nomor KK': item.nomor_kk || '-',
            'Nama Ayah': item.nama_ayah || '-',
            'NIK Ayah': item.nik_ayah || '-',
            'Pendidikan Ayah': item.pendidikan_ayah || '-',
            'Pekerjaan Ayah': item.pekerjaan_ayah || '-',
            'No HP Ayah': item.nomor_wa_ayah || '-',
            'Nama Ibu': item.nama_ibu || '-',
            'NIK Ibu': item.nik_ibu || '-',
            'Pendidikan Ibu': item.pendidikan_ibu || '-',
            'Pekerjaan Ibu': item.pekerjaan_ibu || '-',
            'No HP Ibu': item.nomor_wa_ibu || '-',
            'Alamat Lengkap': item.alamat_lengkap || '-',
            'Kecamatan': item.kecamatan || '-',
            'Kabupaten': item.kabupaten || '-',
            'Provinsi': item.provinsi || '-',
            'Tanggal Mendaftar': item.tanggal_daftar?.seconds ? new Date(item.tanggal_daftar.seconds * 1000).toLocaleDateString("id-ID") : '-'
        })));

        // Auto-width columns
        const wscols = Object.keys(worksheet).filter(key => key[0] !== '!').map(() => ({ wch: 20 }));
        worksheet['!cols'] = wscols;

        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Data Pendaftar");
        XLSX.writeFile(workbook, "Data_PPDB_Al_Khoir_Lengkap.xlsx");
    };

    const handleStatusChange = async (id: string, newStatus: string) => {
        const statusTyped = newStatus as PendaftarData['status_pendaftaran'];
        setData((prev) =>
            prev.map((item) => (item.id === id ? { ...item, status_pendaftaran: statusTyped } : item))
        );

        const res = await updatePendaftar(id, { status_pendaftaran: statusTyped });
        if (!res.success) {
            alert('Gagal mengupdate status');
            fetchData();
        }
    };

    const filteredData = filter === 'Semua'
        ? data
        : data.filter((item) => item.tingkat_pendidikan === filter);

    const statusOptions = ['Menunggu Verifikasi', 'Jadwal Tes', 'Diterima', 'Ditolak'];

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Diterima': return 'bg-green-100 text-green-800';
            case 'Ditolak': return 'bg-red-100 text-red-800';
            case 'Jadwal Tes': return 'bg-blue-100 text-blue-800';
            default: return 'bg-yellow-100 text-yellow-800';
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
            {/* Sidebar */}
            <Sidebar user={user} />

            {/* Main Content */}
            <main className="flex-1 p-6 md:p-10 overflow-x-auto">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <h2 className="text-3xl font-bold text-emerald-900">Data Pendaftar</h2>

                    <div className="flex bg-white p-1 rounded-lg shadow-sm border border-slate-200">
                        {(['Semua', 'MTs', 'MA'] as const).map((f) => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={`px-6 py-2 rounded-md text-sm font-medium transition ${filter === f
                                    ? 'bg-emerald-100 text-emerald-700 shadow-sm'
                                    : 'text-slate-500 hover:text-emerald-600 hover:bg-slate-50'
                                    }`}
                            >
                                {f}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex justify-end mb-4">
                    <button
                        onClick={handleExport}
                        className="flex items-center gap-2 px-4 py-2 bg-white text-emerald-600 border border-emerald-500 rounded-lg hover:bg-emerald-50 transition font-medium text-sm shadow-sm"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                        Export to Excel
                    </button>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                    {loading ? (
                        <div className="p-20 text-center text-slate-400">Loading data...</div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-sm uppercase tracking-wider">
                                        <th className="p-4 font-semibold w-12 text-center">No</th>
                                        <th className="p-4 font-semibold">Nama Siswa</th>
                                        <th className="p-4 font-semibold">Jenjang</th>
                                        <th className="p-4 font-semibold">Kontak</th>
                                        <th className="p-4 font-semibold">Tanggal Daftar</th>
                                        <th className="p-4 font-semibold">Status</th>
                                        <th className="p-4 font-semibold text-center">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {filteredData.length === 0 ? (
                                        <tr>
                                            <td colSpan={7} className="p-10 text-center text-slate-400">Belum ada data pendaftar.</td>
                                        </tr>
                                    ) : (
                                        filteredData.map((item, index) => (
                                            <tr key={item.id} className="hover:bg-slate-50/50 transition">
                                                <td className="p-4 text-center text-slate-400">{index + 1}</td>
                                                <td className="p-4 font-medium text-slate-800">
                                                    <div>{item.nama_lengkap}</div>
                                                    <div className="text-xs text-slate-400">{item.asal_sekolah}</div>
                                                </td>
                                                <td className="p-4">
                                                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${item.tingkat_pendidikan === 'MTs' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-cyan-50 text-cyan-700 border border-cyan-100'}`}>
                                                        {item.tingkat_pendidikan}
                                                    </span>
                                                </td>
                                                <td className="p-4 text-sm font-mono text-slate-600">
                                                    {item.nomor_wa_aktif}
                                                </td>
                                                <td className="p-4 text-slate-500 text-sm">
                                                    {item.tanggal_daftar?.seconds
                                                        ? new Date(item.tanggal_daftar.seconds * 1000).toLocaleDateString("id-ID")
                                                        : '-'}
                                                </td>
                                                <td className="p-4">
                                                    <div className="relative">
                                                        <select
                                                            value={item.status_pendaftaran || 'Menunggu Verifikasi'}
                                                            onChange={(e) => handleStatusChange(item.id!, e.target.value)}
                                                            className={`appearance-none w-full pl-3 pr-8 py-2 rounded-lg text-xs font-bold border-0 cursor-pointer focus:ring-2 focus:ring-emerald-200 outline-none transition ${getStatusColor(item.status_pendaftaran || 'Menunggu Verifikasi')}`}
                                                        >
                                                            {statusOptions.map((opt) => (
                                                                <option key={opt} value={opt} className="bg-white text-slate-800 py-1">
                                                                    {opt}
                                                                </option>
                                                            ))}
                                                        </select>
                                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-current opacity-60">
                                                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="p-4 text-center">
                                                    <button
                                                        onClick={() => setSelectedStudent(item)}
                                                        className="px-3 py-1.5 text-xs font-bold text-white bg-slate-800 rounded hover:bg-slate-700 transition"
                                                    >
                                                        Detail
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </main>

            {/* Student Detail Modal */}
            <AnimatePresence>
                {selectedStudent && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedStudent(null)}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden"
                        >
                            {/* Modal Header */}
                            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                                <div>
                                    <h3 className="text-2xl font-bold text-emerald-900">{selectedStudent.nama_lengkap}</h3>
                                    <span className={`px-2 py-0.5 rounded text-xs font-bold ${selectedStudent.tingkat_pendidikan === 'MTs' ? 'bg-emerald-100 text-emerald-700' : 'bg-cyan-100 text-cyan-700'}`}>
                                        {selectedStudent.tingkat_pendidikan}
                                    </span>
                                    <span className="ml-2 text-slate-500 text-sm">
                                        Daftar: {selectedStudent.tanggal_daftar?.seconds ? new Date(selectedStudent.tanggal_daftar.seconds * 1000).toLocaleDateString("id-ID") : '-'}
                                    </span>
                                </div>
                                <button
                                    onClick={() => setSelectedStudent(null)}
                                    className="p-2 hover:bg-slate-200 rounded-full transition"
                                >
                                    <svg className="w-6 h-6 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                                </button>
                            </div>

                            {/* Modal Content - Scrollable */}
                            <div className="p-6 overflow-y-auto custom-scrollbar">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {/* Kolom Kiri */}
                                    <div className="space-y-8">
                                        <Section title="👤 Data Pribadi">
                                            <Item label="NISN" value={selectedStudent.nisn} />
                                            <Item label="Tempat, Tanggal Lahir" value={`${selectedStudent.tempat_lahir || '-'}, ${selectedStudent.tanggal_lahir || '-'}`} />
                                            <Item label="Jenis Kelamin" value={selectedStudent.jenis_kelamin} />
                                            <Item label="Anak Ke-" value={selectedStudent.anak_ke} />
                                        </Section>

                                        <Section title="🏫 Sekolah Asal">
                                            <Item label="Nama Sekolah" value={selectedStudent.asal_sekolah} />
                                            <Item label="Alamat Sekolah" value={selectedStudent.alamat_sekolah_asal} />
                                            <Item label="Kelas Terakhir" value={selectedStudent.kelas_sekolah_asal} />
                                        </Section>

                                        <Section title="🏠 Alamat Rumah">
                                            <Item label="Alamat Lengkap" value={selectedStudent.alamat_lengkap} />
                                            <div className="grid grid-cols-2 gap-2">
                                                <Item label="Kecamatan" value={selectedStudent.kecamatan} />
                                                <Item label="Kabupaten" value={selectedStudent.kabupaten} />
                                                <Item label="Provinsi" value={selectedStudent.provinsi} />
                                            </div>
                                        </Section>
                                    </div>

                                    {/* Kolom Kanan */}
                                    <div className="space-y-8">
                                        <Section title="👨 Data Ayah">
                                            <Item label="Nama Ayah" value={selectedStudent.nama_ayah} />
                                            <Item label="NIK" value={selectedStudent.nik_ayah} />
                                            <Item label="Pendidikan" value={selectedStudent.pendidikan_ayah} />
                                            <Item label="Pekerjaan" value={selectedStudent.pekerjaan_ayah} />
                                            <Item label="No. WA" value={selectedStudent.nomor_wa_ayah} />
                                        </Section>

                                        <Section title="🧕 Data Ibu">
                                            <Item label="Nama Ibu" value={selectedStudent.nama_ibu} />
                                            <Item label="NIK" value={selectedStudent.nik_ibu} />
                                            <Item label="Pendidikan" value={selectedStudent.pendidikan_ibu} />
                                            <Item label="Pekerjaan" value={selectedStudent.pekerjaan_ibu} />
                                            <Item label="No. WA" value={selectedStudent.nomor_wa_ibu} />
                                        </Section>

                                        <Section title="📄 Lainnya">
                                            <Item label="Nomor KK" value={selectedStudent.nomor_kk} />
                                            <Item label="Nama Wali (Legacy)" value={selectedStudent.nama_orangtua} />
                                            <Item label="No WA (Legacy)" value={selectedStudent.nomor_wa_aktif} />
                                        </Section>
                                    </div>
                                </div>
                            </div>

                            {/* Modal Footer */}
                            <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end">
                                <button
                                    onClick={() => setSelectedStudent(null)}
                                    className="px-6 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-900 transition font-medium"
                                >
                                    Tutup
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

function Section({ title, children }: { title: string, children: React.ReactNode }) {
    return (
        <div className="space-y-3">
            <h4 className="font-bold text-emerald-800 border-b border-emerald-100 pb-2 flex items-center gap-2">
                {title}
            </h4>
            <div className="space-y-2">
                {children}
            </div>
        </div>
    );
}

function Item({ label, value }: { label: string, value?: string | number }) {
    return (
        <div className="flex flex-col sm:flex-row sm:justify-between border-b border-slate-50 pb-1 last:border-0">
            <span className="text-sm text-slate-500">{label}</span>
            <span className="text-sm font-medium text-slate-800 text-right">{value || '-'}</span>
        </div>
    );
}
