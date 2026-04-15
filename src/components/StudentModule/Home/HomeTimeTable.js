import React, {useEffect, useMemo, useState} from 'react';
import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Snackbar from 'react-native-snackbar';
import moment from 'moment';

import * as constant from '../../../Utils/Constant';
import * as myConst from '../../Baseurl';
import useStudentAuth from '../../../store/hooks/useStudentAuth';

const DAY_NAMES = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

const getDefaultDay = scheduleMap => {
  const today = moment().format('dddd');
  const preferredDay = DAY_NAMES.includes(today) ? today : DAY_NAMES[0];

  if (Array.isArray(scheduleMap?.[preferredDay]) && scheduleMap[preferredDay].length) {
    return preferredDay;
  }

  return DAY_NAMES.find(day => Array.isArray(scheduleMap?.[day]) && scheduleMap[day].length)
    || DAY_NAMES[0];
};

const HomeTimeTable = () => {
  const {token: usertoken, userData} = useStudentAuth();
  const [schedule, setSchedule] = useState({});
  const [selectedDay, setSelectedDay] = useState(DAY_NAMES[0]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!usertoken || !userData?.Student_class || !userData?.Student_section) {
      return;
    }

    const loadTimetable = async () => {
      setLoading(true);

      try {
        const formData = new FormData();
        formData.append('std_class', userData.Student_class);
        formData.append('std_section', userData.Student_section);

        const response = await fetch(myConst.BASEURL + 'viewTimetable', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
            Authorization: usertoken,
          },
          body: formData,
        });

        const responseJson = await response.json();
        const nextSchedule =
          responseJson?.data?.schedule ||
          responseJson?.data?.Schedule ||
          responseJson?.schedule ||
          {};

        if (!response.ok || responseJson?.status !== true) {
          throw new Error(responseJson?.message || 'Unable to load timetable');
        }

        setSchedule(nextSchedule);
        setSelectedDay(getDefaultDay(nextSchedule));
      } catch (error) {
        setSchedule({});
        Snackbar.show({
          text: error?.message || 'Unable to load timetable',
          duration: Snackbar.LENGTH_SHORT,
          backgroundColor: '#f15270',
        });
      } finally {
        setLoading(false);
      }
    };

    loadTimetable();
  }, [usertoken, userData?.Student_class, userData?.Student_section]);

  const periods = useMemo(
    () => (Array.isArray(schedule?.[selectedDay]) ? schedule[selectedDay] : []),
    [schedule, selectedDay],
  );

  return (
    <View style={styles.topMainView}>
      <View style={styles.sectionHeader}>
        <Text style={styles.heading}>Time Table</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.dayTabsContent}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {DAY_NAMES.map(day => {
          const isActive = day === selectedDay;

          const content = (
            <Pressable onPress={() => setSelectedDay(day)} style={styles.listButton}>
              <Text style={isActive ? styles.listText : styles.listText2}>{day}</Text>
            </Pressable>
          );

          if (isActive) {
            return (
              <LinearGradient
                colors={['#D000FF', '#5A37F7']}
                end={{x: 1, y: 0}}
                key={day}
                start={{x: 0, y: 0}}
                style={styles.gradiantStyle}
              >
                {content}
              </LinearGradient>
            );
          }

          return (
            <View key={day} style={styles.inactiveTab}>
              {content}
            </View>
          );
        })}
      </ScrollView>

      <View style={styles.scheduleCard}>
        {loading ? (
          <Text style={styles.emptyStateText}>Loading timetable...</Text>
        ) : periods.length ? (
          <View style={styles.scheduleGrid}>
            {periods.map((item, index) => {
              const isBreak = item?.type === 'Break';

              if (isBreak) {
                return (
                  <LinearGradient
                    colors={['#F6EFFF', '#EFE7FF']}
                    end={{x: 1, y: 1}}
                    key={`${item?.label}-${item?.start}-${index}`}
                    start={{x: 0, y: 0}}
                    style={[styles.periodListView, styles.breakCard]}
                  >
                    <Text style={styles.periodlistText3}>
                      {item?.start}-{item?.end}
                    </Text>
                    <Text style={styles.periodlistText4}>{item?.label}</Text>
                  </LinearGradient>
                );
              }

              return (
                <View
                  key={`${item?.label}-${item?.subject}-${item?.start}-${index}`}
                  style={styles.periodListView}
                >
                  <Text style={styles.periodlistText}>
                    {item?.start}-{item?.end}
                  </Text>
                  <Text style={styles.periodlistText2}>
                    {item?.subject || 'Subject'}
                  </Text>
                </View>
              );
            })}
          </View>
        ) : (
          <Text style={styles.emptyStateText}>No timetable available right now.</Text>
        )}
      </View>
    </View>
  );
};

