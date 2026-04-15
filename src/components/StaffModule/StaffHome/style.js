import {StyleSheet} from 'react-native';
import * as constant from '../../../Utils/Constant';

const BRAND = '#5E3BF9';

export default StyleSheet.create({
  // ── Screen ────────────────────────────────────────────────────────
  screen: {
    backgroundColor: '#F4F2FF',
    flex: 1,
  },
  scrollContent: {},
  content: {
    paddingBottom: 120,
    paddingHorizontal: 16,
    paddingTop: 18,
  },

  // ── Tabs ──────────────────────────────────────────────────────────
  tabRow: {
    backgroundColor: '#EBEBF5',
    borderRadius: 14,
    flexDirection: 'row',
    marginBottom: 14,
    padding: 4,
  },
  tab: {
    alignItems: 'center',
    borderRadius: 11,
    flex: 1,
    paddingVertical: 9,
  },
  tabActive: {
    backgroundColor: constant.whiteColor,
    elevation: 3,
    shadowColor: '#5E3BF9',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  tabText: {
    color: '#9CA3AF',
    fontFamily: constant.typeMedium,
    fontSize: constant.font14,
  },
  tabTextActive: {
    color: '#1E1B4B',
    fontFamily: constant.typeSemiBold,
  },

  // ── Calendar card ─────────────────────────────────────────────────
  calendarCard: {
    backgroundColor: constant.whiteColor,
    borderRadius: 20,
    elevation: 4,
    marginBottom: 12,
    overflow: 'hidden',
    paddingBottom: 12,
    paddingHorizontal: 12,
    paddingTop: 14,
    shadowColor: '#7C5CF6',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 12,
  },
  calendarHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 14,
    paddingHorizontal: 4,
  },
  calendarHeaderTitle: {
    color: '#1E1B4B',
    fontFamily: constant.typeSemiBold,
    fontSize: constant.font16,
  },
  calendarHeaderActions: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 6,
  },
  calendarArrowButton: {
    alignItems: 'center',
    backgroundColor: '#F0EEFF',
    borderRadius: 10,
    height: 32,
    justifyContent: 'center',
    width: 32,
  },
  calendarWeekdaysRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 6,
  },
  calendarWeekdayCell: {
    alignItems: 'center',
    flex: 1,
  },
  calendarWeekdayText: {
    color: '#9CA3AF',
    fontFamily: constant.typeMedium,
    fontSize: 12,
    textAlign: 'center',
  },
  calendar: {
    borderRadius: 12,
  },
  calendarDayCell: {
    alignItems: 'center',
    paddingVertical: 3,
  },
  calendarDay: {
    alignItems: 'center',
    borderRadius: 20,
    height: 34,
    justifyContent: 'center',
    width: 34,
  },
  calendarDaySelected: {
    backgroundColor: BRAND,
  },
  calendarDayText: {
    color: '#374151',
    fontFamily: constant.typeRegular,
    fontSize: 13,
  },
  calendarDayTextToday: {
    color: BRAND,
    fontFamily: constant.typeSemiBold,
  },
  calendarDayTextSelected: {
    color: constant.whiteColor,
    fontFamily: constant.typeSemiBold,
  },
  calendarDot: {
    borderRadius: 999,
    height: 5,
    marginTop: 2,
    width: 5,
  },
  calendarFeedbackError: {
    color: '#DC2626',
    fontFamily: constant.typeMedium,
    fontSize: 12,
    marginTop: 10,
    textAlign: 'center',
  },

  // ── Selected date panel ───────────────────────────────────────────
  datePanelCard: {
    backgroundColor: constant.whiteColor,
    borderRadius: 18,
    elevation: 3,
    marginBottom: 14,
    padding: 16,
    shadowColor: '#7C5CF6',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.08,
    shadowRadius: 10,
  },
  datePanelHeader: {
    alignItems: 'baseline',
    flexDirection: 'row',
    gap: 6,
    marginBottom: 12,
  },
  datePanelDay: {
    color: '#1E1B4B',
    fontFamily: constant.typeBold,
    fontSize: 22,
  },
  datePanelMonth: {
    color: '#6B7280',
    fontFamily: constant.typeMedium,
    fontSize: 15,
  },
  datePanelEmpty: {
    color: '#9CA3AF',
    fontFamily: constant.typeRegular,
    fontSize: 13,
    paddingVertical: 8,
    textAlign: 'center',
  },
  datePanelItem: {
    borderLeftWidth: 3,
    borderRadius: 10,
    backgroundColor: '#FAFAFA',
    marginBottom: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  datePanelItemPressed: {
    opacity: 0.9,
  },
  datePanelItemTopRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'space-between',
  },
  datePanelItemTitle: {
    color: '#1E1B4B',
    fontFamily: constant.typeSemiBold,
    fontSize: 14,
    flex: 1,
  },
  datePanelItemAction: {
    color: BRAND,
    fontFamily: constant.typeSemiBold,
    fontSize: 11,
  },
  datePanelItemDesc: {
    color: '#6B7280',
    fontFamily: constant.typeRegular,
    fontSize: 12,
    lineHeight: 18,
    marginTop: 4,
  },
  datePanelItemMeta: {
    color: '#9CA3AF',
    fontFamily: constant.typeMedium,
    fontSize: 11,
    marginTop: 4,
  },
  datePanelItemClass: {
    color: '#0F766E',
    fontFamily: constant.typeSemiBold,
    fontSize: 11,
    marginTop: 3,
  },

  // ── Counts row ────────────────────────────────────────────────────
  countsRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },
  countCard: {
    backgroundColor: constant.whiteColor,
    borderRadius: 16,
    elevation: 3,
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 14,
    shadowColor: '#7C5CF6',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  countLabel: {
    color: '#6B7280',
    fontFamily: constant.typeMedium,
    fontSize: 12,
    marginBottom: 8,
  },
  countBubble: {
    alignItems: 'center',
    borderRadius: 999,
    height: 36,
    justifyContent: 'center',
    width: 36,
  },
  countValue: {
    color: constant.whiteColor,
    fontFamily: constant.typeBold,
    fontSize: 14,
  },

  // ── Section title row ─────────────────────────────────────────────
  sectionTitleRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    marginTop: 4,
  },
  sectionTitle: {
    color: '#1E1B4B',
    fontFamily: constant.typeSemiBold,
    fontSize: constant.font18,
  },
  sectionViewAll: {
    color: BRAND,
    fontFamily: constant.typeSemiBold,
    fontSize: constant.font13,
  },

  // ── News card ─────────────────────────────────────────────────────
  newsCard: {
    backgroundColor: constant.whiteColor,
    borderRadius: 20,
    elevation: 4,
    marginBottom: 22,
    overflow: 'hidden',
    paddingVertical: 12,
    shadowColor: '#7C5CF6',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 12,
  },

  // ── Quick Action cards ────────────────────────────────────────────
  qaGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'space-between',
  },
  qaCard: {
    backgroundColor: constant.whiteColor,
    borderRadius: constant.resW(3.5),
    borderWidth: 1,
    elevation: 2,
    overflow: 'hidden',
    paddingBottom: constant.resW(3),
    paddingHorizontal: constant.resW(3),
    paddingTop: constant.resW(3),
    shadowColor: '#0F172A',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.06,
    shadowRadius: 10,
    width: '47.5%',
  },
  qaAccent: {
    borderRadius: constant.resW(1),
    height: constant.resW(1),
    marginBottom: constant.resW(2.5),
    width: constant.resW(12),
  },
  qaTopRow: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  qaIconWrap: {
    alignItems: 'center',
    borderRadius: constant.resW(4),
    height: constant.resW(18),
    justifyContent: 'center',
    width: constant.resW(18),
  },
  qaImage: {
    height: constant.resW(12),
    width: constant.resW(12),
  },
  qaBadge: {
    alignItems: 'center',
    borderRadius: constant.resW(5),
    justifyContent: 'center',
    paddingHorizontal: constant.resW(2.2),
    paddingVertical: constant.resW(0.9),
  },
  qaBadgeText: {
    fontFamily: constant.typeSemiBold,
    fontSize: constant.font10,
  },
  qaBody: {
    marginTop: constant.resW(3),
  },
  qaLabel: {
    color: '#1E1B4B',
    fontFamily: constant.typeSemiBold,
    fontSize: constant.font14,
    lineHeight: constant.resW(5.5),
  },
  qaDescription: {
    color: '#6B7280',
    fontFamily: constant.typeMedium,
    fontSize: constant.font11,
    lineHeight: constant.resW(4.5),
    marginTop: constant.resW(1),
  },
  qaFooter: {
    marginTop: constant.resW(2.5),
  },
  qaFooterText: {
    fontFamily: constant.typeSemiBold,
    fontSize: constant.font12,
  },

  // ── Month picker modal ────────────────────────────────────────────
  pickerBackdrop: {
    alignItems: 'center',
    backgroundColor: 'rgba(15, 23, 42, 0.45)',
    flex: 1,
    justifyContent: 'center',
  },
  pickerCard: {
    backgroundColor: '#EDE9FE',
    borderRadius: 24,
    paddingBottom: 20,
    paddingHorizontal: 16,
    paddingTop: 16,
    width: 280,
  },
  pickerYearRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    paddingHorizontal: 4,
  },
  pickerYearArrow: {
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.4)',
    borderRadius: 20,
    height: 36,
    justifyContent: 'center',
    width: 36,
  },
  pickerYearText: {
    color: '#4C1D95',
    fontFamily: constant.typeSemiBold,
    fontSize: 18,
  },
  pickerMonthGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 8,
  },
  pickerMonthCell: {
    alignItems: 'center',
    borderRadius: 12,
    justifyContent: 'center',
    paddingVertical: 10,
    width: '23%',
  },
  pickerMonthCellActive: {
    backgroundColor: BRAND,
  },
  pickerMonthText: {
    color: '#4C1D95',
    fontFamily: constant.typeMedium,
    fontSize: 13,
  },
  pickerMonthTextActive: {
    color: constant.whiteColor,
    fontFamily: constant.typeSemiBold,
  },
});
