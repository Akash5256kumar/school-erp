import React, {useCallback, useEffect, useState} from 'react';
import {BackHandler} from 'react-native';
import moment from 'moment';
import StudentDocumentList from '../Shared/StudentDocumentList';

const PLANNER_BASE_URL = 'http://139.59.90.236:86/uploads/fortnightly/';

const FortnightlyPlannerList = ({navigation, route}) => {
  const {subjectData} = route.params;
  const [items, setItems] = useState([]);
  const [title, setTitle] = useState('');

  useEffect(() => {
    setItems(subjectData?.Fortnightly || []);
    setTitle(subjectData?.subject || 'Planner');
  }, [route.params]);

  useEffect(() => {
    const handler = BackHandler.addEventListener('hardwareBackPress', () => {
      navigation.navigate('Dashboard');
      return true;
    });
    return () => handler.remove();
  }, [navigation]);

  const renderCard = useCallback((item) => {
    const from = item.from_date ? moment(item.from_date).format('DD MMM YY') : null;
    const to = item.to_date ? moment(item.to_date).format('DD MMM YY') : null;
    const dateLabel = from && to ? `${from} → ${to}` : from || null;

    return {
      title: item.subject || 'Fortnightly Planner',
      subtitle: dateLabel,
      meta: null,
      date: null,
      accentColor: '#7C3AED',
      emoji: '🗓️',
    };
  }, []);

  const getFileInfo = useCallback((item) => ({
    fileExt: item.schedule_file?.split('.').pop() || '',
    name: item.subject || 'Planner',
    viewUrl: `${PLANNER_BASE_URL}${item.schedule_file}`,
    downloadUrl: `${PLANNER_BASE_URL}${item.schedule_file}`,
  }), []);

  return (
    <StudentDocumentList
      title={title}
      items={items}
      renderCard={renderCard}
      getFileInfo={getFileInfo}
      onBack={() => navigation.goBack()}
      searchFields={['subject']}
      emptyMessage="No planner files uploaded for this subject yet."
      accentColor="#7C3AED"
      headerEmoji="🗓️"
    />
  );
};

export default FortnightlyPlannerList;
