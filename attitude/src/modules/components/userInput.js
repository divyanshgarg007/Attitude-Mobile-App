import React from "react";

import { StyleSheet, View, Text, TextInput } from "react-native";
import GlobalStyle from "../styles/globalstyle";

export function UserInput(props) {
    return (
        <View style={props.style}>
            <Text style={styles.title}>{props.title}</Text>
            <TextInput
                style={styles.input}
                value={props.value}
                secureTextEntry={props?.secureTextEntry}
                onChangeText={(text) => props.onChangeText(text)}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 14,
        fontFamily: GlobalStyle.fontSet.CenturyGothicBold
    },
    input: {
        paddingHorizontal: 5,
        marginTop: 5,
        height: 43,
        fontSize: 14,
        fontFamily: GlobalStyle.fontSet.CenturyGothic,
        borderColor: "#000",
        borderWidth: 1
    }
})