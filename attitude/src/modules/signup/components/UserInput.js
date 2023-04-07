import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput, Image, Switch, TouchableOpacity } from "react-native";
import GlobalStyle from "../../styles/globalstyle";
import ICON_EYE from "../../../assets/images/eye.png"
import ICON_EYE_HIDE from "../../../assets/images/eyehide.png"

export function UserInput(props) {
    const [showPassword, setShowPassword] = useState(props?.secureTextEntry)
    return (
        <View style={props.style}>
            <Text style={styles.title}>{props.title}</Text>

            <TextInput style={styles.input}
                keyboardType={props?.secureTextEntry ? "default" : "email-address"}
                autoCapitalize={'none'}
                secureTextEntry={showPassword}
                onChangeText={(text) => props.onChangeText(text)}
            />

            {
                props?.secureTextEntry &&
                <TouchableOpacity style={styles.password} onPress={() => setShowPassword(!showPassword)}>
                    <Image style={{ width: 24, height: 24 }} source={showPassword ? ICON_EYE_HIDE : ICON_EYE} />
                </TouchableOpacity>
            }


        </View>
    )
}

const styles = StyleSheet.create({
    container: {

    },
    title: {
        fontSize: 14,
        fontFamily: GlobalStyle.fontSet.CenturyGothicBold
    },
    input: {

        paddingHorizontal: 10,
        marginTop: 5,
        height: 43,
        fontSize: 14,
        fontFamily: GlobalStyle.fontSet.CenturyGothic,
        borderColor: "#000",
        borderWidth: 1
    },
    password: {
        position: 'absolute',
        top: 32,
        right: 10,
        alignSelf: 'flex-end',
    }
})