import React, { useState, useEffect, Component } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    FlatList,
    TouchableOpacity,
    TextInput, Image
} from 'react-native';
const baseColor = '#0747a6'


class Searchbar extends Component {

    render(){
    return (
        <View style={[styles.container]}>
            <View style={styles.searchContainer}>
                <View style={styles.vwSearch}>
                    <Image
                        style={styles.icSearch}
                        source={require('../assests/images/search.png')} />
                </View>

                <TextInput
                    // value={query}
                    placeholder="Search here..."
                    style={styles.textInput}
                    onChangeText={(text) => {
                        console.log('text ->', text);
                        this.props.onChangeSearch(text.toLowerCase())
                    }}
                />

            </View>
        </View >
    )}
}

const styles = StyleSheet.create({
    txtError: {
        marginTop: '2%',
        width: '89%',
        color: 'white',

    },
    vwClear: {
        flex: 0.2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textInput: {
        // backgroundColor: 'green',
        flex: 1,
    },

    vwSearch: {
        flex: 0.2,
        justifyContent: 'center',
        alignItems: 'center',
        // width: 40,
        // backgroundColor: 'red'
    },
    icSearch: {
        height: 18, width: 18
    },
    searchContainer:
    {
        backgroundColor: 'white',
        width: '90%',
        height: 40,
        flexDirection: 'row'

    },
    container: {
        height: 80,
        alignItems: 'center',
        // height: '100%', width: '100%' 
    },txtError: {
        marginTop: '2%',
        width: '89%',
        color: 'white',

    },
    vwClear: {
        flex: 0.2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textInput: {
        // backgroundColor: 'green',
        flex: 1,
    },

    vwSearch: {
        flex: 0.2,
        justifyContent: 'center',
        alignItems: 'center',
        // width: 40,
        // backgroundColor: 'red'
    },
    icSearch: {
        height: 25, width: 25
    },
    searchContainer:{
        backgroundColor: 'white',
        width: '90%',
        height: 50,
        flexDirection: 'row',
        borderWidth: 1,
        borderRadius: 4,
        marginTop: 8,
        borderColor: baseColor
    },
    container: {
        height: 60,
        alignItems: 'center',
    },
});

export default Searchbar;