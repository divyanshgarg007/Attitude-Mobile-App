import React from "react"
import { Platform, StyleSheet, View, Text, Image, TouchableOpacity } from "react-native"
import GlobalStyle from "../../styles/globalstyle"

export function NavigationBar(props) {
    return (
        <View style={[styles.container, props.style]} >
            <View style={styles.content}>
                <View style={{ flex: 1 }} />
                <Text style={styles.title}>BAG</Text>
                <TouchableOpacity style={styles.checkoutBg} onPress={() => props.navigation.goBack()}>
                    <Text style={styles.textCheckout}>CHECKOUT</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        top: Platform.OS === "ios" ? 0 : -25,
        position: 'absolute',
        height: 84,
        width: '100%',
        zIndex: 1,
        borderBottomColor: 'black', borderBottomWidth: 0.33,
    },
    content: {
        flexDirection: 'row',
        marginTop: 34,
        height: 48,
        paddingHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    title: {
        flex: 1,
        fontFamily: GlobalStyle.fontSet.CenturyGothic,
        fontSize: 20,
        textAlign: 'center',
        color: "#000"
    },
    checkoutBg: {
        flex: 1,
        backgroundColor: "#00954F",
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 5,
    },
    textCheckout: {
        fontFamily: GlobalStyle.fontSet.CenturyGothic,
        fontSize: 20,
        color: '#fff'
    }
})