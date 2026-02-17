"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Profil', href: '#latar-belakang' },
        { name: 'Kurikulum', href: '#kurikulum' },
        { name: 'Biaya', href: '#biaya' },
        { name: 'Daftar', href: '#daftar' },
        { name: 'Kontak', href: '#kontak' },
    ];

    const handleScrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setIsMobileMenuOpen(false);
        }
    };

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                    ? 'bg-white/90 backdrop-blur-md shadow-md py-3'
                    : 'bg-transparent py-5'
                }`}
        >
            <div className="container mx-auto px-6 flex items-center justify-between">
                {/* Logo / Brand */}
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="relative w-10 h-10 overflow-hidden rounded-full border-2 border-emerald-100 group-hover:border-emerald-400 transition-colors">
                        <img
                            src="https://hujtpnndfhnxddglztdn.supabase.co/storage/v1/object/public/seribudigital/mts.webp"
                            alt="Logo Al-Khoir"
                            className="object-cover w-full h-full"
                        />
                    </div>
                    <div>
                        <h1 className={`font-bold text-lg leading-tight ${isScrolled ? 'text-emerald-900' : 'text-white'}`}>
                            Al-Khoir
                        </h1>
                        <p className={`text-xs ${isScrolled ? 'text-emerald-600' : 'text-emerald-100'}`}>Islamic School</p>
                    </div>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            onClick={(e) => handleScrollToSection(e, link.href)}
                            className={`font-medium text-sm tracking-wide transition-colors relative group py-1 ${isScrolled ? 'text-slate-600 hover:text-emerald-600' : 'text-emerald-50 hover:text-white'
                                }`}
                        >
                            {link.name}
                            <span className={`absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${isScrolled ? 'bg-emerald-500' : 'bg-white'
                                }`}></span>
                        </a>
                    ))}
                    <a
                        href="#daftar"
                        onClick={(e) => handleScrollToSection(e, '#daftar')}
                        className={`px-5 py-2 rounded-full font-bold text-sm transition-all transform hover:scale-105 ${isScrolled
                                ? 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-emerald-200 shadow-lg'
                                : 'bg-white text-emerald-800 hover:bg-emerald-50 shadow-lg'
                            }`}
                    >
                        Daftar Sekarang
                    </a>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden p-2 rounded-lg"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label="Toggle Menu"
                >
                    <div className="w-6 h-5 relative flex flex-col justify-between">
                        <span className={`w-full h-0.5 rounded-full transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2 bg-emerald-600' : (isScrolled ? 'bg-emerald-900' : 'bg-white')}`}></span>
                        <span className={`w-full h-0.5 rounded-full transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0 bg-emerald-600' : (isScrolled ? 'bg-emerald-900' : 'bg-white')}`}></span>
                        <span className={`w-full h-0.5 rounded-full transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2.5 bg-emerald-600' : (isScrolled ? 'bg-emerald-900' : 'bg-white')}`}></span>
                    </div>
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <div
                className={`fixed inset-0 bg-white/95 backdrop-blur-xl z-40 transform transition-transform duration-300 ease-in-out md:hidden flex flex-col items-center justify-center space-y-8 ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
                style={{ top: '0', height: '100vh' }}
            >
                <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="absolute top-6 right-6 p-2 text-slate-500 hover:text-emerald-600"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {navLinks.map((link) => (
                    <a
                        key={link.name}
                        href={link.href}
                        onClick={(e) => handleScrollToSection(e, link.href)}
                        className="text-2xl font-bold text-slate-700 hover:text-emerald-600 transition-colors"
                    >
                        {link.name}
                    </a>
                ))}

                <a
                    href="#daftar"
                    onClick={(e) => handleScrollToSection(e, '#daftar')}
                    className="px-8 py-3 rounded-full bg-emerald-600 text-white font-bold text-lg shadow-xl shadow-emerald-200 hover:bg-emerald-700 active:scale-95 transition-all"
                >
                    Daftar Sekarang
                </a>
            </div>
        </nav>
    );
}
