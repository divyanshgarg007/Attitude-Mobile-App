import React from "react";
import { StyleSheet, Image, Pressable, View, Text, Dimensions, ScrollView } from "react-native"

import GlobalStyle from "../styles/globalstyle";


import IC_WH from '../../assets/images/social/whatsapp.png'
import IC_FBM from '../../assets/images/social/messenger.png'
import IC_FB from '../../assets/images/social/facebook.png'
import IC_MSG from '../../assets/images/social/message.png'
import IC_LINK from '../../assets/images/social/link.png'
import IC_MORE from '../../assets/images/social/more.png'



const WIDTH = Dimensions.get('window').width
const SOCIALS = [
    { title: "WhatsApp", icon: IC_WH },
    { title: "Facebook Massenger", icon: IC_FBM },
    { title: "Facebook Stories", icon: IC_FB },
    { title: "Message", icon: IC_MSG },
    { title: "copy Lnks", icon: IC_LINK },
    { title: "More Options", icon: IC_MORE }]
const TITLE = "Killstar Pencil dress Demelza Bardot Zip Black"

export default function ShareArticleView(props) {
    return (
        <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
            <View style={{ borderBottomColor: "#000", borderBottomWidth: 0.33, padding: 15, flexDirection: 'row', alignItems: "center" }}>
                <View style={{ width: 86, height: 86, backgroundColor: "#000" }} />
                <Text style={styles.productTitle}>{TITLE}</Text>
            </View>
            {
                SOCIALS.map((obj, i) => {

                    return <Item key={i} obj={obj} />
                })
            }
        </ScrollView>
    )
}

const Item = (props) => {
    return (
        <Pressable style={{ paddingVertical: 0, }} onPress={() => null}>
            <View style={{ paddingVertical: 15, marginLeft: 20, flexDirection: 'row', alignItems: 'center', borderBottomColor: "black", borderBottomWidth: 0.29 }}>
                <Image style={{ width: 25, height: 25 }} source={props.obj.icon} />
                <Text style={styles.item}>{props.obj.title}</Text>
            </View>
            {/* <View style={{ marginLeft: 55, marginTop: 20, width: WIDTH - 55, height: 0.33, backgroundColor: "black" }} /> */}
        </Pressable>
    )
}

const styles = StyleSheet.create({
    productTitle: {
        color: "#000",
        marginLeft: 20,
        fontSize: 12,
        fontFamily: GlobalStyle.fontSet.CenturyGothic
    },
    item: {
        color: "#000",
        marginLeft: 10,
        fontSize: 14,
        fontFamily: GlobalStyle.fontSet.CenturyGothic
    }
})
