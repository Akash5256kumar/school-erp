import React, {useCallback, useEffect, useState} from 'react';
import {BackHandler} from 'react-native';
import moment from 'moment';
import StudentDocumentList from '../Shared/StudentDocumentList';

const HOMEWORK_BASE_URL = 'https://myskool.sdvonline.in/images/';

const Assignment = ({navigation, route}) => {
  const {subjectData} = route.params;
  const [items, setItems] = useState([]);
  const [title, setTitle] = useState('');

  useEffect(() => {
    setItems(subjectData?.assignments || []);
    setTitle(subjectData?.subject || 'Homework');
  }, [route.params]);

  useEffect(() => {
    const handler = BackHandler.addEventListener('hardwareBackPress', () => {
      navigation.navigate('SubjectScreen');
      return true;
    });
    return () => handler.remove();
  }, [navigation]);

  const renderCard = useCallback((item) => ({
    title: item.topic || '—',
    subtitle: item.book || null,
    meta: item.teachername || null,
    date: item.as_date ? moment(item.as_date).format('DD MMM YYYY') : null,
    accentColor: '#2E7CF6',
    emoji: '📚',
  }), []);

  const getFileInfo = useCallback((item) => ({
    fileExt: item.as_file?.split('.').pop() || '',
    name: item.topic || 'Homework',
    viewUrl: `${HOMEWORK_BASE_URL}${item.as_file}`,
    downloadUrl: `${HOMEWORK_BASE_URL}${item.as_file}`,
  }), []);

  return (
    <StudentDocumentList
      title={title}
      items={items}
      renderCard={renderCard}
      getFileInfo={getFileInfo}
      onBack={() => navigation.navigate('SubjectScreen')}
      searchFields={['topic', 'book', 'subject', 'teachername']}
      emptyMessage="No homework uploaded for this subject yet."
      accentColor="#2E7CF6"
      headerEmoji="📚"
    />
  );
};

export default Assignment;
