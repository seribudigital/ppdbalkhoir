"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function GallerySection() {
    return (
        <section className="py-24 px-6 bg-white overflow-hidden">
            <div className="container mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-emerald-800 mb-4">Galeri Kegiatan</h2>
                    <div className="h-1.5 w-24 bg-gradient-to-r from-emerald-500 to-cyan-500 mx-auto rounded-full"></div>
                    <p className="mt-4 text-emerald-600/80 text-lg">Dokumentasi kegiatan santri dan fasilitas.</p>
                </div>

                <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
                    {[
                        "https://hujtpnndfhnxddglztdn.supabase.co/storage/v1/object/public/seribudigital/gal1.jpeg",
                        "https://hujtpnndfhnxddglztdn.supabase.co/storage/v1/object/public/seribudigital/gal2.jpeg",
                        "https://hujtpnndfhnxddglztdn.supabase.co/storage/v1/object/public/seribudigital/gal3.jpeg",
                        "https://hujtpnndfhnxddglztdn.supabase.co/storage/v1/object/public/seribudigital/gal4.jpeg",
                        "https://hujtpnndfhnxddglztdn.supabase.co/storage/v1/object/public/seribudigital/gal5.jpeg",
                        "https://hujtpnndfhnxddglztdn.supabase.co/storage/v1/object/public/seribudigital/gal6.jpeg",
                        "https://hujtpnndfhnxddglztdn.supabase.co/storage/v1/object/public/seribudigital/gal7.jpeg"
                    ].map((src, idx) => (
                        <motion.div
                            key={idx}
                            whileHover={{ scale: 1.02 }}
                            className="break-inside-avoid rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 relative aspect-[4/3]"
                        >
                            <Image
                                src={src}
                                alt={`Galeri ${idx + 1}`}
                                className="object-cover"
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                loading="lazy"
                            />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
