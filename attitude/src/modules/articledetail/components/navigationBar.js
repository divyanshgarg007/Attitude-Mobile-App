import React from "react"
import { Platform, StyleSheet, View, Text, Image, TouchableOpacity } from "react-native"
import BACK from '../../../assets/images/back.png'
import { ButtonShare } from "../../components"
import GlobalStyle from "../../styles/globalstyle"

export function NavigationBar(props) {
    if (props.type === "addBoard") {
        return (
            <View style={[styles.addContainer, props.style]} >
                <View style={[styles.addContent]}>
                    <TouchableOpacity style={styles.checkoutBg} onPress={props.onPressAdd}>
                        <Text style={[styles.textAdd, { color: "#000", fontSize: 26, alignSelf: "flex-end" }]}>+</Text>
                    </TouchableOpacity>
                    <Text style={styles.addTitle}>{props.title}</Text>
                    <TouchableOpacity style={[styles.checkoutBg]} onPress={props.onPressAddCancel}>
                        <Text style={[styles.textCheckout, { alignSelf: "flex-start" }]}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    } else {
        return (
            <View style={[styles.container, props.style]} >
                <View style={styles.content}>
                    <TouchableOpacity onPress={() => props.navigation.goBack()}>
                        <Image style={{ width: 34, height: 34, }} source={BACK} />
                    </TouchableOpacity>
                    <ButtonShare onClick={props.onClickShare} />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        top: Platform.OS === "ios" ? 0 : 0,
        position: 'absolute',
        height: 84,
        width: '100%',
        backgroundColor: 'transparent',
        zIndex: 1,
        //backgroundColor: 'red',
    },
    content: {
        flexDirection: 'row',
        marginTop: 0,
        height: 48,
        paddingHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
        //backgroundColor: 'blue',
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
        color: "#000",
        fontFamily: GlobalStyle.fontSet.CenturyGothicBold,
        fontSize: 14,
        textAlign: 'center',
    },
    checkoutBg: {
        flex: 1,
        paddingVertical: 5,
        paddingHorizontal: 9,
        //backgroundColor: 'blue'
    },
    textCheckout: {
        fontFamily: GlobalStyle.fontSet.CenturyGothic,
        fontSize: 14,
        color: '#000'
    }
})