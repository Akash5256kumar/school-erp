import React, { useState, useCallback } from 'react';
import { Text, View, Image, TouchableOpacity, TextInput, Modal, Pressable, ScrollView, ActivityIndicator } from 'react-native';
import AsyncStorage from "@react-native-community/async-storage";
import Snackbar from 'react-native-snackbar';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import LinearGradient from 'react-native-linear-gradient';
import { useFocusEffect } from '@react-navigation/native';

import styles from './style';
import * as myConst from '../../Baseurl';
import * as constant from '../../../Utils/Constant';
import CommonHeader from '../../CommonHeader';
import CommonButton from '../../Button/CommonButton';
import SelectDropList from '../../SelectDropList';

const HelpSupport = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [issue, setIssue] = useState('');
  const [fileName, setFileName] = useState('');
  const [uri, setUri] = useState('');
  const [fileType, setFileType] = useState('');
  const [isVisiblPickerDialog, setIsVisiblPickerDialog] = useState(false);
  const [options, setOptions] = useState([]);
  const [selectedValue, setSelectedValue] = useState('');
  const [stdRoll, setStdRoll] = useState('');
  const [name, setName] = useState('');
  const  [loader,setLoader] = useState(false)

  const showMessage = (message) => {
    Snackbar.show({
      text: message,
      duration: Snackbar.LENGTH_SHORT,
      backgroundColor: '#f15270'
    });
  };

  const supportTypeApi = () => {
    fetch(myConst.BASEURL + 'supporttype', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.status === true) {
          let selectIssue = ["Select Issue"];
          const interest = [...selectIssue, ...responseJson.data];
          setOptions(interest);
        } else {
          showMessage(responseJson.message);
        }
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  };

  const selectFile = (type) => {
    const options = {
      mediaType: 'photo',
      quality: 1,
      includeBase64: false,
      selectionLimit: 1,
    };

    const callback = (response) => {
      try {
        if (response?.assets?.[0]) {
          setFileName(response.assets[0].fileName);
          setUri(response.assets[0].uri);
          setFileType(response.assets[0].type);
        }
      } catch (error) {
        console.log(error);
      }
      setIsVisiblPickerDialog(false);
    };

    if (type === 'Gallery') {
      launchImageLibrary(options, callback);
    } else if (type === 'Camera') {
      launchCamera(options, callback);
    }
  };

  const helpSupportApi = () => {
    if (issue.trim() === '') {
      showMessage('Please enter issue.');
      return;
    }
    if (uri === '') {
      showMessage('Please attach issue picture');
      return;
    }
    let formData = new FormData();
    formData.append('admission_no', stdRoll);
    formData.append('title', selectedValue);
    formData.append('issue', issue);
    formData.append('file', { uri, name: fileName, type: fileType });
    setLoader(true)
    fetch(myConst.BASEURL + 'support', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data',
      },
      body: formData
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.status === true) {
          navigation.goBack()
          showMessage('Issue submitted successfully.');
        } else {
          showMessage(responseJson.message);
        }
      })
      .catch((error) => console.log('error'+JSON.stringify(error)))
      .finally(() => {
        setLoading(false)
        setLoader(false)
      });
  };

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        const value = await AsyncStorage.getItem('@std_roll');
        const studentName = await AsyncStorage.getItem('@name');
        setStdRoll(value);
        setName(studentName);
        setIssue('');
        setUri('');
        setSelectedValue('');
        supportTypeApi();
      };
      fetchData();
    }, [])
  );

  return (
    <View style={{ flex: 1 }}>
      <LinearGradient colors={['#DFE6FF', '#ffffff']} style={{ flex: 1 }}>
        <CommonHeader
          title={'Help & Support'}
          onLeftClick={() => navigation.goBack()}
        />
        <ScrollView>
          <View style={styles.MainContainer}>
            <Image style={styles.ProfileImage} resizeMode='contain' source={require('../../../assests/images/businessman.png')} />
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.rollno}>{stdRoll}</Text>

            <View style={styles.HelpSupportform}>
              <View style={styles.DropDownBackground}>
                {options.length > 0 && (
                  <SelectDropList
                    list={options}
                    title={selectedValue === '' ? 'Select Issue' : selectedValue}
                    buttonExt={styles.dropList}
                    textExt={styles.dropListText}
                    type={1}
                    on_Select={(d) => setSelectedValue(d)}
                  />
                )}
              </View>

              <View style={styles.midView}>
                <TextInput
                  style={styles.IssueStyle}
                  placeholder='Issue Description'
                  placeholderTextColor={constant.grayColor}
                  multiline
                  onChangeText={setIssue}
                  value={issue}
                />
                {uri !== '' && <Image style={styles.uploadImage2} source={{ uri }} />}
                <Pressable style={styles.attachView} onPress={() => setIsVisiblPickerDialog(true)}>
                  <Text style={styles.attachText}>Attach Files</Text>
                  <Image source={constant.Icons.attachIcon} style={styles.attachImage} />
                </Pressable>
              </View>

              <CommonButton
                title="Submit"
                extStyle={{ marginTop: '10%', marginBottom: '15%' }}
                buttonClick={helpSupportApi}
              />
            </View>

            <Modal
              animationType="slide"
              transparent
              visible={isVisiblPickerDialog}
              presentationStyle="overFullScreen"
            >
              <View style={styles.viewWrapper}>
                <View style={styles.modalView}>
                  <TouchableOpacity onPress={() => selectFile('Camera')}>
                    <Text style={styles.modalText}>Choose from Camera</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => selectFile('Gallery')}>
                    <Text style={styles.modalText}>Pick from Gallery</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setIsVisiblPickerDialog(false)}>
                    <Text style={styles.CancelButton}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </View>
        </ScrollView>
        {loader && <View style={{
                          position: 'absolute',
                          top:0,
                          left:0,
                          right:0,
                          bottom:0,
                          flex:1,
                          alignItems:'center',
                          justifyContent:'center',
                          backgroundColor:'#00000020'
                        }}>
                          <ActivityIndicator color={constant.baseColor} size={'large'} />
                        </View>}
      </LinearGradient>
    </View>
  );
};

export default HelpSupport;
