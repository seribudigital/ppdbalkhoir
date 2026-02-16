"use client";
import { useState } from "react";
import { tambahPendaftar, ambilSemuaPendaftar, PendaftarData } from "@/lib/firebase/pendaftar";

export default function TestFirebase() {
    const [status, setStatus] = useState("");
    const [data, setData] = useState<any[]>([]);

    const handleAdd = async () => {
        setStatus("Adding...");
        const newData: PendaftarData = {
            nama_lengkap: "Test Siswa",
            asal_sekolah: "SD Test",
            nama_orangtua: "Test Parent",
            nomor_wa_aktif: "08123456789",
            tingkat_pendidikan: "MTs"
        };

        const res = await tambahPendaftar(newData);
        if (res.success) setStatus("Added with ID: " + res.id);
        else setStatus("Error adding: " + JSON.stringify(res.error));
    };

    const handleGet = async () => {
        setStatus("Fetching...");
        const res = await ambilSemuaPendaftar();
        console.log(res);
        setData(res);
        setStatus("Fetched " + res.length + " documents");
    };

    return (
        <div className="p-10 space-y-4">
            <h1 className="text-2xl font-bold">Firebase Connection Test</h1>
            <p className="text-gray-600">Ensure you have updated .env.local with your Firebase config keys.</p>

            <div className="space-x-4">
                <button onClick={handleAdd} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Test Add (Create)</button>
                <button onClick={handleGet} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Test Get All (Read)</button>
            </div>

            <div className="font-mono bg-gray-100 p-2 rounded">Status: {status}</div>

            <div className="mt-4">
                <h2 className="text-xl font-semibold mb-2">Data Retrieved:</h2>
                <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-auto max-h-96 text-sm">
                    {JSON.stringify(data, null, 2)}
                </pre>
            </div>
        </div>
    );
}
