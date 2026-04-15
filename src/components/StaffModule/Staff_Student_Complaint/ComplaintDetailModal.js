import React, {memo} from 'react';
import {Modal, Pressable, ScrollView, StyleSheet, View} from 'react-native';

import ComplaintCard from './ComplaintCard';

const ComplaintDetailModal = ({complaint, onClose, theme, visible}) => {
  if (!complaint) {
    return null;
  }

  return (
    <Modal
      animationType="fade"
      onRequestClose={onClose}
      transparent
      visible={visible}>
      <Pressable
        onPress={onClose}
        style={[
          styles.overlay,
          {
            backgroundColor: theme.colors.modalOverlay,
            paddingHorizontal: theme.spacing.screenHorizontal * 0.6,
          },
        ]}>
        {/* View with onStartShouldSetResponder stops taps from reaching the
            overlay Pressable while still letting the ScrollView own scroll
            events — unlike a nested Pressable which intercepts them on Android */}
        <View
          onStartShouldSetResponder={() => true}
          style={[
            styles.modalFrame,
            {
              maxHeight: theme.sizing.modalMaxHeight,
              maxWidth: theme.sizing.modalMaxWidth,
            },
          ]}>
          <ScrollView
            bounces={false}
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
            nestedScrollEnabled
            showsVerticalScrollIndicator={false}>
            <ComplaintCard
              expanded
              item={complaint}
              onClose={onClose}
              showCloseButton
              style={styles.modalCard}
              theme={theme}
            />
          </ScrollView>
        </View>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalCard: {
    marginBottom: 0,
  },
  modalFrame: {
    overflow: 'hidden',
    width: '100%',
  },
  overlay: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  scrollContent: {
    paddingVertical: 2,
  },
});

export default memo(ComplaintDetailModal);
