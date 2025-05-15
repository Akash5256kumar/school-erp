import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  FlatList,
  Modal,
  Alert,
  TouchableOpacity,
  PermissionsAndroid,
  BackHandler,
  Pressable,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import * as myConst from '../../Baseurl';
import Snackbar from 'react-native-snackbar';
import styles from './style';
const baseColor = '#0747a6';
import Searchbar from '../../SearchBar';
import Header from '../../Header/Header';
// import RNFetchBlob from 'rn-fetch-blob';
import Pdf from 'react-native-pdf';
import moment from 'moment';
import CommonHeader from '../../CommonHeader';
import LinearGradient from 'react-native-linear-gradient';
import * as constant from '../../../Utils/Constant';
import CommonSearch from '../../Search/CommonSearch';
import BlobUtil from 'react-native-blob-util';


class Syllabus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      isVisible: false,
      classes: '',
      dataSource: [],
      title: '',
      originalDataSource: [],
      ext: '',
      pdf: null,
      pdfName: null,
      isModalVisible: false,
    };
  }

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  }

  handleBackPress = () => {
    this.props.navigation.navigate('Dashboard');
    return true;
  };

  async componentDidMount() {
    const {otherParam} = this.props.route.params;
    console.log('param-->', otherParam);
    this.setState({title: otherParam});
    const value = await AsyncStorage.getItem('@class');
    console.log('value-->>', value);
    this.setState({
      classes: value,
    });
    if (otherParam === 'Syllabus') {
      this.syllabusApi();
    } else if (otherParam === 'Exam Schedule') {
      this.examApi();
    } else if (otherParam === 'Notes') {
      this.notesApi();
    }
  }

  openFile = item => {
    console.log('item-->', item);
    let ext = item.u_file.split('.').pop();
    console.log('ext', ext);
    // Toast.show('You can share this file after download.');
    this.setState({
      ext: ext,
      pdf: item.u_file,
      pdfName: item.subject,
      isModalVisible: true,
    });
  };

  historyDownload(file) {
    this.downloadHistory(file);
    // try {
    //     PermissionsAndroid.request(
    //         PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    //         {
    //             title: 'storage title',
    //             message: 'storage_permission',
    //         },
    //     ).then(granted => {
    //         if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    //             //Once user grant the permission start downloading
    //             console.log('Storage Permission Granted.');
    //             this.downloadHistory(file);
    //         } else {
    //             //If permission denied then show alert 'Storage Permission Not Granted'
    //             Alert.alert('storage_permission');
    //         }
    //     });
    // } catch (err) {
    //     //To handle permission related issue
    //     console.log('error', err);
    // }
  }

  async downloadHistory(id) {
    // console.log('file-->', file);
    // const {config, fs} = RNFetchBlob;
    // let PictureDir = fs.dirs.PictureDir;
    // console.log('PictureDir-->', PictureDir);
    // let date = new Date();
    // let options = {
    //   fileCache: true,
    //   addAndroidDownloads: {
    //     useDownloadManager: true,
    //     notification: true,
    //     path: PictureDir + '/' + file,
    //     // '/Download' +
    //     // Math.floor(date.getTime() + date.getSeconds() / 2),
    //     description: 'Report Download',
    //   },
    // };
    // config(options)
    //   .fetch('GET', 'http://139.59.90.236/images/' + file)
    //   .then(res => {
    //     constant.showAlert('Download Successfully');
    //     //Showing alert after successful downloading
    //     console.log('res -> ', JSON.stringify(res));
    //     // alert('Downloaded Successfully.');
    //   });
    const { fs } = BlobUtil;
    let downloadPath;
  
    if (Platform.OS === 'ios') {
      downloadPath = fs.dirs.DocumentDir + '/' + id;
    } else {
      downloadPath = fs.dirs.PictureDir + '/' + id;
    }
  
    let options = {
      fileCache: true,
      path: downloadPath, // Save to file directly
    };
  
    if (Platform.OS === 'android') {
      options.addAndroidDownloads = {
        useDownloadManager: true,
        notification: true,
        path: downloadPath,
        description: 'Report Download',
        mime: 'application/pdf', // or adjust based on file type
        mediaScannable: true,
      };
    }
  
    BlobUtil.config(options)
      .fetch('GET', `https://myskool.sdvonline.in/images/${id}`)
      .then(res => {
        constant.showAlert('Download Successfully');
        console.log('Downloaded to -> ', res.path());
  
        // Optional: Share or preview the file on iOS
        if (Platform.OS === 'ios') {
          // You could use react-native-share or similar here
          // Example:
          // Share.open({ url: 'file://' + res.path(), type: 'application/pdf' })
        }
      })
      .catch(err => {
        console.log('Download error: ' + JSON.stringify(err));
      });
  }

  syllabusApi() {
    console.log(this.state.classes);
    let formData = new FormData();
    formData.append('std_class', this.state.classes);
    let data = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
      body: formData,
    };
    fetch(myConst.BASEURL + 'viewsyllabus', data)
      .then(response => response.json())
      .then(responseJson => {
        console.log('syllabus--->>>', responseJson);

        this.setState({
          dataSource: responseJson.data,
          originalDataSource: responseJson.data,
        });
      })
      .catch(error => console.log(error))
      .finally(() => {
        this.setState({isLoading: false});
      });
  }

  examApi() {
    console.log(this.state.classes);
    let formData = new FormData();
    formData.append('std_class', this.state.classes);
    let data = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
      body: formData,
    };
    fetch(myConst.BASEURL + 'viewexam', data)
      .then(response => response.json())
      .then(responseJson => {
        console.log('exam--->>>', responseJson);
        let response = responseJson.data;
        for (let i = 0; i < response.length; i++) {
          response[i].subject = response[i].Subject;
          response[i].u_date = response[i].exam_date;
          response[i].u_file = response[i].exam_file;
        }
        this.setState({
          dataSource: responseJson.data,
          originalDataSource: responseJson.data,
        });
      })
      .catch(error => console.log(error))
      .finally(() => {
        this.setState({isLoading: false});
      });
  }

  notesApi() {
    console.log(this.state.classes);
    let formData = new FormData();
    formData.append('std_class', this.state.classes);
    let data = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
      body: formData,
    };
    fetch(myConst.BASEURL + 'viewnotes', data)
      .then(response => response.json())
      .then(responseJson => {
        console.log('notes--->>>', responseJson);
        let response = responseJson.data;
        for (let i = 0; i < response.length; i++) {
          response[i].subject = response[i].subject;
          response[i].u_date = response[i].as_date;
          response[i].u_file = response[i].as_file;
        }
        this.setState({
          dataSource: responseJson.data,
          originalDataSource: responseJson.data,
        });
      })
      .catch(error => console.log(error))
      .finally(() => {
        this.setState({isLoading: false});
      });
  }

  onSearch(text) {
    console.log('on search', text);
    let filteredArr = this.state.originalDataSource.filter(object => {
      return object.subject.toLowerCase().includes(text);
    });
    console.log('filter--->', filteredArr);
    this.setState({
      dataSource: text ? filteredArr : this.state.originalDataSource,
    });
  }

  toggleFunction() {
    this.setState(state => ({
      isVisible: !state.isVisible,
    }));
  }

  render() {
    return (
      <LinearGradient colors={['#DFE6FF', '#ffffff']} style={{flex: 1}}>
        <View style={styles.MainContainer}>
          <CommonHeader
            title={this.state.title}
            onLeftClick={() => {
              this.props.navigation.goBack();
            }}
          />
          {/* <Header title={this.state.title}
                    goBack={() => {
                        this.props.navigation.goBack()
                    }}
                /> */}

          {/* {this.state.isVisible ? (
                    <Searchbar
                        onChangeSearch={(text) => this.onSearch(text)}
                    />
                ) : null} */}

          <CommonSearch searchText={d => this.onSearch(d.toLowerCase())} />
          <FlatList
            data={this.state.dataSource}
            renderItem={({item}) => (
              <View style={styles.FlatListView}>
                <View style={styles.CardView}>
                  <View style={styles.CardViewStyle}>
                    <View style={styles.DocImageAndTextStyle}>
                      {/* <View style={styles.CircleShapeView}> */}
                      <Image
                        style={styles.AssignmentImage}
                        source={constant.Icons.notes}
                      />
                      {/* </View> */}
                      <View style={styles.TextViewStyle}>
                        <Text style={styles.DashboardTextStyle}>
                          {this.props?.route?.params?.otherParam ===
                          'Exam Schedule'
                            ? item?.Subject
                            : item?.topic}
                        </Text>
                        {/* <Text style={styles.DateText}>{moment(item?.u_date).format('DD-MM-YYYY')}</Text> */}
                      </View>
                    </View>

                    <TouchableOpacity
                      onPress={
                        () => {
                          this.openFile(item);
                        }
                        // { this.historyDownload(item?.u_file) }
                      }>
                      <View>
                        <Image
                          style={styles.AssignmentDownloadImage}
                          resizeMode="contain"
                          source={constant.Icons.downloadIcon}
                        />
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )}
            keyExtractor={(item, index) => index}
          />

          {/* <View style={styles.FloatTabStyle}>
                    <TouchableOpacity onPress={() => this.toggleFunction()}>
                        <Image style={styles.FloatIconStyle}
                            source={require("../../../assests/images/loupe_icon.png")} />
                    </TouchableOpacity>
                </View> */}

          <Modal
            transparent={false}
            animationType={'slide'}
            onRequestClose={() => this.setState({isModalVisible: false})}
            visible={this.state.isModalVisible}>
            <View style={styles.PdfHeaderBackground}>
              <View style={styles.PdfHeaderStyle}>
              <View>
                  <Pressable
                    style={{
                      flex: 1,
                      paddingLeft: '10%',
                      height: '100%',
                      justifyContent: 'center',
                      marginTop:'5%'
                    }} onPress={() =>this.setState({ isModalVisible: false}) }>
                    <Image source={constant.Icons.backArrowIcon} tintColor={'#fff'} resizeMode='contain' style={{
                       height:constant.resW(8),
                       width:constant.resW(8),
                       marginTop:'5%'
                    }} />
                  </Pressable>
                </View>
                <Text style={styles.PdfHeaderText}>{this.state.pdfName}</Text>
                <TouchableOpacity
                  onPress={() => this.historyDownload(this.state.pdf)}>
                  <Image
                    style={styles.PdfHeaderArrowImage}
                    source={constant.Icons.downloadIcon}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.container}>
              {this.state.ext == 'pdf' ? (
                <Pdf
                  source={{
                    uri: 'http://139.59.90.236/images/' + this.state.pdf,
                    cache: true,
                  }}
                  trustAllCerts={false}
                  onLoadComplete={(numberOfPages, filePath) => {
                    console.log(`number of pages: ${numberOfPages}`);
                  }}
                  onPageChanged={(page, numberOfPages) => {
                    console.log(`current page: ${page}`);
                  }}
                  onError={error => {
                    console.log(error);
                  }}
                  onPressLink={uri => {
                    console.log(`Link presse: ${uri}`);
                  }}
                  style={styles.pdf}
                />
              ) : this.state.ext == 'jpeg' ||
                this.state.ext == 'jpg' ||
                this.state.ext == 'png' ? (
                <Image
                  source={{
                    uri: 'http://139.59.90.236/images/' + this.state.pdf,
                  }}
                  style={{height: '100%', width: '100%'}}
                  resizeMode="contain"
                />
              ) : (
                <Text style={styles.oopsText}>
                  Unable to view this file. You can download and share this
                  file.
                </Text>
              )}
            </View>
          </Modal>
        </View>
      </LinearGradient>
    );
  }
}
export default Syllabus;
