import React, { Component } from 'react';
import { Text, View, Image, FlatList, TouchableOpacity, BackHandler, Linking, StatusBar, Pressable, Keyboard } from 'react-native';
import styles from './style';
const baseColor = '#0747a6'
import * as myConst from '../../Baseurl';
import Header from '../../Header/Header';
import Searchbar from '../../SearchBar';
import moment from 'moment';
import CommonHeader from '../../CommonHeader';
import LinearGradient from 'react-native-linear-gradient';
import * as constant from '../../../Utils/Constant'
import CommonSearch from '../../Search/CommonSearch';


class News extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            isVisible: false,
            classes: '',
            dataSource: [],
            originalDataSource: [],
            title: '',
            status: '',
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


    componentDidMount() {
        this.newsApi();
    }


    newsApi() {
        let data = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
            },
        }
        fetch(myConst.BASEURL + 'viewnews', data)
            .then((response) => response.json())
            .then((responseJson) => {
                console.log('news--->>>', responseJson)
                // console.log('data-->', responseJson.data)
                this.setState({
                    dataSource: responseJson.data,
                    originalDataSource: responseJson.data
                })

                let response = responseJson.data
                for (let i = 0; i < response.length; i++) {
                    if (response[i].isActive === 1) {
                        this.setState({ status: 'Publish' })
                    } else if (response[i].isActive === 0) {
                        this.setState({ status: 'UnPublish' })
                    }
                }
            })
            .catch((error) => console.log(error))
            .finally(() => {
                this.setState({ isLoading: false });
            })
    }


    onSearch(text) {
        console.log('on search', text);
        let filteredArr = this.state.originalDataSource.filter(object => {
            return object.news_title.toLowerCase().includes(text);
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

   fn_Click(item){
    Keyboard.dismiss()
    item?.link === null ? constant.showAlert("Opps,No Available ☹️") : Linking.openURL(item?.link)
    }


    render() {
        return (
            <LinearGradient colors={['#DFE6FF','#ffffff']} style={{flex:1}} >
            <View style={styles.MainContainer}>
            <CommonHeader 
            title={'News'}
            onLeftClick={() => {
                this.props.navigation.goBack()
            }}
            />
                {/* <Header title={'News'}
                    goBack={() => {
                        this.props.navigation.goBack()
                    }}
                /> */}
{/* 
                {this.state.isVisible ? (
                    <Searchbar
                        onChangeSearch={(text) => this.onSearch(text)}
                    />
                ) : null} */}
                  <CommonSearch 
                  searchText={(d)=>this.onSearch(d.toLowerCase())}
                  />
                <FlatList
                    data={this.state.dataSource}
                    keyboardShouldPersistTaps='always'
                    renderItem={({ item }) =>
                        <Pressable style={styles.FlatListView} onPress={() => this.fn_Click(item)}>
                            <View style={styles.CardView}>
                                <View style={styles.CardViewStyle}>
                                    <View style={styles.DocImageAndTextStyle}>
                                        {/* <View style={styles.CircleShapeView}> */}
                                            <Image style={styles.AssignmentImage}
                                                source={constant.Icons.newsIcon} />
                                        {/* </View> */}
                                        <View style={styles.TextViewStyle}>
                                            <Text style={styles.DashboardTextStyle}>{item?.news_title}</Text>
                                            {/* <Text style={styles.DateText}>{item?.news_description}</Text> */}

                                            {/* <Text style={styles.LinkText}
                                                onPress={() => item?.link === null ? null : Linking.openURL(item?.link)}>
                                                {item?.link}</Text> */}
                                            {/* <Text style={styles.DateText}>{moment(item?.news_date).format('DD-MM-YYYY')}</Text> */}
                                        </View>
                                    </View>
                                       
                                    <View style={styles.GreenStatusBackground}>
                                    <Image style={styles.eyeIcon}
                                                source={constant.Icons.newsEyeIcon} />
                                        {/* <Text style={styles.StatusText}>{this.state.status}</Text> */}
                                    </View>
                                </View>
                            </View>
                        </Pressable>
                    }
                    keyExtractor={(item, index) => index}
                />

                {/* <View style={styles.FloatTabStyle}>
                    <TouchableOpacity onPress={() => this.toggleFunction()}>
                        <Image style={styles.FloatIconStyle}
                            source={require("../../../assests/images/loupe_icon.png")} />
                    </TouchableOpacity>
                </View> */}

            </View>
            </LinearGradient>
        )
    }



}

export default News;