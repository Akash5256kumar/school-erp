import React, { useMemo, useState, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  Pressable,
  StyleSheet,
  ActivityIndicator,
  Platform,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  CalendarDays,
  ChevronLeft,
  Download,
  BookOpen,
  FileText,
  User,
  Tag,
  Layers,
} from 'lucide-react-native';
import BlobUtil from 'react-native-blob-util';
import * as constant from '../../../Utils/Constant';
import moment from 'moment';

const PURPLE      = '#5E3BF9';
const PURPLE_DARK = '#4527D6';
const ACCENT      = '#F59E0B';
const SURFACE     = '#FFFFFF';
const TEXT_STRONG = '#1E1B4B';
const TEXT_BODY   = '#595975';
const TEXT_MUTED  = '#9CA3AF';
const DIVIDER     = '#F1F5F9';
const SHADOW_COLOR = 'rgba(94,59,249,0.12)';

const IMAGE_EXTENSIONS = ['jpeg', 'jpg', 'png', 'webp', 'gif'];

const toAbsoluteUrl = (value) => {
  const normalized = String(value || '').trim();
  if (!normalized) return '';
  if (/^https?:\/\//i.test(normalized)) return normalized;
  return `http://139.59.90.236:86/images/${normalized.replace(/^\/+/, '')}`;
};

const formatDate = (value) => {
  if (!value) return null;
  const parsed = moment(value);
  return parsed.isValid() ? parsed.format('DD MMM YYYY') : null;
};

// ─── Detail Row ───────────────────────────────────────────────────────────────

const DetailRow = ({ icon: Icon, label, value }) => {
  if (!value) return null;
  return (
    <View style={s.detailRow}>
      <View style={s.detailIconWrap}>
        <Icon color={PURPLE} size={16} strokeWidth={2} />
      </View>
      <View style={s.detailContent}>
        <Text style={s.detailLabel}>{label}</Text>
        <Text style={s.detailValue}>{value}</Text>
      </View>
    </View>
  );
};

// ─── Main Screen ─────────────────────────────────────────────────────────────

const SyllabusDetail = ({ navigation, route }) => {
  const insets = useSafeAreaInsets();
  const item = useMemo(() => route?.params?.syllabusItem || {}, [route?.params?.syllabusItem]);

  const fileName  = String(item?.u_file || '').trim();
  const fileUrl   = useMemo(() => toAbsoluteUrl(fileName), [fileName]);
  const attachmentName = useMemo(() => {
    if (!fileName) return 'Attachment';
    const segments = fileName.split(/[\\/]+/);
    return segments[segments.length - 1] || 'Attachment';
  }, [fileName]);
  const fileExt  = attachmentName.split('.').pop()?.toLowerCase() || '';
  const isImage  = IMAGE_EXTENSIONS.includes(fileExt);
  const formattedDate = formatDate(item?.u_date);

  const [downloading, setDownloading] = useState(false);

  const handleDownload = useCallback(async () => {
    if (!fileUrl) {
      constant.showAlert('No attachment available to download.');
      return;
    }
    try {
      setDownloading(true);
      const fileNameOnly = fileUrl.split('/').pop() || `attachment.${fileExt || 'bin'}`;
      const { fs } = BlobUtil;
      const downloadPath =
        Platform.OS === 'ios'
          ? `${fs.dirs.DocumentDir}/${fileNameOnly}`
          : `/storage/emulated/0/Download/${fileNameOnly}`;

      await BlobUtil.config({
        fileCache: true,
        path: downloadPath,
        addAndroidDownloads:
          Platform.OS === 'android'
            ? {
                useDownloadManager: true,
                notification: true,
                path: downloadPath,
                description: 'Downloading syllabus attachment',
                mime: 'application/octet-stream',
              }
            : undefined,
      }).fetch('GET', fileUrl);

      constant.showAlert('Downloaded successfully');
    } catch (error) {
      console.log('Syllabus attachment download error:', error);
      constant.showAlert('Download failed');
    } finally {
      setDownloading(false);
    }
  }, [fileUrl, fileExt]);

  return (
    <View style={s.root}>
      {/* Gradient header background */}
      <LinearGradient
        colors={[PURPLE, PURPLE_DARK]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[s.headerBg, { paddingTop: insets.top + 16 }]}
      />

      {/* Header UI */}
      <View style={[s.headerUI, { paddingTop: insets.top + 16 }]} pointerEvents="box-none">
        <Pressable accessibilityRole="button" onPress={() => navigation.goBack()} style={s.backBtn}>
          <ChevronLeft color="#FFFFFF" size={24} strokeWidth={2.2} />
        </Pressable>
        <Text style={s.headerTitle} numberOfLines={1}>Syllabus Details</Text>
        <View style={s.headerRightPlaceholder} />
      </View>

      <ScrollView
        contentContainerStyle={[s.content, { paddingBottom: insets.bottom + 40 }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={s.card}>
          {/* Card top: icon + date badge */}
          <View style={s.cardHeader}>
            <View style={s.iconWrap}>
              <BookOpen color={ACCENT} size={28} strokeWidth={1.5} />
            </View>
            {formattedDate ? (
              <View style={s.dateBadge}>
                <CalendarDays color={ACCENT} size={14} strokeWidth={2.5} />
                <Text style={s.dateTxt}>{formattedDate}</Text>
              </View>
            ) : null}
          </View>

          {/* Title */}
          <Text style={s.title}>{item.subject || 'Syllabus'}</Text>

          <View style={s.divider} />

          {/* Overview section */}
          <View style={s.sectionHeader}>
            <BookOpen color={PURPLE_DARK} size={18} strokeWidth={2} />
            <Text style={s.sectionTitle}>Overview</Text>
          </View>

          <View style={s.detailsBlock}>
            <DetailRow icon={Tag}    label="Topic"   value={item.topic} />
            <DetailRow icon={Layers} label="Chapter" value={item.chapter} />
            <DetailRow icon={BookOpen} label="Book"  value={item.book} />
            <DetailRow icon={User}   label="Teacher" value={item.teachername} />
            <DetailRow icon={CalendarDays} label="Class" value={item.std_class ? `Class ${item.std_class}` : null} />
          </View>

          {/* Attachment */}
          {fileUrl ? (
            <>
              <View style={s.divider} />

              <View style={[s.sectionHeader, { marginBottom: 12 }]}>
                <FileText color={PURPLE_DARK} size={18} strokeWidth={2} />
                <Text style={s.sectionTitle}>Attachment</Text>
              </View>

              {isImage ? (
                <Image source={{ uri: fileUrl }} style={s.attachmentImage} resizeMode="cover" />
              ) : (
                <View style={s.attachmentPlaceholder}>
                  <FileText color={ACCENT} size={32} />
                  <Text style={s.fileName}>{attachmentName}</Text>
                </View>
              )}

              <Pressable style={s.downloadBtn} onPress={handleDownload} disabled={downloading}>
                <LinearGradient
                  colors={[PURPLE, PURPLE_DARK]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={s.downloadBtnBg}
                >
                  {downloading ? (
                    <ActivityIndicator color="#FFFFFF" />
                  ) : (
                    <Download color="#FFFFFF" size={18} strokeWidth={2.2} />
                  )}
                  <Text style={s.downloadBtnTxt}>
                    {downloading ? 'Downloading...' : 'Download Attachment'}
                  </Text>
                </LinearGradient>
              </Pressable>
            </>
          ) : null}
        </View>
      </ScrollView>
    </View>
  );
};

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#F5F4FF' },

  // Header
  headerBg: {
    position: 'absolute',
    top: 0, left: 0, right: 0,
    height: 180,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerUI: {
    position: 'absolute',
    top: 0, left: 0, right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 24,
    paddingHorizontal: 16,
    zIndex: 10,
  },
  backBtn: {
    width: 38, height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(255,255,255,0.22)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontFamily: constant.typeBold,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  headerRightPlaceholder: { width: 38 },

  // Content
  content: {
    paddingHorizontal: 16,
    paddingTop: 110,
  },
  card: {
    backgroundColor: SURFACE,
    borderRadius: 20,
    padding: 24,
    shadowColor: SHADOW_COLOR,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 1,
    shadowRadius: 16,
    elevation: 6,
  },

  // Card header
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  iconWrap: {
    width: 56, height: 56,
    borderRadius: 28,
    backgroundColor: `${ACCENT}12`,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: `${ACCENT}12`,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  dateTxt: {
    fontSize: 12,
    fontFamily: constant.typeSemiBold,
    color: ACCENT,
  },

  // Title
  title: {
    fontSize: 22,
    fontFamily: constant.typeBold,
    color: TEXT_STRONG,
    lineHeight: 32,
    marginBottom: 24,
  },
  divider: {
    height: 1,
    backgroundColor: DIVIDER,
    marginBottom: 24,
  },

  // Section header
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: constant.typeBold,
    color: TEXT_STRONG,
  },

  // Detail rows
  detailsBlock: {
    gap: 12,
    marginBottom: 8,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  detailIconWrap: {
    width: 32, height: 32,
    borderRadius: 8,
    backgroundColor: `${PURPLE}10`,
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailContent: { flex: 1 },
  detailLabel: {
    fontSize: 12,
    fontFamily: constant.typeMedium,
    color: TEXT_MUTED,
    marginBottom: 2,
  },
  detailValue: {
    fontSize: 15,
    fontFamily: constant.typeSemiBold,
    color: TEXT_STRONG,
  },

  // Attachment
  attachmentImage: {
    width: '100%',
    height: 220,
    borderRadius: 18,
    marginBottom: 18,
  },
  attachmentPlaceholder: {
    borderRadius: 18,
    borderWidth: 1,
    borderColor: DIVIDER,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
  },
  fileName: {
    marginTop: 12,
    fontSize: 14,
    fontFamily: constant.typeSemiBold,
    color: TEXT_STRONG,
    textAlign: 'center',
  },
  downloadBtn: {
    borderRadius: 16,
    overflow: 'hidden',
    marginTop: 4,
  },
  downloadBtnBg: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    gap: 10,
  },
  downloadBtnTxt: {
    color: '#FFFFFF',
    fontSize: 15,
    fontFamily: constant.typeBold,
  },
});

export default SyllabusDetail;
