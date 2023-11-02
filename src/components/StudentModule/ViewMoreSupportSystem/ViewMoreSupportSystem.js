import React, { Component } from 'react';
import { Text, View, Image, FlatList, BackHandler } from 'react-native';
import AsyncStorage from "@react-native-community/async-storage";
import styles from './style';
import * as myConst from '../../Baseurl';
import style from './style';
import Header from '../../Header/Header';
import moment from 'moment';
import CommonHeader from '../../CommonHeader';
import LinearGradient from 'react-native-linear-gradient';
import * as constant from '../../../Utils/Constant'


class ViewMoreSupportSystem extends Component {

    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            isVisible: false,
            classes: '',
            section: '',
            name: '',
            rollno: '',
            issue: '',
            id: '',
            dataSource: []
        }
    }


    async componentDidMount() {
        const studentClass = await AsyncStorage.getItem('@class')
        const studentRollno = await AsyncStorage.getItem('@std_roll')
        const studentSection = await AsyncStorage.getItem('@section')
        const studentName = await AsyncStorage.getItem('@name')
        const issue = await AsyncStorage.getItem('@issue')
        const id = await AsyncStorage.getItem('@id')
        console.log('studentClass-->>', studentClass)
        console.log('studentSection-->>', studentSection)
        console.log('studentName-->>', studentName)
        console.log('issue-->>', issue)
        console.log('id-->', id)
        this.setState({
            classes: studentClass,
            section: studentSection,
            name: studentName,
            rollno: studentRollno, 
            issue: issue,
            id: id
        })
        this.viewMoreSupportSystemApi();
    }


    viewMoreSupportSystemApi() {
        let formData = new FormData()
        formData.append('id', this.state.id)
        let data = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
            },
            body: formData
        }
        fetch(myConst.BASEURL + 'ticketresponse', data)
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
                {/* <Header title={'View Support Details'}
                    goBack={() => {
                        this.props.navigation.goBack()
                    }}
                /> */}
 <CommonHeader 
            title={'View Support Details'}
            onLeftClick={() => {
                this.props.navigation.goBack()
            }}
            />
                <View style={styles.FlatListView}>
                    <View style={styles.CardView}>

                        <View style={styles.RowStyle}>
                            <View>
                                <Text style={styles.TextLeft}>Name : </Text>
                            </View>
                            <View>
                                <Text style={styles.TextRight}>{this.state.name}</Text>
                            </View>
                        </View>

                        <View style={styles.RowStyle}>
                            <View>
                                <Text style={styles.TextLeft}>Class : </Text>
                            </View>
                            <View>
                                <Text style={styles.TextRight}>{this.state.classes}</Text>
                            </View>
                        </View>

                        <View style={styles.RowStyle}>
                            <View>
                                <Text style={styles.TextLeft}>AdmissionNo : </Text>
                            </View>
                            <View>
                                <Text style={styles.TextRight}>{this.state.rollno}</Text>
                            </View>
                        </View>

                        <View style={styles.RowStyle}>
                            <View>
                                <Text style={styles.TextLeft}>Section : </Text>
                            </View>
                            <View>
                                <Text style={styles.TextRight}>{this.state.section}</Text>
                            </View>
                        </View>

                        <View style={styles.RowStyle}>
                            <View>
                                <Text style={styles.TextLeft}>Issue : </Text>
                            </View>
                            <View>
                                <Text style={styles.TextRight}>{this.state.issue}</Text>
                            </View>
                        </View>

                    </View>
                </View>

                <Text style={styles.QueryDetailText}>Query Details:- </Text>

                <FlatList
                    data={this.state.dataSource}

                    renderItem={({ item }) =>
                        <View style={styles.FlatListView}>
                            <View style={styles.RowCardView}>

                                <View style={styles.RowStyle}>
                                    <View>
                                        <Text style={styles.DetailTextLeft}>TicketNo : </Text>
                                    </View>
                                    <View>
                                        <Text style={styles.DetailTextRight}>{item.supportticket_id}</Text>
                                    </View>
                                </View>

                                <View style={styles.RowStyle}>
                                    <View>
                                        <Text style={styles.DetailTextLeft}>TeacherName : </Text>
                                    </View>
                                    <View>
                                        <Text style={styles.DetailTextRight}>{item.teachername}</Text>
                                    </View>
                                </View>

                                <View style={styles.RowStyle}>
                                    <View>
                                        <Text style={styles.DetailTextLeft}>Response : </Text>
                                    </View>
                                    <View>
                                        <Text style={styles.DetailTextRight}>{item.response}</Text>
                                    </View>
                                </View>

                                <View style={styles.RowStyle}>
                                    <View>
                                        <Text style={styles.DetailTextLeft}>Deadline : </Text>
                                    </View>
                                    <View>
                                        <Text style={styles.DetailTextRight}>{item.deadline}</Text>
                                    </View>
                                </View>

                                <View style={styles.RowStyle}>
                                    <View>
                                        <Text style={styles.DetailTextLeft}>Query Date : </Text>
                                    </View>
                                    <View>
                                        <Text style={styles.DetailTextRight}>{moment(item.created_at).format('DD-MM-YYYY')}</Text>
                                    </View>
                                </View>

                            </View>
                        </View>
                    }

                    keyExtractor={(item, index) => index}
                />
            </View>
            </LinearGradient>
        )
    }

}

export default ViewMoreSupportSystem;