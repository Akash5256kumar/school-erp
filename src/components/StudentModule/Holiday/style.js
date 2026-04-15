import {StyleSheet} from 'react-native';

import {colors, radii, shadows, spacing, typography} from '../../../constants';
import * as constant from '../../../Utils/Constant';

export default StyleSheet.create({
  screen: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: spacing.lg,
  },
  calendarShell: {
    backgroundColor: constant.whiteColor,
    borderRadius: radii.lg,
    marginBottom: spacing.lg,
    padding: spacing.md,
    ...shadows.light,
  },
  calendarHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  calendarTitle: {
    color: colors.textPrimary,
    fontFamily: constant.typeSemiBold,
    fontSize: typography.fontLarge,
  },
  refreshChip: {
    backgroundColor: '#EAF1FF',
    borderRadius: radii.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
  },
  refreshChipText: {
    color: colors.primaryDark,
    fontFamily: constant.typeSemiBold,
    fontSize: typography.fontSmall,
  },
  calendar: {
    borderRadius: radii.md,
  },
  legendRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.md,
  },
  legendItem: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  legendDot: {
    borderRadius: 999,
    height: 10,
    marginRight: spacing.xs,
    width: 10,
  },
  legendText: {
    color: colors.textSecondary,
    fontFamily: constant.typeMedium,
    fontSize: typography.fontSmall,
  },
  detailsCard: {
    backgroundColor: constant.whiteColor,
    borderRadius: radii.lg,
    flex: 1,
    minHeight: 220,
    padding: spacing.lg,
    ...shadows.light,
  },
  detailsHeader: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  detailsTitle: {
    color: colors.textPrimary,
    flex: 1,
    fontFamily: constant.typeSemiBold,
    fontSize: typography.fontLarge,
  },
  detailsDate: {
    color: colors.info,
    fontFamily: constant.typeSemiBold,
    fontSize: typography.fontSmall,
    marginLeft: spacing.md,
    marginTop: spacing.xs,
  },
  holidayCard: {
    backgroundColor: '#FFF7FB',
    borderColor: '#F7D2E8',
    borderRadius: radii.md,
    borderWidth: 1,
    padding: spacing.md,
  },
  holidayCardHeader: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  holidayTitle: {
    color: colors.textPrimary,
    flex: 1,
    fontFamily: constant.typeSemiBold,
    fontSize: typography.fontMedium,
    marginRight: spacing.sm,
  },
  rangeBadge: {
    backgroundColor: '#FDE7F3',
    borderRadius: radii.pill,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
  rangeBadgeText: {
    color: '#B03079',
    fontFamily: constant.typeSemiBold,
    fontSize: typography.fontSmall,
  },
  holidayDescription: {
    color: colors.textSecondary,
    fontFamily: constant.typeRegular,
    fontSize: typography.fontRegular,
    lineHeight: typography.fontRegular * 1.5,
    marginTop: spacing.sm,
  },
  loaderWrap: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  emptyState: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
  },
  emptyStateTitle: {
    color: colors.textPrimary,
    fontFamily: constant.typeSemiBold,
    fontSize: typography.fontMedium,
    textAlign: 'center',
  },
  emptyStateText: {
    color: colors.textSecondary,
    fontFamily: constant.typeRegular,
    fontSize: typography.fontRegular,
    lineHeight: typography.fontRegular * 1.5,
    marginTop: spacing.sm,
    textAlign: 'center',
  },
  cardGap: {
    height: spacing.md,
  },
  footerGap: {
    height: spacing.sm,
  },
});
