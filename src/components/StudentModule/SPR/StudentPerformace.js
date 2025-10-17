import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Platform
} from 'react-native'
import React, { useState, useEffect } from 'react'
import CommonHeader from '../../CommonHeader';
import LinearGradient from 'react-native-linear-gradient';
import CommonSearch from '../../Search/CommonSearch';
import styles from '../FortnightlyPlanner/FortnightlyPlannerStyle';
import BlobUtil from 'react-native-blob-util';
import { useNavigation } from '@react-navigation/native';
import * as constant from '../../../Utils/Constant';
import * as myConst from '../../Baseurl';
import { useSelector } from 'react-redux';
import AsyncStorage from "@react-native-community/async-storage";
import { PermissionsAndroid } from 'react-native';
const StudentPerformance = () => {
  const navigation = useNavigation();
  const [stdRoll, setStdRoll] = useState('');
  const [loading, setLoading] = useState(false);
  const [downloading, setDownloading] = useState(false); // 👈 for pdf download loader
  const [dataSource, setDataSource] = useState([]);

  const usertoken = useSelector(state => state.userSlice.token);

  // get roll number
  useEffect(() => {
    const fetchRoll = async () => {
      const value = await AsyncStorage.getItem('@std_roll');
      if (value) setStdRoll(value);
    };
    fetchRoll();
  }, []);

  // fetch performance list
  const fetchPerformance = () => {
    if (!stdRoll) return;
    setLoading(true);

    fetch(`${myConst.BASEURL}performance?std_roll=${stdRoll}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': `${usertoken}`,
      },
    })
      .then(response => {
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return response.json();
      })
      .then(responseJson => {
        if (responseJson?.status && responseJson?.data) {
          setDataSource(responseJson.data);
        } else {
          setDataSource([]);
        }
      })
      .catch(error => console.log("API Error:", error))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (stdRoll) fetchPerformance();
  }, [stdRoll]);


const requestStoragePermission = async () => {
  if (Platform.OS === 'android' && Platform.Version < 33) {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: 'Storage Permission',
        message: 'App needs access to your storage to download files',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  }
  return true;
};

const downloadPdf = async (performanceId) => {
  if (!performanceId) return;

  setDownloading(true);

  const canDownload = await requestStoragePermission();
  if (!canDownload) {
    setDownloading(false);
    return;
  }

  const { fs } = BlobUtil;
  const uri = `${myConst.BASEURL}performance-pdf?std_roll=${stdRoll}&performance_id=${performanceId}`;

  // Use Android public Downloads folder
  let downloadPath =
    Platform.OS === 'ios'
      ? fs.dirs.DocumentDir + `/Performance-${performanceId}.pdf`
      : `/storage/emulated/0/Download/Performance-${performanceId}.pdf`; // public Downloads folder

  try {
    const res = await BlobUtil.config({
      fileCache: true,
      path: downloadPath,
      addAndroidDownloads:
        Platform.OS === 'android'
          ? {
              useDownloadManager: true,
              notification: true,
              path: downloadPath,
              description: 'Performance PDF',
              mime: 'application/pdf',
              mediaScannable: true,
            }
          : undefined,
    }).fetch('GET', uri, { Authorization: `${usertoken}` });

    constant.showAlert('Download Successfully');
    console.log('Downloaded to -> ', res.path());
  } catch (error) {
    console.log('Download Error:', error);
    constant.showAlert('Download Failed');
  } finally {
    setDownloading(false);
  }
};

  // direct download using blob-util
  // const downloadPdf = (performanceId) => {
  //   if (!performanceId) return;

  //   setDownloading(true); // 👈 start loader

  //   const { fs } = BlobUtil;
  //   const uri = `${myConst.BASEURL}performance-pdf?std_roll=${stdRoll}&performance_id=${performanceId}`;

  //   let downloadPath =
  //     Platform.OS === 'ios'
  //       ? fs.dirs.DocumentDir + `/Performance-${performanceId}.pdf`
  //       : fs.dirs.DownloadDir + `/Performance-${performanceId}.pdf`;

  //   let options = {
  //     fileCache: true,
  //     path: downloadPath,
  //   };

  //   if (Platform.OS === 'android') {
  //     options.addAndroidDownloads = {
  //       useDownloadManager: true,
  //       notification: true,
  //       path: downloadPath,
  //       description: 'Performance PDF',
  //       mime: 'application/pdf',
  //       mediaScannable: true,
  //     };
  //   }
  //   BlobUtil.config(options)
  //     .fetch('GET', uri, { Authorization: `${usertoken}` })
  //     .then((res) => {
  //       constant.showAlert('Download Successfully');
  //       console.log('Downloaded to -> ', res.path());
  //     })
  //     .catch(error => {
  //       console.log("Download Error:", error);
  //       constant.showAlert('Download Failed');
  //     })
  //     .finally(() => setDownloading(false)); // 👈 stop loader
  // };

  const renderItem = ({ item }) => (
    <View style={styles.FlatListView}>
      <View style={styles.CardView}>
        <View style={styles.CardViewStyle}>
          <View style={styles.DocImageAndTextStyle}>
            <Image
              style={styles.AssignmentImage}
              source={constant.Icons.notes}
            />
            <View style={styles.TextViewStyle}>
              <Text style={styles.DashboardTextStyle}>
                Performance Report
              </Text>
              <Text style={styles.DashboardTextStyle2}>Date: {item.date}</Text>
              <Text style={styles.DashboardTextStyle2}>Teacher: {item.class_teacher}</Text>
            </View>
          </View>

          <TouchableOpacity onPress={() => downloadPdf(item.id)}>
            <Image
              style={styles.AssignmentDownloadImage}
              resizeMode="contain"
              source={constant.Icons.downloadIcon}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <LinearGradient colors={['#DFE6FF', '#ffffff']} style={{ flex: 1 }}>
      <CommonHeader title={'Student Performance'}
        onLeftClick={() => navigation.navigate('Home')} />

      <CommonSearch placeholder="Search performance" />

      {loading ? (
        <ActivityIndicator size="large" color="black" style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={dataSource}
          renderItem={renderItem}
          keyExtractor={(item, index) => item.id?.toString() || index.toString()}
        />
      )}

      {/* 👇 Loader overlay when downloading PDF */}
      {downloading && (
        <View style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.3)',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 999
        }}>
          <ActivityIndicator size="large" color="black" />
          {/* <Text style={{ marginTop: 10, color: 'white', fontSize: 16 }}>Downloading...</Text> */}
        </View>
      )}
    </LinearGradient>
  )
}

export default StudentPerformance;
