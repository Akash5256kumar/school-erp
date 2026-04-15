import React, { useEffect, useState, useCallback } from 'react';
import {
  Text,
  View,
  Image,
  FlatList,
  BackHandler,
  Pressable,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import styles from './SubjectScreenStyle';
import LinearGradient from 'react-native-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowLeft } from 'lucide-react-native';
import * as constant from '../../../Utils/Constant';
import AsyncStorage from '@react-native-community/async-storage';
import * as myConst from '../../Baseurl';
import useStudentAuth from '../../../store/hooks/useStudentAuth';
import AppLoader from '../../common/AppLoader';

const getHomeworkTheme = item => {
  const subject = String(item?.subject || '').toLowerCase();

  if (subject.includes('english')) {
    return {
      accentColor: '#2E7CF6',
      badgeBackground: '#E8F1FF',
      badgeTextColor: '#2E7CF6',
      borderColor: '#CFE0FF',
      iconBackground: '#EEF5FF',
    };
  }

  if (subject.includes('hindi')) {
    return {
      accentColor: '#F28C28',
      badgeBackground: '#FFF0E3',
      badgeTextColor: '#D66D0D',
      borderColor: '#FFD9B8',
      iconBackground: '#FFF6EE',
    };
  }

  if (subject.includes('social')) {
    return {
      accentColor: '#10B981',
      badgeBackground: '#DCFCE7',
      badgeTextColor: '#047857',
      borderColor: '#A7F3D0',
      iconBackground: '#EAFBF4',
    };
  }

  if (
    subject.includes('science') ||
    subject.includes('chemistry') ||
    subject.includes('physics')
  ) {
    return {
      accentColor: '#0EA5A4',
      badgeBackground: '#DDF8F7',
      badgeTextColor: '#0F766E',
      borderColor: '#9FE4DE',
      iconBackground: '#E8FAF8',
    };
  }

  if (subject.includes('computer')) {
    return {
      accentColor: '#7C3AED',
      badgeBackground: '#F2EAFE',
      badgeTextColor: '#7C3AED',
      borderColor: '#DECDFE',
      iconBackground: '#F8F2FF',
    };
  }

  return {
    accentColor: '#7C3AED',
    badgeBackground: '#F2EAFE',
    badgeTextColor: '#7C3AED',
    borderColor: '#DECDFE',
    iconBackground: '#F8F2FF',
  };
};

const SubjectScreen = (props) => {
    const {navigation } = props
    const insets = useSafeAreaInsets();
    const [dataSource, setDataSource] = useState([]);
    const {token: usertoken} = useStudentAuth()
    const [originalDataSource, setOriginalDataSource] = useState([]);
    const [classes, setClasses] = useState('');
    const [classesRoll, setClassesRoll] = useState('');
    const [loading, setLoading] = useState(true);
    const [isNavigating, setIsNavigating] = useState(false);

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

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setIsNavigating(false);
    });

    return unsubscribe;
  }, [navigation]);
 
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
    formData.append('std_roll', rollNo);

    fetch(myConst.BASEURL + 'viewassign', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        'Authorization' : usertoken
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
    setIsNavigating(true);
    requestAnimationFrame(() => {
      navigation.navigate('Assignment', {
              // otherParam: 'Assignment',
              subjectData : item
          });
    });
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
        'Authorization' : usertoken
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


  const renderItem = ({item, index}) => {
    const theme = getHomeworkTheme(item);
    const badgeText =
      Number(item?.unread_count || 0) > 0
        ? `${item?.unread_count} New`
        : 'Homework';

    return (
      <Pressable style={styles.cardView} onPress={() => fn_ListClick(item, index)}>
        <LinearGradient
          colors={['#F8FAFF', '#FFFFFF']}
          end={{x: 1, y: 1}}
          start={{x: 0, y: 0}}
          style={[styles.cardGradient, {borderColor: theme.borderColor}]}>
          <View style={[styles.cardAccent, {backgroundColor: theme.accentColor}]} />

          <View style={styles.cardTopRow}>
            <View style={[styles.iconWrap, {backgroundColor: theme.iconBackground}]}>
              <Image style={styles.assignmentImage} source={fn_GetImage(item)} />
            </View>

            <View style={[styles.badge, {backgroundColor: theme.badgeBackground}]}>
              <Text style={[styles.badgeText, {color: theme.badgeTextColor}]}>
                {badgeText}
              </Text>
            </View>
          </View>

          <View style={styles.cardBody}>
            <Text numberOfLines={2} style={styles.cardTitle}>
              {item?.subject}
            </Text>
            <Text numberOfLines={2} style={styles.cardSubtitle}>
              Open homework, worksheets, and the latest class tasks.
            </Text>
          </View>

          <View style={styles.cardFooter}>
            <Text style={[styles.cardFooterText, {color: theme.accentColor}]}>
              Tap to open
            </Text>
          </View>
        </LinearGradient>
      </Pressable>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#F5F4FF' }}>
      <LinearGradient
        colors={['#C100FF', '#5B39F6']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[headerS.headerBg, { paddingTop: insets.top + 14 }]}
      >
        <View style={headerS.headerRow}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={headerS.backBtn}
            onPress={() => navigation.goBack()}
          >
            <ArrowLeft color="#FFFFFF" size={22} strokeWidth={2.2} />
          </TouchableOpacity>
          <Text style={headerS.headerTitle}>Homework</Text>
          <View style={headerS.headerSpacer} />
        </View>
      </LinearGradient>
      <View style={styles.MainContainer}>

        {loading ? (
          <AppLoader fullScreen label="Loading homework..." />
        ) : (
          <FlatList
            numColumns={2}
            data={dataSource}
            contentContainerStyle={styles.listContainer}
            columnWrapperStyle={styles.listColumn}
            ListHeaderComponent={() => (
              <View style={styles.heroCard}>
                <Text style={styles.heroTitle}>Choose Your Subject</Text>
                <Text style={styles.heroSubtitle}>
                  Open a subject to view homework, assignments, and recent classroom tasks.
                </Text>
              </View>
            )}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            ItemSeparatorComponent={()=>constant.listSpace(constant.resW(3))}
            ListFooterComponent={()=><View style={{height:constant.resW(5)}} />}
          />
        )}
        {isNavigating ? (
          <View style={styles.loaderOverlay}>
            <AppLoader label="Opening homework..." />
          </View>
        ) : null}
      </View>
    </View>
  );
};

const headerS = StyleSheet.create({
  headerBg: {
    paddingHorizontal: 16,
    paddingBottom: 22,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(255,255,255,0.22)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    fontFamily: constant.typeBold,
    color: '#FFFFFF',
  },
  headerSpacer: { width: 38 },
});

export default SubjectScreen;
