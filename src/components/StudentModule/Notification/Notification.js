import React, { Component } from 'react';
import { Text, View, FlatList, Image, BackHandler } from 'react-native';
import AsyncStorage from "@react-native-community/async-storage";
import Header from '../../Header/Header';
import style from './style';
import * as myConst from '../../Baseurl';
import CommonHeader from '../../CommonHeader';
import LinearGradient from 'react-native-linear-gradient';
import * as constant from '../../../Utils/Constant'
import CommonSearch from '../../Search/CommonSearch';

class Notification extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isVisible: false,
            std_roll: '',
            dataSource: [],
            name: '',
            class: '',
            section: '',
            admission_no: '',
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


    async componentDidMount(){
        const value = await AsyncStorage.getItem('@std_roll')
        console.log('value-->>', value)
        this.setState({
            std_roll: value
        })
        this.notificationApi();
    }

    notificationApi() {
        let formData = new FormData()
        formData.append('std_roll', this.state.std_roll)
        let data = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
            },
            body: formData
        }
        fetch(myConst.BASEURL + 'viewnotifications', data)
            .then((response) => response.json())
            .then((responseJson) => {
                console.log('data-->', responseJson.data)
                this.setState({
                    dataSource: responseJson.data,
                })

            })
            .catch((error) => console.log(error))
            .finally(() => {
                this.setState({ isLoading: false });
            })
    }


    render() {
        return (
            <LinearGradient colors={['#DFE6FF','#ffffff']} style={{flex:1}} >

            <View style={style.MainContainer}>
                {/* <Header title={'Notification'}
                    goBack={() => {
                        this.props.navigation.goBack()
                    }}
                /> */}
                <CommonHeader 
            title={'Notification'}
            onLeftClick={() => {
                this.props.navigation.goBack()
            }}
            />

                <FlatList
                    data={this.state.dataSource}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) =>
                        <View style={style.FlatListView}>
                            <View style={style.CardView}>
                                <View style={style.CardViewStyle}>
                                    <Image style={style.ProfileImage}
                                        source={constant.Icons.notifyIcon} />
                                    <Text numberOfLines={2} style={style.TextName}>{item.title}</Text>
                                </View>

                            </View>
                        </View>
                    }
                    keyExtractor={(item, index) => index}
                    ListFooterComponent={()=>constant.listSpace(constant.resW(10))}
                />

            </View>
            </LinearGradient>
        )
    }

}

export default Notification;