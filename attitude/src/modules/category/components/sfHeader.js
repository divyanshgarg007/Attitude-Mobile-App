import React from "react";
import { StyleSheet, View, Text } from "react-native"

export const SFHeader = (props) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>SHOP PER PRODUCT</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 57,
        backgroundColor: '#000',
        justifyContent: 'center',
        paddingHorizontal: 10,
    },
    title: {
        fontFamily: "CenturyGothic-Bold",
        fontSize: 20,
        color: '#fff'
    }
})