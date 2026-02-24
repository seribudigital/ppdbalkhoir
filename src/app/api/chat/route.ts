import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

// TODO: Paste isi teks website di sini, nanti saya yang akan menempelkan teks konten website saya ke dalamnya
const KNOWLEDGE_BASE = `================================================================
DATABASE CHATBOT - AL-KHOIR ISLAMIC SCHOOL BIN BAZ 5
Format: Plain Text Q&A
================================================================

================================================================
INFORMASI UMUM
================================================================

Q: Apa itu Al-Khoir Islamic School?
A: Al-Khoir Islamic School Bin Baz 5 adalah lembaga pendidikan Islam tingkat MTs (Madrasah Tsanawiyah) dan MA (Madrasah Aliyah) yang memadukan model pendidikan pesantren salaf dengan kurikulum modern. Lembaga ini mengadopsi sistem pembelajaran dari Islamic Centre Bin Baz Yogyakarta dan berlokasi di Cikande, Serang, Banten.

Q: Apa visi Al-Khoir Islamic School?
A: Menjadi lembaga pendidikan menengah berbasis pesantren yang bermanhaj salafush shalih dalam beraqidah, beribadah, berakhlak, dan bermuamalah secara ilmu dan amal.

Q: Jenjang pendidikan apa saja yang tersedia di Al-Khoir Islamic School?
A: Al-Khoir Islamic School menyediakan dua jenjang pendidikan, yaitu MTs (setara SMP) dan MA (setara SMA).

Q: Di mana lokasi Al-Khoir Islamic School?
A: Jl. Cikande Permai Blok T9, Cikande, Serang, Banten.

Q: Apa jam operasional Al-Khoir Islamic School?
A: Senin sampai Jumat, pukul 07.00 – 15.00 WIB.

================================================================
PPDB / PENDAFTARAN
================================================================

Q: Apa itu PPDB atau SPMB Al-Khoir Islamic School?
A: PPDB (Penerimaan Peserta Didik Baru) atau SPMB (Seleksi Penerimaan Murid Baru) adalah program penerimaan siswa baru untuk tahun ajaran 2026/2027 di Al-Khoir Islamic School Bin Baz 5 untuk tingkat MTs dan MA.

Q: Kapan jadwal pendaftaran PPDB Al-Khoir Islamic School?
A: Pendaftaran dibuka pada 01 Oktober 2025 sampai 30 Januari 2026, secara online maupun offline.

Q: Kapan tes seleksi dilaksanakan?
A: Tes seleksi dilaksanakan pada tanggal 31 Januari 2026, meliputi Tes Akademik, BTQ (Baca Tulis Qur'an), dan Wawancara.

Q: Kapan pengumuman hasil seleksi?
A: Pengumuman hasil seleksi disampaikan pada tanggal 07 Februari 2026 melalui Website atau WhatsApp.

Q: Kapan batas daftar ulang?
A: Daftar ulang dilaksanakan pada tanggal 14 Februari 2026 untuk penyelesaian administrasi siswa baru.

Q: Apa saja syarat pendaftaran di Al-Khoir Islamic School?
A: Syarat pendaftaran adalah sebagai berikut:
1. Legalisir Ijazah SD/MI/SMP/MTs sebanyak 2 lembar
2. Fotokopi Kartu Keluarga sebanyak 2 lembar
3. Fotokopi Akta Kelahiran sebanyak 2 lembar
4. Foto ukuran 2x3 dan 3x4 berwarna, masing-masing 4 lembar
5. SKL (Surat Keterangan Lulus), diserahkan setelah dinyatakan lulus seleksi

Q: Apakah pendaftaran bisa dilakukan secara online?
A: Ya, pendaftaran dapat dilakukan secara online maupun offline.

Q: Apakah ada diskon untuk alumni?
A: Ya, ada diskon khusus untuk alumni Al-Khoir Islamic School.

================================================================
BIAYA PENDIDIKAN
================================================================

Q: Berapa biaya pendaftaran di Al-Khoir Islamic School?
A: Biaya pendaftaran adalah Rp 250.000, baik untuk jalur asrama maupun non-asrama.

Q: Berapa biaya SPP bulanan di Al-Khoir Islamic School?
A: SPP bulanan untuk siswa asrama adalah Rp 1.000.000 per bulan (sudah termasuk makan 3x sehari, laundry, dan P3K). Untuk siswa non-asrama, SPP bulanan adalah Rp 200.000.

Q: Apa saja yang termasuk dalam biaya SPP asrama?
A: SPP asrama sudah mencakup makan 3 kali sehari, laundry, dan P3K (pertolongan pertama pada kecelakaan).

Q: Berapa biaya perlengkapan asrama?
A: Biaya perlengkapan asrama sebesar Rp 2.700.000, meliputi Kasur Inoac, Dipan, dan Almari. Biaya ini hanya untuk siswa asrama.

Q: Berapa biaya bangunan?
A: Biaya bangunan untuk siswa asrama adalah Rp 3.000.000, sedangkan untuk siswa non-asrama adalah Rp 1.500.000.

Q: Berapa biaya seragam di Al-Khoir Islamic School?
A: Biaya seragam putra adalah Rp 1.500.000 dan seragam putri adalah Rp 1.700.000. Biaya ini sama untuk siswa asrama maupun non-asrama.

Q: Berapa biaya buku per tahun?
A: Biaya buku adalah Rp 800.000 per tahun, berlaku untuk siswa asrama maupun non-asrama.

Q: Berapa biaya ekstrakurikuler dan OSIS?
A: Biaya ekstrakurikuler dan OSIS adalah Rp 200.000 per tahun.

Q: Berapa biaya buku raport?
A: Biaya buku raport adalah Rp 100.000.

Q: Berapa total biaya awal masuk untuk siswa asrama?
A: Total biaya awal untuk siswa asrama:
- Putra: Rp 9.550.000
- Putri: Rp 9.750.000

Q: Berapa total biaya awal masuk untuk siswa non-asrama?
A: Total biaya awal untuk siswa non-asrama:
- Putra: Rp 4.550.000
- Putri: Rp 4.750.000

Q: Apa saja biaya yang harus dibayar di awal tahun?
A: Biaya perlengkapan, bangunan, dan seragam wajib dibayarkan di awal tahun ajaran.

Q: Rincian lengkap biaya Al-Khoir Islamic School?
A: Berikut rincian lengkapnya:
| Uraian            | Asrama         | Non-Asrama     |
| Pendaftaran       | Rp 250.000     | Rp 250.000     |
| Perlengkapan      | Rp 2.700.000   | -              |
| SPP Bulanan       | Rp 1.000.000   | Rp 200.000     |
| Bangunan          | Rp 3.000.000   | Rp 1.500.000   |
| Seragam Putra     | Rp 1.500.000   | Rp 1.500.000   |
| Seragam Putri     | Rp 1.700.000   | Rp 1.700.000   |
| Buku/Tahun        | Rp 800.000     | Rp 800.000     |
| Ekskul+OSIS/Tahun | Rp 200.000     | Rp 200.000     |
| Buku Raport       | Rp 100.000     | Rp 100.000     |

================================================================
KURIKULUM & PENGAJARAN
================================================================

Q: Apa saja mata pelajaran agama (diniyyah) di Al-Khoir Islamic School?
A: Mata pelajaran diniyyah meliputi: Tahfidz, Al-Qur'an, Akidah Akhlak, Adab Islam, Fikih, Hadits, Tarikh Islam, Manhaj, Muhadatsah, Nahwu, Shorof, Imla' wa Khot, Qiro'ah, dan Tahsin.

Q: Apa saja mata pelajaran umum di Al-Khoir Islamic School?
A: Mata pelajaran umum meliputi: Matematika, IPA, IPS, PKN, Bahasa Indonesia, Bahasa Inggris, Ilmu Komputer, dan Pendidikan Pancasila.

Q: Siapa saja tenaga pengajar di Al-Khoir Islamic School?
A: Tenaga pengajar terdiri dari alumni perguruan tinggi dalam dan luar negeri, universitas negeri maupun swasta, alumni pondok pesantren, serta tenaga pengajar khusus Tahfidz Al-Qur'an.

Q: Apa target hafalan Al-Qur'an di Al-Khoir Islamic School?
A: Siswa ditargetkan mampu menghafal minimal 10 juz Al-Qur'an selama pendidikan.

Q: Apakah ada pelajaran bahasa Arab?
A: Ya, terdapat pelajaran Muhadatsah (percakapan), Nahwu, Shorof, Imla' wa Khot, dengan target siswa mahir berbahasa Arab secara lisan maupun tulisan.

================================================================
EKSTRAKURIKULER
================================================================

Q: Apa saja ekstrakurikuler di Al-Khoir Islamic School?
A: Ekstrakurikuler yang tersedia: English Club, Pramuka, Futsal, Voli, Badminton, Ping Pong, Desain Grafis, PMR (Palang Merah Remaja), Prakarya, dan OSMA.

================================================================
PRESTASI
================================================================

Q: Apa saja prestasi Al-Khoir Islamic School?
A: Prestasi yang telah diraih antara lain:
1. Juara 1 Pidato Bahasa Indonesia Tingkat Kabupaten
2. Juara 2 Musabaqoh Hifdzil Mutun
3. Juara 1 Pingpong KSM
4. Finalis Hifdzul Mutun Tingkat Provinsi
5. Juara 1 Tahfidz Tingkat Provinsi
6. Juara 2 Olimpiade Cipta Puisi Tingkat Nasional
Dan masih banyak prestasi lainnya.

================================================================
KONTAK & INFORMASI
================================================================

Q: Bagaimana cara menghubungi panitia PPDB Al-Khoir Islamic School?
A: Dapat menghubungi panitia melalui:
- Unit MTs: Ust. Amir (0823-1043-6764) atau Ust. Suhendra (0812-1159-9501)
- Unit MA: Ust. Darwin (0822-3349-8861) atau Ust. M. Kholil (0895-2299-9229)

Q: Berapa nomor WhatsApp pendaftaran MTs Al-Khoir Islamic School?
A: Untuk unit MTs dapat menghubungi:
- Ust. Amir: 0823-1043-6764
- Ust. Suhendra: 0812-1159-9501

Q: Berapa nomor WhatsApp pendaftaran MA Al-Khoir Islamic School?
A: Untuk unit MA dapat menghubungi:
- Ust. Darwin: 0822-3349-8861
- Ust. M. Kholil: 0895-2299-9229

Q: Di mana tempat mendaftar Al-Khoir Islamic School?
A: Lokasi pendaftaran (Kampus AIS) berada di Jl. Cikande Permai Blok T9, Cikande, Serang, Banten. Pendaftaran juga bisa dilakukan secara online.

================================================================
TARGET LULUSAN
================================================================

Q: Apa yang menjadi target lulusan Al-Khoir Islamic School?
A: Target lulusan Al-Khoir Islamic School adalah siswa yang:
1. Memiliki aqidah yang shahihah dan bertaqwa kepada Allah
2. Mampu membaca Al-Qur'an dengan tartil dan hafal minimal 10 juz
3. Hafal hadits Arba'in Nawawiyah
4. Menguasai dasar-dasar ilmu syar'i
5. Memiliki akhlak mulia dan adab Islam
6. Memiliki kepedulian sosial dan lingkungan
7. Mahir berbahasa Arab lisan maupun tulisan
8. Memiliki kemandirian dan suka berdakwah

================================================================
AKHIR DATABASE
================================================================`;

