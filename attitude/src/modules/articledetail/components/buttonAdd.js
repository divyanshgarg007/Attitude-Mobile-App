import React from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native"
import GlobalStyle from "../../styles/globalstyle";

export function ButtonAdd(props) {
    return (
        <TouchableOpacity style={[styles.container, props.style]} onPress={props.onClickAdd}>
            <Text style={styles.text}>ADD TO BAG</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#00954F'
    },
    text: {
        fontSize: 14,
        fontFamily: GlobalStyle.fontSet.CenturyGothicBold,
        lineHeight: 13,
        color: '#ffffff'
    }
})