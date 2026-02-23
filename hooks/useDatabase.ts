import { localStorageAdapter } from '../db/local-storage-adapter';

declare const __STORAGE_BACKEND__: string;

type StorageApi = {
  getItem: (key: string) => Promise<string | null>;
  setItem: (key: string, value: string) => Promise<void>;
  removeItem: (key: string) => Promise<void>;
  getAll: () => Promise<Record<string, string>>;
  clear: () => Promise<void>;
};

// --- SQLite worker backend ---

type WorkerMessage = {
  type: 'SUCCESS' | 'ERROR';
  id: number;
  result?: any;
  error?: any;
};

let worker: Worker | null = null;
const pendingRequests = new Map<number, { resolve: (val: any) => void; reject: (err: any) => void }>();
let messageId = 0;

const getWorker = () => {
  if (!worker) {
    worker = new Worker(new URL('../db/worker.ts', import.meta.url), { type: 'module' });
    worker.onmessage = (e: MessageEvent<WorkerMessage>) => {
      const { type, id, result, error } = e.data;
      const request = pendingRequests.get(id);
      if (request) {
        if (type === 'SUCCESS') {
          request.resolve(result);
        } else {
          request.reject(new Error(error));
        }
        pendingRequests.delete(id);
      }
    };
  }
  return worker;
};

const sendRequest = <T>(type: string, payload?: any): Promise<T> => {
  const w = getWorker();
  const id = ++messageId;
  return new Promise((resolve, reject) => {
    pendingRequests.set(id, { resolve, reject });
    w.postMessage({ type, payload, id });
  });
};

const sqliteAdapter: StorageApi = {
  getItem: (key: string) => sendRequest<string | null>('GET', { key }),
  setItem: (key: string, value: string) => sendRequest<void>('SET', { key, value }),
  removeItem: (key: string) => sendRequest<void>('DELETE', { key }),
  getAll: () => sendRequest<Record<string, string>>('GET_ALL'),
  clear: () => sendRequest<void>('CLEAR'),
};

// --- Backend selection ---

const STORAGE_BACKEND =
  typeof __STORAGE_BACKEND__ !== 'undefined' ? __STORAGE_BACKEND__.toLowerCase() : 'sqlite';

const storageApi: StorageApi =
  STORAGE_BACKEND === 'localstorage' ? localStorageAdapter : sqliteAdapter;

console.log(`[Storage] Using ${STORAGE_BACKEND} backend`);

export const useDatabase = (): StorageApi => {
  return storageApi;
};
