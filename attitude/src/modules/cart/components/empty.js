import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import ICON_HEART from '../../../assets/images/emptyheart.png'
import GlobalStyle from "../../styles/globalstyle";

const DESC = "No worries. Start saving as you shop by selecting\nthe little heart. We'll sync your items across all\nyour devices to make your life easier."

export function Empty(props) {
    return (
        <View style={styles.container}>
            {/* <Image style={styles.image} source={ICON_HEART} /> */}
            <Text style={styles.textBold}>NOTHING IN YOUR BAG...</Text>
            {/* <Text style={styles.textNormal}>{DESC}</Text> */}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        marginTop: 50,
        width: 240 / 3,
        height: 207 / 3
    },
    textBold: {
        marginTop: 15,
        fontFamily: GlobalStyle.fontSet.CenturyGothicBold,
        fontSize: 14
    },
    textNormal: {
        marginTop: 5,
        lineHeight: 20,
        fontFamily: GlobalStyle.fontSet.CenturyGothic,
        fontSize: 14,
        textAlign: 'center'
    }
})
