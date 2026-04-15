import {STRINGS} from '../../src/constants';
import getErrorMessage from '../../src/Utils/errorMessages';

describe('getErrorMessage', () => {
  it('returns the fallback message when there is no error', () => {
    expect(getErrorMessage()).toBe(STRINGS.common.unexpectedError);
  });

  it('returns plain string errors as-is', () => {
    expect(getErrorMessage('Invalid login')).toBe('Invalid login');
  });

  it('prefers a custom user message when present', () => {
    expect(getErrorMessage({userMessage: 'Already handled'})).toBe('Already handled');
  });

  it('maps network-like failures to the shared network message', () => {
    expect(getErrorMessage(new Error('Failed to fetch resource'))).toBe(
      STRINGS.common.networkError,
    );
  });

  it('falls back to nested API error payload messages', () => {
    expect(getErrorMessage({data: {message: 'Forbidden'}})).toBe('Forbidden');
  });

  it('returns the fallback message when the derived message is empty', () => {
    expect(getErrorMessage({message: '   '})).toBe(STRINGS.common.unexpectedError);
  });

  it('falls back to alternate error fields when message is missing', () => {
    expect(getErrorMessage({data: {error: 'Denied'}})).toBe('Denied');
    expect(getErrorMessage({error: 'Forbidden'})).toBe('Forbidden');
  });
});
