import React, { Component } from 'react';
import { Text, View, FlatList, Image, TouchableOpacity, BackHandler } from 'react-native';
import AsyncStorage from "@react-native-community/async-storage";
import Header from '../../Header/Header';
import style from './style';
import * as myConst from '../../Baseurl';

class Sibling extends Component {

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
            text: ''
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
        const value = await AsyncStorage.getItem('@std_roll')
        console.log('value-->>', value)
        this.setState({
            std_roll: value
        })
        this.siblingsApi();
    }


    async onSelectSibling(item) {
        await AsyncStorage.setItem('@id', String(item.id))
        await AsyncStorage.setItem('@class', item.Student_class)
        await AsyncStorage.setItem('@section', item.Student_section)
        await AsyncStorage.setItem('@name', item.Student_name)
        await AsyncStorage.setItem('@std_roll', item.std_roll)
        this.props.navigation.goBack()
    }


    siblingsApi() {
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
        fetch(myConst.BASEURL + 'viewsiblings', data)
            .then((response) => response.json())
            .then((responseJson) => {
                // console.log('data-->', responseJson)
                this.setState({
                    dataSource: responseJson.siblings,
                })

            })
            .catch((error) => console.log(error))
            .finally(() => {
                this.setState({ isLoading: false });
            })
    }


    render() {
        return (
            <View style={style.MainContainer}>
                <Header title={'Siblings'}
                    goBack={() => {
                        this.props.navigation.goBack()
                    }}
                />

                <FlatList
                    data={this.state.dataSource}

                    renderItem={({ item }) =>
                        <View style={style.FlatListView}>
                            <View style={style.CardView}>

                                <View style={style.CardViewStyle}>
                                    <View>
                                        <Image style={style.ProfileImage}
                                            source={require("../../../assests/images/businessman.png")} />
                                    </View>
                                    <View style={style.RowStyle}>
                                        <Text style={style.TextName}>{item?.Student_name}</Text>
                                        <View style={style.DetailStyle}>
                                            <Text style={style.TextDetails}>Adm No.  : </Text>
                                            <Text style={style.TextRight}> {item?.std_roll}</Text>
                                        </View>
                                        <View style={style.DetailStyle}>
                                            <Text style={style.TextDetails}>Class  : </Text>
                                            <Text style={style.TextRight}> {item?.Student_class}-{item?.Student_section}</Text>
                                        </View>

                                    </View>

                                    <TouchableOpacity onPress={() => { this.onSelectSibling(item) }}>
                                        <View style={style.ArrowStyle}>
                                            <Image style={style.ArrowImage}
                                                source={require("../../../assests/images/r_arrow.png")} />
                                            {this.state.std_roll === item?.std_roll ? (
                                                <Text style={style.TextName}>selected</Text>
                                            ) : (
                                                <Text style={style.TextName}>select</Text>
                                            )}
                                        </View>
                                    </TouchableOpacity>

                                </View>

                            </View>
                        </View>
                    }
                    keyExtractor={(item, index) => index}
                />
            </View>
        )
    }

}

export default Sibling;