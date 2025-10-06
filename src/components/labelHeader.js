import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { blackColor, font12, font14 } from '../Utils/Constant'

const LabelHeader = ({label,textstyle}) => {
  return (
    <View>
      <Text style={[styles.label,textstyle]}>{label}</Text>
    </View>
  )
}

export default LabelHeader

const styles = StyleSheet.create({
    label:{
        fontSize:font14,
        color:blackColor,
        fontWeight:"400",

    }

})