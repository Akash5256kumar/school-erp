import React, {useCallback, useMemo, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Pressable,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import LinearGradient from 'react-native-linear-gradient';
import FastImage from 'react-native-fast-image';
import moment from 'moment';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {ChevronLeft, ChevronRight} from 'lucide-react-native';

import * as constant from '../../../Utils/Constant';
import {API_BASE_URL} from '../../../constants';
import {apiRequest, staffApiRequest} from '../../../Utils';
import {getPersistedAuthToken} from '../../../Utils/authSession';
import HomeNewsSection from '../../StudentModule/Home/HomeNewsSection';
import {
  areNewsItemsEqual,
  fetchNewsItems,
  NEWS_REFRESH_INTERVAL_MS,
} from '../../StudentModule/News/newsUtils';
import Header from './staffHeader';
import styles from './style';

LocaleConfig.locales.en = {
  monthNames: ['January','February','March','April','May','June','July','August','September','October','November','December'],
  monthNamesShort: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
  dayNames: ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
  dayNamesShort: ['S','M','T','W','T','F','S'],
  today: 'Today',
};
LocaleConfig.defaultLocale = 'en';

const WEEK_DAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
const HOLIDAY_COLOR = '#E35FAA';
const EVENT_COLOR  = '#01C7AE';
const BRAND_COLOR  = '#5E3BF9';

// ─── helpers ────────────────────────────────────────────────────────────────

const enumerateDateRange = (startDate, endDate) => {
  const start = moment(startDate, 'YYYY-MM-DD', true);
  const end   = moment(endDate || startDate, 'YYYY-MM-DD', true);
  if (!start.isValid()) { return []; }
  const finalEnd = end.isValid() && end.isSameOrAfter(start, 'day') ? end : start;
  const dates = [];
  const cursor = start.clone();
  while (cursor.isSameOrBefore(finalEnd, 'day')) {
    dates.push(cursor.format('YYYY-MM-DD'));
    cursor.add(1, 'day');
  }
  return dates;
};

const normalizeHoliday = item => {
  const parsedStart = moment(item?.holiday_date || '');
  const parsedEnd   = moment(item?.holiday_end_date || item?.holiday_date || '');
  const startDate   = parsedStart.isValid() ? parsedStart.format('YYYY-MM-DD') : '';
  const endDate     = parsedEnd.isValid()   ? parsedEnd.format('YYYY-MM-DD')   : startDate;
  return {
    description: item?.holiday_de || '',
    endDate,
    id: `holiday-${item?.id ?? `${startDate}-${item?.title || 'holiday'}`}`,
    startDate,
    title: item?.title || 'Holiday',
  };
};

const normalizeEvent = item => {
  const rawDate   = item?.event_time || item?.event_date || item?.date || item?.created_at || '';
  const parsedDate = moment(rawDate);
  return {
    ...item,
    className: item?.class_name || item?.std_class || item?.class || item?.event_class || '',
    date: parsedDate.isValid() ? parsedDate.format('YYYY-MM-DD') : '',
    description: item?.event_description || item?.description || '',
    id: `event-${item?.id ?? `${rawDate}-${item?.event_name || 'event'}`}`,
    raw: item,
    title: item?.event_name || item?.title || 'Event',
  };
};

const formatDateLabel = dateString => {
  const p = moment(dateString, 'YYYY-MM-DD', true);
  return p.isValid() ? p.format('DD MMM YYYY') : 'Date not available';
};

const formatHolidayLabel = holiday => {
  const start = moment(holiday.startDate, 'YYYY-MM-DD', true);
  const end   = moment(holiday.endDate || holiday.startDate, 'YYYY-MM-DD', true);
  if (!start.isValid()) { return 'Date not available'; }
  if (!end.isValid() || end.isSame(start, 'day')) { return start.format('DD MMM YYYY'); }
  return `${start.format('DD MMM')} - ${end.format('DD MMM YYYY')}`;
};

// ─── Quick Action data ───────────────────────────────────────────────────────

const ACTION_ITEMS = [
  {
    accentColor: '#2E7CF6', badge: 'Daily',
    badgeBackground: '#E8F1FF', badgeTextColor: '#2E7CF6',
    borderColor: '#CFE0FF', description: 'Mark & view class attendance',
    iconBackground: '#EEF5FF', key: 'attendance', label: 'Attendance',
    pic: constant.Icons.StaffAttendanceIcon, route: 'StaffAttendance',
  },
  {
    accentColor: '#F97316', badge: 'Report',
    badgeBackground: '#FFF0E6', badgeTextColor: '#F97316',
    borderColor: '#FFD9BC', description: 'Log student complaints',
    iconBackground: '#FFF5EE', key: 'complaint', label: 'Student Complaint',
    pic: constant.Icons.StudentComplaintIcon, route: 'StudentComplaint',
  },
  {
    accentColor: '#06B6D4', badge: 'Today',
    badgeBackground: '#E0F9FC', badgeTextColor: '#06B6D4',
    borderColor: '#B2EEF7', description: 'Assign & review homework',
    iconBackground: '#EDFCFF', key: 'homework', label: 'Homework',
    pic: constant.Icons.homeWorkIcon, route: 'StaffModuleHomeWork',
  },
  {
    accentColor: '#7B3FF6', badge: 'Study',
    badgeBackground: '#EDE9FF', badgeTextColor: '#5E3BF9',
    borderColor: '#D8CDFF', description: 'Share study materials',
    iconBackground: '#F5F4FF', key: 'notes', label: 'Notes',
    pic: constant.Icons.notesIcon1, route: 'StaffModuleNotes',
  },
  {
    accentColor: '#8B5CF6', badge: 'Plan',
    badgeBackground: '#EDE9FF', badgeTextColor: '#8B5CF6',
    borderColor: '#D8CDFF', description: 'Bi-weekly lesson planner',
    iconBackground: '#F5F0FF', key: 'planner', label: 'Fortnightly Planner',
    pic: constant.Icons.fornightlyplannericon1, route: 'StaffModuleFornightlyPlanner',
  },
  {
    accentColor: '#D97706', badge: 'Grades',
    badgeBackground: '#FEF3C7', badgeTextColor: '#D97706',
    borderColor: '#FDE68A', description: 'Publish results & grades',
    iconBackground: '#FFFBEB', key: 'grades', label: 'Result & Grades',
    pic: constant.Icons.gradesIcon, route: 'StaffModuleResultAndGrades',
  },
  {
    accentColor: '#2563EB', badge: 'Media',
    badgeBackground: '#DBEAFE', badgeTextColor: '#2563EB',
    borderColor: '#BFDBFE', description: 'Upload videos & resources',
    iconBackground: '#EFF6FF', key: 'multimedia', label: 'Multimedia',
    pic: constant.Icons.MultimediaIcon, route: 'StaffModuleMultiMedia',
  },
  {
    accentColor: '#10B981', badge: 'Track',
    badgeBackground: '#D1FAE5', badgeTextColor: '#10B981',
    borderColor: '#A7F3D0', description: 'Monitor student progress',
    iconBackground: '#ECFDF5', key: 'performance', label: 'Student Performance',
    pic: constant.Icons.studentperformanceIcon, route: 'StaffModuleStudentPerformance',
  },
];

// ─── Sub-components ──────────────────────────────────────────────────────────

const QuickActionCard = React.memo(({item, onPress}) => (
  <Pressable
    onPress={() => onPress(item)}
    style={[styles.qaCard, {borderColor: item.borderColor}]}>
    <View style={[styles.qaAccent, {backgroundColor: item.accentColor}]} />
    <View style={styles.qaTopRow}>
      <View style={[styles.qaIconWrap, {backgroundColor: item.iconBackground}]}>
        <FastImage
          resizeMode={FastImage.resizeMode.contain}
          source={item.pic}
          style={styles.qaImage}
        />
      </View>
      <View style={[styles.qaBadge, {backgroundColor: item.badgeBackground}]}>
        <Text style={[styles.qaBadgeText, {color: item.badgeTextColor}]}>{item.badge}</Text>
      </View>
    </View>
    <View style={styles.qaBody}>
      <Text style={styles.qaLabel}>{item.label}</Text>
      <Text style={styles.qaDescription}>{item.description}</Text>
    </View>
    <View style={styles.qaFooter}>
      <Text style={[styles.qaFooterText, {color: item.accentColor}]}>Tap to open</Text>
    </View>
  </Pressable>
));

// ─── Main component ──────────────────────────────────────────────────────────

const StaffHome = () => {
  const navigation = useNavigation();

  const todayString = useMemo(() => moment().format('YYYY-MM-DD'), []);
  const todayMonthStart = useMemo(
    () => moment(todayString, 'YYYY-MM-DD', true).startOf('month').format('YYYY-MM-DD'),
    [todayString],
  );

  // calendar tab: 'holidays' | 'events'
  const [activeTab, setActiveTab]           = useState('holidays');
  const [currentMonth, setCurrentMonth]     = useState(todayMonthStart);
  const [selectedDate, setSelectedDate]     = useState(todayString);
  const [calendarLoading, setCalendarLoading] = useState(false);
  const [calendarError, setCalendarError]   = useState('');
  const [holidayItems, setHolidayItems]     = useState([]);
  const [eventItems, setEventItems]         = useState([]);
  const [calendarKey, setCalendarKey]       = useState(0);
  const [newsItems, setNewsItems]           = useState([]);
  const [newsLoading, setNewsLoading]       = useState(false);
  const [refreshing, setRefreshing]         = useState(false);
  const hasInitializedCalendarRef           = useRef(false);
  const hasLoadedNewsRef                    = useRef(false);
  const calendarRequestIdRef                = useRef(0);
  const newsRequestIdRef                    = useRef(0);

  // ── derived data ────────────────────────────────────────────────

  const calendarEntries = useMemo(() => {
    const nextEntries = {};
    holidayItems.forEach(holiday => {
      enumerateDateRange(holiday.startDate, holiday.endDate).forEach(date => {
        if (!nextEntries[date]) { nextEntries[date] = {events: [], holidays: []}; }
        nextEntries[date].holidays.push(holiday);
      });
    });
    eventItems.forEach(event => {
      if (!event.date) { return; }
      if (!nextEntries[event.date]) { nextEntries[event.date] = {events: [], holidays: []}; }
      nextEntries[event.date].events.push(event);
    });
    return nextEntries;
  }, [eventItems, holidayItems]);

  const currentMonthStart = useMemo(
    () => moment(currentMonth, 'YYYY-MM-DD', true).startOf('month'),
    [currentMonth],
  );

  // Only show markers relevant to the active tab
  const visibleMarkedDates = useMemo(() => {
    const result = {};
    Object.entries(calendarEntries).forEach(([date, entry]) => {
      const parsedDate = moment(date, 'YYYY-MM-DD', true);
      if (!parsedDate.isValid() || !parsedDate.isSame(currentMonthStart, 'month')) { return; }
      const hasHoliday = entry.holidays.length > 0;
      const hasEvent   = entry.events.length > 0;
      if (activeTab === 'holidays' && !hasHoliday) { return; }
      if (activeTab === 'events'   && !hasEvent)   { return; }
      result[date] = {
        hasEvent,
        hasHoliday,
        marked: true,
      };
    });
    return result;
  }, [activeTab, calendarEntries, currentMonthStart]);

  const calendarInstanceKey = useMemo(
    () => `${calendarKey}-${activeTab}-${currentMonthStart.format('YYYY-MM-DD')}`,
    [activeTab, calendarKey, currentMonthStart],
  );

  const selectedDateEntries = useMemo(
    () => calendarEntries[selectedDate] || {events: [], holidays: []},
    [calendarEntries, selectedDate],
  );

  // entries to show below calendar based on active tab
  const selectedTabEntries = useMemo(() => {
    if (activeTab === 'holidays') { return selectedDateEntries.holidays; }
    return selectedDateEntries.events;
  }, [activeTab, selectedDateEntries]);

  // ── API calls ────────────────────────────────────────────────────

  const loadNews = useCallback(async ({showLoader = false} = {}) => {
    const requestId = newsRequestIdRef.current + 1;
    newsRequestIdRef.current = requestId;

    try {
      if (showLoader) {
        setNewsLoading(true);
      }

      const items = await fetchNewsItems(staffApiRequest);

      if (requestId !== newsRequestIdRef.current) {
        return;
      }

      setNewsItems(previousItems =>
        areNewsItemsEqual(previousItems, items) ? previousItems : items,
      );
    } catch {
      if (requestId !== newsRequestIdRef.current) {
        return;
      }

      setNewsItems([]);
    } finally {
      if (requestId === newsRequestIdRef.current) {
        hasLoadedNewsRef.current = true;
        setNewsLoading(false);
      }
    }
  }, []);

  const loadCalendarItems = useCallback(async ({isRefresh = false} = {}) => {
    const requestId = calendarRequestIdRef.current + 1;
    calendarRequestIdRef.current = requestId;

    try {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setCalendarLoading(true);
      }

      setCalendarError('');
      setHolidayItems([]);
      setEventItems([]);

      const authToken   = await getPersistedAuthToken();
      const authHeaders = authToken ? {Authorization: authToken} : {};

      const holidayRequest = fetch(`${API_BASE_URL}viewholiday`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          ...(authToken ? {Authorization: authToken} : {}),
          'Content-Type': 'multipart/form-data',
        },
      }).then(async res => {
        const json = await res.json();
        if (!res.ok || json?.status === false) {
          const err = new Error(json?.message || res.statusText || 'Unable to load holidays.');
          err.status = res.status; err.data = json; throw err;
        }
        return json;
      });

      const [holidayResult, eventResult] = await Promise.allSettled([
        holidayRequest,
        apiRequest('get-event', 'GET', null, authHeaders),
      ]);

      const holidayResponse = holidayResult.status === 'fulfilled' ? holidayResult.value : null;
      const eventResponse   = eventResult.status   === 'fulfilled' ? eventResult.value   : null;

      const isActiveItem = item => {
        const v = item?.isActive;
        if (v === undefined || v === null) { return true; }
        return String(v) !== '0' && v !== false;
      };

      const holidayRawList = Array.isArray(holidayResponse?.data)
        ? holidayResponse.data
        : Array.isArray(holidayResponse) ? holidayResponse : [];

      const nextHolidayItems = holidayRawList
        .filter(isActiveItem).map(normalizeHoliday)
        .filter(item => item.startDate)
        .sort((a, b) => a.startDate.localeCompare(b.startDate));

      const rawEventData  = eventResponse?.data ?? eventResponse;
      const rawEventItems = Array.isArray(rawEventData)
        ? rawEventData
        : [
            ...(Array.isArray(rawEventData?.upcoming) ? rawEventData.upcoming : []),
            ...(Array.isArray(rawEventData?.past)     ? rawEventData.past     : []),
          ];

      const nextEventItems = rawEventItems
        .filter(isActiveItem).map(normalizeEvent)
        .filter(item => item.date)
        .sort((a, b) => a.date.localeCompare(b.date));

      if (requestId !== calendarRequestIdRef.current) {
        return;
      }

      setHolidayItems(nextHolidayItems);
      setEventItems(nextEventItems);

      if (!hasInitializedCalendarRef.current) {
        setSelectedDate(todayString);
        setCurrentMonth(todayMonthStart);
        hasInitializedCalendarRef.current = true;
      }
      setCalendarKey(k => k + 1);

      if (!nextHolidayItems.length && !nextEventItems.length) {
        setCalendarError('No holidays or events available right now.');
      } else if (holidayResult.status === 'rejected' && eventResult.status === 'rejected') {
        setCalendarError('Unable to load holidays and events right now.');
      }
    } catch {
      if (requestId !== calendarRequestIdRef.current) {
        return;
      }

      setHolidayItems([]);
      setEventItems([]);
      setCalendarError('Unable to load holidays and events right now.');
    } finally {
      if (requestId === calendarRequestIdRef.current) {
        setCalendarLoading(false);
        setRefreshing(false);
      }
    }
  }, [todayMonthStart, todayString]);

  useFocusEffect(
    useCallback(() => {
      loadCalendarItems();
      loadNews({showLoader: !hasLoadedNewsRef.current});

      const intervalId = setInterval(() => {
        loadNews();
      }, NEWS_REFRESH_INTERVAL_MS);

      return () => {
        clearInterval(intervalId);
      };
    }, [loadCalendarItems, loadNews]),
  );

  // ── handlers ─────────────────────────────────────────────────────

  const handleMonthChange = useCallback(monthValue => {
    setCurrentMonth(
      moment(monthValue, 'YYYY-MM-DD', true).startOf('month').format('YYYY-MM-DD'),
    );
  }, []);

  const handleDatePress = useCallback(dateString => {
    setSelectedDate(dateString);
  }, []);

  const handleOpenEventDetails = useCallback(
    item => {
      navigation.navigate('EventDetail', {
        eventItem: item?.raw || item,
      });
    },
    [navigation],
  );

  const handleRefresh = useCallback(() => {
    loadCalendarItems({isRefresh: true});
    loadNews();
  }, [loadCalendarItems, loadNews]);

  // ── calendar sub-renders ─────────────────────────────────────────

  const renderCalendarHeader = () => (
    <View style={styles.calendarHeader}>
      <Text style={styles.calendarHeaderTitle}>
        {moment(currentMonth).format('MMMM YYYY')}
      </Text>
      <View style={styles.calendarHeaderActions}>
        <TouchableOpacity
          accessibilityRole="button"
          onPress={() => handleMonthChange(moment(currentMonth).subtract(1, 'month').format('YYYY-MM-DD'))}
          style={styles.calendarArrowButton}>
          <ChevronLeft color={BRAND_COLOR} size={18} strokeWidth={2.5} />
        </TouchableOpacity>
        <TouchableOpacity
          accessibilityRole="button"
          onPress={() => handleMonthChange(moment(currentMonth).add(1, 'month').format('YYYY-MM-DD'))}
          style={styles.calendarArrowButton}>
          <ChevronRight color={BRAND_COLOR} size={18} strokeWidth={2.5} />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderCalendarDay = useCallback(
    ({date, marking}) => {
      const dateString = date?.dateString;
      const dayEntries = dateString ? calendarEntries[dateString] : null;
      const hasHoliday = Boolean(marking?.hasHoliday ?? dayEntries?.holidays?.length);
      const hasEvent   = Boolean(marking?.hasEvent   ?? dayEntries?.events?.length);
      const isMarked   = activeTab === 'holidays' ? hasHoliday : hasEvent;
      const dotColor   = activeTab === 'holidays' ? HOLIDAY_COLOR : EVENT_COLOR;
      const isSelected = dateString === selectedDate;
      const isToday    = dateString === moment().format('YYYY-MM-DD');

      return (
        <TouchableOpacity
          accessibilityRole="button"
          onPress={() => handleDatePress(dateString)}
          style={styles.calendarDayCell}>
          <View style={[
            styles.calendarDay,
            isSelected && styles.calendarDaySelected,
          ]}>
            <Text style={[
              styles.calendarDayText,
              isToday && !isSelected && styles.calendarDayTextToday,
              isSelected && styles.calendarDayTextSelected,
            ]}>
              {date?.day}
            </Text>
          </View>
          {isMarked && (
            <View style={[styles.calendarDot, {backgroundColor: dotColor}]} />
          )}
        </TouchableOpacity>
      );
    },
    [activeTab, calendarEntries, handleDatePress, selectedDate],
  );

  // ── selected date detail panel ───────────────────────────────────

  const renderSelectedDatePanel = () => {
    const day   = moment(selectedDate, 'YYYY-MM-DD');

    return (
      <View style={styles.datePanelCard}>
        <View style={styles.datePanelHeader}>
          <Text style={styles.datePanelDay}>{day.isValid() ? day.format('Do') : ''}</Text>
          <Text style={styles.datePanelMonth}>{day.isValid() ? day.format('MMMM') : ''}</Text>
        </View>

        {calendarLoading || refreshing ? (
          <ActivityIndicator color={BRAND_COLOR} size="small" style={{marginTop: 12}} />
        ) : selectedTabEntries.length === 0 ? (
          <Text style={styles.datePanelEmpty}>
            No {activeTab === 'holidays' ? 'holidays' : 'events'} on this date.
          </Text>
        ) : (
          selectedTabEntries.map(item => (
            activeTab === 'holidays' ? (
              <View
                key={item.id}
                style={[
                  styles.datePanelItem,
                  {borderLeftColor: HOLIDAY_COLOR},
                ]}>
                <Text style={styles.datePanelItemTitle}>{item.title}</Text>
                {item.description ? (
                  <Text style={styles.datePanelItemDesc}>{item.description}</Text>
                ) : null}
                <Text style={styles.datePanelItemMeta}>{formatHolidayLabel(item)}</Text>
              </View>
            ) : (
              <Pressable
                key={item.id}
                accessibilityRole="button"
                onPress={() => handleOpenEventDetails(item)}
                style={({pressed}) => pressed && styles.datePanelItemPressed}>
                <View
                  style={[
                    styles.datePanelItem,
                    {borderLeftColor: EVENT_COLOR},
                  ]}>
                  <View style={styles.datePanelItemTopRow}>
                    <Text style={styles.datePanelItemTitle}>{item.title}</Text>
                    <Text style={styles.datePanelItemAction}>View details</Text>
                  </View>
                  {item.description ? (
                    <Text style={styles.datePanelItemDesc}>{item.description}</Text>
                  ) : null}
                  <Text style={styles.datePanelItemMeta}>{formatDateLabel(item.date)}</Text>
                  {item.className ? (
                    <Text style={styles.datePanelItemClass}>Class: {item.className}</Text>
                  ) : null}
                </View>
              </Pressable>
            )
          ))
        )}
      </View>
    );
  };

  // ── counts below calendar ────────────────────────────────────────

  const renderCounts = () => (
    <View style={styles.countsRow}>
      <View style={styles.countCard}>
        <Text style={styles.countLabel}>Holidays</Text>
        <View style={[styles.countBubble, {backgroundColor: HOLIDAY_COLOR}]}>
          <Text style={styles.countValue}>{holidayItems.length}</Text>
        </View>
      </View>
      <View style={styles.countCard}>
        <Text style={styles.countLabel}>Events</Text>
        <View style={[styles.countBubble, {backgroundColor: EVENT_COLOR}]}>
          <Text style={styles.countValue}>{eventItems.length}</Text>
        </View>
      </View>
      <View style={styles.countCard}>
        <Text style={styles.countLabel}>News</Text>
        <View style={[styles.countBubble, {backgroundColor: BRAND_COLOR}]}>
          <Text style={styles.countValue}>{newsItems.length}</Text>
        </View>
      </View>
    </View>
  );

  // ── main render ──────────────────────────────────────────────────

  return (
    <View style={styles.screen}>
      <Header />
      <ScrollView
        alwaysBounceVertical
        bounces
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl
            onRefresh={handleRefresh}
            refreshing={refreshing}
            tintColor={BRAND_COLOR}
            colors={[BRAND_COLOR]}
          />
        }
        showsVerticalScrollIndicator={false}>
        <View style={styles.content}>

          {/* ── Tabs ── */}
          <View style={styles.tabRow}>
            <TouchableOpacity
              accessibilityRole="tab"
              onPress={() => setActiveTab('holidays')}
              style={[styles.tab, activeTab === 'holidays' && styles.tabActive]}>
              <Text style={[styles.tabText, activeTab === 'holidays' && styles.tabTextActive]}>
                Holidays
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              accessibilityRole="tab"
              onPress={() => setActiveTab('events')}
              style={[styles.tab, activeTab === 'events' && styles.tabActive]}>
              <Text style={[styles.tabText, activeTab === 'events' && styles.tabTextActive]}>
                Events
              </Text>
            </TouchableOpacity>
          </View>

          {/* ── Calendar card ── */}
          <View style={styles.calendarCard}>
            {renderCalendarHeader()}
            <View style={styles.calendarWeekdaysRow}>
              {WEEK_DAYS.map((day, i) => (
                <View key={`${day}-${i}`} style={styles.calendarWeekdayCell}>
                  <Text style={styles.calendarWeekdayText}>{day}</Text>
                </View>
              ))}
            </View>
            <Calendar
              current={currentMonth}
              dayComponent={renderCalendarDay}
              key={calendarInstanceKey}
              disableAllTouchEventsForDisabledDays
              firstDay={0}
              hideArrows
              hideDayNames
              hideExtraDays
              markedDates={visibleMarkedDates}
              markingType="multi-dot"
              onDayPress={day => handleDatePress(day.dateString)}
              onMonthChange={month =>
                handleMonthChange(`${month.year}-${String(month.month).padStart(2, '0')}-01`)
              }
              renderHeader={() => null}
              showSixWeeks={false}
              style={styles.calendar}
              theme={{
                calendarBackground: constant.whiteColor,
                dayTextColor: '#374151',
                textDisabledColor: '#D1D5DB',
              }}
            />
            {calendarError ? (
              <Text style={styles.calendarFeedbackError}>{calendarError}</Text>
            ) : null}
          </View>

          {/* ── Selected date detail (inline, no modal) ── */}
          {renderSelectedDatePanel()}

          {/* ── Counts below section ── */}
          {renderCounts()}

          {/* ── News section ── */}
          <View style={styles.sectionTitleRow}>
            <Text style={styles.sectionTitle}>Latest News</Text>
            <TouchableOpacity
              accessibilityRole="button"
              onPress={() => navigation.navigate('News')}>
              <Text style={styles.sectionViewAll}>View All</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.newsCard}>
            <HomeNewsSection
              items={newsItems}
              loading={newsLoading}
              onPressItem={newsItem => navigation.navigate('NewsDetail', {newsItem})}
              onPressViewAll={() => navigation.navigate('News')}
              showHeader={false}
            />
          </View>

          {/* ── Quick Actions ── */}
          <View style={styles.sectionTitleRow}>
            <Text style={styles.sectionTitle}>Quick Actions</Text>
          </View>
          <View style={styles.qaGrid}>
            {ACTION_ITEMS.map(item => (
              <QuickActionCard
                item={item}
                key={item.key}
                onPress={i => navigation.navigate(i.route)}
              />
            ))}
          </View>

        </View>
      </ScrollView>
    </View>
  );
};

export default StaffHome;
