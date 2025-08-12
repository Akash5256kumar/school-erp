import React, { useEffect, useState, useCallback } from 'react';
import {
  Image,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  BackHandler,
  Alert,
  StatusBar,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import * as constant from '../../../Utils/Constant';
import styles from './style';
import LinearGradient from 'react-native-linear-gradient';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import * as myConst from '../../Baseurl';

const baseColor = '#0747a6';

const Home = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [section, setSection] = useState('');
  const [classes, setClasses] = useState('');
  const [name, setName] = useState('');
  const [dataSource, setDataSource] = useState([]);

  const handleBackPress = useCallback(() => {
    Alert.alert(
      'Exit',
      'Are you sure you want to exit ?',
      [
        { text: 'Cancel', onPress: () => null },
        { text: 'Confirm', onPress: () => BackHandler.exitApp() },
      ],
      { cancelable: false }
    );
    return true;
  }, []);

  const dashboardApi = useCallback((stdRoll, studentClass) => {
    let formData = {
      std_roll: stdRoll,
      class: studentClass,
    };
    console.log('API Request:', formData);

    fetch(myConst.BASEURL + 'dashboard', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData), // FIX: Must stringify for JSON body
    })
      .then((res) => res.json())
      .then((json) => {
        console.log('API Response:', JSON.stringify(json));
        setDataSource(json || []);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackPress);

    const fetchData = async () => {
      console.log('Home screen loaded');
      const studentClass = await AsyncStorage.getItem('@class');
      const studentSection = await AsyncStorage.getItem('@section');
      const studentName = await AsyncStorage.getItem('@name');
      const value1 = await AsyncStorage.getItem('@std_roll');

      console.log('studentClass:', studentClass);
      console.log('studentSection:', studentSection);
      console.log('studentName:', studentName);

      setClasses(studentClass || '');
      setSection(studentSection || '');
      setName(studentName || '');

      dashboardApi(value1, studentClass);
    };

    fetchData();

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
    };
  }, [handleBackPress, dashboardApi]);

  return (
    <LinearGradient colors={['#DFE6FF', '#DFE6FF', '#ffffff']} style={{ flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.MainContainer}>
          <StatusBar backgroundColor={constant.baseColor} />

          <ImageBackground
            style={styles.ContainerImage}
            resizeMode="cover"
            source={constant.Icons.homeIcon}
          >
            <View style={styles.imageMainView}>
              <View style={styles.imageSubView}>
                <Image
                  style={styles.HeaderImage}
                  source={require('../../../assests/images/businessman.png')}
                />
                <Pressable
                  style={styles.drawerButton}
                  onPress={() => navigation.openDrawer()}
                >
                  <Image source={constant.Icons.drawerIcon} style={styles.drawerIcon} />
                </Pressable>
              </View>

              <View style={styles.detailView}>
                <View style={styles.imageSubView2}>
                  <View style={styles.viewTop1}>
                    <Text style={styles.text1}>Good Evening </Text>
                    <Image
                      source={constant.Icons.hayIcon}
                      resizeMode="contain"
                      style={styles.hayIcon}
                    />
                  </View>
                  <Text style={styles.text2}>{name}</Text>
                  <Text style={styles.text3}>
                    {classes}, Section-{section}
                  </Text>
                </View>

                <Pressable
                  style={styles.bellIconView}
                  onPress={() => navigation.navigate('Notification')}
                >
                  <Image source={constant.Icons.bellIcon} style={styles.bellIcon} />
                </Pressable>
              </View>
            </View>
          </ImageBackground>

          <ScrollView>
            <View style={{ marginStart: 10, marginEnd: 10, marginBottom: '20%' }}>
              {/* First Row */}
              <View style={styles.HomeScreenView}>
                <TouchableOpacity onPress={() => navigation.navigate('SubjectScreen')}>
                  <View style={styles.CircleShapeView}>
                    <View style={styles.imageView}>
                      <Image style={styles.GridImage} source={constant.Icons.homeWork} />
                    </View>
                    <Text style={styles.GridText}>Home Work</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('Syllabus', { otherParam: 'Notes' })
                  }
                >
                  <View style={styles.CircleShapeView}>
                    <View style={styles.imageView}>
                      <Image style={styles.GridImage} source={constant.Icons.notesIcon} />
                    </View>
                    <Text style={styles.GridText}>Notes</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('Event')}>
                  <View style={styles.CircleShapeView}>
                    <View style={styles.imageView}>
                      <Image style={styles.GridImage} source={constant.Icons.eventIcon} />
                    </View>
                    <Text style={styles.GridText}>Events</Text>
                  </View>
                </TouchableOpacity>
              </View>

              {/* Second Row */}
              <View style={styles.HomeScreenView}>
                <TouchableOpacity onPress={() => navigation.navigate('FeeSummary')}>
                  <View style={styles.CircleShapeView}>
                    <View style={styles.imageView}>
                      <Image
                        style={styles.GridImage}
                        source={constant.Icons.summeryIcon}
                      />
                    </View>
                    <Text style={styles.GridText}>Fee{'\n'}Summary</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => navigation.navigate('Library', { otherParam: 'Books' })}
                >
                  <View style={styles.CircleShapeView}>
                    <View style={styles.imageView}>
                      <Image style={styles.GridImage} source={constant.Icons.bookIcon} />
                    </View>
                    <Text style={styles.GridText}>Library</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('News')}>
                  <View style={styles.CircleShapeView}>
                    <View style={styles.imageView}>
                      <Image style={styles.GridImage} source={constant.Icons.news} />
                    </View>
                    <Text style={styles.GridText}>NewsPaper</Text>
                  </View>
                </TouchableOpacity>
              </View>

              {/* Third Row */}
              <View style={styles.HomeScreenView}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('Syllabus', { otherParam: 'Exam Schedule' })
                  }
                >
                  <View style={styles.CircleShapeView}>
                    <View style={styles.imageView}>
                      <Image style={styles.GridImage} source={constant.Icons.examIcon} />
                    </View>
                    <Text style={styles.GridText}>Exam Schedule</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('Attendance')}>
                  <View style={styles.CircleShapeView}>
                    <View style={styles.imageView}>
                      <Image
                        style={styles.GridImage}
                        source={constant.Icons.attendanceIcon}
                      />
                    </View>
                    <Text style={styles.GridText}>Attendance</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('FeeDueDetail')}>
                  <View style={styles.CircleShapeView}>
                    <View style={styles.imageView}>
                      <Image style={styles.GridImage} source={constant.Icons.feeDueIcon} />
                    </View>
                    <Text style={styles.GridText}>Fee Due Details</Text>
                  </View>
                </TouchableOpacity>
              </View>

              {/* Fourth Row */}
              <View style={styles.HomeScreenView}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('Syllabus', { otherParam: 'Syllabus' })
                  }
                >
                  <View style={styles.CircleShapeView}>
                    <View style={styles.imageView}>
                      <Image
                        style={styles.GridImage}
                        source={require('../../../assests/images/syllabus.png')}
                      />
                    </View>
                    <Text style={styles.GridText}>Syllabus</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('Transport')}>
                  <View style={styles.CircleShapeView}>
                    <View style={styles.imageView}>
                      <Image
                        style={styles.GridImage}
                        source={constant.Icons.transportIcon}
                      />
                    </View>
                    <Text style={styles.GridText}>Transport</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('Holiday')}>
                  <View style={styles.CircleShapeView}>
                    <View style={styles.imageView}>
                      <Image
                        style={styles.GridImage}
                        source={require('../../../assests/images/holiday.png')}
                      />
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
  );
};

export default Home;
