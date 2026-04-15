import * as api from '../../src/api';

describe('api barrel exports', () => {
  it('re-exports the client and service helpers', () => {
    expect(api.apiClient).toBeDefined();
    expect(api.loginStudent).toBeDefined();
    expect(api.getDashboardSummary).toBeDefined();
  });
});
