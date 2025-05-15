import React, {Component} from 'react';
import {
  Text,
  View,
  FlatList,
  BackHandler,
  TouchableOpacity,
  Modal,
  PermissionsAndroid,
  Image,
  Pressable,
} from 'react-native';
import styles from './style';
import Header from '../../Header/Header';
import AsyncStorage from '@react-native-community/async-storage';
import * as myConst from '../../Baseurl';
import Snackbar from 'react-native-snackbar';
import moment from 'moment';
// import RNFetchBlob from 'rn-fetch-blob';
import Pdf from 'react-native-pdf';
import * as constant from '../../../Utils/Constant';
import BlobUtil from 'react-native-blob-util';


class FeeSummary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      std_roll: '',
      classes: '',
      dataSource: [],
      tutionFee: '',
      otherFee: '',
      isModalVisible: false,
      pdf: null,
      showDownload: false,
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
    const rollNo = await AsyncStorage.getItem('@std_roll');
    const classes = await AsyncStorage.getItem('@class');
    this.setState({
      std_roll: rollNo,
      classes: classes,
    });

    this.FeeSummaryApi();
  }

  showMessage(message) {
    Snackbar.show({
      text: message,
      duration: Snackbar.LENGTH_SHORT,
      backgroundColor: '#f15270',
    });
  }

  FeeSummaryApi() {
    // console.log('called', 'hitt')
    let formData = new FormData();
    formData.append('std_roll', this.state.std_roll);
    formData.append('class', this.state.classes);
    let data = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
      body: formData,
    };
    fetch(myConst.BASEURL + 'feesummary', data)
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.status === true) {
          let response = responseJson.feedata;
          let paidResponse = responseJson.paidarray;

          var startMonth = '',
            endMonth = '';

          var result = paidResponse.map(function (el, index) {
            var o = Object.assign({}, el, index);
            startMonth = moment()
              .month(paidResponse[index].startmonth - 1)
              .format('MMMM');
            endMonth = moment()
              .month(paidResponse[index].endmonth - 1)
              .format('MMMM');
            if (index === 0) {
              o.annualFee = response[0].admission_fees;
              o.totalFeeee =
                +response[0].tution_fees +
                +response[0].other_fees +
                +response[0].admission_fees;
              o.paidFeee = o.totalFeeee;

              if ((paidResponse[0].plan_type = 1)) {
                o.month = startMonth;
                console.log('month-->', startMonth);
              } else {
                o.month = startMonth + '-' + endMonth;
              }

              if (paidResponse[index].paymentdetails != null) {
                o.status = paidResponse[index].paymentdetails;
                console.log(paidResponse[index].paymentdetails);
              } else {
                o.status = 'failed';
              }

              o.date = paidResponse[index].created_at.split(' ')[0];
              o.orderID = paidResponse[index].order_id;
            } else {
              console.log(index);
              o.annualFee = '0';
              o.totalFeeee = +response[0].tution_fees + +response[0].other_fees;
              o.paidFeee = o.totalFeeee;

              if ((paidResponse[index].plan_type = 1)) {
                o.month = startMonth;
                console.log('month-->', startMonth);
              } else {
                o.month = startMonth + '-' + endMonth;
              }

              if (paidResponse[index].paymentdetails != null) {
                o.status = paidResponse[index].paymentdetails;
                console.log(paidResponse[index].paymentdetails);
              } else {
                o.status = 'failed';
              }

              o.date = paidResponse[index].created_at.split(' ')[0];
              o.orderID = paidResponse[index].order_id;
            }

            return o;
          });

          // console.log('result-->', result);
          this.setState({
            dataSource: result,
            tutionFee: response[0].tution_fees,
            otherFee: response[0].other_fees,
          });
        } else if (responseJson.status === false) {
          this.showMessage(responseJson.message);
        }
      })
      .catch(error => console.log(error))
      .finally(() => {
        this.setState({isLoading: false});
      });
  }

  historyDownload(id) {
    console.log('id-->', id);
    this.downloadHistory(id);
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
    //             this.downloadHistory(id);
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
    // console.log('file-->', id);
    // const {config, fs} = RNFetchBlob;
    // let PictureDir = fs.dirs.PictureDir;
    // console.log('PictureDir-->', PictureDir);
    // let date = new Date();
    // let options = {
    //   fileCache: true,
    //   addAndroidDownloads: {
    //     useDownloadManager: true,
    //     notification: true,
    //     path: PictureDir + '/' + id,
    //     // '/Download' +
    //     // Math.floor(date.getTime() + date.getSeconds() / 2),
    //     description: 'Report Download',
    //   },
    // };
    // config(options)
    //   .fetch('GET', 'http://139.59.90.236/receiptfile/' + id)
    //   .then(res => {
    //     constant.showAlert('Download Successfully');
    //     console.log('res -> ', JSON.stringify(res));
    //   })
    //   .catch(err => {
    //     console.log('err' + JSON.stringify(err));
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

  openFile = item => {
    console.log('item-->', item.id);
    this.setState({
      pdf: item.id,
      isModalVisible: true,
    });
  };

  render() {
    return (
      <View style={styles.MainContainer}>
        <Header
          title={'Fee Summary'}
          goBack={() => {
            this.props.navigation.goBack();
          }}
        />

        <FlatList
          data={this.state.dataSource}
          renderItem={({item}) => (
            <View style={styles.FlatListView}>
              <View style={styles.CardView}>
                <View style={styles.CardViewStyle}>
                  <View style={styles.DetailsContainer}>
                    <View>
                      <Text style={styles.TextLeft}>
                        ORDERID- {item.orderID}
                      </Text>
                    </View>
                    <View style={styles.RowStyle}>
                      <View>
                        <Text style={styles.TextLeft}>{item.month}</Text>
                      </View>
                      <View>
                        <Text style={styles.TextRight}>{item.date}</Text>
                      </View>
                    </View>
                  </View>

                  <View style={styles.RowStyle}>
                    <View>
                      <Text style={styles.TextLeft}>Tution Fee</Text>
                    </View>

                    <View>
                      <Text style={styles.TextRight}>
                        {this.state.tutionFee}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.RowStyle}>
                    <View>
                      <Text style={styles.TextLeft}>Other Fee</Text>
                    </View>

                    <View>
                      <Text style={styles.TextRight}>
                        {this.state.otherFee}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.RowStyle}>
                    <View>
                      <Text style={styles.TextLeft}>Annual Fee</Text>
                    </View>

                    <View>
                      <Text style={styles.TextRight}>{item.annualFee}</Text>
                    </View>
                  </View>

                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginStart: 10,
                      marginEnd: 10,
                      height: 60,
                    }}>
                    <View style={{display: 'flex', flexDirection: 'row'}}>
                      <View style={styles.rectangle}>
                        <Text style={styles.BoxText}>Total</Text>
                        <View style={styles.HorizontalLine}></View>
                        <Text style={styles.BoxText}>{item.totalFeeee}</Text>
                      </View>
                      <Text style={styles.TextLeft}>-</Text>
                    </View>

                    <View style={{display: 'flex', flexDirection: 'row'}}>
                      <View style={styles.rectangle}>
                        <Text style={styles.BoxText}>Paid</Text>
                        <View style={styles.HorizontalLine}></View>
                        <Text style={styles.BoxText}>{item.paidFeee}</Text>
                      </View>
                      <Text style={styles.TextLeft}>=</Text>
                    </View>

                    <View style={styles.rectangle}>
                      <Text style={styles.StatusText}>{item.status}</Text>
                    </View>
                  </View>

                  <View style={styles.DownloadContainer}>
                    <View style={styles.DetailBox}>
                      <TouchableOpacity
                        onPress={() => {
                          this.openFile(item);
                        }}>
                        <Text style={styles.ContainerText}>
                          Download Receipt
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          )}
          keyExtractor={(item, index) => index}
        />

        <Modal
          transparent={false}
          animationType={'slide'}
          onRequestClose={() =>
            this.setState({isModalVisible: false, showDownload: false})
          }
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
                    }} onPress={() =>this.setState({ isModalVisible: false, showDownload: false }) }>
                    <Image source={constant.Icons.backArrowIcon} tintColor={'#fff'} resizeMode='contain' style={{
                       height:constant.resW(8),
                       width:constant.resW(8),
                       marginTop:'5%'
                    }} />
                  </Pressable>
                </View>
              <Text style={styles.PdfHeaderText}>Receipt</Text>
              <TouchableOpacity
                onPress={() =>
                  this.state.showDownload
                    ? this.historyDownload(this.state.pdf)
                    : null
                }>
                {this.state.showDownload && (
                  <Image
                    style={styles.PdfHeaderArrowImage}
                    source={constant.Icons.downloadIcon}
                  />
                )}
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.container}>
            {/* {this.state.ext == "pdf" ? */}
            <Pdf
              source={{
                uri: 'http://139.59.90.236/receiptfile/' + this.state.pdf,
                cache: true,
              }}
              trustAllCerts={false}
              onLoadComplete={(numberOfPages, filePath) => {
                this.setState({showDownload: true});
                console.log(`number of pages: ${numberOfPages}`);
              }}
              onPageChanged={(page, numberOfPages) => {
                console.log(`current page: ${page}`);
              }}
              onError={error => {
                console.log('err', error);
              }}
              onPressLink={uri => {
                console.log(`Link presse: ${uri}`);
              }}
              style={styles.pdf}
            />
            {/* :
                            ((this.state.ext == "jpeg" || this.state.ext == "jpg" || this.state.ext == "png") ?

                                <Image source={{ uri: 'http://139.59.90.236:84/images/' + this.state.pdf }} style={{ height: "100%", width: "100%" }} resizeMode="contain" /> :
                                <Text style={styles.oopsText}>Unable to view this file. You can download and share this file.</Text>
                            )
                        } */}
          </View>
        </Modal>
      </View>
    );
  }
}

export default FeeSummary;
