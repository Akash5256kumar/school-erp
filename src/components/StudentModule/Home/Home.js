import React, { Component } from 'react';
import { Image, Text, View, TouchableOpacity, ImageBackground, ScrollView, BackHandler, Alert } from 'react-native';
import AsyncStorage from "@react-native-community/async-storage";
import * as constant from '../../../Utils/Constant'
import styles from './style';
import { StatusBar } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
const baseColor = '#0747a6'


class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            section: '',
            classes: '',
            name: '',
            dataSource: []
        }

    }

    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    }

    handleBackPress = () => {
        // BackHandler.exitApp();
        Alert.alert(
            'Exit',
            'Are you sure you want to exit ?',
            [
                { text: 'Cancel', onPress: () => { return null } },
                {
                    text: 'Confirm', onPress: () => {
                        BackHandler.exitApp();
                    }
                },
            ],
            { cancelable: false }
        )
        return true;
    };


    async componentDidMount() {
        // this.checkPermission();
        const { navigation } = this.props;
        navigation.addListener('focus', async () => {
            // call your refresh method here
            console.log('home screen')
            const studentClass = await AsyncStorage.getItem('@class')
            const studentSection = await AsyncStorage.getItem('@section')
            const studentName = await AsyncStorage.getItem('@name')
            console.log('studentClass-->>', studentClass)
            console.log('studentSection-->>', studentSection)
            console.log('studentName-->>', studentName)
            this.setState({
                classes: studentClass,
                section: studentSection,
                name: studentName
            })
        });


    }

    render() {
        return (
            <LinearGradient colors={['#DFE6FF','#DFE6FF','#ffffff']} style={{flex:1}} >
           <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.MainContainer}>
                <StatusBar  backgroundColor={constant.baseColor} />
                {/* <View> */}
                    <ImageBackground style={styles.ContainerImage} resizeMode='cover'
                        source={constant.Icons.homeIcon}>
                            <View style={styles.imageMainView}>
                                <View style={styles.imageSubView}>
                                <Image style={styles.HeaderImage} source={require('../../../assests/images/businessman.png')} />
                                 <Pressable style={styles.drawerButton} onPress={() => this.props.navigation.openDrawer()}>
                                    <Image source={constant.Icons.drawerIcon}  style={styles.drawerIcon} />
                                    </Pressable>  
                                    </View>
                                <View style={styles.detailView}>
                                <View style={styles.imageSubView2}>
                                 <View style={styles.viewTop1}>
                                    <Text style={styles.text1}>Good Evening </Text>
                                    <Image source={constant.Icons.hayIcon} resizeMode='contain'  style={styles.hayIcon} />
                                 </View>
                                 <Text style={styles.text2}>{this.state.name}</Text>
                                 <Text style={styles.text3}>{this.state.classes}, Section-{this.state.section}</Text>

                                </View>
                                <Pressable style={styles.bellIconView}  onPress={() => this.props.navigation.navigate('Notification')}>
                                    <Image source={constant.Icons.bellIcon} style={styles.bellIcon} />
                                    <Pressable style={styles.drawerButton2}>
                                    </Pressable>  
                                </Pressable>
                                </View>
                            </View>

                        {/* <View style={styles.HeaderView}>
                            <TouchableOpacity
                                onPress={() => this.props.navigation.openDrawer()}
                            >
                                <Image style={styles.HeaderImage}
                                    source={require('../../../assests/images/menu_white.png')} />
                            </TouchableOpacity>
                            <Text style={styles.HeaderText}>Dashboard</Text>
                            <TouchableOpacity
                                onPress={() => this.props.navigation.navigate('Notification')}
                            >
                                <Image style={styles.HeaderImage}
                                    source={require('../../../assests/images/notification.png')} />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.ProfileImageBackground}>
                            <Image style={styles.ProfileImage}
                                source={require('../../../assests/images/businessman.png')} />
                            <View style={styles.HeaderImageStyle}>
                                <Text style={styles.TextName}>{this.state.name}</Text>
                                <Text style={styles.TextAddress}>{this.state.classes},Section-{this.state.section}</Text>
                            </View>
                        </View> */}
                    </ImageBackground>
                {/* </View> */}

                <ScrollView>
                    <View style={{ marginStart: 10, marginEnd: 10,marginBottom:'20%' }}>
                        <View style={styles.HomeScreenView}>
                            <TouchableOpacity 
                            onPress={() => this.props.navigation.navigate('SubjectScreen')}
                            // onPress={() => this.props.navigation.navigate('Assignment', {
                            //     otherParam: 'Assignment',
                            // })
                            // }
                            >
                                <View style={styles.CircleShapeView}>
                                    <View style={styles.imageView}>
                                    <Image style={styles.GridImage}
                                        source={constant.Icons.homeWork} />
                                        </View>
                                    <Text style={styles.GridText}>Home Work</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Syllabus', {
                                otherParam: 'Notes',
                            })
                            }>
                                <View style={styles.CircleShapeView}>
                                <View style={styles.imageView}>
                                    <Image style={styles.GridImage}
                                        source={constant.Icons.notesIcon} />
                                        </View>
                                    <Text style={styles.GridText}>Notes</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Event')}>
                                <View style={styles.CircleShapeView}>
                                <View style={styles.imageView}>
                                    <Image style={styles.GridImage}
                                        source={constant.Icons.eventIcon} />
                                        </View>
                                    <Text style={styles.GridText}>Events</Text>
                                </View>
                            </TouchableOpacity>

                        </View>

                        <View style={styles.HomeScreenView}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('FeeSummary')}>
                                <View style={styles.CircleShapeView}>
                                <View style={styles.imageView}>
                                    <Image style={styles.GridImage}
                                        source={constant.Icons.summeryIcon} />
                                        </View>
                                    <Text style={styles.GridText}>Fee{'\n'}Summary</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Library', {
                                otherParam: 'Books',
                            })
                            }>
                                <View style={styles.CircleShapeView}>
                                <View style={styles.imageView}>
                                    <Image style={styles.GridImage}
                                        source={constant.Icons.bookIcon} />
                                        </View>
                                    <Text style={styles.GridText}>Books</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => this.props.navigation.navigate('News')}>
                                <View style={styles.CircleShapeView}>
                                <View style={styles.imageView}>
                                    <Image style={styles.GridImage}
                                        source={constant.Icons.news} />
                                        </View>
                                    <Text style={styles.GridText}>NewsPaper</Text>
                                </View>
                            </TouchableOpacity>

                        </View>

                        <View style={styles.HomeScreenView}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Syllabus', {
                                otherParam: 'Exam Schedule',
                            })
                            }>
                                <View style={styles.CircleShapeView}>
                                <View style={styles.imageView}>
                                    <Image style={styles.GridImage}
                                        source={constant.Icons.examIcon} />
                                        </View>
                                    <Text style={styles.GridText}>Exam Schedule</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Attendance')}>
                                <View style={styles.CircleShapeView}>
                                <View style={styles.imageView}>
                                    <Image style={styles.GridImage}
                                        source={constant.Icons.attendanceIcon} />
                                        </View>

                                    <Text style={styles.GridText}>Attendance</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => this.props.navigation.navigate('FeeDueDetail')}>
                                <View style={styles.CircleShapeView}>
                                <View style={styles.imageView}>
                                    <Image style={styles.GridImage}
                                        source={constant.Icons.feeDueIcon} />
                                        </View>
                                    <Text style={styles.GridText}>Fee Due Details</Text>
                                </View>
                            </TouchableOpacity>

                        </View>

                        <View style={styles.HomeScreenView}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Syllabus', {
                                otherParam: 'Syllabus',
                            })
                            }>
                                <View style={styles.CircleShapeView}>
                                <View style={styles.imageView}>
                                    <Image style={styles.GridImage}
                                        source={require('../../../assests/images/syllabus.png')} />
                                        </View>
                                    <Text style={styles.GridText}>Syllabus</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Transport')}>
                                <View style={styles.CircleShapeView}>
                                <View style={styles.imageView}>
                                    <Image style={styles.GridImage}
                                        source={constant.Icons.transportIcon} />
                                        </View>
                                    <Text style={styles.GridText}>Transport</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Holiday')}>
                                <View style={styles.CircleShapeView}>
                                <View style={styles.imageView}>
                                    <Image style={styles.GridImage}
                                        source={require('../../../assests/images/holiday.png')} />
                                        </View>
                                    <Text style={styles.GridText}>Holiday</Text>
                                </View>
                            </TouchableOpacity>

                        </View>

                    </View>
                </ScrollView>
            </View>
            </ScrollView>
           </LinearGradient>
        )
    }
}
export default Home;