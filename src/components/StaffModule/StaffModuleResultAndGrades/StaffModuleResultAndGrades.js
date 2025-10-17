// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   TextInput,
//   FlatList,
//   ScrollView,
// } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import LinearGradient from 'react-native-linear-gradient';
// import CommonHeader from '../../CommonHeader';
// import {
//   whiteColor,
//   Blue,
//   blackColor,
//   font15,
//   font16,
//   font20,
//   resW,
//   resH,
// } from '../../../Utils/Constant';
// import { CustomDropdown } from '../../CommonDropDown/CommonDropDownList';
// import CommonButton from '../../Button/CommonButton';



// // ---------------- Main Screen ----------------
// const StaffModuleResultAndGrades = () => {
//   const navigation = useNavigation();
//   const [activeTab, setActiveTab] = useState('Results');

//   // Dropdown states
//   const [term, setTerm] = useState(null);
//   const [classVal, setClassVal] = useState(null);
//   const [section, setSection] = useState(null);
//   const [stream, setStream] = useState(null);
//   const [examType, setExamType] = useState(null);
//   const [subject, setSubject] = useState(null);
//   const [grade, setGrade] = useState(null);
//   const [openDropdown, setOpenDropdown] = useState(null);

//   const toggleDropdown = (key) => {
//     setOpenDropdown((prev) => (prev === key ? null : key));
//   };
//   // Student Data (Sample)
//   const students = Array.from({ length: 10 }, (_, i) => ({
//     id: i.toString(),
//     name: `Preeti ${i + 1}`,
//   }));

//   // Dropdown data
//   const termOptions = [
//     { label: 'Term 1', value: 'term1' },
//     { label: 'Term 2', value: 'term2' },
//   ];

//   const classOptions = [
//     { label: 'Class 9', value: 'class9' },
//     { label: 'Class 10', value: 'class10' },
//   ];

//   const sectionOptions = [
//     { label: 'Section A', value: 'A' },
//     { label: 'Section B', value: 'B' },
//   ];

//   const streamOptions = [
//     { label: 'Science', value: 'science' },
//     { label: 'Commerce', value: 'commerce' },
//   ];

//   const examOptions = [
//     { label: 'Mid Term', value: 'mid' },
//     { label: 'Final', value: 'final' },
//   ];

//   const subjectOptions = [
//     { label: 'Maths', value: 'maths' },
//     { label: 'English', value: 'english' },
//   ];

//   const gradeOptions = [
//     { label: 'A+', value: 'A+' },
//     { label: 'A', value: 'A' },
//     { label: 'B+', value: 'B+' },
//     { label: 'B', value: 'B' },
//   ];

//   return (
//     <View  style={{ flex: 1 ,backgroundColor:{whiteColor}}}>
//       <CommonHeader
//         title={'Result And Grades'}
//         backgroundColor={Blue}
//         textColor={whiteColor}
//         IconColor={whiteColor}
//         onLeftClick={() => navigation.goBack()}
//       />

//       <ScrollView contentContainerStyle={[styles.container,{ flexGrow: 1 ,backgroundColor:whiteColor}]}
//        nestedScrollEnabled={true}>
//         {/* Tabs */}
//         <View style={styles.tabRow}>
//           <TouchableOpacity
//             style={[styles.tab, activeTab === 'Results' && styles.activeTab]}
//             onPress={() => setActiveTab('Results')}
//           >
//             <Text
//               style={[
//                 styles.tabText,
//                 activeTab === 'Results' && styles.activeTabText,
//               ]}
//             >
//               Results
//             </Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={[styles.tab, activeTab === 'Grades' && styles.activeTab]}
//             onPress={() => setActiveTab('Grades')}
//           >
//             <Text
//               style={[
//                 styles.tabText,
//                 activeTab === 'Grades' && styles.activeTabText,
//               ]}
//             >
//               Grades
//             </Text>
//           </TouchableOpacity>
//         </View>

