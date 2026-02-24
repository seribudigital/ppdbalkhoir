"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';

interface ChatMessage {
    role: 'user' | 'assistant';
    content: string;
}

export default function ChatbotWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([
        { role: 'assistant', content: "Assalamu'alaikum! 🙏 Saya Asisten PPDB Al-Khoir. Ada yang bisa saya bantu terkait pendaftaran santri baru?" }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        if (isOpen) {
            scrollToBottom();
        }
    }, [messages, isOpen, isLoading]);

    const handleSendMessage = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage = input.trim();
        setInput('');

        const newMessages: ChatMessage[] = [...messages, { role: 'user', content: userMessage }];
        setMessages(newMessages);
        setIsLoading(true);

        try {
            const res = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ messages: newMessages })
            });

            const data = await res.json();

            if (data.success && data.reply) {
                setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
            } else {
                setMessages(prev => [...prev, { role: 'assistant', content: "Maaf, sistem sedang mengalami kendala. Silakan coba lagi nanti. 🙏" }]);
            }
        } catch (error) {
            console.error("Gagal mengirim pesan:", error);
            setMessages(prev => [...prev, { role: 'assistant', content: "Maaf, ada gangguan jaringan. Mohon periksa koneksi Anda. 📡" }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="mb-4 w-[350px] sm:w-[380px] h-[500px] max-h-[80vh] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-emerald-100"
                    >
                        {/* Header */}
                        <div className="bg-emerald-700 p-4 flex justify-between items-center text-white shadow-md z-10">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center border border-emerald-500 shadow-sm relative">
                                    <Bot className="w-6 h-6 text-emerald-100" />
                                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-emerald-700 rounded-full"></span>
                                </div>
                                <div>
                                    <h3 className="font-bold text-sm tracking-wide">Asisten PPDB</h3>
                                    <p className="text-[10px] text-emerald-200 uppercase tracking-widest font-semibold">Selalu Aktif (24/7)</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-2 hover:bg-emerald-600 rounded-full transition-colors focus:outline-none"
                                aria-label="Tutup Chat"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Chat History */}
                        <div className="flex-1 p-4 overflow-y-auto bg-slate-50 space-y-4 custom-scrollbar">
                            {messages.map((msg, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    {msg.role === 'assistant' && (
                                        <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                                            <Bot className="w-5 h-5 text-emerald-700" />
                                        </div>
                                    )}
                                    <div
                                        className={`px-4 py-2.5 rounded-2xl max-w-[75%] text-sm shadow-sm ${msg.role === 'user'
                                                ? 'bg-emerald-600 text-white rounded-tr-none'
                                                : 'bg-white border border-emerald-100 text-slate-700 rounded-tl-none'
                                            }`}
                                    >
                                        <p className="whitespace-pre-wrap leading-relaxed">{msg.content}</p>
                                    </div>
                                    {msg.role === 'user' && (
                                        <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center flex-shrink-0">
                                            <User className="w-5 h-5 text-slate-500" />
                                        </div>
                                    )}
                                </motion.div>
                            ))}

                            {/* Typing Indicator */}
                            {isLoading && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="flex gap-3 justify-start"
                                >
                                    <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                                        <Bot className="w-5 h-5 text-emerald-700" />
                                    </div>
                                    <div className="px-4 py-3 bg-white border border-emerald-100 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-1.5">
                                        <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                                        <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                                        <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce"></div>
                                    </div>
                                </motion.div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <div className="p-3 bg-white border-t border-emerald-100">
                            <div className="flex items-center gap-2 bg-slate-50 rounded-full border border-emerald-200 px-2 py-1.5 focus-within:ring-2 focus-within:ring-emerald-500/20 focus-within:border-emerald-500 transition-all">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    placeholder="Ketik pesan di sini..."
                                    className="flex-1 bg-transparent px-3 py-2 text-sm outline-none text-slate-700"
                                    disabled={isLoading}
                                />
                                <button
                                    onClick={handleSendMessage}
                                    disabled={!input.trim() || isLoading}
                                    className="p-2.5 bg-emerald-600 text-white rounded-full hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                                    aria-label="Kirim Pesan"
                                >
                                    <Send className="w-4 h-4" />
                                </button>
                            </div>
                            <div className="text-center mt-2">
                                <span className="text-[9px] text-slate-400 uppercase font-semibold">Tanya jawab otomatis oleh AI</span>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Floating Action Button */}
            {!isOpen && (
                <motion.button
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsOpen(true)}
                    className="w-16 h-16 bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-full shadow-2xl flex items-center justify-center text-white focus:outline-none border-4 border-white/20 hover:shadow-emerald-500/40"
                    aria-label="Buka Chat Bantuan"
                >
                    <MessageCircle className="w-8 h-8" />
                </motion.button>
            )}
        </div>
    );
}
