import React, {useMemo} from 'react';
import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import * as constant from '../Utils/Constant';
import {clearStudentSession} from '../auth/studentSessionController';
import useStudentAuth from '../store/hooks/useStudentAuth';

const buildMenuItems = navigation => [
  {label: 'Home', hint: 'Dashboard overview', onPress: () => navigation.navigate('StudentHome')},
  {label: 'Event', hint: 'School activities', onPress: () => navigation.navigate('Event')},
  {label: 'Holidays', hint: 'Holiday calendar', onPress: () => navigation.navigate('Holiday')},
  {label: 'Transport', hint: 'Bus and route details', onPress: () => navigation.navigate('Transport')},
  {
    label: 'Syllabus',
    hint: 'Course structure',
    onPress: () => navigation.navigate('Syllabus', {otherParam: 'Syllabus'}),
  },
  {
    label: 'Exam Schedule',
    hint: 'Upcoming exams',
    onPress: () => navigation.navigate('Syllabus', {otherParam: 'Exam Schedule'}),
  },
  {
    label: 'Library',
    hint: 'Books and resources',
    onPress: () => navigation.navigate('Library', {otherParam: 'Books'}),
  },
  {label: 'Multimedia', hint: 'Learning videos', onPress: () => navigation.navigate('Multimedia')},
  {label: 'Login devices', hint: 'Manage active devices', onPress: () => navigation.navigate('LoginDevice')},
];

