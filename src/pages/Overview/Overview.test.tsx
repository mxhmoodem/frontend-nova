import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { expect } from 'vitest';
import { AuthProvider } from '../../context/AuthContext/AuthContext';
import Overview from './Overview';

describe('Overview', () => {
  it('renders', () => {
    render(
      <AuthProvider>
        <Overview />
      </AuthProvider>
    );
    expect(screen.getByText('Overview')).toBeDefined();
  });
});
