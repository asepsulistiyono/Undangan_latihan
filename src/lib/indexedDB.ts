/**
 * IndexedDB wrapper untuk menyimpan foto di mode demo.
 * IndexedDB punya limit storage jauh lebih besar (50MB-1GB) dibanding localStorage (5MB).
 * Ini solusi untuk masalah upload foto di mobile yang sering gagal.
 */

const DB_NAME = "wedding-photos-db";
const DB_VERSION = 1;
const STORE_NAME = "photos";

/**
 * Buka koneksi ke IndexedDB
 */
function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => {
      reject(new Error("Gagal membuka IndexedDB"));
    };

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "id" });
      }
    };
  });
}

/**
 * Simpan foto (Blob/File) ke IndexedDB
 */
export async function savePhoto(
  key: string,
  blob: Blob,
  userId?: string
): Promise<string> {
  const db = await openDB();
  
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], "readwrite");
    const store = transaction.objectStore(STORE_NAME);
    
    const data = {
      id: userId ? `${userId}:${key}` : key,
      blob,
      timestamp: Date.now(),
      size: blob.size,
      type: blob.type,
    };

    const request = store.put(data);

    request.onerror = () => {
      reject(new Error("Gagal menyimpan foto ke IndexedDB"));
    };

    request.onsuccess = () => {
      // Return object URL untuk preview
      const url = URL.createObjectURL(blob);
      resolve(url);
    };

    transaction.oncomplete = () => {
      db.close();
    };
  });
}

/**
 * Ambil foto dari IndexedDB
 */
export async function getPhoto(key: string, userId?: string): Promise<string | null> {
  const db = await openDB();
  
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], "readonly");
    const store = transaction.objectStore(STORE_NAME);
    
    const id = userId ? `${userId}:${key}` : key;
    const request = store.get(id);

    request.onerror = () => {
      reject(new Error("Gagal mengambil foto dari IndexedDB"));
    };

    request.onsuccess = () => {
      const result = request.result;
      if (result && result.blob) {
        const url = URL.createObjectURL(result.blob);
        resolve(url);
      } else {
        resolve(null);
      }
    };

    transaction.oncomplete = () => {
      db.close();
    };
  });
}

/**
 * Hapus foto dari IndexedDB
 */
export async function deletePhoto(key: string, userId?: string): Promise<void> {
  const db = await openDB();
  
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], "readwrite");
    const store = transaction.objectStore(STORE_NAME);
    
    const id = userId ? `${userId}:${key}` : key;
    const request = store.delete(id);

    request.onerror = () => {
      reject(new Error("Gagal menghapus foto dari IndexedDB"));
    };

    request.onsuccess = () => {
      resolve();
    };

    transaction.oncomplete = () => {
      db.close();
    };
  });
}

/**
 * Cek apakah IndexedDB tersedia
 */
export function isIndexedDBAvailable(): boolean {
  try {
    return typeof indexedDB !== "undefined" && indexedDB !== null;
  } catch {
    return false;
  }
}

/**
 * Dapatkan estimasi storage yang tersedia
 */
export async function getStorageEstimate(): Promise<{
  quota: number;
  usage: number;
  available: number;
}> {
  if ("storage" in navigator && "estimate" in navigator.storage) {
    const estimate = await navigator.storage.estimate();
    return {
      quota: estimate.quota || 0,
      usage: estimate.usage || 0,
      available: (estimate.quota || 0) - (estimate.usage || 0),
    };
  }
  return { quota: 0, usage: 0, available: 0 };
}
