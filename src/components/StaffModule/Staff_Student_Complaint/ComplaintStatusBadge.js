import React, {memo} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {getComplaintStatusPalette} from './complaintTheme';

const ComplaintStatusBadge = ({status, theme, style, textStyle}) => {
  const palette = getComplaintStatusPalette(status);

  return (
    <View
      style={[
        styles.badge,
        {
          alignSelf: 'flex-end',
          backgroundColor: palette.backgroundColor,
          borderColor: palette.borderColor,
          borderRadius: theme.radii.badge,
          minHeight: theme.sizing.badgeHeight,
          minWidth: theme.sizing.badgeMinWidth,
          paddingVertical: theme.sizing.statusVerticalPadding,
          paddingHorizontal: theme.sizing.statusHorizontalPadding,
        },
        style,
      ]}>
      <Text
        style={[
          theme.typography.badge,
          {
            color: palette.textColor,
            textAlign: 'center',
          },
          textStyle,
        ]}>
        {status}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    alignItems: 'center',
    borderWidth: 1,
    justifyContent: 'center',
  },
});

export default memo(ComplaintStatusBadge);
