import React, { Component } from 'react';
import { Text, View, Image, FlatList, TouchableOpacity, BackHandler } from 'react-native';
import styles from './style';
const baseColor = '#0747a6'
import * as myConst from '../../Baseurl';
import Searchbar from '../../SearchBar';
import Header from '../../Header/Header';
import moment from 'moment';


class Holiday extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            isVisible: false,
            dataSource: [],
            status: '',
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
        this.props.navigation.navigate('Dashboard')
        return true;
    };


    componentDidMount() {
        this.holidayApi();
    }


    holidayApi() {
        let data = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
            },
        }
        fetch(myConst.BASEURL + 'viewholiday', data)
            .then((response) => response.json())
            .then(responseJson => {
                console.log('holiday>>', responseJson.data)

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
        console.log('on search =>', text)
        let filteredArr = this.state.originalDataSource.filter(object => {
            return object.holiday_de.toLowerCase().includes(text);
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
            <View style={styles.MainContainer}>

                <Header title={'Holiday'}
                    goBack={() => {
                        this.props.navigation.goBack()
                    }}
                />

                {this.state.isVisible ? (
                    <Searchbar
                        onChangeSearch={(text) => this.onSearch(text)}
                    />
                ) : null}

                <FlatList
                    data={this.state.dataSource}

                    renderItem={({ item }) =>
                        <View style={styles.FlatListView}>
                            <View style={styles.CardView}>

                                <View style={styles.CardViewStyle}>
                                    <View style={styles.DocImageAndTextStyle}>
                                        <View style={styles.CircleShapeView}>
                                            <Image style={styles.AssignmentImage}
                                                source={require("../../../assests/images/assignment.png")} />
                                        </View>
                                        <View style={styles.TextViewStyle}>
                                            <Text style={styles.DashboardTextStyle}>{item?.holiday_de}</Text>
                                            <Text style={styles.DateText}>{moment(item?.holiday_date).format('DD-MM-YYYY')}</Text>
                                        </View>
                                    </View>

                                    {/* <View style={styles.GreenStatusBackground}>
                                        <Text style={styles.StatusText}>{this.state.status}</Text>
                                    </View> */}
                                </View>
                            </View>
                        </View>
                    }
                    keyExtractor={(item, index) => index}
                />

                <View style={styles.FloatTabStyle}>
                    <TouchableOpacity onPress={() => this.toggleFunction()}>
                        <Image style={styles.FloatIconStyle}
                            source={require("../../../assests/images/loupe_icon.png")} />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

}

export default Holiday;