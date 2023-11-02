import React, { Component } from 'react';
import { Text, View, Image, FlatList, TouchableOpacity, BackHandler } from 'react-native';
import AsyncStorage from "@react-native-community/async-storage";
import styles from './style';
const baseColor = '#0747a6'
import * as myConst from '../../Baseurl';
import Searchbar from '../../SearchBar';
import Header from '../../Header/Header';
import moment from 'moment';

class Library extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            isVisible: false,
            std_roll: '',
            dataSource: [],
            heading: '',
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
    

    async componentDidMount() {
        let otherParam = null;
        if (this.props.route.params) {
            otherParam = this.props.route.params.otherParam;
            console.log('param-->', otherParam);
        }
        const value = await AsyncStorage.getItem('@std_roll')
        console.log('value-->>', value)
        this.setState({
            std_roll: value
        })
        if (otherParam === 'Books') {
            this.setState({ heading: 'Books' })
            this.libraryApi();
        }

    }



    libraryApi() {
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
        fetch(myConst.BASEURL + 'viewlibrary', data)
            .then((response) => response.json())
            .then(responseJson => {
                console.log('library>>', responseJson.data)
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
        console.log('serach-->', text);
        let filteredArr = this.state.originalDataSource.filter(object => {
            return object.title.toLowerCase().includes(text);
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

                <Header title={this.state.heading}
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
                                            <Text style={styles.DashboardTextStyle}>{item?.title}</Text>
                                            <Text style={styles.DateText}>{moment(item?.issue_date).format('DD-MM-YYYY')}</Text>
                                        </View>
                                    </View>

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

export default Library;