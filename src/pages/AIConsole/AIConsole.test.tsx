import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { expect } from 'vitest';
import { AuthProvider } from '../../context/AuthContext/AuthContext';
import AIConsole from './AIConsole';

describe('AIConsole', () => {
  it('renders', () => {
    render(
      <AuthProvider>
        <AIConsole />
      </AuthProvider>
    );
    expect(screen.getByText('AI Console')).toBeDefined();
  });
});
