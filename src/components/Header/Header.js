import React, { Component } from 'react';
import { Text, View, Image, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { resW } from '../../Utils/Constant';
const baseColor = '#0747a6'

class Header extends Component {

    render() {
        return (
            // <View style={styles.HeaderBackground}>
            //     <View style={styles.HeaderStyle}>
            //         <TouchableOpacity
            //             onPress={() => this.props.goBack()}>
            //             <Image style={styles.HeaderImage}
            //                 source={require('../../assests/images/leftarrow.png')} />
            //         </TouchableOpacity>
            //         <Text style={styles.HeaderText}>{this.props.title}</Text>
            //         <View></View>
            //     </View>
            // </View>

            <View style={styles.HeaderBackground}>
                <View style={styles.HeaderStyle}>
                    <TouchableOpacity onPress={() => this.props.goBack()}>
                        <Image style={styles.HeaderArrowImage}
                            source={require('../../assests/images/leftarrow.png')} />
                    </TouchableOpacity>
                    <Text style={styles.HeaderText}>{this.props.title}</Text>
                    <View></View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    HeaderBackground: {
        backgroundColor: baseColor,
        // height: resW(25),
        borderBottomRightRadius: 50,
        justifyContent:'flex-end',
        paddingTop:Platform.OS ==='ios' ? resW(8) : resW(0),
        paddingBottom:resW(5),
    },

    HeaderText: {
        color: 'white',
        fontSize: 25,
        fontWeight: 'bold',
        marginTop: 15,
        marginEnd: 10
    },

    HeaderStyle: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    HeaderImage: {
        height: 25, width: 30
    },

    HeaderArrowImage: {
        height: 35, width: 35, marginTop: 15, marginStart: 5
    },
});


export default Header;