import React, {useEffect, useMemo, useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import useStudentAuth from '../../../store/hooks/useStudentAuth';

import {REMOTE_FILE_BASE_URL, colors, spacing} from '../../../constants';
import * as constant from '../../../Utils/Constant';

const getGreetingByTime = (date = new Date()) => {
  const hour = date.getHours();

  if (hour >= 5 && hour < 12) {
    return 'Good Morning';
  }

  if (hour >= 12 && hour < 17) {
    return 'Good Afternoon';
  }

  return 'Good Evening';
};

const HeaderAction = React.memo(({icon, onPress}) => (
  <Pressable onPress={onPress} style={styles.actionButton}>
    <Image resizeMode="contain" source={icon} style={styles.actionIcon} />
  </Pressable>
));

const HomeHeader = ({navigation}) => {
  const {userData} = useStudentAuth();
  const [greeting, setGreeting] = useState(() => getGreetingByTime());
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setGreeting(getGreetingByTime());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  const profileImageSource = useMemo(() => {
    if (imageError || !userData?.studentimage) {
      return constant.Icons.profileimg;
    }

    return {
      uri: `${REMOTE_FILE_BASE_URL}images/student_image/STUDENT/${userData.studentimage}`,
    };
  }, [userData?.studentimage, imageError]);

  return (
    <LinearGradient colors={['#C100FF', '#5B39F6']} style={styles.container}>
      <View style={styles.content}>
        <Pressable onPress={() => navigation.openDrawer()} style={styles.profileButton}>
          <View style={styles.avatarWrapper}>
            <Image
              source={profileImageSource}
              style={styles.avatar}
              onError={() => setImageError(true)}
            />
          </View>
        </Pressable>

        <View style={styles.textContainer}>
          <Text style={styles.greetingText}>{greeting}</Text>
          <Text numberOfLines={1} style={styles.nameText}>
            Hi {userData?.Student_name || 'Student'}
          </Text>
        </View>

        <View style={styles.actions}>
          <HeaderAction
            icon={constant.Icons.news}
            onPress={() => navigation.navigate('News')}
          />
          <HeaderAction
            icon={constant.Icons.support}
            onPress={() => navigation.navigate('ViewSupportSystem')}
          />
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    borderBottomLeftRadius: constant.resW(6),
    borderBottomRightRadius: constant.resW(6),
    overflow: 'hidden',
    paddingBottom: constant.resW(4),
    paddingHorizontal: constant.resW(4),
    paddingTop: constant.resW(3),
  },
  content: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  profileButton: {
    marginRight: spacing.sm,
  },
  avatarWrapper: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF24',
    borderColor: '#FFFFFF55',
    borderWidth: 1,
    borderRadius: 999,
    height: constant.resW(16),
    justifyContent: 'center',
    width: constant.resW(16),
  },
  avatar: {
    borderRadius: 999,
    height: constant.resW(13.2),
    width: constant.resW(13.2),
  },
  textContainer: {
    flex: 1,
  },
  greetingText: {
    color: colors.white,
    fontFamily: constant.typeMedium,
    fontSize: constant.font13,
    opacity: 0.88,
  },
  nameText: {
    color: colors.white,
    fontFamily: constant.typeSemiBold,
    fontSize: constant.font18,
    lineHeight: constant.resW(7),
    marginTop: constant.resW(0.3),
  },
  actions: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: spacing.sm,
    marginLeft: spacing.sm,
  },
  actionButton: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF22',
    borderColor: '#FFFFFF33',
    borderRadius: constant.resW(3.2),
    borderWidth: 1,
    height: constant.resW(11),
    justifyContent: 'center',
    width: constant.resW(11),
  },
  actionIcon: {
    height: constant.resW(6.6),
    width: constant.resW(6.6),
  },
});

export default React.memo(HomeHeader);
