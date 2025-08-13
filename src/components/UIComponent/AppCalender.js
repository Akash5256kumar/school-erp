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
    const tabWidth = resW(38);
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
                                borderWidth: 1,
                                borderColor: '#FFFFFF',
                                // elevation: 2,
                                borderRadius: 10,
                                marginHorizontal: resW(3),
                                marginVertical: resW(0),
                                paddingVertical: '0%',
                                // shadowColor: "#000",
                                // shadowOffset: { width: 0, height: 2 },
                                // shadowOpacity: 0.2,
                                // shadowRadius: 2,
                            }}
                            theme={{
                                monthTextColor: constant.blackColor,
                                textMonthFontFamily: constant.typeSemiBold,
                                textDayHeaderFontFamily: constant.typeMedium,
                                textMonthFontSize: constant.font12,
                                textDayHeaderFontSize:constant.font12,
                                'stylesheet.calendar.header': {
                                    week: {
                                      flexDirection: 'row',
                                      justifyContent: 'space-around',
                                      // borderBottomWidth: 1, // ← Add line here
                                      borderBottomColor: '#F3F3F3', // customize color
                                      paddingBottom: resW(3), // adjust spacing
                                      marginTop: resW(2),
                                    },
                                    dayHeader: {
                                      fontSize: constant.font12,
                                      color: constant.grayColor,
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

                       {loader && <View style={{
                          position: 'absolute',
                          top:0,
                          left:0,
                          right:0,
                          bottom:0,
                          flex:1,
                          alignItems:'center',
                          justifyContent:'center',
                          backgroundColor:'#00000020'
                        }}>
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
        //   backgroundColor:'#00000010',
        //   paddingVertical:constant.moderateScale(13),
        //   paddingHorizontal:constant.moderateScale(15),
        //   borderRadius:15,
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
        height: resW(8),
        width: resW(8),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius:resW(50),
        marginTop:-3,
        // backgroundColor:'green'
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
        height: resW(8),
        width: resW(8),
        justifyContent: 'center',
        alignItems: 'center',

    },
    cal_DayText: {
        fontSize: constant.font13,
        color: constant.baseColor,
        fontFamily: constant.typeSemiBold,
        // marginTop:resW(1)
    },
    dotStyle:{
        height: resW(1.3),
        width: resW(1.3),
        borderRadius:40,
        backgroundColor:constant.baseColor,
        position:'absolute',
        top:5,
        right:1
    },
    headerContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width:'100%',
        height:resW(9),
        
      },
      monthText: {
        
        fontSize: constant.font16,
        fontFamily: constant.typeSemiBold,
        color: constant.blackColor,
        // lineHeight: constant.font10*1.2,

      },
      arrowsContainer: {
        flexDirection: "row",
        alignItems: "center",
       
        justifyContent:'space-between',
        height:'100%',
        flex:0.3,
        // gap:resW(2),
        // flex:1,
        
      },
      arrowButton: {
        height:'100%',
        alignItems:'center',
        justifyContent:'center',
        width:resW(10)
      },
      arrowIcon: {
        width: resW(4),
        height: resW(4),
      },

})