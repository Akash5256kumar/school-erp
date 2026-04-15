import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Text,
  View,
  FlatList,
  ActivityIndicator,
  ScrollView,
  Animated,
  TouchableOpacity,
  Platform,
  UIManager,
  StyleSheet,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowLeft, GraduationCap, BookOpen, TrendingUp } from 'lucide-react-native';
import AsyncStorage from '@react-native-community/async-storage';
import * as myConst from '../../Baseurl';
import * as constant from '../../../Utils/Constant';
import useStudentAuth from '../../../store/hooks/useStudentAuth';

// ─── Design tokens (consistent with app-wide purple theme) ───────────────────
const PURPLE        = '#5E3BF9';
const PURPLE_DARK   = '#4527D6';
const PAGE_BG       = '#F5F4FF';
const SURFACE       = '#FFFFFF';
const TEXT_STRONG   = '#1E1B4B';
const TEXT_BODY     = '#595975';
const TEXT_MUTED    = '#9CA3AF';
const CARD_BORDER   = '#EDE9FF';
const SHADOW_COLOR  = 'rgba(94,59,249,0.10)';
const HEADER_GRADIENT = ['#C100FF', '#5B39F6'];

const TERM_OPTIONS = [
  { key: 'term1', label: 'Term 1' },
  { key: 'term2', label: 'Term 2' },
];

// ─── Grade badge color logic ──────────────────────────────────────────────────
const getGradePalette = (grade) => {
  const g = String(grade || '').trim().toUpperCase();
  if (!g || g === '-') return { bg: '#F5F4FF', text: PURPLE, border: CARD_BORDER };

  // Letter grades
  if (['A+', 'A'].includes(g))   return { bg: '#F0FDF4', text: '#15803D', border: '#22C55E' };
  if (['B+', 'B'].includes(g))   return { bg: '#EFF6FF', text: '#1D4ED8', border: '#3B82F6' };
  if (['C+', 'C'].includes(g))   return { bg: '#FFF7ED', text: '#C2540A', border: '#F97316' };
  if (['D', 'D+'].includes(g))   return { bg: '#FEF9C3', text: '#854D0E', border: '#EAB308' };
  if (['F', 'E'].includes(g))    return { bg: '#FEF2F2', text: '#B91C1C', border: '#EF4444' };

  // "Pass" / "Fail"
  if (g === 'PASS') return { bg: '#F0FDF4', text: '#15803D', border: '#22C55E' };
  if (g === 'FAIL') return { bg: '#FEF2F2', text: '#B91C1C', border: '#EF4444' };

  // Numeric grades
  const num = parseFloat(g);
  if (!isNaN(num)) {
    if (num >= 80) return { bg: '#F0FDF4', text: '#15803D', border: '#22C55E' };
    if (num >= 60) return { bg: '#EFF6FF', text: '#1D4ED8', border: '#3B82F6' };
    if (num >= 40) return { bg: '#FFF7ED', text: '#C2540A', border: '#F97316' };
    return        { bg: '#FEF2F2', text: '#B91C1C', border: '#EF4444' };
  }

  return { bg: '#F5F4FF', text: PURPLE, border: CARD_BORDER };
};

// ─── Sub-components ───────────────────────────────────────────────────────────

const GradeRow = ({ item, index }) => {
  const subject = item.subject || item.subject_name || item.name || 'Subject';
  const rawGrade = item.grade ?? item.marks_obtained ?? item.result ?? item.score ?? null;
  const grade = rawGrade == null || String(rawGrade).trim() === '' ? '-' : String(rawGrade);
  const palette = getGradePalette(grade);

  return (
    <View style={[s.gradeRow, index % 2 === 0 ? s.gradeRowEven : s.gradeRowOdd]}>
      <View style={s.gradeRowLeft}>
        <View style={s.subjectDot} />
        <Text style={s.subjectText} numberOfLines={2}>{subject}</Text>
      </View>
      <View style={[s.gradeBadge, { backgroundColor: palette.bg, borderColor: palette.border }]}>
        <Text style={[s.gradeText, { color: palette.text }]}>{grade}</Text>
      </View>
    </View>
  );
};

