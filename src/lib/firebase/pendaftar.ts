import { db } from "./config";
import {
    collection,
    addDoc,
    getDocs,
    getDoc,
    doc,
    updateDoc,
    deleteDoc,
    serverTimestamp,
    query,
    orderBy,
    DocumentData,
    Timestamp
} from "firebase/firestore";

const COLLECTION_NAME = "pendaftar";

export interface PendaftarData {
    tingkat_pendidikan: "MTs" | "MA";
    nama_lengkap: string;
    asal_sekolah: string;
    nama_orangtua: string;
    nomor_wa_aktif: string;
    // Data Diri
    nisn?: string;
    tempat_lahir?: string;
    tanggal_lahir?: string; // Format YYYY-MM-DD
    jenis_kelamin?: "Laki-laki" | "Perempuan";
    anak_ke?: number;

    // Data Sekolah Asal
    alamat_sekolah_asal?: string;
    kelas_sekolah_asal?: string;

    // Data Orang Tua
    nomor_kk?: string;
    nama_ayah?: string;
    nik_ayah?: string;
    pendidikan_ayah?: string;
    pekerjaan_ayah?: string;
    nomor_wa_ayah?: string;

    nama_ibu?: string;
    nik_ibu?: string;
    pendidikan_ibu?: string;
    pekerjaan_ibu?: string;
    nomor_wa_ibu?: string;

    // Alamat
    alamat_lengkap?: string;
    kecamatan?: string;
    kabupaten?: string;
    provinsi?: string;

    status_pendaftaran?: "Menunggu Verifikasi" | "Jadwal Tes" | "Diterima" | "Ditolak";
    tanggal_daftar?: Timestamp;
    [key: string]: any;
}

export const tambahPendaftar = async (data: PendaftarData) => {
    try {
        const docRef = await addDoc(collection(db, COLLECTION_NAME), {
            ...data,
            status_pendaftaran: "Menunggu Verifikasi",
            tanggal_daftar: serverTimestamp(),
        });
        return { success: true, id: docRef.id };
    } catch (error) {
        console.error("Error adding document: ", error);
        return { success: false, error };
    }
};

export const ambilSemuaPendaftar = async () => {
    try {
        const q = query(collection(db, COLLECTION_NAME), orderBy("tanggal_daftar", "desc"));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        console.error("Error getting documents: ", error);
        return [];
    }
};

export const ambilPendaftarById = async (id: string) => {
    try {
        const docRef = doc(db, COLLECTION_NAME, id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() };
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error getting document: ", error);
        return null;
    }
};

export const updateStatusPendaftar = async (id: string, status: string) => {
    try {
        const docRef = doc(db, COLLECTION_NAME, id);
        await updateDoc(docRef, { status_pendaftaran: status });
        return { success: true };
    } catch (error) {
        console.error("Error updating document: ", error);
        return { success: false, error };
    }
};

export const updatePendaftar = async (id: string, data: Partial<PendaftarData>) => {
    try {
        const docRef = doc(db, COLLECTION_NAME, id);
        await updateDoc(docRef, data);
        return { success: true };
    } catch (error) {
        console.error("Error updating document: ", error);
        return { success: false, error };
    }
};


export const hapusPendaftar = async (id: string) => {
    try {
        await deleteDoc(doc(db, COLLECTION_NAME, id));
        return { success: true };
    } catch (error) {
        console.error("Error deleting document: ", error);
        return { success: false, error };
    }
};
