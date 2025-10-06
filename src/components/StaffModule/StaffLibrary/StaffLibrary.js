import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import CommonHeader from '../../CommonHeader';
import LinearGradient from 'react-native-linear-gradient';
const StaffLibrary = () => {
    const navigation=useNavigation()
  return (
       <LinearGradient colors={['#DFE6FF', '#ffffff']} style={{ flex: 1 }}>
    <View>
    <CommonHeader
              title={'Library'}
              onLeftClick={() => {
                navigation.navigate("StaffHome");
              }}
            />
    </View>
    </LinearGradient>
  )
}

export default StaffLibrary

const styles = StyleSheet.create({})