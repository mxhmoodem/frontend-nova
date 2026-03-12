import { describe, it, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import RegulatoryRadar from './RegulatoryRadar';
import type { LegislationListResponse } from '../../services/api';

// ─── Mock data ──────────────────────────────────────────────────────────────

const MOCK_LEGISLATION_RESPONSE: LegislationListResponse = {
  items: [
    {
      id: '58d25c28-e929-478c-954e-be2038d40147',
      title: 'Data_Protection_Act_2018',
      description: 'UK data protection legislation',
      source: 'https://www.legislation.gov.uk/ukpga/2018/12/contents/enacted',
      file_type: 'pdf',
      created_at: '2026-03-02T11:50:10.364960',
      updated_at: '2026-03-09T22:42:15.685090+00:00',
    },
    {
      id: '4bf7fc46-082a-469c-ba7c-c5240ff050f3',
      title: 'Financial_Services_Act_2021',
      description: '',
      source: 'user',
      file_type: 'docx',
      created_at: '2026-03-05T09:30:00.000000',
      updated_at: '2026-03-10T14:20:00.000000+00:00',
    },
  ],
  total: 2,
  skip: 0,
  limit: 20,
  order_by: null,
  has_next: false,
};

const EMPTY_RESPONSE: LegislationListResponse = {
  items: [],
  total: 0,
  skip: 0,
  limit: 20,
  order_by: null,
  has_next: false,
};

// ─── Mock API hooks ─────────────────────────────────────────────────────────

const mockUseLegislation = vi.fn();

vi.mock('../../services/api', async () => {
  const actual = await vi.importActual('../../services/api');
  return {
    ...actual,
    useLegislation: (...args: unknown[]) => mockUseLegislation(...args),
  };
});

// ─── Helpers ────────────────────────────────────────────────────────────────

let queryClient: QueryClient;

function renderPage() {
  return render(
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <RegulatoryRadar />
      </QueryClientProvider>
    </BrowserRouter>
  );
}

// ─── Tests ──────────────────────────────────────────────────────────────────

describe('RegulatoryRadar', () => {
  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: { queries: { retry: false } },
    });
    // Default: successfully loaded data
    mockUseLegislation.mockReturnValue({
      data: MOCK_LEGISLATION_RESPONSE,
      isLoading: false,
      isError: false,
      error: null,
      refetch: vi.fn(),
    });
  });

  // ── Basic rendering ────────────────────────────────────────────────────

  it('renders the page heading', () => {
    renderPage();
    expect(screen.getByText('Regulatory Radar')).toBeDefined();
  });

  it('renders the subheading', () => {
    renderPage();
    expect(
      screen.getByText(
        'Track, monitor, and prepare for global compliance changes.'
      )
    ).toBeDefined();
  });

  it('renders the search input', () => {
    renderPage();
    expect(
      screen.getByPlaceholderText('Search legislation...')
    ).toBeDefined();
  });

  // ── Stat cards with API data ───────────────────────────────────────────

  it('renders stat cards derived from API data', () => {
    renderPage();
    expect(screen.getByText('TOTAL LEGISLATION')).toBeDefined();
    expect(screen.getByText('SCRAPED SOURCES')).toBeDefined();
    expect(screen.getByText('USER UPLOADED')).toBeDefined();
  });

  it('displays total count from API in stat card', () => {
    renderPage();
    // total = 2 from mock data
    expect(screen.getByTestId('stat-total-legislation')).toBeDefined();
  });

  // ── Legislation table ──────────────────────────────────────────────────

  it('renders legislation items in a table', () => {
    renderPage();
    expect(screen.getByText('Data Protection Act 2018')).toBeDefined();
    expect(screen.getByText('Financial Services Act 2021')).toBeDefined();
  });

  it('renders file type badges', () => {
    renderPage();
    expect(screen.getByText('PDF')).toBeDefined();
    expect(screen.getByText('DOCX')).toBeDefined();
  });

  it('renders external source as a link', () => {
    renderPage();
    const link = screen.getByText('legislation.gov.uk');
    expect(link.tagName).toBe('A');
    expect(link.getAttribute('href')).toContain('legislation.gov.uk');
    expect(link.getAttribute('target')).toBe('_blank');
  });

  it('renders user source as label', () => {
    renderPage();
    expect(screen.getByText('User upload')).toBeDefined();
  });

  it('displays the total legislation count badge', () => {
    renderPage();
    const badge = document.querySelector(
      '.regulatory-radar__legislation-count'
    );
    expect(badge).not.toBeNull();
    expect(badge!.textContent).toBe('2');
  });

  // ── Search filtering ──────────────────────────────────────────────────

  it('filters legislation by search query', async () => {
    const user = userEvent.setup();
    renderPage();

    const input = screen.getByPlaceholderText('Search legislation...');
    await user.type(input, 'Data Protection');

    expect(screen.getByText('Data Protection Act 2018')).toBeDefined();
    expect(
      screen.queryByText('Financial Services Act 2021')
    ).toBeNull();
  });

  it('shows empty state when search has no matches', async () => {
    const user = userEvent.setup();
    renderPage();

    const input = screen.getByPlaceholderText('Search legislation...');
    await user.type(input, 'zzzznonexistent');

    expect(
      screen.getByText('No legislation matches your search.')
    ).toBeDefined();
  });

  // ── Loading state ─────────────────────────────────────────────────────

  it('shows loading state', () => {
    mockUseLegislation.mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
      error: null,
      refetch: vi.fn(),
    });
    renderPage();
    expect(screen.getByText('Loading legislation data…')).toBeDefined();
  });

  // ── Error state ───────────────────────────────────────────────────────

  it('shows error state', () => {
    mockUseLegislation.mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
      error: new Error('Network error'),
      refetch: vi.fn(),
    });
    renderPage();
    expect(screen.getByText(/Failed to load legislation/)).toBeDefined();
    expect(screen.getByText(/Network error/)).toBeDefined();
  });

  it('renders retry button in error state', () => {
    const refetchFn = vi.fn();
    mockUseLegislation.mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
      error: new Error('fail'),
      refetch: refetchFn,
    });
    renderPage();
    expect(screen.getByText('Retry')).toBeDefined();
  });

  // ── Empty state ───────────────────────────────────────────────────────

  it('shows empty state when no legislation exists', () => {
    mockUseLegislation.mockReturnValue({
      data: EMPTY_RESPONSE,
      isLoading: false,
      isError: false,
      error: null,
      refetch: vi.fn(),
    });
    renderPage();
    expect(
      screen.getByText('No legislation documents found.')
    ).toBeDefined();
  });

  // ── Refresh button ────────────────────────────────────────────────────

  it('calls refetch when refresh button is clicked', async () => {
    const refetchFn = vi.fn();
    mockUseLegislation.mockReturnValue({
      data: MOCK_LEGISLATION_RESPONSE,
      isLoading: false,
      isError: false,
      error: null,
      refetch: refetchFn,
    });

    const user = userEvent.setup();
    renderPage();

    const refreshBtn = screen.getByLabelText('Refresh legislation');
    await user.click(refreshBtn);
    expect(refetchFn).toHaveBeenCalled();
  });

  // ── Pagination ────────────────────────────────────────────────────────

  it('does not show pagination when only one page', () => {
    renderPage();
    expect(screen.queryByText(/Page \d+ of \d+/)).toBeNull();
  });

  it('shows pagination controls when multiple pages exist', () => {
    mockUseLegislation.mockReturnValue({
      data: { ...MOCK_LEGISLATION_RESPONSE, total: 50, has_next: true },
      isLoading: false,
      isError: false,
      error: null,
      refetch: vi.fn(),
    });
    renderPage();
    expect(screen.getByText('Page 1 of 3')).toBeDefined();
    expect(screen.getByText('Previous')).toBeDefined();
    expect(screen.getByText('Next')).toBeDefined();
  });

  it('disables Previous button on first page', () => {
    mockUseLegislation.mockReturnValue({
      data: { ...MOCK_LEGISLATION_RESPONSE, total: 50, has_next: true },
      isLoading: false,
      isError: false,
      error: null,
      refetch: vi.fn(),
    });
    renderPage();
    const prevBtn = screen.getByLabelText('Previous page');
    expect(prevBtn).toHaveProperty('disabled', true);
  });
});
