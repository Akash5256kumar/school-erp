/**
 * StudentDocumentList
 * ─────────────────────────────────────────────────────────────────────────────
 * Reusable list screen used by:
 *   • Assignment  (Homework subject detail)
 *   • NotesList   (Notes subject detail)
 *   • FortnightlyPlannerList (Planner subject detail)
 *
 * Props
 * ─────
 *  title          string  – Screen / subject title
 *  items          array   – Data rows
 *  renderCard     func    – (item, index) => { title, subtitle, meta, date, accentColor, emoji }
 *  getFileInfo    func    – (item) => { fileExt, name, viewUrl, downloadUrl }
 *  onBack         func    – back navigation handler
 *  searchFields   array   – field names to search through (default ['subject','topic'])
 *  emptyMessage   string  – shown when no items
 *  accentColor    string  – header gradient color override
 *  headerEmoji    string  – emoji shown in header
 */

import React, { useState, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  Pressable,
  Modal,
  Image,
  StyleSheet,
  Dimensions,
  Platform,
  ActivityIndicator,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Search, X, Eye, Download, CalendarDays, FileText, ChevronRight, Inbox } from 'lucide-react-native';
import Pdf from 'react-native-pdf';
import BlobUtil from 'react-native-blob-util';
import * as constant from '../../../Utils/Constant';

const { width } = Dimensions.get('window');

// ─── Design tokens ────────────────────────────────────────────────────────────
const PURPLE = '#5E3BF9';
const PURPLE_DARK = '#4527D6';
const WHITE = '#FFFFFF';
const SURFACE = '#F5F4FF';
const TEXT_STRONG = '#1E1B4B';
const TEXT_BODY = '#595975';
const TEXT_MUTED = '#9CA3AF';
const DIVIDER = '#F1F5F9';
const SHADOW_COLOR = 'rgba(94,59,249,0.12)';

// ─── File Viewer Modal ────────────────────────────────────────────────────────
const FileViewerModal = ({ visible, fileExt, fileUrl, downloadUrl, title, onClose }) => {
  const insets = useSafeAreaInsets();
  const [pdfLoading, setPdfLoading] = useState(true);

  const handleDownload = useCallback(async () => {
    if (!downloadUrl) return;
    try {
      const { fs } = BlobUtil;
      const fileName = downloadUrl.split('/').pop();
      const downloadPath =
        Platform.OS === 'ios'
          ? `${fs.dirs.DocumentDir}/${fileName}`
          : `/storage/emulated/0/Download/${fileName}`;

      await BlobUtil.config({
        fileCache: true,
        path: downloadPath,
        addAndroidDownloads:
          Platform.OS === 'android'
            ? {
                useDownloadManager: true,
                notification: true,
                path: downloadPath,
                description: 'Downloading file',
                mime: 'application/pdf',
                mediaScannable: true,
              }
            : undefined,
      }).fetch('GET', downloadUrl);

      constant.showAlert('Downloaded successfully');
    } catch (err) {
      console.log('Download error:', err);
      constant.showAlert('Download failed');
    }
  }, [downloadUrl]);

  const isPdf = fileExt === 'pdf';
  const isImage = ['jpeg', 'jpg', 'png', 'webp'].includes(fileExt);

  return (
    <Modal
      transparent={false}
      animationType="slide"
      visible={visible}
      onRequestClose={onClose}>
      <LinearGradient
        colors={['#C100FF', '#5B39F6']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[modal.header, { paddingTop: insets.top + 12 }]}>
        <TouchableOpacity onPress={onClose} style={modal.iconBtn}>
          <X color={WHITE} size={20} strokeWidth={2.2} />
        </TouchableOpacity>
        <Text style={modal.headerTitle} numberOfLines={1}>
          {title || 'Document'}
        </Text>
        <TouchableOpacity onPress={handleDownload} style={modal.iconBtn}>
          <Download color={WHITE} size={20} strokeWidth={2.2} />
        </TouchableOpacity>
      </LinearGradient>

      <View style={modal.body}>
        {isPdf ? (
          <>
            {pdfLoading && (
              <View style={modal.pdfLoader}>
                <ActivityIndicator size="large" color={PURPLE} />
                <Text style={modal.pdfLoaderText}>Loading PDF…</Text>
              </View>
            )}
            <Pdf
              source={{ uri: fileUrl, cache: true }}
              trustAllCerts={false}
              onLoadComplete={() => setPdfLoading(false)}
              onError={err => {
                console.log('PDF error:', err);
                setPdfLoading(false);
              }}
              style={[modal.pdf, pdfLoading && { opacity: 0 }]}
            />
          </>
        ) : isImage ? (
          <Image
            source={{ uri: fileUrl }}
            style={modal.image}
            resizeMode="contain"
          />
        ) : (
          <View style={modal.unsupported}>
            <FileText color={TEXT_MUTED} size={56} strokeWidth={1.4} />
            <Text style={modal.unsupportedTitle}>Preview not available</Text>
            <Text style={modal.unsupportedText}>
              Tap the download icon above to save this file.
            </Text>
          </View>
        )}
      </View>
    </Modal>
  );
};

