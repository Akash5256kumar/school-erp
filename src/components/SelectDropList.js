import React, { useRef, useEffect } from "react";
import { Image, StyleSheet } from "react-native";
import SelectDropdown from 'react-native-select-dropdown';
import { Icons, resW } from "../Utils/Constant";

const SelectDropList = (props) => {
    const dropdownRef = useRef({});
    const {
        title='Select Issue',
        list=[],
        on_Select=()=>null,
        buttonExt={},
        textExt={},
        disable=false,
        iconColor = '#000',
        defaultValue
    } = props;

    useEffect(() => {
        if(props.refType){
            dropdownRef.current.reset();
        }
    }, [props.refType]);

    const displayTextStyle = [
        styles.title,
        textExt,
        disable && { color: '#A0A0A0' }
    ];

    return (
        <SelectDropdown
            data={list}
            ref={dropdownRef}
            // ✅ set the default selected value
            defaultButtonText={title} 
           
            disabled={disable}
            disableAutoScroll={true}
            onSelect={(selectedItem, index) => { if(!disable) on_Select(selectedItem, index) }}
            buttonStyle={[styles.selectButton, buttonExt]}
            buttonTextStyle={displayTextStyle}
            renderDropdownIcon={isOpened => (
                <Image
                    source={isOpened ? Icons.upArrow : Icons.downArrow}
                    tintColor={disable ? '#A0A0A0' : iconColor}
                    resizeMode="contain"
                    style={styles.iconStyle}
                />
            )}
            dropdownIconPosition="right"  // ✅ force icon on right
            buttonTextAfterSelection={(selectedItem) => selectedItem}
            rowTextForSelection={(item) => item}
            dropdownStyle={[styles.dropdownStyle, props.dropdownExt]}
            rowStyle={[styles.rowStyle, props.rowExt]}
            rowTextStyle={[styles.dropdownRowText, props.rowTextExt]}
        />
    );
};

export default SelectDropList;

const styles = StyleSheet.create({
    selectButton: {
        backgroundColor: '#F7FAFC',
        height: resW(10),
        width: resW(50),
        flexDirection: 'row',           // text + icon horizontal
        alignItems: 'center',
        justifyContent: 'space-between', // push icon right
        paddingHorizontal: 10,           // make sure text doesn't overlap
    },
    title: {
        color: '#000',
        fontSize: resW(3),
        textAlign: 'left',
    },
    dropdownStyle: {
        borderRadius: 16,
        backgroundColor: '#FFFFFF',
        elevation: 6,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 10,
        marginTop: 4, // create a small gap
    },
    rowStyle: {
        borderBottomColor: '#F1F5F9',
        height: 50,
    },
    dropdownRowText: {
        fontSize: resW(3.5),
        color: '#1E1B4B',
        textAlign: 'left',
        paddingHorizontal: 16,
    },
    iconStyle: {
        width: resW(3.5),
        height: resW(3.5),
        marginRight: 0, // ensures it's flush to the right
    }
});
