import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  Pressable,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import CommonHeader from '../../CommonHeader';
import {
  resW,
  whiteColor,
  Blue,
  typeMedium,
  baseColor,
  blackColor,
  font17,
  font15,
  typeRegular,
  font18,
  resH,
} from '../../../Utils/Constant';
import moment from 'moment';
import CustomInputField from '../../CommonInputField/CommonTextField';
import * as constant from '../../../Utils/Constant'
const StaffLibrary = () => {
  const navigation = useNavigation();
  const [active, setActive] = useState(true); 
  const [isVisible, setIsVisible] = useState(false); 
  const [searchText, setSearchText] = useState('');
  const issuedBooks = [
    {
      id: '1',
      book: { title: 'Introduction to Algorithms' },
      issue: {
        issue_date: '2025-09-15',
        return_date: '2025-10-05',
      },
    },
    {
      id: '2',
      book: { title: 'React Native Development' },
      issue: {
        issue_date: '2025-09-20',
        return_date: '2025-10-10',
      },
    },
  ];

  const libraryBooks = [
    { id: '1', title: 'JavaScript: The Good Parts', author_name: 'Douglas Crockford' },
    { id: '2', title: 'Clean Code', author_name: 'Robert C. Martin' },
    { id: '3', title: 'You Don’t Know JS', author_name: 'Kyle Simpson' },
    { id: '4', title: 'Learning React Native', author_name: 'Bonnie Eisenman' },
  ];

  const toggleSearch = () => setIsVisible(prev => !prev);
  const filteredBooks = libraryBooks.filter(item =>
    item.title.toLowerCase().includes(searchText.toLowerCase()) ||
    item.author_name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <LinearGradient colors={[whiteColor, whiteColor]} style={{ flex: 1 }}>
      <CommonHeader
        title={'Library'}
        backgroundColor={Blue}
        textColor={whiteColor}
        IconColor={whiteColor}
        onLeftClick={() => {
          navigation.navigate('StaffHome');
        }}
      />
      <View style={styles.buttonMainView}>
        <Pressable
          style={active ? styles.buttonStyle : styles.buttonStyle2}
          onPress={() => {
            setActive(true);
            setIsVisible(false);
          }}>
          <Text style={active ? styles.buttonTextStyle : styles.buttonTextStyle2}>
            Issued Book
          </Text>
        </Pressable>

        <Pressable
          style={active ? styles.buttonStyle2 : styles.buttonStyle}
          onPress={() => {
            setActive(false);
            setIsVisible(false);
          }}>
          <Text style={active ? styles.buttonTextStyle2 : styles.buttonTextStyle}>
            Library Book
          </Text>
        </Pressable>
      </View>

      {/* ===== Issued Books ===== */}
      {active ? (
        <FlatList
          data={issuedBooks}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.CardView}>
              <View style={styles.CardViewStyle}>
                <View style={styles.CircleShapeView}>
                  <Image
                    style={styles.AssignmentImage}
                    source={require('../../../assests/images/assignment.png')}
                  />
                </View>
                <View style={styles.TextViewStyle}>
                  <Text style={styles.DashboardTextStyle}>
                    {item?.book?.title}
                  </Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: resW(1) }}>
                    <Text style={styles.DateText}>
                      {moment(item?.issue?.issue_date).format('DD-MM-YYYY')}{' '}
                    </Text>
                    <View
                      style={{
                        width: resW(4),
                        backgroundColor: 'grey',
                        height: resW(0.4),
                        marginTop: resW(1),
                      }}
                    />
                    <Text style={styles.DateText}>
                      {' '}
                      {moment(item?.issue?.return_date).format('DD-MM-YYYY')}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          )}
        />
      ) : (
        <View style={{ flex: 1 }}>
          {/* ✅ Search bar visible only when search button pressed */}
          {isVisible && (
            <View style={{ marginHorizontal: resW(4) }}>
              {/* <TextInput
                style={styles.searchInput}
                placeholder="Search by title or author..."
                value={searchText}
                onChangeText={setSearchText}
                placeholderTextColor="grey"
              /> */}
              <CustomInputField
                inputStyle={styles.inputStyle}
                placeholder={"Search here"}
                leftIcon={constant.Icons.Search}
              />
            </View>
          )}

          <FlatList
            data={filteredBooks}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.CardView}>
                <View style={styles.CardViewStyle}>
                  <View style={styles.DocImageAndTextStyle}>
                    <View style={styles.CircleShapeView}>
                      <Image
                        style={styles.AssignmentImage}
                        source={require('../../../assests/images/assignment.png')}
                      />
                    </View>
                    <View style={styles.TextViewStyle}>
                      <Text style={styles.DashboardTextStyle}>{item.title}</Text>
                      <Text style={styles.DateText}>
                        Written by {item.author_name}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            )}
            ListEmptyComponent={() => (
              <Text style={{ textAlign: 'center', color: 'grey', marginTop: resH(5) }}>
                No books found.
              </Text>
            )}
          />
        </View>
      )}

      {/* ===== Floating Search Button (only for Library Book tab) ===== */}
      {!active && (
        // <View style={styles.FloatTabStyle}>
        <TouchableOpacity style={styles.FloatTabStyle} onPress={toggleSearch}>
          <Image
            style={styles.FloatIconStyle}
            source={require('../../../assests/images/loupe_icon.png')}
          />
        </TouchableOpacity>

        // </View>
      )}
    </LinearGradient>
  );
};

