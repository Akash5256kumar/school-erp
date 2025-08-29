import React, { useState, useEffect, useCallback } from 'react';
import { Text, View, Image, FlatList, Pressable, ScrollView, BackHandler, TouchableOpacity } from 'react-native';
import AsyncStorage from "@react-native-community/async-storage";
import styles from './style';
import * as myConst from '../../Baseurl';
import Snackbar from 'react-native-snackbar';
import moment from 'moment';
import * as constant from '../../../Utils/Constant';
import LinearGradient from 'react-native-linear-gradient';
import { useFocusEffect } from '@react-navigation/native';
import { useSelector } from 'react-redux';

const ViewSupportSystem = ({ navigation }) => {
    const usertoken = useSelector(state=>state.userSlice.token)
    const [loading, setLoading] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [dataSource, setDataSource] = useState([]);
    const [pendingData, setPendingData] = useState([]);
    const [assignedData, setAssignedData] = useState([]);
    const [solvedData, setSolvedData] = useState([]);
    const [listShow, setListShow] = useState(false);
    const [filterTitle, setFilterTitle] = useState("Pending");
    const [stdRoll, setStdRoll] = useState('');

    // Back handler
    const handleBackPress = useCallback(() => {
        navigation.navigate('Home');
        return true;
    }, [navigation]);

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', handleBackPress);
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
        };
    }, [handleBackPress]);

    // Fetch initial data
    useFocusEffect(
        useCallback(() => {
          const fetchData = async () => {
            const value = await AsyncStorage.getItem('@std_roll');
            setStdRoll(value);
            setFilterTitle("Pending")
            viewSupportApi(value);
          };
          fetchData();
        }, [])
      );

    useEffect(() => {
        if (stdRoll) {
            // viewSupportApi();
        }
    }, [stdRoll]);

    

    const showMessage = (message) => {
        Snackbar.show({
            text: message,
            duration: Snackbar.LENGTH_SHORT,
            backgroundColor: '#f15270'
        });
    };

    const buttonClicked = (type) => {
        if (type === 'pending') {
            setDataSource(pendingData);
            setListShow(false);
            setFilterTitle("Pending");
        } else if (type === 'assigned') {
            setDataSource(assignedData);
            setListShow(false);
            setFilterTitle("Assigned");
        } else if (type === 'solved') {
            setDataSource(solvedData);
            setListShow(false);
            setFilterTitle("Solved");
        }
    };

    const viewMoreButton = async (item) => {
        await AsyncStorage.setItem('@id', String(item.id));
        await AsyncStorage.setItem('@issue', item.issue);
        navigation.navigate('ViewMoreSupportSystem');
    };

    const viewSupportApi = (roll) => {
        let formData = new FormData();
        formData.append('admission_no', roll);

        let data = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
                'Authorization' : usertoken
            },
            body: formData
        };

        fetch(myConst.BASEURL + 'viewsupport2', data)
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.status === true) {
                    setDataSource(responseJson.pending);
                    setPendingData(responseJson.pending);
                    setAssignedData(responseJson.assigned);
                    setSolvedData(responseJson.solved);
                } else {
                    showMessage(responseJson.message);
                }
            })
            .catch((error) => console.log(error))
            .finally(() => {
                setLoading(false);
            });
    };

    const fn_Header = () => (
        <View style={styles.mainView}>
            <Pressable style={styles.leftMainView} onPress={() => navigation.navigate('Home')}>
                <Image source={constant.Icons.backArrowIcon} resizeMode='contain' style={styles.backIcon} />
            </Pressable>
            <View style={styles.midMainView}>
                <Text style={styles.titleStyle}>View Support</Text>
            </View>
            <View style={styles.rightMainView}>
                <LinearGradient
                    colors={constant.LinearGradientColor}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.LinearmainView}
                >
                    <Pressable style={styles.button} onPress={() => setListShow(true)}>
                        <Text style={styles.buttonTitle}>{filterTitle}</Text>
                        <Image source={constant.Icons.filterIcon} style={styles.filterIcon} />
                    </Pressable>
                </LinearGradient>
            </View>
        </View>
    );

    return (
        <LinearGradient colors={['#DFE6FF', '#ffffff']} style={{ flex: 1 }}>
            {fn_Header()}
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.MainContainer}>
                    <FlatList
                        data={dataSource}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) => (
                            <Pressable style={styles.TextViewStyle} onPress={() => viewMoreButton(item)}>
                                <View style={styles.FirstRowStyle}>
                                    <Text style={styles.DateText}>{item.issue}</Text>
                                    <Text style={styles.DateText2}>{moment(item.created_at).format('DD-MM-YYYY')}</Text>
                                </View>
                                <View > 
                                    <Image
                                        style={{ height: constant.resW(6.5), width: constant.resW(6.5) }}
                                        source={constant.Icons.newsEyeIcon}
                                    />
                                </View>
                            </Pressable>
                        )}
                        ListFooterComponent={() => <View style={{ height: constant.resW(25) }} />}
                        keyExtractor={(item, index) => String(index)}
                    />
                </View>
            </ScrollView>

            {listShow && (
                <Pressable style={styles.listOutView} onPress={() => setListShow(false)}>
                    <View style={styles.listMainView}>
                        <Pressable style={styles.listButton} onPress={() => buttonClicked('pending')}>
                            <Image source={constant.Icons.pending} style={styles.listIcon} />
                            <Text style={styles.listText}>Pending</Text>
                        </Pressable>
                        <Pressable style={styles.listButton} onPress={() => buttonClicked('assigned')}>
                            <Image source={constant.Icons.complain_assignment} style={styles.listIcon} />
                            <Text style={styles.listText}>Assigned</Text>
                        </Pressable>
                        <Pressable style={[styles.listButton, { borderBottomWidth: 0 }]} onPress={() => buttonClicked('solved')}>
                            <Image source={constant.Icons.solved} style={styles.listIcon} />
                            <Text style={styles.listText}>Solved</Text>
                        </Pressable>
                    </View>
                </Pressable>
            )}
             <View style={styles.FloatTabStyle}>
        <TouchableOpacity onPress={()=>navigation.navigate("HelpSupport")}>
          <Image
            style={styles.FloatIconStyle}
            tintColor={constant.whiteColor}
            source={constant.Icons.add}
          />
        </TouchableOpacity>
      </View>
        </LinearGradient>
    );
};

export default ViewSupportSystem;
