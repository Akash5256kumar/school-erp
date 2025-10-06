import React, { useState, useEffect } from 'react';
import { Image, View, Text, TouchableOpacity, StyleSheet, Alert, Pressable, ScrollView } from "react-native";
const baseColor = '#0747a6'; // Note: This variable is defined but not used in the styles.
import AsyncStorage from "@react-native-community/async-storage";
import LinearGradient from 'react-native-linear-gradient';
import * as constant from '../Utils/Constant';
import { useSelector } from 'react-redux';

const SideBar = (props) => {
    const { navigation } = props;
    const userData = useSelector(state=>state.userSlice.userData)
    // State management using useState hook
    const [name, setName] = useState('');
    const [std_roll, setStdRoll] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    // Replaces componentDidMount with useEffect
    useEffect(() => {
        // The 'focus' event listener runs whenever the screen comes into focus.
        const unsubscribe = navigation.addListener('focus', async () => {
            try {
                const value = await AsyncStorage.getItem('@name');
                const value1 = await AsyncStorage.getItem('@std_roll');
                const datee = await AsyncStorage.getItem('@date');
                const timee = await AsyncStorage.getItem('@time');
                
                console.log('value-->>', value);
                console.log('value2-->', value1);

                setName(value || '');
                setStdRoll(value1 || '');
                setDate(datee || '');
                setTime(timee || '');
            } catch (error) {
                console.error("Failed to fetch data from AsyncStorage", error);
            }
        });

        // Return a cleanup function to unsubscribe from the event when the component unmounts
        return unsubscribe;
    }, [navigation]); // Dependency array ensures this effect runs only when navigation prop changes

    const handleLogout = () => {
        Alert.alert(
            'Log out',
            'Do you want to logout?',
            [
                { text: 'Cancel', onPress: () => null, style: 'cancel' },
                {
                    text: 'Confirm', onPress: () => {
                        AsyncStorage.clear();
                        navigation.navigate('RoleSelectionScreen');
                    }
                },
            ],
            { cancelable: false }
        );
    };

    return (
        <LinearGradient colors={['#A902FE', '#5E3BF9', '#5E3BF9']} style={{ flex: 1 }} >
            <View>
                {/* <Pressable style={styles.bellIconView} onPress={() => navigation.navigate('Notification')}>
                    <Image source={constant.Icons.bellIcon} style={styles.bellIcon} />
                    <Pressable style={styles.drawerButton2}>
                    </Pressable>
                </Pressable> */}
                <View style={styles.ImageStyleView}>
                    <TouchableOpacity
                        style={styles.imageButton}
                        onPress={() => navigation.navigate('Profile')}>
                        <Image style={styles.ProfileImage}
                            source={userData?.studentimage && userData?.studentimage === '' ?
                                  require('../assests/images/businessman.png')
                                  :
                                  {uri:"http://139.59.90.236:86/images/student_image/STUDENT/"+userData?.studentimage}
                                } />
                    </TouchableOpacity>
                    <Text style={styles.TextStyle}>{userData?.Student_name}</Text>
                    <Text style={styles.TextStyle2}>{userData?.std_roll}</Text>
                    <Text style={styles.TextStyle2}>{userData?.Student_class} Section-{userData?.Student_section}</Text>

                </View>
                {/* <View style={styles.LoginDetails}>
                    <Text style={styles.LastLoginText}>Last Login : </Text>
                    <Text style={styles.DateTimeText}>{date} {time}</Text>
                </View> */}
            </View>
            <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
                <View style={styles.DrawerBackground}>
                    <View style={styles.Sideview}>

                        <TouchableOpacity style={styles.touchStyle}
                            onPress={() => navigation.navigate('Home')}
                        >
                            {/* <Image style={styles.DrawerImage}
                                source={constant.Icons.drawerHome} /> */}
                            <Text style={styles.sideText}>Home</Text>
                        </TouchableOpacity>

                        {/* <TouchableOpacity style={styles.touchStyle}
                            onPress={() => navigation.navigate('Sibling')}
                        >
                            {/* <Image style={styles.DrawerImage}
                                source={constant.Icons.sibling} /> */}
                            {/* <Text style={styles.sideText}>Siblings</Text> */}
                        {/* </TouchableOpacity>  */}
                        <TouchableOpacity style={styles.touchStyle} onPress={() => navigation.navigate('Event')}>
                            <Text style={styles.sideText}>Event</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.touchStyle} onPress={() => navigation.navigate('Holiday')}>
                            <Text style={styles.sideText}>Holidays</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.touchStyle} onPress={() => navigation.navigate('Transport')}>
                            <Text style={styles.sideText}>Transport</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.touchStyle} onPress={() => navigation.navigate('Syllabus', { otherParam: 'Syllabus' })}>
                            <Text style={styles.sideText}>Syllabus</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.touchStyle} onPress={() => navigation.navigate('Syllabus', { otherParam: 'Exam Schedule' })}>
                            <Text style={styles.sideText}>Exam Schedule</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.touchStyle} onPress={() => navigation.navigate('Library', { otherParam: 'Books' })}>
                            <Text style={styles.sideText}>Library</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.touchStyle} onPress={() => navigation.navigate('Notes', { otherParam: 'Notes' })}>
                            <Text style={styles.sideText}>Notes</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.touchStyle} onPress={() => navigation.navigate('Multimedia')}>
                            <Text style={styles.sideText}>Multimedia</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.touchStyle}
                            onPress={() => navigation.navigate('RateUs')}
                        >
                            {/* <Image style={styles.DrawerImage}
                                source={constant.Icons.rating} /> */}
                            <Text style={styles.sideText}>Rate Us</Text>
                        </TouchableOpacity>

                        {/* <TouchableOpacity style={styles.touchStyle}
                            onPress={() => navigation.navigate('ContactUs')}
                        >
                            <Image style={styles.DrawerImage}
                                source={constant.Icons.drawerContact} />
                            <Text style={styles.sideText}>Contact Us</Text>
                        </TouchableOpacity> */}

                        <TouchableOpacity style={styles.touchStyle}
                            onPress={() => navigation.navigate("LoginDevice")}
                        >
                            {/* <Image style={styles.DrawerImage}
                                source={constant.Icons.loginDevice} /> */}
                            <Text style={styles.sideText}>Login devices</Text>
                        </TouchableOpacity>

                        <Pressable style={styles.logoutButton} onPress={handleLogout}>
                            <Text style={styles.logoutText}>Logout</Text>
                            <Image style={styles.logoutImage}
                                source={constant.Icons.logout} />
                        </Pressable>
                    </View>
                </View>
            </ScrollView>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    touchStyle: {
        flexDirection: 'row',
        alignItems:'center',
        paddingVertical:'3%',
        // borderBottomWidth:1,
        borderBottomColor:constant.whiteColor
        // backgroundColor:'red'
    },
    Sideview: {
        paddingHorizontal: constant.resW(5),
        justifyContent: 'space-around',
        marginTop:'4%'
    },
    sideText: {
        // marginLeft: '5%',
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
    },
    DrawerImage: {
        height: constant.resW(7),
        width: constant.resW(7)
    },
    DrawerBackground: {
        // height: '100%'
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
        marginTop:'10%',
        marginBottom:constant.resW(25)
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