// ─── Document Card ────────────────────────────────────────────────────────────
const DocumentCard = ({ cardInfo, onPress, onDownload, onView }) => {
  const accent = '#5B39F6'; // Match Home theme instead of dynamic

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [card.wrapper, pressed && { opacity: 0.92 }]}
      android_ripple={{ color: `${accent}18` }}>
      {/* Left accent stripe */}
      <LinearGradient
        colors={['#C100FF', '#5B39F6']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={card.stripe}
      />

      <View style={card.body}>
        {/* Top row: Title + Emoji Badge */}
        <View style={card.topRow}>
          <View style={card.textBlock}>
            <Text style={card.titleTxt} numberOfLines={2}>
              {cardInfo.title || '—'}
            </Text>
            {cardInfo.subtitle ? (
              <Text style={card.subtitleTxt} numberOfLines={1}>
                {cardInfo.subtitle}
              </Text>
            ) : null}
          </View>
          
          <View style={[card.emojiBadge, { backgroundColor: `${accent}16` }]}>
            <Text style={card.emojiTxt}>{cardInfo.emoji || '📄'}</Text>
          </View>
        </View>

        {/* Conditionally render Divider and Meta/Action row */}
        {(cardInfo.meta || cardInfo.date || onDownload || onView) ? (
          <>
            <View style={card.divider} />
            <View style={card.bottomRow}>
              <View style={card.metaBlock}>
                {cardInfo.date ? (
                  <View style={card.dateRow}>
                    <CalendarDays color={TEXT_MUTED} size={13} strokeWidth={2} style={{ marginRight: 6 }} />
                    <Text style={card.dateTxt}>{cardInfo.date}</Text>
                  </View>
                ) : null}
                {cardInfo.meta ? (
                  <Text style={card.metaTxt} numberOfLines={1}>
                    {cardInfo.meta}
                  </Text>
                ) : null}
              </View>

              <View style={card.actionRow}>
                {onView ? (
                  <TouchableOpacity
                    onPress={onView}
                    style={[card.actionBtn, { backgroundColor: `${accent}12` }]}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                    <Eye color={accent} size={14} strokeWidth={2.4} />
                    <Text style={[card.actionTxt, { color: accent }]}>View</Text>
                  </TouchableOpacity>
                ) : null}

                {onDownload ? (
                  <TouchableOpacity
                    onPress={onDownload}
                    style={[card.saveBtn, { backgroundColor: `${accent}12` }]}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                    <Download color={accent} size={13} strokeWidth={2.4} />
                    <Text style={[card.saveTxt, { color: accent }]}>Save</Text>
                  </TouchableOpacity>
                ) : (
                  !onView && <ChevronRight color={accent} size={18} strokeWidth={2.4} />
                )}
              </View>
            </View>
          </>
        ) : null}
      </View>
    </Pressable>
  );
};

// ─── Empty State ──────────────────────────────────────────────────────────────
const EmptyState = ({ message }) => (
  <View style={s.emptyWrap}>
    <View style={s.emptyIconWrap}>
      <Inbox color={PURPLE} size={44} strokeWidth={1.5} />
    </View>
    <Text style={s.emptyTitle}>Nothing here yet</Text>
    <Text style={s.emptyMsg}>{message}</Text>
  </View>
);

