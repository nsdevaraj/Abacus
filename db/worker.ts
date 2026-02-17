import sqlite3InitModule from '@sqlite.org/sqlite-wasm';

let db: any = null;
let initPromise: Promise<void> | null = null;

const log = (...args: any[]) => console.log('Worker:', ...args);
const error = (...args: any[]) => console.error('Worker:', ...args);

const init = () => {
  if (initPromise) return initPromise;

  initPromise = (async () => {
    try {
      const sqlite3 = await sqlite3InitModule({
        print: log,
        printErr: error,
      });

      if ('opfs' in sqlite3) {
        db = new sqlite3.oo1.OpfsDb('/abacus.sqlite3');
        log('OPFS is available, created/opened abacus.sqlite3');
      } else {
        db = new sqlite3.oo1.DB('/abacus.sqlite3', 'ct');
        log('OPFS is not available, created/opened transient abacus.sqlite3');
      }

      db.exec('CREATE TABLE IF NOT EXISTS kv_store (key TEXT PRIMARY KEY, value TEXT)');
    } catch (err) {
      error('Initialization failed:', err);
      throw err;
    }
  })();

  return initPromise;
};

self.onmessage = async (e: MessageEvent) => {
  const { type, payload, id } = e.data;

  try {
    if (!db) {
      await init();
    }

    let result;

    switch (type) {
      case 'INIT':
        // Already handled by the check above
        result = true;
        break;

      case 'GET': {
        const stmt = db.prepare('SELECT value FROM kv_store WHERE key = ?');
        stmt.bind([payload.key]);
        if (stmt.step()) {
          result = stmt.get(0);
        } else {
          result = null;
        }
        stmt.finalize();
        break;
      }

      case 'SET': {
        const stmt = db.prepare('INSERT OR REPLACE INTO kv_store (key, value) VALUES (?, ?)');
        stmt.bind([payload.key, payload.value]);
        stmt.step();
        stmt.finalize();
        result = true;
        break;
      }

      case 'DELETE': {
        const stmt = db.prepare('DELETE FROM kv_store WHERE key = ?');
        stmt.bind([payload.key]);
        stmt.step();
        stmt.finalize();
        result = true;
        break;
      }

      case 'GET_ALL': {
        const rows: Record<string, string> = {};
        db.exec({
          sql: 'SELECT key, value FROM kv_store',
          rowMode: 'object',
          callback: (row: any) => {
             // rowMode: 'object' returns { key: ..., value: ... }
            rows[row.key] = row.value;
          },
        });
        result = rows;
        break;
      }

      case 'CLEAR': {
        db.exec('DELETE FROM kv_store');
        result = true;
        break;
      }

      default:
        throw new Error(`Unknown message type: ${type}`);
    }

    self.postMessage({ type: 'SUCCESS', id, result });
  } catch (err: any) {
    error('Error handling message:', err);
    self.postMessage({ type: 'ERROR', id, error: err.message });
  }
};
