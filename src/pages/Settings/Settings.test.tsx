import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Settings from './Settings';

const renderSettings = () => {
  return render(
    <BrowserRouter>
      <Settings />
    </BrowserRouter>
  );
};

describe('Settings', () => {
  it('renders the page title', () => {
    renderSettings();
    expect(screen.getByText('Settings')).toBeDefined();
  });

  it('renders language section', () => {
    renderSettings();
    expect(screen.getByText('Language')).toBeDefined();
    expect(screen.getByText('Select Language')).toBeDefined();
  });

  it('renders language options', () => {
    renderSettings();
    expect(screen.getByText('English (UK)')).toBeDefined();
    expect(screen.getByText('Français')).toBeDefined();
    expect(screen.getByText('Deutsch')).toBeDefined();
  });

  it('renders save button', () => {
    renderSettings();
    expect(screen.getByText('Save Changes')).toBeDefined();
  });

  it('renders sign out button', () => {
    renderSettings();
    expect(screen.getByText('Sign Out')).toBeDefined();
  });
});
