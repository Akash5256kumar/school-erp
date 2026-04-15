import {API_BASE_URL, STRINGS, colors, spacing} from '../../src/constants';

describe('constants barrel exports', () => {
  it('exposes shared app constants', () => {
    expect(API_BASE_URL).toBe('http://139.59.90.236:86/api/');
    expect(STRINGS.appName).toBe('School ERP');
    expect(colors.primary).toBe('#5E3BF9');
    expect(spacing.md).toBe(16);
  });
});
