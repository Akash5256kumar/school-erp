import React, { Component } from 'react';
import { Text, View, Image, FlatList, TouchableOpacity, BackHandler, Pressable } from 'react-native';
import AsyncStorage from "@react-native-community/async-storage";
import styles from './style';
const baseColor = '#0747a6'
import * as myConst from '../../Baseurl';
import Searchbar from '../../SearchBar';
import Header from '../../Header/Header';
import CommonHeader from '../../CommonHeader';
import LinearGradient from 'react-native-linear-gradient';
import * as constant from '../../../Utils/Constant'
import CommonSearch from '../../Search/CommonSearch';

class Multimedia extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            isVisible: false,
            classes: '',
            section: '',
            dataSource: [],
            originalDataSource: []
        }

    }


    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    }

    handleBackPress = () => {
        this.props.navigation.navigate('Home')
        return true;
    };


    async componentDidMount() {
        const value = await AsyncStorage.getItem('@class')
        const section = await AsyncStorage.getItem('@section')
        console.log('value-->>', value)
        this.setState({
            classes: value,
            section: section
        })
        this.multimediaApi();
    }



    multimediaApi() {
        console.log(this.state.classes);
        let formData = new FormData()
        formData.append('std_class', this.state.classes)
        formData.append('std_section', this.state.section)
        let data = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
            },
            body: formData
        }
        fetch(myConst.BASEURL + 'viewvideo', data)
            .then((response) => response.json())
            .then((responseJson) => {
                console.log('video--->>>', responseJson)
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


    onSearch(text) {
        console.log('on search', text);
        let filteredArr = this.state.originalDataSource.filter(object => {
            return object.chapter.toLowerCase().includes(text);
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
        return (
            <LinearGradient colors={['#DFE6FF','#ffffff']} style={{flex:1}} >

            <View style={styles.MainContainer}>
                {/* <View style={styles.HeaderBackground}>
                    <View style={styles.HeaderStyle}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Home')}>
                            <Image style={styles.HeaderArrowImage}
                                source={require('../../../assests/images/leftarrow.png')} />
                        </TouchableOpacity>
                        <Text style={styles.HeaderText}>Multimedia</Text>
                        <View></View>
                    </View>
                </View> */}
                 <CommonHeader title={'Multimedia'}  onLeftClick={() => {this.props.navigation.goBack() }} />
                 <CommonSearch searchText={(d)=>this.onSearch(d.toLowerCase())} />


                {/* {this.state.isVisible ? (
                    <Searchbar
                        onChangeSearch={(text) => this.onSearch(text)}
                    />
                ) : null} */}

                <FlatList
                    data={this.state.dataSource}

                    renderItem={({ item }) =>
                        // <View style={styles.FlatListView}>
                            <View style={styles.CardView}>
                                <View style={styles.CardViewStyle}>
                                    <Pressable style={styles.DocImageAndTextStyle}
                                    onPress={() => this.props.navigation.navigate('Video', {
                                        otherParam: item.videouri
                                    })
                                    }
                                    >
                                        <View style={styles.VideoView}>
                                            {/* <View style={styles.backgroundContainer}>
                                                <Image source={{ uri: "https://homepages.cae.wisc.edu/~ece533/images/airplane.png" }}
                                                    resizeMode='cover' style={styles.backdrop} />
                                            </View> */}
                                            <View style={styles.logo}>
                                                {/* <TouchableOpacity > */}
                                                    <Image  source={require('../../../assests/images/playicon.png')} resizeMode='contain' style={styles.mediaIcon}/>
                                                {/* </TouchableOpacity> */}
                                            </View>
                                        </View>
                                        <View style={styles.TextViewStyle}>
                                            <Text style={styles.DashboardTextStyle}>{item?.chapter}</Text>
                                            <Text style={styles.DateText}>{item?.topic}</Text>
                                        </View>
                                    </Pressable>

                                </View>
                            </View>
                        // </View>
                    }
                    keyExtractor={(item, index) => index}
                />
{/* 
                <View style={styles.FloatTabStyle}>
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
export default Multimedia;