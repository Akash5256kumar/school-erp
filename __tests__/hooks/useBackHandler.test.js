import {BackHandler} from 'react-native';
import {renderHook} from '@testing-library/react-native';

import {useBackHandler} from '../../src/hooks/useBackHandler';

describe('useBackHandler', () => {
  it('subscribes to and removes the back handler listener', () => {
    const remove = jest.fn();
    const addEventListener = jest
      .spyOn(BackHandler, 'addEventListener')
      .mockReturnValue({remove});
    const handler = jest.fn(() => true);

    const {unmount} = renderHook(() => useBackHandler(handler));

    expect(addEventListener).toHaveBeenCalledWith('hardwareBackPress', handler);

    unmount();

    expect(remove).toHaveBeenCalledTimes(1);
  });
});
