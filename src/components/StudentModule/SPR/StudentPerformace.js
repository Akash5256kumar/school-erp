import React, { useState, useEffect, useCallback } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Modal,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { BarChart2, ArrowLeft } from 'lucide-react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';
import useStudentAuth from '../../../store/hooks/useStudentAuth';
import * as myConst from '../../Baseurl';
import * as constant from '../../../Utils/Constant';

// ─── Helpers ─────────────────────────────────────────────────────────────────

const safeText = (value) =>
  value !== null && value !== undefined && String(value).trim() !== ''
    ? String(value)
    : '—';

const parseSubjects = (subjectStr) => {
  if (!subjectStr) return {};
  try {
    return typeof subjectStr === 'string' ? JSON.parse(subjectStr) : subjectStr;
  } catch {
    return {};
  }
};

const getStatusColors = (status) => {
  if (!status) return STATUS_PALETTE.default;
  const s = status.toLowerCase();
  if (
    s.includes('good') || s.includes('excellent') || s.includes('always') ||
    s.includes('disciplined') || s.includes('regular') || s.includes('punctual') ||
    s.includes('well dressed') || s.includes('complete') || s.includes('proactive') ||
    s.includes('brilliant')
  ) return STATUS_PALETTE.good;
  if (
    s.includes('average') || s.includes('partial') || s.includes('no interaction')
  ) return STATUS_PALETTE.average;
  if (
    s.includes('poor') || s.includes('bad') || s.includes('untidy') || s.includes('absent')
  ) return STATUS_PALETTE.poor;
  return STATUS_PALETTE.default;
};

const formatDate = (dateStr) => {
  if (!dateStr) return { day: '--', month: '---' };
  const parts = dateStr.split('-');
  if (parts.length < 3) return { day: '--', month: '---' };
  const month = MONTH_NAMES[parseInt(parts[1], 10) - 1] || '---';
  return { day: parts[2], month };
};

// ─── Constants ────────────────────────────────────────────────────────────────

const PURPLE        = '#5E3BF9';
const WHITE         = '#FFFFFF';
const PAGE_BG       = '#F5F4FF';
const SURFACE       = '#FFFFFF';
const TEXT_STRONG   = '#1E1B4B';
const TEXT_BODY     = '#595975';
const TEXT_MUTED    = '#9CA3AF';
const CARD_BORDER   = '#EDE9FF';
const SHADOW_COLOR  = 'rgba(94,59,249,0.10)';
const HEADER_GRADIENT = ['#C100FF', '#5B39F6'];

const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const STATUS_PALETTE = {
  good:    { bg: '#F0FDF4', text: '#15803D', border: '#22C55E' },
  average: { bg: '#FFF7ED', text: '#C2540A', border: '#F97316' },
  poor:    { bg: '#FEF2F2', text: '#B91C1C', border: '#EF4444' },
  default: { bg: `${PURPLE}12`, text: PURPLE, border: PURPLE },
};

// ─── Atoms ────────────────────────────────────────────────────────────────────

const StatusPill = ({ value }) => {
  const c = getStatusColors(value);
  return (
    <View style={[pill.pill, { backgroundColor: c.bg, borderColor: c.border }]}>
      <Text style={[pill.text, { color: c.text }]} numberOfLines={1}>
        {safeText(value)}
      </Text>
    </View>
  );
};

const DateBadge = ({ dateStr }) => {
  const { day, month } = formatDate(dateStr);
  return (
    <LinearGradient
      colors={HEADER_GRADIENT}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={badge.wrap}>
      <Text style={badge.day}>{day}</Text>
      <Text style={badge.month}>{month}</Text>
    </LinearGradient>
  );
};

const MetricColumn = ({ label, value }) => (
  <View style={metric.col}>
    <Text style={metric.label}>{label}</Text>
    <StatusPill value={value} />
  </View>
);

// ─── Performance Card ─────────────────────────────────────────────────────────

