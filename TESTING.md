# Testing Setup Guide – Vitest

## 1. Writing Tests

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

## 2. Running Tests

```bash
npm test            # Watch mode
npm run test:run    # CI mode
npm run test:ui     # Visual UI
npm run test:coverage
```

---

## 3. GitHub Actions Integration

```yaml
- run: npm run test:run -- --coverage
```

* Runs all tests
* Fails CI on errors
* Generates coverage reports