//         {/* Conditional Rendering */}
//         {activeTab === 'Results' ? (
//           <>
//             {/* Dropdown Section */}
//             <View style={styles.dropdownGrid}>
//               <CustomDropdown
//                 data={termOptions}
//                 dropWidth={styles.dropWidth}
//                 inputWidth={styles.inputWidth}
//                 selected={term}
//                 onSelect={setTerm}
//                 placeholder="Select Term"
//                 isOpen={openDropdown === 'term'}
//                 toggleOpen={() => toggleDropdown('term')}
//               />
//               <CustomDropdown
//                 data={classOptions}
//                 dropWidth={styles.dropWidth}
//                 inputWidth={styles.inputWidth}  
//                 selected={classVal}
//                 onSelect={setClassVal}
//                 placeholder="Select Class"
//                 isOpen={openDropdown === 'class'}
//                 toggleOpen={() => toggleDropdown('class')}
//               />
//               <CustomDropdown
//                 data={sectionOptions}
//                 dropWidth={styles.dropWidth}
//                 inputWidth={styles.inputWidth}
//                 selected={section}
//                 onSelect={setSection}
//                 placeholder="Select Section"
//                 isOpen={openDropdown === 'section'}
//                 toggleOpen={() => toggleDropdown('section')}
//               />
//               <CustomDropdown
//                 data={streamOptions}
//                 dropWidth={styles.dropWidth}
//                 inputWidth={styles.inputWidth}
//                 selected={stream}
//                 onSelect={setStream}
//                 placeholder="Select Stream"
//                 isOpen={openDropdown === 'stream'}
//                 toggleOpen={() => toggleDropdown('stream')}
//               />
//               <CustomDropdown
//                 data={examOptions}
//                 dropWidth={styles.dropWidth}
//                 inputWidth={styles.inputWidth}
//                 selected={examType}
//                 onSelect={setExamType}
//                 placeholder="Select Exam Type"
//                 isOpen={openDropdown === 'examType'}
//                 toggleOpen={() => toggleDropdown('examType')}
//               />
//               <CustomDropdown
//                 data={subjectOptions}
//                 dropWidth={styles.dropWidth}
//                 inputWidth={styles.inputWidth}
//                 selected={subject}
//                 onSelect={setSubject}
//                 placeholder="Select Subject"
//                 isOpen={openDropdown === 'subject'}
//                 toggleOpen={() => toggleDropdown('subject')}
//               />
//             </View>


//             {/* Table Header */}
//             <View style={styles.tableHeader}>
//               <Text style={styles.headerText}>Student Name</Text>
//               <Text style={styles.headerText}>Marks Obtained</Text>
//               <Text style={styles.headerText}>Maximum Marks</Text>
//               <Text style={styles.headerText}>Weightage in Term</Text>
//             </View>

//             {/* Table Rows using FlatList */}
//             <FlatList
//               data={students}
//               keyExtractor={(item) => item.id}
//               scrollEnabled={true}
//               renderItem={({ item }) => (
//                 <View style={styles.tableRow}>
//                   <Text style={styles.cellText}>{item.name}</Text>
//                   <TextInput style={styles.inputBox} keyboardType="numeric"  />
//                   <Text style={styles.cellText}>30</Text>
//                   <Text style={styles.cellText}>100%</Text>
//                 </View>
//               )}
//             />

