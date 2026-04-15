import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  Animated,
  Easing,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {CheckCircle2} from 'lucide-react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {colors} from '../../constants';

const DEFAULT_DURATION = 2600;

const AppToastContext = createContext({
  hideToast: () => {},
  showSuccessToast: () => {},
  showToast: () => {},
});

const toastThemes = {
  success: {
    backgroundColor: '#EAF8F1',
    borderColor: '#C6EAD6',
    iconBackgroundColor: colors.success,
    iconColor: colors.white,
    messageColor: '#4D6B5A',
    titleColor: '#163525',
  },
};

const AppToastOverlay = ({onHidden, onRequestHide, toast, visible}) => {
  const insets = useSafeAreaInsets();
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(120)).current;
  const [isMounted, setIsMounted] = useState(Boolean(visible && toast));

  useEffect(() => {
    let timeoutId;

    if (visible && toast) {
      setIsMounted(true);
      opacity.setValue(0);
      translateY.setValue(120);

      Animated.parallel([
        Animated.timing(opacity, {
          duration: 220,
          easing: Easing.out(Easing.ease),
          toValue: 1,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          duration: 260,
          easing: Easing.out(Easing.cubic),
          toValue: 0,
          useNativeDriver: true,
        }),
      ]).start();

      timeoutId = setTimeout(() => {
        onRequestHide();
      }, toast.duration ?? DEFAULT_DURATION);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [onRequestHide, opacity, toast, translateY, visible]);

  useEffect(() => {
    if (visible || !toast || !isMounted) {
      return;
    }

    Animated.parallel([
      Animated.timing(opacity, {
        duration: 180,
        easing: Easing.in(Easing.ease),
        toValue: 0,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        duration: 200,
        easing: Easing.in(Easing.ease),
        toValue: 36,
        useNativeDriver: true,
      }),
    ]).start(({finished}) => {
      if (finished) {
        setIsMounted(false);
        onHidden();
      }
    });
  }, [isMounted, onHidden, opacity, toast, translateY, visible]);

  if (!toast || !isMounted) {
    return null;
  }

  const theme = toastThemes[toast.type] || toastThemes.success;

  return (
    <View pointerEvents="box-none" style={StyleSheet.absoluteFill}>
      <View
        pointerEvents="box-none"
        style={[
          styles.viewport,
          {
            paddingBottom: Math.max(insets.bottom + 12, 24),
          },
        ]}>
        <Animated.View
          style={[
            styles.toastCard,
            {
              backgroundColor: theme.backgroundColor,
              borderColor: theme.borderColor,
              opacity,
              transform: [{translateY}],
            },
          ]}>
          <View
            style={[
              styles.iconWrap,
              {
                backgroundColor: theme.iconBackgroundColor,
              },
            ]}>
            <CheckCircle2 color={theme.iconColor} size={22} strokeWidth={2.5} />
          </View>

          <View style={styles.textContent}>
            <Text style={[styles.title, {color: theme.titleColor}]}>
              {toast.title}
            </Text>
            {toast.message ? (
              <Text style={[styles.message, {color: theme.messageColor}]}>
                {toast.message}
              </Text>
            ) : null}
          </View>
        </Animated.View>
      </View>
    </View>
  );
};

export const AppToastProvider = ({children}) => {
  const [toast, setToast] = useState(null);
  const [visible, setVisible] = useState(false);

  const showToast = useCallback(nextToast => {
    setToast({
      duration: DEFAULT_DURATION,
      type: 'success',
      ...nextToast,
      id: Date.now(),
    });
    setVisible(true);
  }, []);

  const hideToast = useCallback(() => {
    setVisible(false);
  }, []);

  const clearToast = useCallback(() => {
    setToast(null);
  }, []);

  const showSuccessToast = useCallback(
    ({duration, message, title}) => {
      showToast({
        duration,
        message,
        title,
        type: 'success',
      });
    },
    [showToast],
  );

  const value = useMemo(
    () => ({
      hideToast,
      showSuccessToast,
      showToast,
    }),
    [hideToast, showSuccessToast, showToast],
  );

  return (
    <AppToastContext.Provider value={value}>
      <View style={styles.providerRoot}>
        {children}
        <AppToastOverlay
          onHidden={clearToast}
          onRequestHide={hideToast}
          toast={toast}
          visible={visible}
        />
      </View>
    </AppToastContext.Provider>
  );
};

export const useAppToast = () => useContext(AppToastContext);

const styles = StyleSheet.create({
  providerRoot: {
    flex: 1,
  },
  viewport: {
    bottom: 0,
    left: 0,
    paddingHorizontal: 16,
    position: 'absolute',
    right: 0,
  },
  toastCard: {
    alignItems: 'center',
    borderRadius: 16,
    borderWidth: 1,
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 14,
    shadowColor: '#244033',
    shadowOffset: {
      height: 10,
      width: 0,
    },
    shadowOpacity: 0.14,
    shadowRadius: 18,
    elevation: 10,
  },
  iconWrap: {
    alignItems: 'center',
    borderRadius: 999,
    height: 36,
    justifyContent: 'center',
    marginRight: 12,
    width: 36,
  },
  textContent: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
  },
  message: {
    fontSize: 13,
    lineHeight: 18,
    marginTop: 2,
  },
});

export default AppToastOverlay;