export default HomeTimeTable;

const styles = StyleSheet.create({
  topMainView: {
    backgroundColor: constant.whiteColor,
    marginTop: constant.resW(5),
  },
  sectionHeader: {
    marginBottom: constant.resW(2.5),
    marginHorizontal: constant.resW(4),
  },
  heading: {
    color: constant.blackColor,
    fontFamily: constant.typeSemiBold,
    fontSize: constant.font18,
    lineHeight: constant.resW(7),
  },
  dayTabsContent: {
    paddingHorizontal: constant.resW(4),
  },
  gradiantStyle: {
    borderRadius: constant.resW(3),
    marginRight: constant.resW(4),
  },
  inactiveTab: {
    backgroundColor: '#F8FAFF',
    borderColor: '#E2E8F4',
    borderRadius: constant.resW(3),
    borderWidth: 1,
    marginRight: constant.resW(4),
  },
  listButton: {
    alignItems: 'center',
    borderRadius: constant.resW(3),
    justifyContent: 'center',
    minWidth: constant.resW(28),
    paddingHorizontal: constant.resW(3.8),
    paddingVertical: constant.resW(2.3),
  },
  listText: {
    color: constant.whiteColor,
    fontFamily: constant.typeSemiBold,
    fontSize: constant.font13,
  },
  listText2: {
    color: '#0F172A',
    fontFamily: constant.typeMedium,
    fontSize: constant.font13,
  },
  scheduleCard: {
    backgroundColor: '#F8FAFF',
    borderColor: '#E2E8F4',
    borderRadius: constant.resW(3),
    borderWidth: 1,
    elevation: 2,
    marginHorizontal: constant.resW(4),
    marginTop: constant.resW(3),
    paddingHorizontal: constant.resW(2.2),
    paddingVertical: constant.resW(2.8),
    shadowColor: '#0F172A',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.06,
    shadowRadius: 10,
  },
  scheduleGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  periodListView: {
    alignItems: 'center',
    backgroundColor: constant.whiteColor,
    borderRadius: constant.resW(2),
    justifyContent: 'center',
    marginBottom: constant.resW(1.8),
    minHeight: constant.resW(21),
    paddingHorizontal: constant.resW(1.8),
    paddingVertical: constant.resW(2.2),
    width: '31.5%',
  },
  breakCard: {
    borderColor: '#D9C9FF',
    borderRadius: constant.resW(2),
    borderWidth: 1,
  },
  periodlistText: {
    alignSelf: 'center',
    color: constant.blackColor,
    fontFamily: constant.typeSemiBold,
    fontSize: constant.font14,
    lineHeight: constant.resW(5.2),
    textAlign: 'center',
  },
  periodlistText2: {
    alignSelf: 'center',
    color: constant.baseTextColor,
    fontFamily: constant.typeMedium,
    fontSize: constant.font12,
    marginTop: constant.resW(1.2),
    textAlign: 'center',
  },
  periodlistText3: {
    alignSelf: 'center',
    color: '#6D28D9',
    fontFamily: constant.typeSemiBold,
    fontSize: constant.font14,
    lineHeight: constant.resW(5.2),
    textAlign: 'center',
  },
  periodlistText4: {
    alignSelf: 'center',
    color: '#7C3AED',
    fontFamily: constant.typeMedium,
    fontSize: constant.font12,
    marginTop: constant.resW(1.2),
    textAlign: 'center',
  },
  emptyStateText: {
    color: constant.baseTextColor,
    fontFamily: constant.typeMedium,
    fontSize: constant.font14,
    paddingVertical: constant.resW(6),
    textAlign: 'center',
  },
});
