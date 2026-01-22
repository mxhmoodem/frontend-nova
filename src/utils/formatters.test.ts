import { describe, it, expect } from 'vitest';
import { getInitials, getFirstName } from './formatters';

describe('formatters', () => {
  describe('getInitials', () => {
    it('returns initials from full name', () => {
      expect(getInitials('John Doe')).toBe('JD');
    });

    it('handles single name', () => {
      expect(getInitials('John')).toBe('J');
    });

    it('handles multiple spaces', () => {
      expect(getInitials('John  Michael   Doe')).toBe('JMD');
    });

    it('handles leading/trailing whitespace', () => {
      expect(getInitials('  John Doe  ')).toBe('JD');
    });

    it('returns uppercase initials', () => {
      expect(getInitials('john doe')).toBe('JD');
    });

    it('handles empty string', () => {
      expect(getInitials('')).toBe('');
    });
  });

  describe('getFirstName', () => {
    it('returns first name from full name', () => {
      expect(getFirstName('John Doe')).toBe('John');
    });

    it('returns the only name if single', () => {
      expect(getFirstName('John')).toBe('John');
    });

    it('handles multiple spaces', () => {
      expect(getFirstName('John  Doe')).toBe('John');
    });

    it('handles leading/trailing whitespace', () => {
      expect(getFirstName('  John Doe  ')).toBe('John');
    });

    it('handles empty string', () => {
      expect(getFirstName('')).toBe('');
    });
  });
});
