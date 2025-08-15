import React, { useState, useEffect, useCallback } from 'react';
import {
  Text,
  View,
  Image,
  FlatList,
  Modal,
  TouchableOpacity,
  BackHandler,
  Pressable,
  Platform,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import * as myConst from '../../Baseurl';
import styles from './FortnightlyPlannerStyle';
import moment from 'moment';
import CommonHeader from '../../CommonHeader';
import LinearGradient from 'react-native-linear-gradient';
import * as constant from '../../../Utils/Constant';
import CommonSearch from '../../Search/CommonSearch';
import Pdf from 'react-native-pdf';
import BlobUtil from 'react-native-blob-util';

const baseColor = '#0747a6';

const FortnightlyPlannerList = ({ navigation, route }) => {
  // const { otherParam } = route.params.otherParam;
  const {subjectData} = route.params

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

  // Back handler
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      navigation.navigate('Dashboard');
      return true;
    });

    return () => backHandler.remove();
  }, [navigation]);

  // Load data on mount

  useEffect(() => {
    console.log("sub",JSON.stringify(subjectData))
    setDataSource(subjectData?.Fortnightly)
    setOriginalDataSource(subjectData?.Fortnightly)
    setTitle(subjectData?.subject)
  }, [route.params]);
 

  const openFile = (item) => {
    const fileExt = item.schedule_file.split('.').pop();
    console.log('ff',ext)
    setExt(fileExt);
    setPdf(item.schedule_file);
    setPdfName(item.subject);
    setIsModalVisible(true);
  };

  const historyDownload = (file) => {
    downloadHistory(file);
  };

  const downloadHistory = (id) => {
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
      .then((res) => {
        constant.showAlert('Download Successfully');
        console.log('Downloaded to -> ', res.path());
      })
      .catch((err) => {
        console.log('Download error: ' + JSON.stringify(err));
      });
  };

 

  const onSearch = (text) => {
    let filteredArr = originalDataSource.filter((object) =>
      object.subject.toLowerCase().includes(text)
    );
    setDataSource(text ? filteredArr : originalDataSource);
  };

  return (
    <LinearGradient colors={['#DFE6FF', '#ffffff']} style={{ flex: 1 }}>
      <View style={styles.MainContainer}>
        <CommonHeader
          title={title}
          onLeftClick={() => navigation.goBack()}
        />

        <CommonSearch searchText={(d) => onSearch(d.toLowerCase())} />

        <FlatList
          data={dataSource}
          renderItem={({ item }) => (
            <View style={styles.FlatListView}>
              <Pressable style={styles.CardView} onPress={() => openFile(item)} >
                <View style={styles.CardViewStyle}>
                  <View style={styles.DocImageAndTextStyle}>
                    <Image
                      style={styles.AssignmentImage}
                      source={constant.Icons.notes}
                    />
                    <View style={styles.TextViewStyle}>
                      <Text style={styles.DashboardTextStyle}>
                      {'FortnightlyPlanner'}
                      </Text>
                      <View style={{flexDirection:'row',alignItems:'center',marginTop:constant.resW(1)}}>
                      <Text numberOfLines={1}  style={styles.DashboardTextStyle2}>{moment(item.from_date).format("DD-MM-YYYY")} - </Text>
                      <Text numberOfLines={1}  style={styles.DashboardTextStyle2}>{moment(item.to_date).format("DD-MM-YYYY")}</Text>
                      </View>
                    </View>
                  </View>

                  <View >
                    <Image
                      style={styles.AssignmentDownloadImage}
                      resizeMode="contain"
                      source={constant.Icons.downloadIcon}
                    />
                  </View>
                </View>
              </Pressable>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />

        {/* PDF / Image Modal */}
        <Modal
          transparent={false}
          animationType="slide"
          onRequestClose={() => setIsModalVisible(false)}
          visible={isModalVisible}
        >
          <View style={styles.PdfHeaderBackground}>
            <View style={styles.PdfHeaderStyle}>
              <View>
                <Pressable
                  style={{
                    flex: 1,
                    paddingLeft: '10%',
                    height: '100%',
                    justifyContent: 'center',
                    marginTop: '5%',
                  }}
                  onPress={() => setIsModalVisible(false)}
                >
                  <Image
                    source={constant.Icons.backArrowIcon}
                    tintColor={'#fff'}
                    resizeMode="contain"
                    style={{
                      height: constant.resW(8),
                      width: constant.resW(8),
                      marginTop: '5%',
                    }}
                  />
                </Pressable>
              </View>
              <Text style={styles.PdfHeaderText}>{pdfName}</Text>
              <TouchableOpacity onPress={() => historyDownload(pdf)}>
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
                source={{
                  uri: 'http://139.59.90.236/images/' + pdf,
                  cache: true,
                }}
                trustAllCerts={false}
                onLoadComplete={(pages) =>
                  console.log(`number of pages: ${pages}`)
                }
                onPageChanged={(page) =>
                  console.log(`current page: ${page}`)
                }
                onError={console.log}
                style={styles.pdf}
              />
            ) : ['jpeg', 'jpg', 'png',].includes(ext) ? (
              <Image
                source={{
                  uri: 'http://139.59.90.236/images/' + pdf,
                }}
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

export default FortnightlyPlannerList;
