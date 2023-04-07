import React from "react"
import { View, Text, TouchableOpacity } from "react-native"
import GlobalStyle from "../../styles/globalstyle"

export const Header = (props) => {
    if (props?.text?.length === 0) {
        return (
            <View style={{ flexDirection: 'row', paddingHorizontal: 15, justifyContent: "space-between", alignItems: "center", backgroundColor: "#000000", height: 38 }}>
                <Text style={{ color: "#fff", fontFamily: GlobalStyle.fontSet.CenturyGothicBold, fontSize: 14 }}>RECENT SEARCHES</Text>
                <TouchableOpacity onPress={props.onClick}>
                    <Text style={{ color: "#fff", fontFamily: GlobalStyle.fontSet.CenturyGothicBold, fontSize: 12 }}>Clear</Text>
                </TouchableOpacity>
            </View>
        )
    } else {
        return null
    }
}