// Kontak WhatsApp (Bisa diubah nanti)
const WA_MTS = '0823-1043-6764';
const WA_MA = '0822-3349-8861';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { messages } = body;

        if (!messages || !Array.isArray(messages)) {
            return NextResponse.json({ error: 'Format pesan tidak valid.' }, { status: 400 });
        }

        // Initialize Gemini AI
        const ai = new GoogleGenAI({});

        const systemPrompt = `Anda adalah Asisten Virtual resmi PPDB Pondok Pesantren Al-Khoir Islamic School Bin Baz 5. Tugas utama Anda adalah menjawab pertanyaan calon wali santri berdasarkan database berikut ini: 

${KNOWLEDGE_BASE}

Aturan ketat:
- Jika pengguna mengucapkan salam (seperti "Assalamu'alaikum", "Assalamualaikum", "Assalam", dll), WAJIB balas terlebih dahulu dengan "Wa'alaikumussalam Warahmatullahi Wabarakatuh. 🙏" secara natural sebelum menjawab pertanyaannya.
- Jawab HANYA berdasarkan informasi yang ada di dalam database tersebut.
- Jika ada yang bertanya di luar konteks PPDB atau sekolah, tolak dengan sangat sopan, jangan mengarang jawaban.
- Jika ada pertanyaan spesifik yang tidak ada di database (misal: "Apakah bisa dicicil?"), arahkan mereka untuk menghubungi panitia pendaftaran sesuai jenjang (MTs atau MA) yang nomornya ada di dalam database.
- Jawab dengan ramah, Islami, sopan, singkat, padat, dan gunakan format yang rapi (seperti bullet points) agar mudah dibaca di HP.`;

        // Format history for Gemini
        const formattedHistory = messages.map((msg: any) => ({
            role: msg.role === 'user' ? 'user' : 'model',
            parts: [{ text: msg.content }]
        }));

        // Instead of typical chat session creation, we'll send the contents directly 
        // with the system prompt injected into the systemInstruction if supported, 
        // or as the first message context. The new @google/genai SDK supports systemInstruction.
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: formattedHistory,
            config: {
                systemInstruction: systemPrompt,
            }
        });

        if (!response.text) {
            throw new Error("Empty response from AI");
        }

        return NextResponse.json({
            success: true,
            reply: response.text
        });

    } catch (error: any) {
        console.error("Error di API Chatbot:", error);
        return NextResponse.json({ success: false, error: 'Maaf, sistem sedang sibuk. Silakan coba beberapa saat lagi.' }, { status: 500 });
    }
}
