const PREFIX = '';

export const localStorageAdapter = {
  getItem: (key: string): Promise<string | null> => {
    return Promise.resolve(localStorage.getItem(`${PREFIX}${key}`));
  },

  setItem: (key: string, value: string): Promise<void> => {
    localStorage.setItem(`${PREFIX}${key}`, value);
    return Promise.resolve();
  },

  removeItem: (key: string): Promise<void> => {
    localStorage.removeItem(`${PREFIX}${key}`);
    return Promise.resolve();
  },

  getAll: (): Promise<Record<string, string>> => {
    const result: Record<string, string> = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key !== null) {
        const value = localStorage.getItem(key);
        if (value !== null) {
          result[key] = value;
        }
      }
    }
    return Promise.resolve(result);
  },

  clear: (): Promise<void> => {
    localStorage.clear();
    return Promise.resolve();
  },
};
