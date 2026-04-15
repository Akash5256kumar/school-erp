import React, { useEffect, useState, useCallback } from 'react';
import { BackHandler } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment';

import { REMOTE_FILE_BASE_URL } from '../../../constants';
import { BASEURL } from '../../Baseurl';
import useStudentAuth from '../../../store/hooks/useStudentAuth';
import StudentDocumentList from '../Shared/StudentDocumentList';

const toAbsoluteUrl = (value) => {
  const normalized = String(value || '').trim();
  if (!normalized) return '';
  if (/^https?:\/\//i.test(normalized)) return normalized;
  return `${REMOTE_FILE_BASE_URL}${normalized.replace(/^\/+/, '')}`;
};

const Event = ({ navigation }) => {
  const { token: usertoken } = useStudentAuth();
  const [dataSource, setDataSource] = useState([]);

  const handleBackPress = useCallback(() => {
    navigation.navigate('Dashboard');
    return true;
  }, [navigation]);

  useEffect(() => {
    const fetchClassAndEvents = async () => {
      try {
        const stdClass = await AsyncStorage.getItem('@class') || '';
        if (!stdClass) return;

        let formData = new FormData();
        formData.append('std_class', stdClass);

        const response = await fetch(BASEURL + 'viewevents', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
            Authorization: usertoken
          },
          body: formData,
        });

        const responseJson = await response.json();
        
        // Combine upcoming and past events for a full comprehensive view
        const upcoming = Array.isArray(responseJson?.data?.upcoming) ? responseJson.data.upcoming : [];
        const past = Array.isArray(responseJson?.data?.past) ? responseJson.data.past : [];
        
        setDataSource([...upcoming, ...past]);
      } catch (e) {
        console.log(e);
      }
    };

    fetchClassAndEvents();
  }, [usertoken]);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackPress);
    return () => BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
  }, [handleBackPress]);

  const handleEventPress = useCallback(
    (item) => {
      navigation.navigate('EventDetail', { eventItem: item });
    },
    [navigation],
  );

  const formatEventDate = useCallback((value) => {
    if (!value) return 'Date not available';
    const parsed = moment(value);
    if (!parsed.isValid()) return 'Date not available';
    return parsed.format('DD MMM YYYY');
  }, []);

  const renderCard = useCallback((item) => ({
    title: item.event_name || 'School Event',
    date: item.event_time ? formatEventDate(item.event_time) : '',
    emoji: '📅',
  }), [formatEventDate]);

  const getFileInfo = useCallback((item) => {
    const rawFile = String(item?.e_file || '').trim();
    if (!rawFile) return null;

    const viewUrl = toAbsoluteUrl(rawFile);
    const fileExt = rawFile.split('.').pop().toLowerCase();

    return {
      fileExt,
      name: item.event_name || 'Event attachment',
      viewUrl,
      downloadUrl: viewUrl,
    };
  }, []);

  return (
    <StudentDocumentList
      title="Calendar of Events"
      items={dataSource}
      renderCard={renderCard}
      getFileInfo={getFileInfo}
      onCardPress={handleEventPress}
      onBack={() => navigation.goBack()}
      searchFields={['event_name']}
      emptyMessage="No upcoming or past events found."
      headerEmoji="🗓️"
      accentColor="#5E3BF9"
      badgeLabel="Events"
      searchPlaceholder="Search events…"
    />
  );
};

export default Event;
