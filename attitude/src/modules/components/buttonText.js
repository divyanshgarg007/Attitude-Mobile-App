import React from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native"
import GlobalStyle from "../styles/globalstyle";

export function ButtonText(props) {
    return (
        <TouchableOpacity onPress={props.onClick}>
            <Text style={[styles.textAdd, props.style]}>{props.title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    checkoutBg: {
        //paddingVertical: 5,
        //paddingHorizontal: 9,
        backgroundColor: 'red'
    },
    textAdd: {
        fontFamily: GlobalStyle.fontSet.CenturyGothic,
        fontSize: 33,
        color: '#000'
    }
})