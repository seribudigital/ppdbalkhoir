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
        tanggal_pendaftaran: '',
        tanggal_tes: '',
        tanggal_pengumuman: '',
        tanggal_daftar_ulang: ''
    });

    useEffect(() => {
        const unsubscribe = subscribeToAuthChanges((currentUser) => {
            setUser(currentUser);
            // Don't set loading false here immediately, wait for data fetch if needed
            // But for auth check it's enough
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
                setSchedule({
                    tanggal_pendaftaran: data.tanggal_pendaftaran || '',
                    tanggal_tes: data.tanggal_tes || '',
                    tanggal_pengumuman: data.tanggal_pengumuman || '',
                    tanggal_daftar_ulang: data.tanggal_daftar_ulang || ''
                });
            }
        } catch (error) {
            console.error("Error fetching settings:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSchedule({
            ...schedule,
            [e.target.name]: e.target.value
        });
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

                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 max-w-2xl">
                    <h3 className="text-xl font-bold text-slate-800 mb-6 pb-4 border-b border-slate-100">Atur Jadwal Pendaftaran</h3>

                    {message && (
                        <div className={`p-4 rounded-lg mb-6 ${message.type === 'success' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
                            {message.text}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Tanggal Pendaftaran</label>
                            <input
                                type="text"
                                name="tanggal_pendaftaran"
                                value={schedule.tanggal_pendaftaran}
                                onChange={handleChange}
                                placeholder="Contoh: 01 Okt 2025 - 30 Jan 2026"
                                className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Tanggal Tes Seleksi</label>
                            <input
                                type="text"
                                name="tanggal_tes"
                                value={schedule.tanggal_tes}
                                onChange={handleChange}
                                placeholder="Contoh: 31 Jan 2026"
                                className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Tanggal Pengumuman</label>
                            <input
                                type="text"
                                name="tanggal_pengumuman"
                                value={schedule.tanggal_pengumuman}
                                onChange={handleChange}
                                placeholder="Contoh: 07 Feb 2026"
                                className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Tanggal Daftar Ulang</label>
                            <input
                                type="text"
                                name="tanggal_daftar_ulang"
                                value={schedule.tanggal_daftar_ulang}
                                onChange={handleChange}
                                placeholder="Contoh: 14 Feb 2026"
                                className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
                            />
                        </div>

                        <div className="pt-4">
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
