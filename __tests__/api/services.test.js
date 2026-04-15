jest.mock('../../src/api/client', () => ({
  __esModule: true,
  default: {
    post: jest.fn(),
  },
}));

import apiClient from '../../src/api/client';
import {loginStudent} from '../../src/api/services/authService';
import {getDashboardSummary} from '../../src/api/services/dashboardService';

describe('API services', () => {
  beforeEach(() => {
    apiClient.post.mockReset();
  });

  it('logs in the student with auth skipped', async () => {
    const payload = {std_roll: '1001'};
    apiClient.post.mockResolvedValueOnce({token: 'abc'});

    await loginStudent(payload);

    expect(apiClient.post).toHaveBeenCalledWith('login', payload, {
      skipAuth: true,
    });
  });

  it('loads the dashboard summary payload', async () => {
    const payload = {studentId: 9};
    apiClient.post.mockResolvedValueOnce({status: true});

    await getDashboardSummary(payload);

    expect(apiClient.post).toHaveBeenCalledWith('dashboard', payload);
  });
});