//             {/* Add Button */}
//             <View style={styles.fixedButton}>
//               <CommonButton title="Add" buttonClick={()=>console.log("Add")}/>
//             </View>
//           </>
//         ) : (
//           <>
//             {/* GRADES TAB */}
//             <View style={styles.dropdownGrid}>
//               <CustomDropdown
//                 data={termOptions}
//                 dropWidth={styles.dropWidth}
//                 inputWidth={styles.inputWidth}
//                 selected={term}
//                 onSelect={setTerm}
//                 placeholder="Select Term"
//                 isOpen={openDropdown === 'term'}
//                 toggleOpen={() => toggleDropdown('term')}
//               />
//               <CustomDropdown
//                 data={classOptions}
//                 dropWidth={styles.dropWidth}
//                 inputWidth={styles.inputWidth}
//                 selected={classVal}
//                 onSelect={setClassVal}
//                 placeholder="Select Class"
//                 isOpen={openDropdown === 'class'}
//                 toggleOpen={() => toggleDropdown('class')}
//               />
//               <CustomDropdown
//                 data={sectionOptions}
//                 dropWidth={styles.dropWidth}
//                 inputWidth={styles.inputWidth}
//                 selected={section}
//                 onSelect={setSection}
//                 placeholder="Select Section"
//                 isOpen={openDropdown === 'section'}
//                 toggleOpen={() => toggleDropdown('section')}
//               />
//               <CustomDropdown
//                 data={gradeOptions}
//                 dropWidth={styles.dropWidth}
//                 inputWidth={styles.inputWidth}
//                 selected={grade}
//                 onSelect={setGrade}
//                 placeholder="Select Grade"
//                 isOpen={openDropdown === 'grade'}
//                 toggleOpen={() => toggleDropdown('grade')}
//               />
//             </View>


//             {/* Table Header */}
//             <View style={styles.tableHeader}>
//               <Text style={styles.headerText}>Student Name</Text>
//               <Text style={styles.headerText}>Grade Obtained</Text>
//             </View>

//             {/* Table Rows using FlatList */}
//             <FlatList
//               data={students}
//               keyExtractor={(item) => item.id}
//               scrollEnabled={true}
//               renderItem={({ item }) => (
//                 <View style={[styles.tableRow1]}>
//                   <Text style={styles.cellText1}>{item.name}</Text>
//                   <TextInput style={styles.inputBox1} />
//                 </View>
//               )}
//             />

//             {/* Add Button */}
//             {/* <TouchableOpacity style={styles.addButton}>
//               <Text style={styles.addButtonText}>Add</Text>
//             </TouchableOpacity> */}
//             <View style={styles.fixedButton}>
//               <CommonButton title="Add" buttonClick={()=>console.log("Add")}/>
//             </View>
//           </>
//         )}
//       </ScrollView>
//     </View>
//   );
// };

// export default StaffModuleResultAndGrades;
// const styles = StyleSheet.create({
//   container: {
//     padding: resW(4),
//   },
//   tabRow: {
//     flexDirection: 'row',
//     backgroundColor: '#f5f5f5',
//     borderRadius: resW(1),
//     marginVertical: resH(0.5),
//   },
//   tab: {
//     flex: 1,
//     alignItems: 'center',
//     paddingVertical: resH(1.5),
//   },
//   activeTab: {
//     backgroundColor: Blue,
//     borderRadius: resW(1),
//   },
//   tabText: {
//     color: blackColor,
//     fontSize: font16,
//   },
//   activeTabText: {
//     color: whiteColor,
//     fontSize: font16,
//     fontWeight: 'bold',
//   },
//   dropdownGrid: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'space-between',
//     gap: resH(1),
//     marginBottom: resH(2),
//   },
//   tableHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     paddingVertical: resH(1),
//     borderBottomWidth: 0.5,
//     borderColor: '#ccc',
//   },
//   headerText: {
//     fontSize: font15,
//     color: blackColor,
//     flex: 1,
//     textAlign: 'center',
//     fontWeight: 'bold',
//   },
//   tableRow: {
//     flexDirection: 'row',
//     alignItems: 'center', // vertical centering
//     justifyContent: 'space-between', // same as header
//     paddingVertical: resH(1),
//     borderBottomWidth: 0.2,
//     borderColor: '#ccc',
//     width: resW(92), // match the table width
//   },
//   cellText: {
//     flex: 1, // take same space as header
//     textAlign: 'center', // horizontal centering
//     fontSize: font15,
//     color: blackColor,
//   },
//   inputBox: {
//     flex: 1, // take same space as header column
//     height: resH(4),
//     borderWidth: 0.5,
//     borderColor: blackColor,
//     borderRadius: resW(1),
//     textAlign: 'center', // horizontal center
//     textAlignVertical: 'center', // vertical center
//     backgroundColor: whiteColor,
//     paddingVertical: 0,
//     marginHorizontal: resW(1),
//     color: blackColor
//   },

