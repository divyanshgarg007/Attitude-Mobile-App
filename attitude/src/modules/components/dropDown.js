import React from "react";
import { StyleSheet, TouchableOpacity, Text, Image } from "react-native"

import GlobalStyle from "../styles/globalstyle";
import ARROWDOWN from '../../assets/images/arrowdown.png'

export function DropDown(props) {
    return (
        <TouchableOpacity style={[styles.container, props.style]} onPress={() => props.onClick(props.type)}>
            <Text style={styles.text}>{props.title}</Text>
            <Image style={{ marginLeft: 10, paddingHorizontal: 10, width: 21, height: 21, }} source={ARROWDOWN} />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 40,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    text: {
        fontSize: 14,
        fontFamily: GlobalStyle.fontSet.CenturyGothicBold,
        //lineHeight: 13,
        color: '#000000'
    }
})