import React, { useEffect, useState } from "react"
import { View, Modal, StyleSheet, Text, TouchableOpacity, ImageBackground, Pressable, ActivityIndicator } from "react-native"
import { Calendar, LocaleConfig } from 'react-native-calendars';
import moment from "moment"
import FastImage from "react-native-fast-image";
import * as constant from '../../Utils/Constant'

import { resW } from "../../Utils/Constant";

LocaleConfig.locales['custom'] = {
    monthNames: [
      'January', 'February', 'March', 'April', 'May', 'June', 
      'July', 'August', 'September', 'October', 'November', 'December'
    ],
    monthNamesShort: [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ],
    dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'], // Only first letter
    today: 'Today'
  };
LocaleConfig.defaultLocale = 'custom';

const AppCalender = (props) => {
    const { markData,fn_ClickLeftArrow,fn_ClickRightArrow,current,monthString,onDateClick,loader } = props
    const [selectDate, setSelectDate] = useState('')
    const [monthChange, setMonthChange] = useState(moment(new Date).format("MMMM - YYYY"))

    const [currentMonth, setCurrentMonth] = useState(moment().format("YYYY-MM-DD"));

    useEffect(()=>{
     setCurrentMonth(moment(monthString).format("YYYY-MM-DD"))
    },[monthString])

    useEffect(()=>{
   setSelectDate(current)
    },[current])

 
    const changeMonth = (direction) => {
        const newMonth = moment(currentMonth).add(direction, "months").format("YYYY-MM-DD");
        setCurrentMonth(newMonth);
        if(direction === -1){
          fn_ClickLeftArrow(newMonth)
        }else{
          fn_ClickRightArrow(newMonth)
        }
      };

  const renderCustomHeader = (date) => {
    // console.log("changeMonth",JSON.stringify(date))
    return (
        <View style={styles.headerContainer}>
        {/* Left-aligned Month & Year */}
        <View style={{flex:1}}>
        <Text style={styles.monthText}>{moment(currentMonth).format("MMMM YYYY")}</Text>
        </View>
        {/* Right-aligned Custom Arrows */}
        <View style={styles.arrowsContainer}>
          <Pressable onPress={() => changeMonth(-1)} style={styles.arrowButton}>
            <FastImage source={require("../../assests/images/arrow_back.png")} style={styles.arrowIcon} resizeMode="contain" />
          </Pressable>
          {/* <Text style={styles.monthText}>{moment(currentMonth).format("MMMM YYYY")}</Text> */}
          <Pressable onPress={() => changeMonth(1)} style={styles.arrowButton}>
            <FastImage source={require("../../assests/images/arrow_next.png")} style={styles.arrowIcon} resizeMode="contain" />
          </Pressable>
        </View>
      </View>
    );
  };
   

    const dayRender = (date, state, marking) => {
        return (
            moment(date.dateString).isSame(selectDate) ?
                    <TouchableOpacity
                        onPress={() => { fn_Cal_dateSelect(date, state, marking)  }}
                        style={[styles.calenderDateImage,{backgroundColor:'#007BFF',borderRadius:resW(2.4)}]}>
                        <Text style={[styles.cal_DayText, { color: '#fff' }]} >
                            {date.day}
                        </Text>
                        <View />
                    </TouchableOpacity>
                    
                :
                <View style={styles.calenderDateImage} >
                 
                   <TouchableOpacity
                   onPress={() => { fn_Cal_dateSelect(date, state, marking) }}
                   style={styles.cal_DayButton}>
                     <Text style={[styles.cal_DayText, { color:  moment(date.dateString).isBefore(moment(new Date()).format("YYYY-MM-DD")) ? moment(date.dateString).day() === 0 ? '#000000' : '#000000' : moment(date.dateString).day() === 0 ? 'black' : 'black' }]} >
                 {date.day}
               </Text>
                   {/* <Text style={[styles.cal_DayText, { color:  moment(date.dateString).isBefore(moment(new Date()).format("YYYY-MM-DD")) ? moment(date.dateString).day() === 0 ? '#00000040' : '#00000040' : moment(date.dateString).day() === 0 ? 'black' : 'black' }]} >
                     {date.day}
                   </Text> */}
                   <View />
                 </TouchableOpacity>
               
                  
               { marking?.marked && <View style={[styles.dotStyle,{backgroundColor:marking?.dotColor}]} />}
             </View>
        )
    };

    const fn_Cal_dateSelect = (date, state, marking) => {
        setSelectDate(date.dateString)
        onDateClick(date)

    }

    return (
                    <View style={styles.innerView}>
                        <Calendar
                         key={currentMonth} // ✅ Forces re-render on month change
                         current={currentMonth}
                            // minDate={moment(new Date()).format("YYYY-MM-D")}
                            // maxDate={moment(new Date()).add(61, 'd').format("YYYY-MM-DD")}
                            onDayPress={day => {
                                console.log('selected day', day);
                            }}
                            onDayLongPress={day => {
                                console.log('selected day', day);
                            }}
                            monthFormat={'MMMM  yyyy'}
                            onMonthChange={month => {
                                setMonthChange(moment(month.dateString).format("MMMM - YYYY"))
                                console.log('month changed', month);
                            }}
                            hideArrows={true}
                            hideExtraDays={false}
                            disableMonthChange={false}
                            firstDay={0}
                            onPressArrowLeft={subtractMonth => subtractMonth()}
                            onPressArrowRight={addMonth => addMonth()}

                            headerStyle={{
                                // borderRadius: 10,
                            }}
                            style={{
                                backgroundColor: '#FFFFFF',
                                borderWidth: 0,
                                borderRadius: 16,
                                marginHorizontal: resW(1.8),
                                marginVertical: resW(1.8),
                                paddingBottom: resW(2),
                                paddingTop: resW(1),
                            }}
                            theme={{
                                monthTextColor: constant.blackColor,
                                textMonthFontFamily: constant.typeSemiBold,
                                textDayHeaderFontFamily: constant.typeMedium,
                                textMonthFontSize: constant.font16,
                                textDayHeaderFontSize:constant.font12,
                                'stylesheet.calendar.header': {
                                    week: {
                                      flexDirection: 'row',
                                      justifyContent: 'space-around',
                                      borderBottomColor: '#F3F3F3', // customize color
                                      paddingBottom: resW(3),
                                      marginTop: resW(2),
                                    },
                                    dayHeader: {
                                      fontSize: constant.font12,
                                      color: '#94A3B8',
                                      fontFamily: constant.typeSemiBold,
                                      textAlign: 'center',
                                      width: resW(8),
                                    },
                                  },
                                  
                            }}
                        
                            dayComponent={({ date, state, marking }) => dayRender(date, state, marking)}
                            renderHeader={(date) => renderCustomHeader(date, (change) => setCurrentMonth(moment(date).add(change, "months").format("MMMM YYYY")))}
                            markedDates={markData}
                        />

                       {loader && <View style={styles.loaderOverlay}>
                          <ActivityIndicator color={constant.baseColor} size={'large'} />
                        </View>}
                 
                    </View>

    )
}

