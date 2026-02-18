import React from 'react';

const LocationSection = () => {
    return (
        <section id="lokasi" className="py-20 px-6 bg-transparent">
            <div className="container mx-auto max-w-6xl">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-emerald-800 mb-4">Lokasi Kami</h2>
                    <div className="h-1.5 w-20 bg-emerald-200 mx-auto rounded-full"></div>
                    <p className="mt-4 text-emerald-600/80 text-lg">Kunjungi kami untuk informasi lebih lanjut.</p>
                </div>

                <div className="bg-white p-4 rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
                    <div className="relative w-full h-[450px] rounded-2xl overflow-hidden">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.2777119052275!2d106.34010737499037!3d-6.227068993761021!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e421cac70750925%3A0x61d080263a68db9b!2sSDIT%20AL-KHOIR!5e0!3m2!1sid!2sid!4v1771369594197!5m2!1sid!2sid"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Lokasi SDIT Al-Khoir"
                        ></iframe>
                    </div>
                </div>

                <div className="mt-8 grid md:grid-cols-3 gap-6 text-center">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                        <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 text-xl">
                            📍
                        </div>
                        <h3 className="font-bold text-slate-800 mb-2">Alamat</h3>
                        <p className="text-slate-600 text-sm">Jl. Cikande Permai Blok T9 Cikande, Serang, Banten</p>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                        <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 text-xl">
                            📞
                        </div>
                        <h3 className="font-bold text-slate-800 mb-2">Kontak</h3>
                        <div className="flex flex-col items-center">
                            <p className="text-emerald-700 font-bold">Ust. Amir</p>
                            <p className="text-slate-600 text-sm">0823-1043-6764</p>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                        <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 text-xl">
                            ⏰
                        </div>
                        <h3 className="font-bold text-slate-800 mb-2">Jam Operasional</h3>
                        <p className="text-slate-600 text-sm">Senin - Jumat: 07:00 - 15:00 WIB</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LocationSection;
