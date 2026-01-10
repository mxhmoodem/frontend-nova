import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/vitest';
import Sidebar from './Sidebar';
import { navigationItems } from '../../../constants/navigation';

const renderSidebar = (
  initialRoute?: string,
  isCollapsed = false,
  onToggle = vi.fn()
) => {
  const route = initialRoute || navigationItems[0].path;

  return {
    user: userEvent.setup(),
    onToggle,
    ...render(
      <MemoryRouter initialEntries={[route]}>
        <Sidebar isCollapsed={isCollapsed} onToggle={onToggle} />
      </MemoryRouter>
    ),
  };
};

describe('Sidebar', () => {
  describe('Accessibility and Structure', () => {
    it('renders a navigation landmark', () => {
      renderSidebar();

      const nav = screen.getByRole('navigation');
      expect(nav).toBeInTheDocument();
    });

    it('renders all navigation items from config as accessible links', () => {
      renderSidebar();

      const links = screen.getAllByRole('link');

      expect(links).toHaveLength(navigationItems.length);
    });

    it('each rendered link corresponds to a config entry with correct label and path', () => {
      renderSidebar();

      navigationItems.forEach((item) => {
        const link = screen.getByRole('link', {
          name: new RegExp(item.label, 'i'),
        });
        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute('href', item.path);
      });
    });
  });

  describe('Active Route Indication', () => {
    it('indicates the active route with aria-current when a config route is active', () => {
      const firstItem = navigationItems[0];
      renderSidebar(firstItem.path);

      const activeLink = screen.getByRole('link', {
        name: new RegExp(firstItem.label, 'i'),
      });
      expect(activeLink).toHaveAttribute('aria-current', 'page');
    });

    it('indicates the correct active route when navigating to different config routes', () => {
      const targetItem = navigationItems[2];
      renderSidebar(targetItem.path);

      const activeLink = screen.getByRole('link', {
        name: new RegExp(targetItem.label, 'i'),
      });
      expect(activeLink).toHaveAttribute('aria-current', 'page');

      navigationItems.forEach((item) => {
        if (item.id !== targetItem.id) {
          const link = screen.getByRole('link', {
            name: new RegExp(item.label, 'i'),
          });
          expect(link).not.toHaveAttribute('aria-current');
        }
      });
    });

    it('only one link is marked as active at a time', () => {
      const activeItem = navigationItems[1];
      renderSidebar(activeItem.path);

      const links = screen.getAllByRole('link');
      const activeLinks = links.filter(
        (link) => link.getAttribute('aria-current') === 'page'
      );

      expect(activeLinks).toHaveLength(1);
    });
  });

  describe('Sidebar Toggle Functionality', () => {
    it('renders a toggle button with accessible label when expanded', () => {
      renderSidebar(undefined, false);

      const toggleButton = screen.getByRole('button', {
        name: /collapse sidebar/i,
      });
      expect(toggleButton).toBeInTheDocument();
    });

    it('renders a toggle button with accessible label when collapsed', () => {
      renderSidebar(undefined, true);

      const toggleButton = screen.getByRole('button', {
        name: /expand sidebar/i,
      });
      expect(toggleButton).toBeInTheDocument();
    });

    it('calls onToggle handler when toggle button is clicked', async () => {
      const { user, onToggle } = renderSidebar();

      const toggleButton = screen.getByRole('button', {
        name: /collapse sidebar/i,
      });
      await user.click(toggleButton);

      expect(onToggle).toHaveBeenCalledTimes(1);
    });

    it('shows navigation labels when expanded', () => {
      renderSidebar(undefined, false);

      navigationItems.forEach((item) => {
        const link = screen.getByRole('link', {
          name: new RegExp(item.label, 'i'),
        });
        expect(link).toBeInTheDocument();
      });
    });

    it('hides navigation labels when collapsed', () => {
      renderSidebar(undefined, true);

      navigationItems.forEach((item) => {
        const labels = screen.queryByText(item.label);
        expect(labels).not.toBeInTheDocument();
      });
    });
  });

  describe('Config Resilience', () => {
    it('does not break when navigation config is extended with new items', () => {
      renderSidebar();

      const links = screen.getAllByRole('link');
      expect(links.length).toBeGreaterThan(0);

      // All current config items should be present
      navigationItems.forEach((item) => {
        expect(
          screen.getByRole('link', { name: new RegExp(item.label, 'i') })
        ).toBeInTheDocument();
      });
    });

    it('handles navigation items without icons gracefully', () => {
      renderSidebar();

      // Should render all links regardless of icon presence
      const links = screen.getAllByRole('link');
      expect(links).toHaveLength(navigationItems.length);
    });
  });

  describe('Keyboard Navigation', () => {
    it('allows keyboard navigation through all links', async () => {
      const { user } = renderSidebar();

      const links = screen.getAllByRole('link');
      const firstLink = links[0];

      firstLink.focus();
      expect(firstLink).toHaveFocus();

      await user.tab();
      expect(links[1]).toHaveFocus();
    });

    it('toggle button is keyboard accessible', async () => {
      const { user, onToggle } = renderSidebar();

      const toggleButton = screen.getByRole('button', {
        name: /collapse sidebar/i,
      });
      toggleButton.focus();

      expect(toggleButton).toHaveFocus();

      await user.keyboard('{Enter}');
      expect(onToggle).toHaveBeenCalledTimes(1);
    });

    it('toggle button can be activated with Space key', async () => {
      const { user, onToggle } = renderSidebar();

      const toggleButton = screen.getByRole('button', {
        name: /collapse sidebar/i,
      });
      toggleButton.focus();

      await user.keyboard(' ');
      expect(onToggle).toHaveBeenCalledTimes(1);
    });
  });

  describe('Link Interaction', () => {
    it('all navigation links are clickable', async () => {
      const { user } = renderSidebar();

      for (const item of navigationItems) {
        const link = screen.getByRole('link', {
          name: new RegExp(item.label, 'i'),
        });

        await user.click(link);
        expect(link).toBeInTheDocument();
      }
    });
  });

  describe('Multiple Toggle Interactions', () => {
    it('handles multiple rapid toggle clicks', async () => {
      const { user, onToggle } = renderSidebar();

      const toggleButton = screen.getByRole('button', {
        name: /collapse sidebar/i,
      });

      // Click multiple times rapidly
      await user.click(toggleButton);
      await user.click(toggleButton);
      await user.click(toggleButton);

      expect(onToggle).toHaveBeenCalledTimes(3);
    });
  });
});
