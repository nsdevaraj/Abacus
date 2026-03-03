import { describe, it, expect } from 'bun:test';

describe('Security Fix Verification', () => {
  it('should have replaced Math.random with crypto.getRandomValues in useAbacusGame.ts', async () => {
    const fileContent = await Bun.file('hooks/useAbacusGame.ts').text();
    expect(fileContent).toContain('window.crypto.getRandomValues(array)');
    expect(fileContent).not.toContain('Math.floor(Math.random() * 1000000)');
  });
});
