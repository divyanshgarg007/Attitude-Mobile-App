import React from "react";
import { StyleSheet, TouchableOpacity, Text, Image, View } from "react-native"

import GlobalStyle from "../../styles/globalstyle";
import ARROWDOWN from '../../../assets/images/arrowdown.png'

export function CountryDropDown(props) {
    return (
        <TouchableOpacity style={[styles.bg, props.style]} onPress={() => props.onClick(props.type)}>
            <View style={styles.container}>
                <Text style={styles.value}>{props.value}</Text>
                <Image style={{ width: 21, height: 21, }} source={ARROWDOWN} />
            </View>

        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    bg: {
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderColor: "#000",
        borderWidth: 0.28
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    text: {
        fontSize: 14,
        fontFamily: GlobalStyle.fontSet.CenturyGothicBold,
        lineHeight: 13,
        color: '#000000'
    },
    value: {
        fontSize: 14,
        fontFamily: GlobalStyle.fontSet.CenturyGothic,
        color: "#000"
    }
})