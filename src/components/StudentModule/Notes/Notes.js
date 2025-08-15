import React, { useEffect, useState, useCallback } from 'react';
import {
  Text,
  View,
  Image,
  FlatList,
  BackHandler,
  Pressable,
} from 'react-native';
import styles from './NotesStyle';
import LinearGradient from 'react-native-linear-gradient';
import * as constant from '../../../Utils/Constant';
import CommonHeader from '../../CommonHeader';
import AsyncStorage from '@react-native-community/async-storage';
import * as myConst from '../../Baseurl';
const data =[
    {"key":1,"topic":'English'},
    {"key":2,"topic":'Hindi'},
    {"key":3,"topic":'Math'},
    {"key":3,"topic":'Math'},
    {"key":3,"topic":'Math'}

]

const Notes = (props) => {
    const {navigation } = props
    const [dataSource, setDataSource] = useState([]);
    const [originalDataSource, setOriginalDataSource] = useState([]);
    const [classes, setClasses] = useState('');
    const [classesRoll, setClassesRoll] = useState('');
    const [loading, setLoading] = useState(false);

  // Back button handler
  const handleBackPress = useCallback(() => {
    navigation.navigate('Dashboard');
    return true;
  }, [navigation]);

  // Lifecycle events
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackPress);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
    };
  }, [handleBackPress]);

  useEffect(() => {
    
    init();
  }, []);
 
  const init = async () => {
    //   const { otherParam } = route.params;
    //   setTitle(otherParam);
      const value = await AsyncStorage.getItem('@class');
      const value1 = await AsyncStorage.getItem('@std_roll')
      setClasses(value);
      setClassesRoll(value1)
    //   if (otherParam === 'Assignment') {
        assignApi(value,value1);
    //   }
    };

  const assignApi = (std_class,rollNo) => {
    console.log("eee",std_class)
    let formData = new FormData();
    formData.append('std_class', std_class);
    // formData.append('std_roll', rollNo);

    fetch(myConst.BASEURL + 'viewnotes', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
      body: formData,
    })
      .then(res => res.json())
      .then(json => {
        console.log("rerspo",JSON.stringify(json.data))
        setDataSource(json.data);
        setOriginalDataSource(json.data);
      })
      .catch((e)=>console.log("eerr",e))
      .finally(() =>
        setLoading(false)
    );
  };

  const fn_ListClick=(item,index)=>{
    // fn_ReadMark(item,index)
    navigation.navigate('NotesList', {
            // otherParam: 'Assignment',
            subjectData : item
        })
  }

  const fn_ReadMark=(data,index)=>{
    setDataSource(prevSubjects =>
        prevSubjects.map((item, i) =>
          i === index ? { ...item, unread_count: 0 } : item
        )
      );
    
    let formData = {
        "subject":data?.Subject,
        "std_roll" : classesRoll
    }
    console.log("form",JSON.stringify(formData))
    fetch(myConst.BASEURL + 'markAll', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: formData,
    })
      .then(res => res.json())
      .then(json => {
        console.log("mark"+JSON.stringify(json.data))
      
      })
      .catch((e)=>console.log("eerr",e))
      .finally(() =>
        setLoading(false)
    );
  }

  const fn_GetImage=(item)=>{
    if(item?.subject === 'English'){
        return constant.Icons.english
    }
    if(item?.subject === 'Hindi'){
        return constant.Icons.hindi
    }
    if(item?.subject === 'Science' || item?.subject === 'Chemistry' ){
        return constant.Icons.chemistry
    }
    if(item?.subject === 'Physics'){
        return constant.Icons.physies
    }
    if(item?.subject === 'EVS'){
        return constant.Icons.evs
    }
    if(item?.subject === 'Biology'){
        return constant.Icons.bio
    }
    if(item?.subject === 'Social Science'){
        return constant.Icons.socialscience
    }
    if(item?.subject === 'Computer'){
        return constant.Icons.computer
    }
    if(item?.subject === 'Accounts'){
        return constant.Icons.Accounts
    }
    if(item?.subject === 'Business Studies'){
        return constant.Icons.bussinessStudy
    }
    if(item?.subject === 'Economics'){
        return constant.Icons.economic
    }
    if(item?.subject === 'History'){
        return constant.Icons.history
    }
    if(item?.subject === 'Political Science'){
        return constant.Icons.politicalscience
    }
    if(item?.subject === 'Psychology'){
        return constant.Icons.psycology
    }
    if(item?.subject === 'Physical Education'){
        return constant.Icons.physicaleduction
    }
    if(item?.subject === 'Music'){
        return constant.Icons.music
    }
    else{
        return constant.Icons.math
    }
  }


  const renderItem = ({ item,index }) => (
      <Pressable style={styles.noteCardView} onPress={()=>fn_ListClick(item,index)}>
            <Image
              style={styles.noteAssignmentImage}
              source={fn_GetImage(item)}
            />
            <Text numberOfLines={2} style={styles.noteDashboardTextStyle}>{item?.subject}</Text>
           {item?.unread_count >  0 && 
           <View style={styles.dotStyle}>
           <Text numberOfLines={2} style={styles.noteactiveDot}>{item?.unread_count}</Text>
           </View>
            }
      </Pressable>
  );

  return (
    <LinearGradient colors={['#DFE6FF', '#ffffff']} style={{ flex: 1 }}>
      <View style={styles.MainContainer}>
        <CommonHeader
          title={'Subject'}
          onLeftClick={() => {
            navigation.goBack();
          }}
        />

        <FlatList
          numColumns={3}
          data={dataSource}
          contentContainerStyle={styles.notelistContainer}
          columnWrapperStyle={styles.notelistColumn}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={()=>constant.listSpace(constant.resW(3))}
          ListFooterComponent={()=><View style={{height:constant.resW(5)}} />}
        />
      </View>
    </LinearGradient>
  );
};

export default Notes;
