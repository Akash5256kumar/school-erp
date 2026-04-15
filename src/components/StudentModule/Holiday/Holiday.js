import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';
import useStudentAuth from '../../../store/hooks/useStudentAuth';

import Header from '../../Header/Header';
import * as myConst from '../../Baseurl';
import styles from './style';
import * as constant from '../../../Utils/Constant';

LocaleConfig.locales.en = {
  monthNames: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
  monthNamesShort: [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ],
  dayNames: [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ],
  dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  today: 'Today',
};

LocaleConfig.defaultLocale = 'en';

const HOLIDAY_COLOR = '#E35FAA';
const SELECTED_COLOR = '#0747A6';

const enumerateDateRange = (startDate, endDate) => {
  const start = moment(startDate, 'YYYY-MM-DD', true);
  const end = moment(endDate || startDate, 'YYYY-MM-DD', true);

  if (!start.isValid()) {
    return [];
  }

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
  const startDate = item?.holiday_date || '';
  const endDate = item?.holiday_end_date || startDate;

  return {
    description: item?.holiday_de || '',
    endDate,
    id: String(item?.id ?? `${startDate}-${item?.title || 'holiday'}`),
    isActive: item?.isActive,
    raw: item,
    startDate,
    title: item?.title || 'Holiday',
  };
};

const buildMarkedDates = (holidays, selectedDate) => {
  const marked = {};

  holidays.forEach(holiday => {
    const dates = enumerateDateRange(holiday.startDate, holiday.endDate);

    dates.forEach((date, index) => {
      if (marked[date]) {
        return;
      }

      const isSingleDay = dates.length === 1;
      marked[date] = {
        color: HOLIDAY_COLOR,
        endingDay: isSingleDay || index === dates.length - 1,
        startingDay: isSingleDay || index === 0,
        textColor: constant.whiteColor,
      };
    });
  });

  if (selectedDate) {
    marked[selectedDate] = {
      ...(marked[selectedDate] || {}),
      selected: true,
      selectedColor: SELECTED_COLOR,
    };
  }

  return marked;
};

const isDateWithinHoliday = (holiday, dateString) => {
  const selected = moment(dateString, 'YYYY-MM-DD', true);
  const start = moment(holiday.startDate, 'YYYY-MM-DD', true);
  const end = moment(holiday.endDate || holiday.startDate, 'YYYY-MM-DD', true);

  if (!selected.isValid() || !start.isValid()) {
    return false;
  }

  const finalEnd = end.isValid() && end.isSameOrAfter(start, 'day') ? end : start;
  return selected.isBetween(start, finalEnd, 'day', '[]');
};

const formatHolidayRange = (holiday, selectedDate) => {
  const start = moment(holiday.startDate, 'YYYY-MM-DD', true);
  const end = moment(holiday.endDate || holiday.startDate, 'YYYY-MM-DD', true);

  if (!start.isValid()) {
    return 'Date not available';
  }

  if (!end.isValid() || end.isSame(start, 'day')) {
    return start.format('DD MMM YYYY');
  }

  if (
    selectedDate &&
    moment(selectedDate, 'YYYY-MM-DD', true).isValid() &&
    isDateWithinHoliday(holiday, selectedDate)
  ) {
    return `${start.format('DD MMM')} - ${end.format('DD MMM YYYY')}`;
  }

  return `${start.format('DD MMM')} - ${end.format('DD MMM YYYY')}`;
};

