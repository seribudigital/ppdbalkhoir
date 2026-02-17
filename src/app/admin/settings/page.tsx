"use client";
import React, { useEffect, useState } from 'react';
import { subscribeToAuthChanges } from '@/lib/firebase/auth';
import type { User } from 'firebase/auth';
import LoginForm from '@/components/admin/LoginForm';
import Sidebar from '@/components/admin/Sidebar';
import { db } from '@/lib/firebase/config';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';

export default function SettingsPage() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    const [schedule, setSchedule] = useState({
        gelombang1: {
            pendaftaran: '',
            tes: '',
            pengumuman: '',
            daftar_ulang: ''
        },
        gelombang2: {
            pendaftaran: '',
            tes: '',
            pengumuman: '',
            daftar_ulang: ''
        }
    });

    useEffect(() => {
        const unsubscribe = subscribeToAuthChanges((currentUser) => {
            setUser(currentUser);
            if (!currentUser) setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (user) {
            fetchSettings();
        }
    }, [user]);

    const fetchSettings = async () => {
        try {
            const docRef = doc(db, "settings", "jadwal");
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const data = docSnap.data();
                // Handle potential missing data for new structure
                setSchedule({
                    gelombang1: {
                        pendaftaran: data.gelombang1?.pendaftaran || data.tanggal_pendaftaran || '',
                        tes: data.gelombang1?.tes || data.tanggal_tes || '',
                        pengumuman: data.gelombang1?.pengumuman || data.tanggal_pengumuman || '',
                        daftar_ulang: data.gelombang1?.daftar_ulang || data.tanggal_daftar_ulang || ''
                    },
                    gelombang2: {
                        pendaftaran: data.gelombang2?.pendaftaran || '',
                        tes: data.gelombang2?.tes || '',
                        pengumuman: data.gelombang2?.pengumuman || '',
                        daftar_ulang: data.gelombang2?.daftar_ulang || ''
                    }
                });
            }
        } catch (error) {
            console.error("Error fetching settings:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (wave: 'gelombang1' | 'gelombang2', field: string, value: string) => {
        setSchedule(prev => ({
            ...prev,
            [wave]: {
                ...prev[wave],
                [field]: value
            }
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setMessage(null);

        try {
            await setDoc(doc(db, "settings", "jadwal"), {
                ...schedule,
                updatedAt: serverTimestamp()
            });
            setMessage({ type: 'success', text: 'Jadwal berhasil disimpan!' });
        } catch (error) {
            console.error("Error saving settings:", error);
            setMessage({ type: 'error', text: 'Gagal menyimpan jadwal.' });
        } finally {
            setSaving(false);
        }
    };

    if (loading && !user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-100">
                <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!user && !loading) {
        return <LoginForm />;
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-100">
                <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
            <Sidebar user={user} />

            <main className="flex-1 p-6 md:p-10 overflow-x-auto">
                <div className="flex items-center gap-4 mb-8">
                    <h2 className="text-3xl font-bold text-emerald-900">Pengaturan</h2>
                </div>

                <div className="max-w-4xl">
                    <h3 className="text-xl font-bold text-slate-800 mb-6 pb-4 border-b border-slate-100">Atur Jadwal Pendaftaran</h3>

                    {message && (
                        <div className={`p-4 rounded-lg mb-6 ${message.type === 'success' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
                            {message.text}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-8">

                        <div className="grid md:grid-cols-2 gap-8">
                            {/* Gelombang 1 */}
                            <div className="bg-white rounded-2xl shadow-sm border border-emerald-200 p-6 relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500"></div>
                                <h4 className="text-lg font-bold text-emerald-800 mb-4 flex items-center gap-2">
                                    <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-xs">1</span>
                                    Gelombang 1
                                </h4>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Tanggal Pendaftaran</label>
                                        <input
                                            type="text"
                                            value={schedule.gelombang1.pendaftaran}
                                            onChange={(e) => handleChange('gelombang1', 'pendaftaran', e.target.value)}
                                            placeholder="Contoh: 01 Okt - 30 Jan"
                                            className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Tanggal Tes Seleksi</label>
                                        <input
                                            type="text"
                                            value={schedule.gelombang1.tes}
                                            onChange={(e) => handleChange('gelombang1', 'tes', e.target.value)}
                                            placeholder="Contoh: 31 Jan 2026"
                                            className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Tanggal Pengumuman</label>
                                        <input
                                            type="text"
                                            value={schedule.gelombang1.pengumuman}
                                            onChange={(e) => handleChange('gelombang1', 'pengumuman', e.target.value)}
                                            placeholder="Contoh: 07 Feb 2026"
                                            className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Tanggal Daftar Ulang</label>
                                        <input
                                            type="text"
                                            value={schedule.gelombang1.daftar_ulang}
                                            onChange={(e) => handleChange('gelombang1', 'daftar_ulang', e.target.value)}
                                            placeholder="Contoh: 14 Feb 2026"
                                            className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition text-sm"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Gelombang 2 */}
                            <div className="bg-white rounded-2xl shadow-sm border border-cyan-200 p-6 relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-full h-1 bg-cyan-500"></div>
                                <h4 className="text-lg font-bold text-cyan-800 mb-4 flex items-center gap-2">
                                    <span className="w-6 h-6 rounded-full bg-cyan-100 text-cyan-600 flex items-center justify-center text-xs">2</span>
                                    Gelombang 2
                                </h4>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Tanggal Pendaftaran</label>
                                        <input
                                            type="text"
                                            value={schedule.gelombang2.pendaftaran}
                                            onChange={(e) => handleChange('gelombang2', 'pendaftaran', e.target.value)}
                                            placeholder="Contoh: 01 Feb - 30 Mar"
                                            className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Tanggal Tes Seleksi</label>
                                        <input
                                            type="text"
                                            value={schedule.gelombang2.tes}
                                            onChange={(e) => handleChange('gelombang2', 'tes', e.target.value)}
                                            placeholder="Contoh: 05 Apr 2026"
                                            className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Tanggal Pengumuman</label>
                                        <input
                                            type="text"
                                            value={schedule.gelombang2.pengumuman}
                                            onChange={(e) => handleChange('gelombang2', 'pengumuman', e.target.value)}
                                            placeholder="Contoh: 12 Apr 2026"
                                            className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Tanggal Daftar Ulang</label>
                                        <input
                                            type="text"
                                            value={schedule.gelombang2.daftar_ulang}
                                            onChange={(e) => handleChange('gelombang2', 'daftar_ulang', e.target.value)}
                                            placeholder="Contoh: 19 Apr 2026"
                                            className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition text-sm"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="pt-4 flex justify-end">
                            <button
                                type="submit"
                                disabled={saving}
                                className="w-full md:w-auto px-8 py-3 bg-emerald-600 text-white font-bold rounded-xl shadow-lg shadow-emerald-200 hover:bg-emerald-700 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {saving ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        Menyimpan...
                                    </>
                                ) : (
                                    'Simpan Jadwal'
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
}