const PerformanceCard = ({ item, onPress }) => {
  const subjectCount = Object.keys(parseSubjects(item.subject)).length;
  const isActive = item.isActive === 1;

  return (
    <TouchableOpacity activeOpacity={0.82} onPress={onPress} style={card.touchable}>
      <View style={card.container}>
        {/* Header row */}
        <View style={card.headerRow}>
          <DateBadge dateStr={item.date} />
          <View style={card.info}>
            <Text style={card.teacher} numberOfLines={1}>
              {safeText(item.class_teacher)}
            </Text>
            <Text style={card.classText}>
              Class {safeText(item.class)} – Section {safeText(item.section)}
            </Text>
          </View>
          <View style={[card.dot, { backgroundColor: isActive ? '#22C55E' : '#CBD5E1' }]} />
        </View>

        <View style={card.divider} />

        {/* Key metrics */}
        <View style={card.metricsRow}>
          <MetricColumn label="Academics"  value={item.academics_performance} />
          <View style={card.metricSep} />
          <MetricColumn label="Discipline" value={item.discipline} />
          <View style={card.metricSep} />
          <MetricColumn label="Homework"   value={item.homework} />
        </View>

        {subjectCount > 0 && (
          <Text style={card.hint}>
            {subjectCount} subject{subjectCount !== 1 ? 's' : ''} · tap for full report
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

// ─── Student Header ───────────────────────────────────────────────────────────

const StudentInfoCard = ({ student }) => {
  const initial = student?.Student_name?.charAt(0)?.toUpperCase() || 'S';
  return (
    <View style={info.row}>
      <View style={info.avatar}>
        <Text style={info.initial}>{initial}</Text>
      </View>
      <View style={info.details}>
        <Text style={info.name} numberOfLines={1}>{safeText(student?.Student_name)}</Text>
        <Text style={info.sub}>
          Class {safeText(student?.Student_class)} – Section {safeText(student?.Student_section)}
        </Text>
      </View>
    </View>
  );
};

// ─── Detail Modal ─────────────────────────────────────────────────────────────

const DetailSection = ({ title, children }) => (
  <View style={detail.section}>
    <LinearGradient
      colors={HEADER_GRADIENT}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={detail.sectionHeader}>
      <Text style={detail.sectionTitle}>{title}</Text>
    </LinearGradient>
    <View style={detail.sectionBody}>{children}</View>
  </View>
);

const PillRow = ({ label, value }) => (
  <View style={detail.row}>
    <Text style={detail.label}>{label}</Text>
    <StatusPill value={value} />
  </View>
);

const PlainRow = ({ label, value }) => (
  <View style={detail.row}>
    <Text style={detail.label}>{label}</Text>
    <Text style={detail.value}>{safeText(value)}</Text>
  </View>
);

const RemarkBlock = ({ label, text }) => {
  if (!text) return null;
  return (
    <View style={detail.remarkCard}>
      <Text style={detail.remarkLabel}>{label}</Text>
      <Text style={detail.remarkText}>{text}</Text>
    </View>
  );
};

const SubjectItem = ({ name, status, remark }) => {
  const hasContent = status || remark;
  if (!hasContent) return null;
  return (
    <View style={detail.subjectCard}>
      <Text style={detail.subjectName}>{name}</Text>
      <View style={detail.subjectMeta}>
        {status ? <StatusPill value={status} /> : null}
        {remark ? <Text style={detail.subjectRemark}>{remark}</Text> : null}
      </View>
    </View>
  );
};

const DetailModal = ({ item, visible, onClose }) => {
  if (!item) return null;

  const subjects = parseSubjects(item.subject);
  const subjectEntries = Object.entries(subjects);
  const hasRemarks = item.strength || item.area_concern || item.warden_comment;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={false}
      onRequestClose={onClose}
    >
      <SafeAreaView style={detail.safeArea}>
        <StatusBar backgroundColor="#C100FF" barStyle="light-content" />

        {/* Modal header */}
        <LinearGradient colors={HEADER_GRADIENT} style={detail.modalHeader}>
          <TouchableOpacity onPress={onClose} style={detail.backBtn} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
            <ArrowLeft color={WHITE} size={22} strokeWidth={2.2} />
          </TouchableOpacity>
          <Text style={detail.modalTitle}>Performance Detail</Text>
          <View style={detail.spacer} />
        </LinearGradient>

        <View style={detail.flex}>
          <ScrollView
            contentContainerStyle={detail.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {/* Report Info */}
            <DetailSection title="Report Info">
              <PlainRow label="Date"          value={item.date} />
              <PlainRow label="Class Teacher" value={item.class_teacher} />
            </DetailSection>

            {/* Performance */}
            <DetailSection title="Performance">
              <PillRow label="Academics"  value={item.academics_performance} />
              <PillRow label="Discipline" value={item.discipline} />
              <PillRow label="Homework"   value={item.homework} />
              <PillRow label="Classwork"  value={item.classwork} />
              <PillRow label="Punctuality" value={item.punctuality} />
              <PillRow label="Uniform"    value={item.uniform} />
              <PillRow label="Interaction" value={item.interaction} />
              <PillRow label="Sports"     value={item.sport_performance} />
              {item.cultural_performance ? (
                <PillRow label="Cultural" value={item.cultural_performance} />
              ) : null}
            </DetailSection>

            {/* Teacher Remarks */}
            {hasRemarks ? (
              <DetailSection title="Teacher's Remarks">
                <RemarkBlock label="Strength"       text={item.strength} />
                <RemarkBlock label="Area of Concern" text={item.area_concern} />
                <RemarkBlock label="Comment"        text={item.warden_comment} />
              </DetailSection>
            ) : null}

            {/* Subject Performance */}
            {subjectEntries.length > 0 ? (
              <DetailSection title="Subject Performance">
                {subjectEntries.map(([name, subj]) => (
                  <SubjectItem
                    key={name}
                    name={name}
                    status={subj?.status}
                    remark={subj?.remark}
                  />
                ))}
              </DetailSection>
            ) : null}
          </ScrollView>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

// ─── Main Screen ──────────────────────────────────────────────────────────────

const StudentPerformance = () => {
  const navigation = useNavigation();
  const [stdRoll, setStdRoll] = useState('');
  const [loading, setLoading] = useState(false);
  const [student, setStudent] = useState(null);
  const [performanceList, setPerformanceList] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  const { token: usertoken } = useStudentAuth();

  useEffect(() => {
    AsyncStorage.getItem('@std_roll').then((val) => {
      if (val) setStdRoll(val);
    });
  }, []);

  const fetchPerformance = useCallback(async () => {
    if (!stdRoll) return;
    setLoading(true);
    try {
      const response = await fetch(
        `${myConst.BASEURL}performance?std_roll=${stdRoll}`,
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            Authorization: `${usertoken}`,
          },
        },
      );
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const json = await response.json();
      if (json?.status) {
        setStudent(json.student || null);
        setPerformanceList(Array.isArray(json.performance) ? json.performance : []);
      } else {
        setPerformanceList([]);
      }
    } catch (error) {
      console.log('StudentPerformance fetch error:', error);
      setPerformanceList([]);
    } finally {
      setLoading(false);
    }
  }, [stdRoll, usertoken]);

  useEffect(() => {
    if (stdRoll) fetchPerformance();
  }, [stdRoll, fetchPerformance]);

  return (
    <View style={screen.root}>
      {/* Header */}
      <LinearGradient
        colors={HEADER_GRADIENT}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={screen.header}>
        <View style={screen.headerRow}>
          <TouchableOpacity onPress={() => navigation.navigate('Home')} style={screen.backBtn} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
            <ArrowLeft color={WHITE} size={22} strokeWidth={2.2} />
          </TouchableOpacity>
          <Text style={screen.headerTitle}>Student Performance</Text>
          <View style={screen.headerSpacer} />
        </View>
        {student ? <StudentInfoCard student={student} /> : null}
      </LinearGradient>

      {/* Body */}
      {loading ? (
        <View style={screen.center}>
          <ActivityIndicator size="large" color={PURPLE} />
          <Text style={screen.loadingText}>Loading performance...</Text>
        </View>
      ) : performanceList.length === 0 ? (
        <View style={screen.center}>
          <View style={screen.emptyIcon}>
            <BarChart2 color={PURPLE} size={44} strokeWidth={1.5} />
          </View>
          <Text style={screen.emptyTitle}>No Data Found</Text>
          <Text style={screen.emptySubtitle}>No performance records available yet.</Text>
        </View>
      ) : (
        <FlatList
          data={performanceList}
          keyExtractor={(item, idx) => String(item.id ?? idx)}
          renderItem={({ item }) => (
            <PerformanceCard item={item} onPress={() => setSelectedItem(item)} />
          )}
          contentContainerStyle={screen.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}

      <DetailModal
        item={selectedItem}
        visible={!!selectedItem}
        onClose={() => setSelectedItem(null)}
      />
    </View>
  );
};

// ─── Styles ───────────────────────────────────────────────────────────────────

const screen = StyleSheet.create({
  root: { flex: 1, backgroundColor: PAGE_BG },
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.22)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    flex: 1,
    fontSize: constant.font18,
    fontFamily: constant.typeBold,
    color: WHITE,
    textAlign: 'center',
  },
  headerSpacer: { width: 36 },
  listContent: {
    padding: 16,
    paddingBottom: 32,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  loadingText: {
    marginTop: 12,
    fontSize: constant.font14,
    fontFamily: constant.typeRegular,
    color: TEXT_BODY,
  },
  emptyIcon: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: `${PURPLE}12`,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: constant.font18,
    fontFamily: constant.typeSemiBold,
    color: TEXT_STRONG,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: constant.font14,
    fontFamily: constant.typeRegular,
    color: TEXT_MUTED,
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 22,
  },
});

const info = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.18)',
    borderRadius: 16,
    padding: 12,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.28)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  initial: {
    fontSize: constant.font20,
    fontFamily: constant.typeBold,
    color: WHITE,
  },
  details: { flex: 1 },
  name: {
    fontSize: constant.font16,
    fontFamily: constant.typeBold,
    color: WHITE,
  },
  sub: {
    fontSize: constant.font13,
    fontFamily: constant.typeRegular,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 2,
  },
});

