import React, {memo} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {X} from 'lucide-react-native';

import {STRINGS} from '../../../constants';
import ComplaintInfoBlock from './ComplaintInfoBlock';
import ComplaintStatusBadge from './ComplaintStatusBadge';

const ComplaintCard = ({
  item,
  onPress,
  theme,
  expanded = false,
  onClose,
  showCloseButton = false,
  style,
}) => {
  const Container = onPress ? Pressable : View;
  const complaintTypeLines = expanded ? undefined : 2;
  const complaintBodyLines = expanded ? undefined : 3;

  return (
    <Container
      accessibilityRole={onPress ? 'button' : undefined}
      onPress={onPress ? () => onPress(item) : undefined}
      style={[
        styles.card,
        {
          backgroundColor: theme.colors.cardBackground,
          borderRadius: theme.radii.card,
          marginBottom: theme.spacing.cardGap,
        },
        theme.shadows.card,
        style,
      ]}>
      <LinearGradient
        colors={[theme.colors.accentHeaderStart, theme.colors.accentHeaderEnd]}
        end={{x: 1, y: 0}}
        start={{x: 0, y: 0}}
        style={[
          styles.header,
          {
            paddingHorizontal: theme.spacing.cardHeaderHorizontal,
            paddingVertical: theme.spacing.cardHeaderVertical,
          },
        ]}>
        <View style={styles.topRow}>
          <View style={styles.titleColumn}>
            <Text numberOfLines={2} style={theme.typography.cardTitle}>
              {`${STRINGS.staffComplaints.labels.name}: ${item.student} | ${STRINGS.staffComplaints.labels.class}: ${item.class}`}
            </Text>
            <Text
              style={[
                theme.typography.modalSection,
                {
                  marginTop: theme.spacing.sectionTitleGap,
                },
              ]}>
              {`${STRINGS.staffComplaints.labels.section}: ${item.Section}`}
            </Text>
            <Text
              style={[
                theme.typography.modalSection,
                {
                  marginTop: theme.spacing.sectionTitleGap,
                },
              ]}>
              {`${STRINGS.staffComplaints.labels.admissionNumber}: ${item.admissionNumber}`}
            </Text>
          </View>

          <View
            style={[
              styles.metaColumn,
              {
                marginLeft: theme.spacing.inlineGap,
              },
            ]}>
            <View style={styles.dateRow}>
              <Text style={theme.typography.date}>{item.createdAt}</Text>
              {showCloseButton ? (
                <Pressable
                  accessibilityLabel="Close complaint details"
                  accessibilityRole="button"
                  hitSlop={8}
                  onPress={onClose}
                  style={[
                    styles.closeButton,
                    {
                      marginLeft: theme.spacing.modalCloseGap,
                    },
                  ]}>
                  <X
                    color={theme.colors.whiteText}
                    size={theme.sizing.modalCloseIcon}
                    strokeWidth={2.4}
                  />
                </Pressable>
              ) : null}
            </View>
            <ComplaintStatusBadge
              status={item.status}
              style={{
                marginTop: theme.spacing.cardStatusTop,
              }}
              theme={theme}
            />
          </View>
        </View>
      </LinearGradient>

      <View
        style={[
          styles.body,
          {
            paddingHorizontal: theme.spacing.cardBodyHorizontal,
            paddingVertical: theme.spacing.cardBodyVertical,
          },
        ]}>
        <ComplaintInfoBlock
          label={STRINGS.staffComplaints.labels.complaintType}
          theme={theme}
          value={item.complaintType}
          valueNumberOfLines={complaintTypeLines}
        />
        <View style={{height: theme.spacing.cardSectionTop}} />
        <ComplaintInfoBlock
          label={STRINGS.staffComplaints.labels.description}
          theme={theme}
          value={item.complaintText}
          valueNumberOfLines={complaintBodyLines}
        />
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  body: {},
  card: {
    overflow: 'hidden',
    width: '100%',
  },
  header: {},
  metaColumn: {
    alignItems: 'flex-end',
    flexShrink: 0,
  },
  closeButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  titleColumn: {
    flex: 1,
  },
  topRow: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default memo(ComplaintCard);
