import React, {useCallback, useMemo, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  Linking,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {
  AlignLeft,
  CalendarDays,
  ChevronLeft,
  Download,
  Eye,
  ExternalLink,
  FileText,
  Newspaper,
  Tag,
} from 'lucide-react-native';
import Pdf from 'react-native-pdf';
import BlobUtil from 'react-native-blob-util';
import moment from 'moment';

import * as constant from '../../../Utils/Constant';
import {REMOTE_FILE_BASE_URL} from '../../../constants';

const PURPLE = '#C100FF';
const PURPLE_DARK = '#5B39F6';
const ACCENT = '#F59E0B';
const WHITE = '#FFFFFF';
const SURFACE = '#FFFFFF';
const PAGE_BG = '#F5F4FF';
const TEXT_STRONG = '#1E1B4B';
const TEXT_BODY = '#595975';
const TEXT_MUTED = '#9CA3AF';
const DIVIDER = '#F1F5F9';
const SHADOW_COLOR = 'rgba(94,59,249,0.12)';
const IMAGE_EXTENSIONS = ['jpeg', 'jpg', 'png', 'webp', 'gif'];

const normalizeFileValue = value => String(value || '').trim().replace(/\\/g, '/');

const toAbsoluteUrl = value => {
  const normalized = normalizeFileValue(value);

  if (!normalized) {
    return '';
  }

  if (/^https?:\/\//i.test(normalized)) {
    return encodeURI(normalized);
  }

  return encodeURI(`${REMOTE_FILE_BASE_URL}${normalized.replace(/^\/+/, '')}`);
};

const getAttachmentName = value => {
  const normalized = normalizeFileValue(value);

  if (!normalized) {
    return 'Attachment';
  }

  const segments = normalized.split('/');
  const lastSegment = segments[segments.length - 1] || normalized;
  const safeSegment = lastSegment.split('?')[0].split('#')[0] || lastSegment;

  try {
    return decodeURIComponent(safeSegment);
  } catch {
    return safeSegment;
  }
};

const getMimeType = extension => {
  if (extension === 'pdf') {
    return 'application/pdf';
  }

  if (IMAGE_EXTENSIONS.includes(extension)) {
    return extension === 'jpg' ? 'image/jpeg' : `image/${extension}`;
  }

  return 'application/octet-stream';
};

const formatEventDate = value => {
  if (!value) {
    return 'Date not available';
  }

  const parsedDate = moment(value);

  if (!parsedDate.isValid()) {
    return 'Date not available';
  }

  return parsedDate.format('DD MMM YYYY');
};

const EventDetail = ({navigation, route}) => {
  const insets = useSafeAreaInsets();
  const eventItem = useMemo(() => route?.params?.eventItem || {}, [route?.params?.eventItem]);

  const title = eventItem?.event_name || eventItem?.title || 'Event Details';
  const description =
    eventItem?.event_description || eventItem?.description || 'No description available.';
  const eventDate = eventItem?.event_time || eventItem?.event_date || eventItem?.date || '';
  const className =
    eventItem?.std_class ||
    eventItem?.class_name ||
    eventItem?.className ||
    eventItem?.class ||
    eventItem?.event_class ||
    '';
  const status = eventItem?.event_status || eventItem?.status || '';
  const rawAttachment =
    eventItem?.e_file ||
    eventItem?.file ||
    eventItem?.attachment ||
    eventItem?.document ||
    eventItem?.raw?.e_file ||
    '';

  const attachmentName = useMemo(() => getAttachmentName(rawAttachment), [rawAttachment]);
  const fileUrl = useMemo(() => toAbsoluteUrl(rawAttachment), [rawAttachment]);
  const fileExt = useMemo(
    () => attachmentName.split('.').pop()?.toLowerCase() || '',
    [attachmentName],
  );
  const isImage = IMAGE_EXTENSIONS.includes(fileExt);
  const isPdf = fileExt === 'pdf';
  const canPreviewInApp = isImage || isPdf;

  const [downloading, setDownloading] = useState(false);
  const [viewerVisible, setViewerVisible] = useState(false);
  const [pdfLoading, setPdfLoading] = useState(true);
  const [pdfError, setPdfError] = useState(false);

  const resetPdfState = useCallback(() => {
    setPdfLoading(true);
    setPdfError(false);
  }, []);

  const handleViewAttachment = useCallback(async () => {
    if (!fileUrl) {
      constant.showAlert('No attachment available to view.');
      return;
    }

    if (canPreviewInApp) {
      resetPdfState();
      setViewerVisible(true);
      return;
    }

    try {
      await Linking.openURL(fileUrl);
    } catch (error) {
      console.log('Event attachment open error:', error);
      constant.showAlert('Unable to open the attachment right now.');
    }
  }, [canPreviewInApp, fileUrl, resetPdfState]);

  const closeViewer = useCallback(() => {
    setViewerVisible(false);
    resetPdfState();
  }, [resetPdfState]);

  const handleDownload = useCallback(async () => {
    if (!fileUrl) {
      constant.showAlert('No attachment available to download.');
      return;
    }

    try {
      setDownloading(true);

      const {fs} = BlobUtil;
      const fileNameOnly = attachmentName || `attachment.${fileExt || 'bin'}`;
      const downloadDir = Platform.OS === 'ios' ? fs.dirs.DocumentDir : fs.dirs.DownloadDir;
      const downloadPath = `${downloadDir}/${fileNameOnly}`;

      await BlobUtil.config({
        fileCache: true,
        path: downloadPath,
        addAndroidDownloads:
          Platform.OS === 'android'
            ? {
                useDownloadManager: true,
                notification: true,
                path: downloadPath,
                description: 'Downloading event attachment',
                mime: getMimeType(fileExt),
                mediaScannable: true,
              }
            : undefined,
      }).fetch('GET', fileUrl);

      constant.showAlert('Downloaded successfully');
    } catch (error) {
      console.log('Event attachment download error:', error);
      constant.showAlert('Download failed');
    } finally {
      setDownloading(false);
    }
  }, [attachmentName, fileExt, fileUrl]);

  return (
    <View style={s.root}>
      <LinearGradient
        colors={[PURPLE, PURPLE_DARK]}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        style={[s.headerBg, {paddingTop: insets.top + 16}]}
      />

      <View style={[s.headerUI, {paddingTop: insets.top + 16}]} pointerEvents="box-none">
        <Pressable
          accessibilityRole="button"
          onPress={() => navigation.goBack()}
          style={s.backBtn}>
          <ChevronLeft color={WHITE} size={24} strokeWidth={2.2} />
        </Pressable>
        <Text style={s.headerTitle} numberOfLines={1}>
          Event Details
        </Text>
        <View style={s.headerRightPlaceholder} />
      </View>

      <ScrollView
        contentContainerStyle={[s.content, {paddingBottom: insets.bottom + 40}]}
        showsVerticalScrollIndicator={false}>
        <View style={s.card}>
          <View style={s.cardHeader}>
            <View style={s.iconWrap}>
              <Newspaper color={ACCENT} size={28} strokeWidth={1.5} />
            </View>
            {eventDate ? (
              <View style={s.dateBadge}>
                <CalendarDays
                  color={ACCENT}
                  size={14}
                  strokeWidth={2.5}
                  style={{marginRight: 6}}
                />
                <Text style={s.dateTxt}>{formatEventDate(eventDate)}</Text>
              </View>
            ) : null}
          </View>

          <Text style={s.title}>{title}</Text>

          <View style={s.divider} />

          <View style={s.sectionHeader}>
            <AlignLeft color={PURPLE_DARK} size={18} strokeWidth={2} />
            <Text style={s.sectionTitle}>Details</Text>
          </View>

          <Text style={s.description}>{description}</Text>

          {(className || status) && (
            <View style={s.metaWrap}>
              {className ? (
                <View style={s.metaChip}>
                  <Tag color={PURPLE_DARK} size={14} strokeWidth={2} />
                  <Text style={s.metaChipText}>Class: {className}</Text>
                </View>
              ) : null}
              {status ? (
                <View style={[s.metaChip, s.metaChipAccent]}>
                  <Text style={s.statusText}>Status: {status}</Text>
                </View>
              ) : null}
            </View>
          )}

          {fileUrl ? (
            <>
              <View style={s.divider} />

              <View style={s.sectionHeader}>
                <FileText color={PURPLE_DARK} size={18} strokeWidth={2} />
                <Text style={s.sectionTitle}>Attachment</Text>
              </View>

              <View style={s.attachmentCard}>
                {isImage ? (
                  <Image source={{uri: fileUrl}} style={s.attachmentPreview} resizeMode="cover" />
                ) : (
                  <View style={s.attachmentIconWrap}>
                    <FileText color={ACCENT} size={30} strokeWidth={1.8} />
                    <Text style={s.attachmentTypeLabel}>{isPdf ? 'PDF Document' : 'Attached File'}</Text>
                  </View>
                )}

                <Text style={s.attachmentName} numberOfLines={2}>
                  {attachmentName}
                </Text>
                <Text style={s.attachmentHint}>
                  {canPreviewInApp
                    ? 'Preview the file in app or download it to your device.'
                    : 'Open the file externally or download it to your device.'}
                </Text>

                <View style={s.actionRow}>
                  <Pressable onPress={handleViewAttachment} style={s.secondaryAction}>
                    <View style={s.secondaryActionInner}>
                      {canPreviewInApp ? (
                        <Eye color={PURPLE_DARK} size={18} strokeWidth={2.1} />
                      ) : (
                        <ExternalLink color={PURPLE_DARK} size={18} strokeWidth={2.1} />
                      )}
                      <Text style={s.secondaryActionText}>
                        {canPreviewInApp ? 'View Attachment' : 'Open Attachment'}
                      </Text>
                    </View>
                  </Pressable>

                  <Pressable onPress={handleDownload} disabled={downloading} style={s.primaryAction}>
                    <LinearGradient
                      colors={[PURPLE, PURPLE_DARK]}
                      start={{x: 0, y: 0}}
                      end={{x: 1, y: 0}}
                      style={s.primaryActionBg}>
                      {downloading ? (
                        <ActivityIndicator color={WHITE} />
                      ) : (
                        <Download color={WHITE} size={18} strokeWidth={2.2} />
                      )}
                      <Text style={s.primaryActionText}>
                        {downloading ? 'Downloading...' : 'Download'}
                      </Text>
                    </LinearGradient>
                  </Pressable>
                </View>
              </View>
            </>
          ) : null}
        </View>
      </ScrollView>

      <Modal
        animationType="slide"
        onRequestClose={closeViewer}
        transparent={false}
        visible={viewerVisible}>
        <LinearGradient
          colors={[PURPLE, PURPLE_DARK]}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={[s.viewerHeader, {paddingTop: insets.top + 12}]}>
          <Pressable onPress={closeViewer} style={s.viewerIconBtn}>
            <ChevronLeft color={WHITE} size={22} strokeWidth={2.4} />
          </Pressable>
          <Text style={s.viewerTitle} numberOfLines={1}>
            {attachmentName}
          </Text>
          <Pressable onPress={handleDownload} style={s.viewerIconBtn}>
            {downloading ? (
              <ActivityIndicator color={WHITE} size="small" />
            ) : (
              <Download color={WHITE} size={20} strokeWidth={2.2} />
            )}
          </Pressable>
        </LinearGradient>

        <View style={s.viewerBody}>
          {isPdf ? (
            <>
              {pdfLoading && !pdfError ? (
                <View style={s.pdfLoader}>
                  <ActivityIndicator color={PURPLE_DARK} size="large" />
                  <Text style={s.pdfLoaderText}>Loading PDF...</Text>
                </View>
              ) : null}
              {pdfError ? (
                <View style={s.unsupportedWrap}>
                  <FileText color={TEXT_MUTED} size={52} strokeWidth={1.6} />
                  <Text style={s.unsupportedTitle}>Unable to preview this PDF</Text>
                  <Text style={s.unsupportedText}>
                    You can still download the attachment from the top right button.
                  </Text>
                </View>
              ) : (
                <Pdf
                  onError={error => {
                    console.log('Event PDF preview error:', error);
                    setPdfError(true);
                    setPdfLoading(false);
                  }}
                  onLoadComplete={() => {
                    setPdfError(false);
                    setPdfLoading(false);
                  }}
                  source={{uri: fileUrl, cache: true}}
                  style={[s.pdf, pdfLoading && {opacity: 0}]}
                  trustAllCerts={false}
                />
              )}
            </>
          ) : isImage ? (
            <Image source={{uri: fileUrl}} style={s.viewerImage} resizeMode="contain" />
          ) : (
            <View style={s.unsupportedWrap}>
              <FileText color={TEXT_MUTED} size={52} strokeWidth={1.6} />
              <Text style={s.unsupportedTitle}>Preview not available</Text>
              <Text style={s.unsupportedText}>
                This file type needs to be opened outside the app or downloaded first.
              </Text>
            </View>
          )}
        </View>
      </Modal>
    </View>
  );
};

const s = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: PAGE_BG,
  },
  headerBg: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 180,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerUI: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 24,
    paddingHorizontal: 16,
    zIndex: 10,
  },
  backBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    flex: 1,
    fontFamily: constant.typeBold,
    fontSize: constant.font18,
    color: WHITE,
    textAlign: 'center',
  },
  headerRightPlaceholder: {
    width: 38,
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 110,
  },
  card: {
    backgroundColor: SURFACE,
    borderRadius: 20,
    padding: 24,
    minHeight: 400,
    elevation: 6,
    shadowColor: SHADOW_COLOR,
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 1,
    shadowRadius: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  iconWrap: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: `${ACCENT}12`,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: `${ACCENT}12`,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  dateTxt: {
    fontFamily: constant.typeSemiBold,
    fontSize: constant.font12,
    color: ACCENT,
  },
  title: {
    fontFamily: constant.typeBold,
    fontSize: constant.font22,
    color: TEXT_STRONG,
    lineHeight: 32,
    marginBottom: 24,
  },
  divider: {
    height: 1,
    backgroundColor: DIVIDER,
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  sectionTitle: {
    fontFamily: constant.typeSemiBold,
    fontSize: constant.font16,
    color: TEXT_STRONG,
  },
  description: {
    fontFamily: constant.typeRegular,
    fontSize: constant.font15,
    color: TEXT_BODY,
    lineHeight: 26,
  },
  metaWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 20,
  },
  metaChip: {
    alignItems: 'center',
    backgroundColor: '#F5F3FF',
    borderRadius: 18,
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 9,
  },
  metaChipAccent: {
    backgroundColor: '#FEF3C7',
  },
  metaChipText: {
    color: TEXT_STRONG,
    fontFamily: constant.typeSemiBold,
    fontSize: constant.font12,
  },
  statusText: {
    color: '#B45309',
    fontFamily: constant.typeSemiBold,
    fontSize: constant.font12,
  },
  attachmentCard: {
    backgroundColor: '#FAFAFF',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#ECE9FF',
    padding: 16,
  },
  attachmentPreview: {
    width: '100%',
    height: 180,
    borderRadius: 14,
    marginBottom: 14,
  },
  attachmentIconWrap: {
    alignItems: 'center',
    backgroundColor: '#FFF7E8',
    borderRadius: 16,
    justifyContent: 'center',
    marginBottom: 14,
    minHeight: 124,
    paddingHorizontal: 18,
    paddingVertical: 24,
  },
  attachmentTypeLabel: {
    color: ACCENT,
    fontFamily: constant.typeSemiBold,
    fontSize: constant.font13,
    marginTop: 10,
  },
  attachmentName: {
    color: TEXT_STRONG,
    fontFamily: constant.typeBold,
    fontSize: constant.font15,
    lineHeight: 22,
  },
  attachmentHint: {
    color: TEXT_BODY,
    fontFamily: constant.typeRegular,
    fontSize: constant.font13,
    lineHeight: 20,
    marginTop: 8,
  },
  actionRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 18,
  },
  secondaryAction: {
    flex: 1,
  },
  secondaryActionInner: {
    alignItems: 'center',
    backgroundColor: '#F2EEFF',
    borderRadius: 14,
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'center',
    minHeight: 50,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  secondaryActionText: {
    color: PURPLE_DARK,
    fontFamily: constant.typeSemiBold,
    fontSize: constant.font13,
  },
  primaryAction: {
    flex: 1,
    borderRadius: 14,
    overflow: 'hidden',
  },
  primaryActionBg: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'center',
    minHeight: 50,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  primaryActionText: {
    color: WHITE,
    fontFamily: constant.typeSemiBold,
    fontSize: constant.font13,
  },
  viewerHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingBottom: 14,
    paddingHorizontal: 12,
  },
  viewerIconBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(255,255,255,0.16)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewerTitle: {
    flex: 1,
    color: WHITE,
    fontFamily: constant.typeSemiBold,
    fontSize: constant.font15,
    marginHorizontal: 12,
  },
  viewerBody: {
    flex: 1,
    backgroundColor: PAGE_BG,
  },
  pdf: {
    flex: 1,
    width: '100%',
  },
  pdfLoader: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    backgroundColor: PAGE_BG,
    justifyContent: 'center',
    zIndex: 2,
  },
  pdfLoaderText: {
    color: TEXT_BODY,
    fontFamily: constant.typeMedium,
    fontSize: constant.font13,
    marginTop: 10,
  },
  viewerImage: {
    flex: 1,
    width: '100%',
  },
  unsupportedWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 28,
  },
  unsupportedTitle: {
    color: TEXT_STRONG,
    fontFamily: constant.typeSemiBold,
    fontSize: constant.font18,
    marginTop: 16,
    textAlign: 'center',
  },
  unsupportedText: {
    color: TEXT_BODY,
    fontFamily: constant.typeRegular,
    fontSize: constant.font14,
    lineHeight: 22,
    marginTop: 8,
    textAlign: 'center',
  },
});

export default EventDetail;