export default StaffLibrary;

const styles = StyleSheet.create({
  MainContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#FFFFFF'
  },

  buttonMainView: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginHorizontal: resW(4),
    marginTop: resW(3),
    marginBottom: resW(4)
  },
  buttonStyle: {
    backgroundColor: Blue,
    flex: 0.48,
    paddingVertical: resW(3),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Blue
  },
  buttonStyle2: {
    // backgroundColor:baseColor,
    flex: 0.48,
    paddingVertical: resW(3),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: blackColor
  },
  buttonTextStyle: {
    color: 'white',
    fontSize: font17,
    fontFamily: typeMedium
  },
  buttonTextStyle2: {
    color: blackColor,
    fontSize: font17,
    fontFamily: typeMedium
  },

  inputStyle: {
    height: resH(5.5),
    color: blackColor,
  },
  FlatListView: {
    overflow: 'hidden',
    paddingBottom: 5,
    paddingLeft: 5,
    marginTop: 15,
    marginBottom: 15
  },

  TextStyle: {
    fontSize: font18,
    fontWeight: 'bold',
    color: 'black',
    marginTop: resH(3),
    marginStart: resW(3),
    marginBottom: resH(3)
  },

  DashboardTextStyle: {
    fontSize: font18,
    fontWeight: 'bold',
    color: 'black'
  },

  CircleShapeView: {
    width: resW(16),
    height: resW(16),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: resW(100),
    backgroundColor: '#d5dcf2',
    // marginTop: 10,
    marginStart: 10
  },

  CardViewStyle: {
    flex: 3,
    //  display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: resW(3)
  },

  CardView: {
    backgroundColor: whiteColor,
    // height: 75,
    shadowColor: blackColor,
    // shadowOffset: { width: 1, height: 2},
    // shadowOpacity: 0.5,
    // shadowRadius: 5,
    // elevation: 5,
    // marginStart: 5,
    // marginEnd: 15,
    borderRadius: resW(1),
    marginHorizontal: resW(4),
    alignItems: 'center',
    borderWidth: 0.2,
    borderColor: blackColor,
    marginBottom: resH(1)
  },

  TextViewStyle: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: resW(3),
    justifyContent: "center"
  },

  AssignmentImage: {
    display: 'flex',
    height: resW(8),
    width: resW(8),
    // marginTop: 8,
    // marginStart: 10
  },

  AssignmentDownloadImage: {
    height: 35,
    width: 35,
    marginTop: 15,
    marginEnd: 10
  },

  DateText: {
    fontSize: font15,
    color: 'grey',
    fontFamily: typeRegular
  },

  DocImageAndTextStyle: {
    flex: 2, display: 'flex', flexDirection: 'row', justifyContent: 'space-between'
  },

  FloatTabStyle: {
    width: resW(15),
    height: resW(15),
    borderRadius: 100,
    backgroundColor: Blue,
    position: 'absolute',
    bottom: resH(10),
    right: 10,
    alignItems: "center",
    justifyContent: "center"
  },

  FloatIconStyle: {
    height: resW(7),
    width: resW(7),
    // marginTop: 10,
    // marginStart: 10
  },
  searchBarContainer: {
    marginHorizontal: resW(4),
    marginBottom: resW(3),
    borderWidth: 0.2,
    borderColor: blackColor,
    borderRadius: resW(1),
    backgroundColor: whiteColor,
  },
  searchInput: {
    paddingHorizontal: resW(3),
    paddingVertical: resW(1.7),
    fontSize: font15,
    color: blackColor,
    fontFamily: typeRegular,
  }
})
