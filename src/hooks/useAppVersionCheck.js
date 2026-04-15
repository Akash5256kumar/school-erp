import {useEffect} from 'react';
import {Alert, BackHandler, Linking} from 'react-native';
import VersionCheck from 'react-native-version-check';

import {STRINGS} from '../constants';

export const useAppVersionCheck = () => {
  useEffect(() => {
    let mounted = true;

    const checkVersion = async () => {
      try {
        const updateNeeded = await VersionCheck.needUpdate();

        if (mounted && updateNeeded?.isNeeded) {
          Alert.alert(
            STRINGS.updates.title,
            STRINGS.updates.description,
            [
              {
                text: STRINGS.updates.action,
                onPress: () => {
                  BackHandler.exitApp();
                  Linking.openURL(updateNeeded.storeUrl);
                },
              },
            ],
            {cancelable: false},
          );
        }
      } catch (error) {
        // Swallowing version-check failures keeps startup resilient.
      }
    };

    checkVersion();

    return () => {
      mounted = false;
    };
  }, []);
};

export default useAppVersionCheck;
