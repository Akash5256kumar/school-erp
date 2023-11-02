import React, { Component } from 'react';
import { Text, View, Image, FlatList, TouchableOpacity, BackHandler} from 'react-native';
import styles from './style';
const baseColor = '#0747a6'
import * as myConst from '../../Baseurl';
import AsyncStorage from "@react-native-community/async-storage";
import Searchbar from '../../SearchBar';
import CommonHeader from '../../CommonHeader';
import LinearGradient from 'react-native-linear-gradient';
import * as constant from '../../../Utils/Constant'
import CommonSearch from '../../Search/CommonSearch';

class Achievement extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            isVisible: false,
            std_roll: '',
            dataSource: [],
            originalDataSource: [],
            position: ''
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
        const value = await AsyncStorage.getItem('@std_roll')
        console.log('value-->>', value)
        this.setState({
            std_roll: value
        })
        this.achievementApi();
    }

    
    achievementApi() {
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
        fetch(myConst.BASEURL + 'viewachievements', data)
            .then((response) => response.json())
            .then((responseJson) => {
                console.log('achievement-->', responseJson.data)
                let response = responseJson.data
                for (let i = 0; i < response.length; i++) {
                    if (response[i].position === 'i_point') {
                        this.setState({ position: '1st position' })
                    } else if (response[i].position === 'ii_point') {
                        this.setState({ position: '2nd position' })
                    } else if (response[i].position === 'iii_point') {
                        this.setState({ position: '3rd position' })
                    }
                }
                this.setState({
                    dataSource: response,
                    originalDataSource: response
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
            return object.achievement_level.toLowerCase().includes(text);
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
                        <Text style={styles.HeaderText}>Achievement</Text>
                        <View></View>
                    </View>
                </View> */}
                 <CommonHeader title={'Achievement'}  onLeftClick={() => {this.props.navigation.navigate('Home') }} />

                {/* {this.state.isVisible ? (
                    <Searchbar
                        onChangeSearch={(text) => this.onSearch(text)}
                    />
                ) : null} */}
              <CommonSearch searchText={(d)=>this.onSearch(d.toLowerCase())} />
                <FlatList
                    data={this.state.dataSource}

                    renderItem={({ item }) =>
                        // <View style={styles.FlatListView}>
                            <View style={styles.CardView}>

                                <View style={styles.TopRowStyle}>
                                    <View style={styles.RowStyle}>
                                        <Text style={styles.TextLeft}>Achievement Level</Text>
                                        <Text style={styles.TextRight}>{item.achievement_level}</Text>
                                    </View>

                                    <View style={styles.RowStyle}>
                                        <Text style={styles.TextLeft}>Achievement Date</Text>
                                        <Text style={styles.TextRight}>{item.achievement_date}</Text>
                                    </View>
                                </View>


                                <View style={styles.bottomRowStyle}>
                                    <View style={styles.RowStyle}>
                                        <Text style={styles.TextLeft}>Achievements Name</Text>
                                        <Text style={styles.TextRight}>{item.achievements_name}</Text>
                                    </View>

                                    <View style={styles.RowStyle}>
                                        <Text style={styles.TextLeft}>Admission Number</Text>
                                        <Text style={styles.TextRight}>{item.admission_no}</Text>
                                    </View>
                                </View>

                                <View style={styles.bottomRowStyle}>
                                    <View style={styles.RowStyle}>
                                        <Text style={styles.TextLeft}>Position Achieved</Text>
                                        <Text style={styles.TextRight}>{this.state.position}</Text>
                                    </View>

                                    <View style={styles.RowStyle}>
                                        <Text style={styles.TextLeft}>Marks Obtained</Text>
                                        <Text style={styles.TextRight}>{item.marks}</Text>
                                    </View>
                                </View>

                            </View>
                        // </View>
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

export default Achievement;