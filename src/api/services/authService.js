import apiClient from '../client';

export const loginStudent = async payload =>
  apiClient.post('login', payload, {
    skipAuth: true,
  });
