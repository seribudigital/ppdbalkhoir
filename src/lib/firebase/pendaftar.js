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
    orderBy
} from "firebase/firestore";

const COLLECTION_NAME = "pendaftar";

/**
 * Menambahkan pendaftar baru
 * @param {Object} data - Data pendaftar
 * @returns {Promise<{success: boolean, id?: string, error?: any}>}
 */
export const tambahPendaftar = async (data) => {
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

/**
 * Mengambil semua data pendaftar
 * @returns {Promise<Array>} Array of pendaftar objects
 */
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

/**
 * Mengambil satu pendaftar berdasarkan ID
 * @param {string} id - ID dokumen
 * @returns {Promise<Object|null>} Data pendaftar atau null
 */
export const ambilPendaftarById = async (id) => {
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

/**
 * Update status pendaftar
 * @param {string} id - ID dokumen
 * @param {string} status - Status baru ('Jadwal Tes', 'Diterima', 'Ditolak', dll)
 * @returns {Promise<{success: boolean, error?: any}>}
 */
export const updateStatusPendaftar = async (id, status) => {
    try {
        const docRef = doc(db, COLLECTION_NAME, id);
        await updateDoc(docRef, { status_pendaftaran: status });
        return { success: true };
    } catch (error) {
        console.error("Error updating document: ", error);
        return { success: false, error };
    }
};

/**
 * Update data pendaftar (general)
 * @param {string} id - ID dokumen
 * @param {Object} data - Data yang akan diupdate
 * @returns {Promise<{success: boolean, error?: any}>}
 */
export const updatePendaftar = async (id, data) => {
    try {
        const docRef = doc(db, COLLECTION_NAME, id);
        await updateDoc(docRef, data);
        return { success: true };
    } catch (error) {
        console.error("Error updating document: ", error);
        return { success: false, error };
    }
};

/**
 * Menghapus pendaftar
 * @param {string} id - ID dokumen
 * @returns {Promise<{success: boolean, error?: any}>}
 */
export const hapusPendaftar = async (id) => {
    try {
        await deleteDoc(doc(db, COLLECTION_NAME, id));
        return { success: true };
    } catch (error) {
        console.error("Error deleting document: ", error);
        return { success: false, error };
    }
};
