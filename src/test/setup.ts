import { expect, afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';

// Avoid importing pdfjs in unit tests (jsdom lacks DOMMatrix, etc.)
vi.mock('react-pdf', async () => {
  const React = await import('react');

  return {
    Document: ({ children }: { children?: React.ReactNode }) =>
      React.createElement('div', { 'data-testid': 'pdf-document' }, children),
    Page: () => React.createElement('div', { 'data-testid': 'pdf-page' }),
    pdfjs: {
      version: 'test',
      GlobalWorkerOptions: {
        workerSrc: '',
      },
    },
  };
});

// jsdom doesn't provide clipboard by default; some components call it.
if (!('clipboard' in navigator)) {
  Object.defineProperty(navigator, 'clipboard', {
    value: {
      writeText: vi.fn().mockResolvedValue(undefined),
    },
    configurable: true,
  });
}

// Extend Vitest's expect with jest-dom matchers
expect.extend(matchers);

// Cleanup after each test
afterEach(() => {
  cleanup();
});
