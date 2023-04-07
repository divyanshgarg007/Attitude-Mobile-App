import React from "react"
import { Platform, StyleSheet, View, Text, Image, TouchableOpacity } from "react-native"
import GlobalStyle from "../../styles/globalstyle"

import BACK from "../../../assets/images/back.png"


export function NavigationBar(props) {
    if (props.type === "all") {
        return (
            <View style={[styles.container, props.style]} >
                <View style={styles.content}>
                    <TouchableOpacity style={styles.checkoutBg}>
                        <Text style={styles.textAdd}> </Text>
                    </TouchableOpacity>
                    <Text style={styles.title}>WISHLIST</Text>
                    <TouchableOpacity style={styles.checkoutBg} onPress={props.onSelectItem}>
                        <Text style={[styles.textCheckout]}>{props.selectItem ? "Cancel" : "Select"}</Text>
                    </TouchableOpacity>
                </View>
            </View >
        )
    } else if (props.type === "board") {
        return (
            <View style={[styles.container, props.style]} >
                <View style={[styles.content]}>
                    <TouchableOpacity style={styles.checkoutBg} onPress={props.onPressAdd}>
                        <Text style={styles.textAdd}>+</Text>
                    </TouchableOpacity>
                    <Text style={styles.title}>WISHLIST</Text>
                    <TouchableOpacity style={[styles.checkoutBg]}>
                        <Text style={styles.textCheckout}>Select</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    } else if (props.type === "boardItem") {
        return (
            <View style={[styles.container, props.style]} >
                <View style={[styles.content]}>
                    <TouchableOpacity style={styles.checkoutBg} onPress={() => props.navigation.goBack()}>
                        <Image style={{ width: 34, height: 34, }} source={BACK} />
                    </TouchableOpacity>
                    <Text style={styles.title}>{props.title}</Text>
                    <TouchableOpacity style={[styles.checkoutBg]}>
                        <Text style={styles.textCheckout}>Select</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    } else if (props.type === "createBoard") {
        return (
            <View style={[styles.container, props.style]} >
                <View style={[styles.content, { justifyContent: 'center' }]}>
                    <Text style={[styles.title, { flex: 1, fontFamily: "CenturyGothic-Bold", fontSize: 16 }]}>{props.title}</Text>
                    <TouchableOpacity style={{ paddingHorizontal: 10, position: 'absolute', right: 10 }} onPress={() => props.navigation.goBack()}>
                        <Text style={[styles.textCheckout, { fontFamily: "CenturyGothic-Bold", fontSize: 18 }]}>X</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    } else if (props.type === "addBoard") {
        return (
            <View style={[styles.addContainer, props.style]} >
                <View style={[styles.addContent]}>
                    <TouchableOpacity style={styles.checkoutBg} onPress={props.onPressAdd}>
                        <Text style={[styles.textAdd, { fontSize: 26, alignSelf: "flex-end" }]}>+</Text>
                    </TouchableOpacity>
                    <Text style={styles.addTitle}>{props.title}</Text>
                    <TouchableOpacity style={[styles.checkoutBg]} onPress={props.onPressAddCancel}>
                        <Text style={[styles.textCheckout, { alignSelf: "flex-start" }]}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        top: Platform.OS === "ios" ? 0 : -30,
        position: 'absolute',
        height: 84,
        width: '100%',
        zIndex: 1,
        borderBottomColor: 'black',
        borderBottomWidth: 0.33,
    },
    content: {
        flexDirection: 'row',
        marginTop: 34,
        height: 48,
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
        paddingVertical: 5,
        paddingHorizontal: 9,
        //backgroundColor: 'blue'
    },
    textCheckout: {
        fontFamily: GlobalStyle.fontSet.CenturyGothic,
        fontSize: 12,
        color: '#000',
        alignSelf: 'flex-end'
    },
    textAdd: {
        fontFamily: GlobalStyle.fontSet.CenturyGothic,
        fontSize: 33,
        color: '#000'
    },
    addContainer: {
        height: 48,
        width: '100%',
        zIndex: 1,
        borderBottomColor: 'black',
        borderBottomWidth: 0.33,
        backgroundColor: '#fff'
    },
    addContent: {
        flexDirection: 'row-reverse',
        height: 48,
        alignItems: 'center',
        justifyContent: 'space-between',
        //backgroundColor: "#922a27"
    },
    addTitle: {
        flex: 1,
        fontFamily: GlobalStyle.fontSet.CenturyGothicBold,
        fontSize: 14,
        textAlign: 'center',
        color: "#000"
    },
})