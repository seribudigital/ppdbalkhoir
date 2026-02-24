import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { messages } = body;

        if (!messages || !Array.isArray(messages)) {
            return NextResponse.json({ error: 'Format pesan tidak valid.' }, { status: 400 });
        }

        // Initialize Gemini AI
        const ai = new GoogleGenAI({});

        const systemPrompt = "Anda adalah Asisten Virtual resmi untuk PPDB Yayasan Pendidikan Islam Al-Khoir (jenjang MTs dan MA). Tugas Anda adalah menjawab pertanyaan calon wali santri dengan ramah, sopan, dan bernuansa Islami. Jika ditanya biaya, jawab estimasi biaya pendaftaran adalah Rp 250.000. Syarat utama: Fotokopi KK, Akta Kelahiran, dan Ijazah/SKHU. Jika ada pertanyaan di luar konteks PPDB atau sekolah, tolak dengan sopan dan arahkan kembali ke topik pendaftaran. Jawablah dengan singkat, padat, dan gunakan emoji yang sesuai.";

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
