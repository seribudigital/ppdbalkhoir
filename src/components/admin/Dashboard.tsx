"use client";
import React, { useEffect, useState } from 'react';
import type { User } from 'firebase/auth';
import { logout } from '@/lib/firebase/auth';
import { ambilSemuaPendaftar, PendaftarData, updatePendaftar } from '@/lib/firebase/pendaftar';
import * as XLSX from 'xlsx';

interface DashboardProps {
    user: User;
}

export default function Dashboard({ user }: DashboardProps) {
    const [data, setData] = useState<PendaftarData[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<'Semua' | 'MTs' | 'MA'>('Semua');

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
            No: index + 1,
            'Nama Lengkap': item.nama_lengkap,
            'Asal Sekolah': item.asal_sekolah,
            'Jenjang': item.tingkat_pendidikan,
            'Nama Orang Tua': item.nama_orangtua,
            'WhatsApp': item.nomor_wa_aktif,
            'Status': item.status_pendaftaran || 'Menunggu Verifikasi',
            'Tanggal Daftar': item.tanggal_daftar?.seconds ? new Date(item.tanggal_daftar.seconds * 1000).toLocaleDateString("id-ID") : '-'
        })));
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Data Pendaftar");
        XLSX.writeFile(workbook, "Data_PPDB_Al_Khoir.xlsx");
    };

    const handleStatusChange = async (id: string, newStatus: string) => {
        const statusTyped = newStatus as PendaftarData['status_pendaftaran'];
        // Optimistic update
        setData((prev) =>
            prev.map((item) => (item.id === id ? { ...item, status_pendaftaran: statusTyped } : item))
        );

        const res = await updatePendaftar(id, { status_pendaftaran: statusTyped });
        if (!res.success) {
            // Revert if failed
            alert('Gagal mengupdate status');
            fetchData();
        }
    };

    const handleLogout = async () => {
        await logout();
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
            <aside className="w-full md:w-64 bg-emerald-900 text-white p-6 flex flex-col justify-between">
                <div>
                    <div className="flex items-center gap-3 mb-10">
                        <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-2xl">⚡</div>
                        <div>
                            <h1 className="font-bold text-lg leading-tight">Admin PPDB</h1>
                            <p className="text-emerald-400 text-xs">Al-Khoir Islamic School</p>
                        </div>
                    </div>

                    <nav className="space-y-2">
                        <button className="w-full text-left px-4 py-3 bg-emerald-800/50 rounded-lg text-emerald-50 font-medium border-l-4 border-cyan-400">
                            Data Pendaftar
                        </button>
                        <button className="w-full text-left px-4 py-3 hover:bg-emerald-800/30 rounded-lg text-emerald-300 font-medium transition">
                            Pengaturan
                        </button>
                    </nav>
                </div>

                <div>
                    <div className="mb-4 text-xs text-emerald-500">
                        Login sebagai: <br />  <span className="text-white font-medium truncate block">{user.email}</span>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="w-full py-2 bg-red-600/20 text-red-300 hover:bg-red-600 hover:text-white rounded-lg transition text-sm font-semibold flex items-center justify-center gap-2"
                    >
                        Keluar
                    </button>
                </div>
            </aside>

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
                                        <th className="p-4 font-semibold">Asal Sekolah</th>
                                        <th className="p-4 font-semibold">Jenjang</th>
                                        <th className="p-4 font-semibold">Wali & Kontak</th>
                                        <th className="p-4 font-semibold">Tanggal Daftar</th>
                                        <th className="p-4 font-semibold">Status</th>
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
                                                <td className="p-4 font-medium text-slate-800">{item.nama_lengkap}</td>
                                                <td className="p-4 text-slate-600">{item.asal_sekolah}</td>
                                                <td className="p-4">
                                                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${item.tingkat_pendidikan === 'MTs' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-cyan-50 text-cyan-700 border border-cyan-100'}`}>
                                                        {item.tingkat_pendidikan}
                                                    </span>
                                                </td>
                                                <td className="p-4 text-sm">
                                                    <div className="text-slate-800 font-medium">{item.nama_orangtua}</div>
                                                    <div className="text-slate-500">{item.nomor_wa_aktif}</div>
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
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