// ─── Main Component ───────────────────────────────────────────────────────────
const StudentDocumentList = ({
  title,
  items = [],
  renderCard,
  getFileInfo,
  onBack,
  onCardPress,
  searchFields = ['subject', 'topic', 'title'],
  emptyMessage = 'No documents available for this subject.',
  accentColor = PURPLE,
  headerEmoji = '📄',
  badgeLabel = 'Files',
  searchPlaceholder = 'Search topics, books, teachers…',
}) => {
  const insets = useSafeAreaInsets();
  const [searchText, setSearchText] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalFile, setModalFile] = useState(null);

  const headerGradient = [accentColor, '#5B39F6'];

  const filteredItems = useMemo(() => {
    if (!searchText.trim()) return items || [];
    const q = searchText.toLowerCase();
    return (items || []).filter(item =>
      searchFields.some(field =>
        String(item?.[field] || '')
          .toLowerCase()
          .includes(q),
      ),
    );
  }, [items, searchText, searchFields]);

  const handleOpen = useCallback(
    item => {
      if (onCardPress) {
        onCardPress(item);
        return;
      }
      if (getFileInfo) {
        const info = getFileInfo(item);
        setModalFile(info);
        setModalVisible(true);
      }
    },
    [getFileInfo, onCardPress],
  );

  const handleView = useCallback(
    item => {
      if (!getFileInfo) return;
      const info = getFileInfo(item);
      if (!info?.viewUrl) return;
      setModalFile(info);
      setModalVisible(true);
    },
    [getFileInfo],
  );

  const handleDownload = useCallback(
    item => {
      const info = getFileInfo(item);
      if (!info?.downloadUrl) return;
      BlobUtil.config({
        fileCache: true,
        addAndroidDownloads:
          Platform.OS === 'android'
            ? {
                useDownloadManager: true,
                notification: true,
                description: 'Downloading',
                mediaScannable: true,
              }
            : undefined,
      })
        .fetch('GET', info.downloadUrl)
        .then(() => constant.showAlert('Downloaded successfully'))
        .catch(() => constant.showAlert('Download failed'));
    },
    [getFileInfo],
  );

  const renderItem = useCallback(
    ({ item, index }) => {
      const cardInfo = renderCard(item, index);
      return (
        <DocumentCard
          cardInfo={cardInfo}
          index={index}
          onPress={() => handleOpen(item)}
          onDownload={getFileInfo ? () => handleDownload(item) : undefined}
          onView={getFileInfo ? () => handleView(item) : undefined}
        />
      );
    },
    [renderCard, handleOpen, handleDownload, getFileInfo],
  );

  return (
    <View style={s.root}>
      {/* Header */}
      <LinearGradient
        colors={headerGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[s.header, { paddingTop: insets.top + 12 }]}>
        <TouchableOpacity onPress={onBack} style={s.backBtn}>
          <Image
            source={constant.Icons.backArrowIcon}
            style={s.backIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <View style={s.headerCenter}>
          <Text style={s.headerEmoji}>{headerEmoji}</Text>
          <Text style={s.headerTitle} numberOfLines={1}>
            {title || 'Documents'}
          </Text>
        </View>
        <View style={s.headerBadge}>
          <Text style={s.headerBadgeNum}>{(items || []).length}</Text>
          <Text style={s.headerBadgeLabel}>{badgeLabel}</Text>
        </View>
      </LinearGradient>

      {/* Search */}
      <View style={s.searchWrap}>
        <Search color={TEXT_MUTED} size={16} strokeWidth={2} />
        <TextInput
          style={s.searchInput}
          placeholder={searchPlaceholder}
          placeholderTextColor={TEXT_MUTED}
          value={searchText}
          onChangeText={setSearchText}
        />
        {searchText.length > 0 ? (
          <TouchableOpacity
            onPress={() => setSearchText('')}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
            <X color={TEXT_MUTED} size={15} strokeWidth={2} />
          </TouchableOpacity>
        ) : null}
      </View>

      {/* List */}
      <FlatList
        data={filteredItems}
        keyExtractor={(_, i) => i.toString()}
        renderItem={renderItem}
        contentContainerStyle={[
          s.listContent,
          { paddingBottom: insets.bottom + 24 },
        ]}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        ListEmptyComponent={
          <EmptyState
            message={searchText ? 'No results match your search.' : emptyMessage}
          />
        }
      />

      {/* File viewer */}
      {modalFile ? (
        <FileViewerModal
          visible={modalVisible}
          fileExt={modalFile.fileExt}
          fileUrl={modalFile.viewUrl}
          downloadUrl={modalFile.downloadUrl}
          title={modalFile.name}
          onClose={() => setModalVisible(false)}
        />
      ) : null}
    </View>
  );
};

