import React,{useRef,useEffect, useState} from "react"
import { View, StyleSheet,Image} from "react-native"
import SelectDropdown from 'react-native-select-dropdown'
import { Icons, resW } from "../Utils/Constant";

const SelectDropList = (props) => {

    const dropdownRef = useRef({}); 
    const{title='Select Issue',list,on_Select=()=>null,buttonExt={},textExt={},disable=false,refType, dropdownIndexValue, searchValue,type}= props

    useEffect(()=>{
     if(refType){
        dropdownRef.current.reset()
     }
    },[refType])

console.log("listite",JSON.stringify(list))

    return (
        <SelectDropdown
        data={list}
        ref={dropdownRef}
        defaultButtonText={title}
        disabled={disable}
        disableAutoScroll={true}
        defaultValueByIndex={dropdownIndexValue}
        onSelect={(selectedItem, index) => {on_Select(selectedItem,index)}}
        buttonStyle={[styles.selectButton,buttonExt]}
        buttonTextStyle={[styles.title,textExt]}
        renderDropdownIcon={isOpened => {
            return (
                <View style={{alignItems:'center',justifyContent:'center'}}>
                 {/* <Image  source={isOpened ? Icons.upArrow: Icons?.downArrow} type='1' tintColor={'#fff'} style={styles.upIcon} /> */}
             </View>
            );
          }}
          dropdownIconPosition="right"
        //   rowTextStyle={{
        //     fontSize:Fontsize.font9,
        //     fontFamily:fonts.typeMedium
        //   }}
          buttonTextAfterSelection={(selectedItem, index) => {
            if(type===1){
                return selectedItem
            }else{
           return selectedItem.description
            }     
        }}
        rowTextForSelection={(item, index) => {
            if(type===1){
                return item
            }else{
            return item.description
            }
        }}
        search={searchValue}
        searchInputTxtColor={'#151E26'}
        searchPlaceHolder={'Search here'}
        searchPlaceHolderColor={'#72808D'}
    />
    )
}

// SelectDropList.defaultProps = {
//     on_Select: function () { },
//     title: 'Please Select',
//     buttonExt:{},
//     textExt:{},
//     imageIcon:false,
//     imageSize:resW(1),
//     disable:false,
//     refType:false,
//     search:false
// }

export default SelectDropList;

const styles = StyleSheet.create({
    MainView: {
      
    },
    selectButton:{
    backgroundColor:'#F7FAFC',
    height:resW(10),
    width:resW(50),

    },
    title:{
    color:'#000',
    // fontFamily:fonts.typeBold,
    // fontSize:Fontsize.font5,
    textAlign:'left',
    // fontWeight:'500'
    },

    downIcon:{
        height:resW(5),
        width:resW(5),
    },
    upIcon:{
      height:resW(3),
      width:resW(3),
    },
    dropdown1SearchInputStyle: {
        backgroundColor: '#444444',
        borderBottomWidth: 1,
        borderBottomColor: '#FFFFFF',
    },
   
})