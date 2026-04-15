import React, { useEffect, useState, useCallback } from 'react';
import {
  Text,
  View,
  Image,
  Modal,
  TouchableOpacity,
  Pressable,
  Platform,
  BackHandler,
  StyleSheet
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import BlobUtil from 'react-native-blob-util';
import Pdf from 'react-native-pdf';
import { useFocusEffect } from '@react-navigation/native';
import { FileDown, X } from 'lucide-react-native';

import * as myConst from '../../Baseurl';
import styles from './style';
import * as constant from '../../../Utils/Constant';
import useStudentAuth from '../../../store/hooks/useStudentAuth';
import StudentDocumentList from '../Shared/StudentDocumentList';

const Syllabus = ({ navigation, route }) => {
  const { token: usertoken } = useStudentAuth();
  const [loading, setLoading] = useState(false);
  const [classes, setClasses] = useState('');
  const [dataSource, setDataSource] = useState([]);
  
  const [ext, setExt] = useState('');
  const [pdf, setPdf] = useState(null);
  const [pdfName, setPdfName] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const { otherParam } = route.params || {};

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        navigation.navigate('Dashboard');
        return true;
      };
      const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () => subscription.remove();
    }, [navigation])
  );

  useEffect(() => {
    const fetchData = async () => {
      const value = await AsyncStorage.getItem('@class');
      setClasses(value);
      
      if (otherParam === 'Syllabus') syllabusApi(value);
      else if (otherParam === 'Exam Schedule') examApi(value);
      else if (otherParam === 'Notes') notesApi(value);
    };

    fetchData();
  }, [otherParam]);

  const syllabusApi = stdClass => {
    setLoading(true);
    let formData = new FormData();
    formData.append('std_class', stdClass);
    fetch(myConst.BASEURL + 'viewsyllabus', {
      method: 'POST',
      headers: { Accept: 'application/json', 'Content-Type': 'multipart/form-data', Authorization: usertoken },
      body: formData,
    })
      .then(response => response.json())
      .then(responseJson => {
        setDataSource(responseJson.data || []);
      })
      .catch(error => console.log(error))
      .finally(() => setLoading(false));
  };

  const examApi = stdClass => {
    setLoading(true);
    let formData = new FormData();
    formData.append('std_class', stdClass);
    fetch(myConst.BASEURL + 'viewexam', {
      method: 'POST',
      headers: { Accept: 'application/json', 'Content-Type': 'multipart/form-data', Authorization: usertoken },
      body: formData,
    })
      .then(response => response.json())
      .then(responseJson => {
        let response = (responseJson.data || []).map(item => ({
          ...item,
          subject: item.Subject,
          u_date: item.exam_date,
          u_file: item.exam_file,
        }));
        setDataSource(response);
      })
      .catch(error => console.log(error))
      .finally(() => setLoading(false));
  };

  const notesApi = stdClass => {
    setLoading(true);
    let formData = new FormData();
    formData.append('std_class', stdClass);
    fetch(myConst.BASEURL + 'viewnotes', {
      method: 'POST',
      headers: { Accept: 'application/json', 'Content-Type': 'multipart/form-data', Authorization: usertoken },
      body: formData,
    })
      .then(response => response.json())
      .then(responseJson => {
        let response = (responseJson.data || []).map(item => ({
          ...item,
          subject: item.subject,
          u_date: item.as_date,
          u_file: item.as_file,
        }));
        setDataSource(response);
      })
      .catch(error => console.log(error))
      .finally(() => setLoading(false));
  };

  const handleExamPress = useCallback(
    item => {
      navigation.navigate('ExamDetail', { examItem: item });
    },
    [navigation]
  );

  const handleSyllabusPress = useCallback(
    item => {
      navigation.navigate('SyllabusDetail', { syllabusItem: item });
    },
    [navigation]
  );

  const openFile = item => {
    if (!item.u_file) {
       constant.showAlert('No document attached.');
       return;
    }
    const extension = item.u_file.split('.').pop().toLowerCase();
    setExt(extension);
    setPdf(item.u_file);
    setPdfName(item.subject || item.topic || 'Document');
    setIsModalVisible(true);
  };

  const downloadHistory = async id => {
    const { fs } = BlobUtil;
    let downloadPath =
      Platform.OS === 'ios'
        ? fs.dirs.DocumentDir + '/' + id
        : fs.dirs.PictureDir + '/' + id;

    let options = { fileCache: true, path: downloadPath };

    if (Platform.OS === 'android') {
      options.addAndroidDownloads = {
        useDownloadManager: true,
        notification: true,
        path: downloadPath,
        description: 'File Download',
        mime: 'application/pdf', // Best effort
        mediaScannable: true,
      };
    }

    BlobUtil.config(options)
      .fetch('GET', `http://139.59.90.236/images/${id}`)
      .then(res => {
        constant.showAlert('File Downloaded Successfully!');
      })
      .catch(err => console.log(err));
  };

  // ─── Rendering the Document Items ───
  const getFileInfo = useCallback(item => {
    if (!item?.u_file) return null;
    const rawUrl = item.u_file;
    const viewUrl = rawUrl.startsWith('http')
      ? rawUrl
      : `http://139.59.90.236/images/${rawUrl}`;
    const fileExt = rawUrl.split('.').pop().toLowerCase();

    return {
      fileExt,
      name: item.subject || item.topic || 'Document',
      viewUrl,
      downloadUrl: viewUrl,
    };
  }, []);

  const renderCard = useCallback((item) => {
    const titleText = otherParam === 'Exam Schedule' ? item.Subject : (item.topic || item.subject || 'Document');
    return {
      title: titleText,
      date: item.u_date || item.created_at || '',
      emoji: otherParam === 'Exam Schedule' ? '📝' : otherParam === 'Notes' ? '📔' : '📚',
    };
  }, [otherParam]);

  return (
    <View style={{ flex: 1 }}>
      <StudentDocumentList
        title={otherParam || 'Documents'}
        items={dataSource}
        renderCard={renderCard}
        getFileInfo={getFileInfo}
        onBack={() => navigation.goBack()}
        onCardPress={otherParam === 'Exam Schedule' ? handleExamPress : otherParam === 'Syllabus' ? handleSyllabusPress : openFile}
        searchFields={['topic', 'subject', 'Subject']}
        emptyMessage={`No ${otherParam || 'items'} available at the moment.`}
        headerEmoji={otherParam === 'Exam Schedule' ? '📅' : otherParam === 'Notes' ? '📓' : '📖'}
      />

      {/* Embedded File Viewer Modal */}
      <Modal
        transparent={false}
        animationType="slide"
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}>
        <View style={s.modalHeaderBg}>
          <View style={s.modalHeader}>
            <Pressable style={s.closeBtn} onPress={() => setIsModalVisible(false)}>
              <X color="#FFFFFF" size={24} strokeWidth={2.5} />
            </Pressable>
            <Text style={s.modalTitle} numberOfLines={1}>{pdfName}</Text>
            <Pressable style={s.downloadBtn} onPress={() => downloadHistory(pdf)}>
              <FileDown color="#FFFFFF" size={22} strokeWidth={2} />
            </Pressable>
          </View>
        </View>

        <View style={s.modalContainer}>
          {ext === 'pdf' ? (
            <Pdf
              source={{ uri: 'http://139.59.90.236/images/' + pdf, cache: true }}
              style={s.pdfStyle}
              onError={(error) => console.log(error)}
            />
          ) : ext === 'jpeg' || ext === 'jpg' || ext === 'png' ? (
            <Image
              source={{ uri: 'http://139.59.90.236/images/' + pdf }}
              style={s.imageStyle}
              resizeMode="contain"
            />
          ) : (
            <View style={s.oopsWrap}>
              <Text style={s.oopsText}>Unable to preview this file specifically.</Text>
              <Text style={s.oopsSub}>Please download it to view locally.</Text>
            </View>
          )}
        </View>
      </Modal>
    </View>
  );
};

export default Syllabus;

const s = StyleSheet.create({
  modalHeaderBg: {
    backgroundColor: '#5B39F6', // Unified Purple theme
    paddingTop: Platform.OS === 'ios' ? 44 : 10,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width:0, height:3 },
    shadowOpacity: 0.15,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    paddingTop: 10,
  },
  closeBtn: {
    width: 40,
    aspectRatio: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  modalTitle: {
    flex: 1,
    fontFamily: constant.typeBold,
    fontSize: constant.font18,
    color: '#FFF',
    textAlign: 'center',
  },
  downloadBtn: {
    width: 40,
    aspectRatio: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#000000',
  },
  pdfStyle: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#000',
  },
  imageStyle: {
    width: '100%',
    height: '100%',
    backgroundColor: '#000',
  },
  oopsWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
  },
  oopsText: {
    fontFamily: constant.typeSemiBold,
    fontSize: constant.font16,
    color: '#FFF',
    textAlign: 'center',
  },
  oopsSub: {
    fontFamily: constant.typeMedium,
    fontSize: constant.font14,
    color: '#9CA3AF',
    marginTop: 8,
    textAlign: 'center',
  }
});
