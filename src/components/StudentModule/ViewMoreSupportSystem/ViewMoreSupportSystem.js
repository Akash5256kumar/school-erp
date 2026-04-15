import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  Image,
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Linking
} from 'react-native';
import AsyncStorage from "@react-native-community/async-storage";
import LinearGradient from 'react-native-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import moment from 'moment';
import { FileImage, MessageSquare, Clock, ShieldCheck, Download } from 'lucide-react-native';

import * as myConst from '../../Baseurl';
import * as constant from '../../../Utils/Constant';
import useStudentAuth from '../../../store/hooks/useStudentAuth';

// ─── Design Tokens ───────────────────────────────────────────────────
const PURPLE = "#C100FF";
const PURPLE_DARK = "#5B39F6";
const WHITE = "#FFFFFF";
const PAGE_BG = "#F5F4FF";
const SURFACE = "#FFFFFF";
const TEXT_STRONG = "#1E1B4B";
const TEXT_BODY = "#595975";
const TEXT_MUTED = "#9CA3AF";
const BORDER = "#E2E8F0";
const SHADOW_COLOR = "rgba(94,59,249,0.15)";
const ACCENT = "#f59e0b";

const ViewMoreSupportSystem = ({ navigation }) => {
  const { token: usertoken } = useStudentAuth();
  const insets = useSafeAreaInsets();

  const [classes, setClasses] = useState('');
  const [section, setSection] = useState('');
  const [name, setName] = useState('');
  const [rollno, setRollno] = useState('');
  const [issue, setIssue] = useState('');
  const [id, setId] = useState('');
  const [ticketItem, setTicketItem] = useState(null); // the original ticket object
  
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const studentClass = await AsyncStorage.getItem('@class');
      const studentRollno = await AsyncStorage.getItem('@std_roll');
      const studentSection = await AsyncStorage.getItem('@section');
      const studentName = await AsyncStorage.getItem('@name');
      const studentIssue = await AsyncStorage.getItem('@issue');
      const studentId = await AsyncStorage.getItem('@id');
      const rawTicketItem = await AsyncStorage.getItem('@ticket_item');

      setClasses(studentClass || '');
      setSection(studentSection || '');
      setName(studentName || '');
      setRollno(studentRollno || '');
      setIssue(studentIssue || '');
      setId(studentId || '');

      if (rawTicketItem) {
        try {
          setTicketItem(JSON.parse(rawTicketItem));
        } catch (e) {
          console.log("Failed to parse ticket item");
        }
      }

      if (studentId) {
        viewMoreSupportSystemApi(studentId);
      }
    };

    fetchData();
  }, []);

  const viewMoreSupportSystemApi = (ticketId) => {
    let formData = new FormData();
    formData.append('id', ticketId);

    setLoading(true);
    fetch(myConst.BASEURL + 'ticketresponse', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data',
        'Authorization': usertoken
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

  const getAttachmentUrl = () => {
    if (!ticketItem) return null;
    return ticketItem.document || ticketItem.file || ticketItem.attachment || ticketItem.image || null;
  };

  const attachmentUrl = getAttachmentUrl();

  const openAttachment = async () => {
    if (!attachmentUrl) return;
    try {
      await Linking.openURL(attachmentUrl);
    } catch (e) {
      constant.showAlert("Cannot open attachment right now.");
    }
  };

  // Safe checks for image extension
  const isImage = attachmentUrl && (attachmentUrl.toLowerCase().endsWith('.png') || attachmentUrl.toLowerCase().endsWith('.jpg') || attachmentUrl.toLowerCase().endsWith('.jpeg'));

  const renderResponse = ({ item }) => (
    <View style={s.responseCard}>
      <View style={s.responseHeader}>
        <View style={s.responseAvatar}>
          <ShieldCheck color={WHITE} size={18} strokeWidth={2} />
        </View>
        <View style={s.responseMeta}>
          <Text style={s.responderName}>{item.teachername || 'Staff'}</Text>
          <Text style={s.responseTime}>
            {moment(item.created_at).format('DD MMM YYYY, hh:mm A')}
          </Text>
        </View>
      </View>
      <View style={s.responseBodyWrap}>
        <Text style={s.responseText}>{item.response}</Text>
      </View>
      {item.deadline && (
        <View style={s.deadlineBadge}>
          <Clock color={ACCENT} size={14} strokeWidth={2.5} />
          <Text style={s.deadlineTxt}>Deadline: {item.deadline}</Text>
        </View>
      )}
    </View>
  );

  return (
    <View style={s.root}>
      {/* 1. Header Background */}
      <LinearGradient
        colors={[PURPLE, PURPLE_DARK]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[s.headerBg, { paddingTop: insets.top + 16 }]}
      />

      {/* 2. Header UI */}
      <View style={[s.headerUI, { paddingTop: insets.top + 16 }]} pointerEvents="box-none">
        <Pressable
          accessibilityRole="button"
          onPress={() => navigation.goBack()}
          style={s.backBtn}
        >
          <Image
            source={constant.Icons.backArrowIcon}
            style={s.backIcon}
            resizeMode="contain"
          />
        </Pressable>
        <Text style={s.headerTitle} numberOfLines={1}>
          Ticket Details
        </Text>
        <View style={s.headerRightPlaceholder} />
      </View>

      {/* 3. Main Content */}
      <ScrollView
        contentContainerStyle={[s.content, { paddingBottom: insets.bottom + 40 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Ticket Summary Card */}
        <View style={s.card}>
          <View style={s.cardSection}>
            <Text style={s.label}>Reported By</Text>
            <Text style={s.valueBold}>{name}</Text>
            <Text style={s.valueSub}>Roll No: {rollno}  •  Class {classes}-{section}</Text>
          </View>
          
          <View style={s.divider} />
          
          <View style={s.cardSection}>
            <Text style={s.label}>Issue Description</Text>
            <Text style={s.issueText}>{issue || 'No description provided.'}</Text>
          </View>

          {attachmentUrl ? (
            <View style={s.attachmentSection}>
              <Text style={s.label}>Attachment</Text>
              <Pressable style={s.attachmentBox} onPress={openAttachment}>
                <View style={s.attachmentDetails}>
                  <FileImage color={PURPLE_DARK} size={28} strokeWidth={1.5} />
                  <View style={{flex: 1, marginLeft: 12}}>
                    <Text style={s.attachmentName}>Uploaded Document</Text>
                    <Text style={s.attachmentLink}>Tap to view file</Text>
                  </View>
                  <View style={s.downloadBtn}>
                    <Download color={PURPLE} size={18} strokeWidth={2.5} />
                  </View>
                </View>
                {/* Visual preview if recognized as image */}
                {isImage && (
                  <Image source={{uri: attachmentUrl}} style={s.imagePreview} resizeMode="cover" />
                )}
              </Pressable>
            </View>
          ) : null}
        </View>

        {/* Responses Component */}
        <View style={s.responsesHeader}>
          <MessageSquare color={PURPLE_DARK} size={20} strokeWidth={2} />
          <Text style={s.responsesTitle}>Updates & Responses</Text>
        </View>

        {loading ? (
          <View style={{ padding: 40, alignItems: 'center' }}>
            <ActivityIndicator color={PURPLE_DARK} size="large" />
          </View>
        ) : dataSource.length > 0 ? (
          <FlatList
            data={dataSource}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderResponse}
            scrollEnabled={false}
            nestedScrollEnabled={true}
            contentContainerStyle={{ gap: 16 }}
          />
        ) : (
          <View style={s.emptyWrap}>
             <Text style={s.emptyMsg}>We are reviewing your ticket. Any responses or updates from staff will appear here.</Text>
          </View>
        )}

      </ScrollView>
    </View>
  );
};

export default ViewMoreSupportSystem;

// ─── Styles ─────────────────────────────────────────────────────────
const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: PAGE_BG },

  // Header Layers
  headerBg: {
    position: "absolute",
    top: 0, left: 0, right: 0,
    height: 140,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerUI: {
    position: "absolute",
    top: 0, left: 0, right: 0,
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 24,
    paddingHorizontal: 16,
    zIndex: 10,
  },
  backBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "rgba(255,255,255,0.22)",
    alignItems: "center",
    justifyContent: "center",
  },
  backIcon: { height: 18, width: 18, tintColor: WHITE },
  headerTitle: {
    flex: 1,
    fontFamily: constant.typeBold,
    fontSize: constant.font18,
    color: WHITE,
    textAlign: "center",
  },
  headerRightPlaceholder: { width: 38 },

  // Content
  content: {
    paddingHorizontal: 16,
    paddingTop: 100, // Starts naturally right over the 140 Header
  },

  // Primary Card
  card: {
    backgroundColor: SURFACE,
    borderRadius: 20,
    elevation: 4,
    shadowColor: SHADOW_COLOR,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 1,
    shadowRadius: 12,
    marginBottom: 24,
    overflow: 'hidden',
  },
  cardSection: {
    padding: 20,
  },
  divider: {
    height: 1,
    backgroundColor: BORDER,
    marginHorizontal: 20,
  },
  label: {
    fontFamily: constant.typeSemiBold,
    fontSize: constant.font13,
    color: TEXT_MUTED,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  valueBold: {
    fontFamily: constant.typeBold,
    fontSize: constant.font18,
    color: TEXT_STRONG,
    marginBottom: 2,
  },
  valueSub: {
    fontFamily: constant.typeMedium,
    fontSize: constant.font14,
    color: TEXT_BODY,
  },
  issueText: {
    fontFamily: constant.typeMedium,
    fontSize: constant.font16,
    color: TEXT_STRONG,
    lineHeight: 24,
  },

  // Attachment
  attachmentSection: {
    padding: 20,
    paddingTop: 0,
  },
  attachmentBox: {
    marginTop: 8,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 16,
    overflow: 'hidden',
  },
  attachmentDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  attachmentName: {
    fontFamily: constant.typeSemiBold,
    fontSize: constant.font15,
    color: TEXT_STRONG,
  },
  attachmentLink: {
    fontFamily: constant.typeMedium,
    fontSize: constant.font13,
    color: PURPLE,
    marginTop: 2,
  },
  downloadBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: `${PURPLE}18`,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imagePreview: {
    width: '100%',
    height: 200,
    borderTopWidth: 1,
    borderTopColor: BORDER,
  },

  // Responses Area
  responsesHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
    paddingHorizontal: 4,
  },
  responsesTitle: {
    fontFamily: constant.typeBold,
    fontSize: constant.font18,
    color: TEXT_STRONG,
  },
  emptyWrap: {
    backgroundColor: SURFACE,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
  },
  emptyMsg: {
    fontFamily: constant.typeMedium,
    fontSize: constant.font14,
    color: TEXT_BODY,
    textAlign: 'center',
    lineHeight: 22,
  },

  // Response Card
  responseCard: {
    backgroundColor: SURFACE,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(94,59,249,0.06)',
    elevation: 2,
    shadowColor: SHADOW_COLOR,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 6,
    overflow: 'hidden',
  },
  responseHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F3FF', // Very light purple
    padding: 12,
    paddingHorizontal: 16,
  },
  responseAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: PURPLE,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  responseMeta: {
    flex: 1,
  },
  responderName: {
    fontFamily: constant.typeBold,
    fontSize: constant.font14,
    color: TEXT_STRONG,
  },
  responseTime: {
    fontFamily: constant.typeMedium,
    fontSize: constant.font12,
    color: TEXT_BODY,
    marginTop: 2,
  },
  responseBodyWrap: {
    padding: 16,
  },
  responseText: {
    fontFamily: constant.typeMedium,
    fontSize: constant.font15,
    color: TEXT_STRONG,
    lineHeight: 22,
  },
  deadlineBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: '#FFFBEB',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginLeft: 16,
    marginBottom: 16,
    gap: 6,
  },
  deadlineTxt: {
    fontFamily: constant.typeSemiBold,
    fontSize: constant.font12,
    color: '#B45309', // Dark amber text
  },
});
