import React from 'react';
import {StyleSheet, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import CommonHeader from '../../CommonHeader';
import {whiteColor} from '../../../Utils/Constant';

const StaffContentScaffold = ({children, onBackPress, theme, title}) => (
  <LinearGradient
    colors={theme.gradients.screen}
    end={{x: 1, y: 1}}
    start={{x: 0, y: 0}}
    style={styles.screen}>
    <CommonHeader
      compact
      title={title}
      IconColor={whiteColor}
      gradientColors={theme.gradients.header}
      textColor={whiteColor}
      titleStyle={theme.typography.headerTitle}
      extStyle={[
        {
          height: theme.layout.headerHeight,
        },
        theme.shadows.header,
      ]}
      onLeftClick={onBackPress}
    />

    <View
      style={[
        styles.content,
        {
          paddingHorizontal: theme.spacing.screenHorizontal,
          paddingTop: theme.spacing.contentTop,
        },
      ]}>
      <View
        style={[
          styles.contentInner,
          {
            maxWidth: theme.layout.contentMaxWidth,
          },
        ]}>
        {children}
      </View>
    </View>
  </LinearGradient>
);

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  contentInner: {
    alignSelf: 'center',
    flex: 1,
    width: '100%',
  },
  screen: {
    flex: 1,
  },
});

export default React.memo(StaffContentScaffold);