const card = StyleSheet.create({
  touchable: { marginBottom: 12 },
  container: {
    backgroundColor: SURFACE,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: CARD_BORDER,
    elevation: 3,
    shadowColor: SHADOW_COLOR,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 10,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  info: { flex: 1, marginLeft: 12 },
  teacher: {
    fontSize: constant.font15,
    fontFamily: constant.typeSemiBold,
    color: TEXT_STRONG,
  },
  classText: {
    fontSize: constant.font13,
    fontFamily: constant.typeRegular,
    color: TEXT_BODY,
    marginTop: 2,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  divider: {
    height: 1,
    backgroundColor: '#F1F0FF',
    marginVertical: 14,
  },
  metricsRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  metricSep: {
    width: 1,
    height: 42,
    backgroundColor: '#F1F0FF',
    marginTop: 4,
  },
  hint: {
    marginTop: 10,
    fontSize: constant.font12,
    fontFamily: constant.typeRegular,
    color: TEXT_MUTED,
    textAlign: 'right',
  },
});

const badge = StyleSheet.create({
  wrap: {
    width: 48,
    height: 52,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  day: {
    fontSize: constant.font18,
    fontFamily: constant.typeBold,
    color: WHITE,
    lineHeight: 22,
  },
  month: {
    fontSize: 11,
    fontFamily: constant.typeSemiBold,
    color: 'rgba(255,255,255,0.85)',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
});

const metric = StyleSheet.create({
  col: {
    flex: 1,
    alignItems: 'center',
    gap: 6,
  },
  label: {
    fontSize: 11,
    fontFamily: constant.typeSemiBold,
    color: TEXT_MUTED,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
});

const pill = StyleSheet.create({
  pill: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 20,
    borderWidth: 1,
    maxWidth: 100,
    alignItems: 'center',
  },
  text: {
    fontSize: 11,
    fontFamily: constant.typeSemiBold,
    textAlign: 'center',
  },
});

const detail = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#C100FF' },
  flex: { flex: 1, backgroundColor: PAGE_BG },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  backBtn: { width: 60 },
  backText: {
    fontSize: constant.font15,
    fontFamily: constant.typeSemiBold,
    color: WHITE,
  },
  modalTitle: {
    fontSize: constant.font17,
    fontFamily: constant.typeBold,
    color: WHITE,
  },
  spacer: { width: 60 },
  scrollContent: {
    padding: 16,
    paddingBottom: 48,
  },
  section: {
    backgroundColor: SURFACE,
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: CARD_BORDER,
    elevation: 3,
    shadowColor: SHADOW_COLOR,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 10,
  },
  sectionHeader: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  sectionTitle: {
    fontSize: 12,
    fontFamily: constant.typeBold,
    color: WHITE,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  sectionBody: {
    paddingHorizontal: 16,
    paddingTop: 4,
    paddingBottom: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F0FF',
  },
  label: {
    fontSize: constant.font13,
    fontFamily: constant.typeMedium,
    color: TEXT_BODY,
    flex: 1,
  },
  value: {
    fontSize: constant.font13,
    fontFamily: constant.typeSemiBold,
    color: TEXT_STRONG,
    flex: 1,
    textAlign: 'right',
  },
  remarkCard: {
    backgroundColor: `${PURPLE}08`,
    borderRadius: 10,
    padding: 12,
    marginVertical: 6,
  },
  remarkLabel: {
    fontSize: 11,
    fontFamily: constant.typeBold,
    color: PURPLE,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  remarkText: {
    fontSize: constant.font14,
    fontFamily: constant.typeRegular,
    color: TEXT_STRONG,
    lineHeight: 20,
  },
  subjectCard: {
    backgroundColor: `${PURPLE}08`,
    borderRadius: 12,
    padding: 12,
    marginVertical: 5,
  },
  subjectName: {
    fontSize: constant.font14,
    fontFamily: constant.typeBold,
    color: TEXT_STRONG,
    marginBottom: 6,
  },
  subjectMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  subjectRemark: {
    fontSize: constant.font13,
    fontFamily: constant.typeRegular,
    color: TEXT_BODY,
    flex: 1,
  },
});

export default StudentPerformance;
