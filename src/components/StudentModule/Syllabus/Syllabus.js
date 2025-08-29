import React, { useEffect, useState, useCallback } from 'react';
import {
  Text,
  View,
  Image,
  FlatList,
  Modal,
  TouchableOpacity,
  Pressable,
  Platform,
  BackHandler,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import * as myConst from '../../Baseurl';
import Snackbar from 'react-native-snackbar';
import styles from './style';
import Searchbar from '../../SearchBar';
import CommonHeader from '../../CommonHeader';
import LinearGradient from 'react-native-linear-gradient';
import * as constant from '../../../Utils/Constant';
import CommonSearch from '../../Search/CommonSearch';
import BlobUtil from 'react-native-blob-util';
import Pdf from 'react-native-pdf';
import { useFocusEffect } from '@react-navigation/native';
import { useSelector } from 'react-redux';

const Syllabus = ({ navigation, route }) => {
  const userData = useSelector(state=>state.userSlice.userData)
    const usertoken = useSelector(state=>state.userSlice.token)
  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [classes, setClasses] = useState('');
  const [dataSource, setDataSource] = useState([]);
  const [originalDataSource, setOriginalDataSource] = useState([]);
  const [title, setTitle] = useState('');
  const [ext, setExt] = useState('');
  const [pdf, setPdf] = useState(null);
  const [pdfName, setPdfName] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const { otherParam } = route.params || {};

  // Back button handling
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        navigation.navigate('Dashboard');
        return true;
      };

      const subscription = BackHandler.addEventListener(
        'hardwareBackPress',
        onBackPress
      );

      return () => subscription.remove();
    }, [navigation])
  );

  useEffect(() => {
    setTitle(otherParam);
    const fetchData = async () => {
      const value = await AsyncStorage.getItem('@class');
      setClasses(value);
      
      if (otherParam === 'Syllabus') syllabusApi(value);
      else if (otherParam === 'Exam Schedule') examApi(value);
      else if (otherParam === 'Notes') notesApi(value);
    };

    fetchData();
  }, [otherParam]);

  const openFile = item => {
    const extension = item.u_file.split('.').pop();
    setExt(extension);
    setPdf(item.u_file);
    setPdfName(item.subject);
    setIsModalVisible(true);
  };

  const downloadHistory = async id => {
    const { fs } = BlobUtil;
    let downloadPath =
      Platform.OS === 'ios'
        ? fs.dirs.DocumentDir + '/' + id
        : fs.dirs.PictureDir + '/' + id;

    let options = {
      fileCache: true,
      path: downloadPath,
    };

    if (Platform.OS === 'android') {
      options.addAndroidDownloads = {
        useDownloadManager: true,
        notification: true,
        path: downloadPath,
        description: 'Report Download',
        mime: 'application/pdf',
        mediaScannable: true,
      };
    }

    BlobUtil.config(options)
      .fetch('GET', `https://myskool.sdvonline.in/images/${id}`)
      .then(res => {
        constant.showAlert('Download Successfully');
        console.log('Downloaded to -> ', res.path());
      })
      .catch(err => {
        console.log('Download error: ' + JSON.stringify(err));
      });
  };

  const syllabusApi = stdClass => {
    let formData = new FormData();
    formData.append('std_class', stdClass);
    fetch(myConst.BASEURL + 'viewsyllabus', {
      method: 'POST',
      headers: { Accept: 'application/json', 'Content-Type': 'multipart/form-data','Authorization' : usertoken },
      body: formData,
    })
      .then(response => response.json())
      
      .then(responseJson => {
        console.log("res",responseJson)
        setDataSource(responseJson.data);
        setOriginalDataSource(responseJson.data);
      })
      .catch(error => console.log("adsfs"+error))
      .finally(() => setLoading(false));
  };

  const examApi = stdClass => {
    let formData = new FormData();
    formData.append('std_class', stdClass);

    fetch(myConst.BASEURL + 'viewexam', {
      method: 'POST',
      headers: { Accept: 'application/json', 'Content-Type': 'multipart/form-data','Authorization' : usertoken },
      body: formData,
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log("res",responseJson)
        let response = responseJson.data.map(item => ({
          ...item,
          subject: item.Subject,
          u_date: item.exam_date,
          u_file: item.exam_file,
        }));
        setDataSource(response);
        setOriginalDataSource(response);
      })
      .catch(error => console.log(error))
      .finally(() => setLoading(false));
  };

  const notesApi = stdClass => {
    let formData = new FormData();
    formData.append('std_class', stdClass);

    fetch(myConst.BASEURL + 'viewnotes', {
      method: 'POST',
      headers: { Accept: 'application/json', 'Content-Type': 'multipart/form-data','Authorization' : usertoken },
      body: formData,
    })
      .then(response => response.json())
      .then(responseJson => {
        let response = responseJson.data.map(item => ({
          ...item,
          subject: item.subject,
          u_date: item.as_date,
          u_file: item.as_file,
        }));
        setDataSource(response);
        setOriginalDataSource(response);
      })
      .catch(error => console.log(error))
      .finally(() => setLoading(false));
  };

  const onSearch = text => {
    let filteredArr = originalDataSource.filter(object =>
      object.subject.toLowerCase().includes(text.toLowerCase())
    );
    setDataSource(text ? filteredArr : originalDataSource);
  };

  return (
    <LinearGradient colors={['#DFE6FF', '#ffffff']} style={{ flex: 1 }}>
      <View style={styles.MainContainer}>
        <CommonHeader title={title} onLeftClick={() => navigation.goBack()} />

        <CommonSearch searchText={d => onSearch(d)} />

        <FlatList
          data={dataSource}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.FlatListView}>
              <View style={styles.CardView}>
                <View style={styles.CardViewStyle}>
                  <View style={styles.DocImageAndTextStyle}>
                    <Image style={styles.AssignmentImage} source={constant.Icons.notes} />
                    <View style={styles.TextViewStyle}>
                      <Text style={styles.DashboardTextStyle}>
                        {otherParam === 'Exam Schedule' ? item?.Subject : item?.topic}
                      </Text>
                    </View>
                  </View>

                  <TouchableOpacity onPress={() => openFile(item)}>
                    <Image
                      style={styles.AssignmentDownloadImage}
                      resizeMode="contain"
                      source={constant.Icons.downloadIcon}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        />

        {/* File Viewer Modal */}
        <Modal
          transparent={false}
          animationType="slide"
          visible={isModalVisible}
          onRequestClose={() => setIsModalVisible(false)}>
          <View style={styles.PdfHeaderBackground}>
            <View style={styles.PdfHeaderStyle}>
              <Pressable
                style={{
                  flex: 1,
                  paddingLeft: '10%',
                  justifyContent: 'center',
                }}
                onPress={() => setIsModalVisible(false)}>
                <Image
                  source={constant.Icons.backArrowIcon}
                  tintColor="#fff"
                  resizeMode="contain"
                  style={{
                    height: constant.resW(8),
                    width: constant.resW(8),
                  }}
                />
              </Pressable>
              <Text style={styles.PdfHeaderText}>{pdfName}</Text>
              <TouchableOpacity onPress={() => downloadHistory(pdf)}>
                <Image
                  style={styles.PdfHeaderArrowImage}
                  source={constant.Icons.downloadIcon}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.container}>
            {ext === 'pdf' ? (
              <Pdf
                source={{ uri: 'http://139.59.90.236/images/' + pdf, cache: true }}
                style={styles.pdf}
              />
            ) : ext === 'jpeg' || ext === 'jpg' || ext === 'png' ? (
              <Image
                source={{ uri: 'http://139.59.90.236/images/' + pdf }}
                style={{ height: '100%', width: '100%' }}
                resizeMode="contain"
              />
            ) : (
              <Text style={styles.oopsText}>
                Unable to view this file. Please download it.
              </Text>
            )}
          </View>
        </Modal>
      </View>
    </LinearGradient>
  );
};

export default Syllabus;
