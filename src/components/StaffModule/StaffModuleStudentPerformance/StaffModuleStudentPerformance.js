import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import CommonHeader from '../../CommonHeader';
import LinearGradient from 'react-native-linear-gradient';
import { whiteColor ,Blue} from '../../../Utils/Constant';
const StaffModuleStudentPerformance= () => {
    const navigation=useNavigation()
  return (
       <LinearGradient colors={[whiteColor, whiteColor]} style={{ flex: 1 }}>
    <View>
    <CommonHeader
              title={'Student Performance'}
                             backgroundColor={Blue}
                textColor={whiteColor}
                IconColor={whiteColor}
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