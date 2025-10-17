import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { blackColor, font10, font15, font16, font17, font18, font20, resH, resW, whiteColor } from '../../Utils/Constant';

const complaintTypes = [
  { label: "Service", value: "service" },
  { label: "Product", value: "product" },
  { label: "Delivery", value: "delivery" },
  { label: "Other", value: "other" }
];

export const CustomDropdown = ({
  data,
  selected,
  onSelect,
  placeholder = "",
  dropWidth,
  inputWidth,
  isOpen: controlledIsOpen,
  toggleOpen: controlledToggleOpen,
}) => {
  // Use internal state only if parent does not control the dropdown
  const [internalOpen, setInternalOpen] = useState(false);

  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalOpen;
  const toggleOpen = controlledToggleOpen !== undefined
    ? controlledToggleOpen
    : () => setInternalOpen(prev => !prev);

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity
        style={[styles.inputStyle, inputWidth, isOpen && { borderColor: blackColor }]}
        activeOpacity={0.7}
        onPress={toggleOpen}
      >
        <Text style={[styles.selectedText, !selected && styles.placeholderText]} numberOfLines={1} ellipsizeMode="tail">
          {selected ? selected.label : placeholder}
        </Text>
        <Text style={styles.arrow}>▼</Text>
      </TouchableOpacity>

      {isOpen && (
        <ScrollView style={[styles.dropdown, dropWidth]} keyboardShouldPersistTaps="handled">
          {data.map(item => (
            <TouchableOpacity
              key={item.value}
              style={styles.option}
              onPress={() => {
                onSelect(item);
                toggleOpen(); // close after selection
              }}
            >
              <Text style={styles.optionText}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  );
};


// export default function App() {
//   const [selected, setSelected] = useState(null);

//   return (
//     <CustomDropdown
//       data={complaintTypes}
//       selected={selected}
//       onSelect={setSelected}
//       placeholder="Select Complaint Type"
//     />
//   );
// }

const styles = StyleSheet.create({
  wrapper: {
    // marginHorizontal: 16,
    marginTop: resH(1),
  },
  label: {
    marginBottom: resH(0.5),
    fontSize: 14,
    color: "#222",
    fontWeight: "bold",
  },
  inputStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: resH(5.5),
    backgroundColor: whiteColor,
    borderColor: blackColor,
    borderWidth: 0.2,
    borderRadius: resW(1),
    paddingHorizontal: resW(4),
  },
  selectedText: {
    color: "black",
    fontSize: font15,
    flex: 1,
    textAlign: "left",
  },
  placeholderText: {
    color: blackColor,
    fontSize:font15
  },
  arrow: {
    color: blackColor,
    marginLeft: resW(1),
    fontSize: font17,
  },
  dropdown: {
    position: "absolute",
    top: resH(6),
    left: 0,
    right: 0,
    backgroundColor: whiteColor,
    borderRadius: 8,
    borderColor: blackColor,
    borderWidth: 0.2,
    maxHeight: resH(20),
    zIndex: 100,
    // elevation: 2,
  },
  option: {
    paddingVertical: resW(2),
    paddingHorizontal: resW(4),
  },
  optionText: {
    color: "black",
    fontSize: font15,
  }
});
