import React from "react"
import { StyleSheet, TouchableOpacity, Text, ActivityIndicator } from "react-native"
import GlobalStyle from "../styles/globalstyle"

export function ButtonAction(props) {
    var btnStyle = props.isValid ? styles.btnContainer : styles.disBtnContainer
    return (
        <TouchableOpacity disabled={!props.isValid} style={[btnStyle, props.style]} onPress={props.onClick}>
            {
                props?.isLoading ?
                    <ActivityIndicator color="#fff" /> :
                    <Text style={{ fontFamily: GlobalStyle.fontSet.CenturyGothicBold, color: "#fff" }}>{props.title}</Text>
            }
        </TouchableOpacity>
    )
}

export function ButtonBorder(props) {

    return (
        <TouchableOpacity style={[styles.border, props.style]} onPress={props.onClick}>
            <Text style={{ fontFamily: GlobalStyle.fontSet.CenturyGothicBold, color: "#000" }}>{props.title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    btnContainer: {
        backgroundColor: "#000",
        marginHorizontal: 10,
        paddingVertical: 15,
        justifyContent: "center",
        alignItems: "center"
    },
    disBtnContainer: {
        backgroundColor: "gray",
        marginHorizontal: 10,
        paddingVertical: 15,
        justifyContent: "center",
        alignItems: "center"
    },
    border: {
        borderWidth: 1,
        borderColor: "#000",
        marginHorizontal: 10,
        paddingVertical: 15,
        justifyContent: "center",
        alignItems: "center"
    }
})