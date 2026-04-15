import React, {useCallback, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Snackbar from 'react-native-snackbar';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import CommonHeader from '../../CommonHeader';
import LinearGradient from 'react-native-linear-gradient';
import {Plus} from 'lucide-react-native';

import {STRINGS} from '../../../constants';
import * as constant from '../../../Utils/Constant';
import staffApiClient from '../../../api/staffClient';
import ComplaintCard from './ComplaintCard';
import ComplaintDetailModal from './ComplaintDetailModal';
import {createComplaintTheme} from './complaintTheme';

const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const formatComplaintDate = value => {
  if (!value) {
    return '';
  }

  const parsedDate = new Date(value);

  if (Number.isNaN(parsedDate.getTime())) {
    return String(value);
  }

  const day = String(parsedDate.getDate()).padStart(2, '0');
  const month = MONTH_NAMES[parsedDate.getMonth()];
  const year = parsedDate.getFullYear();

  return `${day} ${month} ${year}`;
};

const getComplaintStatusLabel = status => {
  if (String(status) === '1' || String(status).toLowerCase() === 'approved') {
    return 'Approved';
  }

  return 'Pending';
};

const normalizeComplaintItem = (item, index) => ({
  Section: item?.section || item?.Section || '-',
  admissionNumber:
    item?.admission_no ||
    item?.[' admission_no'] ||
    item?.admissionNo ||
    item?.std_roll ||
    '-',
  class: item?.class || '-',
  complaintText: item?.reason || item?.complaint || item?.complaintText || '-',
  complaintType: item?.type || item?.complaintType || '-',
  createdAt: formatComplaintDate(item?.created_at || item?.createdAt),
  id: String(item?.id ?? item?.request_id ?? index),
  rawStatus: item?.status,
  status: getComplaintStatusLabel(item?.status),
  student: item?.name || item?.student || '-',
});

const StudentComplaint = () => {
  const navigation = useNavigation();
  const {height, width} = useWindowDimensions();
  const theme = createComplaintTheme({height, width});
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const handleCardPress = (item) => {
    setSelectedComplaint(item);
    setModalVisible(true);
  };

  const showMessage = useCallback(message => {
    Snackbar.show({
      backgroundColor: '#f15270',
      duration: Snackbar.LENGTH_SHORT,
      text: message,
    });
  }, []);

  const loadComplaints = useCallback(
    async ({isRefresh = false} = {}) => {
      try {
        if (isRefresh) {
          setRefreshing(true);
        } else {
          setLoading(true);
        }

        const userId = await AsyncStorage.getItem('@id');

        if (!userId) {
          setComplaints([]);
          showMessage('Your session details are missing. Please log in again.');
          return;
        }

        const formData = new FormData();
        formData.append('user_id', userId);

        const responseJson = await staffApiClient.upload('issuedraisebyuser', formData);

        if (responseJson.status) {
          const normalizedComplaints = (responseJson.data || []).map((item, index) =>
            normalizeComplaintItem(item, index),
          );
          setComplaints(normalizedComplaints);
          return;
        }

        setComplaints([]);
        showMessage(responseJson.message || 'Unable to load complaints right now.');
      } catch (error) {
        console.log(error);
        setComplaints([]);
        showMessage('Unable to load complaints right now.');
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [showMessage],
  );

  useFocusEffect(
    useCallback(() => {
      loadComplaints();
    }, [loadComplaints]),
  );

  const renderEmptyState = () => (
    <View
      style={[
        styles.emptyState,
        {
          backgroundColor: theme.colors.cardBackground,
          borderRadius: theme.radii.card,
          marginTop: theme.spacing.screenTop,
          paddingHorizontal: theme.spacing.cardBodyHorizontal,
          paddingVertical: theme.spacing.cardBodyVertical,
        },
        theme.shadows.card,
      ]}>
      {loading ? (
        <ActivityIndicator color={theme.colors.accentHeaderEnd} size="small" />
      ) : null}
      <Text
        style={[
          theme.typography.sectionTitle,
          styles.emptyTitle,
          loading ? styles.emptyTitleWithSpinner : null,
        ]}>
        {loading ? 'Loading complaints...' : 'No complaints found'}
      </Text>
      <Text style={[theme.typography.body, styles.emptyDescription]}>
        {loading
          ? 'Please wait while we fetch your complaint history.'
          : 'Complaints you raise will appear here once available.'}
      </Text>
    </View>
  );

  return (
    <LinearGradient
      colors={[
        theme.colors.backgroundGradientStart,
        theme.colors.backgroundGradientMiddle,
        theme.colors.backgroundGradientEnd,
      ]}
      style={styles.screen}>
      <CommonHeader
        compact
        title={STRINGS.staffComplaints.listTitle}
        textColor={constant.whiteColor}
        IconColor={constant.whiteColor}
        iconStyle={{
          height: theme.sizing.headerIcon,
          width: theme.sizing.headerIcon,
        }}
        gradientColors={[
          theme.colors.accentHeaderStart,
          theme.colors.accentHeaderEnd,
        ]}
        extStyle={[
          {
            height: theme.sizing.headerHeight,
          },
          theme.shadows.header,
        ]}
        titleStyle={theme.typography.headerTitle}
        onLeftClick={() => {
          navigation.goBack();
        }}
      />
      <FlatList
        data={complaints}
        keyExtractor={item => item.id}
        ListEmptyComponent={renderEmptyState}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={() => loadComplaints({isRefresh: true})} />
        }
        renderItem={({item}) => (
          <ComplaintCard item={item} onPress={handleCardPress} theme={theme} />
        )}
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: theme.spacing.contentBottom,
          paddingHorizontal: theme.spacing.screenHorizontal,
          paddingTop: theme.spacing.screenTop,
        }}
        showsVerticalScrollIndicator={false}
      />
      <TouchableOpacity
        accessibilityRole="button"
        activeOpacity={0.88}
        onPress={() => navigation.navigate('AddComplaint')}
        style={[
          styles.fabButton,
          {
            backgroundColor: theme.colors.fabBackground,
            borderColor: theme.colors.fabRing,
            borderRadius: theme.radii.fab,
            borderWidth: theme.sizing.fabBorderWidth,
            bottom: theme.spacing.screenHorizontal + theme.spacing.cardGap,
            height: theme.sizing.fabSize,
            right: theme.spacing.screenHorizontal,
            width: theme.sizing.fabSize,
          },
          theme.shadows.fab,
        ]}>
        <Plus
          color={constant.whiteColor}
          size={theme.sizing.fabIcon}
          strokeWidth={2.4}
        />
      </TouchableOpacity>
      <ComplaintDetailModal
        complaint={selectedComplaint}
        onClose={() => setModalVisible(false)}
        theme={theme}
        visible={modalVisible}
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  emptyDescription: {
    textAlign: 'center',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyTitle: {
    textAlign: 'center',
  },
  emptyTitleWithSpinner: {
    marginTop: 12,
  },
  fabButton: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
  },
  screen: {
    flex: 1,
  },
});

export default StudentComplaint;
