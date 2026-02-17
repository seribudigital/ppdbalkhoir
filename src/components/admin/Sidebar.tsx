"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { User } from 'firebase/auth';
import { logout } from '@/lib/firebase/auth';

interface SidebarProps {
    user: User | null;
}

export default function Sidebar({ user }: SidebarProps) {
    const pathname = usePathname();

    const handleLogout = async () => {
        await logout();
        window.location.href = '/admin'; // Redirect after logout
    };

    const isActive = (path: string) => pathname === path;

    return (
        <aside className="w-full md:w-64 bg-emerald-900 text-white p-6 flex flex-col justify-between shrink-0">
            <div>
                <div className="flex items-center gap-3 mb-10">
                    <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-2xl">⚡</div>
                    <div>
                        <h1 className="font-bold text-lg leading-tight">Admin PPDB</h1>
                        <p className="text-emerald-400 text-xs text-wrap">Al-Khoir Islamic School Bin Baz 5</p>
                    </div>
                </div>

                <nav className="space-y-2">
                    <Link
                        href="/"
                        className="flex items-center gap-3 w-full text-left px-4 py-3 hover:bg-emerald-800/30 rounded-lg text-emerald-300 font-medium transition"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        Ke Beranda
                    </Link>

                    <Link
                        href="/admin"
                        className={`w-full text-left px-4 py-3 rounded-lg font-medium transition block ${isActive('/admin')
                                ? 'bg-emerald-800/50 text-emerald-50 border-l-4 border-cyan-400'
                                : 'hover:bg-emerald-800/30 text-emerald-300'
                            }`}
                    >
                        Data Pendaftar
                    </Link>

                    <Link
                        href="/admin/settings"
                        className={`w-full text-left px-4 py-3 rounded-lg font-medium transition block ${isActive('/admin/settings')
                                ? 'bg-emerald-800/50 text-emerald-50 border-l-4 border-cyan-400'
                                : 'hover:bg-emerald-800/30 text-emerald-300'
                            }`}
                    >
                        Pengaturan
                    </Link>
                </nav>
            </div>

            <div>
                {user && (
                    <div className="mb-4 text-xs text-emerald-500">
                        Login sebagai: <br />  <span className="text-white font-medium truncate block">{user.email}</span>
                    </div>
                )}
                <button
                    onClick={handleLogout}
                    className="w-full py-2 bg-red-600/20 text-red-300 hover:bg-red-600 hover:text-white rounded-lg transition text-sm font-semibold flex items-center justify-center gap-2"
                >
                    Keluar
                </button>
            </div>
        </aside>
    );
}
