import React, { Component } from 'react';
import { Image, View, Text, TouchableOpacity, StyleSheet, Alert,Pressable,ScrollView } from "react-native";
const baseColor = '#0747a6'
import AsyncStorage from "@react-native-community/async-storage";
import LinearGradient from 'react-native-linear-gradient';
import * as constant from '../Utils/Constant'

class SideBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            admissionNo: '',
            name: '',
            date: '',
            time: '',
            dataSource: []
        }

    }


    async componentDidMount() {
        const { navigation } = this.props;
        navigation.addListener('focus', async () => {
            // call your refresh method here
            console.log('sidebar')
            const value = await AsyncStorage.getItem('@name')
            const value1 = await AsyncStorage.getItem('@std_roll')
            const datee = await AsyncStorage.getItem('@date')
            const timee = await AsyncStorage.getItem('@time')
            console.log('value-->>', value)
            console.log('value2-->', value1)
            this.setState({
                name: value,
                std_roll: value1,
                date: datee,
                time: timee
            })
        });

    }



    render() {
        return (
            <LinearGradient colors={['#A902FE','#5E3BF9','#5E3BF9']} style={{flex:1}} >
                <View style={{  }}>
                <Pressable style={styles.bellIconView}  onPress={() => this.props.navigation.navigate('Notification')}>
                                    <Image source={constant.Icons.bellIcon} style={styles.bellIcon} />
                                    <Pressable style={styles.drawerButton2}>
                                    </Pressable>  
                                </Pressable>
                    <View style={styles.ImageStyleView}>
                        <TouchableOpacity
                          style={styles.imageButton}
                            onPress={() => this.props.navigation.navigate('Profile')}>
                            <Image style={styles.ProfileImage}
                                source={require('../assests/images/businessman.png')} />
                        </TouchableOpacity>
                        <Text style={styles.TextStyle}>{this.state.name}</Text>
                        <Text style={styles.TextStyle2}>{this.state.std_roll}</Text>
                    </View>
                    <View style={styles.LoginDetails}>
                        <Text style={styles.LastLoginText}>Last Login : </Text>
                        <Text style={styles.DateTimeText}>{this.state.date} {this.state.time}</Text>
                    </View>
                </View>
                <ScrollView>
                <View style={styles.DrawerBackground}>
                    <View style={styles.Sideview}>

                        <TouchableOpacity style={styles.touchStyle}
                            onPress={() => this.props.navigation.navigate('Home')}
                        >
                            <Image style={styles.DrawerImage}
                                source={constant.Icons.drawerHome} />
                            <Text style={styles.sideText}>Home</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.touchStyle}
                            onPress={() => this.props.navigation.navigate('Sibling')}
                        >
                            <Image style={styles.DrawerImage}
                                source={constant.Icons.sibling} />
                            <Text style={styles.sideText}>Siblings</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.touchStyle}
                            onPress={() => this.props.navigation.navigate('RateUs')}
                        >
                            <Image style={styles.DrawerImage}
                                source={constant.Icons.rating} />
                            <Text style={styles.sideText}>Rate Us</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.touchStyle}
                            onPress={() => this.props.navigation.navigate('ContactUs')}
                        >
                            <Image style={styles.DrawerImage}
                                source={constant.Icons.drawerContact} />
                            <Text style={styles.sideText}>Contact Us</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.touchStyle}
                            onPress={() => this.props.navigation.navigate("LoginDevice")}
                        >
                            <Image style={styles.DrawerImage}
                                source={constant.Icons.loginDevice} />
                            <Text style={styles.sideText}>Login devices</Text>
                        </TouchableOpacity>


                        {/* <TouchableOpacity onPress={() =>
                            Alert.alert(
                                'Log out',
                                'Do you want to logout?',
                                [
                                    { text: 'Cancel', onPress: () => { return null } },
                                    {
                                        text: 'Confirm', onPress: () => {
                                            AsyncStorage.clear();
                                            this.props.navigation.navigate('Login')
                                            // BackHandler.exitApp();
                                        }
                                    },
                                ],
                                { cancelable: false }
                            )
                        }>
                            <View style={{ flexDirection: 'row'}}>
                                <Image style={styles.DrawerImage}
                                    source={require('../assests/images/logout.png')} />
                                <Text style={styles.sideText}>Logout</Text>
                            </View>
                        </TouchableOpacity> */}

                        <Pressable style={styles.logoutButton}
                        onPress={() =>
                            Alert.alert(
                                'Log out',
                                'Do you want to logout?',
                                [
                                    { text: 'Cancel', onPress: () => { return null } },
                                    {
                                        text: 'Confirm', onPress: () => {
                                            AsyncStorage.clear();
                                            this.props.navigation.navigate('Login')
                                            // BackHandler.exitApp();
                                        }
                                    },
                                ],
                                { cancelable: false }
                            )
                        }
                        >
                            <Text style={styles.logoutText}>Logout</Text>
                            <Image style={styles.logoutImage}
                                    source={constant.Icons.logout} />
                        </Pressable>
                        {/* </View> */}
                    </View>
               
                </View>
                </ScrollView>
            
            </LinearGradient>
        )
    }

}

