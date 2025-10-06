import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import CommonHeader from '../../CommonHeader';
import LinearGradient from 'react-native-linear-gradient';
const StaffModuleStudentPerformance= () => {
    const navigation=useNavigation()
  return (
       <LinearGradient colors={['#DFE6FF', '#ffffff']} style={{ flex: 1 }}>
    <View>
    <CommonHeader
              title={'Student Performance'}
              onLeftClick={() => {
                navigation.goBack();
              }}
            />
    </View>
    </LinearGradient>
  )
}

export default StaffModuleStudentPerformance

const styles = StyleSheet.create({})