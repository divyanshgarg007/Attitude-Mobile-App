import React, { useState } from "react";
import { StyleSheet, View, TouchableOpacity, Image, Text, Dimensions } from "react-native";
import FastImage from "react-native-fast-image";
import SQUARE from '../../../assets/images/square.png'
import CHECK from "../../../assets/images/square_check.png"

import GlobalStyle from "../../styles/globalstyle";
const WIDTH = Dimensions.get("screen").width

export function ContactPref(props) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>CONTACT PREFERENCES:</Text>
            <Text style={styles.desc}>Tell us which emails you’d like:</Text>

            <CheckItem title="Discounts and new items" />
            <CheckItem title="Fashion trends and news" />

        </View>
    )
}

const CheckItem = (props) => {
    const [check, setCheck] = useState(false)
    return (
        <TouchableOpacity style={{ marginTop: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }} onPress={() => setCheck(!check)}>
            <Text style={styles.title}>{props.title}</Text>
            <Image style={{ width: 24, height: 24 }} source={check ? CHECK : SQUARE} />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 14,
    },
    title: {
        fontSize: 14,
        lineHeight: 20,
        fontFamily: GlobalStyle.fontSet.CenturyGothicBold
    },
    desc: {
        fontSize: 14,
        lineHeight: 20,
        fontFamily: GlobalStyle.fontSet.CenturyGothic
    }
})