const Holiday = ({navigation}) => {
  const {token: usertoken} = useStudentAuth();
  const [loading, setLoading] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(moment().format('YYYY-MM-DD'));
  const [selectedDate, setSelectedDate] = useState(moment().format('YYYY-MM-DD'));
  const [holidays, setHolidays] = useState([]);

  const loadHolidays = useCallback(() => {
    setLoading(true);

    fetch(myConst.BASEURL + 'viewholiday', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Authorization': usertoken,
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(response => response.json())
      .then(responseJson => {
        const responseItems = Array.isArray(responseJson?.data)
          ? responseJson.data
          : [];
        const nextHolidays = responseItems
          .filter(item => Number(item?.isActive ?? 1) !== 0)
          .map(normalizeHoliday)
          .sort((a, b) => a.startDate.localeCompare(b.startDate));

        setHolidays(nextHolidays);
        setSelectedDate(previousDate => {
          const hasSelectedDateHoliday = nextHolidays.some(holiday =>
            isDateWithinHoliday(holiday, previousDate),
          );

          if (hasSelectedDateHoliday || !nextHolidays.length) {
            return previousDate;
          }

          return nextHolidays[0].startDate;
        });
        setCurrentMonth(previousMonth =>
          nextHolidays.length ? nextHolidays[0].startDate : previousMonth,
        );
      })
      .catch(error => console.log('viewholiday error', error))
      .finally(() => setLoading(false));
  }, [usertoken]);

  useEffect(() => {
    loadHolidays();
  }, [loadHolidays]);

  const markedDates = useMemo(
    () => buildMarkedDates(holidays, selectedDate),
    [holidays, selectedDate],
  );

  const selectedHolidayItems = useMemo(
    () => holidays.filter(holiday => isDateWithinHoliday(holiday, selectedDate)),
    [holidays, selectedDate],
  );

  const renderHolidayCard = ({item}) => (
    <View style={styles.holidayCard}>
      <View style={styles.holidayCardHeader}>
        <Text numberOfLines={1} style={styles.holidayTitle}>
          {item.title}
        </Text>
        <View style={styles.rangeBadge}>
          <Text style={styles.rangeBadgeText}>
            {formatHolidayRange(item, selectedDate)}
          </Text>
        </View>
      </View>

      <Text style={styles.holidayDescription}>
        {item.description || 'Holiday description not available.'}
      </Text>
    </View>
  );

  return (
    <LinearGradient colors={['#EFF6FF', '#FFFFFF']} style={styles.screen}>
      <Header goBack={() => navigation.goBack()} title="Holiday Calendar" />

      <View style={styles.container}>
        <View style={styles.calendarShell}>
          <View style={styles.calendarHeader}>
            <Text style={styles.calendarTitle}>All Holidays</Text>
            <TouchableOpacity onPress={loadHolidays} style={styles.refreshChip}>
              <Text style={styles.refreshChipText}>Refresh</Text>
            </TouchableOpacity>
          </View>

          <Calendar
            current={currentMonth}
            enableSwipeMonths
            firstDay={0}
            markingType="period"
            markedDates={markedDates}
            monthFormat="MMMM yyyy"
            onDayPress={day => setSelectedDate(day.dateString)}
            onMonthChange={month =>
              setCurrentMonth(
                `${month.year}-${String(month.month).padStart(2, '0')}-01`,
              )
            }
            style={styles.calendar}
            theme={{
              arrowColor: constant.Blue,
              calendarBackground: constant.whiteColor,
              dayTextColor: constant.blackColor,
              monthTextColor: constant.blackColor,
              selectedDayBackgroundColor: SELECTED_COLOR,
              selectedDayTextColor: constant.whiteColor,
              textDayFontFamily: constant.typeMedium,
              textDayHeaderFontFamily: constant.typeSemiBold,
              textDisabledColor: '#CBD5E1',
              textMonthFontFamily: constant.typeSemiBold,
            }}
          />

          <View style={styles.legendRow}>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, {backgroundColor: HOLIDAY_COLOR}]} />
              <Text style={styles.legendText}>Holiday range</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, {backgroundColor: SELECTED_COLOR}]} />
              <Text style={styles.legendText}>Selected date</Text>
            </View>
          </View>
        </View>

        <View style={styles.detailsCard}>
          <View style={styles.detailsHeader}>
            <Text style={styles.detailsTitle}>Holiday Details</Text>
            <Text style={styles.detailsDate}>
              {moment(selectedDate).format('DD MMM YYYY')}
            </Text>
          </View>

          {loading ? (
            <View style={styles.loaderWrap}>
              <ActivityIndicator color={constant.Blue} size="large" />
            </View>
          ) : selectedHolidayItems.length ? (
            <FlatList
              data={selectedHolidayItems}
              keyExtractor={item => item.id}
              renderItem={renderHolidayCard}
              showsVerticalScrollIndicator={false}
              ItemSeparatorComponent={() => <View style={styles.cardGap} />}
              ListFooterComponent={() => <View style={styles.footerGap} />}
            />
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateTitle}>No holiday on this date</Text>
              <Text style={styles.emptyStateText}>
                Tap any marked date on the calendar to view its holiday details.
              </Text>
            </View>
          )}
        </View>
      </View>
    </LinearGradient>
  );
};

export default Holiday;
