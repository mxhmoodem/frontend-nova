import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    css: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'src/test/',
        '**/*.types.ts',
        '**/*.config.ts',
        '**/index.ts',
      ],
    },
    alias: {
      'react-i18next': path.resolve(
        __dirname,
        './src/__mocks__/react-i18next.ts'
      ),
    },
  },
});
