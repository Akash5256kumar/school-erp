import {act, renderHook} from '@testing-library/react-native';

import {useAsync} from '../../src/hooks/useAsync';

describe('useAsync', () => {
  it('executes async work and stores the resolved data', async () => {
    const asyncFunction = jest.fn().mockResolvedValue({status: true});
    const {result} = renderHook(() => useAsync(asyncFunction));

    await act(async () => {
      await result.current.execute('payload');
    });

    expect(asyncFunction).toHaveBeenCalledWith('payload');
    expect(result.current.data).toEqual({status: true});
    expect(result.current.error).toBeNull();
    expect(result.current.loading).toBe(false);
  });

  it('stores errors and rethrows them', async () => {
    const error = new Error('Request failed');
    const asyncFunction = jest.fn().mockRejectedValue(error);
    const {result} = renderHook(() => useAsync(asyncFunction));
    let caughtError;

    await act(async () => {
      try {
        await result.current.execute();
      } catch (asyncError) {
        caughtError = asyncError;
      }
    });

    expect(caughtError).toBe(error);
    expect(result.current.error).toBe(error);
    expect(result.current.loading).toBe(false);
  });
});