const SkeletonRow = () => (
  <View style={s.skeletonRow}>
    <View style={[s.skeletonBox, { flex: 1, marginRight: 16 }]} />
    <View style={[s.skeletonBox, { width: 52 }]} />
  </View>
);

// ─── Main Screen ──────────────────────────────────────────────────────────────

const Grade = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const { token: usertoken, userData } = useStudentAuth();

  const [loading, setLoading]           = useState(false);
  const [stdRoll, setStdRoll]           = useState('');
  const [studentInfo, setStudentInfo]   = useState({});
  const [selectedTerm, setSelectedTerm] = useState('term1');
  const [grades, setGrades]             = useState([]);
  const [message, setMessage]           = useState('');

  useEffect(() => {
    if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }, []);

  useEffect(() => {
    AsyncStorage.getItem('@std_roll').then(val => { if (val) setStdRoll(val); });
  }, []);

  useEffect(() => {
    if (stdRoll) fetchGrades(selectedTerm);
  }, [stdRoll]);

  const fetchGrades = useCallback(async (term) => {
    if (!stdRoll) return;
    setLoading(true);
    setMessage('');
    setGrades([]);
    fadeAnim.setValue(0);

    try {
      const query = `std_roll=${encodeURIComponent(stdRoll)}&term=${encodeURIComponent(term)}`;
      const response = await fetch(`${myConst.BASEURL}viewGrade?${query}`, {
        method: 'GET',
        headers: { Accept: 'application/json', Authorization: usertoken },
      });

      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const json = await response.json();

      if (json.student) setStudentInfo(json.student);

      const activeTerm = TERM_OPTIONS.some(t => t.key === json.active_term)
        ? json.active_term
        : term;
      if (json.active_term && TERM_OPTIONS.some(t => t.key === json.active_term)) {
        setSelectedTerm(json.active_term);
      }

      const raw = json.grades?.[term] ?? json.grades?.[activeTerm] ?? json.results ?? [];
      const parsed = Array.isArray(raw) ? raw : [];
      setGrades(parsed);
      if (parsed.length === 0) setMessage('No grades available for this term.');
    } catch (err) {
      console.log('Grade API Error:', err);
      setMessage('Unable to load grades. Please try again.');
    } finally {
      setLoading(false);
      Animated.timing(fadeAnim, { toValue: 1, duration: 300, useNativeDriver: true }).start();
    }
  }, [stdRoll, usertoken, fadeAnim]);

  const handleTermChange = (key) => {
    setSelectedTerm(key);
    fetchGrades(key);
  };

  const studentName =
    studentInfo?.name || studentInfo?.student_name ||
    userData?.name || userData?.Student_name || 'Student';
  const studentClass =
    studentInfo?.class || studentInfo?.Student_class || userData?.Student_class || '—';
  const studentSection = studentInfo?.section || userData?.section || '—';
  const avatarLetter = studentName.charAt(0).toUpperCase() || 'S';

  return (
    <View style={[s.root, { backgroundColor: PAGE_BG }]}>
      {/* ── Gradient Header ── */}
      <LinearGradient
        colors={HEADER_GRADIENT}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[s.headerBg, { paddingTop: insets.top + 14, paddingBottom: 22 }]}
      >
        <View style={s.headerRow}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={s.backBtn}
            onPress={() => navigation.navigate('Home')}
          >
            <ArrowLeft color="#FFFFFF" size={22} strokeWidth={2.2} />
          </TouchableOpacity>
          <Text style={s.headerTitle}>Grades</Text>
          <View style={s.headerSpacer} />
        </View>
      </LinearGradient>

      <ScrollView
        contentContainerStyle={[s.scrollContent, { paddingBottom: insets.bottom + 32 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Student Info Card ── */}
        <View style={s.studentCard}>
          <LinearGradient
            colors={['#EDE9FF', '#F5F4FF']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={s.studentCardGradient}
          >
            <View style={s.avatarCircle}>
              <Text style={s.avatarLetter}>{avatarLetter}</Text>
            </View>
            <View style={s.studentInfo}>
              <Text style={s.studentName} numberOfLines={1}>{studentName}</Text>
              <View style={s.studentMeta}>
                <View style={s.metaChip}>
                  <Text style={s.metaChipText}>Class {studentClass}</Text>
                </View>
                <View style={[s.metaChip, { marginLeft: 8 }]}>
                  <Text style={s.metaChipText}>Sec {studentSection}</Text>
                </View>
              </View>
            </View>
            <View style={s.gradeIconWrap}>
              <GraduationCap color={PURPLE} size={28} strokeWidth={1.6} />
            </View>
          </LinearGradient>
        </View>

        {/* ── Term Selector ── */}
        <View style={s.section}>
          <View style={s.sectionHeaderRow}>
            <TrendingUp color={PURPLE} size={18} strokeWidth={2} />
            <Text style={s.sectionLabel}>Select Term</Text>
          </View>
          <View style={s.termRow}>
            {TERM_OPTIONS.map(opt => {
              const active = selectedTerm === opt.key;
              return (
                <TouchableOpacity
                  key={opt.key}
                  activeOpacity={0.82}
                  disabled={loading}
                  onPress={() => handleTermChange(opt.key)}
                  style={s.termBtnWrap}
                >
                  {active ? (
                    <LinearGradient
                      colors={HEADER_GRADIENT}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      style={s.termBtn}
                    >
                      <Text style={[s.termBtnText, { color: '#FFFFFF' }]}>{opt.label}</Text>
                    </LinearGradient>
                  ) : (
                    <View style={[s.termBtn, s.termBtnInactive]}>
                      <Text style={[s.termBtnText, { color: TEXT_BODY }]}>{opt.label}</Text>
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* ── Grades Card ── */}
        <View style={s.gradesCard}>
          {/* Card Header */}
          <LinearGradient
            colors={['#EDE9FF', '#F5F4FF']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={s.gradesCardHeader}
          >
            <BookOpen color={PURPLE} size={18} strokeWidth={2} />
            <Text style={s.gradesCardTitle}>Subject Grades</Text>
            {!loading && grades.length > 0 && (
              <View style={s.countBadge}>
                <Text style={s.countBadgeText}>{grades.length}</Text>
              </View>
            )}
          </LinearGradient>

          {/* Table Header */}
          {!loading && grades.length > 0 && (
            <View style={s.tableHeader}>
              <Text style={s.tableHeaderText}>Subject</Text>
              <Text style={[s.tableHeaderText, { textAlign: 'right', flex: 0, width: 72 }]}>Grade</Text>
            </View>
          )}

          {/* Content */}
          <Animated.View style={{ opacity: fadeAnim }}>
            {loading ? (
              <View style={s.loadingArea}>
                {[1, 2, 3, 4, 5].map(i => <SkeletonRow key={i} />)}
              </View>
            ) : grades.length > 0 ? (
              <FlatList
                data={grades}
                keyExtractor={(item, idx) =>
                  `${item.subject || item.subject_name || item.name || 'sub'}_${idx}`
                }
                renderItem={({ item, index }) => <GradeRow item={item} index={index} />}
                scrollEnabled={false}
                contentContainerStyle={s.gradeList}
              />
            ) : (
              <View style={s.emptyState}>
                <View style={s.emptyIconCircle}>
                  <GraduationCap color={PURPLE} size={32} strokeWidth={1.5} />
                </View>
                <Text style={s.emptyTitle}>No Grades Yet</Text>
                <Text style={s.emptyMessage}>{message || 'No grades available for this term.'}</Text>
              </View>
            )}
          </Animated.View>
        </View>
      </ScrollView>
    </View>
  );
};

// ─── Styles ───────────────────────────────────────────────────────────────────

const s = StyleSheet.create({
  root: { flex: 1 },

  // Header
  headerBg: {
    paddingHorizontal: 16,
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

  // Scroll
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 20,
    gap: 16,
  },

  // Student Card
  studentCard: {
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: CARD_BORDER,
    shadowColor: SHADOW_COLOR,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 1,
    shadowRadius: 14,
    elevation: 5,
  },
  studentCardGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    gap: 14,
  },
  avatarCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: PURPLE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarLetter: {
    color: '#FFFFFF',
    fontSize: 22,
    fontFamily: constant.typeBold,
  },
  studentInfo: { flex: 1 },
  studentName: {
    fontSize: 17,
    fontFamily: constant.typeBold,
    color: TEXT_STRONG,
    marginBottom: 6,
  },
  studentMeta: { flexDirection: 'row' },
  metaChip: {
    backgroundColor: `${PURPLE}18`,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  metaChipText: {
    fontSize: 12,
    fontFamily: constant.typeSemiBold,
    color: PURPLE,
  },
  gradeIconWrap: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: `${PURPLE}12`,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Section
  section: {
    backgroundColor: SURFACE,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: CARD_BORDER,
    padding: 18,
    shadowColor: SHADOW_COLOR,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 3,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 14,
  },
  sectionLabel: {
    fontSize: 15,
    fontFamily: constant.typeBold,
    color: TEXT_STRONG,
  },

  // Term Selector
  termRow: {
    flexDirection: 'row',
    gap: 12,
  },
  termBtnWrap: { flex: 1 },
  termBtn: {
    borderRadius: 14,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  termBtnInactive: {
    backgroundColor: '#F5F4FF',
    borderWidth: 1,
    borderColor: CARD_BORDER,
  },
  termBtnText: {
    fontSize: 14,
    fontFamily: constant.typeSemiBold,
  },

  // Grades Card
  gradesCard: {
    backgroundColor: SURFACE,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: CARD_BORDER,
    overflow: 'hidden',
    shadowColor: SHADOW_COLOR,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 1,
    shadowRadius: 14,
    elevation: 5,
  },
  gradesCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 16,
    paddingVertical: 14,
  },
  gradesCardTitle: {
    flex: 1,
    fontSize: 15,
    fontFamily: constant.typeBold,
    color: TEXT_STRONG,
  },
  countBadge: {
    backgroundColor: `${PURPLE}18`,
    borderRadius: 20,
    minWidth: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  countBadgeText: {
    fontSize: 13,
    fontFamily: constant.typeBold,
    color: PURPLE,
  },

  // Table Header
  tableHeader: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: CARD_BORDER,
    backgroundColor: '#FAFAFA',
  },
  tableHeaderText: {
    flex: 1,
    fontSize: 12,
    fontFamily: constant.typeSemiBold,
    color: TEXT_MUTED,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },

  // Grade Rows
  gradeList: { paddingBottom: 4 },
  gradeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 13,
    borderTopWidth: 1,
    borderTopColor: CARD_BORDER,
  },
  gradeRowEven:  { backgroundColor: SURFACE },
  gradeRowOdd:   { backgroundColor: '#FAFBFF' },
  gradeRowLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingRight: 12,
  },
  subjectDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: PURPLE,
    flexShrink: 0,
  },
  subjectText: {
    flex: 1,
    fontSize: 14,
    fontFamily: constant.typeSemiBold,
    color: TEXT_STRONG,
    lineHeight: 20,
  },
  gradeBadge: {
    minWidth: 52,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gradeText: {
    fontSize: 13,
    fontFamily: constant.typeBold,
    textAlign: 'center',
  },

  // Loading Skeleton
  loadingArea: { padding: 16, gap: 12 },
  skeletonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  skeletonBox: {
    height: 36,
    borderRadius: 10,
    backgroundColor: '#EDE9FF',
  },

  // Empty State
  emptyState: {
    alignItems: 'center',
    paddingVertical: 48,
    paddingHorizontal: 24,
  },
  emptyIconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: `${PURPLE}12`,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 17,
    fontFamily: constant.typeBold,
    color: TEXT_STRONG,
    marginBottom: 8,
  },
  emptyMessage: {
    fontSize: 14,
    fontFamily: constant.typeMedium,
    color: TEXT_MUTED,
    textAlign: 'center',
    lineHeight: 21,
  },
});

export default Grade;