//   addButton: {
//     marginTop: resH(3),
//     alignSelf: 'center',
//     backgroundColor: '#dcdcdc',
//     borderRadius: resW(2),
//     width: resW(30),
//     height: resH(5),
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   addButtonText: {
//     color: blackColor,
//     fontSize: font16,
//     fontWeight: 'bold',
//   },
//   dropWidth: {
//     width: resW(43),
//   },
//   inputWidth: {
//     width: resW(43)
//   },
//   //   tableRow1: {
//   //   flexDirection: 'row',
//   //   alignItems: 'center', // vertical center
//   //   justifyContent: 'space-around',
//   //   paddingVertical: resH(1),
//   //   borderBottomWidth: 0.2,
//   //   borderColor: '#ccc',
//   //  width:resW(92)
//   // },
//   // inputBox1: {
//   //   width: resW(15),
//   //   height: resH(4),
//   //   borderWidth: 0.5,
//   //   borderColor: blackColor,
//   //   borderRadius: resW(1),
//   //   textAlign: 'center', // <-- center the text inside input
//   //   justifyContent: 'center', // <-- ensure vertical centering
//   //   backgroundColor: whiteColor,
//   //   paddingVertical: 0, // remove extra padding
//   // },
//   tableRow1: {
//     flexDirection: 'row',
//     alignItems: 'center', // vertical centering
//     justifyContent: 'space-between', // match header spacing
//     paddingVertical: resH(1),
//     borderBottomWidth: 0.2,
//     borderColor: '#ccc',
//     width: resW(92),
//   },
//   inputBox1: {
//     flex: 1, // take same space as header
//     height: resH(4),
//     borderWidth: 0.5,
//     borderColor: blackColor,
//     borderRadius: resW(1),
//     textAlign: 'center', // horizontal center
//     backgroundColor: whiteColor,
//     paddingVertical: 0, // remove extra padding
//     marginHorizontal: resW(1),
//   },
//   cellText1: {
//     flex: 1,
//     textAlign: 'center', // center horizontally
//     fontSize: font15,
//     color: blackColor,
//   },


// });

import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  FlatList,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import CommonHeader from '../../CommonHeader';
import {
  whiteColor,
  Blue,
  blackColor,
  font15,
  font16,
  resW,
  resH,
} from '../../../Utils/Constant';
import { CustomDropdown } from '../../CommonDropDown/CommonDropDownList';
import CommonButton from '../../Button/CommonButton';

const StaffModuleResultAndGrades = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('Results');

  // Dropdown states
  const [term, setTerm] = useState(null);
  const [classVal, setClassVal] = useState(null);
  const [section, setSection] = useState(null);
  const [stream, setStream] = useState(null);
  const [examType, setExamType] = useState(null);
  const [subject, setSubject] = useState(null);
  const [grade, setGrade] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (key) => {
    setOpenDropdown((prev) => (prev === key ? null : key));
  };

  // Sample Student Data
  const students = Array.from({ length: 15 }, (_, i) => ({
    id: i.toString(),
    name: `Preeti ${i + 1}`,
  }));

  // Dropdown data
  const termOptions = [
    { label: 'Term 1', value: 'term1' },
    { label: 'Term 2', value: 'term2' },
  ];
  const classOptions = [
    { label: 'Class 9', value: 'class9' },
    { label: 'Class 10', value: 'class10' },
  ];
  const sectionOptions = [
    { label: 'Section A', value: 'A' },
    { label: 'Section B', value: 'B' },
  ];
  const streamOptions = [
    { label: 'Science', value: 'science' },
    { label: 'Commerce', value: 'commerce' },
  ];
  const examOptions = [
    { label: 'Mid Term', value: 'mid' },
    { label: 'Final', value: 'final' },
  ];
  const subjectOptions = [
    { label: 'Maths', value: 'maths' },
    { label: 'English', value: 'english' },
  ];
  const gradeOptions = [
    { label: 'A+', value: 'A+' },
    { label: 'A', value: 'A' },
    { label: 'B+', value: 'B+' },
    { label: 'B', value: 'B' },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: whiteColor }}>
      <CommonHeader
        title={'Result And Grades'}
        backgroundColor={Blue}
        textColor={whiteColor}
        IconColor={whiteColor}
        onLeftClick={() => navigation.goBack()}
      />
      <View style={styles.tabRow}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'Results' && styles.activeTab]}
          onPress={() => setActiveTab('Results')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'Results' && styles.activeTabText,
            ]}
          >
            Results
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'Grades' && styles.activeTab]}
          onPress={() => setActiveTab('Grades')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'Grades' && styles.activeTabText,
            ]}
          >
            Grades
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        contentContainerStyle={[styles.container, { flexGrow: 1 }]}
        nestedScrollEnabled={true}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps='always'
      >
        {activeTab === 'Results' ? (
          <>
            <View style={styles.dropdownGrid}>
              <CustomDropdown
                data={termOptions}
                selected={term}
                onSelect={setTerm}
                placeholder="Select Term"
                isOpen={openDropdown === 'term'}
                toggleOpen={() => toggleDropdown('term')}
                dropWidth={styles.dropWidth}
                inputWidth={styles.inputWidth}
              />
              <CustomDropdown
                data={classOptions}
                selected={classVal}
                onSelect={setClassVal}
                placeholder="Select Class"
                isOpen={openDropdown === 'class'}
                toggleOpen={() => toggleDropdown('class')}
                dropWidth={styles.dropWidth}
                inputWidth={styles.inputWidth}
              />
              <CustomDropdown
                data={sectionOptions}
                selected={section}
                onSelect={setSection}
                placeholder="Select Section"
                isOpen={openDropdown === 'section'}
                toggleOpen={() => toggleDropdown('section')}
                dropWidth={styles.dropWidth}
                inputWidth={styles.inputWidth}
              />
              <CustomDropdown
                data={streamOptions}
                selected={stream}
                onSelect={setStream}
                placeholder="Select Stream"
                isOpen={openDropdown === 'stream'}
                toggleOpen={() => toggleDropdown('stream')}
                dropWidth={styles.dropWidth}
                inputWidth={styles.inputWidth}
              />
              <CustomDropdown
                data={examOptions}
                selected={examType}
                onSelect={setExamType}
                placeholder="Select Exam Type"
                isOpen={openDropdown === 'examType'}
                toggleOpen={() => toggleDropdown('examType')}
                dropWidth={styles.dropWidth}
                inputWidth={styles.inputWidth}
              />
              <CustomDropdown
                data={subjectOptions}
                selected={subject}
                onSelect={setSubject}
                placeholder="Select Subject"
                isOpen={openDropdown === 'subject'}
                toggleOpen={() => toggleDropdown('subject')}
                dropWidth={styles.dropWidth}
                inputWidth={styles.inputWidth}
              />
            </View>
            <View style={styles.tableHeader}>
              <Text style={styles.headerText}>Student Name</Text>
              <Text style={styles.headerText}>Marks Obtained</Text>
              <Text style={styles.headerText}>Max Marks</Text>
              <Text style={styles.headerText}>Weightage</Text>
            </View>
            <FlatList
              data={students}
              keyExtractor={(item) => item.id}
              nestedScrollEnabled={true}
              scrollEnabled={true}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <View style={styles.tableRow}>
                  <Text style={styles.cellText}>{item.name}</Text>
                  <TextInput style={styles.inputBox} keyboardType="numeric"  keyboardShouldPersistTaps='always'/>
                  <Text style={styles.cellText}>30</Text>
                  <Text style={styles.cellText}>100%</Text>
                </View>
              )}
            />

            <View style={styles.fixedButton}>
              <CommonButton title="Add" buttonClick={() => console.log('Add')} />
            </View>
          </>
        ) : (
          <>
            <View style={styles.dropdownGrid}>
              <CustomDropdown
                data={termOptions}
                selected={term}
                onSelect={setTerm}
                placeholder="Select Term"
                isOpen={openDropdown === 'term'}
                toggleOpen={() => toggleDropdown('term')}
                dropWidth={styles.dropWidth}
                inputWidth={styles.inputWidth}
              />
              <CustomDropdown
                data={classOptions}
                selected={classVal}
                onSelect={setClassVal}
                placeholder="Select Class"
                isOpen={openDropdown === 'class'}
                toggleOpen={() => toggleDropdown('class')}
                dropWidth={styles.dropWidth}
                inputWidth={styles.inputWidth}
              />
              <CustomDropdown
                data={sectionOptions}
                selected={section}
                onSelect={setSection}
                placeholder="Select Section"
                isOpen={openDropdown === 'section'}
                toggleOpen={() => toggleDropdown('section')}
                dropWidth={styles.dropWidth}
                inputWidth={styles.inputWidth}
              />
              <CustomDropdown
                data={gradeOptions}
                selected={grade}
                onSelect={setGrade}
                placeholder="Select Grade"
                isOpen={openDropdown === 'grade'}
                toggleOpen={() => toggleDropdown('grade')}
                dropWidth={styles.dropWidth}
                inputWidth={styles.inputWidth}
              />
            </View>
            <View style={styles.tableHeader}>
              <Text style={styles.headerText}>Student Name</Text>
              <Text style={styles.headerText}>Grade Obtained</Text>
            </View>
            <FlatList
              data={students}
              keyExtractor={(item) => item.id}
              nestedScrollEnabled={true}
              scrollEnabled={true}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <View style={styles.tableRow1}>
                  <Text style={styles.cellText1}>{item.name}</Text>
                  <TextInput style={styles.inputBox1}  keyboardShouldPersistTaps='always'/>
                </View>
              )}
            />
            <View style={styles.fixedButton}>
              <CommonButton title="Add" buttonClick={() => console.log('Add')} />
            </View>
          </>
        )}
      </ScrollView>
    </View>
  );
};
export default StaffModuleResultAndGrades;
const styles = StyleSheet.create({
  container: {
    padding: resW(4),
    paddingBottom: resH(10),
  },
  dropWidth: {
    width: resW(43),
  },
  inputWidth: {
    width: resW(43)
  },
  tabRow: {
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
    borderRadius: resW(1),
    marginVertical: resH(0.5),
    marginHorizontal: resW(4),
    marginTop: resH(3)
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: resH(1.5),
  },
  activeTab: {
    backgroundColor: Blue,
    borderRadius: resW(1),
  },
  tabText: {
    color: blackColor,
    fontSize: font16,
  },
  activeTabText: {
    color: whiteColor,
    fontSize: font16,
    fontWeight: 'bold',
  },
  dropdownGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: resH(1),
    marginBottom: resH(2),
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: resH(1),
    borderBottomWidth: 0.5,
    borderColor: '#ccc',
  },
  headerText: {
    fontSize: font15,
    color: blackColor,
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: resH(1),
    borderBottomWidth: 0.2,
    borderColor: '#ccc',
  },
  cellText: {
    flex: 1,
    textAlign: 'center',
    fontSize: font15,
    color: blackColor,
  },
  inputBox: {
    flex: 1,
    height: resH(4),
    borderWidth: 0.5,
    borderColor: blackColor,
    borderRadius: resW(1),
    textAlign: 'center',
    backgroundColor: whiteColor,
    paddingVertical: 0,
    marginHorizontal: resW(1),
    color: blackColor,
  },
  tableRow1: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: resH(1),
    borderBottomWidth: 0.2,
    borderColor: '#ccc',
  },
  inputBox1: {
    flex: 1,
    height: resH(4),
    borderWidth: 0.5,
    borderColor: blackColor,
    borderRadius: resW(1),
    textAlign: 'center',
    backgroundColor: whiteColor,
    paddingVertical: 0,
    marginHorizontal: resW(1),
  },
  cellText1: {
    flex: 1,
    textAlign: 'center',
    fontSize: font15,
    color: blackColor,
  },
  fixedButton: {
    marginTop: resH(2),
    marginBottom: resH(2),
  },
});


