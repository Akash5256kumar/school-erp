import React, { useState, useEffect } from 'react';
import { Text, View, Image, FlatList } from 'react-native';
import AsyncStorage from "@react-native-community/async-storage";
import styles from './style';
import * as myConst from '../../Baseurl';
import moment from 'moment';
import CommonHeader from '../../CommonHeader';
import LinearGradient from 'react-native-linear-gradient';
import { useSelector } from 'react-redux';

const ViewMoreSupportSystem = ({ navigation }) => {
  const userData = useSelector(state=>state.userSlice.userData)
  const usertoken = useSelector(state=>state.userSlice.token)
  const [classes, setClasses] = useState('');
  const [section, setSection] = useState('');
  const [name, setName] = useState('');
  const [rollno, setRollno] = useState('');
  const [issue, setIssue] = useState('');
  const [id, setId] = useState('');
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch student data from AsyncStorage
  useEffect(() => {
    const fetchData = async () => {
      const studentClass = await AsyncStorage.getItem('@class');
      const studentRollno = await AsyncStorage.getItem('@std_roll');
      const studentSection = await AsyncStorage.getItem('@section');
      const studentName = await AsyncStorage.getItem('@name');
      const studentIssue = await AsyncStorage.getItem('@issue');
      const studentId = await AsyncStorage.getItem('@id');

      setClasses(studentClass || '');
      setSection(studentSection || '');
      setName(studentName || '');
      setRollno(studentRollno || '');
      setIssue(studentIssue || '');
      setId(studentId || '');

      if (studentId) {
        viewMoreSupportSystemApi(studentId);
      }
    };

    fetchData();
  }, []);

  // API call to get ticket response
  const viewMoreSupportSystemApi = (ticketId) => {
    let formData = new FormData();
    formData.append('id', ticketId);

    setLoading(true);
    fetch(myConst.BASEURL + 'ticketresponse', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data',
        'Authorization' : usertoken
      },
      body: formData
    })
      .then((response) => response.json())
      .then((responseJson) => {
        setDataSource(responseJson.data || []);
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <LinearGradient colors={['#DFE6FF', '#ffffff']} style={{ flex: 1 }}>
      <View style={styles.MainContainer}>
        <CommonHeader
          title={'View Support Details'}
          onLeftClick={() => navigation.goBack()}
        />

        <View style={styles.FlatListView}>
          <View style={styles.CardView}>
            <View style={styles.RowStyle}>
              <Text style={styles.TextLeft}>Name : </Text>
              <Text style={styles.TextRight}>{name}</Text>
            </View>

            <View style={styles.RowStyle}>
              <Text style={styles.TextLeft}>Class : </Text>
              <Text style={styles.TextRight}>{classes}</Text>
            </View>

            <View style={styles.RowStyle}>
              <Text style={styles.TextLeft}>AdmissionNo : </Text>
              <Text style={styles.TextRight}>{rollno}</Text>
            </View>

            <View style={styles.RowStyle}>
              <Text style={styles.TextLeft}>Section : </Text>
              <Text style={styles.TextRight}>{section}</Text>
            </View>

            <View style={styles.RowStyle}>
              <Text style={styles.TextLeft}>Issue : </Text>
              <Text style={styles.TextRight}>{issue}</Text>
            </View>
          </View>
        </View>

        <Text style={styles.QueryDetailText}>Query Details:- </Text>

        <FlatList
          data={dataSource}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.FlatListView}>
              <View style={styles.RowCardView}>
                <View style={styles.RowStyle}>
                  <Text style={styles.DetailTextLeft}>TicketNo : </Text>
                  <Text style={styles.DetailTextRight}>{item.supportticket_id}</Text>
                </View>

                <View style={styles.RowStyle}>
                  <Text style={styles.DetailTextLeft}>TeacherName : </Text>
                  <Text style={styles.DetailTextRight}>{item.teachername}</Text>
                </View>

                <View style={styles.RowStyle}>
                  <Text style={styles.DetailTextLeft}>Response : </Text>
                  <Text style={styles.DetailTextRight}>{item.response}</Text>
                </View>

                <View style={styles.RowStyle}>
                  <Text style={styles.DetailTextLeft}>Deadline : </Text>
                  <Text style={styles.DetailTextRight}>{item.deadline}</Text>
                </View>

                <View style={styles.RowStyle}>
                  <Text style={styles.DetailTextLeft}>Query Date : </Text>
                  <Text style={styles.DetailTextRight}>
                    {moment(item.created_at).format('DD-MM-YYYY')}
                  </Text>
                </View>
              </View>
            </View>
          )}
        />
      </View>
    </LinearGradient>
  );
};

export default ViewMoreSupportSystem;
