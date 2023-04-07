import React from "react"
import { Platform, StyleSheet, View, Text, Image, TouchableOpacity } from "react-native"
import BACK from '../../assets/images/back.png'

export function NavigationBar(props) {
    return (
        <View style={[styles.container, props.style]} >
            <View style={styles.content}>
                <TouchableOpacity onPress={() => props.navigation.goBack()}>
                    <Image style={{ width: 34, height: 34, }} source={BACK} />
                </TouchableOpacity>
                <Text style={styles.title}>{props.title}</Text>
                <View style={{ width: 34, height: 34 }} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: Platform.OS === "ios" ? -47 : -32,
        height: 84,
        width: '100%',
        backgroundColor: '#fff',
        borderBottomColor: 'black',
        borderBottomWidth: 0.33
    },
    content: {
        flexDirection: 'row',
        marginTop: 34,
        height: 48,
        paddingHorizontal: 2,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    title: {
        fontFamily: 'CenturyGothic',
        fontSize: 20,
        color: "#000"
    }
})