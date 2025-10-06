import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient';
import CommonHeader from './src/components/CommonHeader';
import { useNavigation } from '@react-navigation/native';
const ProficiencyScreen = () => {
    const navigation=useNavigation();
    return (
        <LinearGradient colors={['#DFE6FF', '#ffffff']} style={{ flex: 1 }}>
            <CommonHeader title={'Student Performance Report'} onLeftClick={() => navigation.navigate('Home')} />
        </LinearGradient>
    )
}

export default ProficiencyScreen

const styles = StyleSheet.create({})