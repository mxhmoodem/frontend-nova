import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { expect } from 'vitest';
import AIConsole from './AIConsole';

describe('AIConsole', () => {
  it('renders', () => {
    render(<AIConsole />);
    expect(screen.getByText('AI Console')).toBeDefined();
  });
});
