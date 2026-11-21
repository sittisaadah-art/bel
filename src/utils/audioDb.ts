import { BellAudioRecord, BellSchedule, DEFAULT_SCHEDULES } from '../types/bell';

const DB_NAME = 'ArRohmahPSASBellDB';
const DB_VERSION = 1;
const STORE_NAME = 'bellAudios';
const STORAGE_KEY = 'arrohmah_psas_schedules_v1';

function openAudioDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function saveAudioToDB(id: string, fileBlob: Blob, fileName: string): Promise<void> {
  const db = await openAudioDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    tx.objectStore(STORE_NAME).put({ id, blob: fileBlob, fileName });
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

export async function getAudioFromDB(id: string): Promise<BellAudioRecord | null> {
  const db = await openAudioDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readonly');
    const req = tx.objectStore(STORE_NAME).get(id);
    req.onsuccess = () => resolve((req.result as BellAudioRecord | undefined) || null);
    req.onerror = () => reject(req.error);
  });
}

export async function deleteAudioFromDB(id: string): Promise<void> {
  const db = await openAudioDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    tx.objectStore(STORE_NAME).delete(id);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

export async function clearAllAudioFromDB(): Promise<void> {
  const db = await openAudioDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    tx.objectStore(STORE_NAME).clear();
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

export function sortSchedules(list: BellSchedule[]): BellSchedule[] {
  return [...list].sort((a, b) => a.time.localeCompare(b.time));
}

export function loadSchedulesFromStorage(): BellSchedule[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return sortSchedules(parsed);
      }
    }
  } catch {
    // Fallback to defaults if storage is corrupted
  }
  const initial = sortSchedules(DEFAULT_SCHEDULES.map((item) => ({ ...item })));
  saveSchedulesToStorage(initial);
  return initial;
}

export function saveSchedulesToStorage(schedules: BellSchedule[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(schedules));
}
