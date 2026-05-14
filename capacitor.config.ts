import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.devois.Abacus',
  appName: 'AbacusGame',
  webDir: 'dist',
  ios: {
    contentInset: 'always',
  },
};

export default config;
