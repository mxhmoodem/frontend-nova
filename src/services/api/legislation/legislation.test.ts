import { describe, it, expect, vi, beforeEach } from 'vitest';
import { legislationApi } from './legislation.api';
import { legislationKeys } from './legislation.keys';
import { LEGISLATION_ENDPOINTS } from './legislation.endpoints';
import type {
  LegislationItem,
  LegislationListResponse,
} from './legislation.types';

// ─── Mock the shared apiClient ──────────────────────────────────────────────

const mockGet = vi.fn();

vi.mock('../shared', async () => {
  const actual = await vi.importActual('../shared');
  return {
    ...actual,
    apiClient: {
      get: (...args: unknown[]) => mockGet(...args),
    },
  };
});

// ─── Test data ──────────────────────────────────────────────────────────────

const MOCK_ITEM: LegislationItem = {
  id: '58d25c28-e929-478c-954e-be2038d40147',
  title: 'Data_Protection_Act_2018',
  description: 'UK data protection legislation',
  source: 'https://www.legislation.gov.uk/ukpga/2018/12/contents/enacted',
  file_type: 'pdf',
  created_at: '2026-03-02T11:50:10.364960',
  updated_at: '2026-03-09T22:42:15.685090+00:00',
};

const MOCK_LIST_RESPONSE: LegislationListResponse = {
  items: [MOCK_ITEM],
  total: 1,
  skip: 0,
  limit: 100,
  order_by: null,
  has_next: false,
};

// ─── Tests ──────────────────────────────────────────────────────────────────

describe('Legislation Endpoints', () => {
  it('list endpoint is /legislation/', () => {
    expect(LEGISLATION_ENDPOINTS.list).toBe('/legislation/');
  });

  it('byId endpoint includes the id', () => {
    expect(LEGISLATION_ENDPOINTS.byId('abc-123')).toBe('/legislation/abc-123');
  });
});

describe('Legislation Query Keys', () => {
  it('all key is ["legislation"]', () => {
    expect(legislationKeys.all).toEqual(['legislation']);
  });

  it('lists key appends "list"', () => {
    expect(legislationKeys.lists()).toEqual(['legislation', 'list']);
  });

  it('list key appends filters', () => {
    const filters = { skip: 0, limit: 20 };
    expect(legislationKeys.list(filters)).toEqual([
      'legislation',
      'list',
      filters,
    ]);
  });

  it('detail key appends id', () => {
    expect(legislationKeys.detail('abc')).toEqual([
      'legislation',
      'detail',
      'abc',
    ]);
  });
});

describe('Legislation API', () => {
  beforeEach(() => {
    mockGet.mockReset();
  });

  describe('getAll', () => {
    it('calls GET /legislation/ with no params by default', async () => {
      mockGet.mockResolvedValue(MOCK_LIST_RESPONSE);

      const result = await legislationApi.getAll();

      expect(mockGet).toHaveBeenCalledWith('/legislation/', { params: {} });
      expect(result).toEqual(MOCK_LIST_RESPONSE);
    });

    it('passes skip and limit as query params', async () => {
      mockGet.mockResolvedValue(MOCK_LIST_RESPONSE);

      await legislationApi.getAll({ skip: 20, limit: 10 });

      expect(mockGet).toHaveBeenCalledWith('/legislation/', {
        params: { skip: 20, limit: 10 },
      });
    });

    it('passes order_by when provided', async () => {
      mockGet.mockResolvedValue(MOCK_LIST_RESPONSE);

      await legislationApi.getAll({ order_by: 'created_at' });

      expect(mockGet).toHaveBeenCalledWith('/legislation/', {
        params: { order_by: 'created_at' },
      });
    });

    it('returns paginated response shape', async () => {
      mockGet.mockResolvedValue(MOCK_LIST_RESPONSE);

      const result = await legislationApi.getAll();

      expect(result.items).toHaveLength(1);
      expect(result.total).toBe(1);
      expect(result.skip).toBe(0);
      expect(result.limit).toBe(100);
      expect(result.has_next).toBe(false);
      expect(result.order_by).toBeNull();
    });
  });

  describe('getById', () => {
    it('calls GET /legislation/{id}', async () => {
      mockGet.mockResolvedValue(MOCK_ITEM);

      const result = await legislationApi.getById(MOCK_ITEM.id);

      expect(mockGet).toHaveBeenCalledWith(
        `/legislation/${MOCK_ITEM.id}`
      );
      expect(result).toEqual(MOCK_ITEM);
    });

    it('returns flat LegislationItem (no wrapper)', async () => {
      mockGet.mockResolvedValue(MOCK_ITEM);

      const result = await legislationApi.getById(MOCK_ITEM.id);

      expect(result.id).toBe(MOCK_ITEM.id);
      expect(result.title).toBe('Data_Protection_Act_2018');
      expect(result.file_type).toBe('pdf');
      expect(result.source).toContain('legislation.gov.uk');
    });
  });
});

describe('LegislationItem type compliance', () => {
  it('handles both timezone formats in created_at / updated_at', () => {
    // Without timezone offset
    const date1 = new Date('2026-03-02T11:50:10.364960');
    expect(date1.getTime()).not.toBeNaN();

    // With timezone offset
    const date2 = new Date('2026-03-09T22:42:15.685090+00:00');
    expect(date2.getTime()).not.toBeNaN();
  });

  it('source can be a URL or "user"', () => {
    const scraped: LegislationItem = { ...MOCK_ITEM, source: 'https://www.legislation.gov.uk/test' };
    const uploaded: LegislationItem = { ...MOCK_ITEM, source: 'user' };

    expect(scraped.source.startsWith('https://')).toBe(true);
    expect(uploaded.source).toBe('user');
  });

  it('description can be null or empty string', () => {
    const withNull: LegislationItem = { ...MOCK_ITEM, description: null };
    const withEmpty: LegislationItem = { ...MOCK_ITEM, description: '' };

    expect(withNull.description).toBeNull();
    expect(withEmpty.description).toBe('');
  });
});
