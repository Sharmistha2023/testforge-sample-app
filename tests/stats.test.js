import { describe, it, expect } from 'vitest';
import { completionRate, slugify } from '../src/lib/stats.js';

// SEEDED: partial coverage — averageEstimate and the zero-total case are untested
describe('completionRate', () => {
  it('computes a percentage', () => {
    expect(completionRate(1, 4)).toBe(25);
  });
});

describe('slugify', () => {
  it('lowercases and dashes', () => {
    expect(slugify('Fix Login Bug!')).toBe('fix-login-bug');
  });
});
