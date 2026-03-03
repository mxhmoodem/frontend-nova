import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { expect } from 'vitest';
import { AuthProvider } from '../../context/AuthContext/AuthContext';
import { AIConsoleProvider } from '../../context/AIConsoleContext';
import AIConsole from './AIConsole';

describe('AIConsole', () => {
  it('renders', () => {
    render(
      <AuthProvider>
        <AIConsoleProvider>
          <AIConsole />
        </AIConsoleProvider>
      </AuthProvider>
    );
    expect(screen.getByText('AI Console')).toBeDefined();
  });
});