// ─── Card styles ──────────────────────────────────────────────────────────────
const card = StyleSheet.create({
  wrapper: {
    backgroundColor: WHITE,
    borderRadius: 16,
    flexDirection: 'row',
    marginHorizontal: 16,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: SHADOW_COLOR,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 12,
  },
  stripe: { width: 5, alignSelf: 'stretch' },
  body: { flex: 1, padding: 14 },
  topRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  textBlock: { flex: 1 },
  titleTxt: {
    fontFamily: constant.typeSemiBold,
    fontSize: constant.font16,
    color: TEXT_STRONG,
    lineHeight: 22,
  },
  subtitleTxt: {
    fontFamily: constant.typeRegular,
    fontSize: constant.font13,
    color: TEXT_BODY,
    marginTop: 4,
  },
  emojiBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  emojiTxt: { fontSize: 20 },
  divider: {
    height: 1,
    backgroundColor: DIVIDER,
    marginTop: 12,
    marginBottom: 10,
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  metaBlock: { flex: 1, gap: 4 },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  actionTxt: {
    fontFamily: constant.typeSemiBold,
    fontSize: constant.font12,
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateTxt: {
    fontFamily: constant.typeMedium,
    fontSize: constant.font12,
    color: TEXT_MUTED,
  },
  metaTxt: {
    fontFamily: constant.typeRegular,
    fontSize: constant.font12,
    color: TEXT_BODY,
  },
  saveBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  saveTxt: {
    fontFamily: constant.typeSemiBold,
    fontSize: constant.font12,
  },
});

// ─── Screen styles ────────────────────────────────────────────────────────────
const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: SURFACE },

  // Header
  header: {
    paddingBottom: 20,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  backBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(255,255,255,0.22)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    height: 18,
    width: 18,
    tintColor: WHITE,
  },
  headerCenter: { flex: 1, alignItems: 'center' },
  headerEmoji: { fontSize: 24, marginBottom: 2 },
  headerTitle: {
    fontFamily: constant.typeBold,
    fontSize: constant.font18,
    color: WHITE,
  },
  headerBadge: {
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.22)',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
    minWidth: 48,
  },
  headerBadgeNum: {
    fontFamily: constant.typeBold,
    fontSize: constant.font18,
    color: WHITE,
  },
  headerBadgeLabel: {
    fontFamily: constant.typeRegular,
    fontSize: 10,
    color: 'rgba(255,255,255,0.82)',
  },

  // Search
  searchWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: WHITE,
    borderRadius: 14,
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
    paddingHorizontal: 14,
    paddingVertical: Platform.OS === 'ios' ? 12 : 10,
    elevation: 3,
    shadowColor: SHADOW_COLOR,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 8,
    gap: 10,
  },
  searchInput: {
    flex: 1,
    fontFamily: constant.typeRegular,
    fontSize: constant.font14,
    color: TEXT_STRONG,
    padding: 0,
  },

  // List
  listContent: { paddingTop: 8 },

  // Empty
  emptyWrap: {
    alignItems: 'center',
    paddingTop: 80,
    paddingHorizontal: 36,
  },
  emptyIconWrap: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: `${PURPLE}12`,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  emptyTitle: {
    fontFamily: constant.typeSemiBold,
    fontSize: constant.font18,
    color: TEXT_STRONG,
    textAlign: 'center',
  },
  emptyMsg: {
    fontFamily: constant.typeRegular,
    fontSize: constant.font14,
    color: TEXT_MUTED,
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 22,
  },
});

// ─── Modal styles ─────────────────────────────────────────────────────────────
const modal = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 14,
    paddingHorizontal: 16,
    gap: 12,
  },
  iconBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    flex: 1,
    fontFamily: constant.typeSemiBold,
    fontSize: constant.font16,
    color: WHITE,
    textAlign: 'center',
  },
  body: { flex: 1, backgroundColor: '#F8FAFC' },
  pdf: { flex: 1, width },
  pdfLoader: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F8FAFC',
    zIndex: 10,
  },
  pdfLoaderText: {
    fontFamily: constant.typeMedium,
    fontSize: constant.font14,
    color: TEXT_BODY,
    marginTop: 10,
  },
  image: { flex: 1, width: '100%' },
  unsupported: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 36,
  },
  unsupportedTitle: {
    fontFamily: constant.typeSemiBold,
    fontSize: constant.font16,
    color: TEXT_STRONG,
    marginTop: 16,
    textAlign: 'center',
  },
  unsupportedText: {
    fontFamily: constant.typeRegular,
    fontSize: constant.font14,
    color: TEXT_BODY,
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 22,
  },
});

export default StudentDocumentList;
