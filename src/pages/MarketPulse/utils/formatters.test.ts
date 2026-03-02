import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { formatMetricValue, formatChartDate, formatRelativeTime, extractDomain } from './formatters';

describe('MarketPulse formatters', () => {
  describe('formatMetricValue', () => {
    it('formats millions_gbp under 1000 as millions', () => {
      expect(formatMetricValue(500, 'millions_gbp')).toBe('£500M');
    });

    it('formats millions_gbp over 1000 as billions', () => {
      expect(formatMetricValue(1500, 'millions_gbp')).toBe('£1.5B');
    });

    it('formats millions_gbp exactly 1000 as billions', () => {
      expect(formatMetricValue(1000, 'millions_gbp')).toBe('£1.0B');
    });

    it('formats percent values with two decimals', () => {
      expect(formatMetricValue(5.25, 'percent')).toBe('5.25%');
    });

    it('formats percent zero correctly', () => {
      expect(formatMetricValue(0, 'percent')).toBe('0.00%');
    });

    it('formats thousands with locale', () => {
      expect(formatMetricValue(65000, 'thousands')).toBe('65,000');
    });

    it('returns toString for unknown units', () => {
      expect(formatMetricValue(42, 'unknown')).toBe('42');
    });
  });

  describe('formatChartDate', () => {
    it('formats date string to short month and year', () => {
      const result = formatChartDate('2025-03-15');
      expect(result).toContain('Mar');
      expect(result).toContain('25');
    });

    it('formats January correctly', () => {
      const result = formatChartDate('2024-01-01');
      expect(result).toContain('Jan');
      expect(result).toContain('24');
    });
  });

  describe('formatRelativeTime', () => {
    beforeEach(() => {
      vi.useFakeTimers();
      vi.setSystemTime(new Date('2026-03-02T12:00:00Z'));
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it('returns "Just now" for less than a minute ago', () => {
      expect(formatRelativeTime('2026-03-02T11:59:30Z')).toBe('Just now');
    });

    it('returns minutes ago for less than an hour', () => {
      expect(formatRelativeTime('2026-03-02T11:45:00Z')).toBe('15 mins ago');
    });

    it('returns "1 min ago" for singular minute', () => {
      expect(formatRelativeTime('2026-03-02T11:59:00Z')).toBe('1 min ago');
    });

    it('returns hours ago for less than a day', () => {
      expect(formatRelativeTime('2026-03-02T09:00:00Z')).toBe('3 hours ago');
    });

    it('returns "1 hour ago" for singular hour', () => {
      expect(formatRelativeTime('2026-03-02T11:00:00Z')).toBe('1 hour ago');
    });

    it('returns "Yesterday" for 1 day ago', () => {
      expect(formatRelativeTime('2026-03-01T12:00:00Z')).toBe('Yesterday');
    });

    it('returns days ago for less than a week', () => {
      expect(formatRelativeTime('2026-02-27T12:00:00Z')).toBe('3 days ago');
    });

    it('returns formatted date for more than a week ago (same year)', () => {
      const result = formatRelativeTime('2026-01-15T12:00:00Z');
      expect(result).toContain('15');
      expect(result).toContain('Jan');
    });

    it('returns formatted date with year for different year', () => {
      const result = formatRelativeTime('2025-06-15T12:00:00Z');
      expect(result).toContain('15');
      expect(result).toContain('Jun');
      expect(result).toContain('2025');
    });
  });

  describe('extractDomain', () => {
    it('extracts domain from full URL', () => {
      expect(extractDomain('https://www.finextra.com/newsarticle/123')).toBe(
        'finextra.com'
      );
    });

    it('extracts domain without www prefix', () => {
      expect(extractDomain('https://reuters.com/article/123')).toBe(
        'reuters.com'
      );
    });

    it('handles http URLs', () => {
      expect(extractDomain('http://example.com/path')).toBe('example.com');
    });

    it('returns "Unknown source" for invalid URLs', () => {
      expect(extractDomain('not-a-url')).toBe('Unknown source');
    });

    it('returns "Unknown source" for empty string', () => {
      expect(extractDomain('')).toBe('Unknown source');
    });
  });
});
