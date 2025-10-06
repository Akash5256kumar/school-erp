import React, { useState, useEffect } from 'react';
import { Text, View, FlatList, ActivityIndicator, ScrollView } from 'react-native';
import styles from './GradeStyle';
import * as myConst from '../../Baseurl';
import AsyncStorage from "@react-native-community/async-storage";
import CommonHeader from '../../CommonHeader';
import LinearGradient from 'react-native-linear-gradient';
import SelectDropList from "../../../components/SelectDropList";
import { useSelector } from 'react-redux';

const Grade = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [stdRoll, setStdRoll] = useState('');
  const usertoken = useSelector(state => state.userSlice.token);
  const [academicResults, setAcademicResults] = useState([]);
  const [studentInfo, setStudentInfo] = useState({});
  const [examTypes, setExamTypes] = useState([]);
  const [selectedExam, setSelectedExam] = useState('');
  const [terms, setTerms] = useState([]);
  const [term, setTerm] = useState('');
  const userData = useSelector(state => state.userSlice.userData);

  // Fetch student roll number from AsyncStorage
  useEffect(() => {
    const fetchRoll = async () => {
      const value = await AsyncStorage.getItem('@std_roll');
      if (value) setStdRoll(value);
    };
    fetchRoll();
  }, []);

  // Fetch grades for selected term and exam
  const fetchGrades = (selectedTerm = term, selectedExamType = selectedExam) => {
    if (!stdRoll) return;
    setLoading(true);
    const query = `std_roll=${stdRoll}&term=${selectedTerm}${selectedExamType ? `&exam_type=${selectedExamType}` : ""}`;
    console.log("Calling API:", `${myConst.BASEURL}viewGrade?${query}`);

    fetch(`${myConst.BASEURL}viewGrade?${query}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': `${usertoken}`,
      },
    })
      .then(response => {
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return response.json();
      })
      .then(responseJson => {
        console.log("API Response JSON :", JSON.stringify(responseJson));

        if (responseJson.student) setStudentInfo(responseJson.student);

        if (responseJson.results && Array.isArray(responseJson.results)) {
          setAcademicResults(responseJson.results);
        } else {
          setAcademicResults([]);
        }

        if (responseJson.terms && Array.isArray(responseJson.terms)) setTerms(responseJson.terms);

        // Set active term and fetch exam types
        if (responseJson.active_term) {
          setTerm(responseJson.active_term);
          fetchExamTypeAndTermsGrades(responseJson.active_term)
            .then(() => {
              if (responseJson.exam_type) setSelectedExam(responseJson.exam_type);
            });
        }
      })
      .catch(error => console.log("API Error:", error))
      .finally(() => setLoading(false));
  };

  // Fetch exam types for selected term
  const fetchExamTypeAndTermsGrades = async (selectedTerm = term) => {
    if (!userData?.Student_class) return;
    setLoading(true);
    const query = `class=${userData.Student_class}&term=${selectedTerm}`;
    console.log("Calling API:", `${myConst.BASEURL}viewExamtype?${query}`);

    try {
      const response = await fetch(`${myConst.BASEURL}viewExamtype?${query}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Authorization': usertoken,
        },
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const responseJson = await response.json();

      if (Array.isArray(responseJson.types)) setExamTypes(responseJson.types);
      else setExamTypes([]);

      if (responseJson.class) {
        setStudentInfo({
          class: responseJson.class,
          group: responseJson.group,
          term: responseJson.term,
        });
      }
    } catch (error) {
      console.log("API Error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch grades when stdRoll or term changes
  useEffect(() => {
    if (stdRoll) fetchGrades(term);
  }, [stdRoll, term]);

  // Fetch exam types when term or student class changes
  useEffect(() => {
    if (term) fetchExamTypeAndTermsGrades(term);
  }, [userData?.Student_class, term]);

  // Table Header
  const renderHeader = () => (
    <View style={styles.tableRow}>
      <Text style={[styles.tableHeaderText, { flex: 0.3, textAlign: "left" }]}>Subject</Text>
      <Text style={[styles.tableHeaderText, { flex: 0.3, textAlign: "center" }]}>Marks Obtained</Text>
      <Text style={[styles.tableHeaderText, { flex: 0.3, textAlign: "center" }]}>Maximum Marks</Text>
    </View>
  );

  // Table Row
  const renderItem = ({ item }) => (
    <View style={styles.tableRow}>
      <Text style={[styles.tableCell, { flex: 1, textAlign: "left" }]}>{item.subject}</Text>
      <Text style={styles.tableCell}>{item.marks_obtained}</Text>
      <Text style={styles.tableCell}>{item.max_marks}</Text>
    </View>
  );

  return (
    <LinearGradient colors={['#DFE6FF', '#ffffff']} style={{ flex: 1 }}>
      <CommonHeader title={'Grades'} onLeftClick={() => navigation.navigate('Home')} />
      <View style={styles.MainContainer}>
        <ScrollView>
          <View style={styles.card}>
            {/* Dropdowns */}
            <View style={styles.dropdownContainer}>
              <View style={styles.dropcontainer}>
                <SelectDropList
                  title={term || "Term"}      // ✅ dynamic title
                  list={terms}
                  on_Select={(val) => {
                    setTerm(val);
                    fetchGrades(val, selectedExam);
                  }}
                  buttonExt={styles.selectButton1}
                  textExt={styles.selectButtonText}
                  iconRight={true}
                />
              </View>
              <View style={styles.dropcontainer}>
                <SelectDropList
                  title={selectedExam || "Exam Type"}  // ✅ dynamic title
                  list={examTypes}
                  on_Select={(val) => {
                    if (term) {
                      setSelectedExam(val);
                      fetchGrades(term, val);
                    }
                  }}
                  buttonExt={styles.selectButton1}
                  textExt={styles.selectButtonText}
                  iconRight={true}
                  disable={!term}        
                />
              </View>
            </View>

            {/* Academic Results Table */}
            <Text style={styles.gradesTitle}>Grades</Text>
            {loading ? (
              <ActivityIndicator size="large" color="#000" />
            ) : academicResults.length > 0 ? (
              <FlatList
                data={academicResults}
                keyExtractor={(item, index) => index.toString()}
                ListHeaderComponent={renderHeader}
                renderItem={renderItem}
              />
            ) : (
              <Text style={styles.noDataText}>No results available</Text>
            )}
          </View>
        </ScrollView>
      </View>
    </LinearGradient>
  );
};

export default Grade;
