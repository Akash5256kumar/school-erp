import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity, BackHandler, FlatList } from 'react-native';
import styles from './style';
const baseColor = '#0747a6'
import * as myConst from '../../Baseurl';
import AsyncStorage from "@react-native-community/async-storage";


class StaffViewItemQuery extends Component {


    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            dataSource: [],

        }
    }


    componentDidMount() {
        this.getViewItemQueryApi()
    }


    showMessage(message) {
        Snackbar.show({
            text: message,
            duration: Snackbar.LENGTH_SHORT,
            backgroundColor: '#f15270'
        });
    }


    getViewItemQueryApi() {
        let data = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        }
        this.setState({ isLoading: true });
        fetch(myConst.BASEURL + 'get_item', data)
            .then((response) => response.json())
            .then(async (responseJson) => {
                if (responseJson.status === true) {
                    // console.log('responseJson-->', responseJson.data)
                    this.setState({ isLoading: false });

                    let response = responseJson.data
                    console.log('response', response)
                    for (let i = 0; i < response.length; i++) {
                        response[i].itemName = JSON.parse(response[i].item_name)[0]
                        response[i].newCost = JSON.parse(response[i].cost)[0]
                        response[i].NumQuantity = JSON.parse(response[i].quantity)[0]
                        response[i].Purpose = JSON.parse(response[i].purpose)[0]
                    }

                    this.setState({
                        dataSource: response
                    })

                } else if (responseJson.status === false) {
                    this.showMessage(responseJson.message)
                }
            })
            .catch((error) => console.log(error))
            .finally(() => {
                this.setState({ isLoading: false });
            })
    }


    async viewMore(item) {
        await AsyncStorage.setItem('@MySuperStore:key', JSON.stringify(item));
        this.props.navigation.navigate("StaffViewItemQueryDetails")
    }



    render() {
        return (
            <View style={styles.MainContainer}>
                <View style={styles.HeaderBackground}>
                    <View style={styles.HeaderStyle}>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                            <Image style={styles.HeaderArrowImage}
                                source={require('../../../assests/images/leftarrow.png')} />
                        </TouchableOpacity>
                        <Text style={styles.HeaderText}>View Query</Text>
                        <View></View>
                    </View>
                </View>

                <FlatList
                    data={this.state.dataSource}

                    renderItem={({ item }) =>
                        <View style={styles.FlatListView}>
                            <View style={styles.CardView}>

                                <View style={styles.TopRowStyle}>
                                    <View style={styles.RowStyle}>
                                        <Text style={styles.TextLeft}>Department</Text>
                                        <Text style={styles.TextRight}>{item.department}</Text>
                                    </View>

                                    <View style={styles.RowStyle}>
                                        <Text style={styles.TextLeft}>Item Name</Text>
                                        <Text style={styles.TextRight}>{item.itemName}</Text>
                                    </View>

                                    <View style={styles.RowStyle}>
                                        <TouchableOpacity
                                            onPress={() => this.viewMore(item)}
                                        >
                                            <Image style={styles.ViewMoreImage}
                                                source={require('../../../assests/images/view_more.png')} />
                                        </TouchableOpacity>
                                    </View>
                                </View>

                                <View style={styles.bottomRowStyle}>
                                    <View style={styles.RowStyle}>
                                        <Text style={styles.TextLeft}>Quantity</Text>
                                        <Text style={styles.TextRight}>{item.NumQuantity}</Text>
                                    </View>

                                    <View style={styles.RowStyle}>
                                        <Text style={styles.TextLeft}>Cost</Text>
                                        <Text style={styles.TextRight}>{item.newCost}</Text>
                                    </View>

                                    <View style={styles.RowStyle}>
                                        <Text style={styles.TextLeft}>Purpose</Text>
                                        <Text style={styles.TextRight}>{item.Purpose}</Text>
                                    </View>

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

export default StaffViewItemQuery;