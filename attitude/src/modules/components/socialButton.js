import React from "react";
import { StyleSheet, TouchableOpacity, Text, Dimensions } from "react-native";
import FastImage from "react-native-fast-image";
import GlobalStyle from "../styles/globalstyle";

const WIDTH = Dimensions.get("screen").width

export function SocialButton(props) {

    return (
        <TouchableOpacity style={styles.container}>
            <FastImage style={{ width: 18, height: 18 }} source={props.icon} />
            <Text style={styles.title}>{props.title}</Text>
            <FastImage style={{ width: 18, height: 18 }} source={{}} />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 14,
        flexDirection: 'row',
        width: (WIDTH - 42) / 2,
        borderColor: "#000",
        borderWidth: 1,
        height: 43,
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    title: {
        alignSelf: 'center',
        fontSize: 14,
        fontFamily: GlobalStyle.fontSet.CenturyGothicBold
    }
})