AppCalender.defaultProps = {
    onRequestClose: function () { },
    isVisible: false,
    type:1,
}

export default AppCalender

const styles = StyleSheet.create({
    modalMainView: {
        flex: 1,
        backgroundColor: "#00000090",
        justifyContent: "center",
        // alignItems: "center"
    },
    closeIcon: {
        fontSize: resW(20),
        color: constant.baseColor,
        fontFamily: constant.typeMedium,
        marginLeft: resW(5),
        alignSelf: 'flex-end',
        paddingRight: resW(5),
        paddingLeft: resW(10),
        paddingBottom: resW(2),
        paddingTop: resW(10)
    },
    modalSubView: {
        //  width:constant.resW(96)
        paddingHorizontal: resW(30)
    },
    innerView: {
        backgroundColor:'#F8FAFF',
    },
    cal_Arrow: {
        height: resW(4),
        width: resW(4)
    },
    cal_SubView: {
        flex: 1,
        // backgroundColor: colors.white,
        marginHorizontal: resW(6),
        borderRadius: 8,
        marginBottom: resW(6),
    },
    calenderheaderText: {
        fontSize: resW(16),
        color: constant.baseColor,
        fontFamily: constant.typeMedium,
    },
    calenderDateImage: {
        height: resW(8.6),
        width: resW(8.6),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius:resW(50),
        marginTop:-1,
    },
    calenderDateImage2: {
        height: resW(8),
        width: resW(8),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:constant.baseColor,
        borderRadius:resW(50),
        
    },
    cal_DayButton: {
        height: resW(8.6),
        width: resW(8.6),
        justifyContent: 'center',
        alignItems: 'center',

    },
    cal_DayText: {
        fontSize: constant.font13,
        color: '#0F172A',
        fontFamily: constant.typeSemiBold,
    },
    dotStyle:{
        height: resW(0.9),
        width: resW(2.8),
        borderRadius:resW(2),
        backgroundColor:constant.baseColor,
        position:'absolute',
        bottom: resW(0.7),
        alignSelf: 'center',
    },
    headerContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width:'100%',
        height:resW(11),
        paddingHorizontal: resW(1.5),
        
      },
      monthText: {
        fontSize: constant.font16,
        fontFamily: constant.typeSemiBold,
        color: constant.blackColor,
      },
      arrowsContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent:'flex-end',
        height:'100%',
        gap: resW(2),
        
      },
      arrowButton: {
        alignItems:'center',
        backgroundColor: '#F1F5F9',
        borderRadius: resW(5),
        height:resW(8),
        justifyContent:'center',
        width:resW(8)
      },
      arrowIcon: {
        width: resW(3.8),
        height: resW(3.8),
      },
      loaderOverlay: {
        position: 'absolute',
        top:0,
        left:0,
        right:0,
        bottom:0,
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#FFFFFFB8',
        borderRadius: 16,
      },

})
