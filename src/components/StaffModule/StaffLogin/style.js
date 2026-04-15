import { StyleSheet, Dimensions } from 'react-native';
import { font15, font18, font26, resH, resW } from '../../../Utils/Constant';
const deviceHeight=Dimensions.get('window').height;
const deviceWidth=Dimensions.get('window').width;

export default styles = StyleSheet.create({
    scrollContent: {
        flexGrow: 1,
        paddingBottom: resH(5),
    },

    container: {
        flexGrow: 1,
        paddingBottom: resH(3),
    },

    heroSection: {
        alignItems: 'center',
        marginTop: resH(1),
        paddingHorizontal: resW(4),
    },

    loginImage: {
        height: deviceHeight * 0.28,
        width: deviceWidth * 0.8,
    },

    HomeScreenView: {
        height: deviceHeight,
        width: deviceWidth,
        display: 'flex'
    },

    loginForm: {
        width: '100%',
        marginTop: resH(1.5),
        paddingHorizontal: resW(5),
        alignItems: 'center',
    },

    loginText: {
        color: '#635d83',
        fontSize: font26,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: resH(2.2),
    },

    TextInputStyleClass: {
        height: resH(7.8),
        marginBottom: resH(2),
        paddingHorizontal: resW(5),
        fontSize: font15,
        borderRadius: resW(4.5),
        backgroundColor: 'white',
        elevation: 4,
        shadowColor: '#8578ab',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.12,
        shadowRadius: 10,
        color: '#635d83',
        width: '100%',
    },

    loginButton: {
        marginTop: resH(2),
        width: '100%',
        minHeight: resH(7.4),
        shadowColor: '#6f55d9',
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.18,
        shadowRadius: 14,
        elevation: 5,
    },

    button: {
        alignItems: 'center',
        padding: resH(5),
        paddingStart: resW(3),
        paddingEnd: resW(3)
    },

    buttonText: {
        fontSize: font18,
        color: 'white',
        backgroundColor: '#f15270',
        padding: resH(1.8),
          width:resW(90),
        // paddingLeft: 60,
        // paddingRight: 60,
        textAlign: 'center',
        borderRadius: resW(2)
    },

    staffLoginText: {
        color: '#5b4c84',
        fontSize: 14,
        textAlign: 'center'
    },

    staffLoginButton: {
        fontSize: font18,
        color: 'white',
        width:resW(90),
        // backgroundColor: baseColor,
        // padding: resW(5),
        // paddingLeft: 40,
        // paddingRight: 40,
        textAlign: 'center',
        // borderRadius: 8
    }

})
