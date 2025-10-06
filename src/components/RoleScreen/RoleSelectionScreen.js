import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient';
import FastImage from 'react-native-fast-image';
import { resH, resW } from '../../Utils/Constant';
import { useNavigation } from '@react-navigation/native';


const RoleSelectionScreen = () => {
    const navigation=useNavigation()
    return (
        <LinearGradient colors={['#DFE6FF', '#ffffff']} style={{ flex: 1 }}>
            <View style={styles.imageWrapper}>


                <FastImage
                    style={styles.logoImage}
                    source={require('../../assests/Icons/logo1.png')}
                />

            </View>
            <View style={styles.roleWrapper}>
                <TouchableOpacity style={styles.roleView}
                onPress={()=>
                    navigation.navigate("Login")
                }>
                    <Image
                        source={require('../../assests/images/login_image.png')}
                        style={styles.roleImage} />
                     <Text style={styles.roleText}>
                        Student login
                    </Text>

                </TouchableOpacity>
                <TouchableOpacity style={styles.roleView}
                 onPress={() => navigation.navigate('StaffLogin')}>
                    <Image
                        source={require('../../assests/images/staff_login1.png')}
                        style={styles.roleImage} />
                        <View styl={{paddingVertical:resH(2)}}>
                    <Text style={styles.roleText}>
                        Teacher login
                    </Text>
                        </View>

                </TouchableOpacity>
            </View>
        </LinearGradient>
    )
}

export default RoleSelectionScreen

const styles = StyleSheet.create({
    logoImage: {
        marginTop: Platform.OS === 'ios' ? resW(15) : resW(15),
        width: resW(60),
        height: resW(60),
        resizeMode: "cover",
        alignItems: "center",
           marginLeft:resW(5),
           justifyContent:"center"
    },
    imageWrapper: {
        justifyContent: "center",
        alignItems: "center",
        marginTop:resH(3)
        // backgroundColor:"green"
     
    },
    roleView: {
        marginTop:resH(3),
        width: resW(43),
        height:resW(50),
        backgroundColor: "white",
        borderRadius: resW(2),
        alignItems: "center",
        paddingVertical: resH(2),
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    roleWrapper: {
        marginTop:resH(6),
        justifyContent: "space-between",
        flexDirection: "row",
        marginHorizontal: resW(5)
    },
      roleText: {
        fontSize: resW(4),
        fontWeight: "bold",
        textAlign: "center",
        color:"grey"
    },
    roleImage: {
        width: resW(43),
        height: resW(38),
        resizeMode: "contain",
        // backgroundColor:"red"
    }

})