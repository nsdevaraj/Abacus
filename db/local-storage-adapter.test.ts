import { describe, it, expect, beforeEach, spyOn } from 'bun:test';
import { localStorageAdapter } from './local-storage-adapter';

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => (key in store ? store[key] : null),
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
    key: (index: number) => Object.keys(store)[index] || null,
    get length() {
      return Object.keys(store).length;
    },
  };
})();

Object.defineProperty(globalThis, 'localStorage', {
  value: localStorageMock,
});

describe('localStorageAdapter', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('setItem should store a value', async () => {
    const setItemSpy = spyOn(localStorage, 'setItem');
    await localStorageAdapter.setItem('testKey', 'testValue');
    expect(localStorage.getItem('testKey')).toBe('testValue');
    expect(setItemSpy).toHaveBeenCalledWith('testKey', 'testValue');
  });

  it('getItem should retrieve a stored value', async () => {
    localStorage.setItem('testKey', 'testValue');
    const value = await localStorageAdapter.getItem('testKey');
    expect(value).toBe('testValue');
  });

  it('getItem should return null for non-existent key', async () => {
    const value = await localStorageAdapter.getItem('nonExistent');
    expect(value).toBeNull();
  });

  it('getItem should return empty string if value is empty string', async () => {
    localStorage.setItem('emptyKey', '');
    const value = await localStorageAdapter.getItem('emptyKey');
    expect(value).toBe('');
  });

  it('removeItem should remove a stored value', async () => {
    localStorage.setItem('testKey', 'testValue');
    await localStorageAdapter.removeItem('testKey');
    expect(localStorage.getItem('testKey')).toBeNull();
  });

  it('getAll should return all stored items', async () => {
    localStorage.setItem('key1', 'value1');
    localStorage.setItem('key2', 'value2');

    const all = await localStorageAdapter.getAll();
    expect(all).toEqual({
      key1: 'value1',
      key2: 'value2',
    });
  });

  it('clear should remove all stored items', async () => {
    localStorage.setItem('key1', 'value1');
    localStorage.setItem('key2', 'value2');

    await localStorageAdapter.clear();
    expect(localStorage.length).toBe(0);
  });
});
