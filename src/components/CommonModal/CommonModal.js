import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  Pressable,
  StyleSheet,
} from 'react-native';
import { blackColor, whiteColor, resH, resW, font15 } from '../../Utils/Constant';

const CommonModal = ({
  visible,
  onClose,
  title,
  options = [], // Array of { label, onPress }
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable style={styles.modalOverlay} onPress={onClose}>
        <View style={styles.modalContainer}>
          {title && <Text style={styles.modalTitle}>{title}</Text>}

          {options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={styles.modalButton}
              onPress={option.onPress}
            >
              <Text style={styles.modalButtonText}>{option.label}</Text>
            </TouchableOpacity>
          ))}

          <TouchableOpacity
            style={[styles.modalButton, styles.cancelButton]}
            onPress={onClose}
          >
            <Text style={styles.cancelButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Pressable>
    </Modal>
  );
};

export default CommonModal;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: whiteColor,
    borderRadius: resH(2),
    paddingVertical: resH(3),
    paddingHorizontal: resW(5),
    width: '80%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
  modalTitle: {
    fontSize: font15,
    fontWeight: '600',
    color: blackColor,
    marginBottom: resH(2.5),
    textAlign: 'center',
  },
  modalButton: {
    backgroundColor: '#E9F2FF',
    borderRadius: resH(1),
    paddingVertical: resH(1.4),
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: resH(0.6),
    width: '100%',
  },
  modalButtonText: {
    color: blackColor,
    fontSize: font15,
    fontWeight: '500',
  },
  cancelButton: {
    backgroundColor: 'red',
    marginTop: resH(1.2),
  },
  cancelButtonText: {
    color: whiteColor,
    fontSize: font15,
    fontWeight: '500',
  },
});
