import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Sidebar from './Sidebar';

const renderSidebar = (props = {}) => {
  const defaultProps = {
    isCollapsed: false,
    setIsCollapsed: vi.fn(),
    ...props,
  };

  return render(
    <BrowserRouter>
      <Sidebar {...defaultProps} />
    </BrowserRouter>
  );
};

describe('Sidebar', () => {
  it('renders the brand name when expanded', () => {
    renderSidebar({ isCollapsed: false });
    expect(screen.getByText('Noval IQ')).toBeDefined();
  });

  it('hides the brand name when collapsed', () => {
    renderSidebar({ isCollapsed: true });
    expect(screen.queryByText('Noval IQ')).toBeNull();
  });

  it('renders navigation items', () => {
    renderSidebar();
    expect(screen.getByText('Overview')).toBeDefined();
    expect(screen.getByText('Market Pulse')).toBeDefined();
    expect(screen.getByText('Settings')).toBeDefined();
  });

  it('calls setIsCollapsed when collapse button is clicked', () => {
    const setIsCollapsed = vi.fn();
    renderSidebar({ isCollapsed: false, setIsCollapsed });

    const collapseButton = screen.getByRole('button', {
      name: /collapse sidebar/i,
    });
    fireEvent.click(collapseButton);

    expect(setIsCollapsed).toHaveBeenCalledWith(true);
  });

  it('renders Help link', () => {
    renderSidebar();
    expect(screen.getByText('Help')).toBeDefined();
  });
});
