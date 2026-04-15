import {BackHandler} from 'react-native';
import {useEffect} from 'react';

export const useBackHandler = handler => {
  useEffect(() => {
    const subscription = BackHandler.addEventListener(
      'hardwareBackPress',
      handler,
    );

    return () => subscription.remove();
  }, [handler]);
};

export default useBackHandler;
