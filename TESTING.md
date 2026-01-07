# Testing Setup Guide – Vitest

## Overview

This guide explains how to set up **testing** for a **React + TypeScript + Vite** application using **Vitest** and **React Testing Library**. It covers installation, configuration, examples, CI integration, and best practices.

---

## 1. Install Testing Framework

Vitest is recommended for **Vite + SWC** projects due to its speed and minimal configuration.

```bash
npm install -D vitest @vitest/ui @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom
```

### Package Descriptions

* **vitest** – Fast unit test framework built for Vite
* **@vitest/ui** – Visual UI for viewing test results
* **@testing-library/react** – Utilities for testing React components
* **@testing-library/jest-dom** – Custom DOM matchers
* **@testing-library/user-event** – Simulate real user interactions
* **jsdom** – DOM implementation for Node.js

---

## 2. Configure Vitest

Add the following to your `vite.config.ts`:

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

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
        '**/index.ts'
      ]
    }
  }
})
```

### Key Options

* **globals** – Use `describe`, `it`, `expect` without imports
* **environment** – Simulated browser environment
* **setupFiles** – Global test setup
* **coverage** – Code coverage configuration

---

## 3. Test Setup File

Create `src/test/setup.ts`:

```ts
import { expect, afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'
import * as matchers from '@testing-library/jest-dom/matchers'

expect.extend(matchers)

afterEach(() => {
  cleanup()
})
```

This file:

* Enables DOM-specific matchers like `toBeInTheDocument()`
* Cleans up rendered components after each test

---

## 4. NPM Scripts

Add the following to `package.json`:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "lint": "eslint . --ext ts,tsx",
    "type-check": "tsc --noEmit",
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest --coverage",
    "test:run": "vitest run",
    "preview": "vite preview"
  }
}
```

---

## 5. Writing Tests

### Component Test Example

**`components/common/Button/Button.test.tsx`**

```ts
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from './Button'

describe('Button', () => {
  it('renders with correct text', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })

  it('calls onClick when clicked', async () => {
    const handleClick = vi.fn()
    const user = userEvent.setup()

    render(<Button onClick={handleClick}>Click me</Button>)
    await user.click(screen.getByText('Click me'))

    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
```

---

### Custom Hook Test Example

**`hooks/useMarketData.test.ts`**

```ts
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { useMarketData } from './useMarketData'
import * as marketApi from '../services/marketTrendsApi'

vi.mock('../services/marketTrendsApi')

describe('useMarketData', () => {
  beforeEach(() => vi.clearAllMocks())

  it('fetches market data', async () => {
    vi.spyOn(marketApi, 'getTrends').mockResolvedValue([
      { id: '1', name: 'Stock A', value: 100, change: 5 }
    ])

    const { result } = renderHook(() => useMarketData())

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })
  })
})
```

---

## 6. Running Tests

```bash
npm test            # Watch mode
npm run test:run    # CI mode
npm run test:ui     # Visual UI
npm run test:coverage
```

---

## 7. GitHub Actions Integration

```yaml
- run: npm run test:run -- --coverage
```

* Runs all tests
* Fails CI on errors
* Generates coverage reports
