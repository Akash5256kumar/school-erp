import React, { Component } from 'react';
import { Text, View, Image, Modal, FlatList, TouchableOpacity, BackHandler, PermissionsAndroid,Alert } from 'react-native';
import styles from './style';
const baseColor = '#0747a6'
import * as myConst from '../../Baseurl';
import AsyncStorage from "@react-native-community/async-storage";
import Searchbar from '../../SearchBar';
import Header from '../../Header/Header';
import RNFetchBlob from 'rn-fetch-blob';
import Pdf from 'react-native-pdf';
import moment from 'moment';
import CommonHeader from '../../CommonHeader';
import LinearGradient from 'react-native-linear-gradient';
import * as constant from '../../../Utils/Constant'
import CommonSearch from '../../Search/CommonSearch';

class Assignment extends Component {

    constructor(props) { 
        super(props);
        this.state = {
            loading: false,
            isVisible: false,
            classes: '',
            dataSource: [],
            title: '',
            search: '',
            originalDataSource: [],
            ext: "",
            pdf: null,
            pdfName: null,
            isModalVisible: false,
            showDownload : false
        }

    }

    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    }

    handleBackPress = () => {
        this.props.navigation.navigate('Dashboard')
        return true;
    };


    async componentDidMount() {
        const { otherParam } = this.props.route.params;
        console.log('param-->', otherParam);
        this.setState({ title: otherParam })
        const value = await AsyncStorage.getItem('@class')
        console.log('value-->>', value)
        this.setState({
            classes: value
        })
        if (otherParam === 'Assignment') {
            this.assignApi();
        }
    }


    assignApi() {
        console.log(this.state.classes);
        let formData = new FormData()
        formData.append('std_class', this.state.classes)
        console.log("formData"+JSON.stringify(formData))
        let data = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
            },
            body: formData
        }
        fetch(myConst.BASEURL + 'viewassign', data)
            .then((response) => response.json())
            .then(responseJson => {
                console.log('assign--->>>', responseJson)
                this.setState({
                    dataSource: responseJson.data,
                    originalDataSource: responseJson.data
                })
            })
            .catch((error) => console.log(error))
            .finally(() => {
                this.setState({ isLoading: false });
            })
    }


    openFile = (item) => {
        console.log('item-->', item);
        let ext = item.as_file.split(".").pop();
        console.log('ext', ext);
        // Toast.show('You can share this file after download.');
        this.setState({
            ext: ext,
            pdf: item.as_file,
            pdfName: item.topic,
            isModalVisible: true
        })
    }



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



    async downloadHistory(file) {
        console.log('file-->', file)
        const { config, fs } = RNFetchBlob;
        let PictureDir = fs.dirs.PictureDir;
        console.log('PictureDir-->', PictureDir)
        let date = new Date();
        let options = {
            fileCache: true,
            addAndroidDownloads: {
                useDownloadManager: true,
                notification: true,
                path:
                    PictureDir + '/' +
                    file,
                    // '/Download' +
                    // Math.floor(date.getTime() + date.getSeconds() / 2),
                description: 'Report Download',
            },
        };
        config(options)
            .fetch('GET', 'http://139.59.90.236/images/' + file)
            .then((res) => {
                constant.showAlert("Download Successfully")
                //Showing alert after successful downloading
                console.log('res -> ', JSON.stringify(res));
                // this.openFile(file)
                // alert('Downloaded Successfully.');
            });
    }



    onSearch(text) {
        console.log('on search =>', text)
        // let originalArr = this.
        let filteredArr = this.state.originalDataSource.filter(object => {
            return object.topic.toLowerCase().includes(text);
        })
        console.log('filter--->', filteredArr);
        this.setState({
            dataSource: text ? filteredArr : this.state.originalDataSource
        });
    }


    toggleFunction() {
        this.setState((state) => ({
            isVisible: !state.isVisible,
        }));
    };



    render() {

        const resourceType = 'url';
        return (
            <LinearGradient colors={['#DFE6FF','#ffffff']} style={{flex:1}} >

            <View style={styles.MainContainer}>

                {/* <Header title={'Assignment'}
                    goBack={() => {
                        this.props.navigation.goBack()
                    }}
                /> */}
                 <CommonHeader 
            title={'Assignment'}
            onLeftClick={() => {
                this.props.navigation.goBack()
            }}
            />

                <CommonSearch 
                  searchText={(d)=>this.onSearch(d.toLowerCase())}
                  />
                {/* {this.state.isVisible ? (
                    <Searchbar
                        onChangeSearch={(text) => this.onSearch(text)}
                    />
                ) : null} */}

                {/* <Text style={styles.TextStyle}>Files</Text> */}
                <FlatList
                    data={this.state.dataSource}

                    renderItem={({ item }) =>
                        <View style={styles.FlatListView}>
                            <View style={styles.CardView}>

                                <View style={styles.CardViewStyle}>
                                    <View style={styles.DocImageAndTextStyle}>
                                            <Image style={styles.AssignmentImage} source={constant.Icons.assignment} />
                                        <View style={styles.TextViewStyle}>
                                            <Text style={styles.DashboardTextStyle}>{item?.topic}</Text>
                                            {/* <Text style={styles.DateText}>{moment(item?.as_date).format('DD-MM-YYYY')}</Text> */}
                                        </View>
                                    </View>

                                    <TouchableOpacity onPress={() => { this.openFile(item) }}>
                                        <View>
                                            <Image style={styles.AssignmentDownloadImage}
                                                source={constant.Icons.downloadIcon} />
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    }
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
                    animationType={"slide"}
                    onRequestClose={() => this.setState({ isModalVisible: false,showDownload:false })}
                    visible={this.state.isModalVisible}>

                    <View style={styles.PdfHeaderBackground}>
                        <View style={styles.PdfHeaderStyle}>
                            <View></View>
                            <Text style={styles.PdfHeaderText}>{this.state.pdfName}</Text>
                            <TouchableOpacity onPress={() => this.state.showDownload ?this.historyDownload(this.state.pdf) : null}>
                             {this.state.showDownload && <Image style={styles.PdfHeaderArrowImage} source={constant.Icons.downloadIcon} />}
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.container}>
                        {this.state.ext == "pdf" ?
                            <Pdf
                                source={{ uri: 'http://139.59.90.236/images/' + this.state.pdf }}
                                onLoadComplete={(numberOfPages, filePath) => {
                                    this.setState({showDownload:true})
                                    console.log(`number of pages: ${numberOfPages}`);
                                }}
                                onPageChanged={(page, numberOfPages) => {
                                    console.log(`current page: ${page}`);
                                }}
                                onError={(error) => {
                                    console.log(error);
                                }}
                                onPressLink={(uri) => {
                                    this.setState({showDownload:true})
                                    console.log(`Link presse: ${uri}`)
                                }}
                                style={styles.pdf} />
                            :
                            ((this.state.ext == "jpeg" || this.state.ext == "jpg" || this.state.ext == "png") ?

                                <Image source={{ uri: 'http://139.59.90.236/images/' + this.state.pdf }} style={{ height: "100%", width: "100%" }} resizeMode="contain" /> :
                                <Text style={styles.oopsText}>Unable to view this file. You can download and share this file.</Text>
                            )
                        }

                    </View>

                </Modal>

            </View>
            </LinearGradient>
        )
    }
}

export default Assignment;