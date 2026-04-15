import {STRINGS} from '../constants';

const getErrorMessage = error => {
  const fallbackMessage = STRINGS.common.unexpectedError;

  if (!error) {
    return fallbackMessage;
  }

  if (typeof error === 'string') {
    return error;
  }

  if (error.userMessage) {
    return error.userMessage;
  }

  const message =
    error.message ||
    error.data?.message ||
    error.data?.error ||
    error.error ||
    fallbackMessage;

  const normalizedMessage = String(message).trim();

  if (
    normalizedMessage.toLowerCase().includes('network') ||
    normalizedMessage.toLowerCase().includes('timeout') ||
    normalizedMessage.toLowerCase().includes('failed to fetch')
  ) {
    return STRINGS.common.networkError;
  }

  return normalizedMessage || fallbackMessage;
};

export default getErrorMessage;
