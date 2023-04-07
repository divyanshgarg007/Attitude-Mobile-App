import React from "react";
import { StyleSheet, TouchableOpacity, Text, Image } from "react-native"
import GlobalStyle from "../../styles/globalstyle";
import ARROWDOWN from '../../../assets/images/arrowdown.png'

export function ButtonSelect(props) {
    var value = props.value ? props.value : "SELECT SIZE"
    return (
        <TouchableOpacity style={[styles.container, props.style]} onPress={props.onClick}>
            <Text style={styles.text}>{value}</Text>
            <Image style={{ width: 21, height: 21, }} source={ARROWDOWN} />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 0.33,
        borderColor: "#000000",
        padding: 10
    },
    text: {
        fontSize: 13,
        fontFamily: GlobalStyle.fontSet.CenturyGothic,
        lineHeight: 13,
        color: '#000'
    }
})