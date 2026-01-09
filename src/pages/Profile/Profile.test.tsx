import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Profile from './Profile';

describe('Profile', () => {
  it('renders the page title', () => {
    render(
      <BrowserRouter>
        <Profile />
      </BrowserRouter>
    );
    expect(screen.getByText('Profile')).toBeDefined();
  });

  it('renders user name', () => {
    render(
      <BrowserRouter>
        <Profile />
      </BrowserRouter>
    );
    expect(screen.getByDisplayValue('Jane Smith')).toBeDefined();
  });

  it('renders save button', () => {
    render(
      <BrowserRouter>
        <Profile />
      </BrowserRouter>
    );
    expect(screen.getByText('Save Changes')).toBeDefined();
  });
});
