import apiClient from '../client';

export const getDashboardSummary = async payload =>
  apiClient.post('dashboard', payload);