const SideBar = props => {
  const {navigation} = props;
  const {userData} = useStudentAuth();
  const [imageError, setImageError] = React.useState(false);

  const menuItems = useMemo(() => buildMenuItems(navigation), [navigation]);

  const handleLogout = () => {
    Alert.alert(
      'Log out',
      'Do you want to logout?',
      [
        {text: 'Cancel', onPress: () => null, style: 'cancel'},
        {
          text: 'Confirm',
          onPress: async () => {
            await clearStudentSession();
            navigation.reset({index: 0, routes: [{name: 'RoleSelectionScreen'}]});
          },
        },
      ],
      {cancelable: false},
    );
  };

  const profileSource = !imageError && userData?.studentimage
    ? {
        uri:
          'http://139.59.90.236:86/images/student_image/STUDENT/' +
          userData.studentimage,
      }
    : require('../assests/images/businessman.png');

  const studentName = userData?.Student_name || 'Student';
  const studentRoll = userData?.std_roll || '--';
  const studentClass = userData?.Student_class || '--';
  const studentSection = userData?.Student_section || '--';

  return (
    <LinearGradient
      colors={['#C915FF', '#7E2DF1', '#4E2BD8']}
      end={{x: 1, y: 1}}
      start={{x: 0, y: 0}}
      style={styles.screen}>
      <ScrollView
        bounces={false}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <View style={styles.headerCard}>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => navigation.navigate('Profile')}
            style={styles.avatarShell}>
            <Image
              style={styles.profileImage}
              source={profileSource}
              onError={() => setImageError(true)}
            />
          </TouchableOpacity>

          <Text numberOfLines={2} style={styles.studentName}>
            {studentName}
          </Text>

          <View style={styles.metaRow}>
            <View style={styles.metaPill}>
              <Text style={styles.metaLabel}>Roll No.</Text>
              <Text style={styles.metaValue}>{studentRoll}</Text>
            </View>
            <View style={styles.metaPill}>
              <Text style={styles.metaLabel}>Class</Text>
              <Text style={styles.metaValue}>
                {studentClass} • {studentSection}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.menuCard}>
          <Text style={styles.menuTitle}>Quick access</Text>
          <Text style={styles.menuSubtitle}>
            Move through your student features with one tap.
          </Text>

          <View style={styles.menuList}>
            {menuItems.map(item => (
              <Pressable
                key={item.label}
                onPress={item.onPress}
                style={({pressed}) => [
                  styles.menuItem,
                  pressed && styles.menuItemPressed,
                ]}>
                <View style={styles.menuAccent}>
                  <Text style={styles.menuAccentText}>
                    {item.label.slice(0, 1)}
                  </Text>
                </View>

                <View style={styles.menuTextBlock}>
                  <Text style={styles.menuItemLabel}>{item.label}</Text>
                  <Text style={styles.menuItemHint}>{item.hint}</Text>
                </View>

                <Text style={styles.menuArrow}>›</Text>
              </Pressable>
            ))}
          </View>
        </View>

        <Pressable onPress={handleLogout} style={styles.logoutButton}>
          <View>
            <Text style={styles.logoutTitle}>Logout</Text>
            <Text style={styles.logoutSubtitle}>Sign out from this device</Text>
          </View>
          <View style={styles.logoutIconWrap}>
            <Image style={styles.logoutImage} source={constant.Icons.logout} />
          </View>
        </Pressable>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: constant.resW(24),
  },
  headerCard: {
    alignItems: 'center',
    marginHorizontal: constant.resW(4),
    marginTop: constant.resW(5),
    paddingHorizontal: constant.resW(4),
    paddingVertical: constant.resW(5),
  },
  avatarShell: {
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.16)',
    borderColor: 'rgba(255,255,255,0.22)',
    borderRadius: constant.resW(20),
    borderWidth: 1.5,
    height: constant.resW(29),
    justifyContent: 'center',
    marginBottom: constant.resW(3),
    width: constant.resW(29),
  },
  profileImage: {
    borderRadius: constant.resW(13.5),
    height: constant.resW(24),
    width: constant.resW(24),
  },
  studentName: {
    color: '#FFF2A8',
    fontFamily: constant.typeSemiBold,
    fontSize: constant.font20,
    lineHeight: constant.resW(7.2),
    textAlign: 'center',
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: constant.resW(3),
    width: '100%',
  },
  metaPill: {
    backgroundColor: 'rgba(255,255,255,0.14)',
    borderColor: 'rgba(255,255,255,0.18)',
    borderRadius: constant.resW(3),
    borderWidth: 1,
    flex: 0.48,
    paddingHorizontal: constant.resW(3),
    paddingVertical: constant.resW(2.4),
  },
  metaLabel: {
    color: 'rgba(255,255,255,0.7)',
    fontFamily: constant.typeMedium,
    fontSize: constant.font10,
    textTransform: 'uppercase',
  },
  metaValue: {
    color: constant.whiteColor,
    fontFamily: constant.typeSemiBold,
    fontSize: constant.font13,
    marginTop: constant.resW(0.8),
  },
  menuCard: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderColor: 'rgba(255,255,255,0.14)',
    borderRadius: constant.resW(5),
    borderWidth: 1,
    marginHorizontal: constant.resW(4),
    paddingHorizontal: constant.resW(3),
    paddingVertical: constant.resW(3.5),
  },
  menuTitle: {
    color: constant.whiteColor,
    fontFamily: constant.typeSemiBold,
    fontSize: constant.font17,
  },
  menuSubtitle: {
    color: 'rgba(255,255,255,0.72)',
    fontFamily: constant.typeMedium,
    fontSize: constant.font11,
    lineHeight: constant.resW(4.4),
    marginTop: constant.resW(1),
  },
  menuList: {
    marginTop: constant.resW(3),
  },
  menuItem: {
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderColor: 'rgba(255,255,255,0.12)',
    borderRadius: constant.resW(3),
    borderWidth: 1,
    flexDirection: 'row',
    marginBottom: constant.resW(2.4),
    paddingHorizontal: constant.resW(2.8),
    paddingVertical: constant.resW(2.5),
  },
  menuItemPressed: {
    backgroundColor: 'rgba(255,255,255,0.16)',
  },
  menuAccent: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: constant.resW(3),
    height: constant.resW(10),
    justifyContent: 'center',
    width: constant.resW(10),
  },
  menuAccentText: {
    color: '#6C2BF1',
    fontFamily: constant.typeSemiBold,
    fontSize: constant.font15,
  },
  menuTextBlock: {
    flex: 1,
    marginLeft: constant.resW(3),
  },
  menuItemLabel: {
    color: constant.whiteColor,
    fontFamily: constant.typeSemiBold,
    fontSize: constant.font14,
  },
  menuItemHint: {
    color: 'rgba(255,255,255,0.68)',
    fontFamily: constant.typeMedium,
    fontSize: constant.font10,
    marginTop: constant.resW(0.6),
  },
  menuArrow: {
    color: 'rgba(255,255,255,0.7)',
    fontFamily: constant.typeSemiBold,
    fontSize: constant.font18,
    marginLeft: constant.resW(2),
  },
  logoutButton: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: constant.resW(4),
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: constant.resW(4),
    marginTop: constant.resW(4),
    paddingHorizontal: constant.resW(4),
    paddingVertical: constant.resW(3),
  },
  logoutTitle: {
    color: '#26134D',
    fontFamily: constant.typeSemiBold,
    fontSize: constant.font15,
  },
  logoutSubtitle: {
    color: '#766A8D',
    fontFamily: constant.typeMedium,
    fontSize: constant.font10,
    marginTop: constant.resW(0.6),
  },
  logoutIconWrap: {
    alignItems: 'center',
    backgroundColor: '#F4EFFF',
    borderRadius: constant.resW(3),
    height: constant.resW(10),
    justifyContent: 'center',
    width: constant.resW(10),
  },
  logoutImage: {
    height: constant.resW(5.8),
    tintColor: '#6C2BF1',
    width: constant.resW(5.8),
  },
});

export default SideBar;
