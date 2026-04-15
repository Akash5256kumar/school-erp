import React, {useCallback, useEffect, useState} from 'react';
import {BackHandler} from 'react-native';
import StudentDocumentList from '../Shared/StudentDocumentList';

const NOTES_BASE_URL = 'https://myskool.sdvonline.in/images/';

const NotesList = ({navigation, route}) => {
  const {subjectData} = route.params;
  const [items, setItems] = useState([]);
  const [title, setTitle] = useState('');

  useEffect(() => {
    setItems(subjectData?.notes || []);
    setTitle(subjectData?.subject || 'Notes');
  }, [route.params]);

  useEffect(() => {
    const handler = BackHandler.addEventListener('hardwareBackPress', () => {
      navigation.navigate('Dashboard');
      return true;
    });
    return () => handler.remove();
  }, [navigation]);

  const renderCard = useCallback((item) => ({
    title: item.topic || item.subject || '—',
    subtitle: item.book || null,
    meta: item.teachername || null,
    date: null,
    accentColor: '#10B981',
    emoji: '📝',
  }), []);

  const getFileInfo = useCallback((item) => ({
    fileExt: item.as_file?.split('.').pop() || '',
    name: item.subject || item.topic || 'Note',
    viewUrl: `${NOTES_BASE_URL}${item.as_file}`,
    downloadUrl: `${NOTES_BASE_URL}${item.as_file}`,
  }), []);

  return (
    <StudentDocumentList
      title={title}
      items={items}
      renderCard={renderCard}
      getFileInfo={getFileInfo}
      onBack={() => navigation.goBack()}
      searchFields={['topic', 'subject', 'teachername', 'book']}
      emptyMessage="No notes uploaded for this subject yet."
      accentColor="#C100FF"
      headerEmoji="📝"
    />
  );
};

export default NotesList;
