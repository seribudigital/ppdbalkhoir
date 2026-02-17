"use client";
import React from 'react';
import Image from 'next/image';

export default function HeroSection() {


    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden text-white">
            {/* Background Image using next/image */}
            <div className="absolute inset-0">
                <Image
                    src="https://hujtpnndfhnxddglztdn.supabase.co/storage/v1/object/public/seribudigital/gedung.jpeg"
                    alt="Gedung Sekolah Al-Khoir"
                    fill
                    priority
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wAARCAADAAQDAREAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAwAE/8QAIhAAAQMDBAMAAAAAAAAAAAAAAQACAwQRBRIhMUFxEyJh/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/Ao91gq//2Q=="
                    className="object-cover object-center"
                    quality={75}
                    sizes="100vw"
                />
            </div>

            {/* Overlay for Readability */}
            <div className="absolute inset-0 bg-emerald-900/80"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-transparent to-emerald-950/50"></div>

            <div className="container mx-auto px-6 text-center z-30 pt-20">
                <div className="animate-fade-in-up">
                    <div className="inline-block mb-4 px-6 py-2 rounded-full bg-emerald-800/30 border border-emerald-400/30 backdrop-blur-sm">
                        <span className="text-emerald-100 tracking-wider text-sm font-semibold uppercase">Penerimaan Peserta Didik Baru</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-extrabold mb-6 drop-shadow-lg leading-tight">
                        SPMB 2026/2027 <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 to-teal-100 block md:inline">
                            Al-Khoir Islamic School Bin Baz 5
                        </span>
                    </h1>

                    <p className="text-xl md:text-2xl md:max-w-4xl mx-auto mb-10 text-emerald-50 leading-relaxed font-light">
                        Membangun Generasi Qur'ani yang Berakhlak Mulia dan Berprestasi. <br />
                        <span className="block mt-2 text-lg font-normal opacity-90">Tingkat MTs & MA (Islamic Center Bin Baz 5 Cab. Cikande)</span>
                    </p>

                    <a
                        href="#form-section"
                        className="px-10 py-5 bg-cyan-600 text-white font-bold text-lg rounded-full shadow-[0_10px_20px_rgba(8,145,178,0.3)] hover:shadow-[0_15px_30px_rgba(8,145,178,0.4)] hover:bg-cyan-500 transition-all duration-300 ring-4 ring-cyan-400/20 transform hover:scale-105 active:scale-95 inline-block"
                    >
                        Daftar Sekarang
                    </a>
                </div>
            </div>

            {/* Decorative Wave */}
            <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none rotate-180 z-20">
                <svg className="relative block w-[calc(100%+1.3px)] h-[80px] md:h-[150px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-slate-50"></path>
                </svg>
            </div>
        </section>
    );
}