const styles = StyleSheet.create({
    touchStyle: {
        flexDirection: 'row',
        alignItems:'center',
        paddingVertical:'5%'
    },
    Sideview: {
        paddingHorizontal: '8%',
        justifyContent: 'space-around',
        marginTop:'9%'
    },
    sideText: {
        marginLeft: '5%',
        fontSize: constant.font20,
        color: constant.whiteColor,
        fontFamily:constant.typeRegular
    },
    ImageStyleView: {
        // backgroundColor: baseColor,
        alignItems: 'center'
    },
    ProfileImage: {
        height:constant.resW(23),
        width:constant.resW(23),
        borderRadius:constant.resW(40),
    },
    TextStyle: {
        color:'#FFD14A',
        fontSize: constant.font22,
        fontFamily:constant.typeSemiBold,
        alignSelf:'center'
    },
    TextStyle2: {
        color:constant.whiteColor,
        fontSize: constant.font16,
        fontFamily:constant.typeMedium,
        alignSelf:'center'
    },
    LastLoginStyle: {
        display: 'flex',
        flexDirection: 'row',
    },
    LastLoginText: {
        color: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        // marginTop: 3,
        // marginStart: 20,
        // marginBottom: 20,
        fontSize: constant.font10,
        fontFamily:constant.typeRegular
    },
    LoginDetails: {
        flexDirection: 'row',
        backgroundColor:'#ffffff30',
        alignItems:'center',
        justifyContent:'center',
        alignSelf:'center',
        paddingHorizontal:'4.5%',
        borderRadius:20,
        paddingVertical:'1.5%',
        marginTop:'3%'
    },
    DateTimeText: {
        color: constant.whiteColor,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 2,
        fontSize: constant.font10,
        fontFamily:constant.typeRegular
        // marginBottom: 20
    },
    DrawerImage: {
        height: constant.resW(7),
        width: constant.resW(7)
    },
    DrawerBackground: {
        // backgroundColor: 'white', 
        height: '100%'
    },
    bellIcon:{
        height:constant.resW(7),
        width:constant.resW(7),
    },
    bellIconView:{
        height:constant.resW(10),
        width:constant.resW(10),
        backgroundColor:'#ffffff89',
        borderRadius:constant.resW(30),
        alignItems:'center',
        justifyContent:'center',
        marginTop:'5%',
        alignSelf:'flex-end',
        marginRight:'8%'
    },
    detailView:{
        flexDirection:'row',
        justifyContent:'space-between',
        flex:1,
    },
    drawerButton:{
    position:'absolute',
    top:0,
    left:0
    },
    drawerButton2:{
        position:'absolute',
        top:-4,
        right:-4,
        height:constant.resW(4),
        width:constant.resW(4),
        borderRadius:constant.resW(10),
        backgroundColor:'#FFD14A'
        },
        imageButton:{
            height:constant.resW(29),
            width:constant.resW(29),
            backgroundColor:'#ffffff40',
            borderRadius:constant.resW(40),
            justifyContent:'center',
            alignItems:'center',
            marginTop:'4%',
            marginBottom:'3%'
        },
        logoutButton:{
            backgroundColor:'#ffffff40',
            borderRadius:10,
            flexDirection:'row',
            alignItems:'center',
            justifyContent:'center',
            alignSelf:'center',
            paddingVertical:'4%',
            paddingHorizontal:'12%',
            borderRadius:constant.resW(40),
            marginTop:'30%',
            marginBottom:'10%'
        },
        logoutImage:{
            height:constant.resW(6.5),
            width:constant.resW(6.5),
            marginLeft:'3%'
        },
        logoutText:{
            color:constant.whiteColor,
            fontSize: constant.font15,
            fontFamily:constant.typeRegular,
        },
});

export default SideBar;