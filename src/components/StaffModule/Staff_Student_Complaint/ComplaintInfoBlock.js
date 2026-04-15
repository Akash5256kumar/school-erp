import React, {memo} from 'react';
import {StyleSheet, Text, View} from 'react-native';

const ComplaintInfoBlock = ({label, theme, value, valueNumberOfLines}) => (
  <View
    style={[
      styles.container,
      {
        backgroundColor: theme.colors.infoPanelBackground,
        borderColor: theme.colors.infoPanelBorder,
        borderRadius: theme.radii.infoPanel,
        minHeight: theme.sizing.infoPanelMinHeight,
        paddingHorizontal: theme.spacing.infoPanelHorizontal,
        paddingVertical: theme.spacing.infoPanelVertical,
      },
    ]}>
    <Text style={theme.typography.sectionTitle}>{label}</Text>
    <Text
      numberOfLines={valueNumberOfLines}
      style={[
        theme.typography.body,
        {
          marginTop: theme.spacing.sectionTitleGap,
        },
      ]}>
      {value}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    width: '100%',
  },
});

export default memo(ComplaintInfoBlock);
