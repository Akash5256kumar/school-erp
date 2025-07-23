import React, { useEffect, useState, useCallback } from 'react';
import {
  Text,
  View,
  Image,
  Modal,
  FlatList,
  TouchableOpacity,
  BackHandler,
  Platform,
  Pressable,
} from 'react-native';
import styles from './style';
import * as myConst from '../../Baseurl';
import AsyncStorage from '@react-native-community/async-storage';
import CommonHeader from '../../CommonHeader';
import LinearGradient from 'react-native-linear-gradient';
import * as constant from '../../../Utils/Constant';
import CommonSearch from '../../Search/CommonSearch';
import Pdf from 'react-native-pdf';
import BlobUtil from 'react-native-blob-util';

const Assignment = ({ navigation, route }) => {
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
  const [showDownload, setShowDownload] = useState(false);

  const handleBackPress = useCallback(() => {
    navigation.navigate('Dashboard');
    return true;
  }, [navigation]);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackPress);
    return () => BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
  }, [handleBackPress]);

  useEffect(() => {
    const init = async () => {
      const { otherParam } = route.params;
      setTitle(otherParam);
      const value = await AsyncStorage.getItem('@class');
      setClasses(value);
      if (otherParam === 'Assignment') {
        assignApi(value);
      }
    };
    init();
  }, [route.params]);

  const assignApi = (std_class) => {
    let formData = new FormData();
    formData.append('std_class', std_class);
    fetch(myConst.BASEURL + 'viewassign', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
      body: formData,
    })
      .then(res => res.json())
      .then(json => {
        setDataSource(json.data);
        setOriginalDataSource(json.data);
      })
      .catch(console.log)
      .finally(() => setLoading(false));
  };

  const openFile = (item) => {
    const fileExt = item.as_file.split('.').pop();
    setExt(fileExt);
    setPdf(item.as_file);
    setPdfName(item.topic);
    setIsModalVisible(true);
  };

  const downloadHistory = (file) => {
    const { fs } = BlobUtil;
    const downloadPath =
      Platform.OS === 'ios'
        ? fs.dirs.DownloadDir + '/' + file
        : fs.dirs.PictureDir + '/' + file;

    let options = {
      fileCache: true,
      path: downloadPath,
      ...(Platform.OS === 'android' && {
        addAndroidDownloads: {
          useDownloadManager: true,
          notification: true,
          path: downloadPath,
          description: 'Report Download',
          mime: 'application/pdf',
          mediaScannable: true,
        },
      }),
    };

    BlobUtil.config(options)
      .fetch('GET', `https://myskool.sdvonline.in/images/${file}`)
      .then(res => {
        constant.showAlert('Download Successfully');
        console.log('Downloaded to -> ', res.path());
      })
      .catch(err => console.log('Download error: ', err));
  };

  const onSearch = (text) => {
    const filtered = originalDataSource.filter(item =>
      item.topic.toLowerCase().includes(text.toLowerCase())
    );
    setDataSource(text ? filtered : originalDataSource);
  };

  const renderItem = ({ item }) => (
    <View style={styles.FlatListView}>
      <Pressable style={styles.CardView} onPress={() => openFile(item)}>
        <View style={styles.CardViewStyle}>
          <View style={styles.DocImageAndTextStyle}>
            <Image style={styles.AssignmentImage} source={constant.Icons.assignment} />
            <View style={styles.TextViewStyle}>
              <Text style={styles.DashboardTextStyle}>{item.topic}</Text>
            </View>
          </View>
          {/* <TouchableOpacity onPress={() => openFile(item)}>
            <Image
              style={styles.AssignmentDownloadImage}
              source={constant.Icons.downloadIcon}
            />
          </TouchableOpacity> */}
        </View>
      </Pressable>
    </View>
  );

  return (
    <LinearGradient colors={['#DFE6FF', '#ffffff']} style={{ flex: 1 }}>
      <View style={styles.MainContainer}>
        <CommonHeader title="Home Work" onLeftClick={() => navigation.goBack()} />
        <CommonSearch searchText={(text) => onSearch(text)} />

        <FlatList
          data={dataSource}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />

        <Modal
          transparent={false}
          animationType={'slide'}
          visible={isModalVisible}
          onRequestClose={() => {
            setIsModalVisible(false);
            setShowDownload(false);
          }}>
          
          <View style={styles.PdfHeaderBackground}>
              <View style={styles.PdfHeaderStyle}>
                <View style={{flex:0.3,}}>
                  <Pressable
                    style={{
                      flex: 1,
                      paddingLeft: '10%',
                      height: '100%',
                      justifyContent: 'center',
                      marginTop:'5%'
                    }}
                    onPress={() => {
                      setIsModalVisible(false);
                      setShowDownload(false);
                    }} 
                    >
                    <Image source={constant.Icons.backArrowIcon} tintColor={'#fff'} resizeMode='contain' style={{
                       height:constant.resW(8),
                       width:constant.resW(8),
                       marginTop:'5%'
                    }} />
                  </Pressable>
                </View>
                <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                <Text style={styles.PdfHeaderText}>{pdfName}</Text>
                </View>
                <TouchableOpacity
                style={{flex:0.3,alignItems:'flex-end',justifyContent:'center'}}
                onPress={() => showDownload && downloadHistory(pdf)}
                >
                  {showDownload && (
                    <Image
                      style={styles.PdfHeaderArrowImage}
                      source={constant.Icons.downloadIcon}
                    />
                   )} 
                </TouchableOpacity>
              </View>
            </View>
          <View style={styles.container}>
            {ext === 'pdf' ? (
              <Pdf
                source={{ uri: `https://myskool.sdvonline.in/images/${pdf}`, cache: true }}
                trustAllCerts={false}
                onLoadComplete={() => setShowDownload(true)}
                onError={error => console.log(error)}
                onPressLink={() => setShowDownload(true)}
                style={styles.pdf}
              />
            ) : ['jpeg', 'jpg', 'png'].includes(ext) ? (
              <Image
                source={{ uri: `http://139.59.90.236/images/${pdf}` }}
                style={{ height: '100%', width: '100%' }}
                resizeMode="contain"
              />
            ) : (
              <Text style={styles.oopsText}>
                Unable to view this file. You can download and share this file.
              </Text>
            )}
          </View>
        </Modal>
      </View>
    </LinearGradient>
  );
};

export default Assignment;
