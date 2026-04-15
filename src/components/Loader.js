import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { resW } from "../Utils/Constant";


const Loader = ({
    isLoading = true
}) => {
    return (
        <View style={styles.loader}>
            <ActivityIndicator size={"large"} animating={isLoading} />
        </View>
    );
};

export default Loader;

const styles = StyleSheet.create({
    loader: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        minHeight: resW(100),
    },
})